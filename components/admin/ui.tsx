export function Notice({ error, saved }: { error?: string; saved?: string }) {
  if (error) {
    return <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>;
  }
  if (saved) {
    return <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{saved}</p>;
  }
  return null;
}

export function Pager({
  page,
  pages,
  hrefFor,
}: {
  page: number;
  pages: number;
  hrefFor: (page: number) => string;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
      <span>
        Page {page} of {pages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <a className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-50" href={hrefFor(page - 1)}>
            Previous
          </a>
        ) : null}
        {page < pages ? (
          <a className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-50" href={hrefFor(page + 1)}>
            Next
          </a>
        ) : null}
      </div>
    </div>
  );
}

export const fieldClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200';

export const labelClass = 'block text-sm font-medium text-slate-700';

export const buttonClass =
  'inline-flex items-center justify-center rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900';

export const secondaryButtonClass =
  'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50';
