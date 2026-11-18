'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { linkText, focusRing } from '@/components/ui/brand';

interface ContactFAQ {
  question: string;
  answer: React.ReactNode;
}

const contactFaqs: ContactFAQ[] = [
  {
    question: 'How soon can I get an appointment?',
    answer:
      'Most appointments are available within one to three business days. If your visa is about to expire, or you have a cancellation notice (NOICC) or a review deadline, call +61 3 9602 1330 so we can prioritise you.',
  },
  {
    question: 'Do you assess permanent residency pathways?',
    answer: (
      <>
        Yes. We look at your age, English, skills, work history and state options, then explain which visas may suit you. Our{' '}
        <Link href="/migrate-to-australia/pr-point-calculator" className={linkText}>PR Points Calculator</Link> gives a first estimate.
      </>
    ),
  },
  {
    question: 'Can you help with a visa refusal or appeal?',
    answer: (
      <>
        We can explain your review rights, including to the Administrative Review Tribunal (ART), and the deadline that applies. Review time limits are short, so contact us quickly. See{' '}
        <Link href="/appeals" className={linkText}>Appeals and reviews</Link>.
      </>
    ),
  },
  {
    question: 'Can I get advice if I live overseas or outside Melbourne and Adelaide?',
    answer: 'Yes. Phone and video appointments are available for clients in Australia and overseas.',
  },
  {
    question: 'Can I visit without an appointment?',
    answer: (
      <>
        Please book first so an adviser is available. Use the{' '}
        <Link href="/book-an-appointment" className={linkText}>booking page</Link>. Coming to the office? Fill in the{' '}
        <Link href="/office-visit-form" className={linkText}>Office Visit Form</Link> to save time.
      </>
    ),
  },
  {
    question: 'How is my personal information protected?',
    answer: (
      <>
        We handle your information under the Privacy Act 1988 and the Migration Agents Code of Conduct. We do not sell or share it. See our{' '}
        <Link href="/privacy-policy" className={linkText}>Privacy Policy</Link>. You can also{' '}
        <Link href="/team" className={linkText}>meet the team</Link>.
      </>
    ),
  },
];

export default function ContactFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {contactFaqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border bg-white transition-colors motion-reduce:transition-none ${
              isOpen ? 'border-brand-300 shadow-sm' : 'border-slate-200'
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(idx)}
                className={`w-full text-left min-h-14 py-4 px-5 sm:px-6 flex items-center justify-between gap-4 rounded-2xl font-bold text-slate-900 text-base sm:text-lg leading-snug cursor-pointer ${focusRing}`}
                aria-expanded={isOpen}
                aria-controls={`contact-faq-${idx}`}
                id={`contact-faq-btn-${idx}`}
              >
                <span>{faq.question}</span>
                <span
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-900'
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`contact-faq-${idx}`}
                role="region"
                aria-labelledby={`contact-faq-btn-${idx}`}
                className="px-5 sm:px-6 pb-6 text-slate-600 text-base leading-relaxed"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
