import Link from 'next/link';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { getDb } from '@/lib/db';
import { moveStory } from './actions';

export const dynamic = 'force-dynamic';

export default async function SuccessStoriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const db = getDb();
  const [rows] = await db.query<any[]>(
    'SELECT id, title, slug, client_name, visa_type, status, featured, `order` FROM success_stories ORDER BY `order` ASC, id DESC'
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Success stories</h1>
          <p className="mt-1 text-sm text-slate-600">Published stories appear on /success-stories, lowest order first.</p>
        </div>
        <Link href="/admin/success-stories/new" className={secondaryButtonClass}>
          New story
        </Link>
      </div>
      <Notice error={params.error} saved={params.saved} />
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Order</th>
              <th className="px-3 py-3 font-medium">Title</th>
              <th className="px-3 py-3 font-medium">Client</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-slate-500">
                  No success stories yet.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <span className="w-8 text-slate-500">{row.order}</span>
                      <form action={moveStory}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={index === 0} className="rounded border border-slate-300 px-2 py-1 text-xs disabled:opacity-40">
                          Up
                        </button>
                      </form>
                      <form action={moveStory}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button
                          type="submit"
                          disabled={index === rows.length - 1}
                          className="rounded border border-slate-300 px-2 py-1 text-xs disabled:opacity-40"
                        >
                          Down
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/admin/success-stories/${row.id}`} className="font-medium text-brand-800 hover:underline">
                      {row.title}
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    {row.client_name}
                    <div className="text-xs text-slate-500">{row.visa_type}</div>
                  </td>
                  <td className="px-3 py-3">
                    {Number(row.status) === 1 ? 'Published' : 'Draft'}
                    {Number(row.featured) === 1 ? ' · Featured' : ''}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
