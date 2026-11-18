import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ShieldCheck, Building, CheckCircle2, Mail, Phone, Calendar } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import OfficeVisitFormClient from '@/components/tools/OfficeVisitFormClient';
import {
  container,
  sectionY,
  card,
  cardPad,
  btnPrimaryDark,
  btnPrimaryLight,
  btnGhostLight,
  linkText,
  SectionHeader,
  PageHero,
  FaqList,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'Office Visit Registration Form | Bansal Immigration',
  description:
    'Fill in this short form before your appointment at our Melbourne or Adelaide office so your agent has your details ready.',
  keywords: [
    'office visit registration form',
    'migration consultation intake form',
    'pre-appointment form Bansal Immigration',
    'client check-in form',
  ],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://bansalimmigration.com.au/office-visit-form',
  },
};

const ready = [
  'Your passport and the country of your passport',
  'Your current visa subclass and expiry date',
  'Your highest qualification and, if you have it, English test score',
  'The occupation you are nominating, if you have one',
  'Any questions you want to ask',
];

const next = [
  {
    title: 'You see a thank-you page',
    text: 'It confirms your form was received.',
  },
  {
    title: 'Your adviser reads your details',
    text: 'This happens before your appointment.',
  },
  {
    title: 'We go through your options',
    text: 'At your appointment, we talk through your options and next steps. You are not committed to anything.',
  },
];

const faqs = [
  {
    q: 'Do I have to fill in this form?',
    a: 'It is not compulsory, but it helps us prepare. If you cannot, tell us at the start of your appointment.',
  },
  {
    q: 'Is my information safe?',
    a: (
      <>
        We handle it under the Privacy Act 1988 and the Migration Agents Code of Conduct. See our{' '}
        <Link href="/privacy-policy" className={linkText}>
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Is this form a booking?',
    a: (
      <>
        No. Use the{' '}
        <Link href="/book-an-appointment" className={linkText}>
          booking page
        </Link>{' '}
        to arrange a time.
      </>
    ),
  },
  {
    q: 'I do not have a visa yet. What do I choose?',
    a: 'Select "Offshore (Outside Australia)".',
  },
  {
    q: 'Can I use this for a video appointment?',
    a: 'Yes. The same form helps your adviser prepare for a phone or video call.',
  },
];

export default function OfficeVisitFormPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[{ label: 'Contact', href: '/contact' }, { label: 'Office Visit Form' }]}
          className={container}
        />
      </div>

      <PageHero
        badge="For booked appointments"
        title="Office Visit Registration Form"
        intro="Please fill in this form before your appointment at our Melbourne or Adelaide office. It gives your agent your visa history and background so your time with us goes on advice, not paperwork."
        actions={
          <a href="#office-visit-form" className={`${btnPrimaryDark} w-full sm:w-auto`}>
            Go to the form
          </a>
        }
        aside={
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">Quick facts</p>
            <ul className="mt-5 space-y-4 text-base text-slate-700">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Takes about five minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Your details are private under the Privacy Act 1988</span>
              </li>
              <li className="flex items-start gap-3">
                <Building className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Offices: Melbourne and Adelaide</span>
              </li>
            </ul>
          </div>
        }
      />

      {/* Before you start */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <SectionHeader title="Have these ready" />
              <p className="mt-6 text-base text-slate-600 leading-relaxed max-w-2xl">
                This form is not a booking. If you do not have an appointment, please{' '}
                <Link href="/book-an-appointment" className={linkText}>
                  book one first
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className={`${card} ${cardPad}`}>
                <ul className="space-y-4">
                  {ready.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-base text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="bg-slate-50">
        <OfficeVisitFormClient />
      </div>

      {/* What happens next */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="After you submit" />
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {next.map((n, i) => (
              <li key={n.title} className={`${card} ${cardPad} flex flex-col`}>
                <span className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{n.title}</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">{n.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <div className={`${card} ${cardPad} max-w-4xl`}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">Questions?</h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
              Call{' '}
              <a href="tel:+61396021330" className={linkText}>
                +61 3 9602 1330
              </a>{' '}
              or email{' '}
              <a href="mailto:info@bansalimmigration.com.au" className={linkText}>
                info@bansalimmigration.com.au
              </a>
              . Hours: Monday to Friday, 9:30 am to 6:00 pm.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/book-an-appointment" className={`${btnPrimaryLight} w-full sm:w-auto`}>
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book an appointment
              </Link>
              <Link href="/contact" className={`${btnGhostLight} w-full sm:w-auto`}>
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact us
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-600 leading-relaxed">
              This form is general information gathering. It is not legal advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
