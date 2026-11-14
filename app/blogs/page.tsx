import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Search,
  Star,
  Newspaper,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Calendar,
  Clock,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { getPaginatedBlogs, BlogRecord } from '@/lib/db';
import Breadcrumbs from '@/components/common/Breadcrumbs';

/** Editors publish posts in the database, so this list is read on each request. */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Australian Immigration News & Guides | Bansal Immigration',
  description:
    'Authoritative news, policy updates, and practical application guides on Australian skilled migration, student visas, partner visas, and citizenship reviewed by registered migration agents.',
  keywords: [
    'Australian immigration news',
    'migration blog Australia',
    'skilled migration updates 2025 2026',
    'student visa genuine student requirement news',
    'partner visa processing updates',
    'registered migration agents Melbourne',
  ],
  alternates: {
    canonical: 'https://bansalimmigration.com.au/blogs',
  },
  openGraph: {
    title: 'Australian Immigration News & Guides | Bansal Immigration',
    description:
      'Authoritative news, policy updates, and practical application guides on Australian skilled migration, student visas, partner visas, and citizenship reviewed by registered migration agents.',
    images: ['/img/team/team-bansal-960.jpg'],
    type: 'website',
    url: 'https://bansalimmigration.com.au/blogs',
  },
};

function resolveBlogImage(imgName?: string | null) {
  if (!imgName) return null;
  if (imgName.startsWith('http://') || imgName.startsWith('https://') || imgName.startsWith('/')) {
    return imgName;
  }
  return `/img/blog/${imgName}`;
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return 'Recent';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { month: 'short', day: '2-digit', year: 'numeric' });
}

