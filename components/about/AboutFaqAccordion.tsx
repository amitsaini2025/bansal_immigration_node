import { FaqList } from '@/components/ui/brand';

const faqs = [
  {
    q: 'Are your migration agents registered?',
    a:
      'Yes. Our agents are registered with OMARA and each MARN is shown on their profile. You can look up any agent on the official register.',
  },
  {
    q: 'Do I have to use a registered agent?',
    a:
      'You can apply on your own. If you want paid migration advice or help with an application, the person must be a registered migration agent, a lawyer or exempt. Ask for the MARN and check it.',
  },
  {
    q: 'Can you guarantee my visa?',
    a:
      'No. Only the Department of Home Affairs decides applications. We give you an honest view of your chances before you spend money.',
  },
  {
    q: 'Can I speak to a particular agent?',
    a:
      'Yes. Tell us when you book. Each agent has areas they focus on, shown on their profile.',
  },
  {
    q: 'Do you help people outside Australia?',
    a:
      'Yes. We offer phone and video appointments for people overseas. Check the appointment time zone before you confirm.',
  },
  {
    q: 'What happens at the first consultation?',
    a:
      'We listen to your situation, explain the options that apply and tell you what evidence and steps are involved. You decide whether to go ahead.',
  },
  {
    q: 'Are you part of the Australian Government?',
    a:
      'No. Bansal Immigration is an independent service provider. The Department of Home Affairs and the relevant authorities make application decisions.',
  },
];

export default function AboutFaqAccordion() {
  return <FaqList items={faqs} />;
}
