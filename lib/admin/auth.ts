import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';

const COOKIE = 'bic_admin';
const MAX_AGE = 60 * 60 * 12;

type SessionUser = { id: number; name: string; email: string };

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 16) {
    throw new Error('ADMIN_SESSION_SECRET is missing');
  }
  return value;
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function createSession(userId: number) {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + MAX_AGE * 1000 })
  ).toString('base64url');
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function readSessionUserId(): Promise<number | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!safeEqual(mac, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!data?.uid || !data?.exp || Number(data.exp) < Date.now()) return null;
    return Number(data.uid);
  } catch {
    return null;
  }
}

export async function currentAdmin(): Promise<SessionUser | null> {
  const id = await readSessionUserId();
  if (!id) return null;
  const db = getDb();
  const [rows] = await db.query<any[]>(
    'SELECT id, name, email, role, status, is_archived FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  const user = rows[0];
  if (!user || user.role !== 'admin' || Number(user.status) !== 1 || Number(user.is_archived) === 1) {
    return null;
  }
  return { id: Number(user.id), name: user.name, email: user.email };
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await currentAdmin();
  if (!user) redirect('/admin/login');
  return user;
}

export async function loginWithPassword(email: string, password: string): Promise<string | null> {
  const db = getDb();
  const [rows] = await db.query<any[]>(
    'SELECT id, password, role, status, is_archived FROM users WHERE email = ? LIMIT 1',
    [email.trim().toLowerCase()]
  );
  const user = rows[0];
  if (!user || user.role !== 'admin' || Number(user.status) !== 1 || Number(user.is_archived) === 1) {
    return 'Those details do not match an admin account.';
  }
  const hash = String(user.password || '').replace(/^\$2y\$/, '$2a$');
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return 'Those details do not match an admin account.';
  await createSession(Number(user.id));
  return null;
}
