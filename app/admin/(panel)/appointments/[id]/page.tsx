import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { clock, dayLabel, enquiryLabel, serviceLabel, statusLabel, STATUSES } from '@/lib/admin/appointments';
import { formatWhen, money } from '@/lib/admin/format';
import { getDb } from '@/lib/db';
import { saveAppointmentNotes, updateAppointmentStatus } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AppointmentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const appointmentId = Number(id);
  if (!Number.isInteger(appointmentId) || appointmentId <= 0) notFound();
  const db = getDb();
  const [rows] = await db.query<any[]>('SELECT * FROM enhanced_appointments WHERE id = ? LIMIT 1', [appointmentId]);
  const appointment = rows[0];
  if (!appointment) notFound();

  const fields: Array<[string, string]> = [
    ['Email', appointment.email],
    ['Phone', appointment.phone],
    ['Office', appointment.location],
    ['Meeting', String(appointment.meeting_type || '').replace(/-/g, ' ')],
    ['Language', appointment.preferred_language],
    ['Calendar', enquiryLabel(appointment.enquiry_type)],
    ['Service', serviceLabel(appointment.service_type)],
    ['Consultation', serviceLabel(appointment.specific_service)],
    ['When', `${dayLabel(appointment.appointment_date)} at ${clock(appointment.appointment_time)}`],
    ['Duration', `${appointment.duration_minutes} minutes`],
    ['Fee', appointment.is_paid ? money(appointment.final_amount || appointment.amount) : 'Free'],
    ['Booked', formatWhen(appointment.created_at)],
  ];

  return (
    <div className="max-w-3xl">
      <Link href="/admin/appointments" className="text-sm text-brand-800 hover:underline">
        Back to appointments
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">{appointment.full_name}</h1>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
          {statusLabel(appointment.status)}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-600">Appointment #{appointment.id}</p>
      <Notice error={query.error} saved={query.saved} />
      <dl className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900">{value || '—'}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-700">Enquiry details</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{appointment.enquiry_details}</p>
      </div>
      <form action={updateAppointmentStatus} className="mt-4 flex flex-wrap items-end gap-2 rounded-2xl border border-slate-200 bg-white p-5">
        <input type="hidden" name="id" value={appointment.id} />
        <label className="text-sm text-slate-700">
          Status
          <select name="status" defaultValue={appointment.status} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm">
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {statusLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-56 flex-1 text-sm text-slate-700">
          Cancellation reason
          <input
            name="cancellation_reason"
            defaultValue={appointment.cancellation_reason || ''}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Used when status is Cancelled"
          />
        </label>
        <button className={secondaryButtonClass} type="submit">
          Save status
        </button>
      </form>
      <form action={saveAppointmentNotes} className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <input type="hidden" name="id" value={appointment.id} />
        <label className="block text-sm font-medium text-slate-700" htmlFor="admin_notes">
          Admin notes
        </label>
        <textarea
          id="admin_notes"
          name="admin_notes"
          rows={4}
          defaultValue={appointment.admin_notes || ''}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button className={`${secondaryButtonClass} mt-3`} type="submit">
          Save notes
        </button>
      </form>
    </div>
  );
}
