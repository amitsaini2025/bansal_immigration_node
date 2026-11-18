'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { BLOCK_ENQUIRY_TYPES, STATUSES } from '@/lib/admin/appointments';
import { getDb } from '@/lib/db';

export async function updateAppointmentStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const status = String(formData.get('status') || '');
  const reason = String(formData.get('cancellation_reason') || '').trim();
  const back = `/admin/appointments/${id}`;
  if (!Number.isInteger(id) || id <= 0 || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    redirect(`${back}?error=Could%20not%20update%20that%20appointment.`);
  }

  const db = getDb();
  if (status === 'confirmed') {
    await db.query(
      `UPDATE enhanced_appointments
       SET status = 'confirmed', confirmed_at = COALESCE(confirmed_at, NOW()), updated_at = NOW()
       WHERE id = ?`,
      [id]
    );
  } else if (status === 'cancelled') {
    await db.query(
      `UPDATE enhanced_appointments
       SET status = 'cancelled', cancelled_at = NOW(), cancellation_reason = ?, updated_at = NOW()
       WHERE id = ?`,
      [reason || 'Cancelled by admin', id]
    );
  } else {
    await db.query('UPDATE enhanced_appointments SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);
  }
  redirect(`${back}?saved=Status%20updated`);
}

export async function saveAppointmentNotes(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const notes = String(formData.get('admin_notes') || '').trim();
  if (!Number.isInteger(id) || id <= 0) redirect('/admin/appointments?error=Appointment%20not%20found.');
  const db = getDb();
  await db.query('UPDATE enhanced_appointments SET admin_notes = ?, updated_at = NOW() WHERE id = ?', [notes || null, id]);
  redirect(`/admin/appointments/${id}?saved=Notes%20saved`);
}

export async function createBlockedTime(formData: FormData) {
  const admin = await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  const date = String(formData.get('blocked_date') || '');
  const allDay = formData.get('is_all_day') === '1';
  const start = String(formData.get('start_time') || '');
  const end = String(formData.get('end_time') || '');
  const blockType = String(formData.get('block_type') || 'unavailable');
  const location = String(formData.get('location') || '');
  const enquiry = String(formData.get('enquiry_type') || '');
  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !['unavailable', 'busy', 'holiday', 'maintenance'].includes(blockType)) {
    redirect('/admin/appointments/blocked?error=Enter%20a%20title%20and%20a%20valid%20date.');
  }
  if (!allDay && (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end) || end <= start)) {
    redirect('/admin/appointments/blocked?error=Enter%20a%20start%20and%20end%20time%2C%20or%20mark%20the%20block%20as%20all%20day.');
  }
  if (location && location !== 'melbourne' && location !== 'adelaide') {
    redirect('/admin/appointments/blocked?error=Choose%20a%20valid%20office.');
  }
  if (enquiry && !BLOCK_ENQUIRY_TYPES.includes(enquiry as (typeof BLOCK_ENQUIRY_TYPES)[number])) {
    redirect('/admin/appointments/blocked?error=Choose%20a%20valid%20calendar.');
  }

  const db = getDb();
  await db.query(
    `INSERT INTO blocked_times (
      title, description, blocked_date, start_time, end_time, is_all_day,
      recurrence_type, blocked_enquiry_types, blocked_locations, is_active, block_type, created_by, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'none', ?, ?, 1, ?, ?, NOW(), NOW())`,
    [
      title.slice(0, 255),
      String(formData.get('description') || '').trim() || null,
      date,
      allDay ? null : `${start}:00`,
      allDay ? null : `${end}:00`,
      allDay ? 1 : 0,
      enquiry ? JSON.stringify([enquiry]) : null,
      location ? JSON.stringify([location]) : null,
      blockType,
      admin.id,
    ]
  );
  redirect('/admin/appointments/blocked?saved=Time%20blocked.%20The%20public%20calendar%20will%20hide%20it.');
}

export async function toggleBlockedTime(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const active = formData.get('is_active') === '1' ? 0 : 1;
  if (!Number.isInteger(id) || id <= 0) redirect('/admin/appointments/blocked?error=Block%20not%20found.');
  const db = getDb();
  await db.query('UPDATE blocked_times SET is_active = ?, updated_at = NOW() WHERE id = ?', [active, id]);
  redirect(`/admin/appointments/blocked?saved=${active ? 'Block%20turned%20on' : 'Block%20turned%20off'}`);
}

export async function updateCalendarHours(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const start = String(formData.get('start_time') || '');
  const end = String(formData.get('end_time') || '');
  const duration = Number(formData.get('slot_duration_minutes'));
  const days = formData.getAll('days').map((day) => Number(day)).filter((day) => day >= 1 && day <= 7);
  const active = formData.get('is_active') === '1' ? 1 : 0;
  if (!Number.isInteger(id) || id <= 0 || !/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end) || end <= start) {
    redirect('/admin/appointments/calendar?error=Enter%20valid%20opening%20and%20closing%20times.');
  }
  if (!Number.isInteger(duration) || duration < 10 || duration > 180) {
    redirect('/admin/appointments/calendar?error=Slot%20length%20must%20be%20between%2010%20and%20180%20minutes.');
  }
  const db = getDb();
  await db.query(
    `UPDATE calendar_settings
     SET start_time = ?, end_time = ?, slot_duration_minutes = ?, days_of_week = ?, is_active = ?, updated_at = NOW()
     WHERE id = ?`,
    [`${start}:00`, `${end}:00`, duration, JSON.stringify(days.length ? days : [1, 2, 3, 4, 5]), active, id]
  );
  redirect('/admin/appointments/calendar?saved=Calendar%20hours%20saved.%20New%20bookings%20use%20these%20times.');
}
