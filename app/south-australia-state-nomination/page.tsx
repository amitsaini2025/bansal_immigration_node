import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Globe2,
  CheckCircle2,
  Phone,
  Calendar,
} from 'lucide-react';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  container,
  sectionY,
  card,
  cardPad,
  linkText,
  btnPrimaryDark,
  btnGhostDark,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
  FaqList,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'South Australia State Nomination (190 and 491)',
  description:
    'Guide to South Australian state nomination for the 190 and 491 visas: streams, requirements and steps. Advice from migration agents in Adelaide.',
  keywords: [
    'South Australia state nomination',
    'Migration SA nomination',
    'South Australia 190 visa',
    'South Australia 491 visa',
    'SA graduate nomination stream',
    'South Australia skilled employment stream',
    'Adelaide migration agent',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/south-australia-state-nomination',
  },
};

const KEY_FACTS = [
  { k: '190 visa', v: 'Permanent residence. State nomination adds 5 points.' },
  { k: '491 visa', v: 'Provisional, five years, regional. Nomination adds 15 points.' },
  { k: 'Where', v: 'South Australia is treated as regional for many purposes. Use the Postcode Checker to see how a specific postcode is classified.' },
  { k: 'Streams', v: 'Graduates, skilled employment, outer regional, offshore.' },
  { k: 'Who nominates', v: 'Migration SA. The Department of Home Affairs decides the visa.' },
];

const SUITS = [
  'You study or work in South Australia now.',
  'You have a positive skills assessment in an occupation South Australia nominates.',
  'You are willing to live and work in South Australia after nomination.',
  'You can lodge an EOI in SkillSelect.',
  'Your points are enough to be competitive.',
];

const SA_STREAMS = [
  {
    title: 'South Australian Graduates',
    icon: GraduationCap,
    desc: 'For international graduates of a South Australian higher education or VET provider.',
    requirements: [
      'Completed an eligible qualification in SA at a CRICOS-registered provider (minimum 46 CRICOS weeks).',
      'Lived in SA for at least one year during study.',
      'Working in the nominated or a closely related occupation in SA.',
      'Concessions may be available for high-performing graduates.',
    ],
    suitableFor: 'Students currently or recently studying in Adelaide or regional SA.',
  },
  {
    title: 'Skilled Employment in South Australia',
    icon: Briefcase,
    desc: 'For temporary visa holders (such as 482, 485 or 408) who live and work in SA.',
    requirements: [
      'At least six months of skilled work in SA (three months for regional SA).',
      'At least 30 hours a week (or 60 hours a fortnight).',
      'A valid skills assessment in an eligible occupation.',
      'Evidence of ongoing employment in SA.',
    ],
    suitableFor: 'Onshore visa holders with full-time professional experience in SA.',
  },
  {
    title: 'Outer Regional South Australia',
    icon: MapPin,
    desc: 'For skilled workers living and working outside Greater Adelaide.',
    requirements: [
      'Living and working in designated outer regional SA for at least six months.',
      'At least 30 hours a week in a skilled occupation at ANZSCO skill levels 1 to 4.',
      'Concessions on English, skills assessment or work duration may apply.',
      'The employer must have operated in regional SA for at least 12 months.',
    ],
    suitableFor: 'Workers in areas such as the Barossa, Limestone Coast, Eyre Peninsula and Riverland.',
  },
  {
    title: 'Offshore Skilled Stream',
    icon: Globe2,
    desc: 'For overseas applicants who register interest in moving to South Australia.',
    requirements: [
      'Substantial overseas experience in an occupation on the SA skilled list.',
      'Proficient or superior English.',
      'An Expression of Interest in SkillSelect that selects South Australia.',
      'An invitation from Migration SA.',
    ],
    suitableFor: 'Overseas candidates with several years of verified experience in priority sectors.',
  },
];

const PRIORITY_SECTORS = [
  'Healthcare and social services',
  'Defence, space and advanced manufacturing',
  'Digital technology and cyber security',
  'Construction, trades and infrastructure',
  'Agribusiness and renewable energy',
  'Education and early childhood',
];

