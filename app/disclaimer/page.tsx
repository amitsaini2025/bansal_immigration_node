import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer - Bansal Immigration Consultants',
  description: 'Read our disclaimer to understand the limitations and scope of our immigration consulting services.',
};

export default function DisclaimerPage() {
  return (
    <div>
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Disclaimer' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-600">Last updated: October 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto prose max-w-none text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">General Information</h2>
          <p>
            The information provided on this website and through our services is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Immigration Advice</h2>
          <p>Immigration laws and policies are subject to frequent changes. The information provided:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Is general in nature and may not apply to your specific circumstances</li>
            <li>Should not be considered as specific legal advice</li>
            <li>May become outdated due to changes in legislation or policy</li>
            <li>Does not guarantee any particular outcome</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Professional Advice</h2>
          <p>Before making any immigration decisions, you should:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Consult with a qualified migration agent or immigration lawyer</li>
            <li>Verify current information with relevant government authorities</li>
            <li>Consider your individual circumstances carefully</li>
            <li>Seek professional advice tailored to your specific situation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">No Guarantee of Success</h2>
          <p>We cannot guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Successful visa applications or outcomes</li>
            <li>Specific processing times</li>
            <li>Approval of any particular application</li>
            <li>Changes in immigration policies or requirements</li>
          </ul>
          <p>Our fees are service-based and are not contingent on outcomes; we do not offer contingency or success-fee arrangements.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Third-Party Information</h2>
          <p>Our website may contain links to third-party websites or information. We:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Do not control or endorse third-party content</li>
            <li>Are not responsible for the accuracy of third-party information</li>
            <li>Do not guarantee the availability of linked websites</li>
            <li>Are not liable for any damages arising from third-party content</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Bansal Immigration Consultants:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Excludes all liability for any loss or damage arising from the use of our services</li>
            <li>Is not liable for indirect, incidental, or consequential damages</li>
            <li>Limits liability to the amount paid for our services</li>
            <li>Excludes liability for government decisions or policy changes</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Client Responsibility</h2>
          <p>Clients are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Providing accurate and complete information</li>
            <li>Verifying all details before submission</li>
            <li>Understanding the risks associated with immigration applications</li>
            <li>Making informed decisions based on their circumstances</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Regulatory Compliance</h2>
          <p>We operate in compliance with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>the requirements of the Office of the Migration Agents Registration Authority (OMARA)</li>
            <li>Australian Consumer Law</li>
            <li>Professional standards and codes of conduct</li>
            <li>Privacy and data protection laws</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
