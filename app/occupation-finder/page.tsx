import type { Metadata } from 'next';
import Link from 'next/link';
import { ListChecks, Award, Compass } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import OccupationFinderClient from '@/components/tools/OccupationFinderClient';
import {
  container,
  sectionY,
  card,
  cardPad,
  cardHover,
  SectionHeader,
  IconTile,
  CtaBand,
  FaqList,
  ArrowLabel,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'Skilled Occupation List Finder | ANZSCO Search',
  description:
    'Search ANZSCO occupations, check assessing authorities and see which skilled visas your job may suit. Free finder from migration agents in Melbourne.',
  keywords: [
    'skilled occupation list Australia',
    'ANZSCO code finder',
    'is my occupation eligible for PR Australia',
    'skills assessment authority',
    'core skills occupation list',
    'occupation list for 482 visa',
    'regional occupation list',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/occupation-finder',
  },
};

const STEPS = [
  { t: 'Type your job title', d: 'Try alternative titles if you do not see a match.' },
  { t: 'Compare the duties', d: 'Choose the code whose tasks match what you actually do, not just the title.' },
  { t: 'Check the visa and list details', d: 'See which visas the occupation may be eligible for.' },
  { t: 'Note the assessing authority', d: 'Most skilled visas need a skills assessment first.' },
  { t: 'Book a consultation', d: 'An agent can check your duties and evidence.' },
];

const LISTS = [
  {
    code: 'MLTSSL',
    name: 'Medium and Long-term Strategic Skills List',
    text: 'Our tool links this list to the 189, 190, 491, 482 and 186 Direct Entry visas.',
  },
  {
    code: 'STSOL',
    name: 'Short-term Skilled Occupation List',
    text: 'Our tool links this list to the 190, 491 and 482 visas.',
  },
  {
    code: 'ROL',
    name: 'Regional Occupation List',
    text: 'Our tool links this list to the 491 and 494 visas.',
  },
  {
    code: 'CSOL',
    name: 'Core Skills Occupation List',
    text: 'Our tool links this list to the Core Skills stream of the Skills in Demand (482) visa.',
  },
];

const NEXT = [
  { href: '/migrate-to-australia/pr-point-calculator', t: 'Estimate your points', d: 'Use the PR Points Calculator.' },
  { href: '/postcode-checker', t: 'Check your area', d: 'See if your postcode counts as regional.' },
  { href: '/migrate-to-australia', t: 'See visa options', d: 'Read the skilled migration page.' },
  { href: '/employer-sponsored/sid-visa-482', t: 'Employers', d: 'Read about the Skills in Demand 482 visa.' },
];

const FAQS = [
  {
    q: 'What if my job title is different from the ANZSCO title?',
    a: 'Look at the duties. Many jobs have different names in different companies. Pick the code with the closest tasks. An agent can help.',
  },
  {
    q: 'How long is a skills assessment valid?',
    a: 'It depends on the authority. Check the date on your result.',
  },
  {
    q: 'Can I apply for a 189 visa if my occupation is on the STSOL?',
    a: 'The 189 has its own occupation requirements and these lists have changed in recent years. Check the current list on the Department of Home Affairs website, or ask one of our agents before you rely on a list.',
  },
  {
    q: 'What is the Core Skills Occupation List?',
    a: 'The list of occupations for the Core Skills stream of the Skills in Demand (482) visa. The old name of this visa was the Temporary Skill Shortage (TSS) visa.',
  },
  {
    q: 'Does being on a list mean I will get PR?',
    a: 'No. It is one requirement. You also need points, a skills assessment, an invitation or nomination, and to meet all criteria.',
  },
  { q: 'Can my occupation change later?', a: 'Yes. Lists change. Check before you lodge.' },
];

export default function OccupationFinderPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[{ label: 'Tools & Calculators' }, { label: 'Occupation Finder' }]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <OccupationFinderClient />

      {/* How to use */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Step by step" title="How to use the finder" />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {STEPS.map((s, i) => (
              <li key={s.t} className={`${card} ${cardPad} flex flex-col`}>
                <span className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ANZSCO + skills assessments */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${card} ${cardPad} lg:p-8`}>
              <IconTile icon={ListChecks} />
              <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">What is ANZSCO?</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                ANZSCO is the Australian and New Zealand Standard Classification of Occupations. It describes jobs, their skill levels (1 to 5) and the main tasks. Visa rules use ANZSCO codes to decide whether your job is eligible.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Your job title does not decide your code. Your actual duties do. Choosing a code that does not match your work can lead to a failed skills assessment or a visa refusal.
              </p>
            </div>
            <div className={`${card} ${cardPad} lg:p-8`}>
              <IconTile icon={Award} />
              <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Why you need a skills assessment</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                For most skilled visas you need a positive skills assessment from the authority for your occupation. Common authorities include the Australian Computer Society (ACS), VETASSESS, Engineers Australia, Trades Recognition Australia (TRA) and the Australian Nursing and Midwifery Accreditation Council (ANMAC).
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                The assessment checks your qualifications and work experience against the standard for your occupation. Keep evidence of your duties, such as employment letters and payslips. Assessment results are valid for a limited time, which varies by authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lists */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Occupation lists"
            title="Occupation lists and the visas they link to"
            lede="The visa you can apply for depends on which list your occupation is on. These list names and rules have changed in recent years, including with the Skills in Demand (482) visa, so check the Department of Home Affairs website before you lodge."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LISTS.map((l) => (
              <div key={l.code} className={`${card} ${cardPad} flex flex-col`}>
                <span className="w-fit px-3 py-1 rounded-full bg-brand-900 text-white text-xs font-bold tracking-wide">{l.code}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{l.name}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What next */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <SectionHeader eyebrow="Next steps" title="What to do after you find your occupation" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEXT.map((n) => (
              <Link key={n.href} href={n.href} className={`group ${card} ${cardHover} ${cardPad} flex flex-col`}>
                <Compass className="w-6 h-6 text-brand-800" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{n.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{n.d}</p>
                <span className="mt-auto pt-5">
                  <ArrowLabel>Go</ArrowLabel>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Occupation and skills assessment questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which ANZSCO code matches your experience?"
        text="Choosing the wrong code can lead to a failed skills assessment or a refusal. Book a consultation and we will compare your duties and evidence with the occupation."
        disclaimer="Lists and rules change. This tool gives general information only."
      />
    </div>
  );
}
