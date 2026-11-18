import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  GraduationCap,
  Briefcase,
  Heart,
  Plane,
  Building,
  Scale,
  Flag,
  Award,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calculator,
  Search,
  Star,
  Quote,
  PlayCircle,
  Phone,
  Mail,
  ExternalLink,
  Clock,
} from "lucide-react";
import HeroLeadForm from "@/components/home/HeroLeadForm";
import OfficeStatus from "@/components/home/OfficeStatus";
import HomeFaqAccordion from "@/components/home/HomeFaqAccordion";
import FindMyVisaQuiz from "@/components/home/FindMyVisaQuiz";
import {
  container,
  card,
  cardHover,
  btnPrimaryLight,
  btnGhostLight,
  focusRing,
  SectionHeader,
  IconTile,
  CtaBand,
} from "@/components/ui/brand";
import { fallbackSuccessStories } from "@/lib/data/fallbackSuccessStories";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PROFILE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Registered Migration Agents Melbourne | Bansal Immigration",
  description:
    "OMARA registered migration agents in Melbourne and Adelaide for skilled, student, partner and employer visas. Book a consultation today.",
  alternates: {
    canonical: "https://www.bansalimmigration.com.au",
  },
  keywords: [
    "registered migration agents Melbourne",
    "migration agent Melbourne",
    "immigration consultants Melbourne",
    "Australian visa assistance",
    "registered migration agents Adelaide",
    "OMARA registered migration agent",
    "skilled migration Melbourne",
    "student visa agent Melbourne",
    "partner visa agent Melbourne",
  ],
};

/* ---------------- content ---------------- */

const trustItems = [
  {
    title: "Registered migration agents",
    desc: "MARN 2418466, 2418571, 2418481, 2619683, 2619533 and 2619664. Check any agent on the OMARA register.",
    icon: ShieldCheck,
  },
  {
    title: "Melbourne and Adelaide",
    desc: "Meet us in person, or by phone or video, in English, Hindi or Punjabi.",
    icon: MapPin,
  },
  {
    title: "10+ years in Australian migration",
    desc: "Skilled, student, family, employer and review matters.",
    icon: Briefcase,
  },
];

const helpAreas = [
  { title: "Study in Australia", desc: "Courses, enrolment and your student visa.", href: "/study-australia", icon: GraduationCap },
  { title: "Skilled migration", desc: "Visas 189, 190 and 491, points and nomination.", href: "/migrate-to-australia", icon: Briefcase },
  { title: "Partner and family visas", desc: "Partner, parent and child visas.", href: "/family-visa", icon: Heart },
  { title: "Employer-sponsored visas", desc: "Skills in Demand 482, ENS 186 and regional visas.", href: "/employer-sponsored", icon: Building },
  { title: "Visitor visas", desc: "Tourist, business and family visits.", href: "/visitor-visa", icon: Plane },
  { title: "Skills assessments", desc: "Find your assessing authority.", href: "/occupation-finder", icon: Award },
  { title: "Citizenship", desc: "By conferral or by descent.", href: "/citizenship", icon: Flag },
  { title: "Refused or cancelled visa", desc: "Review rights, deadlines and next options.", href: "/appeals", icon: Scale },
];

const popularVisas = [
  { label: "Skilled Independent (189)", href: "/migrate-to-australia/skilled-independent-visa-subclass-189" },
  { label: "Skilled Nominated (190)", href: "/migrate-to-australia/skilled-nominated-visa-subclass-190" },
  { label: "Skilled Work Regional (491)", href: "/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491" },
  { label: "Skills in Demand (482)", href: "/employer-sponsored/sid-visa-482" },
  { label: "Employer Nomination (186)", href: "/employer-sponsored/ens-186-trt" },
  { label: "Partner visa (820)", href: "/family-visa/partner-provisional-visa-subclass-820" },
  { label: "Partner visa (309)", href: "/family-visa/partner-provisional-visa-subclass-309" },
  { label: "Student visa (500)", href: "/study-australia/student-visa-subclass-500" },
  { label: "Temporary Graduate (485)", href: "/migrate-to-australia/temporary-graduate-visa-subclass-485" },
  { label: "Visitor visa (600)", href: "/visitor-visa/visitor-visa-600" },
];

const processSteps = [
  {
    heading: "Tell us where you are",
    desc: "Book an appointment or request a call back. The fee for each appointment type is shown when you book.",
  },
  {
    heading: "Understand your options",
    desc: "We go through your situation, the visas that may fit, the evidence you would need and any risks.",
  },
  {
    heading: "Agree the work in writing",
    desc: "If you decide to engage us, a written service agreement sets out the scope, our fees and what we need from you.",
  },
];

