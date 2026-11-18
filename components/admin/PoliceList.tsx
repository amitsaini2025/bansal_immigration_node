import Link from 'next/link';
import { Notice, Pager, secondaryButtonClass } from '@/components/admin/ui';
import { formatWhen, likeTerm } from '@/lib/admin/format';
import { getDb } from '@/lib/db';
import { deleteOldApplications } from '@/app/admin/(panel)/police-actions';

type Kind = 'afp' | 'indian';

const CONFIG = {
  afp: {
    title: 'AFP checks',
    table: 'afp_applications',
    href: '/admin/afp',
    note: 'These rows are applications already stored in the database. The public AFP page on this site still sends a contact enquiry.',
  },
  indian: {
    title: 'Indian PCC',
    table: 'indian_police_applications',
    href: '/admin/indian-pcc',
    note: 'These rows are applications already stored in the database. The public Indian police-check page on this site still sends a contact enquiry.',
  },
} as const;

export async function PoliceList({
  kind,
  searchParams,
}: {
  kind: Kind;
  searchParams: Promise<{ q?: string; status?: string; from?: string; to?: string; page?: string; error?: string; saved?: string }>;
}) {
  const config = CONFIG[kind];
  const params = await searchParams;
  const q = (params.q || '').trim();
  const status = (params.status || '').trim();
  const from = /^\d{4}-\d{2}-\d{2}$/.test(params.from || '') ? params.from! : '';
  const to = /^\d{4}-\d{2}-\d{2}$/.test(params.to || '') ? params.to! : '';
  const limit = 20;
  const where: string[] = [];
  const values: unknown[] = [];
  if (q) {
    where.push('(reference LIKE ? OR first_names LIKE ? OR family_name LIKE ? OR email LIKE ? OR phone LIKE ?)');
    const term = likeTerm(q);
    values.push(term, term, term, term, term);
  }
  if (status) {
    where.push('status = ?');
    values.push(status);
  }
  if (from) {
    where.push('DATE(created_at) >= ?');
    values.push(from);
  }
  if (to) {
    where.push('DATE(created_at) <= ?');
    values.push(to);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const db = getDb();
  const [countRows] = await db.query<any[]>(`SELECT COUNT(*) AS total FROM ${config.table} ${whereSql}`, values);
  const total = Number(countRows[0]?.total || 0);
  const pages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, Number(params.page) || 1), pages);
  const [rows] = await db.query<any[]>(
    `SELECT id, reference, first_names, family_name, email, status, total_amount, created_at
     FROM ${config.table} ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...values, limit, (page - 1) * limit]
  );
  const [statsRows] = await db.query<any[]>(
    `SELECT
      COUNT(*) AS total,
      SUM(status = 'paid') AS paid,
      SUM(status = 'payment_pending') AS pending,
      SUM(created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH)) AS old_count
     FROM ${config.table}`
  );
  const stats = statsRows[0] || {};
  const query = new URLSearchParams();
  if (q) query.set('q', q);
  if (status) query.set('status', status);
  if (from) query.set('from', from);
  if (to) query.set('to', to);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{config.title}</h1>
      <p className="mt-1 max-w-3xl text-sm text-slate-600">{config.note}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {[
          ['Total', stats.total],
          ['Paid', stats.paid],
          ['Payment pending', stats.pending],
          ['Older than 6 months', stats.old_count],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-xl font-semibold">{Number(value || 0)}</p>
          </div>
        ))}
      </div>
      <Notice error={params.error} saved={params.saved} />
      <form className="mt-4 flex flex-wrap gap-2" action={config.href}>
        <input name="q" defaultValue={q} placeholder="Search reference, name, email, phone" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-72" />
        <input name="status" defaultValue={status} placeholder="Status" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="from" type="date" defaultValue={from} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="to" type="date" defaultValue={to} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button className={secondaryButtonClass} type="submit">
          Filter
        </button>
      </form>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Reference</th>
              <th className="px-3 py-3 font-medium">Applicant</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-slate-500">
                  No applications match this filter.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">
                    <Link href={`${config.href}/${row.id}`} className="font-medium text-brand-800 hover:underline">
                      {row.reference}
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    {row.first_names} {row.family_name}
                    <div className="text-xs text-slate-500">{row.email}</div>
                  </td>
                  <td className="px-3 py-3">{row.status}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatWhen(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pager
        page={page}
        pages={pages}
        hrefFor={(next) => {
          const nextQuery = new URLSearchParams(query);
          nextQuery.set('page', String(next));
          return `${config.href}?${nextQuery}`;
        }}
      />
      <form action={deleteOldApplications} className="mt-6 rounded-2xl border border-red-200 bg-white p-5">
        <input type="hidden" name="kind" value={kind} />
        <p className="text-sm text-slate-700">Delete every application older than six months, including its identity documents.</p>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" name="confirm" value="yes" />
          I understand this cannot be undone
        </label>
        <button className={`${secondaryButtonClass} mt-3 border-red-300 text-red-700`} type="submit">
          Delete old applications
        </button>
      </form>
    </div>
  );
}
