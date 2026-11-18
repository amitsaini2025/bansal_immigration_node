import Link from 'next/link';
import { Notice, Pager, secondaryButtonClass } from '@/components/admin/ui';
import { formatWhen, likeTerm } from '@/lib/admin/format';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function BlogsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string; error?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q || '').trim();
  const status = params.status === '0' || params.status === '1' ? params.status : '';
  const limit = 20;
  const where: string[] = [];
  const values: unknown[] = [];
  if (q) {
    where.push('(title LIKE ? OR author LIKE ?)');
    const term = likeTerm(q);
    values.push(term, term);
  }
  if (status) {
    where.push('status = ?');
    values.push(Number(status));
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const db = getDb();
  const [countRows] = await db.query<any[]>(`SELECT COUNT(*) AS total FROM blogs ${whereSql}`, values);
  const total = Number(countRows[0]?.total || 0);
  const pages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, Number(params.page) || 1), pages);
  const [rows] = await db.query<any[]>(
    `SELECT id, title, slug, status, featured, author, updated_at FROM blogs ${whereSql} ORDER BY updated_at DESC LIMIT ? OFFSET ?`,
    [...values, limit, (page - 1) * limit]
  );
  const query = new URLSearchParams();
  if (q) query.set('q', q);
  if (status) query.set('status', status);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Blogs</h1>
          <p className="mt-1 text-sm text-slate-600">{total} posts. Published posts appear on /blogs.</p>
        </div>
        <Link href="/admin/blogs/new" className={secondaryButtonClass}>
          New post
        </Link>
      </div>
      <Notice error={params.error} saved={params.saved} />
      <form className="mt-4 flex flex-wrap gap-2" action="/admin/blogs">
        <input name="q" defaultValue={q} placeholder="Search title or author" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <select name="status" defaultValue={status} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="">All</option>
          <option value="1">Published</option>
          <option value="0">Drafts</option>
        </select>
        <button className={secondaryButtonClass} type="submit">
          Filter
        </button>
      </form>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Title</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100">
                <td className="px-3 py-3">
                  <Link href={`/admin/blogs/${row.id}`} className="font-medium text-brand-800 hover:underline">
                    {row.title}
                  </Link>
                  <div className="text-xs text-slate-500">/{row.slug}</div>
                </td>
                <td className="px-3 py-3">
                  {Number(row.status) === 1 ? 'Published' : 'Draft'}
                  {Number(row.featured) === 1 ? ' · Featured' : ''}
                </td>
                <td className="px-3 py-3 whitespace-nowrap">{formatWhen(row.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager
        page={page}
        pages={pages}
        hrefFor={(next) => {
          const nextQuery = new URLSearchParams(query);
          nextQuery.set('page', String(next));
          return `/admin/blogs?${nextQuery}`;
        }}
      />
    </div>
  );
}
