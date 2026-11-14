import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  FileText,
  Lock,
  Mail,
  CheckCircle2,
  Building,
  MapPin,
  Users,
  Landmark,
  ClipboardCheck,
  Search,
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
  title: 'Indian Police Clearance Certificate (PCC) Help',
  description:
    'Need an Indian PCC for an Australian visa or citizenship? We check your documents and guide you through VFS Global and consulate steps.',
  keywords: [
    'Indian police clearance certificate Australia',
    'Indian PCC for Australian visa',
    'PCC VFS Global Australia',
    'police clearance certificate from India Melbourne',
    'Indian PCC for PR',
    'Indian PCC for citizenship',
    'High Commission of India PCC',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/indian-police-check',
  },
};

const gather = [
  {
    icon: Landmark,
    title: 'Mission and purpose',
    text: 'Which Indian mission you will use (Sydney, Melbourne, Perth or Canberra) and why you need the PCC: PR visa, employment or citizenship.',
  },
  {
    icon: MapPin,
    title: '10-year address history',
    text: 'Dates, state or union territory, and the local police station area, in India and abroad.',
  },
  {
    icon: Users,
    title: 'Two local references',
    text: 'Names, phone numbers and addresses of two respectable people who live in your Indian locality.',
  },
];

const docs = [
  { title: 'Current passport', text: 'First and last pages (bio data and address page) of your valid Indian passport.' },
  { title: 'Australian visa status', text: 'A current VEVO entitlement check or your visa grant notice.' },
  { title: 'Proof of address in India', text: "Aadhaar card, utility bill or parents' property document that matches your address." },
  { title: 'Proof of address in Australia', text: 'Australian driver licence, tenancy lease or utility bill.' },
];

const steps = [
  { icon: ClipboardCheck, title: 'We review your intake', text: 'We prepare the consular application and check your documents.' },
  { icon: FileText, title: 'We prepare your submission', text: 'Your VFS Global and consular package is prepared so you are ready to lodge.' },
  { icon: Search, title: 'Police verification in India', text: 'The verification is tracked until the certificate is sent to you.' },
];

const faqs = [
  {
    q: 'Why does Home Affairs ask for an Indian PCC?',
    a: 'It is a character requirement. Visa and citizenship applicants may need police certificates from countries where they lived for 12 months or more.',
  },
  {
    q: 'Can I apply myself?',
    a: 'Yes. You can apply through VFS Global and the Indian mission yourself. Our service helps you prepare and check the documents.',
  },
  { q: 'Do you guarantee the PCC will be issued?', a: 'No. The Indian authorities decide.' },
  {
    q: 'Do I need an Australian police check as well?',
    a: (
      <>
        Often yes. See our{' '}
        <Link href="/afp-national-police-check" className={linkText}>
          AFP police check page
        </Link>
        .
      </>
    ),
  },
  { q: 'How long is a PCC valid?', a: 'Check what your visa requires. The Department of Home Affairs checklist for your visa will say.' },
  {
    q: 'I live outside the four mission cities. What should I do?',
    a: 'Choose the Indian mission that serves your state. Contact us if you are not sure which one that is.',
  },
];

export default function IndianPoliceCheckPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[{ label: 'Tools & Calculators' }, { label: 'Indian Police Check' }]}
          className={container}
        />
      </div>

      <PageHero
        badge="Police checks"
        title="Indian Police Clearance Certificate (PCC) for Australian Visas"
        intro="If you have lived in India, your Australian visa or citizenship application may ask for an Indian police clearance certificate. We help you complete the intake, check your documents and prepare your application for the VFS Global and consular process."
        actions={
          <>
            <a href="#request-form" className={`${btnPrimaryDark} w-full sm:w-auto`}>
              Request PCC help
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
                <Building className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Indian missions covered: Melbourne, Sydney, Perth, Canberra</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Time to complete the intake form: about 10 to 15 minutes</span>
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
              <SectionHeader title="Who needs an Indian PCC?" />
            </div>
            <div className="lg:col-span-7">
              <div className={`${card} ${cardPad}`}>
                <div className="flex items-start gap-3 text-base text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <p>
                    You may need one if you have lived in India for 12 months or more in the past ten years and you are
                    applying for a visa or citizenship that asks for police certificates.
                  </p>
                </div>
                <p className="mt-5 text-base text-slate-600 leading-relaxed">
                  The Department of Home Affairs lists which certificates it requires for your visa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we gather */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title="What we need from you" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {gather.map((g) => (
              <div key={g.title} className={`${card} ${cardPad} flex flex-col`}>
                <IconTile icon={g.icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-900">{g.title}</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader title="Documents checklist" lede="Scanned copies in PDF or image format." />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {docs.map((d, i) => (
              <li key={d.title} className={`${card} ${cardPad} flex flex-col`}>
                <span className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{d.title}</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process + timing */}
      <section className={`${sectionY} bg-slate-50`}>
        <div className={container}>
          <SectionHeader title="How the PCC process works" />
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
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

          <div className={`${card} ${cardPad} mt-12 max-w-4xl`}>
            <h2 className="text-2xl font-extrabold text-slate-900">Timing and fees</h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
              Timing depends on VFS Global, the Indian mission and police verification in India. This can take several
              weeks.
            </p>
            <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
              Government and VFS Global fees are set by those organisations and change from time to time. Check the VFS
              Global or High Commission of India website for the current amounts. Contact us for our service fee.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="request-form" className={`${sectionY} bg-white scroll-mt-4`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                title="Indian PCC application request"
                lede="Fill in your details and our team will come back to you."
              />
              <div className="mt-8 flex items-start gap-3 text-base text-slate-700">
                <Mail className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Dedicated support:{' '}
                  <a href="mailto:info@bansalimmigration.com.au" className={linkText}>
                    info@bansalimmigration.com.au
                  </a>
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className={`${card} p-6 sm:p-8`}>
                <UnifiedContactForm
                  formSource="indian-police-check-intake"
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
              <h2 className="text-2xl font-extrabold text-slate-900">How we handle your documents</h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
                Your passport, address and reference details are sensitive. We use them only for your PCC application
                and handle them under the Privacy Act 1988. See our{' '}
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

      <section className="py-12 bg-slate-50">
        <div className={`${container} flex flex-col sm:flex-row sm:items-center gap-4`}>
          <p className="text-base font-bold text-slate-900 sm:mr-4">Related</p>
          <Link href="/afp-national-police-check" className={`${btnGhostLight} w-full sm:w-auto`}>AFP police check</Link>
          <Link href="/citizenship" className={`${btnGhostLight} w-full sm:w-auto`}>Citizenship</Link>
          <Link href="/contact" className={`${btnGhostLight} w-full sm:w-auto`}>Contact us</Link>
        </div>
      </section>

      <CtaBand
        title="Need help with your character documents?"
        text="Tell us which visa you are applying for and we will say which police certificates you need."
      />
    </div>
  );
}
