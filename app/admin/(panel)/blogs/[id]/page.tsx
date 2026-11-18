import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogForm, DeleteBlogForm } from '@/components/admin/BlogForm';
import { Notice } from '@/components/admin/ui';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const blogId = Number(id);
  if (!Number.isInteger(blogId) || blogId <= 0) notFound();
  const db = getDb();
  const [rows] = await db.query<any[]>('SELECT * FROM blogs WHERE id = ? LIMIT 1', [blogId]);
  const blog = rows[0];
  if (!blog) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/blogs" className="text-sm text-brand-800 hover:underline">
            Back to blogs
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Edit post</h1>
        </div>
        {Number(blog.status) === 1 ? (
          <a href={`/blogs/${blog.slug}`} className="text-sm text-brand-800 hover:underline" target="_blank" rel="noreferrer">
            View on site
          </a>
        ) : null}
      </div>
      <Notice error={query.error} saved={query.saved} />
      <BlogForm blog={blog} />
      <DeleteBlogForm id={blog.id} />
    </div>
  );
}
