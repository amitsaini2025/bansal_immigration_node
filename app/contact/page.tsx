import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, Calendar, MapPin, Clock, ShieldCheck, ExternalLink, Globe, Building, Info } from 'lucide-react';
import { container, sectionY, card, btnPrimaryDark, btnGhostDark, linkText, focusRing, SectionHeader, IconTile, PageHero, CtaBand } from '@/components/ui/brand';
import MainContactForm from '@/components/contact/MainContactForm';
import ContactFaqAccordion from '@/components/contact/ContactFaqAccordion';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Bansal Immigration | Migration Agents Melbourne',
  description:
    'Call, email or visit our Melbourne and Adelaide offices. Send an enquiry and a registered migration agent will reply within one business day.',
  keywords: [
    'contact Bansal Immigration',
    'migration agent Melbourne contact',
    'migration agent Adelaide contact',
    'book migration consultation',
    'Australian visa advice phone',
    'contact migration agent Melbourne',
    'migration agent phone number',
    'visa enquiry Melbourne',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/contact',
  },
  openGraph: {
    title: 'Contact Bansal Immigration | Migration Agents Melbourne',
    description:
      'Call, email or visit our Melbourne and Adelaide offices. Send an enquiry and a registered migration agent will reply within one business day.',
    images: ['/img/team/team-bansal-960.jpg'],
    type: 'website',
    url: 'https://www.bansalimmigration.com.au/contact',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Bansal Immigration Consultants',
  url: 'https://www.bansalimmigration.com.au/contact',
  mainEntity: {
    '@type': 'LegalService',
    name: 'Bansal Immigration Consultants',
    telephone: '+61-3-9602-1330',
    email: 'info@bansalimmigration.com.au',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Level 8/278 Collins St',
        addressLocality: 'Melbourne',
        addressRegion: 'VIC',
        postalCode: '3000',
        addressCountry: 'AU',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 5, 55 Gawler Pl',
        addressLocality: 'Adelaide',
        addressRegion: 'SA',
        postalCode: '5000',
        addressCountry: 'AU',
      },
    ],
  },
};

const afterEnquireSteps = [
  {
    step: '1',
    title: 'We review your enquiry',
    desc: 'A member of our migration team reads your message, usually within one business day.',
  },
  {
    step: '2',
    title: 'We arrange a consultation',
    desc: 'In person, by phone or by video, to go through your visa options, evidence, risks and timing.',
  },
  {
    step: '3',
    title: 'You get the scope and fees in writing',
    desc: 'If you decide to proceed, you receive a written service agreement before any application work begins.',
  },
];

const contactChannels = [
  {
    icon: Phone,
    label: 'Call us',
    value: '+61 3 9602 1330',
    note: 'Speak directly with our team',
    href: 'tel:+61396021330',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@bansalimmigration.com.au',
    note: 'Send us your questions',
    href: 'mailto:info@bansalimmigration.com.au',
  },
  {
    icon: Clock,
    label: 'Business hours',
    value: 'Mon to Fri, 9:30 am to 6:00 pm',
    note: 'Closed Saturday and Sunday',
  },
  {
    icon: Info,
    label: 'Response time',
    value: 'We aim to reply within one business day',
    note: 'Urgent? Please call us',
  },
];

