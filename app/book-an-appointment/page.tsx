'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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

const COUNTRY_CODES = [
  { code: '+61', label: 'AU (+61)', flag: '🇦🇺' },
  { code: '+91', label: 'IN (+91)', flag: '🇮🇳' },
  { code: '+63', label: 'PH (+63)', flag: '🇵🇭' },
  { code: '+64', label: 'NZ (+64)', flag: '🇳🇿' },
  { code: '+44', label: 'UK (+44)', flag: '🇬🇧' },
  { code: '+1', label: 'US/CA (+1)', flag: '🇺🇸' },
  { code: '+971', label: 'UAE (+971)', flag: '🇦🇪' },
  { code: '+65', label: 'SG (+65)', flag: '🇸🇬' },
  { code: '+60', label: 'MY (+60)', flag: '🇲🇾' },
  { code: '+880', label: 'BD (+880)', flag: '🇧🇩' },
  { code: '+977', label: 'NP (+977)', flag: '🇳🇵' },
  { code: '+92', label: 'PK (+92)', flag: '🇵🇰' },
];

const SERVICE_OPTIONS = [
  { id: 'gsm', title: 'GSM Visas: 491, 190, 189, 191', tag: 'Skilled' },
  { id: 'eoi-roi', title: 'EOI/ROI', tag: 'EOI' },
  { id: 'tr-485', title: 'TR: 485 visa', tag: 'Graduate' },
  { id: 'employer-sponsored', title: 'Employer Sponsored Visas: 494, 482, 186, DAMA', tag: 'Employer' },
  { id: 'jrp-skills', title: 'JRP/Skill Assessment', tag: 'Skills' },
  { id: 'tourist', title: 'Tourist Visa', tag: 'Visitor' },
  {
    id: 'education',
    title: 'Education/Course Change/Student Visa/Student Dependent Visa (for Australian onshore clients only)',
    tag: 'Study',
  },
  { id: 'complex-matters', title: 'Complex matters: ART, Protection visa', tag: 'Appeals' },
  { id: 'visa-cancellation', title: 'Visa Cancellation/ NOICC/ Visa refusals', tag: 'Urgent' },
  { id: 'family-visas', title: 'Family Visas (Parent Visa, Partner Visa, Child Visa)', tag: 'Family' },
  { id: 'citizenship', title: 'Citizenship', tag: 'PR/Citizen' },
  { id: 'international-migration', title: 'Anyone who is outside Australia', tag: 'Overseas' },
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

const TIME_SLOTS = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
];

