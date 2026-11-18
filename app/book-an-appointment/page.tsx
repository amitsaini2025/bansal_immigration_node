'use client';

import React, { useEffect, useState, useId } from 'react';
import {
  getEffectiveEnquiryTypeForBooking,
  hideOverseasPackage,
  isPaidService,
  serviceRequiresPaidPackage,
} from '@/lib/appointment/enquiryType';
import Link from 'next/link';
import { TurnstileField, useTurnstileSiteKey } from '@/components/forms/TurnstileField';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Phone,
  Video,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Building,
  Check,
  Info,
} from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PhoneField from '@/components/forms/PhoneField';
import {
  container,
  sectionY,
  card,
  cardPad,
  btnPrimaryDark,
  btnPrimaryLight,
  btnGhostDark,
  btnGhostLight,
  linkText,
  fieldInput,
  fieldLabel,
  focusRing,
  SectionHeader,
  IconTile,
  PageHero,
  FaqList,
} from '@/components/ui/brand';

const SERVICE_OPTIONS = [
  { id: 'permanent-residency', title: 'GSM Visas: 491, 190, 189, 191' },
  { id: 'eoi-roi', title: 'EOI/ROI' },
  { id: 'temporary-residency', title: 'TR: 485 visa' },
  { id: 'employer-sponsored-visas', title: 'Employer Sponsored Visas: 494, 482, 186, DAMA' },
  { id: 'jrp-skill-assessment', title: 'JRP/Skill Assessment' },
  { id: 'tourist-visa', title: 'Tourist Visa' },
  {
    id: 'education-visa',
    title:
      'Education/Course Change/Student Visa/Student Dependent Visa (for education selection for Australian onshore clients only)',
  },
  { id: 'complex-matters', title: 'Complex matters: ART, Protection visa' },
  { id: 'visa-cancellation', title: 'Visa Cancellation/ NOICC/ Visa refusals' },
  { id: 'family-visas', title: 'Family Visas (Parent Visa, Partner Visa, Child Visa)' },
  { id: 'citizenship', title: 'Citizenship' },
  { id: 'international-migration', title: 'Anyone who is outside Australia' },
];

const CONSULTATION_TIERS = [
  {
    id: 'consultation',
    timing: 'free',
    title: 'Free Consultation',
    duration: '10 minutes',
    price: 'FREE',
    badge: 'Initial Assessment',
    description:
      'Perfect for initial inquiries: Quick assessment of your immigration situation, basic visa pathway guidance, and preliminary advice. Available for clients currently within Australia only.',
    availability: '10-minute time slots',
  },
  {
    id: 'paid-consultation',
    timing: 'paid',
    title: 'Comprehensive Migration Advice',
    duration: '30 minutes',
    price: '$150',
    badge: 'Detailed Strategy',
    description:
      'In-depth professional consultation: Comprehensive case analysis, detailed migration strategy, complex visa applications, ART appeals, visa cancellations, protection visas, and personalized action plans. Suitable for onshore and complex matters.',
    availability: '30-minute time slots',
  },
  {
    id: 'overseas-enquiry',
    timing: 'paid',
    title: 'Overseas Applicant Enquiry',
    duration: '30 minutes',
    price: '$150',
    badge: 'Offshore Clients',
    description:
      'Specialized consultation for overseas applicants: For applicants currently outside Australia or inquiring on behalf of someone overseas. Includes detailed assessment and personalized migration strategy.',
    availability: '30-minute time slots',
  },
];

const STEPS = [
  { num: 1, label: 'Location' },
  { num: 2, label: 'Service' },
  { num: 3, label: 'Details' },
  { num: 4, label: 'Confirm' },
];

type Office = 'adelaide' | 'melbourne' | '';
type Meeting = 'phone' | 'in-person' | 'video-call' | '';
type Language = 'english' | 'hindi' | 'punjabi' | '';
type Tier = 'consultation' | 'paid-consultation' | 'overseas-enquiry' | '';

