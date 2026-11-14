import type { Metadata } from 'next';
import { getSuccessStories } from '@/lib/db';
import SuccessStoriesDirectory from '@/components/success-stories/SuccessStoriesDirectory';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Success Stories - Bansal Immigration',
  description: 'Read inspiring success stories from our clients who achieved their Australian visa dreams with Bansal Immigration.',
};

export default async function SuccessStoriesPage() {
  const allStories = await getSuccessStories();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Success Stories' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Success Stories
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Real stories, video interviews, and visa outcomes from clients who achieved their Australian migration goals with Bansal Immigration.
          </p>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-brand-100 border border-white/15">
            <span>{allStories.length} Documented Success Stories</span>
          </div>
        </div>
      </section>

      {/* Real-time Interactive Directory with Instant Dropdown Filter, Year Range, and Sort */}
      <SuccessStoriesDirectory initialStories={allStories} />
    </div>
  );
}
