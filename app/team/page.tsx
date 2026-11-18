import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Scale,
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  Building,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';
import TeamDirectory from '@/components/team/TeamDirectory';
import TeamFaqAccordion from '@/components/team/TeamFaqAccordion';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  container,
  sectionY,
  card,
  cardPad,
  cardHover,
  btnPrimaryDark,
  btnPrimaryLight,
  btnGhostDark,
  focusRing,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'Our Migration Agents in Melbourne | Bansal Immigration',
  description:
    'Meet the registered migration agents and consultants at Bansal Immigration in Melbourne and Adelaide. See each person’s focus, languages and MARN.',
  alternates: {
    canonical: 'https://bansalimmigration.com.au/team',
  },
  openGraph: {
    title: 'Our Migration Agents in Melbourne | Bansal Immigration',
    description:
      'Meet the registered migration agents and consultants at Bansal Immigration in Melbourne and Adelaide. See each person’s focus, languages and MARN.',
    images: ['/img/team/team-bansal-960.jpg'],
    type: 'website',
    url: 'https://bansalimmigration.com.au/team',
  },
};

const whoToAsk = [
  { situation: 'Skilled PR, points and state nomination', person: 'Arun Bansal', href: '/team/arun-bansal', icon: Briefcase },
  { situation: 'Visa refused, cancellation notice or tribunal review', person: 'Arun Bansal', href: '/team/arun-bansal', icon: Scale },
  { situation: 'Employer sponsorship or regional employer visa', person: 'Vipul Goyal', href: '/team/vipul-goyal', icon: Building },
  { situation: 'South Australia nomination or DAMA', person: 'Vipul Goyal', href: '/team/vipul-goyal', icon: MapPin },
  { situation: 'Partner, parent or family visa', person: 'Mamta Puri', href: '/team/mamta-puri', icon: Heart },
  { situation: 'Student visa, graduate visa or skills assessment', person: 'Celesty Parmar', href: '/team/celesty-parmar', icon: GraduationCap },
];

const credentials = [
  { title: 'Registered agents', desc: 'Registered with OMARA. MARN shown for every agent.' },
  { title: 'Migration law training', desc: 'Qualifications are listed on each profile. Check the MARN on the OMARA register.' },
  { title: 'Melbourne and Adelaide', desc: 'Meet in person, or by phone or video.' },
  { title: 'Code of Conduct', desc: 'Our agents are bound by the Migration Agents Code of Conduct.' },
];

const workingMethodology = [
  { step: '01', title: 'Enquiry', desc: 'Share your goals and your current visa.', icon: Users },
  { step: '02', title: 'Consultation', desc: 'Your adviser explains your options, evidence and risks.', icon: ShieldCheck },
  { step: '03', title: 'Written agreement', desc: 'Scope and fees are agreed in writing.', icon: Scale },
  { step: '04', title: 'Preparation and lodgement', desc: 'We prepare the application work agreed and respond to Department requests.', icon: CheckCircle2 },
  { step: '05', title: 'Updates', desc: 'We tell you about requests, deadlines and decisions as they happen.', icon: Clock },
];

// JSON-LD structured data for team
const teamStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Migration Agents in Melbourne | Bansal Immigration',
  url: 'https://bansalimmigration.com.au/team',
  mainEntity: {
    '@type': 'LegalService',
    name: 'Bansal Immigration Consultants',
    url: 'https://bansalimmigration.com.au',
    telephone: '+61-3-9602-1330',
    email: 'info@bansalimmigration.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 8/278 Collins St',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      postalCode: '3000',
      addressCountry: 'AU',
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Arun Bansal',
        jobTitle: 'Director and Registered Migration Agent',
        identifier: 'MARN: 2418466',
      },
      {
        '@type': 'Person',
        name: 'Vipul Goyal',
        jobTitle: 'Managing Director and Migration Consultant',
        identifier: 'MARN: 2418571',
      },
      {
        '@type': 'Person',
        name: 'Mamta Puri',
        jobTitle: 'Registered Migration Agent',
        identifier: 'MARN: 2418481',
      },
      {
        '@type': 'Person',
        name: 'Celesty Parmar',
        jobTitle: 'Registered Migration Agent',
        identifier: 'MARN: 2619664',
      },
      {
        '@type': 'Person',
        name: 'Shubam Kumar',
        jobTitle: 'Registered Migration Agent',
        identifier: 'MARN: 2619683',
      },
      {
        '@type': 'Person',
        name: 'Shaveena',
        jobTitle: 'Registered Migration Agent',
        identifier: 'MARN: 2619533',
      },
    ],
  },
};

