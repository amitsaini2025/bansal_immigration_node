import { Notice } from '@/components/admin/ui';
import { StoryForm } from '@/components/admin/StoryForm';

export const dynamic = 'force-dynamic';

export default async function NewStoryPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">New success story</h1>
      <Notice error={params.error} />
      <StoryForm />
    </div>
  );
}
