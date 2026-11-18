import Link from 'next/link';

const LINKS = [
  { href: '/admin/appointments', label: 'Bookings' },
  { href: '/admin/appointments/blocked', label: 'Blocked times' },
  { href: '/admin/appointments/calendar', label: 'Calendar hours' },
];

export function AppointmentSectionNav({ current }: { current: string }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {LINKS.map((link) => {
        const active = current === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              active ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
