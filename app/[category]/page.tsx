import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage, { contentMetadata } from '@/components/content/ContentPage';
import { getContent, getContentHubParams } from '@/lib/content';

/** Built from content/pages.json at build time. Unknown categories are not filled from the database. */
export function generateStaticParams() {
  return getContentHubParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return contentMetadata(`/${category}`) ?? { title: 'Visa Services | Bansal Immigration' };
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const page = getContent(`/${category}`);
  if (!page) notFound();
  return <ContentPage c={page} />;
}
