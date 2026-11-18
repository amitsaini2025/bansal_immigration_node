import { Notice } from '@/components/admin/ui';
import { BlogForm } from '@/components/admin/BlogForm';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">New post</h1>
      <Notice error={params.error} />
      <BlogForm />
    </div>
  );
}
