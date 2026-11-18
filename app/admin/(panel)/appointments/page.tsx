import Link from 'next/link';
import { AppointmentSectionNav } from '@/components/admin/AppointmentSectionNav';
import { Notice, Pager, secondaryButtonClass } from '@/components/admin/ui';
import { clock, dayLabel, ENQUIRY_FILTERS, enquiryLabel, serviceLabel, statusLabel, STATUSES } from '@/lib/admin/appointments';
import { likeTerm } from '@/lib/admin/format';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

function keep(params: Record<string, string>, patch: Record<string, string | null>) {
  const next = new URLSearchParams(params);
  for (const [key, value] of Object.entries(patch)) {
    if (!value) next.delete(key);
    else next.set(key, value);
  }
  next.delete('page');
  const query = next.toString();
  return `/admin/appointments${query ? `?${query}` : ''}`;
}

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const location = params.location === 'melbourne' || params.location === 'adelaide' ? params.location : '';
  const enquiry = ENQUIRY_FILTERS.includes(params.enquiry_type as (typeof ENQUIRY_FILTERS)[number]) ? params.enquiry_type! : '';
  const status = STATUSES.includes(params.status as (typeof STATUSES)[number]) ? params.status! : '';
  const q = (params.q || '').trim();
  const start = /^\d{4}-\d{2}-\d{2}$/.test(params.start_date || '') ? params.start_date! : '';
  const end = /^\d{4}-\d{2}-\d{2}$/.test(params.end_date || '') ? params.end_date! : '';
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 20;
  const offset = (page - 1) * limit;
  const where: string[] = [];
  const values: unknown[] = [];
  if (location) {
    where.push('location = ?');
    values.push(location);
  }
  if (enquiry) {
    where.push('enquiry_type = ?');
    values.push(enquiry);
  }
  if (status) {
    where.push('status = ?');
    values.push(status);
  }
  if (start) {
    where.push('appointment_date >= ?');
    values.push(start);
  }
  if (end) {
    where.push('appointment_date <= ?');
    values.push(end);
  }
  if (q) {
    where.push('(full_name LIKE ? OR email LIKE ?)');
    const term = likeTerm(q);
    values.push(term, term);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const db = getDb();
  const [countRows] = await db.query<any[]>(`SELECT COUNT(*) AS total FROM enhanced_appointments ${whereSql}`, values);
  const total = Number(countRows[0]?.total || 0);
  const pages = Math.max(1, Math.ceil(total / limit));
  const [rows] = await db.query<any[]>(
    `SELECT id, full_name, email, appointment_date, appointment_time, location, enquiry_type, service_type, specific_service, status
     FROM enhanced_appointments ${whereSql}
     ORDER BY id DESC
     LIMIT ? OFFSET ?`,
    [...values, limit, offset]
  );
  const current = Object.fromEntries(
    Object.entries({ location, enquiry_type: enquiry, status, q, start_date: start, end_date: end }).filter(([, value]) => value)
  ) as Record<string, string>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Appointments</h1>
      <p className="mt-1 text-sm text-slate-600">
        Bookings from the public appointment form. Cancelling one frees that time on the calendar.
      </p>
      <AppointmentSectionNav current="/admin/appointments" />
      <Notice error={params.error} saved={params.saved} />

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Office</span>
          {[
            ['', 'All'],
            ['melbourne', 'Melbourne'],
            ['adelaide', 'Adelaide'],
          ].map(([value, label]) => (
            <Link
              key={label}
              href={keep(current, { location: value || null })}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                location === value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        {location !== 'adelaide' ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Calendar</span>
            <Link
              href={keep(current, { enquiry_type: null })}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                !enquiry ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </Link>
            {ENQUIRY_FILTERS.map((item) => (
              <Link
                key={item}
                href={keep(current, { enquiry_type: item })}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  enquiry === item ? 'bg-brand-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {enquiryLabel(item)}
              </Link>
            ))}
          </div>
        ) : null}
        <form className="mt-4 flex flex-wrap items-end gap-2 border-t border-slate-200 pt-4" action="/admin/appointments">
          {location ? <input type="hidden" name="location" value={location} /> : null}
          {enquiry ? <input type="hidden" name="enquiry_type" value={enquiry} /> : null}
          <label className="text-sm text-slate-700">
            Search
            <input name="q" defaultValue={q} placeholder="Name or email" className="mt-1 block w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-sm text-slate-700">
            Status
            <select name="status" defaultValue={status} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">All</option>
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {statusLabel(item)}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-700">
            From
            <input type="date" name="start_date" defaultValue={start} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-sm text-slate-700">
            To
            <input type="date" name="end_date" defaultValue={end} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <button className={secondaryButtonClass} type="submit">
            Filter
          </button>
        </form>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Client</th>
              <th className="px-3 py-3 font-medium">Date and time</th>
              <th className="px-3 py-3 font-medium">Office</th>
              <th className="px-3 py-3 font-medium">Service</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                  No appointments match this filter.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">
                    <Link href={`/admin/appointments/${row.id}`} className="font-medium text-brand-800 hover:underline">
                      {row.full_name}
                    </Link>
                    <div className="text-xs text-slate-500">{row.email}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div>{dayLabel(row.appointment_date)}</div>
                    <div className="text-xs text-slate-500">{clock(row.appointment_time)}</div>
                  </td>
                  <td className="px-3 py-3 capitalize">{row.location}</td>
                  <td className="px-3 py-3">
                    <div>{serviceLabel(row.service_type)}</div>
                    <div className="text-xs text-slate-500">
                      {enquiryLabel(row.enquiry_type)} · {serviceLabel(row.specific_service)}
                    </div>
                  </td>
                  <td className="px-3 py-3">{statusLabel(row.status)}</td>
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
          const query = new URLSearchParams(current);
          query.set('page', String(next));
          return `/admin/appointments?${query}`;
        }}
      />
      <p className="mt-3 text-sm text-slate-500">{total} appointments</p>
    </div>
  );
}
