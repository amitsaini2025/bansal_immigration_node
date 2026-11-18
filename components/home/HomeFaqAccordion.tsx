'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Are your migration agents registered?',
    answer:
      'Yes. Our agents are registered with the Office of the Migration Agents Registration Authority (OMARA). Each agent’s MARN is shown on their profile, so you can check it on the official register before you book.',
  },
  {
    question: 'How much does a consultation cost?',
    answer:
      'A free 10-minute initial assessment is available for clients already in Australia. Longer 30-minute appointments are $150. The price for your appointment type is shown when you book. If you later ask us to act for you, we agree the work and fees in writing first.',
  },
  {
    question: 'What happens at the first consultation?',
    answer:
      'We listen to your situation, explain the visa options that may fit, and tell you what evidence and steps are involved. You decide whether to go ahead. There is no obligation to sign anything on the day.',
  },
  {
    question: 'Can you guarantee my visa?',
    answer:
      'No. Only the Department of Home Affairs decides visa applications, and no agent can guarantee a result. We tell you honestly whether a pathway is realistic before you spend money on a course, a skills assessment or an application.',
  },
  {
    question: 'Do I need a migration agent?',
    answer:
      'You can apply yourself, but visa rules are detailed and small mistakes can cause delays or refusals. An agent helps you choose the right visa, prepare the right evidence and respond if the Department asks for more.',
  },
  {
    question: 'Can I meet you if I am overseas?',
    answer:
      'Yes. We offer phone and video appointments, and clients apply from many countries. Please check the Australian time zone (AEST or ACST) before you confirm a booking.',
  },
  {
    question: 'How long does a visa take?',
    answer:
      'It depends on the visa and the Department’s current workload. The Department of Home Affairs publishes its latest processing times on its website. We can explain what they mean for your case and what could slow it down.',
  },
  {
    question: 'I was refused a visa. What can I do?',
    answer:
      'You may have review rights with strict deadlines. Find the date in your decision letter and call us as soon as you can, with the letter in hand. An enquiry does not extend a deadline, so do not wait.',
  },
  {
    question: 'Which visa is best for permanent residency?',
    answer:
      'It depends on your occupation, age, English, experience and the state options open to you. Try our PR Points Calculator for a first estimate, then book a consultation so an agent can confirm what applies to you.',
  },
];

export default function HomeFaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {FAQS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        const panelId = `home-faq-panel-${idx}`;
        return (
          <div
            key={idx}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen ? 'border-brand-300 shadow-sm' : 'border-slate-200 hover:border-brand-200'
            }`}
          >
            <h3>
              <button
                onClick={() => toggle(idx)}
                className="w-full min-h-14 py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-900'
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} className="px-5 sm:px-6 pb-6 text-slate-600 text-base leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
