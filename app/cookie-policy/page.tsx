import type { Metadata } from 'next';
import LegalDocument from '@/components/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Cookie Policy - Bansal Immigration Consultants',
  description: 'Learn about how Bansal Immigration Consultants uses cookies and similar technologies on our website.',
  alternates: { canonical: 'https://www.bansalimmigration.com.au/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <LegalDocument title="Cookie Policy" updated="Last updated: October 2025">
      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.
      </p>

      <h2>How We Use Cookies</h2>
      <p>We use cookies for several purposes:</p>
      <ul>
        <li>To remember your preferences and settings</li>
        <li>To analyze how our website is used</li>
        <li>To improve our website&apos;s performance and functionality</li>
        <li>To provide personalized content and services</li>
        <li>To ensure website security</li>
      </ul>

      <h2>Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the website to function properly. They include:</p>
      <ul>
        <li>Session cookies for maintaining your session</li>
        <li>Security cookies for protecting against fraud</li>
        <li>Load balancing cookies for website performance</li>
      </ul>

      <h3>Analytics Cookies</h3>
      <p>We use analytics cookies to understand how visitors interact with our website:</p>
      <ul>
        <li>Google Analytics cookies</li>
        <li>Page view tracking</li>
        <li>User behavior analysis</li>
        <li>Website performance monitoring</li>
      </ul>

      <h3>Functional Cookies</h3>
      <p>These cookies enhance your experience by remembering:</p>
      <ul>
        <li>Your language preferences</li>
        <li>Your location settings</li>
        <li>Your form data (temporarily)</li>
        <li>Your accessibility preferences</li>
      </ul>

      <h3>Marketing Cookies</h3>
      <p>We may use marketing cookies to:</p>
      <ul>
        <li>Show relevant advertisements</li>
        <li>Track campaign effectiveness</li>
        <li>Provide personalized content</li>
        <li>Measure advertising performance</li>
      </ul>

      <h2>Third-Party Cookies</h2>
      <p>Our website may include third-party services that set their own cookies:</p>
      <ul>
        <li><strong>Google Analytics:</strong> For website analytics</li>
        <li><strong>Social Media:</strong> For social sharing functionality</li>
        <li><strong>Payment Processors:</strong> For secure payment processing</li>
        <li><strong>Chat Services:</strong> For customer support</li>
      </ul>

      <h2>Managing Your Cookies</h2>
      <p>
        Most web browsers allow you to manage cookies through their settings preferences. You can choose to accept, reject, or delete cookies at any time.
      </p>
    </LegalDocument>
  );
}
