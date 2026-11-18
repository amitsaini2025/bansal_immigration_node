import Link from 'next/link';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function count(sql: string, params: unknown[] = []) {
  const db = getDb();
  const [rows] = await db.query<any[]>(sql, params);
  return Number(rows[0]?.total || 0);
}

export default async function AdminHomePage() {
  const [unread, contacts, pendingAppointments, appointments, blogs, drafts, stories, afp, afpPaid, indian, indianPaid] = await Promise.all([
    count("SELECT COUNT(*) AS total FROM contacts WHERE status = 'unread'"),
    count('SELECT COUNT(*) AS total FROM contacts'),
    count("SELECT COUNT(*) AS total FROM enhanced_appointments WHERE status = 'pending'"),
    count('SELECT COUNT(*) AS total FROM enhanced_appointments'),
    count('SELECT COUNT(*) AS total FROM blogs'),
    count('SELECT COUNT(*) AS total FROM blogs WHERE status = 0'),
    count('SELECT COUNT(*) AS total FROM success_stories'),
    count('SELECT COUNT(*) AS total FROM afp_applications'),
    count("SELECT COUNT(*) AS total FROM afp_applications WHERE status = 'paid'"),
    count('SELECT COUNT(*) AS total FROM indian_police_applications'),
    count("SELECT COUNT(*) AS total FROM indian_police_applications WHERE status = 'paid'"),
  ]);

  const cards = [
    { href: '/admin/contacts', label: 'Unread contacts', value: unread, note: `${contacts} in total` },
    { href: '/admin/appointments', label: 'Pending appointments', value: pendingAppointments, note: `${appointments} booked` },
    { href: '/admin/blogs', label: 'Blog drafts', value: drafts, note: `${blogs} posts` },
    { href: '/admin/success-stories', label: 'Success stories', value: stories, note: 'Published and drafts' },
    { href: '/admin/afp', label: 'AFP applications', value: afp, note: `${afpPaid} paid` },
    { href: '/admin/indian-pcc', label: 'Indian PCC', value: indian, note: `${indianPaid} paid` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Home</h1>
      <p className="mt-1 text-sm text-slate-600">Enquiries, appointments, posts, stories, and police-check applications.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-300">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
            <p className="mt-1 text-sm text-slate-500">{card.note}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
