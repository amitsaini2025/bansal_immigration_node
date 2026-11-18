import Link from 'next/link';
import { btnGhostLight, btnPrimaryLight } from '@/components/ui/brand';

export default function NotFound() {
  return (
    <div className="bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <p className="text-sm font-bold tracking-wide text-brand-800">404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-brand-900 tracking-tight">
          This page could not be found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          The address may be mistyped, or the page may have moved. Start from the home page, or contact the team.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={btnPrimaryLight}>
            Back to home
          </Link>
          <Link href="/contact" className={btnGhostLight}>
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
