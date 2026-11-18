import type { RowDataPacket } from 'mysql2';
import { getDb } from '@/lib/db';
import { getEffectiveEnquiryTypeForBooking, isPaidService } from '@/lib/appointment/enquiryType';

const ADELAIDE_EDUCATION_TOURIST = new Set(['education', 'tourist']);

const FALLBACK_HOURS: Record<string, { start: string; end: string; interval: number }> = {
  tr: { start: '09:00', end: '17:00', interval: 30 },
  tourist: { start: '10:00', end: '16:00', interval: 45 },
  education: { start: '09:30', end: '18:00', interval: 60 },
  pr_complex: { start: '11:00', end: '15:00', interval: 30 },
  kunal: { start: '11:00', end: '15:00', interval: 30 },
  ajay: { start: '11:00', end: '15:00', interval: 30 },
  arun: { start: '09:00', end: '17:00', interval: 20 },
};

export type WorkingHours = {
  start: string;
  end: string;
  interval: number;
  daysOfWeek: number[] | null;
};

export type TimeSlot = { time: string; display: string };

type BlockRow = {
  blocked_date: string | Date;
  start_time: string | Date | null;
  end_time: string | Date | null;
  is_all_day: number | boolean;
  recurrence_type: string;
  recurrence_end_date: string | Date | null;
  blocked_enquiry_types: string | string[] | null;
  blocked_locations: string | string[] | null;
};