const STEPS = [
  {
    t: 'Skills and English',
    d: 'Get a positive skills assessment from your assessing authority (such as ACS, VETASSESS, Engineers Australia or ANMAC) and sit an English test.',
  },
  { t: 'Lodge an EOI', d: 'Lodge an Expression of Interest in SkillSelect and select South Australia.' },
  {
    t: 'Apply to Migration SA',
    d: 'Submit a Registration of Interest or nomination application on the Migration SA portal with evidence.',
  },
  {
    t: 'Lodge your visa',
    d: 'If nominated, lodge your 190 or 491 visa application with the Department by the deadline stated in your nomination.',
  },
];

const COSTS = [
  { k: 'Migration SA fee', v: 'Check the Migration SA website for the current state nomination fee.' },
  { k: 'Skills assessment fee', v: 'Depends on the authority.' },
  { k: 'English test', v: 'Depends on the provider.' },
  { k: 'Visa application charge (190 and 491)', v: 'Check the Department of Home Affairs website for the current fee.' },
  { k: 'Nomination timing', v: 'Check Migration SA for current processing times and invitation rounds.' },
];

const MISTAKES = [
  'Choosing an occupation that SA is not nominating this year.',
  'Claiming work that does not meet the hours or time rules.',
  'Letting a skills assessment, English test or visa lapse.',
  'Assuming a nomination guarantees the visa.',
  'Leaving South Australia soon after nomination. You are expected to live and work in the state, so check your obligations.',
];

const FAQS = [
  {
    q: 'What is the difference between the 190 and 491 with SA?',
    a: 'The 190 is a permanent visa. The 491 is provisional for five years, with a pathway to permanent residence if conditions are met. Both need a nomination.',
  },
  {
    q: 'Do I need a job in South Australia?',
    a: 'Some streams need it and some do not. The Skilled Employment and Outer Regional streams need SA work. Offshore applicants do not.',
  },
  {
    q: 'Can I apply to SA and Victoria at once?',
    a: 'You can lodge an EOI for more than one state. Each state has its own rules, so check them before you apply.',
  },
  {
    q: 'How many points do I need?',
    a: (
      <>
        You need at least 65 federal points. Competitiveness varies. Try the{' '}
        <Link href="/migrate-to-australia/pr-point-calculator" className={linkText}>PR Points Calculator</Link>.
      </>
    ),
  },
  { q: 'Does nomination guarantee my visa?', a: 'No. The Department of Home Affairs decides.' },
  {
    q: 'How long does it take?',
    a: 'It varies by stream and the number of applicants. Check Migration SA for current processing times.',
  },
  {
    q: 'Is Adelaide regional?',
    a: (
      <>
        See our <Link href="/postcode-checker" className={linkText}>Postcode Checker</Link>.
      </>
    ),
  },
];

const RELATED = [
  { href: '/migrate-to-australia', t: 'Skilled migration' },
  { href: '/migrate-to-australia/skilled-nominated-visa-subclass-190', t: 'Skilled Nominated (190)' },
  { href: '/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491', t: 'Skilled Work Regional (491)' },
  { href: '/migrate-to-australia/pr-point-calculator', t: 'PR Points Calculator' },
  { href: '/migrate-to-australia/victoria-state-nomination', t: 'Victoria nomination' },
  { href: '/migrate-to-australia/nsw-state-nomination', t: 'New South Wales nomination' },
  { href: '/migrate-to-australia/queensland-state-nomination', t: 'Queensland nomination' },
  { href: '/migrate-to-australia/western-australia-state-nomination', t: 'Western Australia nomination' },
  { href: '/migrate-to-australia/tasmania-state-nomination', t: 'Tasmania nomination' },
  { href: '/migrate-to-australia/act-state-nomination', t: 'ACT nomination' },
  { href: '/migrate-to-australia/northern-territory-state-nomination', t: 'Northern Territory nomination' },
  { href: '/postcode-checker', t: 'Postcode Checker' },
  { href: '/occupation-finder', t: 'Occupation Finder' },
  { href: '/employer-sponsored/dama-south-australia', t: 'DAMA South Australia' },
  { href: '/team/vipul-goyal', t: 'Vipul Goyal, South Australian nominations' },
];

export default function SouthAustraliaStateNominationPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Migrate to Australia', href: '/migrate-to-australia' },
            { label: 'South Australia State Nomination' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <PageHero
        badge="Migration SA skilled migration program"
        title="South Australia State Nomination for the 190 and 491 Visas"
        intro="South Australia can nominate skilled people for the Skilled Nominated visa (subclass 190, permanent) and the Skilled Work Regional visa (subclass 491, provisional). This guide explains the four nomination streams, what each asks for and the steps from skills assessment to visa. Our Adelaide-based agents can check which stream fits you."
        actions={
          <>
            <Link href="/book-an-appointment" className={btnPrimaryDark}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
            <a href="tel:+61396021330" className={btnGhostDark}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call +61 3 9602 1330
            </a>
          </>
        }
      />

      {/* Key facts */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Key facts" title="190 and 491 visas in South Australia" />
          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {KEY_FACTS.map((f) => (
              <div key={f.k} className={`${card} ${cardPad}`}>
                <dt className="text-xs font-bold uppercase tracking-wider text-brand-700">{f.k}</dt>
                <dd className="mt-2 text-slate-700 leading-relaxed">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who this suits */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Who this suits"
                title="Is South Australia right for you?"
                lede="Not sure? Read the next section for each stream."
              />
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-700 font-semibold">You may suit South Australian nomination if:</p>
              <ul className="mt-4 space-y-3">
                {SUITS.map((s) => (
                  <li key={s} className={`${card} px-5 py-4 flex items-start gap-3`}>
                    <CheckCircle2 className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate-700 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Streams */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Nomination streams"
            title="South Australian nomination streams"
            lede="Requirements change often. Confirm the current details on the Migration SA website before you apply."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SA_STREAMS.map((stream) => (
              <div key={stream.title} className={`${card} ${cardPad} lg:p-8 flex flex-col`}>
                <IconTile icon={stream.icon} />
                <h3 className="mt-5 text-xl font-bold text-slate-900">{stream.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{stream.desc}</p>
                <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                  {stream.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6">
                  <span className="block bg-brand-50 border border-brand-100 rounded-xl px-4 py-3 text-slate-700 leading-relaxed">
                    <span className="font-bold text-brand-900">Best for: </span>
                    {stream.suitableFor}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority sectors (single navy band, CtaBand is the closing one) */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Priority sectors"
            title="Industries South Australia targets"
            lede="South Australia has focused on these sectors. A positive skills assessment in one of them may help your case. The list can change, so check Migration SA."
          />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIORITY_SECTORS.map((sector) => (
              <li key={sector} className={`${card} px-6 py-5 flex items-center gap-3 font-semibold text-slate-900`}>
                <CheckCircle2 className="w-5 h-5 text-brand-800 shrink-0" aria-hidden="true" />
                <span>{sector}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="Process" title="How nomination works" />
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

      {/* Costs and mistakes */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${card} ${cardPad} lg:p-8`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-900">Costs and timing</h2>
              <dl className="mt-6 divide-y divide-slate-100">
                {COSTS.map((c) => (
                  <div key={c.k} className="py-4 first:pt-0 last:pb-0">
                    <dt className="font-bold text-slate-900">{c.k}</dt>
                    <dd className="mt-1 text-slate-600 leading-relaxed">{c.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={`${card} ${cardPad} lg:p-8`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-900">Common mistakes to avoid</h2>
              <ul className="mt-6 space-y-3">
                {MISTAKES.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="South Australia nomination questions" />
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
              title="Check your South Australia nomination options"
              lede="Speak with our registered migration agents about your occupation, points and SA study or work history."
            />
            <div className={`${card} p-6 sm:p-8 mt-12`}>
              <UnifiedContactForm
                formSource="south-australia-state-nomination"
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
        title="Check your South Australia nomination options"
        text="Speak with our registered migration agents about your occupation, points and SA study or work history."
        disclaimer="This guide is general. Migration SA sets its own rules, which change. Visa decisions are made by the Department of Home Affairs."
      />
    </div>
  );
}
