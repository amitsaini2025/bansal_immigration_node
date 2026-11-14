import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Star,
  Users,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Award,
  FileText,
  Briefcase,
  Globe,
  DollarSign
} from 'lucide-react';
import { getPage, getRelatedPages, PageRecord } from '@/lib/db';
import ContentPage, { contentMetadata } from '@/components/content/ContentPage';
import { getContent } from '@/lib/content';
import Breadcrumbs, { getCategoryLabel } from '@/components/common/Breadcrumbs';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';

const STUDY_EDUCATION_LINKS = [
  { slug: 'admission-in-australia', title: 'Admission in Australia' },
  { slug: 'new-coe', title: 'New CoE (Enrolment)' },
  { slug: 'course-change-in-australia', title: 'Course Change' },
  { slug: 'what-is-recognized-prior-learning-rpl-australia', title: 'RPL Assessment' },
  { slug: 'professional-year-program', title: 'Professional Year' },
  { slug: 'request-to-defer-your-studies', title: 'Defer Studies' },
  { slug: 'our-affiliations', title: 'Our Affiliations' },
];

const STUDY_VISA_LINKS = [
  { slug: 'student-dependent-visa-500', title: 'Student Dependent (500)' },
  { slug: 'student-visa-extension', title: 'Student Visa Extension' },
  { slug: 'student-guardian-visa-590', title: 'Student Guardian (590)' },
  { slug: 'student-visa-journey', title: 'Student Visa Journey' },
  { slug: 'student-visa-information', title: 'Student Visa Information' },
];

