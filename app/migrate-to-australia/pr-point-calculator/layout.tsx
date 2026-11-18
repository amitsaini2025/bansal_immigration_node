import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PR Points Calculator Australia (189, 190, 491)',
  description:
    'Free Australia PR points calculator for visas 189, 190 and 491. Check your age, English, work and study points, then speak to a migration agent.',
  keywords: [
    'Australia PR points',
    'Australia PR points calculator',
    'skilled migration points calculator',
    '189 190 491 points test',
    'how many points do I need for PR Australia',
    '65 points visa calculator',
    'EOI points calculator',
    'general skilled migration points',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/migrate-to-australia/pr-point-calculator',
  },
};

export default function PrPointCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
