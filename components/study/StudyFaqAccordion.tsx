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
    question: 'What is the Genuine Student (GS) requirement for a Subclass 500 visa?',
    answer:
      'Commencing March 2024, the Department of Home Affairs replaced the Genuine Temporary Entrant (GTE) statement with the Genuine Student (GS) criterion. Applicants must provide targeted written responses addressing their academic background, reasons for choosing the specific course and provider in Australia, how the qualification advances their career in their home country or internationally, and details of their study history. While Australia acknowledges that some graduates may subsequently pursue legal skilled migration pathways, the application must demonstrate genuine intent to complete the proposed study.',
    category: 'Visa Requirements',
  },
  {
    question: 'How much money do I need to show for an Australian student visa?',
    answer:
      'Under current Department of Home Affairs guidelines, primary applicants must demonstrate capacity to cover 12 months of living costs (statutory benchmark is AUD $29,710 as of 2024/2025), plus 12 months of course tuition fees (or remaining fees if course is shorter), and return travel expenses (approx. AUD $2,000–$2,500). If bringing a partner, add an additional 35% of living costs (approx. AUD $10,394), and approx. 15% (approx. AUD $4,449) for each child, plus school fees for school-age dependants.',
    category: 'Financial Evidence',
  },
  {
    question: 'How many hours can international students work in Australia?',
    answer:
      'Student visa holders (Subclass 500) are permitted to work up to 48 hours per fortnight during official study terms and semesters once their course has commenced. During scheduled course vacations and term breaks recognised by the education provider, students can work unrestricted hours. Masters by Research and Doctoral (PhD) candidates generally have unrestricted work rights once their research has commenced.',
    category: 'Work Rights',
  },
  {
    question: 'Can I change my course or education provider after arriving in Australia?',
    answer:
      'Under Standard 7 of the National Code of Practice 2018, students cannot transfer to another education provider before completing six calendar months of their principal course of study without a formal letter of release from their current institution. If changing courses at the same or higher AQF level within the same institution, a new CoE must be issued. Changing to a lower Australian Qualifications Framework (AQF) level (e.g. from Masters to Diploma) generally requires lodging a new Subclass 500 visa application.',
    category: 'Course Changes',
  },
  {
    question: 'Does completing a degree in Australia guarantee Permanent Residency (PR)?',
    answer:
      'No. Completing an Australian qualification does not automatically guarantee permanent residency. Australian tertiary study may provide points toward the general skilled migration points test (5 points for 2 academic years of study, plus an additional 5 points for designated regional study) and make you eligible for a Subclass 485 Temporary Graduate visa. However, PR requires meeting occupation shortage list criteria, positive skills assessment, English benchmarks, and receiving a state or federal nomination invitation.',
    category: 'Migration Pathways',
  },
  {
    question: 'Can I include my spouse and dependent children in my student visa application?',
    answer:
      'Not as a later application. You cannot add a partner or child after a student visa is granted, and there is no exemption from that rule. You can include them in the same student visa application only if an exemption applies, such as a PhD, a DFAT or Defence sponsorship, a foreign government scholarship, or an eligible Pacific or ASEAN student. Family already on your current student visa can be included again in limited further-student-visa cases. Everyone included must be in the same location when you lodge. A partner who is included generally works up to 48 hours a fortnight, with no cap if you are enrolled in a masters by research or a doctorate.',
    category: 'Family & Dependants',
  },
];

export default function StudyFaqAccordion() {
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
