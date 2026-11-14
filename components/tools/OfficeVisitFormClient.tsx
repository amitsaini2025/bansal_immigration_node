'use client';

import PhoneField from '@/components/forms/PhoneField';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { toolCard, toolInput, toolLabel, toolPrimaryBtn, toolCheckbox } from '@/components/tools/ToolUI';
import { fieldHint, linkText } from '@/components/ui/brand';

/* Presentational helpers for this form (no logic). */
function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={toolLabel}>
        {label} {required && <span className="text-red-700" aria-hidden="true">*</span>}{required && <span className="sr-only">(required)</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHead({ step, title, sub }: { step: string; title: string; sub: string }) {
  return (
    <div className="border-b border-slate-200 pb-4 flex items-center gap-4">
      <span className="w-10 h-10 rounded-full bg-brand-900 text-white text-base font-bold flex items-center justify-center shrink-0">
        {step}
      </span>
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{sub}</p>
      </div>
    </div>
  );
}

export default function OfficeVisitFormClient() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    filled_by: 'Self',
    filler_first_name: '',
    filler_last_name: '',
    filler_relationship: '',
    first_name: '',
    last_name: '',
    gender: 'Male',
    dob: '',
    age: '',
    nationality: 'Indian',
    marital_status: 'Single',
    email: '',
    country_code: '+61',
    phone: '',
    address: '',
    city: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    country: 'Australia',
    current_visa: 'Student Visa (Subclass 500)',
    visa_expiry_date: '',
    passport_number: '',
    country_of_passport: 'India',
    highest_qualification: 'Bachelor Degree',
    studying: 'No',
    course_name: '',
    english_test_type: 'PTE Academic',
    english_test_score_overall: '65',
    work_experience: '1-2 years',
    occupation: 'Software Developer',
    naati: 'No',
    py: 'No',
    purpose_of_visit: 'PR Points & State Nomination Consultation',
    enquiry_details: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
      setErrorMsg('Please complete all required fields (First Name, Last Name, Email, and Phone).');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Please acknowledge the privacy statement and consent to data collection.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/office-visit-form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(data.redirectUrl || '/office-visit-form/thank-you');
      } else {
        setErrorMsg(data.message || 'Submission failed. Please check your details and try again.');
        setSubmitting(false);
      }
    } catch {
      setErrorMsg('Network error. Please try again or call our office directly.');
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="office-visit-form">
        <form onSubmit={handleSubmit} className={`${toolCard} p-6 sm:p-10 space-y-12`}>
          {errorMsg && (
            <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 flex items-start gap-3 text-base">
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold">Please correct the following:</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Section 1: Personal Details */}
          <section className="space-y-6">
            <SectionHead step="1" title="Personal & Contact Information" sub="Primary applicant identity and contact channels" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              <Field id="first_name" label="First / Given Name" required>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul"
                  className={toolInput}
                />
              </Field>

              <Field id="last_name" label="Last / Family Name" required>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="e.g. Sharma"
                  className={toolInput}
                />
              </Field>

              <Field id="email" label="Email Address" required>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul.sharma@example.com"
                  className={toolInput}
                />
              </Field>

              <Field id="phone" label="Mobile Phone Number" required>
                <PhoneField
                  id="phone"
                  required
                  dial={formData.country_code}
                  onDialChange={(d) => setFormData((prev) => ({ ...prev, country_code: d }))}
                  value={formData.phone}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, phone: v }))}
                  selectClassName={`${toolInput} !w-auto px-2`}
                  inputClassName={toolInput}
                />
              </Field>

              <Field id="dob" label="Date of Birth">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={toolInput}
                />
              </Field>

              <Field id="marital_status" label="Marital Status">
                <select
                  id="marital_status"
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className={`${toolInput} cursor-pointer`}
                >
                  <option value="Single">Single (Never Married)</option>
                  <option value="Married">Married</option>
                  <option value="De Facto">De Facto Partner</option>
                  <option value="Divorced">Divorced / Separated</option>
                </select>
              </Field>
            </div>
          </section>

          {/* Section 2: Visa & Passport */}
          <section className="space-y-6">
            <SectionHead step="2" title="Current Australian Visa & Passport" sub="Immigration status and passport validity" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field id="current_visa" label="Current Visa Subclass">
                <select
                  id="current_visa"
                  name="current_visa"
                  value={formData.current_visa}
                  onChange={handleChange}
                  className={`${toolInput} cursor-pointer`}
                >
                  <option value="Student Visa (Subclass 500)">Student Visa (Subclass 500)</option>
                  <option value="Temporary Graduate (Subclass 485)">Temporary Graduate (Subclass 485)</option>
                  <option value="Visitor Visa (Subclass 600)">Visitor Visa (Subclass 600)</option>
                  <option value="Bridging Visa A / B / C">Bridging Visa (BVA / BVB / BVC)</option>
                  <option value="Employer Sponsored (482 / 186 / 494)">Employer Sponsored (482 / 186 / 494)</option>
                  <option value="Working Holiday (417 / 462)">Working Holiday (417 / 462)</option>
                  <option value="Offshore Applicant (Outside Australia)">Offshore (Outside Australia)</option>
                  <option value="Other">Other Visa Subclass</option>
                </select>
              </Field>

              <Field id="visa_expiry_date" label="Current Visa Expiry Date">
                <input
                  type="date"
                  id="visa_expiry_date"
                  name="visa_expiry_date"
                  value={formData.visa_expiry_date}
                  onChange={handleChange}
                  className={toolInput}
                />
              </Field>

              <Field id="country_of_passport" label="Country of Passport / Citizenship">
                <input
                  type="text"
                  id="country_of_passport"
                  name="country_of_passport"
                  value={formData.country_of_passport}
                  onChange={handleChange}
                  placeholder="e.g. India"
                  className={toolInput}
                />
              </Field>

              <Field id="passport_number" label="Passport Number (optional)">
                <input
                  type="text"
                  id="passport_number"
                  name="passport_number"
                  value={formData.passport_number}
                  onChange={handleChange}
                  placeholder="e.g. Z1234567"
                  className={toolInput}
                  aria-describedby="passport_hint"
                />
                <p id="passport_hint" className={fieldHint}>
                  Do not enter it if you prefer to bring it to your appointment.
                </p>
              </Field>
            </div>
          </section>

          {/* Section 3: Qualifications & English */}
          <section className="space-y-6">
            <SectionHead step="3" title="Qualifications & English Test" sub="Education, tests, and occupation details" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field id="highest_qualification" label="Highest Qualification">
                <select
                  id="highest_qualification"
                  name="highest_qualification"
                  value={formData.highest_qualification}
                  onChange={handleChange}
                  className={`${toolInput} cursor-pointer`}
                >
                  <option value="Bachelor Degree">Bachelor Degree</option>
                  <option value="Master Degree">Master Degree</option>
                  <option value="Doctoral Degree (PhD)">Doctoral Degree (PhD)</option>
                  <option value="Diploma / Advanced Diploma">Diploma / Advanced Diploma</option>
                  <option value="Trade Certificate III/IV">Trade Certificate III/IV</option>
                  <option value="High School">High School (Year 12)</option>
                </select>
              </Field>

              <Field id="occupation" label="Nominated Occupation / Field">
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer, Registered Nurse, Chef"
                  className={toolInput}
                />
              </Field>

              <Field id="english_test_type" label="English Language Test">
                <select
                  id="english_test_type"
                  name="english_test_type"
                  value={formData.english_test_type}
                  onChange={handleChange}
                  className={`${toolInput} cursor-pointer`}
                >
                  <option value="PTE Academic">PTE Academic</option>
                  <option value="IELTS Academic / General">IELTS (Academic or General)</option>
                  <option value="TOEFL iBT">TOEFL iBT</option>
                  <option value="Not Yet Taken">Not Yet Taken / Planning</option>
                </select>
              </Field>

              <Field id="english_test_score_overall" label="Overall Score (if completed)">
                <input
                  type="text"
                  id="english_test_score_overall"
                  name="english_test_score_overall"
                  value={formData.english_test_score_overall}
                  onChange={handleChange}
                  placeholder="e.g. 65 / IELTS 7.0"
                  className={toolInput}
                />
              </Field>
            </div>
          </section>

          {/* Section 4: Purpose of Visit */}
          <section className="space-y-6">
            <SectionHead step="4" title="Consultation Focus & Office Location" sub="Tell us what you want to achieve during your consultation" />

            <div className="space-y-5">
              <Field id="purpose_of_visit" label="Primary Purpose of Consultation">
                <select
                  id="purpose_of_visit"
                  name="purpose_of_visit"
                  value={formData.purpose_of_visit}
                  onChange={handleChange}
                  className={`${toolInput} cursor-pointer`}
                >
                  <option value="PR Points & State Nomination Consultation">PR Points Assessment & State Nomination (189 / 190 / 491)</option>
                  <option value="Graduate Visa (Subclass 485) Lodgement">Temporary Graduate Visa (Subclass 485)</option>
                  <option value="Student Visa Admission & CoE">Student Visa (Subclass 500) Course Change / Extension</option>
                  <option value="Employer Sponsored 482 / 186 / 494">Employer Sponsored Visas (Skills in Demand 482, ENS 186, Skilled Employer Sponsored Regional 494)</option>
                  <option value="Partner Visa (820/801 or 309/100)">Partner / Spouse Visa (Subclass 820 / 309)</option>
                  <option value="AAT Appeal or Visa Refusal">Administrative Review Tribunal (ART) appeal or visa cancellation review</option>
                  <option value="Other Consultation">Other Migration Matter</option>
                </select>
              </Field>

              <Field id="enquiry_details" label="Additional Details or Questions for Your Agent">
                <textarea
                  id="enquiry_details"
                  name="enquiry_details"
                  rows={3}
                  value={formData.enquiry_details}
                  onChange={handleChange}
                  placeholder="Mention any specific concerns, upcoming deadlines, or target visas..."
                  className={toolInput}
                />
              </Field>
            </div>
          </section>

          {/* Privacy Notice & Consent Checkbox */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className={`${toolCheckbox} w-5 h-5`}
              />
              <label htmlFor="consent" className="text-sm text-slate-700 leading-relaxed cursor-pointer">
                <strong className="text-slate-800">Privacy & Collection Consent:</strong> I confirm that the information provided is accurate. I consent to Bansal Immigration Consultants collecting and holding my personal and immigration data in accordance with the <em>Australian Privacy Act 1988</em> and Migration Agents Code of Conduct, for the purpose of providing migration advice and consultation. Read our full{' '}
                <Link href="/privacy-policy" className={linkText}>
                  Privacy Policy
                </Link>.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className={`${toolPrimaryBtn} w-full text-base disabled:opacity-50`}
            >
              {submitting ? (
                <>Submitting Registration...</>
              ) : (
                <>
                  Submit Office Visit Registration
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
