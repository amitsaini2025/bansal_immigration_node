'use client';

import React, { useState } from 'react';
import PhoneField from '@/components/forms/PhoneField';
import { TurnstileField, useTurnstileSiteKey } from '@/components/forms/TurnstileField';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { card, btnPrimaryLight, btnGhostLight, fieldInput, fieldLabel } from '@/components/ui/brand';

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

const VISA_SERVICES = [
  'Skilled Migration (Subclasses 189, 190, 491)',
  'Employer Sponsored Visas (482, 186, 494)',
  'Student Visa & Admissions (Subclass 500)',
  'Temporary Graduate Visa (Subclass 485)',
  'Partner & Spouse Visas (820/801, 309/100)',
  'Parent & Contributory Parent Visas',
  'Administrative Review Tribunal (ART) Appeals',
  'Visitor & Tourist Visas (Subclass 600)',
  'Australian Citizenship Applications',
  'General Migration Enquiry',
];

export default function MainContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+61');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(VISA_SERVICES[0]);
  const [officePreference, setOfficePreference] = useState('Melbourne Head Office');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const turnstileSiteKey = useTurnstileSiteKey();
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam honeypot
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!name.trim()) {
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

    if (turnstileSiteKey && !turnstileToken) {
      setErrorMessage('Please complete the security check before sending.');
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${countryCode} ${phone.trim()}`;
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
          subject: `Enquiry: ${service} (${officePreference})`,
          message: `Visa Service: ${service}\nPreferred Office: ${officePreference}\nMessage: ${message.trim() || 'No additional details provided.'}`,
          form_source: 'contact_page_main',
          form_variant: 'full',
          website_honeypot: honeypot,
          cf_turnstile_response: turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        setSubmitted(true);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Contact Form',
            event_label: service,
          });
        }
      } else {
        setTurnstileToken('');
        setTurnstileKey((key) => key + 1);
        setErrorMessage(
          data.message || 'There was an issue submitting your message. Please call our Melbourne office on +61 3 9602 1330.'
        );
      }
    } catch {
      setTurnstileToken('');
      setTurnstileKey((key) => key + 1);
      setErrorMessage('Unable to connect to the server. Please call us directly on +61 3 9602 1330.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`${card} p-6 sm:p-10 text-center`}>
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-extrabold text-brand-900 mb-2">
          Your Enquiry Has Been Received
        </h3>
        <p className="text-slate-600 max-w-md mx-auto text-base mb-6 leading-relaxed">
          Thank you, <strong className="text-slate-900">{name}</strong>. A registered migration agent will review your case details and respond within <strong>1 business day</strong>.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 max-w-md mx-auto mb-6 text-left space-y-1">
          <p><strong>Service Requested:</strong> {service}</p>
          <p><strong>Office / Mode:</strong> {officePreference}</p>
          <p><strong>Contact Email:</strong> {email}</p>
          <p><strong>Contact Phone:</strong> {countryCode} {phone}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setTurnstileToken('');
            setTurnstileKey((key) => key + 1);
          }}
          className={`${btnGhostLight} cursor-pointer`}
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`${card} p-6 sm:p-8 lg:p-10`}>
      {errorMessage && (
        <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5 mb-6">
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot for spam bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_honeypot_contact">Leave blank</label>
          <input
            type="text"
            id="website_honeypot_contact"
            name="website_honeypot_contact"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cf-name" className={fieldLabel}>
              Full Name <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className={fieldInput}
            />
          </div>

          <div>
            <label htmlFor="cf-email" className={fieldLabel}>
              Email Address <span className="text-red-700" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className={fieldInput}
            />
          </div>
        </div>

        {/* Phone with Country Code */}
        <div>
          <label htmlFor="cf-phone" className={fieldLabel}>
            Phone Number <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <PhoneField
            id="cf-phone"
            required
            dial={countryCode}
            onDialChange={setCountryCode}
            value={phone}
            onValueChange={setPhone}
            selectClassName={`${fieldInput} !w-auto`}
            inputClassName={fieldInput}
          />
        </div>

        {/* Service & Office Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cf-service" className={fieldLabel}>
              Visa Service of Interest
            </label>
            <select
              id="cf-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={fieldInput}
            >
              {VISA_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cf-office" className={fieldLabel}>
              Preferred Office Location
            </label>
            <select
              id="cf-office"
              value={officePreference}
              onChange={(e) => setOfficePreference(e.target.value)}
              className={fieldInput}
            >
              <option value="Melbourne Head Office">Melbourne Head Office (Collins St)</option>
              <option value="Adelaide Office">Adelaide Office (Gawler Pl)</option>
              <option value="Virtual Video Consultation">Virtual Video Consultation (Zoom / Teams)</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="cf-message" className={fieldLabel}>
            Your Questions or Case Summary <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please describe your current visa status, occupation, education, and specific immigration questions..."
            className={`${fieldInput} resize-y`}
          />
        </div>

        <TurnstileField resetKey={turnstileKey} onToken={setTurnstileToken} />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimaryLight} w-full cursor-pointer disabled:opacity-60`}
          >
            {loading ? (
              <span>Submitting Enquiry...</span>
            ) : (
              <>
                <span>Submit My Enquiry</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>

        {/* Privacy & Statutory Disclosure */}
        <p className="text-sm text-slate-600 leading-relaxed pt-2">
          Your private information is protected under the <em>Privacy Act 1988 (Cth)</em> and handled strictly in accordance with the Migration Agents Code of Conduct. We never sell or share your personal details.
        </p>
      </form>
    </div>
  );
}