export default function TeamPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-white">
        <Breadcrumbs items={[{ label: 'Our Team' }]} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamStructuredData) }}
      />

      <PageHero
        badge="Registered migration agents, Melbourne and Adelaide"
        badgeIcon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
        title="Meet Our Migration Team in Melbourne and Adelaide"
        intro="Our registered migration agents and consultants help individuals, families and employers with Australian visas. Read each profile, check their registration on the official register and book with the person who suits your situation."
        actions={
          <>
            <Link href="/book-an-appointment" className={btnPrimaryDark}>
              Book a Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/about" className={btnGhostDark}>
              See what we cover
            </Link>
          </>
        }
        below={
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentials.map((c) => (
              <li key={c.title} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                <p className="text-base font-bold text-brand-900">{c.title}</p>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </li>
            ))}
          </ul>
        }
      />

      <section id="directory" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <SectionHeader title="Our team" lede="Read each profile and check their registration on the official register." />
          <div className="mt-12">
            <TeamDirectory />
          </div>
        </div>
      </section>

      <section id="who-to-ask" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader title="Not sure who to book with?" lede="Match your situation to a person." />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoToAsk.map((item) => (
              <li key={item.situation} className="flex">
                <Link
                  href={item.href}
                  className={`group ${card} ${cardHover} p-5 w-full flex items-start gap-4 ${focusRing}`}
                >
                  <IconTile icon={item.icon} />
                  <span className="flex-1">
                    <span className="block text-base font-bold text-slate-900 leading-snug">{item.situation}</span>
                    <span className="mt-1 block text-sm text-slate-600">
                      Best first contact: <strong className="text-slate-900">{item.person}</strong>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate-600">
            Still unsure? Book a consultation and we will match you with the right person.
          </p>
        </div>
      </section>

      <section id="registered" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Consumer protection"
                title="Why it matters that your adviser is registered"
                lede="In Australia, giving immigration assistance without being a registered migration agent (or a lawyer) is an offence. Registered agents must follow the Migration Agents Code of Conduct, keep professional indemnity insurance, complete annual continuing professional development and handle client money through a client trust account."
              />
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                {[
                  'Migration Agents Code of Conduct',
                  'Professional indemnity insurance',
                  'Annual continuing professional development',
                  'Client trust account for client money',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`lg:col-span-5 ${card} ${cardPad} bg-brand-50 border-brand-100`}>
              <h3 className="text-xl font-bold text-slate-900">Check us yourself</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Search the OMARA register with the MARN shown on each profile.
              </p>
              <ul className="mt-5 space-y-2 text-sm font-bold text-slate-900">
                <li>Arun Bansal: MARN 2418466</li>
                <li>Vipul Goyal: MARN 2418571</li>
                <li>Mamta Puri: MARN 2418481</li>
                <li>Celesty Parmar: MARN 2619664</li>
                <li>Shubam Kumar: MARN 2619683</li>
                <li>Shaveena: MARN 2619533</li>
              </ul>
              <a
                href="https://portal.mara.gov.au/search-the-register-of-migration-agents/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimaryLight} mt-6 w-full`}
              >
                Search the OMARA register
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-work" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="How we work" title="How the team works with you" lede="Five steps from your first enquiry to your decision." />
          <ol className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-5">
            {workingMethodology.map((item) => (
              <li key={item.step} className={`${card} ${cardPad} flex flex-col`}>
                <div className="flex items-center justify-between">
                  <IconTile icon={item.icon} />
                  <span className="text-sm font-extrabold text-brand-700" aria-label={`Step ${item.step}`}>{item.step}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Frequently asked questions" lede="Straight answers about our team." />
          <div className="mt-12 max-w-3xl">
            <TeamFaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Book a consultation with a registered agent"
        text="Choose your agent or let us match you. Appointments are in person, by phone or by video."
        disclaimer="Information on this page is general. Visa decisions are made by the Department of Home Affairs."
      />
    </div>
  );
}
