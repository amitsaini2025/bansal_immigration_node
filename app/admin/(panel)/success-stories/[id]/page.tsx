import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteStoryForm, StoryForm } from '@/components/admin/StoryForm';
import { Notice } from '@/components/admin/ui';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function EditStoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const storyId = Number(id);
  if (!Number.isInteger(storyId) || storyId <= 0) notFound();
  const db = getDb();
  const [rows] = await db.query<any[]>('SELECT * FROM success_stories WHERE id = ? LIMIT 1', [storyId]);
  const story = rows[0];
  if (!story) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/success-stories" className="text-sm text-brand-800 hover:underline">
            Back to success stories
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Edit success story</h1>
        </div>
        {Number(story.status) === 1 ? (
          <a href={`/success-stories/${story.slug}`} className="text-sm text-brand-800 hover:underline" target="_blank" rel="noreferrer">
            View on site
          </a>
        ) : null}
      </div>
      <Notice error={query.error} saved={query.saved} />
      <StoryForm story={story} />
      <DeleteStoryForm id={story.id} />
    </div>
  );
}
