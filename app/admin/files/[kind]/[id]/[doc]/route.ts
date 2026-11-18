import { createReadStream } from 'fs';
import { Readable } from 'stream';
import path from 'path';
import { requireAdmin } from '@/lib/admin/auth';
import { resolvePoliceFile } from '@/lib/admin/uploads';
import { getDb } from '@/lib/db';

const DOCS: Record<string, string[]> = {
  afp: ['primary_id', 'secondary_id', 'address_proof', 'additional_docs'],
  indian: [
    'primary_id',
    'secondary_id',
    'address_proof',
    'additional_docs',
    'visa_status_doc',
    'oci_card_doc',
    'india_address_doc',
    'australia_address_doc',
  ],
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ kind: string; id: string; doc: string }> }
) {
  await requireAdmin();
  const { kind, id, doc } = await context.params;
  if ((kind !== 'afp' && kind !== 'indian') || !DOCS[kind].includes(doc)) {
    return new Response('Not found', { status: 404 });
  }
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId) || applicationId <= 0) return new Response('Not found', { status: 404 });
  const table = kind === 'afp' ? 'afp_applications' : 'indian_police_applications';
  const db = getDb();
  const [rows] = await db.query<any[]>(`SELECT \`${doc}_path\` AS file_path FROM ${table} WHERE id = ? LIMIT 1`, [applicationId]);
  const relative = rows[0]?.file_path;
  if (!relative) return new Response('Not found', { status: 404 });
  const filePath = await resolvePoliceFile(String(relative));
  if (!filePath) return new Response('Not found', { status: 404 });
  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
  const filename = path.basename(filePath).replace(/["\r\n]/g, '');
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
