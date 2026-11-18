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

async function uniqueSlug(slug: string, ignoreId?: number) {
  const db = getDb();
  let candidate = slugify(slug);
  let n = 2;
  while (true) {
    const [rows] = await db.query<any[]>('SELECT id FROM blogs WHERE slug = ? LIMIT 1', [candidate]);
    if (!rows.length || (ignoreId && Number(rows[0].id) === ignoreId)) return candidate;
    candidate = `${slugify(slug)}-${n++}`;
  }
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim();
}

export async function saveBlog(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id') || 0);
  const title = text(formData, 'title');
  const shortDescription = text(formData, 'short_description');
  const description = String(formData.get('description') || '').trim();
  const back = id ? `/admin/blogs/${id}` : '/admin/blogs/new';
  if (!title || !shortDescription || !description) {
    redirect(`${back}?error=Title,%20summary,%20and%20body%20are%20required.`);
  }

  try {
    const imageFile = formData.get('image');
    const pdfFile = formData.get('pdf');
    const image = imageFile instanceof File ? await savePublicImage(imageFile, 'blog') : null;
    const pdf = pdfFile instanceof File ? await savePublicPdf(pdfFile, 'blog') : null;
    const status = formData.get('status') === '1' ? 1 : 0;
    const featured = formData.get('featured') === '1' ? 1 : 0;
    const slug = await uniqueSlug(text(formData, 'slug') || title, id || undefined);
    const db = getDb();
    const values = {
      title,
      slug,
      short_description: shortDescription,
      description,
      image_alt: text(formData, 'image_alt') || null,
      youtube_url: text(formData, 'youtube_url') || null,
      meta_title: text(formData, 'meta_title') || null,
      meta_description: text(formData, 'meta_description') || null,
      meta_keywords: text(formData, 'meta_keywords') || null,
      author: text(formData, 'author') || null,
      status,
      featured,
    };

    if (id) {
      await db.query(
        `UPDATE blogs SET title=?, slug=?, short_description=?, description=?, image=COALESCE(?, image), image_alt=?,
         pdf_doc=COALESCE(?, pdf_doc), youtube_url=?, meta_title=?, meta_description=?, meta_keywords=?, author=?,
         status=?, featured=?, published_at = IF(? = 1, COALESCE(published_at, NOW()), published_at), updated_at=NOW()
         WHERE id=?`,
        [
          values.title,
          values.slug,
          values.short_description,
          values.description,
          image,
          values.image_alt,
          pdf,
          values.youtube_url,
          values.meta_title,
          values.meta_description,
          values.meta_keywords,
          values.author,
          values.status,
          values.featured,
          values.status,
          id,
        ]
      );
      redirect(`/admin/blogs/${id}?saved=Post%20saved`);
    }

    const [result] = await db.query<any>(
      `INSERT INTO blogs (title, slug, short_description, description, image, image_alt, pdf_doc, youtube_url,
        meta_title, meta_description, meta_keywords, author, status, featured, published_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, IF(? = 1, NOW(), NULL), NOW(), NOW())`,
      [
        values.title,
        values.slug,
        values.short_description,
        values.description,
        image,
        values.image_alt,
        pdf,
        values.youtube_url,
        values.meta_title,
        values.meta_description,
        values.meta_keywords,
        values.author,
        values.status,
        values.featured,
        values.status,
      ]
    );
    redirect(`/admin/blogs/${result.insertId}?saved=Post%20created`);
  } catch (error) {
    if (isRedirect(error)) throw error;
    const message = error instanceof Error ? error.message : 'Could not save the post.';
    redirect(`${back}?error=${encodeURIComponent(message)}`);
  }
}

export async function deleteBlog(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  if (formData.get('confirm') !== 'yes' || !Number.isInteger(id) || id <= 0) {
    redirect(`/admin/blogs/${id || ''}?error=Tick%20confirm%20before%20deleting.`);
  }
  const db = getDb();
  await db.query('DELETE FROM blogs WHERE id = ?', [id]);
  redirect('/admin/blogs?saved=Post%20deleted');
}
