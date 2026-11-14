import Link from 'next/link';
import { GraduationCap, Wallet, Users, School, Plane, CalendarClock } from 'lucide-react';
import { ArrowLabel, FaqList, SectionHeader, IconTile, card, cardPad, cardHover, container, sectionY } from '@/components/ui/brand';

const steps = [
  { icon: CalendarClock, t: 'Choose your course length', d: 'Only the first 12 months need to be counted.' },
  { icon: Wallet, t: 'Enter your tuition fee', d: 'Use the amount on your offer letter or CoE. Deduct what you have already paid.' },
  { icon: Users, t: 'Add family members', d: 'Include a partner and children who will come with you.' },
  { icon: School, t: 'Add school fees and travel', d: 'Use the school-age and airfare fields.' },
  { icon: GraduationCap, t: 'Read the total', d: 'Use it as your target amount to show.' },
];

const parts = [
  { icon: Wallet, t: 'Tuition', d: 'Course fees for the first 12 months, minus anything already paid.' },
  { icon: Users, t: 'Living costs', d: 'Student, partner and children, using the Department benchmark amounts.' },
  { icon: School, t: 'School costs', d: 'Fees for school-age children who come with you.' },
  { icon: Plane, t: 'Travel', d: 'Return airfares for the student and family.' },
];

const next = [
  { t: 'Check CRICOS', d: 'Make sure your course and provider are registered on CRICOS.' },
  { t: 'Gather your funds evidence', d: 'Check how long the money has been in the account.' },
  { t: 'Read our study guide', d: 'Learn about courses, costs and visas in our study in Australia guide.', href: '/study-australia' },
  { t: 'Book a consultation', d: 'Plan your visa and your documents with our team.', href: '/book-an-appointment' },
];

const faqs = [
  { q: 'How much money do I need for an Australian student visa?', a: 'It depends on your course length, tuition, family and travel. The calculator adds these up. For one student, the living cost benchmark in this tool is AUD $29,710 a year.' },
  { q: 'Do I need to show all my tuition fees?', a: 'No. Only the first 12 months of tuition, minus what you have paid.' },
  { q: 'Can my parents’ income count?', a: 'Yes, in some cases, by showing annual income with a tax assessment instead of savings. Check the Department of Home Affairs website for the current rules.' },
  { q: 'Is OSHC included?', a: 'No. Overseas Student Health Cover is arranged and paid separately, and is needed for the whole visa.' },
  { q: 'Are these figures official?', a: 'They are based on the Department’s published figures, and Home Affairs may change them. Check the official page before you apply.' },
  { q: 'Does showing enough funds mean my visa will be granted?', a: 'No. You must also meet the other criteria, including the Genuine Student requirement.' },
];

const related = [
  { t: 'Study in Australia', d: 'Courses, providers and the student visa process.', href: '/study-australia' },
  { t: 'Skilled migration', d: 'Pathways to work and permanent residence after study.', href: '/migrate-to-australia' },
  { t: 'Postcode Checker', d: 'See whether a postcode counts as regional.', href: '/postcode-checker' },
  { t: 'Book an appointment', d: 'Talk to a registered migration agent.', href: '/book-an-appointment' },
];

export function StudentContent() {
  return (
    <>
      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Step by step" title="How to use the calculator" />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 list-none">
            {steps.map((s, i) => (
              <li key={s.t} className={`${card} ${cardPad} flex flex-col gap-4`}>
                <div className="flex items-center justify-between">
                  <IconTile icon={s.icon} />
                  <span className="text-sm font-bold text-brand-700" aria-hidden="true">Step {i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.t}</h3>
                <p className="text-slate-600 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader
            eyebrow="The maths"
            title="How the total is worked out"
            lede="The estimate adds up four parts, for the first 12 months of your course. If your course is shorter than 12 months, living costs and tuition are scaled to the course length."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {parts.map((p) => (
              <div key={p.t} className={`${card} ${cardPad} flex flex-col gap-4`}>
                <IconTile icon={p.icon} />
                <h3 className="text-lg font-bold text-slate-900">{p.t}</h3>
                <p className="text-slate-600 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-slate-700 leading-relaxed">
            Overseas Student Health Cover (OSHC) is arranged and paid separately, and is not part of this total.
          </p>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Evidence" title="What counts as evidence" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${card} ${cardPad}`}>
              <h3 className="text-xl font-bold text-slate-900">Ways to show funds</h3>
              <ul className="mt-4 space-y-3 text-slate-600 leading-relaxed list-disc pl-5 marker:text-brand-700">
                <li>Money in an approved financial institution.</li>
                <li>Government loans, scholarships or education loans.</li>
                <li>Annual income of a parent or spouse over the 12 months before you apply, with an official tax assessment.</li>
              </ul>
            </div>
            <div className={`${card} ${cardPad}`}>
              <h3 className="text-xl font-bold text-slate-900">Tips</h3>
              <ul className="mt-4 space-y-3 text-slate-600 leading-relaxed list-disc pl-5 marker:text-brand-700">
                <li>Keep an extra 10 to 15 percent buffer for exchange rates.</li>
                <li>Check that the funds are clearly traceable to you or your sponsor.</li>
                <li>Meeting the funds test is one part of your application. Check the current Department of Home Affairs requirements, including the Genuine Student requirement.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="What next" title="What to do after you have your estimate" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {next.map((n) => {
              const inner = (
                <>
                  <h3 className="text-lg font-bold text-slate-900">{n.t}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{n.d}</p>
                  {n.href && <span className="mt-auto pt-5"><ArrowLabel>Open</ArrowLabel></span>}
                </>
              );
              return n.href ? (
                <Link key={n.t} href={n.href} className={`group ${card} ${cardHover} ${cardPad} flex flex-col`}>{inner}</Link>
              ) : (
                <div key={n.t} className={`${card} ${cardPad} flex flex-col`}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Student visa funds questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Related" title="Related pages" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={`group ${card} ${cardHover} ${cardPad} flex flex-col`}>
                <h3 className="text-lg font-bold text-slate-900">{r.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{r.d}</p>
                <span className="mt-auto pt-5"><ArrowLabel>View</ArrowLabel></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
