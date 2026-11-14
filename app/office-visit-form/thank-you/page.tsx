import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { btnPrimaryLight, btnGhostLight, container } from '@/components/ui/brand';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Thank You - Office Visit Form Submitted | Bansal Immigration',
  description: 'Your office visit form has been submitted successfully.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfficeVisitThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Contact', href: '/contact' },
            { label: 'Check-in Confirmation' },
          ]}
          className={container}
        />
      </div>
      <section className="py-16 lg:py-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(26,26,43,0.04)] p-8 md:p-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900 mb-6">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Thank You
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-prose mx-auto">
            Your office visit form has been submitted successfully. Our consultation team has received your details and will have your file prepared for your visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className={btnPrimaryLight}
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className={btnGhostLight}
            >
              Contact Office
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
