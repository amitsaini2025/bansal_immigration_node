import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, Calendar, ExternalLink, MessageSquare } from 'lucide-react';
import TestimonialsDirectory from '@/components/testimonials/TestimonialsDirectory';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  container,
  sectionY,
  card,
  btnPrimaryDark,
  btnGhostDark,
  btnPrimaryLight,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
  FaqList,
} from '@/components/ui/brand';

const TITLE = 'Bansal Immigration Reviews | Client Testimonials';
const DESCRIPTION =
  'Read Google reviews from clients of Bansal Immigration in Melbourne and Adelaide, grouped by visa type. Then book a consultation.';
const GOOGLE_REVIEW_LINK = 'https://g.page/r/bansal-immigration-reviews';
const GOOGLE_SEARCH_LINK = 'https://www.google.com/search?q=Bansal+Immigration+Consultants+reviews';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Bansal Immigration reviews',
    'migration agent reviews Melbourne',
    'client testimonials migration agent',
    'Google reviews migration agent Melbourne',
    'student visa agent reviews',
    'partner visa agent reviews',
  ],
  alternates: { canonical: 'https://bansalimmigration.com.au/testimonials' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/team/team-bansal-960.jpg'],
    type: 'website',
    url: 'https://bansalimmigration.com.au/testimonials',
  },
};

const FAQS = [
  {
    q: 'Are these reviews real?',
    a: 'They are from Google. You can read the full list on our Google Business profile and check them yourself.',
  },
  {
    q: 'Do you only show positive reviews?',
    a: 'The reviews on this page are a selection. The complete list, including every rating, is on Google.',
  },
  {
    q: 'Can I speak to a past client?',
    a: 'We cannot share client details without permission. You can read the reviews on Google and ask us any question at your consultation.',
  },
  {
    q: 'Does a good review mean my visa will be approved?',
    a: 'No. Each application is assessed on its own facts by the Department of Home Affairs.',
  },
  {
    q: 'How do I leave a review?',
    a: 'Use the Leave a review on Google button on this page.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200 bg-white">
        <Breadcrumbs items={[{ label: 'Testimonials' }]} className={container} />
      </div>

      <PageHero
        badge="Google reviews"
        title="What Our Clients Say About Bansal Immigration"
        intro="These are reviews from people we have worked with in Melbourne, Adelaide and overseas. Every review comes from Google. Read the ones closest to your visa type, then check the full list on Google yourself."
        actions={
          <>
            <Link href="/book-an-appointment" className={`${btnPrimaryDark} w-full sm:w-auto`}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
            <a
              href={GOOGLE_SEARCH_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGhostDark} w-full sm:w-auto`}
            >
              Read all reviews on Google
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </>
        }
        aside={
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-7 text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">Google rating</p>
            <p className="mt-3 text-5xl font-extrabold tracking-tight">
              4.9<span className="text-2xl font-bold text-slate-500"> out of 5</span>
            </p>
            <div
              className="mt-3 flex items-center justify-center lg:justify-start gap-1"
              role="img"
              aria-label="4.9 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Rating as shown on our Google Business profile. See Google for the current rating.
            </p>
          </div>
        }
      />

      {/* Reviews by visa type */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader
            title="Reviews grouped by visa type"
            lede="Choose a visa type to see reviews from clients in a similar situation."
          />
          <div className="mt-12">
            <TestimonialsDirectory />
          </div>
          <div className="mt-12">
            <Link href="/success-stories" className={`${btnPrimaryLight} w-full sm:w-auto`}>
              Read case studies
            </Link>
          </div>
        </div>
      </section>

      {/* How to read these reviews */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="A note on reviews" />
          <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-700">
            Every client&apos;s situation is different. A good review for one visa does not mean the same result for
            you. Visa decisions are made by the Department of Home Affairs, and we cannot promise any outcome.
          </p>
        </div>
      </section>

      {/* Leave a review */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <div className={`${card} p-6 sm:p-10 max-w-3xl`}>
            <IconTile icon={MessageSquare} />
            <div className="mt-6">
              <SectionHeader
                title="Are you a current or former client?"
                lede="Your honest feedback helps other people choose an adviser. If you worked with us, you can share your experience on Google."
              />
            </div>
            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimaryLight} mt-8 w-full sm:w-auto`}
            >
              Leave a review on Google
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              We do not pay for reviews and we do not ask clients to leave only positive ones.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="Questions about our reviews" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Start with a conversation"
        text="Book an appointment with a registered migration agent in Melbourne, Adelaide or by video."
      />
    </div>
  );
}
