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

export function plainText(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
}
