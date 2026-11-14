import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Languages, MapPin, ExternalLink, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';
import { card, cardPad, btnPrimaryLight, btnGhostLight, focusRing } from '@/components/ui/brand';

export interface AgentData {
  id: string;
  name: string;
  title: string;
  roleType: 'Director' | 'Consultant';
  marn: string;
  marnUrl: string;
  location: string;
  qualifications: string;
  experience: string;
  languages: string;
  shortBio: string;
  fullBio: string[];
  categories: string[];
  practiceAreas: { name: string; href: string }[];
  image: string;
}

const AGENTS: AgentData[] = [
  {
    id: 'arun-bansal',
    name: 'Arun Bansal',
    title: 'Director and Registered Migration Agent',
    roleType: 'Director',
    marn: '2418466',
    marnUrl: 'https://portal.mara.gov.au/search-the-register-of-migration-agents/',
    location: 'Melbourne head office',
    qualifications: 'Master of Laws (LLM), Graduate Certificate in Australian Migration Law, Bachelor of Laws (LLB)',
    experience: '',
    languages: 'English, Hindi, Punjabi',
    shortBio:
      'Arun helps with general skilled migration, employer nomination, review matters before the Administrative Review Tribunal, visa cancellations and citizenship.',
    fullBio: [
      'Arun Bansal is the Director of Bansal Immigration and a Registered Migration Agent (MARN 2418466). He holds a Master of Laws and a Graduate Certificate in Australian Migration Law.',
      'Clients most often see Arun about skilled migration (189, 190 and 491), the Employer Nomination Scheme (186), visa refusals and cancellation notices (NOICC), and Administrative Review Tribunal matters.',
    ],
    categories: ['skilled', 'employer', 'appeals', 'citizenship'],
    practiceAreas: [
      { name: 'Skilled migration (189, 190, 491)', href: '/migrate-to-australia' },
      { name: 'Employer Nomination Scheme (186)', href: '/employer-sponsored' },
      { name: 'Administrative Review Tribunal (ART)', href: '/appeals' },
      { name: 'NOICC and visa cancellations', href: '/appeals' },
      { name: 'Citizenship', href: '/citizenship' },
    ],
    image: '/img/team/arun-bansal.avif',
  },
  {
    id: 'vipul-goyal',
    name: 'Vipul Goyal',
    title: 'Managing Director and Migration Consultant',
    roleType: 'Director',
    marn: '2418571',
    marnUrl: 'https://portal.mara.gov.au/search-the-register-of-migration-agents/',
    location: 'Adelaide and Melbourne',
    qualifications: 'Graduate Certificate in Australian Migration Law, Bachelor of Business',
    experience: '',
    languages: 'English, Hindi',
    shortBio:
      'Vipul helps with employer-sponsored visas, regional visas, South Australian state nomination and DAMA labour agreements.',
    fullBio: [
      'Vipul Goyal is the Managing Director of Bansal Immigration and a Registered Migration Agent (MARN 2418571). He holds a Graduate Certificate in Australian Migration Law and a Bachelor of Business.',
      'Clients most often see Vipul about employer sponsorship (482, 186 and 494), regional visas, South Australian state nomination and Designated Area Migration Agreements (DAMA).',
    ],
    categories: ['skilled', 'employer', 'regional'],
    practiceAreas: [
      { name: 'Employer-sponsored visas (482, 186, 494)', href: '/employer-sponsored' },
      { name: 'Regional visas', href: '/migrate-to-australia' },
      { name: 'South Australia nomination', href: '/south-australia-state-nomination' },
      { name: 'DAMA labour agreements', href: '/employer-sponsored' },
    ],
    image: '/img/team/vipul-goyal.avif',
  },
  {
    id: 'mamta-puri',
    name: 'Mamta Puri',
    title: 'Registered Migration Agent',
    roleType: 'Consultant',
    marn: '2418481',
    marnUrl: 'https://portal.mara.gov.au/search-the-register-of-migration-agents/',
    location: 'Melbourne and Adelaide',
    qualifications: 'Graduate Certificate in Australian Migration Law, Master of Commerce',
    experience: '',
    languages: 'English, Hindi',
    shortBio:
      'Mamta helps with partner visas, the Prospective Marriage visa, and parent and child visas.',
    fullBio: [
      'Mamta Puri is a Registered Migration Agent (MARN 2418481). She holds a Graduate Certificate in Australian Migration Law and a Master of Commerce.',
      'Clients most often see Mamta about partner visas (820/801 and 309/100), the Prospective Marriage visa (300), and parent and child visas.',
    ],
    categories: ['partner', 'family'],
    practiceAreas: [
      { name: 'Partner visas (820/801, 309/100)', href: '/family-visa' },
      { name: 'Prospective Marriage visa (300)', href: '/family-visa' },
      { name: 'Parent and child visas', href: '/family-visa' },
    ],
    image: '/img/team/mamta-puri.avif',
  },
  {
    id: 'shubam-kumar',
    name: 'Shubam Kumar',
    title: 'Registered Migration Agent',
    roleType: 'Consultant',
    marn: '',
    marnUrl: '',
    location: 'Melbourne head office',
    qualifications: 'Registered migration agent',
    experience: '',
    languages: 'English, Hindi, Punjabi',
    shortBio: 'Shubam is a registered migration agent at Bansal Immigration.',
    fullBio: ['Shubam Kumar is a registered migration agent at Bansal Immigration.'],
    categories: [],
    practiceAreas: [{ name: 'Australian visa advice', href: '/book-an-appointment' }],
    image: '/img/team/shubam-kumar.svg',
  },
  {
    id: 'shaveena',
    name: 'Shaveena',
    title: 'Registered Migration Agent',
    roleType: 'Consultant',
    marn: '',
    marnUrl: '',
    location: 'Melbourne head office',
    qualifications: 'Registered migration agent',
    experience: '',
    languages: 'English, Hindi, Punjabi',
    shortBio: 'Shaveena is a registered migration agent at Bansal Immigration.',
    fullBio: ['Shaveena is a registered migration agent at Bansal Immigration.'],
    categories: [],
    practiceAreas: [{ name: 'Australian visa advice', href: '/book-an-appointment' }],
    image: '/img/team/shaveena.svg',
  },
  {
    id: 'vijay-patel',
    name: 'Vijay Patel',
    title: 'Registered Migration Agent',
    roleType: 'Consultant',
    marn: '',
    marnUrl: '',
    location: 'Melbourne head office',
    qualifications: 'Registered migration agent',
    experience: '',
    languages: 'English, Hindi, Gujarati',
    shortBio: 'Vijay is a registered migration agent at Bansal Immigration.',
    fullBio: ['Vijay Patel is a registered migration agent at Bansal Immigration.'],
    categories: [],
    practiceAreas: [{ name: 'Australian visa advice', href: '/book-an-appointment' }],
    image: '/img/team/vijay-patel.svg',
  },
  {
    id: 'celesty-parmar',
    name: 'Celesty Parmar',
    title: 'Registered Migration Agent',
    roleType: 'Consultant',
    marn: '',
    marnUrl: '',
    location: 'Melbourne head office',
    qualifications: 'Australian migration law and education specialist',
    experience: '',
    languages: 'English, Hindi, Gujarati',
    shortBio:
      'Celesty helps with student visas, Temporary Graduate visas, skills assessment guidance and skilled migration.',
    fullBio: [
      'Celesty Parmar is a registered migration agent at Bansal Immigration, specialising in Australian migration law and education.',
      'Clients most often see Celesty about student visas (500), Temporary Graduate visas (485), skills assessment guidance and skilled migration.',
    ],
    categories: ['student', 'graduate', 'skilled'],
    practiceAreas: [
      { name: 'Student visas (500)', href: '/study-australia' },
      { name: 'Temporary Graduate visas (485)', href: '/study-australia' },
      { name: 'Skills assessment guidance', href: '/occupation-finder' },
      { name: 'Skilled migration', href: '/migrate-to-australia' },
    ],
    image: '/img/team/celesty-parmar.svg',
  },
];

