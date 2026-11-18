import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import StudentVisaFinancialCalculatorClient from '@/components/tools/StudentVisaFinancialCalculatorClient';
import { CtaBand } from '@/components/ui/brand';
import { StudentContent } from './content';

export const metadata: Metadata = {
  title: 'Student Visa Funds Calculator (Subclass 500)',
  description:
    'Estimate the funds you may need to show for an Australian student visa (Subclass 500): tuition, living costs, family and travel. Free calculator.',
  keywords: [
    'student visa financial requirements Australia',
    'subclass 500 funds required',
    'student visa living cost Australia',
    'how much money for Australian student visa',
    'student visa financial capacity',
    'student visa calculator',
  ],
  alternates: {
    canonical: 'https://bansalimmigration.com.au/study-australia/student-visa-financial-calculator',
  },
};

export default function StudentVisaCalculatorPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Study in Australia', href: '/study-australia' },
            { label: 'Financial Calculator' },
          ]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>

      <StudentVisaFinancialCalculatorClient content={<StudentContent />} />

      <CtaBand
        title="Need help with your student visa?"
        text="Our team can guide you on course selection, your Confirmation of Enrolment, the Genuine Student statement and financial documents."
        disclaimer="This calculator is indicative. Only the Department of Home Affairs decides student visa applications."
      />
    </div>
  );
}
