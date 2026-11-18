import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  FileText,
  Lock,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Mail,
  Users,
  MapPin,
  IdCard,
  Send,
  ClipboardCheck,
  Inbox,
} from 'lucide-react';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  container,
  sectionY,
  card,
  cardPad,
  btnPrimaryDark,
  btnGhostDark,
  btnGhostLight,
  linkText,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
  FaqList,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'AFP National Police Check for Visas | Bansal Immigration',
  description:
    'Need an AFP police certificate for a visa or citizenship? We check your ID documents and help you lodge. Fee AUD 98. Start online.',
  keywords: [
    'AFP national police check for visa',
    'Australian police certificate for visa',
    'AFP police check for citizenship',
    '100 point ID check',
    'national police certificate for migration',
    'police clearance for PR Australia',
    'AFP check Melbourne',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/afp-national-police-check',
  },
};

const whoNeeds = [
  'Are applying for a visa that asks for police certificates, including permanent visas',
  'Are applying for Australian citizenship',
  'Have lived in Australia for 12 months or more in the past ten years, as the Department of Home Affairs may then ask for an Australian certificate',
  'Need a check for work or other reasons',
];

const provide = [
  {
    icon: Users,
    title: 'All legal names',
    text: 'Every name you have used, including previous names, maiden names and spelling variants.',
  },
  {
    icon: MapPin,
    title: '10-year address history',
    text: 'Dates and addresses of where you have lived, in Australia and overseas.',
  },
  {
    icon: IdCard,
    title: '100 points of identification',
    text: 'Clear scans of ID documents that add up to at least 100 points.',
  },
];

const idMatrix = [
  {
    type: 'Primary document (choose one)',
    points: '70',
    examples: 'Current passport (foreign or Australian) or Australian birth certificate',
  },
  {
    type: 'Secondary ID with photo',
    points: '40',
    examples: 'Australian driver licence or government proof of age card',
  },
  {
    type: 'Other supporting documents',
    points: '25 each',
    examples: 'Medicare card, bank statement or credit card, Australian utility bill, student ID card',
  },
];

const steps = [
  { icon: Send, title: 'Send your request', text: 'Complete the form below with your details.' },
  { icon: ClipboardCheck, title: 'We check your documents', text: 'Our team reviews your ID and address history.' },
  { icon: FileCheck2, title: 'We help you lodge', text: 'We prepare your application for the Australian Federal Police.' },
  {
    icon: Inbox,
    title: 'You receive your certificate',
    text: 'It is emailed to you. Timing depends on the AFP. Some checks take longer if a fingerprint or name match is needed.',
  },
];

const faqs = [
  {
    q: 'How long is an AFP certificate valid?',
    a: 'The Department of Home Affairs usually asks for a certificate issued within the last 12 months. Check your visa checklist for the exact requirement.',
  },
  {
    q: 'Do I need an overseas police certificate too?',
    a: (
      <>
        If you have lived overseas for 12 months or more in the past ten years, you may need certificates from those
        countries as well as an Australian police check.
      </>
    ),
  },
  {
    q: 'What if I have changed my name?',
    a: 'List every name you have used. Missing names can delay the check.',
  },
  {
    q: 'Can I use a photo ID that has expired?',
    a: 'Use current documents. Contact us if you are unsure whether a document will be accepted.',
  },
  {
    q: 'Is this an official AFP page?',
    a: 'No. This is a service run by Bansal Immigration. You can also apply directly to the Australian Federal Police.',
  },
];

