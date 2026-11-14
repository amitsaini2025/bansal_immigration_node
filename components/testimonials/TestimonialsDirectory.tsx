'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { card, cardHover, focusRing, ArrowLabel } from '@/components/ui/brand';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  category: 'skilled' | 'student' | 'partner' | 'employer' | 'family';
  serviceLabel: string;
  serviceHref: string;
  source: 'Google review';
  date: string;
  rating: number;
  quote: string;
  /** Only reviews confirmed as genuine Google reviews are shown. */
  confirmed: boolean;
}

const REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: 'Ranjita Samyal',
    role: 'Google Local Guide',
    category: 'skilled',
    serviceLabel: 'Skilled PR (Subclass 190)',
    serviceHref: '/migrate-to-australia',
    source: 'Google review',
    date: 'August 2026',
    rating: 5,
    confirmed: true,
    quote:
      'We had the privilege of working with Bansal Immigration. I cannot express enough gratitude for the exceptional support we received throughout our PR journey. The team demonstrated extraordinary empathy, understanding our situation in depth and tailoring their advice with precision.',
  },
  {
    id: '2',
    name: 'Vik Singh',
    role: 'Google review',
    category: 'student',
    serviceLabel: 'Student Visa (Subclass 500)',
    serviceHref: '/study-australia',
    source: 'Google review',
    date: 'May 2026',
    rating: 5,
    confirmed: true,
    quote:
      'I am extremely happy and grateful to Bansal Immigration Consultants for helping me successfully get my student visa grant. From start to finish, the team was professional, supportive, and very clear with every step of the process. They handled my application with care, answered all my questions patiently, and guided me with honesty and confidence.',
  },
  {
    id: '3',
    name: 'Shipra Sharma',
    role: 'Google Local Guide',
    category: 'skilled',
    serviceLabel: 'General Skilled Migration',
    serviceHref: '/migrate-to-australia',
    source: 'Google review',
    date: 'August 2026',
    rating: 5,
    confirmed: true,
    quote:
      'I have been with Bansal Immigration for almost six years now and I am very happy with the services provided by them. I have achieved what I came to Australia for, with the excellent advice provided through Bansal Immigration. I have found worth for my every penny with them. I followed everything they asked me to and got the results I wanted for myself.',
  },
  // The four reviews below have not been confirmed as genuine Google reviews, so they stay hidden.
  {
    id: '4',
    name: 'Rajesh & Priya Sharma',
    role: 'Google review',
    category: 'partner',
    serviceLabel: 'Partner Visa (Subclass 820/801)',
    serviceHref: '/family-visa',
    source: 'Google review',
    date: 'July 2026',
    rating: 5,
    confirmed: false,
    quote:
      'Bansal Immigration made our dream of living together in Australia come true. Their professional guidance in assembling the four pillars of relationship evidence and statutory declarations was exceptional. The partner visa was granted smoothly without any Requests for Information.',
  },
  {
    id: '5',
    name: 'David & Maria Rodriguez',
    role: 'Google review',
    category: 'family',
    serviceLabel: 'Contributory Parent Visa (Subclass 143)',
    serviceHref: '/family-visa',
    source: 'Google review',
    date: 'April 2026',
    rating: 5,
    confirmed: false,
    quote:
      'Professional, reliable, and knowledgeable. Bansal Immigration helped our family navigate the complex balance of family test and assurance of support requirements for our parents. Their thorough approach gave us confidence at every step.',
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Google review',
    category: 'employer',
    serviceLabel: 'Skills in Demand (Subclass 482)',
    serviceHref: '/employer-sponsored',
    source: 'Google review',
    date: 'June 2026',
    rating: 5,
    confirmed: false,
    quote:
      'The employer-sponsored nomination process seemed overwhelming with labour market testing and salary benchmarking rules, but Bansal Immigration made it clear and manageable. Their corporate expertise saved our company time and ensured complete compliance.',
  },
  {
    id: '7',
    name: 'Michael & Anna Singh',
    role: 'Google review',
    category: 'skilled',
    serviceLabel: 'Skilled Work Regional (Subclass 491)',
    serviceHref: '/migrate-to-australia',
    source: 'Google review',
    date: 'March 2026',
    rating: 5,
    confirmed: false,
    quote:
      'From our initial skills assessment to South Australia regional nomination and final visa grant, the service was outstanding. Their deep knowledge of regional occupation lists and points calculation made all the difference.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All reviews' },
  { id: 'skilled', label: 'Skilled Migration (189/190/491)' },
  { id: 'student', label: 'Student Visas (500)' },
  { id: 'partner', label: 'Partner Visas (820/801)' },
  { id: 'employer', label: 'Employer Sponsored (482/186)' },
  { id: 'family', label: 'Parent and Family Visas' },
];

const VISIBLE = REVIEWS.filter((r) => r.confirmed);
const TABS = CATEGORIES.filter((c) => c.id === 'all' || VISIBLE.some((r) => r.category === c.id));

export default function TestimonialsDirectory() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? VISIBLE : VISIBLE.filter((r) => r.category === activeCategory);

  return (
    <div>
      <div role="group" aria-label="Filter reviews by visa type" className="flex flex-wrap gap-2">
        {TABS.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveCategory(cat.id)}
              className={`min-h-12 px-5 rounded-xl text-sm font-semibold border transition-colors motion-reduce:transition-none cursor-pointer ${focusRing} ${
                active
                  ? 'bg-brand-900 text-white border-brand-900'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-brand-700 hover:bg-brand-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {filtered.map((r) => (
          <li key={r.id} className={`${card} ${cardHover} p-6 sm:p-7 flex flex-col`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-400" aria-hidden="true" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {r.source}
              </span>
            </div>

            <span className="mt-5 self-start px-2.5 py-1 rounded-md text-xs font-bold bg-brand-50 text-brand-900 border border-brand-100">
              {r.serviceLabel}
            </span>

            <blockquote className="mt-4 text-base text-slate-700 leading-relaxed">
              &ldquo;{r.quote}&rdquo;
            </blockquote>

            <div className="mt-auto pt-6">
              <div className="pt-5 border-t border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {r.role} &middot; {r.date}
                  </p>
                </div>
                <Link href={r.serviceHref} className={`group rounded ${focusRing}`}>
                  <ArrowLabel>Visa pathway</ArrowLabel>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