const CATEGORIES = [
  { label: 'All Articles', query: '' },
  { label: 'Skilled Migration', query: 'skilled' },
  { label: 'Student Visas', query: 'student' },
  { label: 'Partner & Family', query: 'partner' },
  { label: 'State Nomination', query: 'points' },
  { label: 'Regulatory Updates', query: 'requirements' },
];

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; page?: string; featured?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || '';
  const category = params.category || '';
  const currentPage = Math.max(1, Number(params.page) || 1);
  const isFeatured = params.featured === '1';

  // 12 articles per page
  const limit = 12;

  const { blogs, total, totalPages } = await getPaginatedBlogs({
    page: currentPage,
    limit,
    search,
    category,
    featuredOnly: isFeatured,
  });

  // Helper to build URL with searchParams
  const buildPageUrl = (pageNumber: number) => {
    const q = new URLSearchParams();
    if (pageNumber > 1) q.set('page', String(pageNumber));
    if (search) q.set('search', search);
    if (category) q.set('category', category);
    if (isFeatured) q.set('featured', '1');
    const queryString = q.toString();
    return `/blogs${queryString ? `?${queryString}` : ''}`;
  };

  const startRecord = total > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endRecord = Math.min(currentPage * limit, total);

  // Generate pagination page numbers
  const pageNumbers: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  for (let p = startPage; p <= endPage; p++) {
    pageNumbers.push(p);
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800">
      {/* Breadcrumb Trail */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-xs">
        <Breadcrumbs items={[{ label: 'Blogs & Articles' }]} className="max-w-7xl mx-auto" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 py-12 md:py-16 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-brand-50 text-brand-900 border border-brand-200/80 mb-4 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
            <span>Verified Immigration Insights • OMARA Reviewed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            Australian Immigration News &amp; Guides
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-6">
            Timely policy updates, regulatory analysis, and step-by-step visa strategies authored and reviewed by OMARA registered migration agents.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reviewed by Registered Migration Agents</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-brand-700" />
              <span>Updated for 2025/2026 Regulations</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              <span>{total} Total Published Articles</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start w-full lg:w-auto">
              {CATEGORIES.map((cat, idx) => {
                const isActive = (category || search).toLowerCase() === cat.query.toLowerCase();
                const targetUrl = cat.query ? `/blogs?category=${encodeURIComponent(cat.query)}` : '/blogs';
                return (
                  <Link
                    key={idx}
                    href={targetUrl}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-800 text-white shadow-xs scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Search Input Box */}
            <form method="GET" action="/blogs" className="w-full sm:w-auto flex items-center gap-2">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Search 58+ articles..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent bg-white shadow-2xs transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="bg-brand-800 hover:bg-brand-900 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition shrink-0 cursor-pointer"
              >
                Search
              </button>
              {(search || category || isFeatured) && (
                <Link
                  href="/blogs"
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition shrink-0"
                >
                  Clear
                </Link>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 3. MAIN ARTICLES SECTION */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Status Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/80">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {search
                  ? `Search results for "${search}"`
                  : category
                  ? `Articles in ${CATEGORIES.find((c) => c.query === category)?.label || category}`
                  : 'All Migration Articles & Insights'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {startRecord}–{endRecord} of {total} articles
              </p>
            </div>

            {totalPages > 1 && (
              <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs self-start sm:self-auto">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {blogs.length > 0 ? (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                {blogs.map((blog: BlogRecord) => {
                  const img = resolveBlogImage(blog.image);
                  const displayAuthor =
                    !blog.author || blog.author.toLowerCase() === 'admin'
                      ? 'Arun Bansal (MARN 2418466)'
                      : blog.author;

                  return (
                    <article
                      key={blog.id}
                      className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-brand-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {img ? (
                            <img
                              src={img}
                              alt={blog.image_alt || blog.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand-950 via-brand-950 to-slate-900 flex items-center justify-center">
                              <Newspaper className="text-brand-300/40 w-12 h-12" />
                            </div>
                          )}

                          {Boolean(blog.featured) && (
                            <div className="absolute top-3 right-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">
                                <Star className="w-3 h-3 fill-white text-white" />
                                <span>Featured</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-2.5 border-b border-slate-100">
                            <span className="flex items-center gap-1 font-medium text-slate-500">
                              <Calendar className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                              <span>{formatDate(blog.published_at || blog.created_at)}</span>
                            </span>
                            <span className="text-brand-800 font-semibold truncate max-w-[140px]">
                              {displayAuthor}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors leading-snug line-clamp-2 mb-2.5">
                            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {blog.short_description ||
                              'Read the latest regulatory changes and practical application strategies from our registered migration team.'}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Link */}
                      <div className="px-5 sm:px-6 pb-5 pt-0">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-100 text-xs font-bold text-brand-800 group-hover:text-brand-900 transition-colors"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* 4. NUMBERED PAGE NAVIGATION / PAGINATION */}
              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200"
                >
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    Showing <strong className="text-slate-900">{startRecord}</strong> to{' '}
                    <strong className="text-slate-900">{endRecord}</strong> of{' '}
                    <strong className="text-slate-900">{total}</strong> articles
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {/* Previous Button */}
                    <Link
                      href={buildPageUrl(currentPage - 1)}
                      aria-disabled={currentPage <= 1}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                        currentPage <= 1
                          ? 'pointer-events-none opacity-40 bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Link>

                    {/* First Page Link if skipped */}
                    {startPage > 1 && (
                      <>
                        <Link
                          href={buildPageUrl(1)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        >
                          1
                        </Link>
                        {startPage > 2 && <span className="px-1 text-slate-400">…</span>}
                      </>
                    )}

                    {/* Numeric Page Buttons */}
                    {pageNumbers.map((p) => {
                      const isCurrent = p === currentPage;
                      return (
                        <Link
                          key={p}
                          href={buildPageUrl(p)}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                            isCurrent
                              ? 'bg-brand-800 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          {p}
                        </Link>
                      );
                    })}

                    {/* Last Page Link if skipped */}
                    {endPage < totalPages && (
                      <>
                        {endPage < totalPages - 1 && <span className="px-1 text-slate-400">…</span>}
                        <Link
                          href={buildPageUrl(totalPages)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        >
                          {totalPages}
                        </Link>
                      </>
                    )}

                    {/* Next Button */}
                    <Link
                      href={buildPageUrl(currentPage + 1)}
                      aria-disabled={currentPage >= totalPages}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                        currentPage >= totalPages
                          ? 'pointer-events-none opacity-40 bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto shadow-sm">
              <div className="w-16 h-16 bg-brand-50 text-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Matching Articles Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                No guides matched your query &ldquo;{search || category}&rdquo;. Try another topic or clear filters.
              </p>
              <Link
                href="/blogs"
                className="inline-block px-5 py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                View All Articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. CONSULTATION CALL TO ACTION BANNER */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-950 via-brand-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/15 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tailored Visa Assessment</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Need Individual Migration Advice?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Articles provide general education. Book an appointment with an OMARA registered migration agent to review your unique circumstances and pathway options.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="/book-an-appointment"
                className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md text-xs sm:text-sm text-center transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm text-center transition flex items-center justify-center gap-2"
              >
                <span>Ask a Question</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEGAL & EDITORIAL ASSURANCE BANNER */}
      <section className="py-10 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Regulatory &amp; Editorial Standard:</strong> All articles published by Bansal Immigration are reviewed by Registered Migration Agents (OMARA) to ensure alignment with the <em>Migration Act 1958</em> and current Department of Home Affairs directives. Content is educational and does not constitute formal legal counsel. For individual advice, schedule an appointment.
          </p>
        </div>
      </section>
    </div>
  );
}