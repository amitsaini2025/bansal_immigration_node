'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { slugify } from '@/lib/admin/format';
import { savePublicImage, savePublicPdf } from '@/lib/admin/uploads';
import { getDb } from '@/lib/db';

function isRedirect(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    String((error as { digest?: string }).digest).startsWith('NEXT_REDIRECT')
  );
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim();
}

async function uniqueSlug(slug: string, ignoreId?: number) {
  const db = getDb();
  let candidate = slugify(slug);
  let n = 2;
  while (true) {
    const [rows] = await db.query<any[]>('SELECT id FROM success_stories WHERE slug = ? LIMIT 1', [candidate]);
    if (!rows.length || (ignoreId && Number(rows[0].id) === ignoreId)) return candidate;
    candidate = `${slugify(slug)}-${n++}`;
  }
}

export async function saveStory(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id') || 0);
  const title = text(formData, 'title');
  const excerpt = text(formData, 'excerpt');
  const content = String(formData.get('content') || '').trim();
  const clientName = text(formData, 'client_name');
  const visaType = text(formData, 'visa_type');
  const back = id ? `/admin/success-stories/${id}` : '/admin/success-stories/new';
  if (!title || !excerpt || !content || !clientName || !visaType) {
    redirect(`${back}?error=Title,%20excerpt,%20story,%20client,%20and%20visa%20type%20are%20required.`);
  }

  try {
    const imageFile = formData.get('image');
    const pdfFile = formData.get('pdf');
    const image = imageFile instanceof File ? await savePublicImage(imageFile, 'success-stories') : null;
    const pdf = pdfFile instanceof File ? await savePublicPdf(pdfFile, 'success-stories') : null;
    const status = formData.get('status') === '1' ? 1 : 0;
    const featured = formData.get('featured') === '1' ? 1 : 0;
    const slug = await uniqueSlug(text(formData, 'slug') || title, id || undefined);
    const successDate = text(formData, 'success_date') || null;
    const orderValue = Number(formData.get('order'));
    const db = getDb();
    let order = Number.isFinite(orderValue) ? orderValue : 0;
    if (!id && !formData.get('order')) {
      const [maxRows] = await db.query<any[]>('SELECT COALESCE(MAX(`order`), 0) AS maxOrder FROM success_stories');
      order = Number(maxRows[0]?.maxOrder || 0) + 1;
    }

    const shared = [
      title,
      slug,
      excerpt,
      content,
      clientName,
      text(formData, 'client_country') || null,
      visaType,
      image,
      text(formData, 'image_alt') || null,
      pdf,
      text(formData, 'youtube_url') || null,
      text(formData, 'meta_title') || null,
      text(formData, 'meta_description') || null,
      text(formData, 'meta_keywords') || null,
      status,
      featured,
      order,
      successDate,
    ];

    if (id) {
      await db.query(
        `UPDATE success_stories SET title=?, slug=?, excerpt=?, content=?, client_name=?, client_country=?, visa_type=?,
         image=COALESCE(?, image), image_alt=?, pdf_doc=COALESCE(?, pdf_doc), youtube_url=?, meta_title=?, meta_description=?,
         meta_keywords=?, status=?, featured=?, \`order\`=?, success_date=?, updated_at=NOW() WHERE id=?`,
        [...shared, id]
      );
      redirect(`/admin/success-stories/${id}?saved=Story%20saved`);
    }

    const [result] = await db.query<any>(
      `INSERT INTO success_stories (title, slug, excerpt, content, client_name, client_country, visa_type, image, image_alt,
        pdf_doc, youtube_url, meta_title, meta_description, meta_keywords, status, featured, \`order\`, success_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      shared
    );
    redirect(`/admin/success-stories/${result.insertId}?saved=Story%20created`);
  } catch (error) {
    if (isRedirect(error)) throw error;
    const message = error instanceof Error ? error.message : 'Could not save the story.';
    redirect(`${back}?error=${encodeURIComponent(message)}`);
  }
}

export async function deleteStory(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  if (formData.get('confirm') !== 'yes' || !Number.isInteger(id) || id <= 0) {
    redirect(`/admin/success-stories/${id || ''}?error=Tick%20confirm%20before%20deleting.`);
  }
  const db = getDb();
  await db.query('DELETE FROM success_stories WHERE id = ?', [id]);
  redirect('/admin/success-stories?saved=Story%20deleted');
}

export async function moveStory(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const direction = formData.get('direction') === 'up' ? -1 : 1;
  const db = getDb();
  const [rows] = await db.query<any[]>('SELECT id, `order` FROM success_stories ORDER BY `order` ASC, id DESC');
  const index = rows.findIndex((row) => Number(row.id) === id);
  const swapIndex = index + direction;
  if (index < 0 || swapIndex < 0 || swapIndex >= rows.length) redirect('/admin/success-stories');
  const current = rows[index];
  const other = rows[swapIndex];
  const currentOrder = Number(current.order);
  const otherOrder = Number(other.order);
  if (currentOrder === otherOrder) {
    const nextOrder = currentOrder + (direction === -1 ? -1 : 1);
    await db.query('UPDATE success_stories SET `order` = ?, updated_at = NOW() WHERE id = ?', [nextOrder, current.id]);
  } else {
    await db.query('UPDATE success_stories SET `order` = ?, updated_at = NOW() WHERE id = ?', [otherOrder, current.id]);
    await db.query('UPDATE success_stories SET `order` = ?, updated_at = NOW() WHERE id = ?', [currentOrder, other.id]);
  }
  redirect('/admin/success-stories?saved=Order%20updated');
}