type AppointmentRow = {
  enquiry_type: string | null;
  appointment_time: string | Date;
  duration_minutes: number;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function melbourneToday(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Melbourne',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function toHi(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return `${pad(value.getHours())}:${pad(value.getMinutes())}`;
  const match = String(value).match(/(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : null;
}

function toYmd(value: string | Date): string {
  if (value instanceof Date) return formatDate(value);
  return String(value).slice(0, 10);
}

function minutes(hi: string): number {
  const [h, m] = hi.split(':').map(Number);
  return h * 60 + m;
}

function hiFromMinutes(total: number): string {
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

function displayTime(hi: string): string {
  const total = minutes(hi);
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return `${h12}:${pad(m)} ${suffix}`;
}

function parseJsonList(value: string | string[] | null): string[] | null {
  if (!value) return null;
  if (Array.isArray(value)) return value.map(String);
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : null;
  } catch {
    return null;
  }
}

function parseDays(value: unknown): number[] | null {
  if (!value) return null;
  if (Array.isArray(value)) return value.map((day) => Number(day));
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed.map((day) => Number(day)) : null;
  } catch {
    return null;
  }
}

function calendarLocation(location: string, enquiryType: string): string {
  if (location !== 'adelaide') return location;
  return ADELAIDE_EDUCATION_TOURIST.has(enquiryType) ? 'adelaide_education_tourist' : 'adelaide';
}

function sameAdelaideLane(a: string | null, b: string): boolean {
  return ADELAIDE_EDUCATION_TOURIST.has(a || '') === ADELAIDE_EDUCATION_TOURIST.has(b);
}

function weekdayIso(ymd: string): number {
  const [y, m, d] = ymd.split('-').map(Number);
  const js = new Date(y, m - 1, d).getDay();
  return js === 0 ? 7 : js;
}

function dateFromYmd(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export async function resolveSchedule(
  location: string,
  serviceType: string | null | undefined,
  specificService: string | null | undefined,
  isPaidInput?: boolean
): Promise<{ enquiryType: string; isPaid: boolean; hours: WorkingHours }> {
  const isPaid = isPaidInput ?? isPaidService(specificService);
  const enquiryType = getEffectiveEnquiryTypeForBooking(location, serviceType, isPaid);
  const hours = await workingHours(location, enquiryType, isPaid);
  return { enquiryType, isPaid, hours };
}

async function workingHours(location: string, enquiryType: string, isPaid: boolean): Promise<WorkingHours> {
  const settingsLocation = calendarLocation(location, enquiryType);
  const db = getDb();
  const params: Array<string> = [settingsLocation, isPaid ? 'paid' : 'free'];
  let sql = `SELECT start_time, end_time, slot_duration_minutes, days_of_week
    FROM calendar_settings
    WHERE location = ? AND appointment_type = ? AND is_active = 1`;

  if (settingsLocation === 'adelaide' || settingsLocation === 'adelaide_education_tourist') {
    sql += ' AND enquiry_type IS NULL';
  } else {
    sql += ' AND enquiry_type = ?';
    params.push(enquiryType);
  }
  sql += ' LIMIT 1';

  const [rows] = await db.query<RowDataPacket[]>(sql, params);
  const row = rows[0];
  if (row) {
    return {
      start: toHi(row.start_time) || '09:00',
      end: toHi(row.end_time) || '17:00',
      interval: Number(row.slot_duration_minutes) || 30,
      daysOfWeek: parseDays(row.days_of_week),
    };
  }

  if (location === 'adelaide') {
    return { start: '09:00', end: '17:00', interval: 30, daysOfWeek: null };
  }

  const fallback = FALLBACK_HOURS[enquiryType] || { start: '09:00', end: '17:00', interval: 30 };
  return { ...fallback, daysOfWeek: null };
}

function affectsLocation(blockedLocations: string[] | null, location: string): boolean {
  if (!blockedLocations || blockedLocations.length === 0) return true;
  return blockedLocations.includes(location);
}

function affectsEnquiry(blockedTypes: string[] | null, enquiryType: string): boolean {
  if (!blockedTypes || blockedTypes.length === 0) return true;
  return blockedTypes.includes(enquiryType);
}

function appliesToSlot(row: BlockRow, location: string, enquiryType: string): boolean {
  const locations = parseJsonList(row.blocked_locations);
  if (!affectsLocation(locations, location)) return false;
  const types = parseJsonList(row.blocked_enquiry_types);
  if (location === 'adelaide') {
    if (!types || types.length === 0) return true;
    return types.includes(enquiryType);
  }
  if (!types || types.length === 0) return true;
  return affectsEnquiry(types, enquiryType);
}

function matchesDate(row: BlockRow, ymd: string): boolean {
  const start = toYmd(row.blocked_date);
  const recurrence = row.recurrence_type || 'none';
  if (recurrence === 'none') return start === ymd;
  if (ymd < start) return false;
  const end = row.recurrence_end_date ? toYmd(row.recurrence_end_date) : null;
  if (end && ymd > end) return false;
  const check = dateFromYmd(ymd);
  const origin = dateFromYmd(start);
  if (recurrence === 'daily') return true;
  if (recurrence === 'weekly') return check.getDay() === origin.getDay();
  if (recurrence === 'monthly') return check.getDate() === origin.getDate();
  if (recurrence === 'yearly') {
    return check.getMonth() === origin.getMonth() && check.getDate() === origin.getDate();
  }
  return false;
}

function overlaps(startA: number, endA: number, startB: number, endB: number): boolean {
  return startA < endB && endA > startB;
}

export async function slotsForDate(input: {
  date: string;
  location: string;
  serviceType?: string | null;
  specificService?: string | null;
  isPaid?: boolean;
}): Promise<{
  success: true;
  available_slots: TimeSlot[];
  working_hours: { start: string; end: string; interval: number };
  days_of_week: number[] | null;
  scheduling_context: { enquiry_type: string; is_paid: boolean; location: string };
}> {
  const { enquiryType, isPaid, hours } = await resolveSchedule(
    input.location,
    input.serviceType,
    input.specificService,
    input.isPaid
  );
  const duration = hours.interval > 0 ? hours.interval : 30;
  const dayAllowed = !hours.daysOfWeek || hours.daysOfWeek.includes(weekdayIso(input.date));
  const available: TimeSlot[] = [];

  if (dayAllowed && input.date > melbourneToday()) {
    const blocks = await blocksTouching(input.date, input.date);
    const appointments = await appointmentsOn(input.date, input.location);
    let cursor = minutes(hours.start);
    const end = minutes(hours.end);
    while (cursor + duration <= end) {
      const time = hiFromMinutes(cursor);
      if (slotOpen(input.date, time, duration, enquiryType, input.location, blocks, appointments)) {
        available.push({ time, display: displayTime(time) });
      }
      cursor += hours.interval || duration;
    }
  }

  return {
    success: true,
    available_slots: available,
    working_hours: { start: hours.start, end: hours.end, interval: duration },
    days_of_week: hours.daysOfWeek,
    scheduling_context: { enquiry_type: enquiryType, is_paid: isPaid, location: input.location },
  };
}

export async function blockedDatesInRange(input: {
  startDate: string;
  endDate: string;
  location: string;
  serviceType?: string | null;
  specificService?: string | null;
  isPaid?: boolean;
}): Promise<string[]> {
  const { enquiryType, hours } = await resolveSchedule(
    input.location,
    input.serviceType,
    input.specificService,
    input.isPaid
  );
  const duration = hours.interval > 0 ? hours.interval : 30;
  const blocks = await blocksTouching(input.startDate, input.endDate);
  const appointments = await appointmentsBetween(input.startDate, input.endDate, input.location);
  const blocked: string[] = [];
  let cursor = dateFromYmd(input.startDate);
  const end = dateFromYmd(input.endDate);
  const today = melbourneToday();

  while (cursor <= end) {
    const ymd = formatDate(cursor);
    const dayAllowed = !hours.daysOfWeek || hours.daysOfWeek.includes(weekdayIso(ymd));
    let open = false;
    if (dayAllowed && ymd > today) {
      const dayAppointments = appointments.filter((row) => toYmd(row.appointment_date) === ymd);
      let minute = minutes(hours.start);
      const finish = minutes(hours.end);
      while (minute + duration <= finish) {
        if (slotOpen(ymd, hiFromMinutes(minute), duration, enquiryType, input.location, blocks, dayAppointments)) {
          open = true;
          break;
        }
        minute += hours.interval || duration;
      }
    }
    if (!open) blocked.push(ymd);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1);
  }

  return blocked;
}

function slotOpen(
  date: string,
  time: string,
  duration: number,
  enquiryType: string,
  location: string,
  blocks: BlockRow[],
  appointments: Array<AppointmentRow & { appointment_date?: string | Date }>
): boolean {
  const start = minutes(time);
  const end = start + duration;

  for (const block of blocks) {
    if (!matchesDate(block, date) || !appliesToSlot(block, location, enquiryType)) continue;
    if (block.is_all_day) return false;
    const blockStart = toHi(block.start_time);
    const blockEnd = toHi(block.end_time);
    if (!blockStart || !blockEnd) continue;
    if (overlaps(start, end, minutes(blockStart), minutes(blockEnd))) return false;
  }

  for (const appointment of appointments) {
    if (location === 'melbourne' && appointment.enquiry_type !== enquiryType) continue;
    if (location === 'adelaide' && !sameAdelaideLane(appointment.enquiry_type, enquiryType)) continue;
    const existing = toHi(appointment.appointment_time);
    if (!existing) continue;
    const existingStart = minutes(existing);
    const existingEnd = existingStart + (Number(appointment.duration_minutes) || 30);
    if (overlaps(start, end, existingStart, existingEnd)) return false;
  }

  return true;
}

async function blocksTouching(startDate: string, endDate: string): Promise<BlockRow[]> {
  const db = getDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT blocked_date, start_time, end_time, is_all_day, recurrence_type, recurrence_end_date,
            blocked_enquiry_types, blocked_locations
     FROM blocked_times
     WHERE is_active = 1
       AND (
         blocked_date BETWEEN ? AND ?
         OR (
           recurrence_type IS NOT NULL AND recurrence_type <> 'none'
           AND blocked_date <= ?
           AND (recurrence_end_date IS NULL OR recurrence_end_date >= ?)
         )
       )`,
    [startDate, endDate, endDate, startDate]
  );
  return rows as BlockRow[];
}

async function appointmentsOn(date: string, location: string) {
  const db = getDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT enquiry_type, appointment_time, duration_minutes
     FROM enhanced_appointments
     WHERE appointment_date = ? AND location = ? AND status NOT IN ('cancelled', 'no_show')`,
    [date, location]
  );
  return rows as AppointmentRow[];
}

async function appointmentsBetween(startDate: string, endDate: string, location: string) {
  const db = getDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT appointment_date, enquiry_type, appointment_time, duration_minutes
     FROM enhanced_appointments
     WHERE appointment_date BETWEEN ? AND ? AND location = ? AND status NOT IN ('cancelled', 'no_show')`,
    [startDate, endDate, location]
  );
  return rows as Array<AppointmentRow & { appointment_date: string | Date }>;
}

export async function isSlotBookable(input: {
  date: string;
  time: string;
  location: string;
  serviceType?: string | null;
  specificService?: string | null;
}): Promise<{ ok: boolean; enquiryType: string; isPaid: boolean; duration: number }> {
  const schedule = await resolveSchedule(input.location, input.serviceType, input.specificService);
  const result = await slotsForDate({
    date: input.date,
    location: input.location,
    serviceType: input.serviceType,
    specificService: input.specificService,
    isPaid: schedule.isPaid,
  });
  const match = result.available_slots.some((slot) => slot.time === input.time);
  return {
    ok: match,
    enquiryType: schedule.enquiryType,
    isPaid: schedule.isPaid,
    duration: result.working_hours.interval,
  };
}
