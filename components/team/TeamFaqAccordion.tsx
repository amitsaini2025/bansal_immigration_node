import { FaqList } from '@/components/ui/brand';

const teamFaqs = [
  {
    q: 'Can I choose my agent?',
    a: 'Yes. Tell us when you book and we will arrange it where possible.',
  },
  {
    q: 'Is every member of the team a registered agent?',
    a:
      'Registered agents show a MARN on their profile. Consultants without a MARN support clients but do not give regulated immigration assistance on their own.',
  },
  {
    q: 'How do I check an agent’s registration?',
    a:
      'Go to the OMARA register, search by name or MARN, and confirm the agent is currently registered.',
  },
  {
    q: 'Which languages do you speak?',
    a:
      'English, Hindi, Punjabi and Gujarati across the team. Each profile lists the languages for that person.',
  },
  {
    q: 'Where do the agents work?',
    a:
      'Our Melbourne head office and Adelaide office. Phone and video appointments are also available.',
  },
];

export default function TeamFaqAccordion() {
  return <FaqList items={teamFaqs} />;
}
