'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is the minimum points score required to apply for Australian skilled migration?',
    answer:
      'The statutory legal minimum to lodge an Expression of Interest (EOI) in SkillSelect is 65 points across Subclasses 189, 190, and 491. However, invitation rounds are competitive. For Subclass 189, invitations often require 85 to 95+ points depending on occupational demand and round quotas. Subclass 190 adds 5 nomination points, and Subclass 491 adds 15 nomination points to your baseline score. State governments may also nominate candidates with lower points if they meet specific in-demand regional criteria.',
    category: 'Points Test',
  },
  {
    question: 'Do I need 3 to 8 years of work experience to qualify?',
    answer:
      'No. There is no mandatory requirement for 3–8 years of work experience for general skilled migration. Australian skilled migration awards points on a sliding scale: 0 points for less than 1 year onshore / 3 years overseas, 5 points for 1–2 years onshore (or 3–4 years overseas), 10 points for 3–4 years onshore (or 5–7 years overseas), and 15 points for 5+ years onshore (or 8+ years overseas). Many recent graduates qualify through higher points in English (Superior English = 20 points), degree qualifications, Australian study, NAATI CCL, and single/partner points without extensive work history.',
    category: 'Experience & Points',
  },
  {
    question: 'What is the difference between Subclass 189, 190, and 491?',
    answer:
      'Subclass 189 is an independent permanent residency visa requiring no sponsor or state nomination; you can live and work anywhere in Australia. Subclass 190 is a state-nominated permanent residency visa where an Australian state or territory nominates you, granting 5 extra points with a moral commitment to live and work in that state for 2 years. Subclass 491 is a 5-year provisional (temporary) visa for regional Australia providing 15 extra points; holders can transition to permanent residency via Subclass 191 after living and working in a designated regional area for at least 3 years.',
    category: 'Visa Comparisons',
  },
  {
    question: 'How is Subclass 485 Temporary Graduate different from Skilled Migration?',
    answer:
      'Subclass 485 is a temporary post-study work visa granted to international students who have completed eligible CRICOS qualifications in Australia. It is NOT points-tested and does not grant permanent residency. It serves as a transitional bridge that provides unrestricted work rights in Australia for 18 months to several years, allowing graduates to accumulate the skilled employment, Australian experience, or Professional Year needed to qualify for General Skilled Migration (Subclasses 189, 190, 491).',
    category: 'Graduate Visas',
  },
  {
    question: 'What is a Skills Assessment and who conducts it?',
    answer:
      'A positive skills assessment is mandatory before submitting an EOI. Relevant assessing authorities assess your qualifications and employment against Australian occupational standards. Key authorities include VETASSESS (general professional & trade occupations), ACS (Information and Communications Technology), Engineers Australia (engineering occupations), TRA (trades and technical occupations), and ANMAC (nurses and midwives). Each authority has distinct evidentiary standards, post-qualification experience requirements, and validity periods.',
    category: 'Skills Assessment',
  },
  {
    question: 'How do state and territory nominations work?',
    answer:
      'Each Australian state and territory (VIC, NSW, SA, QLD, WA, TAS, ACT, NT) receives an annual nomination allocation from the federal government. States establish their own occupation lists, Registration of Interest (ROI) systems, and eligibility criteria—often prioritising onshore residents, specific regional workers, or offshore specialists in critical shortage sectors such as healthcare, education, engineering, and digital infrastructure.',
    category: 'State Nomination',
  },
];

export default function SkilledFaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen ? 'border-brand-500 bg-brand-50/30 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full py-4 px-6 text-left flex items-start justify-between gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? 'text-brand-700' : 'text-gray-400'}`} />
                <span className="font-semibold text-gray-900 text-base md:text-lg">{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 shrink-0 mt-1 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-brand-700' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-100">
                <p>{faq.answer}</p>
                {faq.category && (
                  <div className="mt-3">
                    <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-900">
                      Topic: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
