import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import VictorianPointsTestClient from '@/components/tools/VictorianPointsTestClient';
import { CtaBand } from '@/components/ui/brand';
import { VptContent } from './content';

export const metadata: Metadata = {
  title: 'Victorian Points Test Calculator | Bansal Immigration',
  description:
    'Estimate your Victorian Points Test score for state nomination (190 and 491). Free calculator from registered migration agents in Melbourne.',
  keywords: [
    'Victorian points test calculator',
    'Victoria state nomination points',
    'Victoria 190 nomination',
    'Victoria 491 nomination',
    'Live in Melbourne ROI',
    'Victorian skilled migration points',
    'Victoria registration of interest',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/migrate-to-australia/victorian-points-test',
  },
};

export default function VictorianPointsTestPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Migrate to Australia', href: '/migrate-to-australia' },
            { label: 'Migrate to Australia', href: '/migrate-to-australia' },
            { label: 'Victorian Points Test' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <VictorianPointsTestClient>
        <VptContent />
      </VictorianPointsTestClient>

      <CtaBand
        title="Want an agent to check your Victorian score?"
        text="Our registered migration agents can check your score, evidence and timing."
        disclaimer="This calculator is indicative only. For official criteria, see Live in Melbourne."
      />
    </div>
  );
}
