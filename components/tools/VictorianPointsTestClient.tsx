'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Copy, RotateCcw, Building2, TrendingUp, ShieldCheck } from 'lucide-react';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';
import { ToolHero, ResultHeader, Row, toolCard, toolInput, toolPrimaryBtn, toolCheckbox } from '@/components/tools/ToolUI';

const toolHint = 'text-sm text-slate-600 mt-1.5 leading-relaxed';

const AGE_PTS: Record<number, number> = {
  18: 265, 19: 282, 30: 286, 31: 270, 32: 256, 33: 240, 34: 226,
  35: 210, 36: 196, 37: 180, 38: 166, 39: 150, 40: 136, 41: 106, 42: 76, 43: 46, 44: 16
};

function getAgePoints(age: number): number {
  if (age >= 20 && age <= 29) return 300;
  return AGE_PTS[age] || 0;
}

const EARN_BANDS: [number, number][] = [
  [80000, 8], [85000, 16], [90000, 24], [95000, 32], [100000, 39],
  [105000, 47], [110000, 55], [115000, 63], [120000, 71], [125000, 79],
  [130000, 87], [135000, 95], [140000, 103], [145000, 111], [150000, 118],
  [155000, 126], [160000, 134], [165000, 142], [170000, 150]
];

function getEarnBand(amount: number): { pts: number; range: string } | null {
  let idx = -1;
  for (let k = 0; k < EARN_BANDS.length; k++) {
    if (amount >= EARN_BANDS[k][0]) idx = k;
  }
  if (idx < 0) return null;
  const lo = EARN_BANDS[idx][0];
  const hi = idx < EARN_BANDS.length - 1 ? EARN_BANDS[idx + 1][0] - 1 : null;
  const format = (n: number) => '$' + n.toLocaleString('en-AU');
  return {
    pts: EARN_BANDS[idx][1],
    range: hi ? `${format(lo)}–${format(hi)}` : `${format(lo)} and over`
  };
}

