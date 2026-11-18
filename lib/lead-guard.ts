import type { Pool, RowDataPacket } from "mysql2/promise";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const WEB_ADDRESS =
  /(?:https?:\/\/|www\.)|(?:[a-z0-9-]+\.)+(?:com|net|org|info|biz|xyz|top|shop|online|site|ru|cn|au|uk|in)\b/i;

export const LEAD_LIMITS = {
  name: 100,
  subject: 250,
  message: 5000,
  email: 254,
  phoneDigitsMin: 8,
  phoneDigitsMax: 15,
  recentWindowMinutes: 30,
  recentMax: 3,
} as const;

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function looksLikeWebAddress(value: string): boolean {
  return WEB_ADDRESS.test(value);
}

export function validatePersonName(value: string, label: string): string | null {
  const name = value.trim();
  if (!name) return `Please provide your ${label}.`;
  if (name.length > LEAD_LIMITS.name) {
    return `Please keep the ${label} under ${LEAD_LIMITS.name} characters.`;
  }
  if (looksLikeWebAddress(name)) {
    return `Please enter a ${label} without a website address.`;
  }
  return null;
}

export function validateEmail(value: string, required: boolean): string | null {
  const email = value.trim();
  if (!email) return required ? "Please provide a valid email address." : null;
  if (email.length > LEAD_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return "Please provide a valid email address.";
  }
  return null;
}

export function validatePhone(value: string, required: boolean): string | null {
  const phone = value.trim();
  if (!phone) return required ? "Please provide a valid phone number." : null;
  const digits = phoneDigits(phone);
  if (digits.length < LEAD_LIMITS.phoneDigitsMin || digits.length > LEAD_LIMITS.phoneDigitsMax) {
    return "Please provide a valid phone number.";
  }
  return null;
}

export function validateLeadText(subject: string, message: string): string | null {
  const cleanSubject = subject.trim();
  if (cleanSubject.length > LEAD_LIMITS.subject) {
    return `Please keep the subject under ${LEAD_LIMITS.subject} characters.`;
  }
  if (looksLikeWebAddress(cleanSubject)) {
    return "Please enter a subject without a website address.";
  }
  if (message.trim().length > LEAD_LIMITS.message) {
    return `Please keep the message under ${LEAD_LIMITS.message} characters.`;
  }
  return null;
}

export async function recentSubmissionCount(
  db: Pool,
  table: "contacts" | "office_visit_forms",
  ip: string,
  email: string,
  phone: string,
): Promise<number> {
  const emailColumn = table === "contacts" ? "contact_email" : "email";
  const phoneColumn = table === "contacts" ? "contact_phone" : "phone";
  const digits = phoneDigits(phone);
  const normalisedEmail = email.trim().toLowerCase();
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM ${table}
     WHERE created_at >= (NOW() - INTERVAL ${LEAD_LIMITS.recentWindowMinutes} MINUTE)
     AND (
       (? <> '' AND ip_address = ?)
       OR (? <> '' AND ${emailColumn} <> '' AND LOWER(${emailColumn}) = ?)
       OR (? <> '' AND REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${phoneColumn}, ' ', ''), '+', ''), '-', ''), '(', ''), ')', '') = ?)
     )`,
    [ip, ip, normalisedEmail, normalisedEmail, digits, digits]
  );
  return Number(rows[0]?.total ?? 0);
}

export function tooManyRecentLeads(count: number): boolean {
  return count >= LEAD_LIMITS.recentMax;
}

export const REPEAT_LIMIT_MESSAGE =
  "You have already sent a few enquiries recently. Please call our Melbourne office on +61 3 9602 1330, or try again in half an hour.";
