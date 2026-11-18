import pagesJson from '@/content/pages.json';
import indexJson from '@/content/index.json';

export interface Block {
  t: 'p' | 'h3' | 'ul' | 'ol' | 'table' | 'quote' | 'note' | 'buttons' | 'cards' | 'whyprocess';
  x?: string;
  label?: string;
  items?: { x: string; c?: string[]; label?: string; href?: string }[];
  head?: string[];
  rows?: string[][];
  whyTitle?: string;
  stepsTitle?: string;
  why?: { title: string; desc: string }[];
  steps?: { title: string; desc: string }[];
  cards?: { title: string; best: string; desc: string; href: string; cta: string }[];
}
export interface ContentSection {
  id: string;
  name: string;
  kind: string;
  h2: string;
  blocks: Block[];
}
export interface ContentPageData {
  path: string;
  category: string;
  isHub: boolean;
  name: string;
  primaryKeyword: string;
  keywords: string[];
  pageType: string;
  seo: { title: string; description: string; h1: string };
  hero: { badge: string; h1: string; intro: string[]; buttons: { label: string; href: string }[]; phone: boolean };
  /** ISO date (YYYY-MM-DD) shown as "Last updated". */
  updated?: string;
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  cta: { title?: string; text?: string };
  form: boolean;
}
export interface IndexEntry {
  path: string;
  name: string;
  category: string;
  isHub: boolean;
  order: number;
}

const pages = pagesJson as unknown as Record<string, ContentPageData>;
const index = indexJson as IndexEntry[];

export function getContent(path: string): ContentPageData | null {
  return pages[path] ?? null;
}

export function getChildren(category: string): IndexEntry[] {
  return index.filter((e) => e.category === category && !e.isHub);
}

export function getAllPaths(): string[] {
  return index.map((e) => e.path);
}

/** Hubs that already have their own page.tsx, so the dynamic route must not also build them. */
const DEDICATED_HUBS = new Set([
  'migrate-to-australia',
  'skilled-migration',
  'visitor-visa',
  'family-visa',
  'study-australia',
]);

/** Visa and service hubs built from content/pages.json. One entry per category index. */
export function getContentHubParams(): { category: string }[] {
  return index
    .filter((e) => e.isHub && e.path === `/${e.category}` && !DEDICATED_HUBS.has(e.category))
    .map((e) => ({ category: e.category }));
}

/** Visa and service articles built from content/pages.json. Paths are /category/slug. */
export function getContentChildParams(): { category: string; slug: string }[] {
  const params: { category: string; slug: string }[] = [];
  for (const e of index) {
    if (e.isHub) continue;
    const parts = e.path.split('/').filter(Boolean);
    if (parts.length !== 2) continue;
    params.push({ category: parts[0], slug: parts[1] });
  }
  return params;
}

export function plainText(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
}
