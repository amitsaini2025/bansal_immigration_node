'use server';

import { redirect } from 'next/navigation';
import { clearSession, loginWithPassword } from '@/lib/admin/auth';

export async function loginAction(_prev: { error: string }, formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  if (!email || !password) return { error: 'Enter your email and password.' };
  const error = await loginWithPassword(email, password);
  if (error) return { error };
  redirect('/admin');
}

export async function logoutAction() {
  await clearSession();
  redirect('/admin/login');
}
