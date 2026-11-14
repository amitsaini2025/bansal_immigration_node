'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';
import { ShieldCheck, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { ToolHero, toolCard, toolInput, toolLabel, toolPrimaryBtn } from '@/components/tools/ToolUI';

const toolHint = 'text-sm text-slate-600 mt-1.5 leading-relaxed';

const STUDENT_ANNUAL = 29710;
const PARTNER_RATE = 10394;
const CHILD_LIVING_RATE = 4449;
const SCHOOL_FEE_RATE = 13502;

function formatCurrency(amount: number) {
  return `AUD $${Math.round(amount).toLocaleString('en-AU')}`;
}

export default function StudentVisaFinancialCalculatorClient({ content }: { content?: React.ReactNode }) {
  const [durationPreset, setDurationPreset] = useState('year:1');
  const [tuition, setTuition] = useState<number | ''>(25000);
  const [partners, setPartners] = useState(0);
  const [children, setChildren] = useState(0);
  const [schoolChildren, setSchoolChildren] = useState(0);
  const [travel, setTravel] = useState(2000);

  // Compute duration in years
  let durationYears = 1;
  let periodLabel = '1 year';
  if (durationPreset.startsWith('month:')) {
    const m = parseInt(durationPreset.replace('month:', ''), 10);
    durationYears = m / 12;
    periodLabel = `${m} month${m === 1 ? '' : 's'}`;
  } else if (durationPreset.startsWith('year:')) {
    const y = parseInt(durationPreset.replace('year:', ''), 10);
    durationYears = y;
    periodLabel = `${y} ${y === 1 ? 'year' : 'years'}`;
  }

  const fraction = Math.min(durationYears, 1);
  const studentLiving = STUDENT_ANNUAL * fraction;
  const tuitionAmount = typeof tuition === 'number' ? tuition : 0;
  const totalTuition = tuitionAmount * fraction;
  const partnerLiving = partners * PARTNER_RATE * fraction;
  const childrenLiving = children * CHILD_LIVING_RATE * fraction;
  const totalLiving = studentLiving + partnerLiving + childrenLiving;
  const totalSchoolFees = schoolChildren * SCHOOL_FEE_RATE * fraction;
  const totalTravel = travel;
  const totalRequired = totalTuition + totalLiving + totalSchoolFees + totalTravel;

  const monthsRounded = Math.round(fraction * 12);
  const yearsText = fraction < 1 ? `${monthsRounded} month${monthsRounded === 1 ? '' : 's'}` : '12 months';

  const tuitionPct = totalRequired > 0 ? (totalTuition / totalRequired) * 100 : 0;
  const livingPct = totalRequired > 0 ? (totalLiving / totalRequired) * 100 : 0;
  const schoolPct = totalRequired > 0 ? (totalSchoolFees / totalRequired) * 100 : 0;
  const travelPct = totalRequired > 0 ? (totalTravel / totalRequired) * 100 : 0;

  const handleReset = () => {
    setDurationPreset('year:1');
    setTuition(25000);
    setPartners(0);
    setChildren(0);
    setSchoolChildren(0);
    setTravel(2000);
  };

  return (
    <div>
      {/* Hero Header */}
      <ToolHero
        badge="Student visa (Subclass 500)"
        title="Student Visa Financial Calculator (Subclass 500)"
        below={
          <ul className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-800 list-none">
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-brand-800" aria-hidden="true" /> Primary student: AUD $29,710 a year
            </li>
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-brand-800" aria-hidden="true" /> Accompanying partner: AUD $10,394 a year
            </li>
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-brand-800" aria-hidden="true" /> Child living costs: AUD $4,449 a year per child
            </li>
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-brand-800" aria-hidden="true" /> School-age child: AUD $13,502 a year per child
            </li>
          </ul>
        }
      >
        Work out how much money you may need to show for your Australian student visa. Enter your course length, tuition, partner and children, and the calculator adds tuition, living costs, school costs and travel into one estimate.
      </ToolHero>

      <div className="bg-slate-50">
      <div id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`${toolCard} p-5 sm:p-7 space-y-6`}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Your Study & Family Profile</h2>
                  <p className="text-sm text-slate-600 mt-0.5">Provide details for the primary applicant and accompanying family</p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 min-h-12 px-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-900 hover:bg-brand-50 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                {/* Course Duration */}
                <div>
                  <label htmlFor="duration" className={toolLabel}>
                    Course Duration
                  </label>
                  <select
                    id="duration"
                    value={durationPreset}
                    onChange={(e) => setDurationPreset(e.target.value)}
                    className={`${toolInput} cursor-pointer`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
                      <option key={`month-${m}`} value={`month:${m}`}>
                        {m} {m === 1 ? 'month' : 'months'}
                      </option>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => (
                      <option key={`year-${y}`} value={`year:${y}`}>
                        {y} {y === 1 ? 'year' : 'years'}
                      </option>
                    ))}
                  </select>
                  <p className={toolHint}>
                    Visa funding regulations cap tuition and living requirements at the first 12 months (pro-rata if course is shorter than 12 months).
                  </p>
                </div>

                {/* Annual Tuition Fee */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="tuition" className="text-sm font-semibold text-slate-800">
                      Annual Tuition Fee (AUD)
                    </label>
                    <span className="text-sm font-semibold text-brand-800">First 12 months only</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">$</span>
                    <input
                      type="number"
                      id="tuition"
                      min="0"
                      step="1000"
                      value={tuition}
                      onChange={(e) => setTuition(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 25000"
                      className={`${toolInput} pl-9`}
                      required
                    />
                  </div>
                  <p className={toolHint}>
                    Deduct any tuition payments already made towards your Confirmation of Enrolment (CoE).
                  </p>
                </div>

                {/* Living Costs (Student) - Display */}
                <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                      Primary Student Living Requirement
                    </span>
                    <span className="text-lg font-extrabold text-brand-900 tabular-nums whitespace-nowrap">
                      {formatCurrency(studentLiving)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Department benchmark: <strong>AUD $29,710/year</strong> (Migration Instrument LIN 19/198, May 2024 update). Calculated pro-rata for {yearsText}.
                  </p>
                </div>

                {/* Partner/Spouse */}
                <div>
                  <label htmlFor="partners" className={toolLabel}>
                    Partner / Spouse Accompanying You
                  </label>
                  <select
                    id="partners"
                    value={partners}
                    onChange={(e) => setPartners(Number(e.target.value))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={0}>No partner accompanying</option>
                    <option value={1}>1 Partner / Spouse (AUD $10,394 / year)</option>
                  </select>
                </div>

                {/* Dependent Children */}
                <div>
                  <label htmlFor="children" className={toolLabel}>
                    Number of Dependent Children
                  </label>
                  <select
                    id="children"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={0}>No dependent children</option>
                    <option value={1}>1 child (AUD $4,449 / year living)</option>
                    <option value={2}>2 children (AUD $8,898 / year living)</option>
                    <option value={3}>3 children (AUD $13,347 / year living)</option>
                    <option value={4}>4 children (AUD $17,796 / year living)</option>
                    <option value={5}>5+ children</option>
                  </select>
                </div>

                {/* School-age Children */}
                <div>
                  <label htmlFor="school_children" className={toolLabel}>
                    School-age Children (Requiring School Tuition)
                  </label>
                  <select
                    id="school_children"
                    value={schoolChildren}
                    onChange={(e) => setSchoolChildren(Number(e.target.value))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={0}>No school-age children</option>
                    <option value={1}>1 school-age child (AUD $13,502 / year)</option>
                    <option value={2}>2 school-age children (AUD $27,004 / year)</option>
                    <option value={3}>3 school-age children (AUD $40,506 / year)</option>
                    <option value={4}>4 school-age children (AUD $54,008 / year)</option>
                    <option value={5}>5+ school-age children</option>
                  </select>
                  <p className={toolHint}>
                    School tuition fees may be waived or discounted for certain government schools depending on your state and degree type (e.g. Master by Research or PhD).
                  </p>
                </div>

                {/* Travel Costs */}
                <div>
                  <label htmlFor="travel" className={toolLabel}>
                    Estimated Travel Expenses (Return Airfares)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">$</span>
                    <input
                      type="number"
                      id="travel"
                      min="0"
                      step="500"
                      value={travel}
                      onChange={(e) => setTravel(Number(e.target.value))}
                      className={`${toolInput} pl-9`}
                      placeholder="Enter estimated return airfare"
                    />
                  </div>
                  <p className={toolHint}>
                    Department standard benchmark is $2,000 AUD per applicant applying from outside Australia (or $1,000 AUD if applying from within Australia to cover outbound travel).
                  </p>
                </div>
              </div>
            </div>

            {/* Income Evidence Alternative Card */}
            <div className={`${toolCard} p-5 sm:p-7 space-y-4`}>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Alternative: annual income evidence</h3>
                <p className="text-sm text-slate-600 mt-0.5">Option to show parent or spouse earnings instead of savings</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Instead of holding the full required funds in a bank deposit, you can satisfy the financial capacity requirement if your parent(s) or spouse earned official taxable annual income in the 12 months immediately before your application:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Without Accompanying Dependants
                  </span>
                  <div className="text-2xl font-extrabold text-brand-900">AUD $87,856</div>
                  <p className="text-sm text-slate-600">Official tax assessment required</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    With Accompanying Dependants
                  </span>
                  <div className="text-2xl font-extrabold text-brand-900">AUD $102,500</div>
                  <p className="text-sm text-slate-600">Official tax assessment required</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Live Scorecard (5 cols) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            <div className={`${toolCard} overflow-hidden`}>
              {/* Header banner */}
              <div className="bg-brand-900 text-white p-6 space-y-1.5 rounded-t-xl">
                <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider">
                  <span>Evidentiary Summary</span>
                  <span className="bg-white/15 px-2.5 py-0.5 rounded-full normal-case tracking-normal font-semibold">
                    Period: {periodLabel}
                  </span>
                </div>
                <div className="text-sm text-brand-100">Total financial capacity required (estimate)</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums" aria-live="polite">
                  {formatCurrency(totalRequired)}
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Funds Composition</span>
                    <span>Estimate</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div style={{ width: `${tuitionPct}%` }} className="bg-brand-900 transition-all duration-300" title="Tuition" />
                    <div style={{ width: `${livingPct}%` }} className="bg-brand-500 transition-all duration-300" title="Living" />
                    {schoolPct > 0 && (
                      <div style={{ width: `${schoolPct}%` }} className="bg-slate-400 transition-all duration-300" title="Schooling" />
                    )}
                    <div style={{ width: `${travelPct}%` }} className="bg-gold-400 transition-all duration-300" title="Travel" />
                  </div>
                </div>

                {/* Line items list */}
                <div className="divide-y divide-slate-100 text-sm">
                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-900 shrink-0" />
                      <span className="text-slate-600">Tuition Fees ({yearsText})</span>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(totalTuition)}</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0" />
                      <span className="text-slate-600">Total Living Expenses</span>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(totalLiving)}</span>
                  </div>

                  {totalSchoolFees > 0 && (
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                        <span className="text-slate-600">School Tuition ({schoolChildren} child)</span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(totalSchoolFees)}</span>
                    </div>
                  )}

                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold-400 shrink-0" />
                      <span className="text-slate-600">Return Travel Expenses</span>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(totalTravel)}</span>
                  </div>
                </div>

                {/* Sub-breakdown details */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 space-y-1.5">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                    Living Cost Details:
                  </div>
                  <div className="flex justify-between">
                    <span>Primary student</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(studentLiving)}</span>
                  </div>
                  {partners > 0 && (
                    <div className="flex justify-between">
                      <span>Partner or spouse</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(partnerLiving)}</span>
                    </div>
                  )}
                  {children > 0 && (
                    <div className="flex justify-between">
                      <span>{children} dependent child(ren)</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(childrenLiving)}</span>
                    </div>
                  )}
                </div>

                {/* Consultation CTA */}
                <a href="#contact-form" className={`${toolPrimaryBtn} w-full group`}>
                  Verify My Funds with an Agent
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Important Rules / Notes Card */}
            <div className={`${toolCard} p-6 space-y-3 text-sm text-slate-600`}>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-700" aria-hidden="true" />
                Evidence guidelines
              </h3>
              <div className="space-y-2 leading-relaxed">
                <p>
                  <strong className="text-slate-800">12-Month Cap:</strong> Only the first 12 months of tuition and living expenses need to be demonstrated for visa grants.
                </p>
                <p>
                  <strong className="text-slate-800">Acceptable Funds:</strong> Money deposits with an approved financial institution, government loans, scholarships, or education loans.
                </p>
                <p>
                  <strong className="text-slate-800">OSHC:</strong> Overseas Student Health Cover is mandatory for the entire visa duration and is arranged separately.
                </p>
                <p>
                  <strong className="text-slate-800">Currency Buffer:</strong> It is highly recommended to maintain 10 to 15% additional funds to safeguard against exchange rate fluctuations.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>

      {content}

      {/* Enquiry form */}
      <section id="contact-form" className="bg-white py-16 lg:py-24 scroll-mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(26,26,43,0.04)] p-6 sm:p-10 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">Student visa assistance</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Send us an enquiry</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Tell us about your course and family. We will come back to you about your funds and documents.
              </p>
            </div>

            <UnifiedContactForm
              formSource="student-visa-financial-calculator"
              formVariant="compact"
              showPhone={true}
              showSubject={false}
              formTitle=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
