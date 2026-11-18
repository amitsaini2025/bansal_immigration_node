import type React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Phone, Calendar } from 'lucide-react';

/**
 * Bansal Immigration design system (server-safe, no state).
 * Brand colours match the live site: navy (brand-900) and button blue (brand-700), defined in app/globals.css.
 * Rules: 8pt spacing, one card style, one primary action colour per background,
 * 48px minimum button height, visible keyboard focus, text contrast AA.
 * Primary buttons are blue with white text. Gold is only used for star ratings.
 */

/* ---------- Class tokens ---------- */
export const container = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
export const containerNarrow = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';
export const sectionY = 'py-16 lg:py-24';

export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';
export const focusRingDark =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300';

export const card =
  'bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(26,26,43,0.04)] transition-[box-shadow,border-color,transform] duration-200 motion-reduce:transition-none';
export const cardPad = 'p-6 sm:p-7';
export const cardHover =
  'hover:border-brand-300 hover:shadow-[0_12px_32px_-12px_rgba(26,26,43,0.25)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0';

/** Buttons: use on the background named in the suffix. */
export const btnPrimaryDark = `inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-sm transition-colors text-base ${focusRingDark}`;
export const btnPrimaryLight = `inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-sm transition-colors text-base ${focusRing}`;
/** Ghost button that inherits the text colour of its section, so it works on light and dark backgrounds. */
export const btnGhostDark = `inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-semibold text-inherit border border-current/35 hover:bg-current/10 transition-colors text-base ${focusRingDark}`;
export const btnGhostLight = `inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-semibold text-brand-900 bg-white border border-slate-300 hover:border-brand-700 hover:bg-brand-50 transition-colors text-base ${focusRing}`;

/** Inline text link (on light backgrounds). */
export const linkText = `font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`;

/** Form controls (inputs, selects, textareas). */
export const fieldInput = `w-full min-h-12 px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/25 transition`;
export const fieldLabel = 'block text-sm font-semibold text-slate-800 mb-1.5';
export const fieldHint = 'text-xs text-slate-500 mt-1.5 leading-relaxed';

/* ---------- Components ---------- */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  dark = false,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>

      <Tag
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-brand-900'
        }`}
      >
        {title}
      </Tag>
      {lede && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {lede}
        </p>
      )}
    </div>
  );
}

export function IconTile({ icon: Icon, dark = false }: { icon: React.ElementType; dark?: boolean }) {
  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        dark ? 'bg-white/10 text-brand-300' : 'bg-brand-50 text-brand-900 border border-brand-100'
      }`}
    >
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
  );
}

/**
 * Page hero on navy. Put the breadcrumb ABOVE it (outside).
 * `actions` = buttons, `aside` = optional right column (photo, key facts card).
 * `below` = full-width content under the hero text (e.g. a search box).
 */
export function PageHero({
  badge,
  badgeIcon,
  title,
  intro,
  actions,
  aside,
  below,
}: {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  below?: React.ReactNode;
}) {
  return (
    <section className="relative bg-brand-50 text-slate-900 border-b border-slate-200">
      <div className={`${container} relative py-12 lg:py-16`}>
        <div className={aside ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start' : ''}>
          <div className={aside ? 'lg:col-span-7' : 'max-w-3xl'}>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-brand-900">
              {title}
            </h1>
            {intro && <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-2xl">{intro}</p>}
            {actions && <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
        {below}
      </div>
    </section>
  );
}

/** Closing call to action band on navy. */
export function CtaBand({
  title = 'Ready to talk about your visa?',
  text = 'Tell us where you are now and where you want to be. We will explain your options in plain English.',
  disclaimer = 'Visa outcomes are decided by the Department of Home Affairs. Information on this site is general and does not replace personal advice.',
}: {
  title?: string;
  text?: string;
  disclaimer?: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-brand-950 text-white">
      <div className={`${container} relative text-center`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">{title}</h2>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">{text}</p>
          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link href="/book-an-appointment" className={btnPrimaryDark}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
            <a href="tel:+61396021330" className={btnGhostDark}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call +61 3 9602 1330
            </a>
          </div>
          {disclaimer && (
            <p className="mt-8 text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">{disclaimer}</p>
          )}
        </div>
      </div>
    </section>
  );
}

/** Accessible FAQ list using native <details>. Server-safe. */
export function FaqList({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border border-slate-200 bg-white open:border-brand-300 open:shadow-sm transition-colors"
        >
          <summary
            className={`list-none cursor-pointer min-h-14 py-4 px-5 sm:px-6 flex items-center justify-between gap-4 rounded-2xl font-bold text-slate-900 text-base sm:text-lg leading-snug [&::-webkit-details-marker]:hidden ${focusRing}`}
          >
            <span>{f.q}</span>
            <span className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-brand-50 text-brand-900 group-open:bg-brand-700 group-open:text-white transition-colors">
              <ChevronDown
                className="w-4 h-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </summary>
          <div className="px-5 sm:px-6 pb-6 text-slate-600 text-base leading-relaxed">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Simple card link with arrow, used for lists of destinations. */
export function ArrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
      {children}
      <ArrowRight
        className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </span>
  );
}
