import Link from 'next/link';
import { Notice, Pager, secondaryButtonClass } from '@/components/admin/ui';
import { formatWhen, likeTerm } from '@/lib/admin/format';
import { getDb } from '@/lib/db';
import { bulkUpdateContactStatus } from './actions';

export const dynamic = 'force-dynamic';

const STATUSES = ['unread', 'read', 'resolved', 'archived'];

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string; error?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q || '').trim();
  const status = STATUSES.includes(params.status || '') ? params.status! : '';
  const limit = 20;
  const where: string[] = [];
  const values: unknown[] = [];
  if (status) {
    where.push('status = ?');
    values.push(status);
  }
  if (q) {
    where.push('(name LIKE ? OR contact_email LIKE ? OR contact_phone LIKE ? OR subject LIKE ?)');
    const term = likeTerm(q);
    values.push(term, term, term, term);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const db = getDb();
  const [countRows] = await db.query<any[]>(`SELECT COUNT(*) AS total FROM contacts ${whereSql}`, values);
  const total = Number(countRows[0]?.total || 0);
  const pages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, Number(params.page) || 1), pages);
  const [rows] = await db.query<any[]>(
    `SELECT id, name, contact_email, contact_phone, subject, status, form_source, created_at
     FROM contacts ${whereSql}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...values, limit, (page - 1) * limit]
  );

  const query = new URLSearchParams();
  if (q) query.set('q', q);
  if (status) query.set('status', status);
  const back = `/admin/contacts${query.toString() ? `?${query}` : ''}`;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Contacts</h1>
      <p className="mt-1 text-sm text-slate-600">{total} matching enquiries, including appointment requests.</p>
      <Notice error={params.error} saved={params.saved} />
      <form className="mt-4 flex flex-wrap gap-2" action="/admin/contacts">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, phone, subject"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-80"
        />
        <select name="status" defaultValue={status} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button className={secondaryButtonClass} type="submit">
          Filter
        </button>
      </form>

      <form action={bulkUpdateContactStatus} className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <input type="hidden" name="back" value={back} />
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3" />
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Subject</th>
              <th className="px-3 py-3 font-medium">Source</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                  No contacts match this filter.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">
                    <input type="checkbox" name="ids" value={row.id} aria-label={`Select ${row.name}`} />
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/admin/contacts/${row.id}`} className="font-medium text-brand-800 hover:underline">
                      {row.name}
                    </Link>
                    <div className="text-xs text-slate-500">{row.contact_email || row.contact_phone}</div>
                  </td>
                  <td className="px-3 py-3">{row.subject}</td>
                  <td className="px-3 py-3">{row.form_source || '—'}</td>
                  <td className="px-3 py-3 capitalize">{row.status}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatWhen(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 px-3 py-3">
          <select name="status" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" defaultValue="read">
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className={secondaryButtonClass} type="submit">
            Update selected
          </button>
        </div>
      </form>
      <Pager
        page={page}
        pages={pages}
        hrefFor={(next) => {
          const nextQuery = new URLSearchParams(query);
          nextQuery.set('page', String(next));
          return `/admin/contacts?${nextQuery}`;
        }}
      />
    </div>
  );
}
