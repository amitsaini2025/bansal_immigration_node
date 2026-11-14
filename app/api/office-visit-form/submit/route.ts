import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const firstName = String(body.first_name || '').trim();
    const lastName = String(body.last_name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'First name, last name, email, and phone number are required.' },
        { status: 422 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    const db = getDb();
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO office_visit_forms (
        filled_by, filler_first_name, filler_last_name, filler_relationship, filler_relationship_other,
        first_name, last_name, gender, dob, age, nationality, relationship_status, marital_status,
        email, country_code, phone, address, city, state, postcode, country,
        current_visa, visa_type, education_type, confirmation_type, visa_information, visa_expiry_date,
        passport_number, country_of_passport, visa_status, visa_cancellation_date, visa_subclass,
        cancellation_reason, appeal_details, purpose_of_visit, duration_of_stay, intended_departure_date,
        previous_visits, sponsor_in_australia, visitor_visa_details, other_visa_type, other_visa_purpose,
        other_visa_details, source, highest_qualification, qualification_details, studying, education_location,
        course_name, english_test_type, english_test_score_overall, english_test_score_listening,
        english_test_score_reading, english_test_score_writing, english_test_score_speaking, english_test_date,
        work_experience, work_experience_location, occupation, naati, naati_date, py, py_date,
        enquiry_details, ip_address, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, NOW(), NOW()
      )`,
      [
        body.filled_by || 'Self',
        body.filler_first_name || null,
        body.filler_last_name || null,
        body.filler_relationship || null,
        body.filler_relationship_other || null,
        firstName,
        lastName,
        body.gender || null,
        body.dob || null,
        body.age ? parseInt(body.age, 10) : null,
        body.nationality || null,
        body.relationship_status || body.marital_status || null,
        body.marital_status || body.relationship_status || null,
        email,
        body.country_code || '+61',
        phone,
        body.address || null,
        body.city || null,
        body.state || null,
        body.postcode || null,
        body.country || 'Australia',
        body.current_visa || null,
        body.visa_type || null,
        body.education_type || null,
        body.confirmation_type || null,
        body.visa_information || null,
        body.visa_expiry_date || null,
        body.passport_number || null,
        body.country_of_passport || null,
        body.visa_status || null,
        body.visa_cancellation_date || null,
        body.visa_subclass || null,
        body.cancellation_reason || null,
        body.appeal_details || null,
        body.purpose_of_visit || null,
        body.duration_of_stay || null,
        body.intended_departure_date || null,
        body.previous_visits || null,
        body.sponsor_in_australia || null,
        body.visitor_visa_details || null,
        body.other_visa_type || null,
        body.other_visa_purpose || null,
        body.other_visa_details || null,
        body.source || 'Website Office Visit Check-in',
        body.highest_qualification || null,
        body.qualification_details || null,
        body.studying || null,
        body.education_location || null,
        body.course_name || null,
        body.english_test_type || null,
        body.english_test_score_overall ? String(body.english_test_score_overall) : null,
        body.english_test_score_listening ? String(body.english_test_score_listening) : null,
        body.english_test_score_reading ? String(body.english_test_score_reading) : null,
        body.english_test_score_writing ? String(body.english_test_score_writing) : null,
        body.english_test_score_speaking ? String(body.english_test_score_speaking) : null,
        body.english_test_date || null,
        body.work_experience || null,
        body.work_experience_location || null,
        body.occupation || null,
        body.naati || null,
        body.naati_date || null,
        body.py || null,
        body.py_date || null,
        body.enquiry_details || null,
        ipAddress,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Office visit registration submitted successfully',
      id: result.insertId,
      redirectUrl: '/office-visit-form/thank-you',
    });
  } catch (error: any) {
    console.error('Error submitting office visit form:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to submit form' },
      { status: 500 }
    );
  }
}
