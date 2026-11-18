'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/admin/login/actions';

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: '' });

  return (
    <form action={action} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">Bansal Immigration</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Admin sign in</h1>
      <p className="mt-1 text-sm text-slate-600">Staff accounts only.</p>
      {state.error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}
      <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        required
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-900 disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
