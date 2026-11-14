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
    question: 'What is Clause 600.211 (the Genuine Visitor Criterion)?',
    answer:
      'Clause 600.211 of Schedule 2 to the Migration Regulations 1994 is the primary legal basis for Australian visitor visa refusals. The case officer must be satisfied that the applicant genuinely intends to stay temporarily in Australia for the purpose for which the visa is granted. Factors considered include personal, employment, and economic ties to the home country; previous immigration history; incentive to return; and financial capacity during the stay.',
    category: 'Refusal Criteria',
  },
  {
    question: 'What is the difference between Subclass 600, ETA (601), and eVisitor (651)?',
    answer:
      'Subclass 651 (eVisitor) is a free online visa exclusively for passport holders from European Union and select European countries. Subclass 601 (ETA) is an electronic travel authority accessible via the Australian ETA smartphone app for passport holders from select low-risk countries (e.g. USA, Canada, UK, Japan, Singapore) for a $20 service fee. Subclass 600 is the standard visitor visa for passport holders from all other countries (or those seeking longer stays up to 12 months, sponsored family stream, or business visitor streams), which requires a comprehensive documentary application.',
    category: 'Visa Comparisons',
  },
  {
    question: 'Can I extend my Australian visitor visa while onshore?',
    answer:
      'You cannot technically "extend" an existing visa; you must lodge an application for a new Subclass 600 visa while inside Australia before your current visa expires. Crucially, your current visa must NOT have Condition 8503 ("No Further Stay") attached. If Condition 8503 is present, you cannot lodge an onshore application unless you successfully apply for and receive a formal waiver from the Department of Home Affairs based on compelling and compassionate circumstances.',
    category: 'Onshore Stay',
  },
  {
    question: 'Can I work on an Australian visitor visa (Subclass 600)?',
    answer:
      'No. All Subclass 600 visas carry Condition 8101 ("No Work"). You cannot engage in work that would otherwise be done by an Australian citizen or resident for wages. Holders of the Business Visitor stream can undertake business activities such as attending conferences, negotiating contracts, or conducting exploratory business enquiries, but cannot supply services directly to the public or work for an Australian organisation.',
    category: 'Work Restrictions',
  },
  {
    question: 'How does the Sponsored Family Stream work for a visitor visa?',
    answer:
      'In the Sponsored Family stream, an eligible Australian citizen or permanent resident family member formally sponsors the applicant. The Department of Home Affairs may require the sponsor to lodge a refundable security bond (typically between AUD $5,000 and $15,000) to ensure the visa holder complies with all visa conditions and departs Australia before their visa expires.',
    category: 'Sponsored Family',
  },
  {
    question: 'What evidence best demonstrates strong ties to my home country?',
    answer:
      'Key evidence includes: 1. Ongoing permanent employment (letter from employer approving approved leave and confirming return date, recent payslips, income tax returns); 2. Property or commercial asset ownership (title deeds, lease agreements); 3. Family obligations (dependent spouse, young children, or aging parents residing in home country); 4. Continuous bank savings showing financial stability and legitimate funding sources.',
    category: 'Documentation',
  },
];

export default function VisitorFaqAccordion() {
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
