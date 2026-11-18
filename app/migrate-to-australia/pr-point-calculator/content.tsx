import Link from 'next/link';
import { Calculator, ClipboardCheck, GitCompare, ListChecks, Save } from 'lucide-react';
import {
  CtaBand,
  FaqList,
  SectionHeader,
  ArrowLabel,
  IconTile,
  card,
  cardPad,
  cardHover,
  container,
  sectionY,
  linkText,
} from '@/components/ui/brand';

const steps = [
  { icon: Calculator, t: 'Pick the visa you are aiming for', d: 'The 190 and 491 add points for nomination.' },
  { icon: ListChecks, t: 'Answer each of the six questions', d: 'Use the rules on the day you expect to be invited, not today.' },
  { icon: ClipboardCheck, t: 'Check your result', d: 'The score updates as you change answers.' },
  { icon: GitCompare, t: 'Compare the three visas', d: 'The breakdown shows your score for the 189, 190 and 491 together.' },
  { icon: Save, t: 'Save or note your score', d: 'Then book a consultation to check your evidence.' },
];

const areas = [
  ['Age', 'Your age when you are invited. 25 to 32 scores most', '0 to 30'],
  ['English', 'Competent, proficient or superior English', '0 to 20'],
  ['Education', 'Your highest recognised qualification', '0 to 20'],
  ['Work experience', 'Skilled work in the past 10 years, in Australia and overseas, combined cap of 20', '0 to 20'],
  ['Australian study and special qualifications', 'Australian study, STEM research degree, community language, Professional Year, regional study', 'Up to 10 on this tool'],
  ['Partner', 'Single, partner is a citizen or PR, or partner has English and a skills assessment', '0 to 10'],
];

const meaning = [
  { t: 'Under 65', d: 'You cannot lodge an EOI yet. You may be able to lift your score, for example with a higher English result or a Professional Year.' },
  { t: '65 or above', d: 'You can lodge an EOI, but invitations are competitive. In many occupations, the people invited have higher scores.' },
  { t: 'Skills assessment', d: 'Your occupation must be on the right list and you need a positive skills assessment. Points claimed must be backed by evidence. Claiming points you cannot prove can lead to refusal or cancellation.' },
];

const next = [
  { t: 'How the points test works', d: 'Each part of the test, in plain English.', href: '/skilled-migration/how-points-are-calculated' },
  { t: 'English test points', d: 'How IELTS, PTE and TOEFL map to points.', href: '/migrate-to-australia/points-for-english-score' },
  { t: 'Regional points', d: 'When regional study or nomination adds points.', href: '/migrate-to-australia/how-to-claim-regional-points' },
  { t: 'Check your occupation', d: 'Use the Occupation Finder.', href: '/occupation-finder' },
];

const faqs = [
  { q: 'How many points do I need for Australian PR?', a: 'You need at least 65 points to lodge an EOI for the 189, 190 or 491 visa. Invited candidates often have more.' },
  { q: 'Is this calculator official?', a: 'No. It is a free tool based on the Home Affairs points test. Only the Department assesses your claims.' },
  { q: 'Which age counts?', a: 'Your age on the day you are invited to apply.' },
  { q: 'Can I claim points for work done before I was qualified?', a: 'Not always. Only skilled work in your nominated occupation, after you met the skill level, counts. A registered agent can check your work history.' },
  { q: 'How do 190 and 491 points differ?', a: 'State nomination adds 5 points for the 190. State or family sponsored 491 adds 15. You also need an invitation from the state.' },
  { q: 'How long are English test results valid?', a: 'Test results must be less than three years old when you are invited. Check the current rules for your test before you rely on an old result.' },
];

const related = [
  { t: 'Skilled migration', d: 'Skilled Independent (189), Skilled Nominated (190) and Skilled Work Regional (491).', href: '/migrate-to-australia' },
  { t: 'Occupation Finder', d: 'Check your occupation and its skills assessing authority.', href: '/occupation-finder' },
  { t: 'Regional Postcode Checker', d: 'See whether a postcode counts as regional.', href: '/postcode-checker' },
];

export function PrContent() {
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
            eyebrow="The rules"
            title="How the points test works"
            lede="This is the page for your PR points. You need at least 65 points to lodge an Expression of Interest (EOI) in SkillSelect for the Skilled Independent (189), Skilled Nominated (190) or Skilled Work Regional (491) visa. Meeting 65 does not mean you will be invited. The guides below explain one part of the test each."
          />
          <div className={`${card} mt-12 overflow-x-auto`}>
            <table className="w-full text-left min-w-[560px]">
              <caption className="sr-only">The six areas of the points test and their points ranges</caption>
              <thead>
                <tr className="bg-brand-50 text-brand-950 text-sm">
                  <th scope="col" className="px-6 py-4 font-bold">Area</th>
                  <th scope="col" className="px-6 py-4 font-bold">What counts</th>
                  <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">Points range in this calculator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {areas.map(([a, w, p]) => (
                  <tr key={a}>
                    <th scope="row" className="px-6 py-4 font-bold text-slate-900 align-top">{a}</th>
                    <td className="px-6 py-4 text-slate-700 align-top">{w}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 align-top whitespace-nowrap">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Visa-specific extra points:</strong> the 190 adds 5 for state nomination. The 491 adds 15 for state or family nomination.
          </p>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Reading your result" title="What your score means" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {meaning.map((m) => (
              <div key={m.t} className={`${card} ${cardPad} flex flex-col`}>
                <h3 className="text-xl font-bold text-slate-900">{m.t}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-slate-700 leading-relaxed">
            This tool is general. A registered migration agent confirms your points.
          </p>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="What next" title="What to do after you have your score" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {next.map((n) => (
              <Link key={n.href} href={n.href} className={`group ${card} ${cardHover} ${cardPad} flex flex-col`}>
                <h3 className="text-lg font-bold text-slate-900">{n.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{n.d}</p>
                <span className="mt-auto pt-5"><ArrowLabel>Open</ArrowLabel></span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-slate-700">
            Ready to confirm your points and plan?{' '}
            <Link href="/book-an-appointment" className={linkText}>Book a consultation</Link>.
          </p>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Points test questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={container}>
          <SectionHeader eyebrow="Related" title="Related visas and tools" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      <CtaBand
        title="Want a registered agent to check your points?"
        text="We review your evidence, explain the risks and tell you what is realistic."
        disclaimer="This calculator gives an estimate. A score does not guarantee an invitation or a visa. Visa decisions are made by the Department of Home Affairs."
      />
    </>
  );
}
