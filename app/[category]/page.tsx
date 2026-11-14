import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home, ChevronRight, Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { getPage, getDb, PageRecord } from '@/lib/db';
import ContentPage, { contentMetadata } from '@/components/content/ContentPage';
import { getContent } from '@/lib/content';
import Breadcrumbs, { getCategoryLabel } from '@/components/common/Breadcrumbs';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cm = contentMetadata(`/${category}`);
  if (cm) return cm;
  const page = await getPage(category);
  const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: page?.meta_title || `${page?.title || formattedCategory} | Bansal Immigration`,
    description: page?.meta_description || page?.excerpt || `Comprehensive guide and visa services for ${formattedCategory}.`,
  };
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const approved = getContent(`/${category}`);
  if (approved) return <ContentPage c={approved} />;

  // Query pages in this category
  const db = getDb();
  const [categoryPages] = await db.query<any[]>(
    'SELECT * FROM pages WHERE category = ? AND status = 1 ORDER BY `order` ASC, id ASC',
    [category]
  );

  const pages = (categoryPages as PageRecord[]) || [];
  const mainPage = await getPage(category);

  // If no main page and no pages in this category, return 404
  if (!mainPage && pages.length === 0) {
    notFound();
  }

  const title = mainPage?.title || getCategoryLabel(category);
  const excerpt = mainPage?.excerpt || `Explore all pathways, requirements, and services for ${title}.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Trail */}
      <div className="border-b border-slate-100 bg-white">
        <Breadcrumbs items={[{ label: title }]} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-950 to-brand-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-brand-100 leading-relaxed">{excerpt}</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Visa Subpages List & Overview */}
          <div className="lg:col-span-2 space-y-8">
            {mainPage?.content && (
              <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
                <div
                  className="cms-content text-gray-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: mainPage.content }}
                />
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Visas &amp; Pathways in this Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pages
                  .filter((p) => p.slug !== category)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl shadow p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{p.excerpt || ''}</p>
                      </div>
                      <Link
                        href={`/${category}/${p.slug}`}
                        className="inline-flex items-center text-brand-700 hover:text-brand-900 font-semibold text-sm pt-2"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Speak to an Australian Migration Specialist</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Get tailored assessment and expert representation for your application.
              </p>
              <UnifiedContactForm
                formSource={`category-hub-${category}`}
                formVariant="full"
                showPhone={true}
                showSubject={true}
                formTitle=""
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-8 h-8 text-brand-700 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">MARN Registered</h3>
                  <p className="text-xs text-gray-500">Regulated Migration Agents</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our registered migration consultants possess comprehensive knowledge of Australian immigration laws, providing you with transparent and honest guidance.
              </p>
              <div className="pt-2 border-t border-gray-100 space-y-3">
                <a
                  href="tel:+61396021330"
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-50 text-gray-900 hover:bg-green-100 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-green-600 shrink-0" /> +61 3 9602 1330
                </a>
                <a
                  href="mailto:info@bansalimmigration.com.au"
                  className="flex items-center gap-3 p-3 rounded-lg bg-brand-50 text-gray-900 hover:bg-brand-100 font-semibold text-sm break-all"
                >
                  <Mail className="w-4 h-4 text-brand-700 shrink-0" /> info@bansalimmigration.com.au
                </a>
                <Link
                  href="/book-an-appointment"
                  className="block w-full text-center bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 rounded-xl transition-colors shadow text-sm"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-brand-700 shrink-0" /> Our Office Locations
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <div className="font-semibold text-gray-900">Melbourne Office:</div>
                  <p>Level 8/278 Collins St, Melbourne VIC 3000</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Adelaide Office:</div>
                  <p>Unit 5, 55 Gawler Pl, Adelaide SA 5000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