const STEPS = [
  { num: 1, label: 'Location' },
  { num: 2, label: 'Service' },
  { num: 3, label: 'Details' },
  { num: 4, label: 'Confirm' },
];

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);

  // Step 1: Location, Meeting Type, Language
  const [location, setLocation] = useState<'adelaide' | 'melbourne'>('melbourne');
  const [meetingType, setMeetingType] = useState<'phone' | 'in-person' | 'video-call'>('phone');
  const [preferredLanguage, setPreferredLanguage] = useState<'english' | 'hindi' | 'punjabi'>('english');

  // Step 2: Service Type & Consultation Package
  const [selectedService, setSelectedService] = useState('gsm');
  const [selectedTier, setSelectedTier] = useState<'consultation' | 'paid-consultation' | 'overseas-enquiry'>('consultation');

  // Step 3: Details & Date/Time
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+61');
  const [phone, setPhone] = useState('');
  const [enquiryDetails, setEnquiryDetails] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(TIME_SLOTS[0]);

  // Status
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Generate the next 10 business days for quick date selection
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; displayDay: string; displayDate: string }[] = [];
    const today = new Date();
    let count = 0;
    let daysAhead = 1;

    while (count < 10) {
      const d = new Date(today);
      d.setDate(today.getDate() + daysAhead);
      const dayOfWeek = d.getDay();
      // Skip Saturday (6) and Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        const displayDay = d.toLocaleDateString('en-US', { weekday: 'short' });
        const displayDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        dates.push({ dateStr, displayDay, displayDate });
        count++;
      }
      daysAhead++;
    }
    return dates;
  }, []);

  // Default appointment date to the first available business day on initial render
  React.useEffect(() => {
    if (!appointmentDate && availableDates.length > 0) {
      setAppointmentDate(availableDates[0].dateStr);
    }
  }, [availableDates, appointmentDate]);

  const scrollToWizard = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('appointment-wizard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Auto-switch tier if user chooses Video Call or Overseas Service
  const handleMeetingTypeSelect = (type: 'phone' | 'in-person' | 'video-call') => {
    setMeetingType(type);
    if (type === 'video-call' && selectedTier === 'consultation') {
      setSelectedTier('paid-consultation');
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    if (serviceId === 'international-migration') {
      setSelectedTier('overseas-enquiry');
    } else if (selectedTier === 'overseas-enquiry') {
      setSelectedTier('paid-consultation');
    }
  };

  const validateAndGoNext = () => {
    setErrorMessage('');

    if (step === 1) {
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
      setStep(2);
      setTimeout(scrollToWizard, 50);
    } else if (step === 2) {
      if (!selectedService) {
        setErrorMessage('Please select a service category.');
        return;
      }
      if (!selectedTier) {
        setErrorMessage('Please select a consultation option.');
        return;
      }
      setStep(3);
      setTimeout(scrollToWizard, 50);
    } else if (step === 3) {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (!phone.trim()) {
        setErrorMessage('Please enter your contact phone number.');
        return;
      }
      if (!enquiryDetails.trim()) {
        setErrorMessage('Please provide details regarding your immigration enquiry.');
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
      setStep(4);
      setTimeout(scrollToWizard, 50);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setStep((prev) => Math.max(prev - 1, 1));
    setTimeout(scrollToWizard, 50);
  };

  const handleFinalSubmit = async (isPaidSubmission = false) => {
    setLoading(true);
    setErrorMessage('');

    const fullPhone = `${countryCode} ${phone.trim()}`;
    const locationName =
      location === 'melbourne'
        ? 'Melbourne Office (Level 8/278 Collins St)'
        : 'Adelaide Office (Unit 5, 55 Gawler Pl)';
    const meetingTypeName =
      meetingType === 'phone'
        ? 'Phone Call'
        : meetingType === 'in-person'
        ? 'In Person'
        : 'Video Call';
    const langName =
      preferredLanguage === 'english'
        ? 'English'
        : preferredLanguage === 'hindi'
        ? 'Hindi'
        : 'Punjabi';

    const currentService =
      SERVICE_OPTIONS.find((s) => s.id === selectedService)?.title || selectedService;
    const currentTier =
      CONSULTATION_TIERS.find((t) => t.id === selectedTier)?.title || 'Consultation';

    try {
      const res = await fetch('/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          phone: fullPhone,
          subject: `Appointment Booking: ${currentTier} - ${currentService}`,
          message: `Booking Details:\nLocation: ${locationName}\nMeeting Type: ${meetingTypeName}\nLanguage: ${langName}\nService: ${currentService}\nPackage: ${currentTier} (${isPaidSubmission ? '$150 AUD' : 'FREE'})\nDate: ${appointmentDate} at ${appointmentTime} (${location === 'melbourne' ? 'AEST' : 'ACST'})\nEnquiry Details:\n${enquiryDetails.trim()}`,
          form_source: 'book_appointment_wizard_4step',
          form_variant: isPaidSubmission ? 'appointment_paid' : 'appointment_free',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.message ||
            'There was an issue processing your booking. Please call our office directly on +61 3 9602 1330.'
        );
      }
    } catch {
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
  const stepTitle = 'text-xl sm:text-2xl font-bold text-slate-900';
  const stepLede = 'mt-2 text-slate-600 leading-relaxed max-w-2xl';
  const meetingLabel =
    meetingType === 'phone' ? 'Phone Call' : meetingType === 'in-person' ? 'In Person at Office' : 'Video Call (Online)';
  const langLabel = preferredLanguage === 'english' ? 'English' : preferredLanguage === 'hindi' ? 'Hindi' : 'Punjabi';

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
      a: 'It depends on the appointment type. A free 10-minute initial assessment is available for clients currently in Australia. Comprehensive migration advice and overseas applicant enquiries are 30-minute paid appointments. The prices and details are shown in the Service step.',
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
                      const isCompleted = step > s.num;
                      const isActive = step === s.num;
                      const isClickable = s.num < step;
                      return (
                        <li key={s.num} className="flex justify-center">
                          <button
                            type="button"
                            disabled={!isClickable && !isActive}
                            onClick={() => {
                              if (isClickable) {
                                setStep(s.num);
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
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                      Appointment Request Received!
                    </h2>
                    <p className="text-slate-600 max-w-md mx-auto text-base mb-6 leading-relaxed">
                      Thank you, <strong className="text-slate-900">{fullName}</strong>. An OMARA registered migration agent has received your booking request for{' '}
                      <strong>{appointmentDate}</strong> at <strong>{appointmentTime}</strong>.
                    </p>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 max-w-md mx-auto mb-6 text-left space-y-2">
                      <p>
                        <strong>Location &amp; Format:</strong>{' '}
                        {location === 'melbourne' ? 'Melbourne Office' : 'Adelaide Office'} (
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
                      Our office will confirm your appointment schedule and adviser credentials via email shortly.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
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
                    {step === 1 && (
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

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h2 className={stepTitle}>Select Your Service</h2>
                          <p className={stepLede}>
                            Choose the visa category you require and select between free initial guidance or comprehensive legal strategy.
                          </p>
                        </div>

                        <fieldset>
                          <legend className={groupLabel}>Choose the Service You Need</legend>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                  <span className="flex items-center gap-1.5 shrink-0">
                                    <span
                                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        isSelected
                                          ? 'bg-brand-900 text-white'
                                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                                      }`}
                                    >
                                      {srv.tag}
                                    </span>
                                    {isSelected && tickBadge('w-4 h-4')}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className={groupLabel}>Select Service</legend>
                          <div className="space-y-3">
                            {CONSULTATION_TIERS.map((tier) => {
                              const isSelected = selectedTier === tier.id;
                              return (
                                <button
                                  key={tier.id}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => setSelectedTier(tier.id as any)}
                                  className={`${choiceClass(isSelected)} p-5 flex flex-col sm:flex-row sm:items-start gap-4`}
                                >
                                  <span
                                    className={`w-16 h-14 rounded-xl flex items-center justify-center font-extrabold text-base shrink-0 ${
                                      tier.id === 'consultation'
                                        ? 'bg-brand-700 text-white'
                                        : 'bg-brand-50 text-brand-900 border border-brand-100'
                                    }`}
                                  >
                                    {tier.price}
                                  </span>
                                  <span className="flex-1 min-w-0">
                                    <span className="flex items-center gap-2 flex-wrap">
                                      <span className="font-bold text-slate-900 text-base">{tier.title}</span>
                                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                        {tier.duration}
                                      </span>
                                    </span>
                                    <span className="block text-sm text-slate-600 mt-1.5 leading-relaxed">{tier.description}</span>
                                    <span className="block text-xs text-slate-600 mt-1.5">{tier.availability}</span>
                                  </span>
                                  <span
                                    className={`shrink-0 self-start px-3 py-1.5 rounded-lg text-xs font-bold ${
                                      isSelected ? 'bg-brand-900 text-white' : 'border border-slate-300 text-slate-700'
                                    }`}
                                  >
                                    {isSelected ? 'Selected' : 'Select'}
                                  </span>
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

                    {/* STEP 3 */}
                    {step === 3 && (
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
                              All times shown in{' '}
                              <strong>{location === 'melbourne' ? 'Melbourne Time (AEST)' : 'Adelaide Time (ACST)'}</strong>
                            </span>
                          </div>

                          <fieldset>
                            <legend className={groupLabel}>Select Date</legend>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                              {availableDates.map((item) => {
                                const isSelected = appointmentDate === item.dateStr;
                                return (
                                  <button
                                    key={item.dateStr}
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => setAppointmentDate(item.dateStr)}
                                    className={`${choiceClass(isSelected)} min-h-14 px-2 py-2.5 text-center`}
                                  >
                                    <span className="block text-xs font-semibold text-slate-600">{item.displayDay}</span>
                                    <span className={`block text-sm font-bold ${isSelected ? 'text-brand-950' : 'text-slate-900'}`}>
                                      {item.displayDate}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>

                          <fieldset>
                            <legend className={groupLabel}>Select Time Slot</legend>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                              {TIME_SLOTS.map((slot) => {
                                const isSelected = appointmentTime === slot;
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => setAppointmentTime(slot)}
                                    className={`min-h-12 px-2 rounded-xl border-2 text-sm text-center transition-colors motion-reduce:transition-none cursor-pointer ${focusRing} ${
                                      isSelected
                                        ? 'bg-brand-900 border-brand-900 text-white font-bold'
                                        : 'border-slate-200 bg-white hover:border-brand-300 text-slate-800 font-medium'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
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
                    {step === 4 && (
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
                              location === 'melbourne'
                                ? 'Melbourne Office (Level 8/278 Collins St)'
                                : 'Adelaide Office (Unit 5, 55 Gawler Pl)',
                              'font-medium',
                            ],
                            ['Meeting Type', meetingLabel, 'font-medium'],
                            ['Preferred Language', langLabel, ''],
                            ['Service', activeServiceObj?.title, 'font-semibold'],
                            ['Service Package', `${activeTierObj?.title} (${activeTierObj?.price})`, 'font-bold'],
                            [
                              'Date & Time',
                              `${appointmentDate} at ${appointmentTime} (${location === 'melbourne' ? 'Melbourne AEST' : 'Adelaide ACST'})`,
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
                              <strong>Professional consultation fee ($150 AUD):</strong> Our team will confirm your booking and send secure payment instructions before the appointment.
                            </span>
                          </div>
                        )}

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
                              {loading ? <span>Processing...</span> : <span>Pay &amp; Submit ($150)</span>}
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
