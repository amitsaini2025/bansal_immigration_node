import { AppointmentSectionNav } from '@/components/admin/AppointmentSectionNav';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { clock, enquiryLabel } from '@/lib/admin/appointments';
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

function place(location: string, enquiry: string | null) {
  if (location === 'adelaide') return 'Adelaide office';
  if (location === 'adelaide_education_tourist') return 'Adelaide education and tourist';
  return `Melbourne · ${enquiryLabel(enquiry)}`;
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
        These hours decide the times offered on the public booking form. Free and paid consultations can use different lengths.
      </p>
      <AppointmentSectionNav current="/admin/appointments/calendar" />
      <Notice error={params.error} saved={params.saved} />
      <div className="mt-4 grid gap-4">
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            No calendar rows are saved yet. The booking form uses the standard office hours until a row is added in the current appointment system.
          </p>
        ) : (
          rows.map((row) => {
            const selected = days(row.days_of_week);
            return (
              <form key={row.id} action={updateCalendarHours} className="rounded-2xl border border-slate-200 bg-white p-5">
                <input type="hidden" name="id" value={row.id} />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-semibold text-slate-900">{place(row.location, row.enquiry_type)}</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                    {row.appointment_type} · {clock(row.start_time)}–{clock(row.end_time)}
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
                      defaultValue={row.slot_duration_minutes}
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
          })
        )}
      </div>
    </div>
  );
}
