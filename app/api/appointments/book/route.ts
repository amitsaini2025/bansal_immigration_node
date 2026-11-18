import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { clientIp, verifyTurnstile } from '@/lib/turnstile';
import { isSlotBookable, melbourneToday } from '@/lib/appointment/availability';
import { forwardToLaravel } from '@/lib/appointment/laravelApi';
import {
  getEffectiveEnquiryTypeForBooking,
  hideOverseasPackage,
  isPaidService,
  serviceRequiresPaidPackage,
} from '@/lib/appointment/enquiryType';

const PRICES: Record<string, number> = {
  tr: 150,
  tourist: 150,
  education: 150,
  pr_complex: 150,
  kunal: 150,
  ajay: 150,
  arun: 150,
};

const SERVICES = new Set([
  'permanent-residency',
  'eoi-roi',
  'temporary-residency',
  'employer-sponsored-visas',
  'jrp-skill-assessment',
  'tourist-visa',
  'education-visa',
  'complex-matters',
  'visa-cancellation',
  'family-visas',
  'citizenship',
  'international-migration',
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.website_honeypot) {
      return NextResponse.json({ success: true, message: 'Appointment booked successfully.' });
    }

    const turnstileOk = await verifyTurnstile(
      typeof body.cf_turnstile_response === 'string' ? body.cf_turnstile_response : '',
      clientIp(req.headers)
    );
    if (!turnstileOk) {
      return NextResponse.json(
        { success: false, message: 'Please complete the security check and try again.' },
        { status: 422 }
      );
    }

    const fullName = String(body.full_name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const location = String(body.location || '');
    const meetingType = String(body.meeting_type || '');
    const language = String(body.preferred_language || '');
    const serviceType = String(body.service_type || '');
    const specificService = String(body.specific_service || '');
    const details = String(body.enquiry_details || '').trim();
    const date = String(body.appointment_date || '');
    const time = String(body.appointment_time || '');

    if (fullName.length < 2 || !/^[a-zA-Z\s'-]+$/.test(fullName)) {
      return NextResponse.json({ success: false, message: 'Please enter your full name.' }, { status: 422 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 422 });
    }
    if (!/^[\+]?[0-9\s\-()]{6,20}$/.test(phone)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid phone number.' }, { status: 422 });
    }
    if (location !== 'melbourne' && location !== 'adelaide') {
      return NextResponse.json({ success: false, message: 'Please select an office location.' }, { status: 422 });
    }
    if (!['phone', 'in-person', 'video-call'].includes(meetingType)) {
      return NextResponse.json({ success: false, message: 'Please select a meeting type.' }, { status: 422 });
    }
    if (!['english', 'hindi', 'punjabi'].includes(language)) {
      return NextResponse.json({ success: false, message: 'Please select a preferred language.' }, { status: 422 });
    }
    if (!SERVICES.has(serviceType)) {
      return NextResponse.json({ success: false, message: 'Please select a service.' }, { status: 422 });
    }
    if (!['consultation', 'paid-consultation', 'overseas-enquiry'].includes(specificService)) {
      return NextResponse.json({ success: false, message: 'Please select a consultation option.' }, { status: 422 });
    }
    if (details.length < 10 || details.length > 1000) {
      return NextResponse.json(
        { success: false, message: 'Please describe your enquiry in 10 to 1000 characters.' },
        { status: 422 }
      );
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date <= melbourneToday()) {
      return NextResponse.json(
        { success: false, message: 'Appointment date must be tomorrow or later. Same-day booking is not available.' },
        { status: 422 }
      );
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ success: false, message: 'Please select a valid appointment time.' }, { status: 422 });
    }

    const paid = isPaidService(specificService);
    if (serviceRequiresPaidPackage(serviceType, meetingType) && !paid) {
      return NextResponse.json(
        { success: false, message: 'This appointment is available as a paid consultation only.' },
        { status: 422 }
      );
    }
    if (hideOverseasPackage(serviceType) && specificService === 'overseas-enquiry') {
      return NextResponse.json(
        { success: false, message: 'Please choose Comprehensive Migration Advice for this service.' },
        { status: 422 }
      );
    }
    if (serviceType === 'international-migration' && specificService !== 'overseas-enquiry' && !paid) {
      return NextResponse.json(
        { success: false, message: 'Overseas enquiries use the paid overseas consultation.' },
        { status: 422 }
      );
    }

    const slot = await isSlotBookable({
      date,
      time,
      location,
      serviceType,
      specificService,
    });
    if (!slot.ok) {
      return NextResponse.json(
        { success: false, message: 'The selected time slot is not available. Please choose a different time.' },
        { status: 422 }
      );
    }

    const enquiryType = getEffectiveEnquiryTypeForBooking(location, serviceType, paid);

    const forwarded = await forwardToLaravel('/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,
        location,
        meeting_type: meetingType,
        preferred_language: language,
        enquiry_type: enquiryType,
        service_type: serviceType,
        specific_service: specificService,
        enquiry_details: details,
        appointment_date: date,
        appointment_time: time,
        is_paid: paid,
      }),
    });
    if (forwarded) {
      const data = await forwarded.json().catch(() => ({
        success: false,
        message: 'Failed to book appointment. Please try again.',
      }));
      return NextResponse.json(data, { status: forwarded.status });
    }

    const amount = paid ? PRICES[enquiryType] ?? 150 : 0;
    const token = randomBytes(32).toString('hex');
    const ip = clientIp(req.headers) || null;
    const userAgent = (req.headers.get('user-agent') || '').slice(0, 255);
    const db = getDb();

    const [result] = await db.execute(
      `INSERT INTO enhanced_appointments (
        full_name, email, phone, location, meeting_type, preferred_language,
        enquiry_type, service_type, specific_service, enquiry_details,
        appointment_date, appointment_time, appointment_datetime, duration_minutes,
        status, is_paid, amount, discount_amount, final_amount,
        confirmation_token, email_action_version, ip_address, user_agent, form_data,
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        'pending', ?, ?, 0, ?,
        ?, 1, ?, ?, ?,
        NOW(), NOW()
      )`,
      [
        fullName,
        email,
        phone,
        location,
        meetingType,
        language,
        enquiryType,
        serviceType,
        specificService,
        details,
        date,
        `${time}:00`,
        `${date} ${time}:00`,
        slot.duration,
        paid ? 1 : 0,
        amount,
        amount,
        token,
        ip,
        userAgent,
        JSON.stringify({
          full_name: fullName,
          email,
          phone,
          location,
          meeting_type: meetingType,
          preferred_language: language,
          enquiry_type: enquiryType,
          service_type: serviceType,
          specific_service: specificService,
          enquiry_details: details,
          appointment_date: date,
          appointment_time: time,
          is_paid: paid,
        }),
      ]
    );

    const appointmentId = Number((result as { insertId?: number }).insertId || 0);

    return NextResponse.json({
      success: true,
      appointment_id: appointmentId,
      payment_required: paid,
      amount,
      message: paid
        ? 'Appointment created. The $150 consultation fee is due before this booking is confirmed.'
        : 'Appointment booked successfully. Our office will confirm your time shortly.',
    });
  } catch (error) {
    console.error('book appointment', error);
    return NextResponse.json(
      { success: false, message: 'Failed to book appointment. Please try again or call +61 3 9602 1330.' },
      { status: 500 }
    );
  }
}
