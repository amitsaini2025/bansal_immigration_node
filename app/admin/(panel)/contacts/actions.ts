'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { getDb } from '@/lib/db';

const STATUSES = ['unread', 'read', 'resolved', 'archived'] as const;

function idsFrom(formData: FormData) {
  return formData
    .getAll('ids')
    .map((value) => Number(value))
    .filter((id) => Number.isInteger(id) && id > 0);
}

export async function updateContactStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const status = String(formData.get('status') || '');
  if (!Number.isInteger(id) || id <= 0 || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    redirect('/admin/contacts?error=Could%20not%20update%20that%20contact.');
  }
  const db = getDb();
  await db.query('UPDATE contacts SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);
  redirect(`/admin/contacts/${id}?saved=Status%20updated`);
}

export async function bulkUpdateContactStatus(formData: FormData) {
  await requireAdmin();
  const status = String(formData.get('status') || '');
  const ids = idsFrom(formData);
  const back = String(formData.get('back') || '/admin/contacts');
  if (!STATUSES.includes(status as (typeof STATUSES)[number]) || ids.length === 0) {
    redirect(`${back}${back.includes('?') ? '&' : '?'}error=Select%20at%20least%20one%20contact.`);
  }
  const db = getDb();
  const marks = ids.map(() => '?').join(',');
  await db.query(`UPDATE contacts SET status = ?, updated_at = NOW() WHERE id IN (${marks})`, [status, ...ids]);
  redirect(`${back}${back.includes('?') ? '&' : '?'}saved=Updated%20${ids.length}%20contact${ids.length === 1 ? '' : 's'}`);
}
