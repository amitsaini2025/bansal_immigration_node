import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  ChevronRight,
  User,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Briefcase,
  Play,
  Mail,
  Calculator,
  Search,
} from 'lucide-react';
import { getSuccessStory, getSuccessStories } from '@/lib/db';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getSuccessStory(slug);
  if (!story) return { title: 'Success Story | Bansal Immigration' };

  const url = `https://www.bansalimmigration.com.au/success-stories/${slug}`;
  return {
    title: `${story.title} - Success Story | Bansal Immigration`,
    description: story.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: `${story.title} - Success Story | Bansal Immigration`,
      description: story.excerpt || undefined,
      url,
      type: 'article',
    },
  };
}

export default async function SuccessStoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getSuccessStory(slug);
  if (!story) notFound();

  const allStories = await getSuccessStories();
  const relatedStories = allStories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80">
        <Breadcrumbs
          items={[
            { label: 'Success Stories', href: '/success-stories' },
            { label: story.title },
          ]}
          className="container mx-auto px-4 max-w-6xl"
        />
      </div>

      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-700/90 text-white shadow-2xs">
                {story.visa_type || 'Visa Outcome'}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {story.outcome || 'Visa Granted'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {story.date || '2025'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
              {story.title}
            </h1>

            {/* Client byline */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Client: <strong className="text-white font-semibold">{story.client_name}</strong></span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-xs text-brand-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Handled by Bansal Immigration Registered Migration Agents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (8 cols): Media, Highlights, Story Content, Callout */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Media: YouTube Video or Image */}
              {story.youtube_url ? (
                <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <div className="relative aspect-video">
                    <iframe
                      src={story.youtube_url}
                      title={story.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3 bg-slate-900 text-slate-300 text-xs flex items-center gap-2">
                    <Play className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
                    <span>Official client video review &amp; interview with Bansal Immigration</span>
                  </div>
                </div>
              ) : story.image ? (
                <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              {/* Case Highlights Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Client</p>
                  <p className="text-sm font-bold text-slate-900">{story.client_name}</p>
                </div>
                <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-4">
                  <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Pathway</p>
                  <p className="text-sm font-bold text-brand-800">{story.visa_type || 'Australian Visa'}</p>
                </div>
                <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-4">
                  <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Status</p>
                  <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 inline shrink-0" />
                    {story.outcome || 'Visa Granted'}
                  </p>
                </div>
              </div>

              {/* Story Content Body */}
              <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
                <h2 className="text-2xl font-bold text-brand-900 tracking-tight pb-3 border-b border-slate-100">
                  Case Details &amp; Journey
                </h2>
                
                {story.excerpt && (
                  <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed italic bg-brand-50/50 p-4 rounded-xl border border-brand-100">
                    &ldquo;{story.excerpt}&rdquo;
                  </p>
                )}

                <div
                  className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
              </div>

              {/* Facing a similar case callout banner */}
              <div className="bg-gradient-to-br from-brand-950 to-brand-950 p-8 rounded-2xl text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-200 bg-white/10">
                    <span>Personalised Immigration Assistance</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Facing a similar visa matter or complex requirements?
                  </h3>
                  <p className="text-sm text-brand-100 leading-relaxed">
                    Australian immigration regulations demand strict evidence and thorough preparation. Speak with our registered migration agents to explore your tailored visa roadmap.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/book-an-appointment"
                      className="inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 transition-colors text-sm shadow-sm"
                    >
                      Book a Consultation
                    </Link>
                    <a
                      href="tel:+61396021330"
                      className="px-6 py-3 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-sm flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call +61 3 9602 1330</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Enriched Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* 1. Comprehensive Story Summary Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 space-y-5">
                <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span>Case Overview</span>
                  <span className="text-2xs font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Verified
                  </span>
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">Client / Applicant</p>
                      <p className="font-semibold text-slate-900">{story.client_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">Visa Pathway</p>
                      <p className="font-semibold text-slate-900">{story.visa_type || 'Migration'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">Final Outcome</p>
                      <p className="font-semibold text-emerald-700">{story.outcome || 'Visa Granted'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">Decision Date</p>
                      <p className="font-semibold text-slate-900">{story.date || '2025'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">Locations</p>
                      <p className="font-semibold text-slate-900">Melbourne &amp; Adelaide CBD</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">Regulatory Code</p>
                      <p className="text-xs text-slate-600">Statutory OMARA Code of Conduct</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/book-an-appointment"
                    className="block w-full text-center py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-2xs"
                  >
                    Discuss Your Options With Our Team
                  </Link>
                </div>
              </div>

              {/* 2. Direct Office Contact Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Contact Bansal Immigration</h4>
                
                <div className="space-y-3 text-xs text-slate-700">
                  <a
                    href="tel:+61396021330"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-800 font-semibold transition-colors border border-slate-100"
                  >
                    <Phone className="w-4 h-4 text-brand-800 shrink-0" />
                    <span>+61 3 9602 1330</span>
                  </a>

                  <a
                    href="mailto:info@bansalimmigration.com.au"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-800 font-semibold transition-colors border border-slate-100"
                  >
                    <Mail className="w-4 h-4 text-brand-800 shrink-0" />
                    <span className="truncate">info@bansalimmigration.com.au</span>
                  </a>
                </div>

                <div className="pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                  <p><strong>Melbourne:</strong> Level 8, 278 Collins St</p>
                  <p className="mt-1"><strong>Adelaide:</strong> Unit 5, 55 Gawler Pl</p>
                </div>
              </div>

              {/* 3. Helpful Tools & Calculators Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Explore Helpful Migration Tools</h4>
                <div className="space-y-2">
                  <Link
                    href="/migrate-to-australia/pr-point-calculator"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-800 font-medium text-xs transition-colors border border-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      <Calculator className="w-3.5 h-3.5 text-brand-800" />
                      <span>PR Points Calculator</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="/occupation-finder"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-800 font-medium text-xs transition-colors border border-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-brand-800" />
                      <span>Occupation Finder</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* More Success Stories */}
      {relatedStories.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 tracking-tight">
                More Success Stories
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Discover more Australian visa pathways navigated with our expert team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedStories.map((rel) => (
                <article
                  key={rel.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between border border-slate-200/80 group"
                >
                  <div>
                    <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                      {rel.image ? (
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center p-4 text-center text-white font-bold text-sm">
                          {rel.title}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-900">
                          {rel.visa_type || 'Visa'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {rel.date || '2025'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-brand-800 transition-colors">
                        <Link href={`/success-stories/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                      <p className="text-slate-600 mb-3 line-clamp-2 text-xs leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">
                      {rel.client_name}
                    </span>
                    <Link
                      href={`/success-stories/${rel.slug}`}
                      className="text-brand-800 hover:text-brand-950 font-bold text-xs inline-flex items-center"
                    >
                      Read Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
