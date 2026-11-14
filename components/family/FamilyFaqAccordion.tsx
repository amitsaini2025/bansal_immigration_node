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
    question: 'What are the 4 Pillars of Evidence required for Australian partner visas?',
    answer:
      'Under Migration Regulations Regulation 1.15A, the Department of Home Affairs evaluates all partner visa applications (Subclasses 820/801 and 309/100) across four statutory pillars: 1. Financial aspects (joint bank accounts, shared household expenses, shared leases or mortgages); 2. Nature of the household (shared living arrangements, joint responsibilities for care of children, division of housework); 3. Social aspects (joint travel, social invitations, mutual friends, statutory declarations from Australian citizens/PRs under Form 888); 4. Mutual commitment (knowledge of each other’s personal backgrounds, wills, plans for the future, communication logs during any separations).',
    category: 'Partner Visas',
  },
  {
    question: 'What is the difference between Onshore (820/801) and Offshore (309/100) Partner Visas?',
    answer:
      'The primary difference is where the applicant is physically located at the time of visa application. Subclass 820/801 is applied for while onshore in Australia, granting a Bridging Visa A (BVA) with full work rights and Medicare access while awaiting a decision. Subclass 309/100 is applied for from outside Australia, with no automatic right to reside in Australia until the provisional subclass 309 is granted (unless an onshore visitor visa is separately obtained and conditions allow). Both pathways lead to permanent residency (Subclass 801/100) usually 2 years after initial lodgement.',
    category: 'Partner Visas',
  },
  {
    question: 'What is the difference between Contributory and Non-Contributory Parent Visas?',
    answer:
      'Contributory Parent Visas (Subclass 143 permanent / Subclass 173 temporary, or onshore Aged Parent 864/884) require a substantial second visa application charge (currently AUD $43,600 per adult parent) and an Assurance of Support (AoS) bond, but have much shorter processing queues (typically 12–15+ years under current demand). Non-Contributory Parent Visas (Subclass 103 offshore / Subclass 804 onshore) have minimal visa charges, but the official Home Affairs queue is estimated at 30+ years due to strict annual cap quotas.',
    category: 'Parent Visas',
  },
  {
    question: 'What is the Balance of Family Test for parent visas?',
    answer:
      'To qualify for any Australian parent visa, the parents must pass the Balance of Family test: at least half of the applicant’s children must be Australian citizens, permanent residents, or eligible New Zealand citizens who are usually resident in Australia; OR more of your children live as Australian permanent residents or citizens in Australia than in any other single country. Step-children and adopted children are included in this calculation.',
    category: 'Parent Visas',
  },
  {
    question: 'Can my sponsor sponsor multiple partners over their lifetime?',
    answer:
      'Under Australian migration law (Regulation 1.20J), an Australian citizen or permanent resident sponsor can only sponsor a maximum of two partners in their lifetime. Furthermore, there must be a minimum 5-year gap between the lodgement of a previous partner visa and the new application, unless compelling and compassionate circumstances exist (e.g. death of a prior partner or young dependent children together).',
    category: 'Sponsorship Rules',
  },
  {
    question: 'What happens if a partner relationship breaks down due to family violence?',
    answer:
      'Under the Family Violence Provisions of the Migration Regulations 1994, an applicant on a provisional partner visa (Subclass 820 or 309) whose relationship has ended may still be granted permanent residency (Subclass 801 or 100) if they or their dependants have suffered domestic or family violence committed by the sponsoring partner. Bansal Immigration handles these sensitive matters with strict confidentiality and specialized legal protocols.',
    category: 'Statutory Protections',
  },
];

export default function FamilyFaqAccordion() {
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
