import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cookie Policy - Bansal Immigration Consultants',
  description: 'Learn about how Bansal Immigration Consultants uses cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
  return (
    <div>
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Cookie Policy' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last updated: October 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto prose max-w-none text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">How We Use Cookies</h2>
          <p>We use cookies for several purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To remember your preferences and settings</li>
            <li>To analyze how our website is used</li>
            <li>To improve our website&apos;s performance and functionality</li>
            <li>To provide personalized content and services</li>
            <li>To ensure website security</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Types of Cookies We Use</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Essential Cookies</h3>
          <p>These cookies are necessary for the website to function properly. They include:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Session cookies for maintaining your session</li>
            <li>Security cookies for protecting against fraud</li>
            <li>Load balancing cookies for website performance</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Analytics Cookies</h3>
          <p>We use analytics cookies to understand how visitors interact with our website:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google Analytics cookies</li>
            <li>Page view tracking</li>
            <li>User behavior analysis</li>
            <li>Website performance monitoring</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Functional Cookies</h3>
          <p>These cookies enhance your experience by remembering:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your language preferences</li>
            <li>Your location settings</li>
            <li>Your form data (temporarily)</li>
            <li>Your accessibility preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Marketing Cookies</h3>
          <p>We may use marketing cookies to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Show relevant advertisements</li>
            <li>Track campaign effectiveness</li>
            <li>Provide personalized content</li>
            <li>Measure advertising performance</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Third-Party Cookies</h2>
          <p>Our website may include third-party services that set their own cookies:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Google Analytics:</strong> For website analytics</li>
            <li><strong>Social Media:</strong> For social sharing functionality</li>
            <li><strong>Payment Processors:</strong> For secure payment processing</li>
            <li><strong>Chat Services:</strong> For customer support</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Managing Your Cookies</h2>
          <p>
            Most web browsers allow you to manage cookies through their settings preferences. You can choose to accept, reject, or delete cookies at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
