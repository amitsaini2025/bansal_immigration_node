'use client';

import React, { useState } from 'react';
import PhoneField from '@/components/forms/PhoneField';
import Link from 'next/link';
import { PhoneCall, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

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

const VISA_OPTIONS = [
  'Skilled Migration (Subclasses 189, 190, 491)',
  'Study in Australia & Student Visa (Subclass 500)',
  'Partner & Family Visas (Subclasses 820, 801, 309, 100, 300, Parents)',
  'Employer-Sponsored Visas (Skills in Demand, ENS 186, 494, DAMA)',
  'Visitor Visas (Subclass 600, ETA 601, eVisitor 651)',
  'Skills Assessments (VETASSESS, ACS, Engineers Australia, TRA)',
  'Citizenship & Evidence of Citizenship',
  'Refusals and Cancellations (Appeals & ART Reviews)',
  'Other Australian Visa Enquiry',
];

export default function RequestCallbackSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+61');
  const [phone, setPhone] = useState('');
  const [currentCountry, setCurrentCountry] = useState('Australia');
  const [visaCategory, setVisaCategory] = useState(VISA_OPTIONS[0]);
  const [preferredTime, setPreferredTime] = useState('Morning (9:30 AM - 12:00 PM AEST)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam check
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const fullPhone = `${countryCode} ${phone.trim()}`;

    setLoading(true);

    try {
      const res = await fetch('/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: fullPhone,
          subject: `Callback Request: ${visaCategory}`,
          message: `Current Country: ${currentCountry}\nVisa / Service Enquiry: ${visaCategory}\nPreferred Contact Time & Time Zone: ${preferredTime}\nShort Message: ${message.trim() || 'No additional message provided.'}`,
          form_source: 'homepage_request_callback',
          form_variant: 'callback',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        setSubmitted(true);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Callback Form',
            event_label: visaCategory,
          });
        }
      } else {
        setErrorMessage(
          data.message || 'Unable to submit your request right now. Please call us directly on +61 3 9602 1330.'
        );
      }
    } catch {
      setErrorMessage(
        'Connection error. Please call our Melbourne head office directly on +61 3 9602 1330.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="request-callback" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Context & Information */}
            <div className="lg:col-span-5 bg-brand-950 text-white p-8 sm:p-12 flex flex-col justify-between">
              <div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                  Request a call back11
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  Tell us briefly what you need help with and the best way to reach you. Include your current country and any approaching visa expiry or response deadline.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Registered Migration Agents</h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Consult directly with registered professionals bound by the statutory OMARA Code of Conduct.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-4 h-4 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Confidential Handling</h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Your information is handled strictly as described in our Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Office Contacts */}
              <div className="pt-6 border-t border-white/15 space-y-2">
                <p className="text-xs text-slate-300">Direct Office Contacts:</p>
                <div className="text-xs text-slate-200">
                  <span className="font-semibold text-white">Melbourne:</span>{' '}
                  <a href="tel:+61396021330" className="hover:text-gold-300 underline font-medium">
                    +61 3 9602 1330
                  </a>
                </div>
                <div className="text-xs text-slate-200">
                  <span className="font-semibold text-white">Adelaide:</span>{' '}
                  <a href="tel:+61883171340" className="hover:text-gold-300 underline font-medium">
                    +61 8 8317 1340
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Callback Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Call Back Request Received
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base mb-6 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{name}</strong>. Our registered migration team will review your enquiry regarding <strong className="text-slate-900">{visaCategory}</strong> and reach out to you at <strong className="text-slate-900">{countryCode} {phone}</strong>.
                  </p>
                  <div className="inline-block p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 max-w-md">
                    Please use this form for a short enquiry. The team can explain how to provide any identity or sensitive documents needed for your matter.
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>{errorMessage}</div>
                    </div>
                  )}

                  {/* Honeypot for spam bots */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_honeypot">Leave blank</label>
                    <input
                      type="text"
                      id="website_honeypot"
                      name="website_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number with Country Code & Current Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rc-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number with Country Code <span className="text-red-500">*</span>
                      </label>
                      <PhoneField
                        id="rc-phone"
                        required
                        dial={countryCode}
                        onDialChange={setCountryCode}
                        value={phone}
                        onValueChange={setPhone}
                        selectClassName="px-2.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-700"
                        inputClassName="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Current Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={currentCountry}
                        onChange={(e) => setCurrentCountry(e.target.value)}
                        placeholder="e.g. Australia, India, etc."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Visa Enquiry & Preferred Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Visa or Service Enquiry
                      </label>
                      <select
                        value={visaCategory}
                        onChange={(e) => setVisaCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 cursor-pointer"
                      >
                        {VISA_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Contact Time &amp; Time Zone
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 cursor-pointer"
                      >
                        <option value="Morning (9:30 AM - 12:00 PM AEST)">Morning (9:30 AM - 12:00 PM AEST)</option>
                        <option value="Afternoon (12:00 PM - 3:00 PM AEST)">Afternoon (12:00 PM - 3:00 PM AEST)</option>
                        <option value="Late Afternoon (3:00 PM - 5:30 PM AEST)">Late Afternoon (3:00 PM - 5:30 PM AEST)</option>
                        <option value="Adelaide Time (ACST) Business Hours">Adelaide Time (ACST) Business Hours</option>
                        <option value="Overseas / Alternate Time Zone">Overseas / Alternate Time Zone</option>
                      </select>
                    </div>
                  </div>

                  {/* Short message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Short Message
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly state what you need help with, current visa status, or any approaching deadline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-md hover:shadow-lg disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                    >
                      {loading ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Request a Call Back</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Statutory Privacy & Handling Disclosure */}
                  <p className="text-xs text-slate-500 leading-relaxed text-center pt-2">
                    Your information will be handled as described in our{' '}
                    <Link href="/privacy-policy" className="underline hover:text-slate-800 font-medium">
                      Privacy Policy
                    </Link>
                    . Please use this form for a short enquiry. The team can explain how to provide any identity or sensitive documents needed for your matter.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
