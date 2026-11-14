'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, ArrowRight, Phone, RefreshCw, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { PrContent } from './content';
import {
  ToolHero,
  StepHeader,
  ResultHeader,
  Row,
  toolCard,
  toolInput,
  toolLabel,
  toolHint,
  toolPrimaryBtn,
  toolSecondaryBtn,
  toolCheckbox,
} from '@/components/tools/ToolUI';

export default function PRPointCalculatorPage() {
  // Use unique string keys to prevent React select snapping bug
  const [ageKey, setAgeKey] = useState<string>('25-32');
  const [englishKey, setEnglishKey] = useState<string>('proficient');
  const [educationKey, setEducationKey] = useState<string>('bachelor');
  const [overseasExpKey, setOverseasExpKey] = useState<string>('3-4');
  const [ausExpKey, setAusExpKey] = useState<string>('1-2');

  // Additional point checkboxes
  const [ausStudy, setAusStudy] = useState(true);
  const [specialistEdu, setSpecialistEdu] = useState(false);
  const [communityLang, setCommunityLang] = useState(true);
  const [profYear, setProfYear] = useState(false);
  const [regionalStudy, setRegionalStudy] = useState(false);

  // Partner Points
  const [partnerKey, setPartnerKey] = useState<string>('single');

  // Visa Stream for State Nomination
  const [visaStream, setVisaStream] = useState<'189' | '190' | '491'>('189');

  // Point mapping logic
  const getAgePoints = (key: string): number => {
    switch (key) {
      case '18-24': return 25;
      case '25-32': return 30;
      case '33-39': return 25;
      case '40-44': return 15;
      default: return 0; // under-18 or 45-plus
    }
  };

  const getEnglishPoints = (key: string): number => {
    switch (key) {
      case 'superior': return 20;
      case 'proficient': return 10;
      default: return 0; // competent
    }
  };

  const getEducationPoints = (key: string): number => {
    switch (key) {
      case 'phd': return 20;
      case 'bachelor':
      case 'master': return 15;
      case 'diploma': return 10;
      default: return 0;
    }
  };

  const getOverseasExpPoints = (key: string): number => {
    switch (key) {
      case '8-plus': return 15;
      case '5-7': return 10;
      case '3-4': return 5;
      default: return 0;
    }
  };

  const getAusExpPoints = (key: string): number => {
    switch (key) {
      case '8-plus': return 20;
      case '5-7': return 15;
      case '3-4': return 10;
      case '1-2': return 5;
      default: return 0;
    }
  };

  const getPartnerPoints = (key: string): number => {
    switch (key) {
      case 'single':
      case 'citizen-pr':
      case 'partner-skilled': return 10;
      case 'partner-english': return 5;
      default: return 0;
    }
  };

  // State / Regional Nomination Points
  const getStateNominationPoints = (): number => {
    if (visaStream === '190') return 5;
    if (visaStream === '491') return 15;
    return 0; // 189
  };

  const agePoints = getAgePoints(ageKey);
  const englishPoints = getEnglishPoints(englishKey);
  const educationPoints = getEducationPoints(educationKey);
  const rawOverseas = getOverseasExpPoints(overseasExpKey);
  const rawAus = getAusExpPoints(ausExpKey);

  // Home Affairs caps combined employment points at 20
  const combinedEmploymentPoints = Math.min(20, rawOverseas + rawAus);

  const additionalPoints =
    (ausStudy ? 5 : 0) +
    (specialistEdu ? 10 : 0) +
    (communityLang ? 5 : 0) +
    (profYear ? 5 : 0) +
    (regionalStudy ? 5 : 0);

  const partnerPoints = getPartnerPoints(partnerKey);
  const stateNominationPoints = getStateNominationPoints();

  const basePoints = agePoints + englishPoints + educationPoints + combinedEmploymentPoints + additionalPoints + partnerPoints;
  const totalPoints = basePoints + stateNominationPoints;
  const passMarkMet = totalPoints >= 65;

  const resetCalculator = () => {
    setAgeKey('25-32');
    setEnglishKey('proficient');
    setEducationKey('bachelor');
    setOverseasExpKey('none');
    setAusExpKey('1-2');
    setAusStudy(true);
    setSpecialistEdu(false);
    setCommunityLang(true);
    setProfYear(false);
    setRegionalStudy(false);
    setPartnerKey('single');
    setVisaStream('189');
  };


  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Tools & Calculators' },
            { label: 'PR Points Calculator' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      {/* Hero Section */}
      <ToolHero
        badge="Free tool. General Skilled Migration points test"
        title="Australian PR Points Calculator for Visas 189, 190 and 491"
      >
        Estimate your points for the Skilled Independent (189), Skilled Nominated (190) and Skilled Work Regional (491) visas. Choose your visa, answer six questions and see your score and a breakdown straight away. It takes about two minutes.
      </ToolHero>

      {/* Main Interactive Grid */}
      <main id="calculator" className="bg-slate-50 scroll-mt-4"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Sections (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Visa Subclass Selector Bar */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <p id="stream-label" className="block text-sm font-bold text-slate-900 mb-3">
                Select your intended visa stream
              </p>
              <div role="group" aria-labelledby="stream-label" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: '189', title: 'Subclass 189', subtitle: 'Skilled Independent', bonus: '+0 pts' },
                  { id: '190', title: 'Subclass 190', subtitle: 'State Nominated', bonus: '+5 pts' },
                  { id: '491', title: 'Subclass 491', subtitle: 'Regional Nominated', bonus: '+15 pts' },
                ].map((stream) => (
                  <button
                    key={stream.id}
                    type="button"
                    onClick={() => setVisaStream(stream.id as any)}
                    aria-pressed={visaStream === stream.id}
                    className={`p-4 min-h-12 rounded-xl border text-left transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
                      visaStream === stream.id
                        ? 'border-brand-900 bg-brand-50 ring-1 ring-brand-900'
                        : 'border-slate-300 hover:border-brand-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 text-sm">{stream.title}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        visaStream === stream.id ? 'bg-brand-900 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {stream.bonus}
                      </span>
                    </div>
                    <span className="text-sm text-slate-600 block mt-1">{stream.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Age Card */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <StepHeader step={1} title="Age at Time of Invitation" chip={`${agePoints} pts`} />
              <select
                id="age-select"
                aria-label="Age at time of invitation"
                value={ageKey}
                onChange={(e) => setAgeKey(e.target.value)}
                className={`${toolInput} cursor-pointer`}
              >
                <option value="under-18">Under 18 years (0 points)</option>
                <option value="18-24">18 to 24 years (25 points)</option>
                <option value="25-32">25 to 32 years (30 points - Maximum)</option>
                <option value="33-39">33 to 39 years (25 points)</option>
                <option value="40-44">40 to 44 years (15 points)</option>
                <option value="45-plus">45 years and over (0 points - Ineligible for GSM)</option>
              </select>
            </div>

            {/* 2. English Proficiency Card */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <StepHeader step={2} title="English Language Ability" chip={`${englishPoints} pts`} />
              <select
                id="english-select"
                aria-label="English language ability"
                value={englishKey}
                onChange={(e) => setEnglishKey(e.target.value)}
                className={`${toolInput} cursor-pointer`}
              >
                <option value="competent">Competent English (IELTS 6 / PTE 50 each band) — 0 points</option>
                <option value="proficient">Proficient English (IELTS 7 / PTE 65 each band) — 10 points</option>
                <option value="superior">Superior English (IELTS 8 / PTE 79 each band) — 20 points</option>
              </select>
              <p className={toolHint}>
                PTE Academic, IELTS, Cambridge C1, or TOEFL iBT results must be less than 3 years old at invitation.
              </p>
            </div>

            {/* 3. Educational Qualifications Card */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <StepHeader step={3} title="Highest Educational Qualification" chip={`${educationPoints} pts`} />
              <select
                id="education-select"
                aria-label="Highest educational qualification"
                value={educationKey}
                onChange={(e) => setEducationKey(e.target.value)}
                className={`${toolInput} cursor-pointer`}
              >
                <option value="none">No recognized qualification (0 points)</option>
                <option value="diploma">Diploma or Trade Qualification (10 points)</option>
                <option value="bachelor">Bachelor Degree (Australian or overseas recognized) (15 points)</option>
                <option value="master">Master&apos;s Degree (Australian or overseas recognized) (15 points)</option>
                <option value="phd">Doctorate / PhD Degree (20 points)</option>
              </select>
              <p className={toolHint}>
                Overseas degrees must be assessed as comparable to Australian standards by the designated assessing authority.
              </p>
            </div>

            {/* 4. Skilled Employment Experience (Overseas & Australian) */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <StepHeader
                step={4}
                title="Skilled Work Experience (Past 10 Years)"
                chip={`${combinedEmploymentPoints} pts`}
                chipNote="Max 20 pts combined"
              />
              <div className="space-y-4">
                <div>
                  <label htmlFor="overseas-exp-select" className={toolLabel}>
                    Overseas Skilled Employment:
                  </label>
                  <select
                    id="overseas-exp-select"
                    value={overseasExpKey}
                    onChange={(e) => setOverseasExpKey(e.target.value)}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value="none">Less than 3 years (0 points)</option>
                    <option value="3-4">3 to 4 years (5 points)</option>
                    <option value="5-7">5 to 7 years (10 points)</option>
                    <option value="8-plus">8 or more years (15 points)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="aus-exp-select" className={toolLabel}>
                    Australian Skilled Employment (Onshore):
                  </label>
                  <select
                    id="aus-exp-select"
                    value={ausExpKey}
                    onChange={(e) => setAusExpKey(e.target.value)}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value="none">Less than 1 year (0 points)</option>
                    <option value="1-2">1 to 2 years (5 points)</option>
                    <option value="3-4">3 to 4 years (10 points)</option>
                    <option value="5-7">5 to 7 years (15 points)</option>
                    <option value="8-plus">8 or more years (20 points)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Additional Points Checkboxes */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <StepHeader step={5} title="Australian Study & Special Qualifications" chip={`${additionalPoints} pts`} />
              <div className="space-y-3">
                {[
                  {
                    id: 'aus-study',
                    checked: ausStudy,
                    onChange: setAusStudy,
                    title: 'Australian Study Requirement',
                    desc: 'At least 2 academic years (92 weeks CRICOS) study in Australia completed in English.',
                    pts: '+5 pts',
                  },
                  {
                    id: 'specialist-edu',
                    checked: specialistEdu,
                    onChange: setSpecialistEdu,
                    title: 'Specialist Educational Qualification (STEM)',
                    desc: 'Masters by Research or PhD in Science, Technology, Engineering, or Mathematics in Australia.',
                    pts: '+10 pts',
                  },
                  {
                    id: 'community-lang',
                    checked: communityLang,
                    onChange: setCommunityLang,
                    title: 'Credentialed Community Language (NAATI CCL)',
                    desc: 'Accredited paraprofessional translator/interpreter or certified CCL test pass.',
                    pts: '+5 pts',
                  },
                  {
                    id: 'prof-year',
                    checked: profYear,
                    onChange: setProfYear,
                    title: 'Professional Year Program (PYP)',
                    desc: 'Completed an approved 44-week Professional Year in Accounting, ICT, or Engineering.',
                    pts: '+5 pts',
                  },
                  {
                    id: 'regional-study',
                    checked: regionalStudy,
                    onChange: setRegionalStudy,
                    title: 'Designated Regional Study',
                    desc: 'Lived and studied in a designated regional area fulfilling the 2-year Australian study rule.',
                    pts: '+5 pts',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    htmlFor={item.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border transition-colors motion-reduce:transition-none cursor-pointer ${
                      item.checked ? 'bg-brand-50 border-brand-900' : 'bg-white border-slate-300 hover:border-brand-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={(e) => item.onChange(e.target.checked)}
                      className={toolCheckbox}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
                        <span className="text-xs font-bold text-brand-900 bg-brand-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {item.pts}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 6. Partner Skills Card */}
            <div className={`${toolCard} p-5 sm:p-6`}>
              <StepHeader step={6} title="Partner / Spouse Qualifications & Status" chip={`${partnerPoints} pts`} />
              <select
                id="partner-select"
                aria-label="Partner or spouse qualifications and status"
                value={partnerKey}
                onChange={(e) => setPartnerKey(e.target.value)}
                className={`${toolInput} cursor-pointer`}
              >
                <option value="single">Single applicant (never married or de facto) — 10 points</option>
                <option value="citizen-pr">Partner is an Australian citizen or Permanent Resident — 10 points</option>
                <option value="partner-skilled">Spouse/partner has competent English AND suitable skills assessment on same list — 10 points</option>
                <option value="partner-english">Spouse/partner has competent English only (no skills assessment) — 5 points</option>
                <option value="partner-none">Spouse/partner has neither competent English nor skills assessment — 0 points</option>
              </select>
            </div>
          </div>

          {/* Right Column: Sticky Live Scorecard (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className={`${toolCard} overflow-hidden`}>
              <ResultHeader
                label="Live Points Score"
                right={
                  <button
                    type="button"
                    onClick={resetCalculator}
                    className="text-sm font-semibold text-brand-100 hover:text-white flex items-center gap-1.5 min-h-12 px-2 -my-2 rounded transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                  >
                    <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                    Reset
                  </button>
                }
              />

              <div className="p-6">
                {/* Big Score Display */}
                <div className="text-center pb-5 border-b border-slate-100">
                  <div className="text-6xl font-extrabold text-brand-900 tracking-tight tabular-nums" aria-live="polite">
                    {totalPoints}
                  </div>
                  <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                    Total Points Calculated
                  </div>

                  <div className="mt-4">
                    {passMarkMet ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                        Eligible to Submit EOI (Pass Mark 65 Met)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-200">
                        <AlertCircle className="w-4 h-4 text-rose-600" aria-hidden="true" />
                        Below Pass Mark ({65 - totalPoints} points needed for 65)
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Breakdown Table */}
                <div className="py-3">
                  <Row label="Age Points:" value={`${agePoints} pts`} />
                  <Row label="English Proficiency:" value={`${englishPoints} pts`} />
                  <Row label="Educational Qualification:" value={`${educationPoints} pts`} />
                  <Row label="Work Experience (Capped):" value={`${combinedEmploymentPoints} pts`} />
                  <Row label="Australian Study & Special:" value={`${additionalPoints} pts`} />
                  <Row label="Partner / Spouse Status:" value={`${partnerPoints} pts`} />
                  <Row label={`State/Regional Nomination (${visaStream}):`} value={`+${stateNominationPoints} pts`} strong />
                </div>

                {/* Visa Pathway Summary */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-5">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                    <MapPin className="w-4 h-4 text-brand-700" aria-hidden="true" /> Subclass Breakdown:
                  </div>
                  <Row label="Subclass 189 (Independent):" value={`${basePoints} pts`} />
                  <Row label="Subclass 190 (State Nominated):" value={`${basePoints + 5} pts`} />
                  <Row label="Subclass 491 (Regional):" value={`${basePoints + 15} pts`} />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href="/book-an-appointment" className={`${toolPrimaryBtn} w-full`}>
                    Book 1-on-1 Consultation
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <Link href="/occupation-finder" className={`${toolSecondaryBtn} w-full`}>
                    Check Your ANZSCO Occupation on SOL
                  </Link>
                </div>

                {/* Disclaimer notice */}
                <p className="text-xs text-slate-600 text-center mt-4 leading-normal">
                  Based on current Home Affairs points test parameters. An EOI score does not guarantee an invitation.
                </p>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className={`${toolCard} p-5 flex items-center justify-between gap-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-600">Need help claiming points?</div>
                  <a href="tel:+61396021330" className="text-base font-bold text-slate-900 hover:text-brand-700">
                    +61 3 9602 1330
                  </a>
                </div>
              </div>
              <Link
                href="/contact"
                className="px-5 min-h-12 inline-flex items-center rounded-xl bg-brand-50 text-brand-900 font-bold text-sm hover:bg-brand-100 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </div></main>
      <PrContent />
    </div>
  );
}
