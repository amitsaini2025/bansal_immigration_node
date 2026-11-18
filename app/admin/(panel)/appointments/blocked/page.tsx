import { AppointmentSectionNav } from '@/components/admin/AppointmentSectionNav';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { BLOCK_ENQUIRY_TYPES, clock, dayLabel, enquiryLabel } from '@/lib/admin/appointments';
import { getDb } from '@/lib/db';
import { createBlockedTime, toggleBlockedTime } from '../actions';

export const dynamic = 'force-dynamic';

function list(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default async function BlockedTimesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const db = getDb();
  const [rows] = await db.query<any[]>(
    `SELECT id, title, blocked_date, start_time, end_time, is_all_day, blocked_enquiry_types, blocked_locations, is_active, block_type
     FROM blocked_times
     ORDER BY blocked_date DESC, id DESC
     LIMIT 100`
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Blocked times</h1>
      <p className="mt-1 text-sm text-slate-600">An active block is removed from the public booking calendar.</p>
      <AppointmentSectionNav current="/admin/appointments/blocked" />
      <Notice error={params.error} saved={params.saved} />

      <form action={createBlockedTime} className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <label className="text-sm text-slate-700 sm:col-span-2">
          Title
          <input name="title" required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-700">
          Date
          <input type="date" name="blocked_date" required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-700">
          Type
          <select name="block_type" defaultValue="unavailable" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="unavailable">Unavailable</option>
            <option value="busy">Busy</option>
            <option value="holiday">Holiday</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
        <label className="text-sm text-slate-700">
          Start
          <input type="time" name="start_time" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-700">
          End
          <input type="time" name="end_time" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="is_all_day" value="1" />
          All day
        </label>
        <label className="text-sm text-slate-700">
          Office
          <select name="location" defaultValue="" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">Both offices</option>
            <option value="melbourne">Melbourne</option>
            <option value="adelaide">Adelaide</option>
          </select>
        </label>
        <label className="text-sm text-slate-700 sm:col-span-2">
          Calendar
          <select name="enquiry_type" defaultValue="" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">Every calendar</option>
            {BLOCK_ENQUIRY_TYPES.map((item) => (
              <option key={item} value={item}>
                {enquiryLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-slate-700 sm:col-span-2">
          Note
          <input name="description" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <div>
          <button className={secondaryButtonClass} type="submit">
            Block this time
          </button>
        </div>
      </form>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Title</th>
              <th className="px-3 py-3 font-medium">When</th>
              <th className="px-3 py-3 font-medium">Affects</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-slate-500">
                  No blocked times yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const offices = list(row.blocked_locations);
                const calendars = list(row.blocked_enquiry_types);
                return (
                  <tr key={row.id} className="border-b border-slate-100">
                    <td className="px-3 py-3">
                      <div className="font-medium text-slate-900">{row.title}</div>
                      <div className="text-xs capitalize text-slate-500">{row.block_type}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div>{dayLabel(row.blocked_date)}</div>
                      <div className="text-xs text-slate-500">
                        {row.is_all_day ? 'All day' : `${clock(row.start_time)} – ${clock(row.end_time)}`}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-600">
                      {offices.length ? offices.join(', ') : 'Both offices'}
                      <br />
                      {calendars.length ? calendars.map(enquiryLabel).join(', ') : 'Every calendar'}
                    </td>
                    <td className="px-3 py-3">
                      <form action={toggleBlockedTime}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="is_active" value={row.is_active ? '1' : '0'} />
                        <button className="text-sm font-medium text-brand-800 hover:underline" type="submit">
                          {row.is_active ? 'Active — turn off' : 'Off — turn on'}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
