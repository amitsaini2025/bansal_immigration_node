import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { formatWhen } from '@/lib/admin/format';
import { getDb } from '@/lib/db';
import { updateContactStatus } from '../actions';

export const dynamic = 'force-dynamic';

const STATUSES = ['unread', 'read', 'resolved', 'archived'];

export default async function ContactDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const contactId = Number(id);
  if (!Number.isInteger(contactId) || contactId <= 0) notFound();
  const db = getDb();
  const [rows] = await db.query<any[]>('SELECT * FROM contacts WHERE id = ? LIMIT 1', [contactId]);
  const contact = rows[0];
  if (!contact) notFound();
  if (contact.status === 'unread') {
    await db.query("UPDATE contacts SET status = 'read', updated_at = NOW() WHERE id = ? AND status = 'unread'", [contactId]);
    contact.status = 'read';
  }

  const fields = [
    ['Email', contact.contact_email],
    ['Phone', contact.contact_phone],
    ['Source', contact.form_source],
    ['Variant', contact.form_variant],
    ['IP address', contact.ip_address],
    ['Received', formatWhen(contact.created_at)],
  ];

  return (
    <div className="max-w-3xl">
      <Link href="/admin/contacts" className="text-sm text-brand-800 hover:underline">
        Back to contacts
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">{contact.name}</h1>
      <p className="mt-1 text-sm text-slate-600">{contact.subject}</p>
      <Notice error={query.error} saved={query.saved} />
      <dl className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900">{value || '—'}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-700">Message</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{contact.message}</p>
      </div>
      <form action={updateContactStatus} className="mt-4 flex flex-wrap items-center gap-2">
        <input type="hidden" name="id" value={contact.id} />
        <select name="status" defaultValue={contact.status} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button className={secondaryButtonClass} type="submit">
          Save status
        </button>
      </form>
    </div>
  );
}
