import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';
import { currentAdmin } from '@/lib/admin/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await currentAdmin()) redirect('/admin');

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <LoginForm />
    </div>
  );
}
