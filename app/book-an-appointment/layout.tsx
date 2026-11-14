import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Migration Appointment | Bansal Immigration',
  description:
    'Book a phone, video or in-person appointment with a registered migration agent in Melbourne or Adelaide. Choose a time that suits you.',
  keywords: [
    'book migration agent appointment Melbourne',
    'migration consultation Melbourne',
    'migration agent Adelaide',
    'book visa consultation',
    'online migration consultation',
  ],
  alternates: {
    canonical: 'https://bansalimmigration.com.au/book-an-appointment',
  },
};

export default function BookAppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
