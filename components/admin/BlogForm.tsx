import { buttonClass, fieldClass, labelClass, secondaryButtonClass } from '@/components/admin/ui';
import { deleteBlog, saveBlog } from '@/app/admin/(panel)/blogs/actions';

export type BlogFormValues = {
  id?: number;
  title?: string | null;
  slug?: string | null;
  short_description?: string | null;
  description?: string | null;
  image?: string | null;
  image_alt?: string | null;
  pdf_doc?: string | null;
  youtube_url?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  author?: string | null;
  status?: number | boolean | null;
  featured?: number | boolean | null;
};

function on(value: unknown) {
  return value === true || value === 1 || value === '1';
}

export function BlogForm({ blog }: { blog?: BlogFormValues }) {
  return (
    <form action={saveBlog} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      {blog?.id ? <input type="hidden" name="id" value={blog.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Title
          <input name="title" required defaultValue={blog?.title || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Slug
          <input name="slug" defaultValue={blog?.slug || ''} placeholder="Leave blank to generate" className={fieldClass} />
        </label>
      </div>
      <label className={labelClass}>
        Summary
        <textarea name="short_description" required rows={3} defaultValue={blog?.short_description || ''} className={fieldClass} />
      </label>
      <label className={labelClass}>
        Body HTML
        <textarea name="description" required rows={16} defaultValue={blog?.description || ''} className={fieldClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Author
          <input name="author" defaultValue={blog?.author || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          YouTube URL
          <input name="youtube_url" defaultValue={blog?.youtube_url || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Image
          <input name="image" type="file" accept="image/*" className={fieldClass} />
          {blog?.image ? <span className="mt-1 block text-xs text-slate-500">Current: {blog.image}</span> : null}
        </label>
        <label className={labelClass}>
          Image alt text
          <input name="image_alt" defaultValue={blog?.image_alt || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          PDF
          <input name="pdf" type="file" accept="application/pdf" className={fieldClass} />
          {blog?.pdf_doc ? <span className="mt-1 block text-xs text-slate-500">Current: {blog.pdf_doc}</span> : null}
        </label>
        <label className={labelClass}>
          Meta title
          <input name="meta_title" defaultValue={blog?.meta_title || ''} className={fieldClass} />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Meta description
          <textarea name="meta_description" rows={2} defaultValue={blog?.meta_description || ''} className={fieldClass} />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Meta keywords
          <input name="meta_keywords" defaultValue={blog?.meta_keywords || ''} className={fieldClass} />
        </label>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="status" value="1" defaultChecked={on(blog?.status)} />
          Published
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="featured" value="1" defaultChecked={on(blog?.featured)} />
          Featured
        </label>
      </div>
      <button className={buttonClass} type="submit">
        Save post
      </button>
    </form>
  );
}

export function DeleteBlogForm({ id }: { id: number }) {
  return (
    <form action={deleteBlog} className="mt-4 rounded-2xl border border-red-200 bg-white p-5">
      <input type="hidden" name="id" value={id} />
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" name="confirm" value="yes" />
        Delete this post
      </label>
      <button className={`${secondaryButtonClass} mt-3 border-red-300 text-red-700`} type="submit">
        Delete
      </button>
    </form>
  );
}