const usefulTools = [
  { title: "PR Points Calculator", desc: "Estimate your points for visas 189, 190 and 491.", href: "/migrate-to-australia/pr-point-calculator", icon: Calculator },
  { title: "Occupation Finder", desc: "Search occupations, ANZSCO codes and assessing authorities.", href: "/occupation-finder", icon: Search },
  { title: "Regional Postcode Checker", desc: "See if a postcode is regional for extra points.", href: "/postcode-checker", icon: MapPin },
  { title: "Student Visa Financial Calculator", desc: "Estimate the funds needed for a Subclass 500 visa.", href: "/study-australia/student-visa-financial-calculator", icon: GraduationCap },
  { title: "Victorian Points Test", desc: "Check your fit for Victorian state nomination.", href: "/migrate-to-australia/victorian-points-test", icon: Award },
];

const expertTeam = [
  { name: "Arun Bansal", title: "Director and Registered Migration Agent", marn: "2418466", profileHref: "/team/arun-bansal", image: "/img/team/arun-bansal.avif" },
  { name: "Vipul Goyal", title: "Managing Director and Migration Consultant", marn: "2418571", profileHref: "/team/vipul-goyal", image: "/img/team/vipul-goyal.avif" },
  { name: "Mamta Puri", title: "Registered Migration Agent", marn: "2418481", profileHref: "/team/mamta-puri", image: "/img/team/mamta-puri.avif" },
  { name: "Shubam Kumar", title: "Registered Migration Agent", marn: "2619683", profileHref: "/team/shubam-kumar", image: "/img/team/shubam-kumar.svg" },
  { name: "Shaveena", title: "Registered Migration Agent", marn: "2619533", profileHref: "/team/shaveena", image: "/img/team/shaveena.svg" },
  { name: "Celesty Parmar", title: "Registered Migration Agent", marn: "2619664", profileHref: "/team/celesty-parmar", image: "/img/team/celesty-parmar.svg" },
];

const verifiedReviews = [
  {
    name: "Ranjita Samyal",
    initials: "RS",
    serviceCategory: "Skilled PR (Subclass 190)",
    location: "Melbourne, VIC",
    excerpt:
      "The Bansal Immigration team provided extraordinary support throughout our PR journey. Their proactive, transparent communication and attention to detail made our migration process seamless and stress-free.",
  },
  {
    name: "Vik Singh",
    initials: "VS",
    serviceCategory: "Student Visa (Subclass 500)",
    location: "Adelaide, SA",
    excerpt:
      "From start to finish, the team was professional, supportive, and clear with every requirement. They handled my student visa application with exceptional care and kept me informed at every stage.",
  },
  {
    name: "Shipra Sharma",
    initials: "SS",
    serviceCategory: "General Skilled Migration",
    location: "Melbourne, VIC",
    excerpt:
      "I have trusted Bansal Immigration for over six years. Their strategic advice and consistent guidance have proven invaluable in achieving my Australian permanent residency goals.",
  },
];

const videoStories = fallbackSuccessStories
  .filter((s) => s.has_youtube && s.youtube_url)
  .slice(0, 3)
  .map((s) => ({
    slug: s.slug,
    title: s.title,
    id: /embed\/([A-Za-z0-9_-]{11})/.exec(s.youtube_url || "")?.[1] ?? "",
  }))
  .filter((v) => v.id);

const offices = [
  {
    name: "Melbourne head office",
    address: "Level 8, 278 Collins Street, Melbourne VIC 3000",
    phone: "+61 3 9602 1330",
    tel: "+61396021330",
    email: "info@bansalimmigration.com.au",
    tz: "Australia/Melbourne",
    map: "Level 8/278 Collins St, Melbourne VIC 3000",
  },
  {
    name: "Adelaide office",
    address: "Unit 5, 55 Gawler Place, Adelaide SA 5000",
    phone: "+61 8 8317 1340",
    tel: "+61883171340",
    email: "adelaide@bansalimmigration.com.au",
    tz: "Australia/Adelaide",
    map: "Unit 5, 55 Gawler Pl, Adelaide SA 5000",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "ProfessionalService"],
  name: "Bansal Immigration",
  image: "https://www.bansalimmigration.com.au/img/logo/logo.webp",
  url: "https://www.bansalimmigration.com.au",
  telephone: "+61-3-9602-1330",
  email: "info@bansalimmigration.com.au",
  priceRange: "$$",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Level 8/278 Collins St",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      postalCode: "3000",
      addressCountry: "AU",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Unit 5, 55 Gawler Pl",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      postalCode: "5000",
      addressCountry: "AU",
    },
  ],
};

/* ---------------- page ---------------- */

