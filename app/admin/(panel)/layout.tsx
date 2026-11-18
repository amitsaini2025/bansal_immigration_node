import type { Metadata } from 'next';
import { logoutAction } from '@/app/admin/login/actions';
import { AdminNav } from '@/components/admin/AdminNav';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = {
  title: 'Admin | Bansal Immigration',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-4 md:flex">
          <p className="px-3 text-sm font-semibold text-brand-900">Admin</p>
          <p className="mb-4 truncate px-3 text-xs text-slate-500">{user.email}</p>
          <AdminNav />
          <form action={logoutAction} className="mt-auto pt-6">
            <button type="submit" className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100">
              Sign out
            </button>
          </form>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <p className="text-sm font-semibold">Admin</p>
            <form action={logoutAction}>
              <button type="submit" className="text-sm text-slate-600">
                Sign out
              </button>
            </form>
          </div>
          <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <AdminNav />
          </div>
          <div className="px-4 py-6 sm:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
