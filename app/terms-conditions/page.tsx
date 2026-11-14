import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Bansal Immigration Consultants',
  description: 'Read our terms and conditions to understand the terms of service for Bansal Immigration Consultants immigration services.',
};

export default function TermsConditionsPage() {
  return (
    <div>
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Terms & Conditions' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: September 1, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto prose max-w-none text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the services of Bansal Immigration Consultants (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">2. Services Provided</h2>
          <p>We provide immigration consulting services including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Visa application assistance</li>
            <li>Immigration advice and consultation</li>
            <li>Document preparation and review</li>
            <li>Lodgement of applications with relevant authorities</li>
            <li>Follow-up and case management</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">3. Client Responsibilities</h2>
          <p>As our client, you agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Submit all required documents in a timely manner</li>
            <li>Pay all fees as agreed</li>
            <li>Inform us of any changes in your circumstances</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">4. Fees and Payment</h2>
          <p>Our fees are as agreed in your service agreement. Payment terms include:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Initial consultation fees are payable in advance</li>
            <li>Service fees are due as per the payment schedule</li>
            <li>Government fees are separate and payable directly to authorities</li>
            <li>Fees are not contingent on outcomes; we do not offer contingency or success-fee arrangements</li>
            <li>Late payment may result in service suspension</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">5. Limitation of Liability</h2>
          <p>While we strive to provide accurate advice and services, we cannot guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Successful visa outcomes</li>
            <li>Processing times by government authorities</li>
            <li>Changes in immigration laws or policies</li>
            <li>Third-party actions or decisions</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">6. Confidentiality</h2>
          <p>
            We maintain strict confidentiality of all client information and will not disclose personal details to third parties without consent, except as required by law.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">7. Professional Standards</h2>
          <p>
            We are committed to maintaining the highest professional standards and comply with all relevant regulations, including the requirements of the Office of the Migration Agents Registration Authority (OMARA).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">8. Termination</h2>
          <p>Either party may terminate our services with written notice. Upon termination:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>All outstanding fees become immediately due</li>
            <li>We will provide a summary of work completed</li>
            <li>Client files will be returned as requested</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">9. Governing Law</h2>
          <p>These terms are governed by the laws of Australia. Any disputes will be resolved in the courts of Victoria, Australia.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">10. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">11. Contact Information</h2>
          <p>For questions about these terms, please contact us at:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: info@bansalimmigration.com.au</li>
            <li>Phone: +61 3 9602 1330</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
