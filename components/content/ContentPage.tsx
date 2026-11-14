import type React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Check,
  AlertTriangle,
  Phone,
  ListChecks,
  Info,
} from 'lucide-react';
import Breadcrumbs, { getCategoryLabel } from '@/components/common/Breadcrumbs';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';
import {
  container,
  card,
  cardHover,
  btnPrimaryDark,
  btnGhostDark,
  btnPrimaryLight,
  btnGhostLight,
  CtaBand,
  FaqList,
  PageHero,
  focusRing,
} from '@/components/ui/brand';
import RichText from '@/components/content/RichText';
import {
  getContent,
  plainText,
  type Block,
  type ContentPageData,
  type ContentSection,
} from '@/lib/content';

const SITE = 'https://bansalimmigration.com.au';

export function contentMetadata(path: string): Metadata | null {
  const c = getContent(path);
  if (!c) return null;
  const title = c.seo.title || `${c.hero.h1} | Bansal Immigration`;
  const description = c.seo.description || plainText(c.hero.intro[0] || '').slice(0, 155);
  return {
    title,
    description,
    keywords: [c.primaryKeyword, ...c.keywords].filter(Boolean),
    alternates: { canonical: `${SITE}${path}` },
    openGraph: { title, description, url: `${SITE}${path}`, type: 'website', images: ['/img/team/team-bansal-960.jpg'] },
  };
}

/* ---------------- blocks ---------------- */

const LEAD = /^\*\*([^*]+?)[.:]?\*\*[.:]?\s*(.*)$/;

function isLabelList(items: { x: string }[]) {
  return items.length >= 2 && items.every((i) => LEAD.test(i.x) && (LEAD.exec(i.x)?.[1].length ?? 99) < 60);
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-base sm:text-[17px] leading-[1.75] text-slate-700 max-w-3xl">{children}</p>;
}

