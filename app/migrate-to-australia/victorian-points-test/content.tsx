import Link from 'next/link';
import { ArrowLabel, FaqList, SectionHeader, IconTile, card, cardPad, cardHover, container, sectionY, linkText } from '@/components/ui/brand';
import { UserRound, Languages, Briefcase, GraduationCap } from 'lucide-react';

const steps = [
  { icon: UserRound, t: 'Enter your age and English result', d: 'These are the largest single items.' },
  { icon: Briefcase, t: 'Add your work and study', d: 'Use relevant skilled experience and your highest recognised qualification.' },
  { icon: Languages, t: 'Add your ANZSCO skill level', d: 'Check the level in the Occupation Finder.', href: '/occupation-finder' },
  { icon: GraduationCap, t: 'Add partner and earnings', d: 'Earnings count only if you work in skilled employment in Victoria.' },
];

const cats = [
  ['Age', '300'],
  ['English', '200'],
  ['Skilled employment', '100'],
  ['Qualifications', '100'],
  ['ANZSCO skill level', '50'],
  ['Partner skills', '50'],
  ['Victorian earnings', '150'],
];

const next = [
  { t: 'Estimate your federal points', d: 'Use the PR Points Calculator.', href: '/migrate-to-australia/pr-point-calculator' },
  { t: 'Check your occupation', d: 'Use the Occupation Finder.', href: '/occupation-finder' },
  { t: 'Check the official guidance', d: 'Read the Live in Melbourne guidance on the Victorian Points Test.', href: 'https://liveinmelbourne.vic.gov.au/', external: true },
  { t: 'Plan your ROI', d: 'Book a consultation to plan your ROI and evidence, including salary evidence.', href: '/book-an-appointment' },
];

const faqs = [
  { q: 'What is the Victorian Points Test?', a: 'The scoring system Victoria uses to rank ROI candidates for state nomination.' },
  { q: 'Is there a minimum score?', a: 'There is no fixed pass mark. Invitation rounds select the highest scores.' },
  { q: 'Do I need to work in Victoria?', a: 'The earnings category counts current Victorian skilled employment. Other applicants can still score on other categories. Check the Live in Melbourne guidance for the current eligibility rules.' },
  { q: 'Does a high score guarantee nomination?', a: 'No. Victoria sets its own rules and limits places.' },
  { q: 'Is this the same as the 65-point test?', a: 'No. The federal test sets the minimum for an EOI. The VPT ranks candidates for Victorian nomination.' },
];

const related = [
  { t: 'Skilled migration', d: 'Visas for skilled workers and graduates.', href: '/migrate-to-australia' },
  { t: 'PR Points Calculator', d: 'Estimate your federal points for the 189, 190 and 491.', href: '/migrate-to-australia/pr-point-calculator' },
  { t: 'Postcode Checker', d: 'See whether a postcode counts as regional.', href: '/postcode-checker' },
  { t: 'South Australia nomination', d: 'Understand state nomination in South Australia.', href: '/south-australia-state-nomination' },
];

export function VptContent() {
  return (
    <>
      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Step by step" title="How to use the calculator" />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none">
            {steps.map((s, i) => (
              <li key={s.t} className={`${card} ${cardPad} flex flex-col gap-4`}>
                <div className="flex items-center justify-between">
                  <IconTile icon={s.icon} />
                  <span className="text-sm font-bold text-brand-700" aria-hidden="true">Step {i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.t}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {s.d}
                  {s.href && (<>{' '}<Link href={s.href} className={linkText}>Open it</Link>.</>)}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-slate-700 leading-relaxed">
            Finally, read your total, then use Copy Summary to share it with your agent.
          </p>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader
            eyebrow="The rules"
            title="How the Victorian Points Test works"
            lede="The Victorian Government uses the VPT to rank ROI candidates for nomination. It is separate from the federal points test used for SkillSelect. You need to meet both. The federal test has a minimum of 65 points."
          />
          <div className={`${card} mt-12 overflow-x-auto max-w-2xl`}>
            <table className="w-full text-left">
              <caption className="sr-only">Maximum points for each Victorian Points Test category</caption>
              <thead>
                <tr className="bg-brand-50 text-brand-950 text-sm">
                  <th scope="col" className="px-6 py-4 font-bold">Category</th>
                  <th scope="col" className="px-6 py-4 font-bold text-right">Maximum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cats.map(([c, m]) => (
                  <tr key={c}>
                    <th scope="row" className="px-6 py-3.5 font-semibold text-slate-900">{c}</th>
                    <td className="px-6 py-3.5 text-right font-semibold text-slate-900 tabular-nums">{m}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <th scope="row" className="px-6 py-4 font-extrabold text-slate-900">Total</th>
                  <td className="px-6 py-4 text-right font-extrabold text-brand-900 tabular-nums">950</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Reading your result" title="What your score means" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${card} ${cardPad}`}>
              <h3 className="text-xl font-bold text-slate-900">There is no fixed pass mark</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Victoria invites the highest-scoring candidates in invitation rounds, both overall and in priority industries. A high score helps but cannot guarantee a nomination. You must also meet the occupation, skills assessment and eligibility rules for your visa.
              </p>
            </div>
            <div className={`${card} ${cardPad}`}>
              <h3 className="text-xl font-bold text-slate-900">Use points unclaimed as a guide</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Where the calculator shows points unclaimed, treat it as a guide to where you may be able to improve, for example a better English result or a higher salary band.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="What next" title="Next steps" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {next.map((n) => {
              const inner = (
                <>
                  <h3 className="text-lg font-bold text-slate-900">{n.t}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{n.d}</p>
                  <span className="mt-auto pt-5"><ArrowLabel>{n.external ? 'Visit Live in Melbourne' : 'Open'}</ArrowLabel></span>
                </>
              );
              const cls = `group ${card} ${cardHover} ${cardPad} flex flex-col`;
              return n.external ? (
                <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={n.href} href={n.href} className={cls}>{inner}</Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Victorian Points Test questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Related" title="Related visas and tools" />
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
