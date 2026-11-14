import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy - Bansal Immigration Consultants',
  description: 'Read our privacy policy to understand how Bansal Immigration Consultants collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Privacy Policy' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: October 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto prose max-w-none text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Introduction</h2>
          <p>
            Bansal Immigration Consultants (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name and contact information</li>
            <li>Date of birth and citizenship details</li>
            <li>Educational and employment history</li>
            <li>Immigration history and visa information</li>
            <li>Financial information for visa applications</li>
            <li>Family and relationship details</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Automatically Collected Information</h3>
          <p>We may automatically collect certain information about your device and usage patterns:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide immigration consultation and visa application services</li>
            <li>Communicate with you about your case and our services</li>
            <li>Process payments and maintain records</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our website and services</li>
            <li>Send you relevant information and updates (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Information Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Government Authorities:</strong> As required for visa applications and legal compliance</li>
            <li><strong>Service Providers:</strong> With trusted third parties who assist in providing our services</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of assets</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Immigration records are typically retained for at least 7 years after case completion.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information (subject to legal requirements)</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-200">
            <p>
              <strong>Bansal Immigration Consultants</strong><br />
              Level 8/278 Collins Street<br />
              Melbourne VIC 3000, Australia<br />
              Phone: +61 3 9602 1330<br />
              Email: info@bansalimmigration.com.au
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
