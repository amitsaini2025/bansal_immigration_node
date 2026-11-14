import { notFound } from 'next/navigation';
import ContentPage, { contentMetadata } from '@/components/content/ContentPage';
import { getContent } from '@/lib/content';

const PATH = '/visitor-visa';

export const metadata = contentMetadata(PATH) ?? {};

export default function Page() {
  const c = getContent(PATH);
  if (!c) notFound();
  return <ContentPage c={c} />;
}
