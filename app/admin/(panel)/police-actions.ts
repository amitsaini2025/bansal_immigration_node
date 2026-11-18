'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { removePoliceDirectory } from '@/lib/admin/uploads';
import { getDb } from '@/lib/db';

type Kind = 'afp' | 'indian';

function table(kind: Kind) {
  return kind === 'afp' ? 'afp_applications' : 'indian_police_applications';
}

function listPath(kind: Kind) {
  return kind === 'afp' ? '/admin/afp' : '/admin/indian-pcc';
}

async function load(kind: Kind, id: number) {
  const db = getDb();
  const [rows] = await db.query<any[]>(`SELECT id, reference FROM ${table(kind)} WHERE id = ? LIMIT 1`, [id]);
  return rows[0] as { id: number; reference: string } | undefined;
}

export async function deleteApplication(formData: FormData) {
  await requireAdmin();
  const kind = formData.get('kind') === 'indian' ? 'indian' : 'afp';
  const id = Number(formData.get('id'));
  const back = `${listPath(kind)}/${id}`;
  if (formData.get('confirm') !== 'yes' || !Number.isInteger(id) || id <= 0) {
    redirect(`${back}?error=Tick%20confirm%20before%20deleting.`);
  }
  const row = await load(kind, id);
  if (!row) redirect(listPath(kind));
  await removePoliceDirectory(kind, String(row.reference));
  const db = getDb();
  await db.query(`DELETE FROM ${table(kind)} WHERE id = ?`, [id]);
  redirect(`${listPath(kind)}?saved=Application%20deleted`);
}

export async function deleteOldApplications(formData: FormData) {
  await requireAdmin();
  const kind = formData.get('kind') === 'indian' ? 'indian' : 'afp';
  if (formData.get('confirm') !== 'yes') {
    redirect(`${listPath(kind)}?error=Tick%20confirm%20before%20deleting%20old%20applications.`);
  }
  const db = getDb();
  const [rows] = await db.query<any[]>(
    `SELECT id, reference FROM ${table(kind)} WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH)`
  );
  for (const row of rows) {
    await removePoliceDirectory(kind, String(row.reference));
    await db.query(`DELETE FROM ${table(kind)} WHERE id = ?`, [row.id]);
  }
  redirect(`${listPath(kind)}?saved=Deleted%20${rows.length}%20application${rows.length === 1 ? '' : 's'}`);
}
