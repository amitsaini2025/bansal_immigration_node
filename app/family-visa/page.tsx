import { notFound } from 'next/navigation';
import ContentPage, { contentMetadata } from '@/components/content/ContentPage';
import { getContent } from '@/lib/content';

/** This hub is a file in content/pages.json, built with the rest of the visa pages. */
export const dynamic = 'force-static';

const PATH = '/family-visa';

export const metadata = contentMetadata(PATH) ?? {};

export default function Page() {
  const c = getContent(PATH);
  if (!c) notFound();
  return <ContentPage c={c} />;
}