export default function AfpPoliceCheckPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[{ label: 'Tools & Calculators' }, { label: 'AFP National Police Check' }]}
          className={container}
        />
      </div>

      <PageHero
        badge="Police checks"
        title="AFP National Police Check for Visas and Citizenship"
        intro="Many Australian visa and citizenship applications ask for a police certificate. We help you complete the Australian Federal Police (AFP) National Police Check, check your identity documents and prepare your application."
        actions={
          <>
            <a href="#request-form" className={`${btnPrimaryDark} w-full sm:w-auto`}>
              Request your check
            </a>
            <a href="tel:+61396021330" className={`${btnGhostDark} w-full sm:w-auto`}>
              Call +61 3 9602 1330
            </a>
          </>
        }
        aside={
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">Quick facts</p>
            <ul className="mt-5 space-y-4 text-base text-slate-700">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Purpose: immigration or citizenship</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Time to complete the form: about 5 to 10 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <IdCard className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Identity check: at least 100 points</span>
              </li>
            </ul>
          </div>
        }
      />

      {/* Who needs */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeader title="Who needs an AFP National Police Check?" />
              <p className="mt-6 text-base text-slate-600 leading-relaxed max-w-2xl">
                The Department of Home Affairs tells you which certificates it wants. If you are unsure, ask your agent
                or check your visa checklist.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className={`${card} ${cardPad}`}>
                <p className="text-sm font-bold uppercase tracking-wider text-brand-700">You may need one if you</p>
                <ul className="mt-5 space-y-4">
                  {whoNeeds.map((t) => (
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

      {/* What to provide */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title="What you need to provide" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {provide.map((p) => (
              <div key={p.title} className={`${card} ${cardPad} flex flex-col`}>
                <IconTile icon={p.icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ID matrix + fees */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <SectionHeader title="The 100-point ID check" lede="You must include at least one primary document." />
              <div className={`${card} mt-12 overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-base">
                    <caption className="sr-only">100-point ID document matrix</caption>
                    <thead className="bg-brand-50 text-brand-900">
                      <tr>
                        <th scope="col" className="px-5 py-4 font-bold">Type</th>
                        <th scope="col" className="px-5 py-4 font-bold whitespace-nowrap">Points</th>
                        <th scope="col" className="px-5 py-4 font-bold min-w-56">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {idMatrix.map((r) => (
                        <tr key={r.type} className="align-top">
                          <th scope="row" className="px-5 py-4 font-bold text-slate-900">{r.type}</th>
                          <td className="px-5 py-4 font-bold text-brand-900 whitespace-nowrap">{r.points}</td>
                          <td className="px-5 py-4 text-slate-600 leading-relaxed">{r.examples}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SectionHeader title="Fees" />
              <div className={`${card} ${cardPad} mt-12`}>
                <dl className="text-base">
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-200">
                    <dt className="text-slate-700">Official AFP statutory fee</dt>
                    <dd className="font-bold text-slate-900 whitespace-nowrap">AUD $56.00</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-200">
                    <dt className="text-slate-700">Certified verification and handling</dt>
                    <dd className="font-bold text-slate-900 whitespace-nowrap">AUD $42.00</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-4">
                    <dt className="font-bold text-slate-900">Total</dt>
                    <dd className="text-2xl font-extrabold text-brand-900 whitespace-nowrap">AUD $98.00</dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                  The AFP certificate is issued digitally and emailed to your verified email address when it is ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title="How it works" />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className={`${card} ${cardPad} flex flex-col`}>
                <div className="flex items-center gap-4">
                  <IconTile icon={s.icon} />
                  <span className="text-sm font-bold uppercase tracking-wider text-brand-700">Step {i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form */}
      <section id="request-form" className={`${sectionY} bg-white scroll-mt-4`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                title="Request your AFP police check"
                lede="Fill in your details and our team will come back to you."
              />
              <div className="mt-8 flex items-start gap-3 text-base text-slate-700">
                <Mail className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Help desk:{' '}
                  <a href="mailto:info@bansalimmigration.com.au" className={linkText}>
                    info@bansalimmigration.com.au
                  </a>
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className={`${card} p-6 sm:p-8`}>
                <UnifiedContactForm
                  formSource="afp-police-check-intake"
                  formVariant="full"
                  showPhone={true}
                  showSubject={true}
                  formTitle=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <div className={`${card} ${cardPad} flex flex-col sm:flex-row gap-6 items-start max-w-4xl`}>
            <IconTile icon={FileText} />
            <div>
              <h2 className="text-2xl font-extrabold text-brand-900">How we handle your documents</h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
                Your ID scans are sensitive. We use them only to complete your application. We handle them under the
                Privacy Act 1988. See our{' '}
                <Link href="/privacy-policy" className={linkText}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-slate-50">
        <div className={`${container} flex flex-col sm:flex-row sm:items-center gap-4`}>
          <p className="text-base font-bold text-slate-900 sm:mr-4">Related</p>
          <Link href="/migrate-to-australia" className={`${btnGhostLight} w-full sm:w-auto`}>Migrate to Australia</Link>
          <Link href="/citizenship" className={`${btnGhostLight} w-full sm:w-auto`}>Citizenship</Link>
          <Link href="/contact" className={`${btnGhostLight} w-full sm:w-auto`}>Contact us</Link>
        </div>
      </section>

      <CtaBand
        title="Need help with your police checks?"
        text="Tell us which visa you are applying for and we will tell you which certificates are needed."
      />
    </div>
  );
}