export default function TeamDirectory() {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {AGENTS.map((agent) => (
        <li key={agent.id} className="flex">
          <article className={`${card} w-full overflow-hidden flex flex-col sm:flex-row`}>
            <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:w-48 sm:shrink-0 bg-slate-100">
              <Image
                src={agent.image}
                alt={`${agent.name}, ${agent.title}`}
                fill
                sizes="(max-width: 640px) 100vw, 192px"
                className="object-cover object-top"
              />
            </div>
            <div className={`${cardPad} flex flex-col flex-1`}>
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight">{agent.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-800">{agent.title}</p>
              {agent.marn && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-brand-700" aria-hidden="true" />
                  MARN {agent.marn}
                </p>
              )}

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" aria-hidden="true" />
                  <span>{agent.qualifications}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Languages className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" aria-hidden="true" />
                  <span>{agent.languages}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" aria-hidden="true" />
                  <span>{agent.location}</span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">{agent.shortBio}</p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${agent.name} focus areas`}>
                {agent.practiceAreas.map((area) => (
                  <li key={area.name}>
                    <Link
                      href={area.href}
                      className={`inline-flex items-center min-h-8 px-3 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-brand-900 transition-colors ${focusRing}`}
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 flex flex-col gap-3">
                <Link href="/book-an-appointment" className={btnPrimaryLight}>
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book with {agent.name.split(' ')[0]}
                </Link>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/team/${agent.id}`} className={`${btnGhostLight} sm:flex-1`}>
                    View profile
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  {agent.marn && (
                    <a
                      href={agent.marnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnGhostLight} sm:flex-1`}
                    >
                      OMARA register
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
