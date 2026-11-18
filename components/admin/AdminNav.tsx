'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Home' },
  { href: '/admin/contacts', label: 'Contacts' },
  { href: '/admin/blogs', label: 'Blogs' },
  { href: '/admin/success-stories', label: 'Success stories' },
  { href: '/admin/afp', label: 'AFP checks' },
  { href: '/admin/indian-pcc', label: 'Indian PCC' },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const active = link.href === '/admin' ? path === '/admin' : path.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              active ? 'bg-brand-800 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