function BulletList({ items, icon }: { items: { x: string; c?: string[] }[]; icon: 'check' | 'alert' | 'dot' }) {
  return (
    <ul className="space-y-3 max-w-3xl">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          {icon === 'check' && (
            <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-brand-900 text-white flex items-center justify-center">
              <Check className="w-3 h-3" aria-hidden="true" />
            </span>
          )}
          {icon === 'alert' && (
            <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-gold-100 text-brand-900 border border-gold-300 flex items-center justify-center">
              <AlertTriangle className="w-3 h-3" aria-hidden="true" />
            </span>
          )}
          {icon === 'dot' && <span className="mt-[11px] w-1.5 h-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />}
          <span className="text-base sm:text-[17px] leading-[1.7] text-slate-700">
            <RichText text={it.x} />
            {it.c && (
              <ul className="mt-2 space-y-1.5 pl-1">
                {it.c.map((c, j) => (
                  <li key={j} className="text-[15px] text-slate-600 flex gap-2">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                    <span><RichText text={c} /></span>
                  </li>
                ))}
              </ul>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function LabelCards({ items }: { items: { x: string }[]; linkCards?: boolean }) {
  return (
    <ul className={`grid grid-cols-1 ${items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 sm:gap-5`}>
      {items.map((it, i) => {
        const m = LEAD.exec(it.x)!;
        return (
          <li key={i} className={`${card} p-5 sm:p-6`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{m[1]}</h3>
            {m[2] && (
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                <RichText text={m[2]} />
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function LabelRows({ items }: { items: { x: string }[] }) {
  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200 max-w-4xl">
      {items.map((it, i) => {
        const m = LEAD.exec(it.x)!;
        return (
          <li key={i} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-1.5">
            <h3 className="md:col-span-4 flex items-start gap-3 text-base sm:text-lg font-bold text-slate-900 leading-snug">
              <span aria-hidden="true" className="mt-2 w-2 h-2 rounded-full bg-gold-400 shrink-0" />
              {m[1]}
            </h3>
            {m[2] && (
              <p className="md:col-span-8 text-base leading-relaxed text-slate-600 pl-5 md:pl-0">
                <RichText text={m[2]} />
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function WhyProcess({ b }: { b: Block }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
      <div>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{b.whyTitle}</h3>
        <ul className="mt-5 space-y-5">
          {b.why!.map((w) => (
            <li key={w.title} className="flex items-start gap-3">
              <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-brand-900 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-bold text-slate-900">{w.title}</span>
                <span className="block mt-1 text-base leading-relaxed text-slate-600">{w.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{b.stepsTitle}</h3>
        <ol className="mt-5 space-y-5">
          {b.steps!.map((st, i) => (
            <li key={st.title} className="flex items-start gap-3">
              <span className="w-8 h-8 shrink-0 rounded-full bg-gold-400 text-brand-950 font-extrabold text-sm flex items-center justify-center">{i + 1}</span>
              <span>
                <span className="block font-bold text-slate-900">{st.title}</span>
                <span className="block mt-1 text-base leading-relaxed text-slate-600">{st.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function LinkCards({ items }: { items: { x: string }[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {items.map((it, i) => {
        const link = /\[([^\]]+)\]\(([^)]+)\)/.exec(it.x);
        const rest = it.x.replace(/\[([^\]]+)\]\(([^)]+)\)/, '$1');
        const cleaned = plainText(rest);
        if (!link) {
          return (
            <li key={i} className={`${card} p-5 sm:p-6 text-[15px] text-slate-700 leading-relaxed`}>
              <RichText text={it.x} />
            </li>
          );
        }
        return (
          <li key={i} className="flex">
            <Link href={link[2]} className={`group ${card} ${cardHover} p-5 sm:p-6 flex flex-col w-full ${focusRing}`}>
              <span className="text-base font-bold text-slate-900 leading-snug">{link[1]}</span>
              {cleaned.length > link[1].length + 4 && (
                <span className="mt-2 text-[15px] leading-relaxed text-slate-600">
                  {cleaned.replace(link[1], '').replace(/^[\s.:,;\-–—]+|[\s]+$/g, '') || ''}
                </span>
              )}
              <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                Read more
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Steps({ items }: { items: { x: string; c?: string[] }[] }) {
  return (
    <ol className="max-w-3xl">
      {items.map((it, i) => {
        const m = LEAD.exec(it.x);
        return (
          <li key={i} className="relative pl-14 pb-8 last:pb-0">
            {i < items.length - 1 && (
              <span aria-hidden="true" className="absolute left-[19px] top-10 bottom-0 w-px bg-brand-200" />
            )}
            <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gold-400 text-brand-950 font-extrabold flex items-center justify-center ring-4 ring-white">
              {i + 1}
            </span>
            {m ? (
              <>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1.5">{m[1]}</h3>
                {m[2] && (
                  <p className="mt-1.5 text-base leading-relaxed text-slate-600">
                    <RichText text={m[2]} />
                  </p>
                )}
              </>
            ) : (
              <p className="pt-1.5 text-base sm:text-[17px] leading-relaxed text-slate-700">
                <RichText text={it.x} />
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_1px_2px_rgba(26,26,43,0.04)]">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Table. Scroll sideways on small screens.">
        <table className="w-full text-left text-[15px] border-collapse min-w-[520px]">
          <thead>
            <tr className="bg-brand-50 text-brand-900">
              {head.map((h, i) => (
                <th key={i} scope="col" className="px-4 sm:px-5 py-3.5 text-xs font-bold uppercase tracking-wider">
                  <RichText text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className="align-top">
                {r.map((c, j) => (
                  <td
                    key={j}
                    className={`px-4 sm:px-5 py-3.5 leading-relaxed ${j === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'}`}
                  >
                    <RichText text={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Blocks({ section }: { section: ContentSection }) {
  const kind = section.kind;
  const name = (section.name + ' ' + section.h2).toLowerCase();
  const listIcon: 'check' | 'alert' | 'dot' =
    kind === 'mistakes' ? 'alert' : /eligib|document|right for|checklist|requirement|bring|before you|who this|suits/.test(name) ? 'check' : 'dot';
  return (
    <div className="space-y-6">
      {section.blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <Prose key={i}><RichText text={b.x!} /></Prose>;
          case 'h3':
            return <h3 key={i} className="pt-2 text-lg sm:text-xl font-bold text-slate-900">{b.x}</h3>;
          case 'quote':
            return (
              <blockquote key={i} className="max-w-3xl rounded-xl border-l-4 border-gold-400 bg-brand-50 px-5 py-4 text-[16px] leading-relaxed text-slate-800">
                <RichText text={b.x!} />
              </blockquote>
            );
          case 'note':
            return (
              <p key={i} className="max-w-3xl flex gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                <span><RichText text={b.x!} /></span>
              </p>
            );
          case 'buttons':
            return (
              <div key={i} className="flex flex-col sm:flex-row flex-wrap gap-3">
                {b.items!.map((it, j) => (
                  <Link
                    key={j}
                    href={it.href!}
                    className={j === 0 ? btnPrimaryLight : btnGhostLight}
                  >
                    {it.label}
                    {j === 0 && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  </Link>
                ))}
              </div>
            );
          case 'whyprocess':
            return <WhyProcess key={i} b={b} />;
          case 'cards':
            return (
              <ul key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {b.cards!.map((cd, j) => (
                  <li key={j} className="flex">
                    <div className={`${card} p-5 sm:p-6 flex flex-col w-full`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{cd.title}</h3>
                      {cd.best && (
                        <p className="mt-2 inline-flex self-start rounded-full bg-gold-100 text-brand-900 text-xs font-bold px-2.5 py-1">
                          Best for: {cd.best.replace(/^best for:?\s*/i, '').replace(/\.$/, '')}
                        </p>
                      )}
                      {cd.desc && <p className="mt-3 text-[15px] leading-relaxed text-slate-600"><RichText text={cd.desc} /></p>}
                      {cd.href && (
                        <Link href={cd.href} className={`mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing} rounded`}>
                          {cd.cta || 'Read more'}
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            );
          case 'ul':
            if (kind === 'related') return <LinkCards key={i} items={b.items!} />;
            if (isLabelList(b.items!) && kind !== 'mistakes')
              return /right for you|who (this|it|the)|suits you|is this for|who should/.test(name) ? <LabelRows key={i} items={b.items!} /> : <LabelCards key={i} items={b.items!} />;
            return <BulletList key={i} items={b.items!} icon={listIcon} />;
          case 'ol':
            return <Steps key={i} items={b.items!} />;
          case 'table':
            return <DataTable key={i} head={b.head!} rows={b.rows!} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ---------------- page ---------------- */

function KeyFacts({ table }: { table: Block }) {
  return (
    <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-7 shadow-sm border border-slate-200">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
        <ListChecks className="w-4 h-4" aria-hidden="true" />
        Key facts
      </p>
      <dl className="mt-4 divide-y divide-slate-100">
        {table.rows!.map((r, i) => (
          <div key={i} className="py-3 grid grid-cols-5 gap-3 text-[15px]">
            <dt className="col-span-2 font-semibold text-slate-900">{plainText(r[0])}</dt>
            <dd className="col-span-3 text-slate-700 leading-snug"><RichText text={r.slice(1).join(' ')} /></dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ContentPage({ c }: { c: ContentPageData }) {
  const label = getCategoryLabel(c.category);
  const crumbs = c.isHub ? [{ label: c.name.replace(/:.*$/, '') }] : [{ label, href: `/${c.category}` }, { label: c.name.replace(/:.*$/, '') }];

  // key facts into hero aside
  const kfIdx = c.sections.findIndex((s) => s.kind === 'keyfacts' && s.blocks[0]?.t === 'table' && (s.blocks[0].head?.length ?? 0) >= 2);
  const kfSection = kfIdx >= 0 ? c.sections[kfIdx] : null;
  const kfNotes = kfSection ? kfSection.blocks.slice(1).filter((b) => b.t === 'p') : [];
  const body = c.sections.filter((s, i) => i !== kfIdx && s.kind !== 'form');
  const formSection = c.sections.find((s) => s.kind === 'form');

  const primary = c.hero.buttons.find((b) => b.href === '/book-an-appointment') || { label: 'Book a Consultation', href: '/book-an-appointment' };
  const secondary = c.hero.buttons.find((b) => b.href !== '/book-an-appointment' && !b.href.startsWith('tel:'));


  const faqLd = c.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faqs.map((f) => ({
          '@type': 'Question',
          name: plainText(f.q),
          acceptedAnswer: { '@type': 'Answer', text: plainText(f.a).replace(/\n- /g, ' ') },
        })),
      }
    : null;

  return (
    <div className="bg-white">
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <div className="border-b border-slate-200 bg-white">
        <Breadcrumbs items={crumbs} className={container} />
      </div>

      <PageHero
        badge={c.hero.badge || label}
        title={c.hero.h1}
        intro={
          <>
            {c.hero.intro.slice(0, 2).map((p, i) => (
              <span key={i} className={i ? 'block mt-3' : 'block'}>
                <RichText text={p} linkClass="font-semibold text-brand-800 underline underline-offset-4 decoration-gold-400 decoration-2 hover:text-brand-950" />
              </span>
            ))}
          </>
        }
        actions={
          <>
            <Link href={primary.href} className={btnPrimaryDark}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              {primary.label}
            </Link>
            {secondary ? (
              <Link href={secondary.href} className={btnGhostDark}>
                {secondary.label}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            ) : null}
            <a href="tel:+61396021330" className={btnGhostDark}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call +61 3 9602 1330
            </a>
          </>
        }
        aside={
          kfSection ? (
            <div>
              <KeyFacts table={kfSection.blocks[0]} />
              {kfNotes.map((n, i) => (
                <p key={i} className="mt-3 text-xs leading-relaxed text-slate-600">
                  <RichText text={n.x!} linkClass="underline text-brand-800" />
                </p>
              ))}
            </div>
          ) : undefined
        }
      />

      {/* Body */}
      <div className={`${container} py-14 lg:py-20`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-12 max-w-4xl mx-auto w-full">
            <div className="divide-y divide-slate-200">
              {body.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 py-10 first:pt-0 last:pb-0">
                  <h2
                    className={
                      s.blocks[0]?.t === 'whyprocess'
                        ? 'sr-only'
                        : 'text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 max-w-3xl'
                    }
                  >
                    {s.h2}
                  </h2>
                  <Blocks section={s} />
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      {c.faqs.length > 0 && (
        <section id="faqs" className="py-14 lg:py-20 scroll-mt-28">
          <div className={container}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">
                  Frequently asked questions
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Straight answers to what people ask us most. Still unsure?{' '}
                  <Link href="/contact" className="font-semibold text-brand-800 underline underline-offset-4 decoration-gold-400 decoration-2">Send us an enquiry</Link>.
                </p>
              </div>
              <div className="lg:col-span-8">
                <FaqList
                  items={c.faqs.map((f) => ({
                    q: plainText(f.q),
                    a: (
                      <div className="space-y-3">
                        {f.a.split('\n').reduce<React.ReactNode[]>((acc, line, i) => {
                          acc.push(
                            line.startsWith('- ') ? (
                              <p key={i} className="pl-4 relative before:absolute before:left-0 before:top-[11px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold-400"><RichText text={line.slice(2)} /></p>
                            ) : (
                              <p key={i}><RichText text={line} /></p>
                            )
                          );
                          return acc;
                        }, [])}
                      </div>
                    ),
                  }))}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enquiry form */}
      {c.form && (
        <section id="enquiry" className="py-14 lg:py-20 bg-brand-50 border-y border-brand-100 scroll-mt-28">
          <div className={container}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">
                  {formSection?.h2 || 'Talk to a registered migration agent'}
                </h2>
                <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
                  {formSection?.blocks.filter((b) => b.t === 'p').map((b, i) => (
                    <p key={i}><RichText text={b.x!} /></p>
                  ))}
                </div>
                <p className="mt-5 text-sm text-slate-600">
                  Prefer to talk? Call <a href="tel:+61396021330" className="font-bold text-brand-800 underline underline-offset-2">+61 3 9602 1330</a>.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className={`${card} p-6 sm:p-8`}>
                  <UnifiedContactForm
                    formSource={`content-${c.path.replace(/\//g, '-').replace(/^-/, '')}`}
                    formVariant="full"
                    showPhone
                    showSubject
                    formTitle=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBand title={c.cta.title} text={c.cta.text} />
    </div>
  );
}