const offices = [
  {
    name: 'Melbourne Head Office',
    tag: 'VIC 3000',
    address: 'Level 8/278 Collins St, Melbourne VIC 3000',
    phone: '+61 3 9602 1330',
    tel: 'tel:+61396021330',
    email: 'info@bansalimmigration.com.au',
    maps: 'https://maps.google.com/?q=Level+8/278+Collins+St,+Melbourne+VIC+3000',
    embed: 'https://www.google.com/maps?q=Level%208/278%20Collins%20St,%20Melbourne%20VIC%203000&output=embed',
    mapTitle: 'Bansal Immigration Melbourne Office Map',
  },
  {
    name: 'Adelaide Office',
    tag: 'SA 5000',
    address: 'Unit 5, 55 Gawler Pl, Adelaide SA 5000',
    phone: '08 8317 1340',
    tel: 'tel:+61883171340',
    email: 'adelaide@bansalimmigration.com.au',
    maps: 'https://maps.google.com/?q=Unit+5,+55+Gawler+Pl,+Adelaide+SA+5000',
    embed: 'https://www.google.com/maps?q=Unit%205,%2055%20Gawler%20Pl,%20Adelaide%20SA%205000&output=embed',
    mapTitle: 'Bansal Immigration Adelaide Office Map',
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="border-b border-slate-100 bg-slate-50/50">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} className="max-w-7xl mx-auto" />
      </div>

      <PageHero
        badge="Registered migration agents, Melbourne and Adelaide"
        badgeIcon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
        title="Contact Bansal Immigration"
        intro="Tell us what you need. A registered migration agent reads every enquiry and replies within one business day. If your matter is urgent, please call."
        actions={
          <>
            <Link href="/book-an-appointment" className={`${btnPrimaryDark} w-full sm:w-auto`}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
            <a href="tel:+61396021330" className={`${btnGhostDark} w-full sm:w-auto`}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call +61 3 9602 1330
            </a>
          </>
        }
      />

      {/* Enquiry form + contact details */}
      <section id="contact-form" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Enquiry"
            title="Send an enquiry"
            lede="Give us a short summary of your situation. Your details are kept private and are read by our migration team."
          />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              <MainContactForm />
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {contactChannels.map((c) => {
                const inner = (
                  <>
                    <IconTile icon={c.icon} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-600">{c.label}</p>
                      <p className="mt-0.5 text-base font-bold text-slate-900 break-words">{c.value}</p>
                      <p className="mt-1 text-sm text-slate-600">{c.note}</p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className={`${card} p-6 flex items-start gap-4 hover:border-brand-300 hover:shadow-md ${focusRing}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className={`${card} p-6 flex items-start gap-4`}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Our offices"
            title="Visit us in Melbourne or Adelaide"
            lede="Please book before you visit so an adviser can confirm availability. In-person, phone and video appointments are all available."
          />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {offices.map((o) => (
              <article key={o.name} className={`${card} overflow-hidden flex flex-col`}>
                <div className="aspect-[16/10] w-full bg-slate-100">
                  <iframe
                    title={o.mapTitle}
                    src={o.embed}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{o.name}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-100 shrink-0">
                      {o.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-brand-700" aria-hidden="true" />
                    {o.address}
                  </p>
                  <dl className="mt-4 pt-4 border-t border-slate-200 space-y-1.5 text-slate-600">
                    <div>
                      <dt className="inline font-semibold text-slate-800">Phone: </dt>
                      <dd className="inline">
                        <a href={o.tel} className={linkText}>{o.phone}</a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-800">Email: </dt>
                      <dd className="inline break-all">
                        <a href={`mailto:${o.email}`} className={linkText}>{o.email}</a>
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={o.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing} rounded`}
                  >
                    Directions on Google Maps
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Philippines office and virtual consultations */}
          <article className={`${card} mt-6 p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start`}>
            <div className="flex items-start gap-4">
              <IconTile icon={Globe} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Philippines Branch</h3>
                <p className="mt-2 text-slate-600">
                  Unit 12, 2nd Floor, Brgy Quebiawan, HPT Building, Cer-Hil Service Road, San Fernando, 2000 Pampanga
                </p>
                <p className="mt-3 text-slate-600">
                  Phone: <a href="tel:+639171241207" className={linkText}>+63 917 124 1207</a>
                </p>
                <p className="mt-1 text-slate-600 break-all">
                  Email: <a href="mailto:philippines@bansalimmigration.com.au" className={linkText}>philippines@bansalimmigration.com.au</a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 lg:border-l lg:border-slate-200 lg:pl-6">
              <IconTile icon={Building} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Overseas clients</h3>
                <p className="mt-2 text-slate-600">
                  We also hold video consultations across time zones by Zoom or Google Meet.
                </p>
                <Link href="/book-an-appointment" className={`mt-3 inline-block ${linkText}`}>
                  Book a video consultation
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* After your enquiry */}
      <section className={`${sectionY} bg-brand-50`}>
        <div className={container}>
          <SectionHeader
            eyebrow="What to expect"
            title="What happens after your enquiry"
            lede="Three simple steps, so you know what to expect."
          />
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {afterEnquireSteps.map((s) => (
              <li key={s.step} className={`${card} p-6 sm:p-7 flex flex-col`}>
                <span className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center" aria-hidden="true">
                  {s.step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section className={`${sectionY} bg-white`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQs" title="Frequently asked questions" lede="Straight answers to the questions we hear most." />
          <div className="mt-12 max-w-3xl">
            <ContactFaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to discuss your visa options?"
        text="Speak with a registered migration agent. We will explain your options and the next steps in plain English."
      />
    </div>
  );
}