function RatingLine({ className = "" }: { className?: string }) {
  const text = `Rated ${GOOGLE_RATING} out of 5 on Google${GOOGLE_REVIEW_COUNT ? ` from ${GOOGLE_REVIEW_COUNT} reviews` : ""}`;
  const inner = (
    <>
      <span className="flex text-gold-500" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </span>
      <span className="text-sm font-bold text-brand-950">{text}</span>
      {GOOGLE_PROFILE_URL && <ExternalLink className="w-3.5 h-3.5 text-brand-800" aria-hidden="true" />}
    </>
  );
  const base = `inline-flex items-center gap-2.5 rounded-xl bg-brand-50 border border-brand-200 px-4 py-2.5 ${className}`;
  return GOOGLE_PROFILE_URL ? (
    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={`${base} hover:bg-brand-100 ${focusRing}`}>
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <span className={base}>{inner}</span>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white text-slate-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* 1. HERO with call-back form */}
      <section id="top" className="bg-brand-50 text-slate-900 border-b border-slate-200 scroll-mt-20">
        <div className={`${container} pt-12 pb-24 lg:pt-16 lg:pb-32`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-brand-900">
                Registered Migration Agents in{" "}
                <span className="underline decoration-brand-600 decoration-4 underline-offset-[10px]">Melbourne</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
                Straight answers on skilled, student, partner and employer visas from registered migration agents in
                Melbourne and Adelaide. Tell us your situation and we will explain your options in plain English.
              </p>

              <div className="mt-8">
                <p className="text-sm font-bold text-slate-900">Your advisers</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-4">
                  {expertTeam.map((a) => (
                    <li key={a.name}>
                      <Link href={a.profileHref} className={`group flex items-center gap-3 rounded-lg ${focusRing}`}>
                        <span className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-100 border border-slate-200 shrink-0">
                          <Image src={a.image} alt="" fill sizes="48px" className="object-cover object-top" />
                        </span>
                        <span className="leading-tight">
                          <span className="block text-sm font-bold text-slate-900 group-hover:underline underline-offset-4 decoration-brand-600 decoration-2">
                            {a.name}
                          </span>
                          {a.marn && <span className="block text-xs text-slate-600">MARN {a.marn}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section aria-label="Why you can trust us" className="relative z-10 -mt-12">
        <div className={container}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_40px_-20px_rgba(26,26,43,0.35)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6">
                <IconTile icon={item.icon} />
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-4 p-6">
              <IconTile icon={Star} />
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  Rated {GOOGLE_RATING} out of 5 on Google
                </h2>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {GOOGLE_REVIEW_COUNT ? `From ${GOOGLE_REVIEW_COUNT} client reviews. ` : ""}
                  {GOOGLE_PROFILE_URL ? (
                    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-800 underline underline-offset-4 decoration-brand-600 decoration-2">
                      Read them on Google<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href="/testimonials" className="font-semibold text-brand-800 underline underline-offset-4 decoration-brand-600 decoration-2">
                      Read client reviews
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT DO YOU NEED HELP WITH */}
      <section id="pathways" className="pt-20 pb-16 lg:pt-28 lg:pb-24 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="What do you need help with?"
            lede="Choose the area closest to your situation and we will show you the options."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpAreas.map((p) => (
              <Link key={p.title} href={p.href} className={`group ${card} ${cardHover} p-6 flex flex-col ${focusRing}`}>
                <IconTile icon={p.icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{p.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                  See options
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-base font-bold text-slate-900">Most searched visas</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {popularVisas.map((v) => (
                <li key={v.href}>
                  <Link
                    href={v.href}
                    className={`inline-flex items-center min-h-10 px-4 rounded-full border border-slate-300 bg-white text-sm font-semibold text-brand-900 hover:border-brand-700 hover:bg-brand-50 transition-colors motion-reduce:transition-none ${focusRing}`}
                  >
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3b. FIND MY VISA QUIZ */}
      <section id="find-my-visa" className="py-16 lg:py-24 bg-brand-50 border-y border-brand-100 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Not sure which visa? Find your starting point"
            lede="Answer two or three quick questions and we will point you to the pages that may fit."
            align="center"
          />
          <div className="mt-10">
            <FindMyVisaQuiz />
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <SectionHeader title="How it works" lede="Three clear stages, so you always know what happens next." />
          <ol className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
            <div aria-hidden="true" className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-brand-200" />
            {processSteps.map((step, idx) => (
              <li key={step.heading} className="relative">
                <div className="relative z-10 w-12 h-12 rounded-full bg-brand-700 text-white font-extrabold text-lg flex items-center justify-center ring-8 ring-slate-50">
                  {idx + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.heading}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm">{step.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Not sure where to begin?</h3>
              <p className="mt-1 text-slate-600">Book a consultation and we will explain your options in plain English.</p>
            </div>
            <Link href="/book-an-appointment" className={`${btnPrimaryLight} shrink-0`}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS and VIDEO STORIES */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader title="What our clients say" />
            <RatingLine className="self-start" />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedReviews.map((rev) => (
              <figure key={rev.name} className={`${card} p-7 flex flex-col`}>
                <Quote className="w-9 h-9 text-brand-600" aria-hidden="true" />
                <blockquote className="mt-4 text-base text-slate-700 leading-relaxed flex-1">{rev.excerpt}</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {rev.initials}
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {rev.serviceCategory} · {rev.location}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {videoStories.length > 0 && (
            <div className="mt-14">
              <h3 className="text-xl font-bold text-slate-900">Watch client stories</h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {videoStories.map((v) => (
                  <li key={v.slug}>
                    <Link href={`/success-stories/${v.slug}`} className={`group block rounded-2xl ${focusRing}`}>
                      <span className="relative block aspect-video rounded-2xl overflow-hidden bg-brand-100 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <PlayCircle className="w-14 h-14 text-white drop-shadow" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="mt-3 block text-base font-semibold text-slate-900 leading-snug group-hover:underline underline-offset-4 decoration-brand-600 decoration-2">
                        {v.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/testimonials" className={btnPrimaryLight}>
              Read all reviews
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/success-stories" className={btnGhostLight}>
              See all client stories
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TOOLS */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <SectionHeader
            title="Free tools to check where you stand"
            lede="Get a quick answer before you book. Tools give an estimate only. A registered agent can confirm your result."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {usefulTools.map((tool) => (
              <Link key={tool.title} href={tool.href} className={`group ${card} ${cardHover} p-6 flex flex-col ${focusRing}`}>
                <IconTile icon={tool.icon} />
                <h3 className="mt-5 text-base font-bold text-slate-900 leading-snug">{tool.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{tool.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                  Open tool
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TEAM */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader
              title="Meet our migration team"
              lede="Our registered migration agents work under the Migration Agents Code of Conduct. Read each profile and check their registration yourself."
            />
            <Link href="/team" className={btnGhostLight}>
              Meet the whole team
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertTeam.map((agent) => (
              <Link key={agent.name} href={agent.profileHref} className={`group ${card} ${cardHover} overflow-hidden flex flex-col ${focusRing}`}>
                <div className="relative aspect-[4/5] bg-brand-50 overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={`${agent.name}, ${agent.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{agent.title}</p>
                  {agent.marn && (
                    <p className="mt-3 inline-flex self-start items-center gap-1.5 text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 rounded-full px-2.5 py-1">
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      MARN {agent.marn}
                    </p>
                  )}
                  <span className="mt-4 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                    View {agent.name.split(" ")[0]}’s profile
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OFFICES */}
      <section id="offices" className="py-16 lg:py-24 bg-brand-50 border-y border-brand-100 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Visit us in Melbourne or Adelaide"
            lede="Meet us in person, or by phone or video. Monday to Friday, 9:30 am to 6:00 pm. Closed Saturday and Sunday."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {offices.map((o) => (
              <div key={o.name} className={`${card} overflow-hidden flex flex-col`}>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-900">{o.name}</h3>
                    <OfficeStatus timeZone={o.tz} />
                  </div>
                  <p className="mt-3 text-base text-slate-700">{o.address}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-14 font-semibold text-slate-900 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />Phone</dt>
                      <dd>
                        <a href={`tel:${o.tel}`} className={`font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 rounded ${focusRing}`}>
                          {o.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-14 font-semibold text-slate-900 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" aria-hidden="true" />Email</dt>
                      <dd>
                        <a href={`mailto:${o.email}`} className={`font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 rounded break-all ${focusRing}`}>
                          {o.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(o.map)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}
                  >
                    Get directions<span className="sr-only"> to the {o.name} (opens in a new tab)</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
                <div className="h-56 bg-slate-100 mt-auto">
                  <iframe
                    title={`Map of the ${o.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(o.map)}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-slate-700">
            <Clock className="w-4 h-4 mt-0.5 text-brand-700 shrink-0" aria-hidden="true" />
            Please book before you visit so an adviser can confirm availability. In-person, phone and video appointments are available.
          </p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader title="Frequently asked questions" lede="Straight answers to the questions we hear most." />
              <p className="mt-6 text-sm text-slate-600">
                Still have a question?{" "}
                <Link href="/contact" className={`font-bold text-brand-800 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}>
                  Send us an enquiry
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-8">
              <HomeFaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <CtaBand />
    </div>
  );
}
