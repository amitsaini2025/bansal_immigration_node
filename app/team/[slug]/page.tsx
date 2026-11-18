import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Check, ExternalLink, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  container,
  sectionY,
  card,
  cardHover,
  btnPrimaryDark,
  btnPrimaryLight,
  btnGhostDark,
  btnGhostLight,
  linkText,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
  FaqList,
  ArrowLabel,
  focusRing,
} from '@/components/ui/brand';
import { PROFILES, PROFILE_SLUGS, omaraUrl } from './profiles';

const SITE = 'https://www.bansalimmigration.com.au';

export function generateStaticParams() {
  return PROFILE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROFILES[slug];
  if (!p) return { title: 'Team member not found | Bansal Immigration' };
  const url = `${SITE}/team/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: { title: p.seoTitle, description: p.seoDescription, url, type: 'profile' },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = Object.prototype.hasOwnProperty.call(PROFILES, slug) ? PROFILES[slug] : undefined;
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    jobTitle: p.role,
    url: `${SITE}/team/${p.slug}`,
    image: `${SITE}${p.image}`,
    worksFor: { '@type': 'Organization', name: 'Bansal Immigration Consultants', url: SITE },
  };

  return (
    <div className="bg-white text-slate-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-slate-200 bg-white">
        <Breadcrumbs
          items={[{ label: 'Our Team', href: '/team' }, { label: p.name }]}
          className={container}
        />
      </div>

      {/* 1. Hero and key facts */}
      <PageHero
        badge={p.marn ? `MARN ${p.marn}` : 'Bansal Immigration team'}
        title={p.h1}
        intro={p.line}
        actions={
          <>
            <Link href="/book-an-appointment" className={`${btnPrimaryDark} w-full sm:w-auto`}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book with {p.first}
            </Link>
            <Link href="/contact" className={`${btnGhostDark} w-full sm:w-auto`}>
              <Mail className="w-4 h-4" aria-hidden="true" />
              Send an enquiry
            </Link>
            {p.marn && (
              <a
                href={omaraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnGhostDark} w-full sm:w-auto`}
              >
                Verify on the OMARA register
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </>
        }
        aside={
          <div className="relative mx-auto w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-brand-100 border border-slate-200 shadow-xl">
            <Image
              src={p.image}
              alt={`Portrait of ${p.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover object-top"
            />
          </div>
        }
      />

      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="Key facts" as="h2" />
          <dl className={`${card} mt-12 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6`}>
            {p.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">{f.label}</dt>
                <dd className="mt-1.5 text-base font-semibold text-slate-900 leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. Who helps */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title={`Who ${p.first} can help`} />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {p.helps.map((h) => (
              <li key={h} className={`${card} p-6 sm:p-7 flex gap-4`}>
                <IconTile icon={Check} />
                <p className="text-base leading-relaxed text-slate-700">{h}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Experience and focus */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="Experience and focus" />
          <div className="mt-12 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-slate-700">
            {p.experience.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {p.howWorks && (
        <section className={`${sectionY} bg-slate-50`}>
          <div className={container}>
            <SectionHeader title={`How ${p.first} works with clients`} />
            <div className="mt-12 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-slate-700">
              {p.howWorks.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Qualifications and registration */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title="Qualifications and registration" />
          <div className={`${card} mt-12 max-w-3xl p-6 sm:p-8`}>
            {p.qualifications.length > 0 && (
              <ul className="space-y-3">
                {p.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-3 text-base text-slate-800">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-brand-800" aria-hidden="true" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            )}
            <p
              className={`text-base leading-relaxed text-slate-700 ${
                p.qualifications.length > 0 ? 'mt-5 pt-5 border-t border-slate-200' : ''
              }`}
            >
              {p.registrationNote}
              {p.registrationLinks && (
                <>
                  {' '}
                  {p.registrationLinks.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 && ' | '}
                      <a
                        href={l.href}
                        target={l.href.startsWith('http') || l.href.endsWith('.pdf') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className={linkText}
                      >
                        {l.label}
                      </a>
                    </span>
                  ))}
                </>
              )}
              {!p.marn && (
                <>
                  {' '}
                  <Link href="/team" className={linkText}>
                    See the team page
                  </Link>
                  .
                </>
              )}
            </p>
            {p.marn && (
              <a
                href={omaraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnGhostLight} mt-6 w-full sm:w-auto`}
              >
                Verify on the OMARA register
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {(p.clientsSay || p.whyChoose) && (
        <section className={`${sectionY} bg-white`}>
          <div className={container}>
            {p.clientsSay && (
              <>
                <SectionHeader title="What clients say" />
                <p className="mt-8 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-700">{p.clientsSay}</p>
              </>
            )}
            {p.whyChoose && (
              <div className={p.clientsSay ? 'mt-16' : ''}>
                <SectionHeader title={`Why clients choose ${p.first}`} />
                <ul className="mt-10 max-w-3xl space-y-3">
                  {p.whyChoose.map((w) => (
                    <li key={w} className="flex items-start gap-3 text-base sm:text-lg text-slate-800">
                      <Check className="w-5 h-5 mt-1 shrink-0 text-brand-800" aria-hidden="true" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Areas of practice */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="Areas of practice" />
          <ul className="mt-12 max-w-3xl space-y-3">
            {p.areas.map((a) => (
              <li key={a.name}>
                <Link
                  href={a.href}
                  className={`group ${card} ${cardHover} ${focusRing} flex items-center justify-between gap-4 min-h-14 px-5 sm:px-6 py-4`}
                >
                  <span className="font-semibold text-slate-900 text-base">{a.name}</span>
                  <ArrowLabel>View</ArrowLabel>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. How to book */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <div className={`${card} p-6 sm:p-10 max-w-3xl`}>
            <SectionHeader title={`Book an appointment with ${p.first}`} lede={p.bookText} />
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/book-an-appointment" className={`${btnPrimaryLight} w-full sm:w-auto`}>
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book with {p.first}
              </Link>
              <a href="tel:+61396021330" className={`${btnGhostLight} w-full sm:w-auto`}>
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call +61 3 9602 1330
              </a>
            </div>
            {p.bookLinks && (
              <p className="mt-6 text-sm text-slate-600 space-x-4">
                {p.bookLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={linkText}>
                    {l.label}
                  </Link>
                ))}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title={`Questions about working with ${p.first}`} />
          <div className="mt-12 max-w-3xl">
            <FaqList
              items={p.faqs.map((f) => ({
                q: f.q,
                a: f.link ? (
                  <>
                    {f.a}{' '}
                    <Link href={f.link.href} className={linkText}>
                      {f.link.label}
                    </Link>
                    .
                  </>
                ) : (
                  f.a
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title={`Talk to ${p.first} about your visa`}
        text="Tell us where you are now and where you want to be. We will explain your options in plain English."
      />
    </div>
  );
}