const STUDY_TOOL_LINKS = [
  { href: '/study-australia/student-visa-financial-calculator', title: 'Financial Calculator' },
  { href: '/forms/afp-national-police-check', title: 'AFP National Police Check Form' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const cm = contentMetadata(`/${category}/${slug}`);
  if (cm) return cm;
  const page = await getPage(category, slug);
  if (!page) return { title: 'Visa Services | Bansal Immigration' };

  return {
    title: page.meta_title || `${page.title} | Bansal Immigration`,
    description: page.meta_description || page.excerpt || undefined,
  };
}

function parseJsonSafe<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

export default async function DynamicVisaPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  // Prevent duplicate paths like /category/category
  if (slug === category) {
    notFound();
  }

  const approved = getContent(`/${category}/${slug}`);
  if (approved) return <ContentPage c={approved} />;

  const page = await getPage(category, slug);
  if (!page) {
    notFound();
  }

  const relatedPages = await getRelatedPages(category, page.id, 6);

  const eligibility = parseJsonSafe<any[]>(page.visa_eligibility, []);
  const benefits = parseJsonSafe<any[]>(page.visa_benefits, []);
  const steps = parseJsonSafe<any[]>(page.visa_steps, []);
  const faqs = parseJsonSafe<any[]>(page.visa_faqs, []);
  const processingTimes = parseJsonSafe<any>(page.visa_processing_times, {});
  const costs = parseJsonSafe<any[]>(page.visa_costs, []);

  const showEligibility = Array.isArray(eligibility) && eligibility.length > 0;
  const showBenefits = Array.isArray(benefits) && benefits.length > 0;
  const showSteps = Array.isArray(steps) && steps.length > 0;
  const showFaqs = Array.isArray(faqs) && faqs.length > 0;
  const showProcessing = Boolean(processingTimes?.standard || processingTimes?.priority || processingTimes?.complex);
  const showCosts = Array.isArray(costs) && costs.length > 0;
  const isStudySection = page.category === 'study-australia';

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl animate-fade-in-up">
        {/* Modern Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: getCategoryLabel(page.category), href: `/${page.category}` },
              { label: page.title },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-xl bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 text-white p-8 sm:p-10 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="relative w-full max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                {isStudySection ? 'Official Education & Student Visa Guidance' : 'Verified Migration Guidance'}
              </span>
              <span className="text-xs text-brand-200">
                Department of Home Affairs &amp; CRICOS Compliant
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="text-brand-100 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl drop-shadow-sm font-light">
                {page.excerpt}
              </p>
            )}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2">
              <a
                href="#overview"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-brand-800 font-bold rounded-xl hover:bg-brand-50 transition-all shadow-md text-base"
              >
                Read Complete Guide
              </a>
              <Link
                href="/book-an-appointment"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all shadow-md text-base"
              >
                Book Free Consultation
              </Link>
              {showSteps && (
                <a
                  href="#how-to-apply"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/25 transition-all text-base"
                >
                  Step-by-Step Roadmap
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content & Sidebar 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Spacious Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Section */}
            <section
              id="overview"
              className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-brand-50/70 via-brand-50/50 to-white px-8 sm:px-10 py-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">Detailed Guide</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Overview &amp; Requirements</h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <div className="p-8 sm:p-10 md:p-12">
                <div
                  className="cms-content text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: page.content || '' }}
                />
              </div>
            </section>

            {/* Eligibility Section */}
            {showEligibility && (
              <section id="eligibility" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">Criteria</span>
                    <h2 className="text-2xl font-bold text-slate-900">Do You Have What It Takes?</h2>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {eligibility.map((item: any, idx: number) => {
                    const title = typeof item === 'object' ? item.title || item.heading : item;
                    const desc = typeof item === 'object' ? item.description : null;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          {title && <div className="font-semibold text-slate-900">{title}</div>}
                          {desc && <div className="text-xs text-slate-600 mt-1">{desc}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Benefits Section */}
            {showBenefits && (
              <section id="benefits" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block">Advantages</span>
                    <h2 className="text-2xl font-bold text-slate-900">Why Choose This Path?</h2>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((b: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-brand-50/40 border border-brand-100/60 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-700 mt-2 shrink-0" />
                      <span className="text-slate-800 text-sm leading-relaxed">{typeof b === 'object' ? b.title || b.text : b}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Steps / How to Apply Section */}
            {showSteps && (
              <section id="how-to-apply" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block">Process</span>
                    <h2 className="text-2xl font-bold text-slate-900">Your Roadmap to Success</h2>
                  </div>
                </div>
                <ol className="space-y-4">
                  {steps.map((st: any, idx: number) => {
                    const title = typeof st === 'object' ? st.title : st;
                    const desc = typeof st === 'object' ? st.description : null;
                    return (
                      <li key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="w-9 h-9 rounded-xl bg-brand-700 text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-base">{title}</div>
                          {desc && <div className="text-sm text-slate-600 mt-1 leading-relaxed">{desc}</div>}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {/* Processing Times */}
            {showProcessing && (
              <section id="processing-times" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Indicative Processing Times</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                    Home Affairs Standard
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  {processingTimes.standard && (
                    <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60">
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Standard / Median</div>
                      <div className="text-xl font-extrabold text-slate-900 mt-1.5">{processingTimes.standard}</div>
                    </div>
                  )}
                  {processingTimes.priority && (
                    <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60">
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Priority / Fast Stream</div>
                      <div className="text-xl font-extrabold text-brand-700 mt-1.5">{processingTimes.priority}</div>
                    </div>
                  )}
                  {processingTimes.complex && (
                    <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60">
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Complex / Background Checks</div>
                      <div className="text-xl font-extrabold text-slate-900 mt-1.5">{processingTimes.complex}</div>
                    </div>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 text-xs text-slate-600 leading-relaxed">
                  <p>
                    <strong>Notice:</strong> Processing times vary depending on applicant responsiveness, biometrics, health clearances, and whether the application is decision-ready upon lodgement.
                  </p>
                </div>
              </section>
            )}

            {/* Costs */}
            {showCosts && (
              <section id="costs" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Government Charges &amp; Costs</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    Statutory VAC
                  </span>
                </div>
                <div className="overflow-x-auto mb-4 rounded-2xl border border-slate-200">
                  <table className="min-w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-5 py-3 border-b text-xs uppercase font-bold text-slate-700">Fee Item</th>
                        <th className="px-5 py-3 border-b text-xs uppercase font-bold text-slate-700">Amount (AUD)</th>
                        <th className="px-5 py-3 border-b text-xs uppercase font-bold text-slate-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {costs.map((c: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-5 py-3.5 font-medium text-slate-900 text-sm">{c.item || c.label || ''}</td>
                          <td className="px-5 py-3.5 text-brand-700 font-bold text-sm">{c.cost || c.amount || ''}</td>
                          <td className="px-5 py-3.5 text-slate-500 text-xs">{c.notes || 'Official Department Fee'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Study in Australia Feature Cards */}
            {isStudySection && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-brand-50/60 border border-brand-200/70 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-950 mb-1.5">World-Class Education</h3>
                  <p className="text-sm text-brand-950/80 leading-relaxed">Access top-ranked Australian universities and TAFE institutions with globally recognized qualifications.</p>
                </div>
                <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950 mb-1.5">Work Opportunities</h3>
                  <p className="text-sm text-emerald-900/80 leading-relaxed">Work up to 48 hours per fortnight during study terms and enjoy unrestricted work rights during course breaks.</p>
                </div>
                <div className="bg-purple-50/60 border border-purple-200/70 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-950 mb-1.5">Pathways to Permanent Residency</h3>
                  <p className="text-sm text-purple-900/80 leading-relaxed">Transition seamlessly to Temporary Graduate Visa (subclass 485) and explore state-sponsored PR pathways.</p>
                </div>
                <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-950 mb-1.5">High Quality of Life</h3>
                  <p className="text-sm text-amber-900/80 leading-relaxed">Study and live in safe, multicultural Australian cities recognized among the world’s most liveable communities.</p>
                </div>
              </div>
            )}

            {/* FAQs */}
            {showFaqs && (
              <section id="faqs" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq: any, idx: number) => (
                    <details key={idx} className="border border-slate-200 rounded-2xl group p-5 bg-slate-50/30">
                      <summary className="font-semibold text-slate-900 cursor-pointer flex justify-between items-center">
                        <span>{faq.question}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                      </summary>
                      <div
                        className="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Form CTA */}
            <div id="contact-form" className="bg-white rounded-3xl shadow-sm p-8 sm:p-10 border border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">Get In Touch</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Speak with an Education &amp; Visa Specialist</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Fill in your details below for personalized advice regarding {page.title}.
              </p>
              <UnifiedContactForm
                formSource={`visa-${page.slug}`}
                formVariant="compact"
                showPhone={true}
                showSubject={false}
                formTitle=""
              />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dedicated Study in Australia Navigation Menu */}
            {isStudySection && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Study in Australia</h3>
                    <p className="text-xs text-slate-500">Education &amp; Visa Pathways</p>
                  </div>
                </div>

                {/* Education Services */}
                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Education Services</div>
                  <ul className="space-y-1">
                    {STUDY_EDUCATION_LINKS.map((link) => {
                      const isActive = slug === link.slug;
                      return (
                        <li key={link.slug}>
                          <Link
                            href={`/study-australia/${link.slug}`}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                              isActive
                                ? 'bg-brand-700 text-white font-semibold shadow-sm'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-brand-700'
                            }`}
                          >
                            <span className="truncate">{link.title}</span>
                            {isActive && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">Active</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Student Visas */}
                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Student Visas</div>
                  <ul className="space-y-1">
                    {STUDY_VISA_LINKS.map((link) => {
                      const isActive = slug === link.slug || (link.slug === 'student-guardian-visa-590' && slug === 'student-guardian-visa-subclass-590');
                      return (
                        <li key={link.slug}>
                          <Link
                            href={`/study-australia/${link.slug}`}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                              isActive
                                ? 'bg-brand-700 text-white font-semibold shadow-sm'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-brand-700'
                            }`}
                          >
                            <span className="truncate">{link.title}</span>
                            {isActive && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">Active</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Tools & Resources */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tools &amp; Forms</div>
                  <ul className="space-y-1">
                    {STUDY_TOOL_LINKS.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={tool.href}
                          className="block px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-600 hover:bg-slate-100 hover:text-brand-700 transition-colors"
                        >
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-700 via-brand-800 to-brand-900 px-6 py-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-200 block mb-0.5">Need Guidance?</span>
                <h3 className="text-lg font-bold">Speak with Our Consultants</h3>
                <p className="text-brand-100 text-xs mt-1">Melbourne &amp; Adelaide Registered Team</p>
              </div>
              <div className="p-6 space-y-4">
                <a
                  href="tel:+61396021330"
                  className="flex items-center p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-100"
                >
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-3 text-white shrink-0 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-emerald-800">Phone Consultation</div>
                    <div className="text-sm font-bold text-slate-900">+61 3 9602 1330</div>
                  </div>
                </a>

                <a
                  href="mailto:info@bansalimmigration.com.au"
                  className="flex items-center p-3.5 rounded-2xl bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-100"
                >
                  <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center mr-3 text-white shrink-0 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-brand-900">Direct Email</div>
                    <div className="text-xs font-bold text-slate-900 break-all">info@bansalimmigration.com.au</div>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="font-semibold text-slate-800 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-brand-700 shrink-0" /> Melbourne Head Office:
                  </div>
                  <p className="text-slate-600 pl-4.5">Level 8/278 Collins St, Melbourne VIC 3000</p>
                  <div className="font-semibold text-slate-800 flex items-center pt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-brand-700 shrink-0" /> Adelaide Office:
                  </div>
                  <p className="text-slate-600 pl-4.5">Unit 5, 55 Gawler Pl, Adelaide SA 5000</p>
                </div>

                <Link
                  href="/book-an-appointment"
                  className="block w-full text-center bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg text-sm"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>

            {/* Verified Standards Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Registered Standards</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">OMARA Registered Agents</div>
                  <div className="text-[11px] text-slate-500">Regulated Australian legal practitioners</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">Statutory Code of Conduct</div>
                  <div className="text-[11px] text-slate-500">Full consumer protection &amp; ethics</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">Transparent Costing</div>
                  <div className="text-[11px] text-slate-500">Fixed upfront written agreements</div>
                </div>
              </div>
            </div>

            {/* Related Services for non-study categories */}
            {!isStudySection && relatedPages.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4">Related Visas &amp; Services</h3>
                <div className="space-y-2">
                  {relatedPages.map((rel: PageRecord) => (
                    <Link
                      key={rel.id}
                      href={`/${rel.category}/${rel.slug}`}
                      className="block p-3 rounded-xl hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs sm:text-sm font-medium transition-colors border border-slate-100"
                    >
                      {rel.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
