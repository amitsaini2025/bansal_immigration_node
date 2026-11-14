import type React from 'react';
import Link from 'next/link';

/** Minimal inline renderer for **bold**, *italic* and [text](url). */
export default function RichText({ text, linkClass }: { text: string; linkClass?: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const cls =
    linkClass ??
    'font-semibold text-brand-800 underline underline-offset-4 decoration-gold-400 decoration-2 hover:text-brand-950 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(
        <strong key={k++} className="font-semibold text-slate-900">
          {m[1]}
        </strong>
      );
    } else {
      const url = m[3];
      parts.push(
        url.startsWith('/') ? (
          <Link key={k++} href={url} className={cls}>
            {m[2]}
          </Link>
        ) : (
          <a key={k++} href={url} target="_blank" rel="noopener noreferrer" className={cls}>
            {m[2]}
          </a>
        )
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