export default function VictorianPointsTestClient({ children }: { children?: React.ReactNode }) {
  const [age, setAge] = useState<number | ''>(28);
  const [english, setEnglish] = useState<number>(100);
  const [exp, setExp] = useState<number>(40);
  const [edu, setEdu] = useState<number>(50);
  const [skill, setSkill] = useState<number>(50);
  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);
  const [p3, setP3] = useState(false);
  const [earn, setEarn] = useState<string>('85,000');
  const [copied, setCopied] = useState(false);

  // Computations
  const ageNum = typeof age === 'number' ? age : 0;
  const agePts = (age !== '' && ageNum >= 18 && ageNum <= 44) ? getAgePoints(ageNum) : 0;
  const partnerPts = p1 && p2 && p3 ? 50 : 0;

  const rawEarn = parseInt(earn.replace(/\D/g, ''), 10) || 0;
  const earnData = rawEarn > 0 ? getEarnBand(rawEarn) : null;
  const earnPts = earnData ? earnData.pts : 0;

  const totalScore = agePts + english + exp + edu + skill + partnerPts + earnPts;
  const maxScore = 950;
  const unclaimed = maxScore - totalScore;

  const handleCopySummary = () => {
    const summary = [
      'Victorian Points Test (2026–27 Program)',
      `Age: ${age ? `${age} years` : 'None'} → ${agePts} / 300 pts`,
      `English: ${english} / 200 pts`,
      `Experience: ${exp} / 100 pts`,
      `Education: ${edu} / 100 pts`,
      `Occupation Skill Level: ${skill} / 50 pts`,
      `Partner Skill: ${partnerPts} / 50 pts`,
      `Victorian Earnings: ${earnPts} / 150 pts`,
      '---------------------------------------',
      `VPT Total: ${totalScore} / 950 points`,
      'Live in Melbourne Victoria Subclass 190 & 491 Registration of Interest'
    ].join('\n');

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetAll = () => {
    setAge('');
    setEnglish(0);
    setExp(0);
    setEdu(25);
    setSkill(0);
    setP1(false);
    setP2(false);
    setP3(false);
    setEarn('');
  };

  return (
    <div>
      {/* Hero Header */}
      <ToolHero
        badge="Victoria state nomination, Live in Melbourne"
        title="Victorian Points Test (VPT) Calculator"
        below={
          <ul className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-800 list-none">
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-brand-800" aria-hidden="true" /> 950 points maximum
            </li>
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <Building2 className="w-4 h-4 text-brand-800" aria-hidden="true" /> Victorian earnings tiers
            </li>
            <li className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <TrendingUp className="w-4 h-4 text-brand-800" aria-hidden="true" /> ROI invitation rounds
            </li>
          </ul>
        }
      >
        Victoria ranks Registration of Interest (ROI) candidates for state nomination by a points test out of 950. Use this free calculator to estimate your score for the Skilled Nominated (190) and Skilled Work Regional (491) visas.
      </ToolHero>

      <div className="bg-slate-50">
      <div id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-6 lg:space-y-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Fields (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`${toolCard} p-5 sm:p-7 space-y-6`}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Points Assessment Criteria</h2>
                  <p className="text-sm text-slate-600 mt-0.5">Sample answers are shown to start. Select Reset to clear them.</p>
                </div>
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center gap-1.5 min-h-12 px-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-900 hover:bg-brand-50 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                {/* 1. Age */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="vpt-age" className="text-sm font-semibold text-slate-800">
                      1. Age at Time of Invitation
                    </label>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {agePts} / 300 pts
                    </span>
                  </div>
                  <input
                    type="number"
                    id="vpt-age"
                    min="18"
                    max="44"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                    placeholder="Enter age (18 to 44)"
                    className={toolInput}
                  />
                  <p className={toolHint}>
                    Ages 20–29 receive full 300 points. Ages 18–19 and 30–44 scale progressively down to 16 points. Must be under 45.
                  </p>
                </div>

                {/* 2. English Proficiency */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="vpt-english" className="text-sm font-semibold text-slate-800">
                      2. English Language Proficiency
                    </label>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {english} / 200 pts
                    </span>
                  </div>
                  <select
                    id="vpt-english"
                    value={english}
                    onChange={(e) => setEnglish(parseInt(e.target.value, 10))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={0}>Competent English (IELTS 6 / PTE 50) — 0 points</option>
                    <option value={100}>Proficient English (IELTS 7 / PTE 65) — 100 points</option>
                    <option value={200}>Superior English (IELTS 8 / PTE 79) — 200 points</option>
                  </select>
                </div>

                {/* 3. Overseas & Australian Experience */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="vpt-exp" className="text-sm font-semibold text-slate-800">
                      3. Skilled Employment Experience
                    </label>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {exp} / 100 pts
                    </span>
                  </div>
                  <select
                    id="vpt-exp"
                    value={exp}
                    onChange={(e) => setExp(parseInt(e.target.value, 10))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={0}>Less than 3 years relevant experience — 0 points</option>
                    <option value={40}>3 to 4 years experience — 40 points</option>
                    <option value={70}>5 to 7 years experience — 70 points</option>
                    <option value={100}>8+ years experience — 100 points</option>
                  </select>
                </div>

                {/* 4. Education Level */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="vpt-edu" className="text-sm font-semibold text-slate-800">
                      4. Educational Qualifications
                    </label>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {edu} / 100 pts
                    </span>
                  </div>
                  <select
                    id="vpt-edu"
                    value={edu}
                    onChange={(e) => setEdu(parseInt(e.target.value, 10))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={25}>Diploma or Trade Qualification — 25 points</option>
                    <option value={50}>Bachelor Degree — 50 points</option>
                    <option value={75}>Master Degree — 75 points</option>
                    <option value={100}>Doctoral Degree (PhD) — 100 points</option>
                  </select>
                </div>

                {/* 5. Occupation Skill Level */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="vpt-skill" className="text-sm font-semibold text-slate-800">
                      5. ANZSCO Skill Level
                    </label>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {skill} / 50 pts
                    </span>
                  </div>
                  <select
                    id="vpt-skill"
                    value={skill}
                    onChange={(e) => setSkill(parseInt(e.target.value, 10))}
                    className={`${toolInput} cursor-pointer`}
                  >
                    <option value={50}>Skill Level 1 (Managers, Professionals) — 50 points</option>
                    <option value={25}>Skill Level 2 & 3 (Technicians, Trades Workers) — 25 points</option>
                    <option value={0}>Other Skill Levels — 0 points</option>
                  </select>
                </div>

                {/* 6. Partner Qualifications */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-sm font-semibold text-slate-800">
                      6. Partner Skill Assessment (All 3 criteria required for 50 pts)
                    </span>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {partnerPts} / 50 pts
                    </span>
                  </div>
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-700 min-h-8">
                      <input type="checkbox" checked={p1} onChange={(e) => setP1(e.target.checked)} className={toolCheckbox} />
                      Partner is aged under 45 years at time of invitation
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-700 min-h-8">
                      <input type="checkbox" checked={p2} onChange={(e) => setP2(e.target.checked)} className={toolCheckbox} />
                      Partner has Competent English or higher (IELTS 6+ / PTE 50+)
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-700 min-h-8">
                      <input type="checkbox" checked={p3} onChange={(e) => setP3(e.target.checked)} className={toolCheckbox} />
                      Partner holds a suitable positive skills assessment on an eligible list
                    </label>
                  </div>
                </div>

                {/* 7. Victorian Earnings */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label htmlFor="vpt-earn" className="text-sm font-semibold text-slate-800">
                      7. Current Victorian Skilled Employment Earnings (AUD)
                    </label>
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {earnPts} / 150 pts
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">$</span>
                    <input
                      type="text"
                      id="vpt-earn"
                      value={earn}
                      onChange={(e) => setEarn(e.target.value)}
                      placeholder="e.g. 85,000"
                      className={`${toolInput} pl-9`}
                    />
                  </div>
                  {earnData && (
                    <p className="text-sm font-semibold text-emerald-700 mt-1.5">
                      Earnings band {earnData.range} ({earnData.pts} points)
                    </p>
                  )}
                  <p className={toolHint}>
                    Points commence at $80,000 AUD (8 points) up to $170,000+ AUD (150 points). Must be working in skilled employment in Victoria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scorecard (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className={`${toolCard} overflow-hidden`}>
              <ResultHeader
                label="Victorian Points Test (VPT)"
                right={<span className="text-sm font-semibold text-brand-100">Max: 950</span>}
              />

              <div className="p-6">
                <div className="text-center pb-5 border-b border-slate-100">
                  <div className="text-6xl font-extrabold text-brand-900 tracking-tight tabular-nums" aria-live="polite">{totalScore}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Total Score out of 950
                  </div>
                  <p className="text-sm text-slate-600 pt-1.5" aria-live="polite">
                    {unclaimed} points unclaimed of the 950 maximum
                  </p>
                </div>

                {/* Score Breakdown List */}
                <div className="py-3">
                  <Row label="Age:" value={`${agePts} / 300`} />
                  <Row label="English Language:" value={`${english} / 200`} />
                  <Row label="Skilled Experience:" value={`${exp} / 100`} />
                  <Row label="Qualifications:" value={`${edu} / 100`} />
                  <Row label="ANZSCO Skill Level:" value={`${skill} / 50`} />
                  <Row label="Partner Skill:" value={`${partnerPts} / 50`} />
                  <Row label="Victorian Earnings:" value={`${earnPts} / 150`} />
                </div>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`${toolPrimaryBtn} w-full mt-2`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" /> Copied Summary!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" /> Copy Summary
                    </>
                  )}
                </button>

                <div className="text-sm text-slate-600 leading-relaxed space-y-1.5 pt-4">
                  <p>No fixed pass mark. Invitation rounds select the highest VPT totals overall and within Victorian priority industries.</p>
                  <p>Tables based on Live in Melbourne Victorian Points Test guidelines (2026-27 program).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important information */}
        <div className={`${toolCard} p-6 md:p-8`}>
          <h2 className="font-bold text-slate-900 text-xl mb-4">Important information</h2>
          <ul className="list-disc pl-5 text-base text-slate-700 space-y-3 leading-relaxed marker:text-brand-700">
            <li>This calculator is for indicative purposes only and is based on the Victorian Points Test for the 2026-27 program year.</li>
            <li>There is no pass mark. Invitation rounds select the highest VPT totals overall and within priority industries.</li>
            <li>You must still meet the Australian Government points test minimum (typically 65 points) for skilled migration.</li>
            <li>For official criteria, refer to <a href="https://liveinmelbourne.vic.gov.au/" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2">Live in Melbourne</a> guidance on the Victorian Points Test.</li>
          </ul>
        </div>
      </div>
      </div>

      {children}

      {/* Enquiry form */}
      <section id="enquiry" className="bg-white py-16 lg:py-24 scroll-mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(26,26,43,0.04)] p-6 sm:p-10 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">Victoria subclass 190 and 491</p>
              <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">Need help with your Victorian ROI?</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Our registered migration agents can check your score, evidence and timing.
              </p>
            </div>

            <UnifiedContactForm
              formSource="victorian-points-test"
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
