import Breadcrumbs from '@/components/common/Breadcrumbs';
import { container, PageHero } from '@/components/ui/brand';

/**
 * Shared layout for legal pages (privacy, terms, disclaimer, cookies).
 * Wording stays in each page; this only supplies the site theme.
 */
export default function LegalDocument({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-slate-700">
      <div className="border-b border-slate-200 bg-white">
        <Breadcrumbs items={[{ label: title }]} className={container} />
      </div>

      <PageHero title={title} intro={updated} />

      <section className="py-12 lg:py-16 bg-white">
        <div className={container}>
          <div
            className="max-w-3xl text-base sm:text-lg leading-relaxed space-y-5
              [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-brand-950 [&_h2]:scroll-mt-24
              [&_h2:first-child]:mt-0
              [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:marker:text-gold-500
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2
              [&_strong]:text-slate-900
              [&_a]:font-bold [&_a]:text-brand-800 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-gold-400 [&_a]:decoration-2 hover:[&_a]:text-brand-950"
          >
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
