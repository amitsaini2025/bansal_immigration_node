import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Landmark, Trees, ListChecks } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';
import PostcodeCheckerClient from '@/components/tools/PostcodeCheckerClient';
import {
  container,
  sectionY,
  card,
  cardPad,
  cardHover,
  linkText,
  SectionHeader,
  IconTile,
  CtaBand,
  FaqList,
  ArrowLabel,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'Regional Postcode Checker Australia | Bansal Immigration',
  description:
    'Check if an Australian postcode is a designated regional area for the 491 and 494 visas and regional study points. Free tool.',
  keywords: [
    'Australia regional postcode checker',
    'designated regional area postcode',
    'is my postcode regional',
    'regional visa 491 postcode',
    'regional study points Australia',
    'category 1 2 3 regional areas',
    'regional area for 494 visa',
  ],
  alternates: {
    canonical: 'https://bansalimmigration.com.au/postcode-checker',
  },
};

const STEPS = [
  { t: 'Enter a postcode', d: 'Use the postcode where you live, work or study.' },
  { t: 'Read the category', d: 'It shows Category 1, 2 or 3.' },
  { t: 'Read what it means', d: 'Check the visa and study notes beneath the result.' },
  { t: 'Check the rule for your visa', d: 'Rules differ by visa.' },
];

const CATEGORIES = [
  {
    n: '1',
    icon: Building2,
    title: 'Major cities',
    places: 'Sydney, Melbourne and Brisbane metropolitan areas',
    text: 'Not regional. Cannot be used for regional visas such as the 491 and 494. No extra regional study points.',
  },
  {
    n: '2',
    icon: Landmark,
    title: 'Cities and major regional centres',
    places: 'Perth, Adelaide, Gold Coast, Sunshine Coast, Newcastle, Wollongong, Geelong, Hobart, Canberra',
    text: 'Counts as regional for many regional visas. Can qualify for regional study points.',
  },
  {
    n: '3',
    icon: Trees,
    title: 'Regional centres and other regional areas',
    places: 'Other towns and remote areas',
    text: 'Counts as regional. Often the strongest regional concessions.',
  },
];

const WHY = [
  {
    t: 'Regional visas (491 and 494)',
    d: 'You generally need to live and work in a designated regional area. The 491 also adds 15 points to the points test.',
  },
  {
    t: 'Study points',
    d: 'If you studied at a campus in a designated regional area and meet the Australian study requirement (at least two academic years, 92 CRICOS weeks), you may claim 5 points.',
  },
  {
    t: 'Graduate visa',
    d: 'Where you study can affect the length of a Temporary Graduate (485) visa. Check the Department of Home Affairs website for the current rules.',
  },
  {
    t: 'Not the 190',
    d: 'The Skilled Nominated (190) visa is not a regional visa. It depends on the state or territory’s own rules, so regional status is not needed for it.',
  },
];

const NEXT = [
  { href: '/migrate-to-australia/pr-point-calculator', t: 'Add regional points', d: 'Use the PR Points Calculator.' },
  { href: '/occupation-finder', t: 'Check your occupation', d: 'Search the Occupation Finder.' },
  { href: '/south-australia-state-nomination', t: 'Looking at South Australia?', d: 'Read the South Australia guide.' },
  { href: '/book-an-appointment', t: 'Book a consultation', d: 'Confirm how your postcode applies to your visa.' },
];

const FAQS = [
  {
    q: 'Is Melbourne a regional area?',
    a: 'Metropolitan Melbourne is a major city and is not regional for the 491 or 494. Geelong is treated differently. Check with the tool.',
  },
  {
    q: 'Is Adelaide regional?',
    a: 'Adelaide is listed as a city and major regional centre, so it counts for some regional visas.',
  },
  {
    q: 'Do I get regional study points automatically?',
    a: 'No. You must meet the Australian study requirement while studying in a designated regional area.',
  },
  {
    q: 'Can the list change?',
    a: 'Yes. The Department updates postcode lists. Check the date of your visa application.',
  },
  { q: 'Does my postcode decide my visa?', a: 'No. It is one of several conditions.' },
];

const RELATED = [
  { href: '/migrate-to-australia', t: 'Skilled migration' },
  { href: '/migrate-to-australia/pr-point-calculator', t: 'PR Points Calculator' },
  { href: '/occupation-finder', t: 'Occupation Finder' },
  { href: '/study-australia', t: 'Study in Australia' },
  { href: '/employer-sponsored/skilled-regional-494', t: 'Skilled Employer Sponsored Regional (494)' },
];

export default function PostcodeCheckerPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[{ label: 'Tools & Calculators' }, { label: 'Postcode Checker' }]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <PostcodeCheckerClient />

      {/* How to use */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Step by step" title="How to use the checker" />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Categories */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Categories"
            title="Regional area categories explained"
            lede="The Department of Home Affairs groups postcodes into three categories. What each means can differ by visa, so always check the rule for yours."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((c) => (
              <div key={c.n} className={`${card} ${cardPad} flex flex-col`}>
                <div className="flex items-center gap-4">
                  <IconTile icon={c.icon} />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Category {c.n}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-700 leading-relaxed">{c.places}</p>
                <p className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Why it matters" title="Why regional status matters" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY.map((w) => (
              <div key={w.t} className={`${card} ${cardPad}`}>
                <h3 className="text-lg font-bold text-slate-900">{w.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-slate-600 leading-relaxed">
            This tool is indicative. Policy settings and postcode definitions change. To claim regional study points you must meet the Australian study requirement while living and studying in a designated regional area. Meet our registered agents on the{' '}
            <Link href="/team" className={linkText}>team page</Link>.
          </p>
        </div>
      </section>

      {/* What to do next */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <SectionHeader eyebrow="Next steps" title="What to do next" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEXT.map((n) => (
              <Link key={n.href} href={n.href} className={`group ${card} ${cardHover} ${cardPad} flex flex-col`}>
                <ListChecks className="w-6 h-6 text-brand-800" aria-hidden="true" />
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
          <SectionHeader eyebrow="FAQs" title="Postcode checker questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="pb-16 lg:pb-24 bg-white">
        <div className={container}>
          <h2 className="text-lg font-bold text-slate-900">Related visas and tools</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {RELATED.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="inline-flex items-center min-h-12 px-5 rounded-full border border-slate-300 bg-white text-brand-900 font-semibold hover:border-brand-700 hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  {r.t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Enquiry form */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="Enquiry"
              title="Need help using regional points?"
              lede="Tell us a little about your situation and our registered migration agents will get back to you."
            />
            <div className={`${card} p-6 sm:p-8 mt-12`}>
              <UnifiedContactForm
                formSource="postcode-checker-tool"
                formVariant="compact"
                showPhone={true}
                showSubject={false}
                formTitle=""
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need help using regional points?"
        text="Our registered migration agents can check your postcode, qualifications and nomination options."
        disclaimer="This tool is indicative. Policy settings and postcode definitions change."
      />
    </div>
  );
}
