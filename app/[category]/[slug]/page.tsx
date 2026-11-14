import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage, { contentMetadata } from '@/components/content/ContentPage';
import { getContent, getContentChildParams } from '@/lib/content';

/** Built from content/pages.json at build time. Unknown articles are not filled from the database. */
export function generateStaticParams() {
  return getContentChildParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  return contentMetadata(`/${category}/${slug}`) ?? { title: 'Visa Services | Bansal Immigration' };
}

export default async function ContentArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (slug === category) notFound();
  const page = getContent(`/${category}/${slug}`);
  if (!page) notFound();
  return <ContentPage c={page} />;
}
