import { buttonClass, fieldClass, labelClass, secondaryButtonClass } from '@/components/admin/ui';
import { formatDateInput } from '@/lib/admin/format';
import { deleteStory, saveStory } from '@/app/admin/(panel)/success-stories/actions';

export type StoryFormValues = {
  id?: number;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  client_name?: string | null;
  client_country?: string | null;
  visa_type?: string | null;
  image?: string | null;
  image_alt?: string | null;
  pdf_doc?: string | null;
  youtube_url?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  status?: number | boolean | null;
  featured?: number | boolean | null;
  order?: number | null;
  success_date?: string | Date | null;
};

function on(value: unknown) {
  return value === true || value === 1 || value === '1';
}

export function StoryForm({ story }: { story?: StoryFormValues }) {
  return (
    <form action={saveStory} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      {story?.id ? <input type="hidden" name="id" value={story.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Title
          <input name="title" required defaultValue={story?.title || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Slug
          <input name="slug" defaultValue={story?.slug || ''} placeholder="Leave blank to generate" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Client name
          <input name="client_name" required defaultValue={story?.client_name || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Client country
          <input name="client_country" defaultValue={story?.client_country || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Visa type
          <input name="visa_type" required defaultValue={story?.visa_type || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Success date
          <input name="success_date" type="date" defaultValue={formatDateInput(story?.success_date)} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Order
          <input name="order" type="number" defaultValue={story?.order ?? ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          YouTube URL
          <input name="youtube_url" defaultValue={story?.youtube_url || ''} className={fieldClass} />
        </label>
      </div>
      <label className={labelClass}>
        Excerpt
        <textarea name="excerpt" required rows={3} defaultValue={story?.excerpt || ''} className={fieldClass} />
      </label>
      <label className={labelClass}>
        Story HTML
        <textarea name="content" required rows={14} defaultValue={story?.content || ''} className={fieldClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Image
          <input name="image" type="file" accept="image/*" className={fieldClass} />
          {story?.image ? <span className="mt-1 block text-xs text-slate-500">Current: {story.image}</span> : null}
        </label>
        <label className={labelClass}>
          Image alt text
          <input name="image_alt" defaultValue={story?.image_alt || ''} className={fieldClass} />
        </label>
        <label className={labelClass}>
          PDF
          <input name="pdf" type="file" accept="application/pdf" className={fieldClass} />
          {story?.pdf_doc ? <span className="mt-1 block text-xs text-slate-500">Current: {story.pdf_doc}</span> : null}
        </label>
        <label className={labelClass}>
          Meta title
          <input name="meta_title" defaultValue={story?.meta_title || ''} className={fieldClass} />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Meta description
          <textarea name="meta_description" rows={2} defaultValue={story?.meta_description || ''} className={fieldClass} />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Meta keywords
          <input name="meta_keywords" defaultValue={story?.meta_keywords || ''} className={fieldClass} />
        </label>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="status" value="1" defaultChecked={on(story?.status)} />
          Published
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="featured" value="1" defaultChecked={on(story?.featured)} />
          Featured
        </label>
      </div>
      <button className={buttonClass} type="submit">
        Save story
      </button>
    </form>
  );
}

export function DeleteStoryForm({ id }: { id: number }) {
  return (
    <form action={deleteStory} className="mt-4 rounded-2xl border border-red-200 bg-white p-5">
      <input type="hidden" name="id" value={id} />
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" name="confirm" value="yes" />
        Delete this story
      </label>
      <button className={`${secondaryButtonClass} mt-3 border-red-300 text-red-700`} type="submit">
        Delete
      </button>
    </form>
  );
}
