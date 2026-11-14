import React from 'react';

/**
 * Shared presentational pieces for the Tools & Calculators pages.
 * Visual only: these hold no state and no business logic. They reuse the same
 * look as the rest of the site (light hero, navy headings, solid blue buttons,
 * plain white cards) so the tools feel native to the website.
 */

export const toolCard = 'bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(26,26,43,0.04)]';

export const toolInput =
  'w-full px-4 py-3 min-h-12 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/25 transition';

export const toolLabel = 'block text-sm font-semibold text-slate-800 mb-1.5';

export const toolHint = 'text-xs text-slate-500 mt-1.5 leading-relaxed';

export const toolPrimaryBtn =
  'inline-flex items-center justify-center gap-2 px-6 min-h-12 rounded-xl font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-sm transition-colors text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';

export const toolSecondaryBtn =
  'inline-flex items-center justify-center gap-2 px-6 min-h-12 rounded-xl font-semibold text-brand-900 bg-white hover:bg-brand-50 border border-slate-300 hover:border-brand-700 transition-colors text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';

export const toolCheckbox =
  'mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-900 focus:ring-brand-700 cursor-pointer shrink-0';

/** Page hero: navy, left aligned, gold badge + heading. Same look as the home page hero. */
export function ToolHero({
  badge,
  badgeIcon,
  title,
  children,
  below,
}: {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Extra content under the intro (e.g. a search box). Not clipped, so dropdowns can overflow. */
  below?: React.ReactNode;
}) {
  return (
    <section className="relative bg-brand-50 text-slate-900 border-b border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            {title}
          </h1>
          {children && (
            <div className="mt-5 text-lg text-slate-600 leading-relaxed">{children}</div>
          )}
        </div>
        {below}
      </div>
    </section>
  );
}

/** Numbered section header used inside a form card: number, title, optional live points chip. */
export function StepHeader({
  step,
  title,
  chip,
  chipNote,
  icon,
}: {
  step: number | string;
  title: React.ReactNode;
  chip?: React.ReactNode;
  chipNote?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-8 h-8 rounded-full bg-brand-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
          {step}
        </span>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          {icon}
          {title}
        </h2>
      </div>
      {chip !== undefined && (
        <div className="text-right shrink-0">
          <span className="inline-block text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
            {chip}
          </span>
          {chipNote && <span className="block text-[10px] text-slate-400 mt-0.5">{chipNote}</span>}
        </div>
      )}
    </div>
  );
}

/** Header strip for the results / scorecard panel. */
export function ResultHeader({
  label,
  right,
}: {
  label: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 bg-brand-900 text-white rounded-t-xl">
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      {right}
    </div>
  );
}

/** Label / value row used in score breakdowns. */
export function Row({
  label,
  value,
  strong,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center gap-3 py-2 border-b border-slate-100 last:border-0 text-sm ${
        strong ? 'font-bold text-slate-900' : 'text-slate-600'
      }`}
    >
      <span>{label}</span>
      <span className="font-bold text-slate-900 tabular-nums">{value}</span>
    </div>
  );
}