function ymd(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function BookAppointmentPage() {
  const [screen, setScreen] = useState(1);

  const [location, setLocation] = useState<Office>('');
  const [meetingType, setMeetingType] = useState<Meeting>('');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('');

  const [selectedService, setSelectedService] = useState('');
  const [selectedTier, setSelectedTier] = useState<Tier>('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+61');
  const [phone, setPhone] = useState('');
  const [enquiryDetails, setEnquiryDetails] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [timeDisplay, setTimeDisplay] = useState('');
  const [calendarCursor, setCalendarCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [allowedDays, setAllowedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [slots, setSlots] = useState<{ time: string; display: string }[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotMessage, setSlotMessage] = useState('');
  const [paidMinutes, setPaidMinutes] = useState(30);
  const [bookingMessage, setBookingMessage] = useState('');
  const [paymentRequired, setPaymentRequired] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const turnstileSiteKey = useTurnstileSiteKey();
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [honeypot, setHoneypot] = useState('');
  const honeypotId = useId();

  const paidBooking = isPaidService(selectedTier);
  const mustPay = serviceRequiresPaidPackage(selectedService, meetingType);
  const overseasHidden = hideOverseasPackage(selectedService);
  const indicatorStep = screen <= 1 ? 1 : screen <= 3 ? 2 : screen === 4 ? 3 : 4;

  const scheduleQuery = (isPaid: boolean) => {
    const params = new URLSearchParams({
      location: location || 'melbourne',
      service_type: selectedService,
      specific_service: isPaid ? 'paid-consultation' : 'consultation',
      is_paid: isPaid ? '1' : '0',
      enquiry_type: getEffectiveEnquiryTypeForBooking(location || 'melbourne', selectedService, isPaid),
    });
    return params;
  };

  useEffect(() => {
    if (!location || !selectedService) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const paidParams = scheduleQuery(true);
    paidParams.set('date', ymd(tomorrow));
    fetch(`/api/appointments/available-slots?${paidParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.working_hours?.interval) setPaidMinutes(Number(data.working_hours.interval));
      })
      .catch(() => undefined);
    const dayParams = scheduleQuery(paidBooking);
    dayParams.set('date', ymd(tomorrow));
    fetch(`/api/appointments/available-slots?${dayParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.days_of_week) && data.days_of_week.length > 0) {
          setAllowedDays(data.days_of_week.map((day: number) => Number(day)));
        } else {
          setAllowedDays([1, 2, 3, 4, 5]);
        }
      })
      .catch(() => setAllowedDays([1, 2, 3, 4, 5]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, selectedService, selectedTier]);

  useEffect(() => {
    if (screen < 4 || !location || !selectedService || !selectedTier) return;
    const start = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), 1);
    const end = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 0);
    const params = scheduleQuery(paidBooking);
    params.set('start_date', ymd(start));
    params.set('end_date', ymd(end));
    fetch(`/api/appointments/check-blocked-dates?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.blocked_dates)) setBlockedDates(data.blocked_dates);
      })
      .catch(() => setBlockedDates([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, calendarCursor, location, selectedService, selectedTier, paidBooking]);

  useEffect(() => {
    if (!appointmentDate || screen < 4) return;
    setSlotsLoading(true);
    setSlotMessage('');
    const params = scheduleQuery(paidBooking);
    params.set('date', appointmentDate);
    fetch(`/api/appointments/available-slots?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.days_of_week) && data.days_of_week.length > 0) {
          setAllowedDays(data.days_of_week.map((day: number) => Number(day)));
        }
        const nextSlots = Array.isArray(data?.available_slots) ? data.available_slots : [];
        setSlots(nextSlots);
        setSlotMessage(
          nextSlots.length > 0 ? '' : 'No available time slots for this date. Please select another date.'
        );
      })
      .catch(() => {
        setSlots([]);
        setSlotMessage('Error loading time slots. Please try again.');
      })
      .finally(() => setSlotsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentDate, location, selectedService, selectedTier, paidBooking, screen]);

  const scrollToWizard = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('appointment-wizard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const clearSchedule = () => {
    setAppointmentDate('');
    setAppointmentTime('');
    setTimeDisplay('');
    setSlots([]);
  };

  const handleMeetingTypeSelect = (type: Meeting) => {
    setMeetingType(type);
    if (type === 'video-call' && selectedTier === 'consultation') setSelectedTier('');
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    const paidOnly = serviceRequiresPaidPackage(serviceId, meetingType);
    const hideOverseas = hideOverseasPackage(serviceId);
    if (hideOverseas) {
      setSelectedTier('paid-consultation');
      return;
    }
    if (paidOnly && selectedTier === 'consultation') setSelectedTier('');
  };

  const validateAndGoNext = () => {
    setErrorMessage('');

    if (screen === 1) {
      if (!location) {
        setErrorMessage('Please select an office location.');
        return;
      }
      if (!meetingType) {
        setErrorMessage('Please select your preferred meeting type.');
        return;
      }
      if (!preferredLanguage) {
        setErrorMessage('Please select your preferred language.');
        return;
      }
      setScreen(2);
      setTimeout(scrollToWizard, 50);
    } else if (screen === 2) {
      if (!selectedService) {
        setErrorMessage('Please select a service category.');
        return;
      }
      setScreen(3);
      setTimeout(scrollToWizard, 50);
    } else if (screen === 3) {
      if (!selectedTier) {
        setErrorMessage('Please select a consultation option.');
        return;
      }
      if (mustPay && selectedTier === 'consultation') {
        setErrorMessage('This appointment is available as a paid consultation only.');
        return;
      }
      clearSchedule();
      setScreen(4);
      setTimeout(scrollToWizard, 50);
    } else if (screen === 4) {
      if (!/^[a-zA-Z\s'-]{2,}$/.test(fullName.trim())) {
        setErrorMessage('Full name can only contain letters, spaces, hyphens, and apostrophes.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (phone.replace(/\D/g, '').length < 8) {
        setErrorMessage('Please enter your contact phone number.');
        return;
      }
      if (enquiryDetails.trim().length < 10) {
        setErrorMessage('Please provide at least 10 characters describing your enquiry.');
        return;
      }
      if (!appointmentDate) {
        setErrorMessage('Please select an appointment date.');
        return;
      }
      if (!appointmentTime) {
        setErrorMessage('Please select an appointment time slot.');
        return;
      }
      setScreen(5);
      setTimeout(scrollToWizard, 50);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    if (screen === 4 || screen === 5) clearSchedule();
    setScreen((prev) => Math.max(prev - 1, 1));
    setTimeout(scrollToWizard, 50);
  };

  const handleFinalSubmit = async (isPaidSubmission = false) => {
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    if (turnstileSiteKey && !turnstileToken) {
      setLoading(false);
      setErrorMessage('Please complete the security check before sending.');
      return;
    }

    try {
      const res = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: `${countryCode} ${phone.trim()}`,
          location,
          meeting_type: meetingType,
          preferred_language: preferredLanguage,
          service_type: selectedService,
          specific_service: selectedTier,
          enquiry_details: enquiryDetails.trim(),
          enquiry_type: getEffectiveEnquiryTypeForBooking(location, selectedService, isPaidSubmission),
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          is_paid: isPaidSubmission,
          website_honeypot: honeypot,
          cf_turnstile_response: turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        if (data.payment_required && data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        setPaymentRequired(Boolean(data.payment_required));
        setBookingMessage(data.message || 'Appointment booked successfully.');
        setSubmitted(true);
      } else {
        setTurnstileToken('');
        setTurnstileKey((key) => key + 1);
        setErrorMessage(
          data.message ||
            'There was an issue processing your booking. Please call our office directly on +61 3 9602 1330.'
        );
      }
    } catch {
      setTurnstileToken('');
      setTurnstileKey((key) => key + 1);
      setErrorMessage(
        'Unable to connect to the server. Please call us directly on +61 3 9602 1330.'
      );
    } finally {
      setLoading(false);
    }
  };

  const activeServiceObj = SERVICE_OPTIONS.find((s) => s.id === selectedService);
  const activeTierObj = CONSULTATION_TIERS.find((t) => t.id === selectedTier);

  const choiceClass = (selected: boolean) =>
    `relative w-full text-left rounded-xl border-2 transition-colors motion-reduce:transition-none cursor-pointer ${focusRing} ${
      selected ? 'border-brand-800 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-300'
    }`;
  const tickBadge = (cls: string) => (
    <span className={`rounded-full bg-brand-900 text-white flex items-center justify-center shrink-0 ${cls}`} aria-hidden="true">
      <Check className="w-3 h-3 stroke-[3]" />
    </span>
  );
  const groupLabel = `${fieldLabel} !mb-3`;
  const btnBack = `${btnGhostLight} cursor-pointer`;
  const btnNext = `${btnPrimaryLight} cursor-pointer disabled:opacity-60`;
  const stepTitle = 'text-xl sm:text-2xl font-bold text-brand-900';
  const stepLede = 'mt-2 text-slate-600 leading-relaxed max-w-2xl';
  const meetingLabel =
    meetingType === 'phone' ? 'Phone Call' : meetingType === 'in-person' ? 'In Person' : meetingType === 'video-call' ? 'Video Call' : '';
  const langLabel = preferredLanguage === 'english' ? 'English' : preferredLanguage === 'hindi' ? 'Hindi' : preferredLanguage === 'punjabi' ? 'Punjabi' : '';
  const locationLabel = location === 'melbourne' ? 'Melbourne Office' : location === 'adelaide' ? 'Adelaide Office' : '';
  const timezoneLabel = location === 'adelaide' ? 'Adelaide Time (ACST)' : 'Melbourne Time (AEST)';

  const expectSteps: [string, string][] = [
    ['We confirm your time', 'An adviser confirms your appointment by email or phone, usually within one business day.'],
    ['You meet your adviser', 'We ask about your visa history, goals and any dates that are close.'],
    ['We explain your options', 'You hear what is possible, what it involves and what we would do next.'],
    ['You decide', 'If you want our help, we send a written service agreement. There is no pressure to sign on the day.'],
  ];
  const bringItems = [
    'Your passport and current visa grant notice (or a VEVO check).',
    'Any letters from the Department of Home Affairs, especially with dates.',
    'Your skills assessment, English test result and qualifications, if you have them.',
    'Your employment history, with approximate dates.',
    'For partner matters, a short timeline of your relationship.',
  ];
  const whyItems: [string, string][] = [
    ['Plain-English explanations', 'We explain what is possible, what it involves and what we would do next.'],
    ['Honest, realistic advice', 'We tell you where you stand before you spend money. No agent can guarantee a visa.'],
    ['Registered Migration Agents', 'Advice from registered migration agents. Each MARN is on our team profiles.'],
    ['Personalised service', 'Options matched to your circumstances, goals and dates.'],
  ];
  const faqs = [
    {
      q: 'Do I have to pay for the first appointment?',
      a: 'The free appointment is only for clients currently in Australia, and only one free consultation is provided per client. If you are outside Australia, or the matter needs more than 10 minutes (including ART, visa cancellation, or protection visas), choose the $150 migration advice option.',
    },
    {
      q: 'Can I have a video appointment?',
      a: 'Yes. Video appointments are available for paid consultations. Phone calls and in-person visits are also available.',
    },
    {
      q: 'Can I choose my adviser?',
      a: (
        <>
          Yes. Mention the agent you prefer in the Details step. Our{' '}
          <Link href="/team" className={linkText}>team page</Link> shows each agent’s profile.
        </>
      ),
    },
    {
      q: 'Can I book if I am outside Australia?',
      a: 'Yes. Choose a phone or video appointment and tell us your time zone in the Details step.',
    },
    { q: 'Which language can I use?', a: 'English, Hindi or Punjabi. Select it in the first step.' },
    {
      q: 'Should I fill in the office visit form?',
      a: (
        <>
          If you are coming to the office, yes. It saves time at your appointment. See the{' '}
          <Link href="/office-visit-form" className={linkText}>Office Visit Form</Link>.
        </>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-slate-50/50">
        <Breadcrumbs items={[{ label: 'Book an Appointment' }]} className="max-w-7xl mx-auto" />
      </div>

      <PageHero
        badge="Registered migration agents, Melbourne and Adelaide"
        badgeIcon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
        title="Book an Appointment with a Registered Migration Agent"
        intro="Choose your office, meeting type and language, then tell us what you need help with. An adviser will confirm your time. Appointments are available in person, by phone and by video."
        actions={
          <>
            <a href="#appointment-wizard" className={`${btnPrimaryDark} w-full sm:w-auto`}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book Your Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="tel:+61396021330" className={`${btnGhostDark} w-full sm:w-auto`}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call +61 3 9602 1330
            </a>
          </>
        }
      />

      {/* Wizard and sidebar */}
      <section id="appointment-wizard" className={`${sectionY} bg-slate-50 scroll-mt-20`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <div className={`${card} ${cardPad} lg:p-10`}>
                {/* Progress */}
                <div className="border-b border-slate-200 pb-6 mb-8">
                  <ol className="grid grid-cols-4 gap-2" aria-label="Booking progress">
                    {STEPS.map((s) => {
                      const isCompleted = indicatorStep > s.num;
                      const isActive = indicatorStep === s.num;
                      const isClickable = s.num < indicatorStep;
                      return (
                        <li key={s.num} className="flex justify-center">
                          <button
                            type="button"
                            disabled={!isClickable && !isActive}
                            onClick={() => {
                              if (isClickable) {
                                const target = s.num === 1 ? 1 : s.num === 2 ? 2 : s.num === 3 ? 4 : 5;
                                if (screen >= 4) clearSchedule();
                                setScreen(target);
                                setTimeout(scrollToWizard, 50);
                              }
                            }}
                            className={`flex flex-col items-center text-center min-h-12 rounded-lg px-1 ${focusRing} ${
                              isClickable ? 'cursor-pointer group' : 'cursor-default'
                            }`}
                            aria-current={isActive ? 'step' : undefined}
                          >
                            <span
                              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-colors motion-reduce:transition-none ${
                                isCompleted
                                  ? 'bg-brand-900 text-white'
                                  : isActive
                                  ? 'bg-brand-700 text-white ring-4 ring-brand-700/30'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" aria-hidden="true" /> : s.num}
                            </span>
                            <span
                              className={`text-xs sm:text-sm mt-2.5 ${
                                isCompleted
                                  ? 'font-semibold text-slate-800 group-hover:text-brand-900'
                                  : isActive
                                  ? 'font-bold text-brand-900'
                                  : 'font-medium text-slate-600'
                              }`}
                            >
                              {s.label}
                              <span className="sr-only">
                                {isCompleted ? ' (completed)' : isActive ? ' (current step)' : ''}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm sm:text-base flex items-start gap-2.5 mb-6 animate-in fade-in"
                  >
                    <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>{errorMessage}</div>
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-6 animate-in fade-in" role="status">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mb-3">
                      {paymentRequired ? 'Appointment reserved' : 'Appointment booked'}
                    </h2>
                    <p className="text-slate-600 max-w-md mx-auto text-base mb-6 leading-relaxed">
                      Thank you, <strong className="text-slate-900">{fullName}</strong>. Your appointment is{' '}
                      <strong>{appointmentDate}</strong> at <strong>{timeDisplay || appointmentTime}</strong>. {bookingMessage}
                    </p>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 max-w-md mx-auto mb-6 text-left space-y-2">
                      <p>
                        <strong>Location &amp; Format:</strong>{' '}
                        {locationLabel} (
                        {meetingType === 'phone' ? 'Phone Call' : meetingType === 'in-person' ? 'In Person' : 'Video Call'})
                      </p>
                      <p>
                        <strong>Service:</strong> {activeServiceObj?.title}
                      </p>
                      <p>
                        <strong>Consultation Package:</strong> {activeTierObj?.title} ({activeTierObj?.price})
                      </p>
                      <p>
                        <strong>Language:</strong> {langLabel}
                      </p>
                      <p className="break-words">
                        <strong>Confirmation Sent To:</strong> {email}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 mb-6">
                      {paymentRequired
                        ? 'This is a $150 consultation. Payment is required before the appointment is confirmed. Call +61 3 9602 1330 if you need help paying.'
                        : 'Free bookings stay pending until our office or you confirm the time.'}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setScreen(1);
                        setFullName('');
                        setEmail('');
                        setPhone('');
                        setEnquiryDetails('');
                      }}
                      className={btnBack}
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* STEP 1 */}
                    {screen === 1 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h2 className={stepTitle}>Choose Your Preferred Location</h2>
                          <p className={stepLede}>
                            Select office location, consultation meeting type, and preferred communication language.
                          </p>
                        </div>

                        <fieldset>
                          <legend className={groupLabel}>Select Office Location</legend>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { id: 'adelaide' as const, name: 'Adelaide Office', l1: 'Unit 5, 55 Gawler Pl', l2: 'Adelaide SA 5000' },
                              { id: 'melbourne' as const, name: 'Melbourne Office', l1: 'Level 8/278 Collins St', l2: 'Melbourne VIC 3000' },
                            ].map((o) => (
                              <button
                                key={o.id}
                                type="button"
                                aria-pressed={location === o.id}
                                onClick={() => setLocation(o.id)}
                                className={`${choiceClass(location === o.id)} p-5 flex flex-col`}
                              >
                                <span className="flex items-start justify-between gap-2">
                                  <span className="font-bold text-slate-900 text-base">{o.name}</span>
                                  {location === o.id && tickBadge('w-5 h-5')}
                                </span>
                                <span className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                                  {o.l1}
                                  <br />
                                  {o.l2}
                                </span>
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className={groupLabel}>Meeting Type</legend>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                              { id: 'phone' as const, name: 'Phone Call', sub: 'Speak directly with our experts', icon: Phone },
                              { id: 'in-person' as const, name: 'In Person', sub: 'Visit our office', icon: Building },
                              { id: 'video-call' as const, name: 'Video Call', sub: 'Online consultation', icon: Video },
                            ].map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                aria-pressed={meetingType === m.id}
                                onClick={() => handleMeetingTypeSelect(m.id)}
                                className={`${choiceClass(meetingType === m.id)} p-5 flex flex-col items-center text-center`}
                              >
                                {meetingType === m.id && <span className="absolute top-3 right-3">{tickBadge('w-5 h-5')}</span>}
                                <IconTile icon={m.icon} />
                                <span className="mt-3 font-bold text-slate-900">{m.name}</span>
                                <span className="mt-1 text-sm text-slate-600">{m.sub}</span>
                                {m.id === 'video-call' && (
                                  <span className="mt-1.5 text-xs font-semibold text-brand-800">
                                    Available for paid appointments only
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className={groupLabel}>Preferred Language</legend>
                          <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {[
                              { code: 'EN', id: 'english' as const, name: 'English' },
                              { code: 'HI', id: 'hindi' as const, name: 'Hindi' },
                              { code: 'PA', id: 'punjabi' as const, name: 'Punjabi' },
                            ].map((lang) => {
                              const isSelected = preferredLanguage === lang.id;
                              return (
                                <button
                                  key={lang.id}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => setPreferredLanguage(lang.id)}
                                  className={`${choiceClass(isSelected)} min-h-14 px-3 py-3 text-center`}
                                >
                                  {isSelected && <span className="absolute top-2 right-2">{tickBadge('w-4 h-4')}</span>}
                                  <span className="block text-xs font-bold text-slate-600 tracking-wider">{lang.code}</span>
                                  <span className="block text-sm font-bold text-slate-900">{lang.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        <div className="pt-2 flex justify-end">
                          <button type="button" onClick={validateAndGoNext} className={`${btnNext} w-full sm:w-auto`}>
                            <span>Next Step</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}

                    {screen === 2 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h2 className={stepTitle}>Select Your Service</h2>
                          <p className={stepLede}>Choose the service you need. The consultation length is chosen on the next screen.</p>
                        </div>
                        <fieldset>
                          <legend className={groupLabel}>Choose the service you need</legend>
                          <div className="grid grid-cols-1 gap-3">
                            {SERVICE_OPTIONS.map((srv) => {
                              const isSelected = selectedService === srv.id;
                              return (
                                <button
                                  key={srv.id}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => handleServiceSelect(srv.id)}
                                  className={`${choiceClass(isSelected)} min-h-14 p-4 flex items-center justify-between gap-3`}
                                >
                                  <span className={`text-sm leading-snug ${isSelected ? 'font-bold text-brand-950' : 'font-medium text-slate-800'}`}>
                                    {srv.title}
                                  </span>
                                  {isSelected && tickBadge('w-5 h-5')}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                          <button type="button" onClick={handlePrevStep} className={`${btnBack} w-full sm:w-auto`}>
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            <span>Previous</span>
                          </button>
                          <button type="button" onClick={validateAndGoNext} className={`${btnNext} w-full sm:w-auto`}>
                            <span>Next Step</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}

                    {screen === 3 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h2 className={stepTitle}>Select Service</h2>
                          <p className={stepLede}>
                            Free 10-minute consultations are for clients currently in Australia. Video calls, complex matters, visa cancellations, and overseas enquiries use a paid consultation.
                          </p>
                        </div>
                        <fieldset>
                          <legend className={groupLabel}>Consultation</legend>
                          <div className="space-y-3">
                            {CONSULTATION_TIERS.filter((tier) => {
                              if (tier.id === 'consultation' && mustPay) return false;
                              if (tier.id === 'overseas-enquiry' && overseasHidden) return false;
                              return true;
                            }).map((tier) => {
                              const isSelected = selectedTier === tier.id;
                              const minutes = tier.id === 'consultation' ? '10' : String(paidMinutes);
                              return (
                                <button
                                  key={tier.id}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => {
                                    setSelectedTier(tier.id as Tier);
                                    clearSchedule();
                                  }}
                                  className={`${choiceClass(isSelected)} p-5 flex flex-col sm:flex-row sm:items-start gap-4`}
                                >
                                  <span
                                    className={`w-16 h-14 rounded-xl flex items-center justify-center font-extrabold text-base shrink-0 ${
                                      tier.id === 'consultation'
                                        ? 'bg-brand-700 text-white'
                                        : 'bg-brand-50 text-brand-900 border border-brand-100'
                                    }`}
                                  >
                                    {tier.id === 'overseas-enquiry' ? 'OVERSEAS' : tier.price}
                                  </span>
                                  <span className="flex-1 min-w-0 text-left">
                                    <span className="flex items-center gap-2 flex-wrap">
                                      <span className="font-bold text-slate-900 text-base">{tier.title}</span>
                                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                        {tier.id === 'consultation' ? tier.duration : `${minutes} minutes`}
                                      </span>
                                    </span>
                                    <span className="block text-sm text-slate-600 mt-1.5 leading-relaxed">{tier.description}</span>
                                    <span className="block text-xs text-slate-600 mt-1.5">
                                      {tier.id === 'consultation' ? tier.availability : `${minutes}-minute time slots`}
                                    </span>
                                  </span>
                                  {isSelected && tickBadge('w-5 h-5')}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                          <button type="button" onClick={handlePrevStep} className={`${btnBack} w-full sm:w-auto`}>
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            <span>Previous</span>
                          </button>
                          <button type="button" onClick={validateAndGoNext} className={`${btnNext} w-full sm:w-auto`}>
                            <span>Next Step</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}

                    {screen === 4 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                          <h2 className={stepTitle}>Your Details &amp; Appointment Time</h2>
                          <p className={stepLede}>
                            Provide your contact info and select an available consultation date and time slot.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="bk-name" className={fieldLabel}>
                              Full Name <span className="text-red-700" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="bk-name"
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="e.g. John Doe"
                              className={fieldInput}
                            />
                          </div>

                          <div>
                            <label htmlFor="bk-email" className={fieldLabel}>
                              Email Address <span className="text-red-700" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="bk-email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. john@example.com"
                              className={fieldInput}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="bk-phone" className={fieldLabel}>
                            Phone Number <span className="text-red-700" aria-hidden="true">*</span>
                          </label>
                          <PhoneField
                            id="bk-phone"
                            required
                            dial={countryCode}
                            onDialChange={setCountryCode}
                            value={phone}
                            onValueChange={setPhone}
                            selectClassName={`${fieldInput} !w-auto`}
                            inputClassName={fieldInput}
                          />
                        </div>

                        <div>
                          <label htmlFor="bk-details" className={fieldLabel}>
                            Details of Enquiry <span className="text-red-700" aria-hidden="true">*</span>
                          </label>
                          <textarea
                            id="bk-details"
                            rows={3}
                            required
                            value={enquiryDetails}
                            onChange={(e) => setEnquiryDetails(e.target.value)}
                            placeholder="Please provide detailed information about your visa background, questions, or goals..."
                            className={`${fieldInput} resize-y`}
                          />
                        </div>

                        <div className="border-t border-slate-200 pt-6 space-y-5">
                          <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-100 text-brand-950 text-sm flex items-center gap-2.5">
                            <Clock className="w-4 h-4 text-brand-800 shrink-0" aria-hidden="true" />
                            <span>
                              All times shown in <strong>{timezoneLabel}</strong>
                            </span>
                          </div>

                          <fieldset>
                            <legend className={groupLabel}>Select Date &amp; Time</legend>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="rounded-2xl border border-slate-200 p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <button
                                    type="button"
                                    className={`${btnGhostLight} !min-h-10 !px-3`}
                                    onClick={() => setCalendarCursor(new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1))}
                                  >
                                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                                    <span className="sr-only">Previous month</span>
                                  </button>
                                  <p className="font-bold text-slate-900">
                                    {calendarCursor.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                                  </p>
                                  <button
                                    type="button"
                                    className={`${btnGhostLight} !min-h-10 !px-3`}
                                    onClick={() => setCalendarCursor(new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1))}
                                  >
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    <span className="sr-only">Next month</span>
                                  </button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 mb-1">
                                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                                    <span key={d}>{d}</span>
                                  ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                  {Array.from({ length: new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), 1).getDay() }).map((_, i) => (
                                    <span key={`pad-${i}`} />
                                  ))}
                                  {Array.from({ length: new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 0).getDate() }).map((_, index) => {
                                    const day = index + 1;
                                    const date = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), day);
                                    const dateStr = ymd(date);
                                    const jsDay = date.getDay();
                                    const iso = jsDay === 0 ? 7 : jsDay;
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const disabled = date <= today || !allowedDays.includes(iso) || blockedDates.includes(dateStr);
                                    const isSelected = appointmentDate === dateStr;
                                    return (
                                      <button
                                        key={dateStr}
                                        type="button"
                                        disabled={disabled}
                                        aria-pressed={isSelected}
                                        onClick={() => {
                                          setSlots([]);
                                          setSlotsLoading(true);
                                          setSlotMessage('');
                                          setAppointmentDate(dateStr);
                                          setAppointmentTime('');
                                          setTimeDisplay('');
                                        }}
                                        className={`min-h-10 rounded-lg text-sm font-semibold ${focusRing} ${
                                          isSelected
                                            ? 'bg-brand-900 text-white'
                                            : disabled
                                            ? 'text-slate-300 cursor-not-allowed'
                                            : 'text-slate-800 hover:bg-brand-50'
                                        }`}
                                      >
                                        {day}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 mb-3">
                                  {appointmentDate
                                    ? new Date(`${appointmentDate}T00:00:00`).toLocaleDateString('en-AU')
                                    : 'Select a date'}
                                </p>
                                {slotsLoading ? (
                                  <p className="text-sm text-slate-600">Loading available time slots...</p>
                                ) : slots.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-2">
                                    {slots.map((slot) => {
                                      const isSelected = appointmentTime === slot.time;
                                      return (
                                        <button
                                          key={slot.time}
                                          type="button"
                                          aria-pressed={isSelected}
                                          onClick={() => {
                                            setAppointmentTime(slot.time);
                                            setTimeDisplay(slot.display);
                                          }}
                                          className={`min-h-12 px-2 rounded-xl border-2 text-sm ${focusRing} ${
                                            isSelected
                                              ? 'bg-brand-900 border-brand-900 text-white font-bold'
                                              : 'border-slate-200 bg-white hover:border-brand-300 text-slate-800 font-medium'
                                          }`}
                                        >
                                          {slot.display}
                                        </button>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-sm text-red-700">
                                    {appointmentDate ? slotMessage || 'No available time slots for this date. Please select another date.' : 'Choose a date to see open times.'}
                                  </p>
                                )}
                              </div>
                            </div>
                          </fieldset>
                        </div>

                        <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                          <button type="button" onClick={handlePrevStep} className={`${btnBack} w-full sm:w-auto`}>
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            <span>Previous</span>
                          </button>
                          <button type="button" onClick={validateAndGoNext} className={`${btnNext} w-full sm:w-auto`}>
                            <span>Review &amp; Confirm</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4 */}
                    {screen === 5 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                          <h2 className={stepTitle}>Confirm Your Appointment</h2>
                          <p className={stepLede}>Please review your details before submitting your consultation request.</p>
                        </div>

                        <dl className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 text-sm sm:text-base">
                          {[
                            ['Full Name', fullName, 'font-bold'],
                            ['Email', email, ''],
                            ['Phone', `${countryCode} ${phone}`, ''],
                            [
                              'Location',
                              locationLabel,
                              'font-medium',
                            ],
                            ['Meeting Type', meetingLabel, 'font-medium'],
                            ['Preferred Language', langLabel, ''],
                            ['Service', activeServiceObj?.title, 'font-semibold'],
                            ['Service Package', `${activeTierObj?.title} (${activeTierObj?.price})`, 'font-bold'],
                            [
                              'Date & Time',
                              `${appointmentDate} at ${timeDisplay || appointmentTime} (${timezoneLabel})`,
                              'font-bold text-brand-800',
                            ],
                            ['Enquiry Details', enquiryDetails, 'whitespace-pre-wrap'],
                          ].map(([k, v, cls], i) => (
                            <div key={k} className={`grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 p-4 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                              <dt className="font-semibold text-slate-600">{k}</dt>
                              <dd className={`sm:col-span-2 text-slate-900 break-words ${cls}`}>{v}</dd>
                            </div>
                          ))}
                        </dl>

                        {selectedTier === 'consultation' ? (
                          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-sm flex items-start gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" aria-hidden="true" />
                            <span>
                              <strong>No payment required:</strong> Your 10-minute initial consultation is free for onshore Australian clients.
                            </span>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-brand-50 border border-brand-100 text-brand-950 text-sm flex items-start gap-2.5">
                            <Info className="w-5 h-5 text-brand-800 shrink-0" aria-hidden="true" />
                            <span>
                              <strong>Professional consultation fee ($150 AUD):</strong> Pay &amp; Submit opens the secure payment page. The appointment is confirmed after payment.
                            </span>
                          </div>
                        )}

                        <div className="hidden" aria-hidden="true">
                          <label htmlFor={honeypotId}>Leave blank</label>
                          <input
                            type="text"
                            id={honeypotId}
                            name="website_honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                          />
                        </div>

                        <TurnstileField eager resetKey={turnstileKey} onToken={setTurnstileToken} />

                        <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                          <button type="button" onClick={handlePrevStep} className={`${btnBack} w-full sm:w-auto`}>
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            <span>Previous</span>
                          </button>

                          {selectedTier === 'consultation' ? (
                            <button
                              type="button"
                              disabled={loading}
                              onClick={() => handleFinalSubmit(false)}
                              className={`${btnNext} w-full sm:w-auto`}
                            >
                              {loading ? <span>Submitting...</span> : <span>Submit Appointment</span>}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={loading}
                              onClick={() => handleFinalSubmit(true)}
                              className={`${btnNext} w-full sm:w-auto`}
                            >
                              {loading ? <span>Preparing payment...</span> : <span>Pay &amp; Submit ($150)</span>}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className={`${card} p-6`}>
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center">
                    <Image src="/img/logo/logo.webp" alt="Bansal Immigration" width={44} height={44} className="object-contain" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-base leading-tight">Bansal Immigration</p>
                    <p className="text-sm text-slate-600">Your Future, Our Priority</p>
                  </div>
                </div>

                <h2 className="mt-5 font-bold text-slate-900 text-lg">Why book with us?</h2>
                <ul className="mt-4 space-y-4">
                  {whyItems.map(([t, d]) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="text-sm text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 block">{t}</strong>
                        {d}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
                <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5 text-brand-800" aria-hidden="true" />
                  Need immediate help?
                </h2>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  Call our team during business hours (Monday to Friday, 9:30 am to 6:00 pm) or send an email inquiry.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href="tel:+61396021330" className={btnPrimaryLight}>
                    Call: +61 3 9602 1330
                  </a>
                  <Link href="/contact" className={btnGhostLight}>
                    Send an Inquiry
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* What happens after you book */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="What to expect" title="What happens after you book" />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {expectSteps.map(([t, d], i) => (
              <li key={t} className={`${card} ${cardPad} flex flex-col`}>
                <span className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What to bring */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader eyebrow="Preparation" title="Bring these to make your appointment count" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className={`${card} ${cardPad} lg:col-span-7`}>
              <ul className="space-y-4">
                {bringItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-950">
                <AlertCircle className="w-5 h-5" aria-hidden="true" />
                Urgent?
              </h3>
              <p className="mt-3 text-slate-800 leading-relaxed">
                If your visa is about to expire, or you have a cancellation notice or a review deadline, call{' '}
                <a href="tel:+61396021330" className={linkText}>+61 3 9602 1330</a>{' '}
                now. Do not wait for an online booking to be confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Offices" title="Offices and contact" lede="Monday to Friday, 9:30 am to 6:00 pm. Closed Saturday and Sunday." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {[
              { name: 'Melbourne head office', addr: 'Level 8/278 Collins St, Melbourne VIC 3000', tel: 'tel:+61396021330', phone: '+61 3 9602 1330' },
              { name: 'Adelaide office', addr: 'Unit 5, 55 Gawler Pl, Adelaide SA 5000', tel: 'tel:+61883171340', phone: '+61 8 8317 1340' },
            ].map((o) => (
              <div key={o.name} className={`${card} ${cardPad} flex gap-4`}>
                <IconTile icon={Building} />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{o.name}</h3>
                  <p className="mt-1.5 text-slate-600">{o.addr}</p>
                  <a href={o.tel} className={`mt-3 inline-flex items-center gap-1.5 ${linkText}`}>
                    <Phone className="w-4 h-4" aria-hidden="true" /> {o.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className={`${btnPrimaryLight} w-full sm:w-auto`}>
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Before you book" title="Important booking information" />
          <div className="mt-10 max-w-3xl space-y-3">
            {[
              [
                'Migration Consultation (Free Option)',
                'In-person or phone meetings can be free. A 10-minute free phone consultation is also available, but please put the relevant facts in the enquiry box so the adviser can use the time properly. If your matter is Australian permanent residency, choose the PR service and include the details in advance.',
              ],
              [
                'Overseas Applicant Enquiry',
                'The free first appointment is only for clients currently in Australia. If you are outside Australia, or asking for someone who is, choose Migration Advice and pay the $150 consultation fee. Send a detailed resume and your questions so they can be reviewed before the call.',
              ],
              [
                'Migration Advice (Paid Service)',
                'The fee is $150 for most migration advice, including ART, visa cancellation, and protection visa matters, or anything that needs more than 10 minutes. Only one free consultation is provided per client.',
              ],
              [
                'Additional information and help',
                'Appointments booked here are with an available agent registered with OMARA. If you want a specific person, name them in the enquiry. Ajay Bansal is no longer with Bansal Immigration; appointments with him are booked at Bansal Lawyers. If you are unsure which option to choose, call 03 9602 1330. If the required information is not provided, the appointment may be cancelled without prior notice.',
              ],
            ].map(([title, body]) => (
              <details key={title} className={`${card} px-5 py-4`}>
                <summary className="cursor-pointer font-bold text-slate-900">{title}</summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Booking questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={faqs} />
            <p className="mt-8 text-slate-600 leading-relaxed">
              Coming to the office? Fill in the{' '}
              <Link href="/office-visit-form" className={linkText}>Office Visit Form</Link>. More about us on the{' '}
              <Link href="/about" className={linkText}>About page</Link>, or{' '}
              <Link href="/team" className={linkText}>meet the team</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
