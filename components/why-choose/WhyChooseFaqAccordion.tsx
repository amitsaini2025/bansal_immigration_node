'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does Bansal Immigration differ from education agents who offer migration advice?',
    answer:
      'Under the Migration Act 1958, education agents are only permitted to assist with school or university enrollments; they are strictly prohibited from giving Australian immigration legal advice unless registered with OMARA. All migration advice at Bansal Immigration is provided directly by OMARA Registered Migration Agents bound by statutory consumer protections and professional standards.',
  },
  {
    question: 'How do you determine whether my visa case is eligible?',
    answer:
      'We conduct a thorough statutory eligibility audit before accepting any visa matter. We analyze your academic credentials, employment history, English test scores, and visa history against current Department of Home Affairs legislative instruments. If an application is not viable, we will tell you directly rather than accept fees for a hopeless case.',
  },
  {
    question: 'How are your consultation fees and professional service fees structured?',
    answer:
      'We operate on transparent, fixed-fee service agreements. We charge an upfront consultation fee for comprehensive strategic case analysis. If you engage our firm for full visa representation within 30 days, your initial consultation fee is credited 100% toward your agreed service fee. There are no surprise hourly rates or hidden disbursements.',
  },
  {
    question: 'Can you guarantee that my Australian visa will be approved?',
    answer:
      'No ethical or registered migration agent can guarantee a visa approval because all final decisions rest exclusively with the Australian Department of Home Affairs or the Administrative Review Tribunal (ART). Under Regulation 2.22 and the OMARA Code of Conduct, promising guaranteed outcomes is strictly prohibited. What we guarantee is rigorous legal preparation, adherence to legislative criteria, and exhaustive evidence collation.',
  },
  {
    question: 'Will I have direct access to my assigned Registered Migration Agent?',
    answer:
      'Yes. Unlike high-volume agencies where clients are handed off to administrative clerks, you have direct phone, email, and scheduled appointment access to your dedicated registered migration agent throughout your application lifecycle.',
  },
  {
    question: 'Do you assist clients in regional Australia and overseas?',
    answer:
      'Yes. In addition to our central offices in Melbourne (Collins St) and Adelaide (Gawler Pl), we support regional applicants across South Australia, regional Victoria, Queensland, NSW, WA, and offshore clients internationally via encrypted video consultations and digital document lodging.',
  },
];

export default function WhyChooseFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-brand-300 bg-brand-50/30 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-brand-700 shrink-0" />
                <span>{faq.question}</span>
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-brand-700' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100/80">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
