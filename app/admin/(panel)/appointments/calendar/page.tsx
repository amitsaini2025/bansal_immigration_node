import { AppointmentSectionNav } from '@/components/admin/AppointmentSectionNav';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { clock, MELBOURNE_CALENDARS } from '@/lib/admin/appointments';
import { getDb } from '@/lib/db';
import { updateCalendarHours } from '../actions';

export const dynamic = 'force-dynamic';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function days(value: unknown): number[] {
  if (Array.isArray(value)) return value.map(Number);
  try {
    const parsed = JSON.parse(String(value || '[]'));
    return Array.isArray(parsed) ? parsed.map(Number) : [1, 2, 3, 4, 5];
  } catch {
    return [1, 2, 3, 4, 5];
  }
}

function timeInput(value: unknown) {
  if (!value) return '';
  if (value instanceof Date) {
    return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
  }
  return String(value).slice(0, 5);
}

function HoursForm({ row }: { row: Record<string, unknown> }) {
  const selected = days(row.days_of_week);
  return (
    <form action={updateCalendarHours} className="rounded-xl border border-slate-200 p-4">
      <input type="hidden" name="id" value={String(row.id)} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold capitalize text-slate-900">{String(row.appointment_type)} appointments</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {clock(row.start_time)}–{clock(row.end_time)} · {String(row.slot_duration_minutes)} min
          {row.is_active ? '' : ' · inactive'}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <label className="text-sm text-slate-700">
          Opens
          <input type="time" name="start_time" defaultValue={timeInput(row.start_time)} required className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-700">
          Closes
          <input type="time" name="end_time" defaultValue={timeInput(row.end_time)} required className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-700">
          Slot minutes
          <input
            type="number"
            name="slot_duration_minutes"
            min={10}
            max={180}
            defaultValue={Number(row.slot_duration_minutes)}
            required
            className="mt-1 block w-28 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>
      <fieldset className="mt-3">
        <legend className="text-sm text-slate-700">Open days</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {DAY_NAMES.map((name, index) => (
            <label key={name} className="flex items-center gap-1 text-sm text-slate-700">
              <input type="checkbox" name="days" value={index + 1} defaultChecked={selected.includes(index + 1)} />
              {name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" name="is_active" value="1" defaultChecked={Boolean(row.is_active)} />
        Active
      </label>
      <button className={`${secondaryButtonClass} mt-3`} type="submit">
        Save hours
      </button>
    </form>
  );
}

export default async function CalendarHoursPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const db = getDb();
  const [rows] = await db.query<any[]>(
    `SELECT id, location, enquiry_type, appointment_type, start_time, end_time, slot_duration_minutes, days_of_week, is_active
     FROM calendar_settings
     ORDER BY location, enquiry_type, appointment_type`
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Calendar hours</h1>
      <p className="mt-1 text-sm text-slate-600">
        Adelaide has one office calendar plus an education and tourist calendar. Melbourne has a calendar for JRP, Vijay, Education, Ajay, and Arun. Free and paid consultations can use different lengths.
      </p>
      <AppointmentSectionNav current="/admin/appointments/calendar" />
      <Notice error={params.error} saved={params.saved} />
      <div className="mt-4 grid gap-4">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-red-700 px-5 py-4 text-white">
            <h2 className="text-lg font-semibold">Adelaide Office</h2>
            <p className="mt-1 text-sm text-red-100">All Adelaide enquiries except education and tourist.</p>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-2">
            {rows.filter((row) => row.location === 'adelaide' && !row.enquiry_type).map((row) => (
              <HoursForm key={row.id} row={row} />
            ))}
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-red-700 px-5 py-4 text-white">
            <h2 className="text-lg font-semibold">Adelaide Education/Tourist Calendar</h2>
            <p className="mt-1 text-sm text-red-100">Adelaide education and tourist enquiries only.</p>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-2">
            {rows.filter((row) => row.location === 'adelaide_education_tourist').map((row) => (
              <HoursForm key={row.id} row={row} />
            ))}
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-blue-700 px-5 py-4 text-white">
            <h2 className="text-lg font-semibold">Melbourne Office</h2>
            <p className="mt-1 text-sm text-blue-100">Separate timing for JRP, Vijay, Education, Ajay, and Arun.</p>
          </div>
          <div className="grid gap-6 p-5">
            {MELBOURNE_CALENDARS.map((calendar) => (
              <div key={calendar.key}>
                <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900" title={calendar.hover}>
                  {calendar.title}
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {rows
                    .filter((row) => row.location === 'melbourne' && row.enquiry_type === calendar.key)
                    .map((row) => (
                      <HoursForm key={row.id} row={row} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
