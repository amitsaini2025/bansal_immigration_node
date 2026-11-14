import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  'study-australia': 'Study in Australia',
  'visitor-visa': 'Visitor Visas',
  'skilled-migration': 'Skilled Migration',
  'migrate-to-australia': 'Migrate to Australia',
  'family-visa': 'Family Visas',
  'employer-sponsored': 'Employer Sponsored',
  'business-visa': 'Business Visas',
  'appeals': 'Appeals & Tribunals',
  'citizenship': 'Citizenship',
  'skill-assessment': 'Skill Assessment',
  'other-countries': 'Other Countries',
  'celebrity-visas': 'Celebrity Visas',
  'bridging-return-visas': 'Bridging & Return Visas',
  'transit-special-purpose': 'Transit & Special Purpose',
  'medical-humanitarian': 'Medical & Humanitarian',
  'maritime-crew': 'Maritime & Crew',
  'blogs': 'Blogs & Articles',
  'success-stories': 'Success Stories',
  'team': 'Our Team',
  'about': 'About Us',
  'contact': 'Contact Us',
};

export function getCategoryLabel(category: string): string {
  if (CATEGORY_LABELS[category]) return CATEGORY_LABELS[category];
  return category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bansalimmigration.com.au',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://bansalimmigration.com.au${item.href}` } : {}),
      })),
    ],
  };

  return (
    <div className={`w-full ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center overflow-x-auto py-3 text-xs sm:text-sm text-slate-500 font-medium no-scrollbar"
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-slate-500 hover:text-brand-800 transition-colors font-medium"
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 hover:text-brand-800 shrink-0" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-1.5 sm:space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-brand-800 transition-colors whitespace-nowrap font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-slate-900 font-semibold truncate max-w-[220px] sm:max-w-md md:max-w-lg"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
