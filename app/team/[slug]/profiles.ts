export interface Profile {
  slug: string;
  first: string;
  name: string;
  h1: string;
  role: string;
  marn?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  line: string;
  image: string;
  facts: { label: string; value: string }[];
  helps: string[];
  experience: string[];
  qualifications: string[];
  /** Extra note under qualifications (shown instead of registration wording when there is no MARN). */
  registrationNote: string;
  areas: { name: string; href: string }[];
  bookText: string;
  faqs: { q: string; a: string; link?: { href: string; label: string } }[];
  /** Optional extra sections (used by profiles that supply them). */
  howWorks?: string[];
  whyChoose?: string[];
  clientsSay?: string;
  registrationLinks?: { href: string; label: string }[];
  bookLinks?: { href: string; label: string }[];
}

const REGISTER_URL = 'https://portal.mara.gov.au/search-the-register-of-migration-agents/';
export const omaraUrl = REGISTER_URL;

function placeholderAgent(input: {
  slug: string;
  first: string;
  name: string;
  pronoun: 'His' | 'Her';
  languages: string;
}): Profile {
  const { slug, first, name, pronoun, languages } = input;
  return {
    slug,
    first,
    name,
    h1: `${name}, Registered Migration Agent`,
    role: 'Registered Migration Agent',
    seoTitle: `${name}, Registered Migration Agent | Melbourne`,
    seoDescription: `${name} is a registered migration agent at Bansal Immigration in Melbourne.`,
    keywords: [`${name} migration agent`, 'registered migration agent Melbourne', 'Bansal Immigration'],
    line: `${name} is a registered migration agent at Bansal Immigration in Melbourne.`,
    image: `/img/team/${slug}.svg`,
    facts: [
      { label: 'Role', value: 'Registered Migration Agent' },
      { label: 'Office', value: 'Level 8, 278 Collins Street, Melbourne VIC 3000' },
      { label: 'Languages', value: languages },
    ],
    helps: [
      'People who want to talk through an Australian visa with a registered migration agent.',
      'Individuals and families planning to study, work or settle in Australia.',
      'Anyone who wants advice before lodging an application.',
    ],
    experience: [
      `${name} is a registered migration agent at Bansal Immigration.`,
    ],
    howWorks: [
      `${first} starts with your situation, then explains the options that may fit and what each one needs.`,
      'Our fees are service-based and explained upfront, and we do not charge success fees. The first consultation is free.',
    ],
    qualifications: ['Registered migration agent'],
    registrationNote: `${first} is a registered migration agent, so ${pronoun === 'His' ? 'he' : 'she'} has to follow the Code of Conduct for registered migration agents. You can read the Code of Conduct and our Consumer Guide before you book.`,
    registrationLinks: [
      {
        href: 'https://www.legislation.gov.au/F2021L01856/2026-04-01/2026-04-01/text/original/pdf',
        label: 'Code of Conduct',
      },
      { href: '/consumer_guide_english.pdf', label: 'Consumer Guide' },
    ],
    areas: [{ name: 'Book a consultation', href: '/book-an-appointment' }],
    bookText: `Book online, call +61 3 9602 1330 or email info@bansalimmigration.com.au. You can meet ${first} at Level 8, 278 Collins Street, Melbourne, or by phone or video.`,
    bookLinks: [
      { href: '/contact', label: 'Contact our team for a call back' },
      { href: '/terms-conditions', label: 'Read our consultation Terms and Conditions' },
    ],
    faqs: [
      {
        q: 'Is the first consultation free?',
        a: 'Yes. We offer a free first consultation so you can understand your options before you decide.',
      },
      {
        q: 'Do you charge a success fee?',
        a: 'No. Our fees are service-based, and we do not charge a success fee.',
      },
      {
        q: `Is ${first} a registered migration agent?`,
        a: `Yes. ${first} is registered with OMARA.`,
      },
      { q: `Which languages does ${first} speak?`, a: languages.endsWith('.') ? languages : `${languages}.` },
      {
        q: `Can ${first} guarantee my visa?`,
        a: 'No. The Department of Home Affairs decides.',
      },
    ],
  };
}

export const PROFILES: Record<string, Profile> = {
  'arun-bansal': {
    slug: 'arun-bansal',
    first: 'Arun',
    name: 'Arun Bansal',
    h1: 'Arun Bansal, Registered Migration Agent in Melbourne',
    role: 'Director, Bansal Immigration Consultants',
    marn: '2418466',
    seoTitle: 'Arun Bansal, Migration Agent (MARN 2418466) | Melbourne',
    seoDescription:
      'Arun Bansal is a registered migration agent (MARN 2418466) in Melbourne with 10+ years in legal and migration work. Free first consultation.',
    keywords: [
      'Arun Bansal migration agent',
      'registered migration agent Melbourne',
      'migration agent Melbourne',
      'skilled migration agent Melbourne',
      'ART appeal migration agent',
      'employer nomination scheme 186 agent',
    ],
    line: 'Arun Bansal is the Director of Bansal Immigration Consultants and a registered migration agent (MARN 2418466) in Melbourne. He has been working in legal and migration work for more than 10 years and holds an LLM and migration law qualifications. If you are planning to study, work, settle or reunite with family in Australia, Arun can help you work out where to start.',
    image: '/img/team/arun-bansal.avif',
    facts: [
      { label: 'Role', value: 'Director, Bansal Immigration Consultants' },
      { label: 'Registration', value: 'MARN 2418466, registered with the Office of the Migration Agents Registration Authority (OMARA)' },
      { label: 'Experience', value: '10+ years in legal and migration work' },
      { label: 'Qualifications', value: 'LLM and migration law qualifications' },
      { label: 'Office', value: 'Level 8, 278 Collins Street, Melbourne VIC 3000' },
      { label: 'Languages', value: 'English, Hindi, Punjabi' },
    ],
    helps: [
      'Students and families choosing a course, a visa or a way to reunite in Australia.',
      'Skilled workers and graduates planning permanent residency under the 189, 190 or 491 visas.',
      'Businesses that want to sponsor staff, including Employer Nomination Scheme (subclass 186) transitions.',
      'People who have received a visa refusal, a Notice of Intention to Consider Cancellation (NOICC) or need a review at the Administrative Review Tribunal (ART).',
      'People who need to respond to a request for information, or explain a health or character matter.',
    ],
    experience: [
      'Arun runs Bansal Immigration Consultants, a Melbourne firm that helps individuals and families with Australian visas. Most people come to him with the same few questions. Am I eligible? Which visa suits me? What do I need to get ready? He answers them in plain language, so you know what to expect before you spend money on an application.',
      'His work covers legally complex matters. He represents clients before the Administrative Review Tribunal, prepares submissions on health and character waivers, responds to requests for information under section 56 of the Migration Act, and responds to cancellation notices.',
      'For business clients he advises on employer sponsorship, Skills in Demand visas and Employer Nomination Scheme transitions.',
    ],
    howWorks: [
      'Arun starts with your situation, not with a visa name. He looks at your circumstances and documents, explains your options and tells you straight what each pathway needs.',
      'Our fees are service-based and clearly explained, and we do not charge success fees. Your first consultation is free, so you can get a clear picture before you decide to go ahead.',
    ],
    qualifications: [
      'LLM and migration law qualifications',
      'Registered migration agent, MARN 2418466 (OMARA)',
    ],
    registrationNote:
      'Arun\u2019s advice is backed by his LLM and migration law qualifications. He is also registered with OMARA, which means he has to follow the Code of Conduct for registered migration agents. You can read the Code of Conduct and our Consumer Guide before you book.',
    registrationLinks: [
      {
        href: 'https://www.legislation.gov.au/F2021L01856/2026-04-01/2026-04-01/text/original/pdf',
        label: 'Code of Conduct',
      },
      { href: '/consumer_guide_english.pdf', label: 'Consumer Guide' },
    ],
    clientsSay:
      'Past clients have thanked Arun for going through their options carefully, and some have recommended him as a migration agent.',
    whyChoose: [
      'He is a registered migration agent, so he follows a professional Code of Conduct.',
      'His LLM and migration law qualifications sit behind his advice.',
      'He has more than 10 years of experience in legal and migration work.',
      'Fees are service-based and explained upfront, with no success fees.',
      'He is based in Melbourne, and the firm also has offices in Adelaide and the Philippines.',
    ],
    areas: [
      { name: 'Study in Australia: choosing a course and understanding what a student visa needs', href: '/study-australia' },
      { name: 'Skilled migration: points-based visas (189, 190, 491)', href: '/migrate-to-australia' },
      { name: 'South Australia state nomination', href: '/south-australia-state-nomination' },
      { name: 'Partner and family visas: applications for couples and families', href: '/family-visa' },
      { name: 'Employer-sponsored visas: for businesses and the people they hire', href: '/employer-sponsored' },
      { name: 'Business visas', href: '/business-visa' },
      { name: 'Visitor visas', href: '/visitor-visa' },
      { name: 'Citizenship: the next step once you hold permanent residency', href: '/citizenship' },
      { name: 'Appeals and reviews: help if your visa has been refused or cancelled', href: '/appeals' },
      { name: 'Administrative Review Tribunal (ART)', href: '/appeals/art-appeals' },
      {
        name: 'NOICC and visa cancellations',
        href: '/appeals/notice-of-intention-to-consider-cancellation',
      },
    ],
    bookText:
      'Ready to talk? Book online, call +61 3 9602 1330 or email info@bansalimmigration.com.au. You can meet Arun at Level 8, 278 Collins Street, Melbourne, or by phone or video. If you have a deadline or a cancellation notice, call now.',
    bookLinks: [
      { href: '/contact', label: 'Contact our team for a call back' },
      { href: '/terms-conditions', label: 'Read our consultation Terms and Conditions' },
    ],
    faqs: [
      {
        q: 'Is the first consultation really free?',
        a: 'Yes. We offer a free first consultation so you can understand your options before deciding anything.',
      },
      {
        q: 'Do you charge a success fee?',
        a: 'No. Our fees are service-based, and we do not charge a success fee.',
      },
      {
        q: 'Are you a registered migration agent?',
        a: 'Yes. Arun is registered with OMARA under MARN 2418466. You can check it on the OMARA register.',
      },
      {
        q: 'Can you help if my visa was refused?',
        a: 'We help with appeals and reviews. Check your decision letter for the review deadline straight away, because time limits can be short.',
        link: { href: '/appeals', label: 'See appeals and reviews' },
      },
      { q: 'Which languages does Arun speak?', a: 'English, Hindi and Punjabi.' },
      {
        q: 'Can I meet Arun online?',
        a: 'Yes. Phone and video appointments are available.',
      },
      {
        q: 'Can Arun guarantee my visa?',
        a: 'No. The Department of Home Affairs and the ART make the decisions. Arun will tell you honestly what is realistic.',
      },
    ],
  },
  'vipul-goyal': {
    slug: 'vipul-goyal',
    first: 'Vipul',
    name: 'Vipul Goyal',
    h1: 'Vipul Goyal, Managing Director and Registered Migration Agent',
    role: 'Managing Director and Migration Consultant, Registered Migration Agent',
    marn: '2418571',
    seoTitle: 'Vipul Goyal, Migration Agent (MARN 2418571) | Melbourne',
    seoDescription:
      'Vipul Goyal is a registered migration agent (MARN 2418571). He helps employers and workers with sponsored, regional and SA nomination visas.',
    keywords: [
      'Vipul Goyal migration agent',
      'employer sponsored visa agent Melbourne',
      'skills in demand visa 482 agent',
      'DAMA labour agreement',
      'South Australia state nomination agent',
      'regional visa 491 agent',
      'migration agent Adelaide',
    ],
    line: 'Vipul Goyal is a registered migration agent (MARN 2418571) at Bansal Immigration Consultants. He helps Australian businesses and skilled workers with employer sponsorship, regional visas and South Australian state nomination, and he takes a client-focused approach. That means he starts with what you are trying to achieve and works backwards to the right visa.',
    image: '/img/team/vipul-goyal.avif',
    facts: [
      { label: 'MARN', value: '2418571' },
      { label: 'Role', value: 'Managing Director and Migration Consultant, Registered Migration Agent' },
      { label: 'Offices', value: 'Adelaide and Melbourne' },
      { label: 'Languages', value: 'English, Hindi' },
      { label: 'Qualifications', value: 'Graduate Certificate in Australian Migration Law, Bachelor of Business' },
      { label: 'Experience', value: 'More than 8 years in sponsorship and regional programs' },
    ],
    helps: [
      'Employers who want to sponsor an overseas or onshore worker.',
      'Workers whose employer wants to sponsor them for a 482, 186 or 494 visa.',
      'Skilled people looking at regional visas or South Australian nomination.',
      'Businesses in regions that may use a Designated Area Migration Agreement (DAMA).',
    ],
    experience: [
      'Vipul combines postgraduate migration law training with a business degree. He advises Australian sponsors on their sponsorship obligations, labour market testing and the Employer Nomination Scheme (subclass 186) pathway to permanent residency.',
      'He also works on regional migration, including South Australian state nomination programs and DAMAs.',
      'His approach is practical. He sets out the steps, the evidence and the likely timeline so business owners and workers can plan.',
    ],
    howWorks: [
      'Vipul begins with a conversation about your goals, your circumstances and your documents. From there he explains your options, what each one needs and how long things might take.',
      'Our fees are service-based and explained upfront, and we do not charge success fees. If you are not sure which area applies to you, a free first consultation is a good place to start.',
    ],
    qualifications: ['Graduate Certificate in Australian Migration Law', 'Bachelor of Business'],
    registrationNote:
      'Vipul is registered with OMARA, so he has to follow the Code of Conduct for registered migration agents. You can read the Code of Conduct and our Consumer Guide before you book a consultation.',
    registrationLinks: [
      {
        href: 'https://www.legislation.gov.au/F2021L01856/2026-04-01/2026-04-01/text/original/pdf',
        label: 'Code of Conduct',
      },
      { href: '/consumer_guide_english.pdf', label: 'Consumer Guide' },
    ],
    whyChoose: [
      'He is a registered migration agent who follows a professional Code of Conduct.',
      'He brings legal knowledge and a business background to sponsorship and regional visa matters.',
      'He takes a client-focused approach, so your goals come first.',
      'Fees are clear and service-based, with no success fees.',
    ],
    areas: [
      { name: 'Skills in Demand visa (482)', href: '/employer-sponsored/sid-visa-482' },
      { name: 'Employer Nomination Scheme (186)', href: '/employer-sponsored/ens-186-direct' },
      { name: 'Skilled Employer Sponsored Regional (494)', href: '/employer-sponsored/skilled-regional-494' },
      { name: 'Designated Area Migration Agreements', href: '/employer-sponsored/dama' },
      { name: 'Skilled migration: points-based visas and state nomination', href: '/migrate-to-australia' },
      { name: 'South Australia state nomination', href: '/south-australia-state-nomination' },
    ],
    bookText:
      'Ready to talk it through? Book online, call +61 3 9602 1330 or email info@bansalimmigration.com.au. You can meet Vipul in Adelaide or Melbourne, or by phone or video. Employers should bring their business details and the position being filled. If you are in South Australia, you can call our Adelaide office on 08 8317 1340 or email adelaide@bansalimmigration.com.au.',
    bookLinks: [
      { href: '/contact', label: 'Contact our team for a call back' },
      { href: '/terms-conditions', label: 'Read our consultation Terms and Conditions' },
    ],
    faqs: [
      {
        q: 'Which visas can Vipul help with?',
        a: 'Vipul works mainly on employer-sponsored, regional and South Australian nomination visas. If your situation is different, book a consultation and we will point you to the right person on the team.',
      },
      {
        q: 'Does Vipul help employers or workers?',
        a: 'Both. Employers need to meet sponsor obligations. Workers need to meet visa criteria.',
      },
      {
        q: 'Is the first consultation really free?',
        a: 'Yes. We offer a free first consultation so you can understand your options before deciding anything.',
      },
      {
        q: 'Do you charge a success fee?',
        a: 'No. Our fees are service-based, and we do not charge a success fee.',
      },
      {
        q: 'Is Vipul a registered migration agent?',
        a: 'Yes. His MARN is 2418571. You can check it on the OMARA register.',
      },
      {
        q: 'Can Vipul help with South Australia nomination?',
        a: 'Yes. Our South Australia guide explains the streams.',
        link: { href: '/south-australia-state-nomination', label: 'Read the South Australia state nomination guide' },
      },
      {
        q: 'Is my employer required to pay for the visa?',
        a: 'Rules on who may pay which costs are specific. A registered agent can explain what applies to your visa.',
      },
      {
        q: 'Can Vipul guarantee approval?',
        a: 'No. The Department of Home Affairs decides.',
      },
    ],
  },
  'mamta-puri': {
    slug: 'mamta-puri',
    first: 'Mamta',
    name: 'Mamta Puri',
    h1: 'Mamta Puri, Registered Migration Agent',
    role: 'Registered Migration Agent',
    marn: '2418481',
    seoTitle: 'Mamta Puri, Migration Agent (MARN 2418481) | Melbourne',
    seoDescription:
      'Mamta Puri is a registered migration agent (MARN 2418481). She helps couples and families with partner, parent and child visas in Melbourne.',
    keywords: [
      'Mamta Puri migration agent',
      'partner visa agent Melbourne',
      'partner visa 820 801 agent',
      'prospective marriage visa 300',
      'contributory parent visa agent',
      'family visa migration agent',
      'migration agent Adelaide',
    ],
    line: 'Mamta Puri is a registered migration agent (MARN 2418481) at Bansal Immigration Consultants. She helps couples and families bring their lives together in Australia through partner, parent and child visas. Clients can expect thorough, compassionate guidance. She explains each step clearly and takes the time to understand what you are dealing with.',
    image: '/img/team/mamta-puri.avif',
    facts: [
      { label: 'MARN', value: '2418481' },
      { label: 'Role', value: 'Registered Migration Agent' },
      { label: 'Offices', value: 'Melbourne and Adelaide' },
      { label: 'Languages', value: 'English, Hindi' },
      { label: 'Qualifications', value: 'Graduate Certificate in Australian Migration Law, Master of Commerce' },
      { label: 'Experience', value: 'More than 7 years in partner, family and parent visas' },
    ],
    helps: [
      'Couples who want to live together in Australia on a partner visa.',
      'Parents and children who want to join family in Australia.',
      'Families who are not sure which family visa fits their situation.',
      'People dealing with a refusal or a tight deadline who need to know their options.',
    ],
    experience: [
      'Mamta helps couples and families who want to build a life together in Australia. Some come to her at the start of their journey. Others come after a setback, such as a refusal or a visa that is about to expire. In both cases she looks at your whole situation and explains what you can do next, in plain language.',
      'Her focus is partner, parent and child visas.',
    ],
    howWorks: [
      'Mamta starts by listening. She asks about your goals, your circumstances and your documents. Then she explains your options, what each one needs and what the next steps are.',
      'If you are dealing with a refusal or a tight deadline, she will tell you straight away what the time limits are. Our fees are service-based and explained upfront, and we do not charge success fees. If you are not sure which visa fits your situation, a free first consultation is a good way to find out.',
    ],
    qualifications: ['Graduate Certificate in Australian Migration Law', 'Master of Commerce'],
    registrationNote:
      'Mamta is registered with OMARA, so she has to follow the Code of Conduct for registered migration agents. You can read the Code of Conduct and our Consumer Guide before you book a consultation.',
    registrationLinks: [
      {
        href: 'https://www.legislation.gov.au/F2021L01856/2026-04-01/2026-04-01/text/original/pdf',
        label: 'Code of Conduct',
      },
      { href: '/consumer_guide_english.pdf', label: 'Consumer Guide' },
    ],
    whyChoose: [
      'She is a registered migration agent who follows a professional Code of Conduct.',
      'She focuses on partner, parent and child visas, so she knows the family visa process.',
      'She gives thorough, compassionate guidance, which matters when a visa problem is stressful.',
      'Fees are clear and service-based, with no success fees.',
    ],
    areas: [
      { name: 'Partner and family visas: overview', href: '/family-visa' },
      { name: 'Partner onshore (820)', href: '/family-visa/partner-provisional-visa-subclass-820' },
      { name: 'Partner onshore permanent (801)', href: '/family-visa/partner-permanent-visa-subclass-801' },
      { name: 'Partner offshore (309)', href: '/family-visa/partner-provisional-visa-subclass-309' },
      { name: 'Partner offshore permanent (100)', href: '/family-visa/partner-permanent-visa-subclass-100' },
      { name: 'Contributory Parent (143)', href: '/family-visa/contributory-parent-visa-subclass-143' },
    ],
    bookText:
      'Ready to talk it through? Book online, call +61 3 9602 1330 or email info@bansalimmigration.com.au. You can meet Mamta in Melbourne or Adelaide, or by phone or video. If you have a refusal or a tight deadline, call now.',
    bookLinks: [
      { href: '/contact', label: 'Contact our team for a call back' },
      { href: '/terms-conditions', label: 'Read our consultation Terms and Conditions' },
    ],
    faqs: [
      {
        q: 'Which visas can Mamta help with?',
        a: 'Mamta works mainly with partner, parent and child visas. If your situation is different, book a consultation and we will point you to the right person on the team.',
        link: { href: '/family-visa', label: 'See partner and family visas' },
      },
      {
        q: 'My visa was refused. Can you help?',
        a: 'Check your decision letter for the review deadline straight away, because time limits can be short. Contact us so we can look at your options.',
        link: { href: '/appeals', label: 'See appeals and reviews' },
      },
      {
        q: 'Is the first consultation free?',
        a: 'Yes. We offer a free first consultation so you can understand your options before you decide.',
      },
      {
        q: 'Do you charge a success fee?',
        a: 'No. Our fees are service-based, and we do not charge a success fee.',
      },
      {
        q: 'Is Mamta a registered migration agent?',
        a: 'Yes. Her MARN is 2418481. You can check it on the OMARA register.',
      },
      {
        q: 'Can Mamta guarantee approval?',
        a: 'No. The Department of Home Affairs decides.',
      },
    ],
  },
  'shubam-kumar': placeholderAgent({
    slug: 'shubam-kumar',
    first: 'Shubam',
    name: 'Shubam Kumar',
    pronoun: 'His',
    languages: 'English, Hindi, Punjabi',
  }),
  shaveena: placeholderAgent({
    slug: 'shaveena',
    first: 'Shaveena',
    name: 'Shaveena',
    pronoun: 'Her',
    languages: 'English, Hindi, Punjabi',
  }),
  'vijay-patel': placeholderAgent({
    slug: 'vijay-patel',
    first: 'Vijay',
    name: 'Vijay Patel',
    pronoun: 'His',
    languages: 'English, Hindi, Gujarati',
  }),
  'celesty-parmar': {
    slug: 'celesty-parmar',
    first: 'Celesty',
    name: 'Celesty Parmar',
    h1: 'Celesty Parmar, Registered Migration Agent',
    role: 'Registered Migration Agent',
    seoTitle: 'Celesty Parmar, Registered Migration Agent | Melbourne',
    seoDescription:
      'Celesty Parmar is a registered migration agent in Melbourne. She guides students and graduates on student, graduate and skilled visa pathways.',
    keywords: [
      'Celesty Parmar migration consultant',
      'student visa consultant Melbourne',
      'temporary graduate visa 485 help',
      'skills assessment guidance',
      'education migration consultant Melbourne',
      'student visa subclass 500 advice',
    ],
    line: 'Celesty guides international students and graduates from course choice to graduate and skilled visa options.',
    image: '/img/team/celesty-parmar.svg',
    facts: [
      { label: 'Role', value: 'Registered Migration Agent' },
      { label: 'Office', value: 'Melbourne' },
      { label: 'Languages', value: 'English, Hindi, Gujarati' },
      { label: 'Focus', value: 'Australian migration law and education' },
    ],
    helps: [
      'Students planning a course and a Student visa (subclass 500).',
      'Graduates looking at the Temporary Graduate visa (subclass 485).',
      'Students and graduates who want to plan a skills assessment.',
      'Skilled graduates who want to understand permanent residency options (189, 190, 491).',
    ],
    experience: [
      'Celesty Parmar is a registered migration agent at Bansal Immigration. She is an Australian migration law and education specialist.',
      'She gives practical, step-by-step guidance to international graduates and technical professionals who are in Australia. Her work covers Student visas (500), Temporary Graduate visas (485) and skills assessment planning for permanent residency.',
      'She works with clients to build a timeline, so that study choices and work experience line up with current Australian state and territory priorities.',
    ],
    qualifications: [],
    registrationNote:
      'Celesty is a registered migration agent, so she has to follow the Code of Conduct for registered migration agents. You can read the Code of Conduct and our Consumer Guide before you book.',
    registrationLinks: [
      {
        href: 'https://www.legislation.gov.au/F2021L01856/2026-04-01/2026-04-01/text/original/pdf',
        label: 'Code of Conduct',
      },
      { href: '/consumer_guide_english.pdf', label: 'Consumer Guide' },
    ],
    areas: [
      { name: 'Student visa (500)', href: '/study-australia' },
      { name: 'Temporary Graduate visa (485)', href: '/study-australia' },
      { name: 'Skills assessment guidance', href: '/occupation-finder' },
      { name: 'Skilled migration (189, 190, 491)', href: '/migrate-to-australia' },
    ],
    bookText:
      'Meet Celesty in Melbourne, or by phone or video. Bring your Confirmation of Enrolment, course details and passport.',
    faqs: [
      {
        q: 'Can Celesty help me choose a course?',
        a: 'She can explain how course choice affects your visa and later options.',
        link: { href: '/study-australia/student-visa-financial-calculator', label: 'Try the Student Visa Financial Calculator' },
      },
      {
        q: 'Can she help with a graduate visa?',
        a: 'Yes. She works on Temporary Graduate (485) matters.',
      },
      { q: 'Which languages does Celesty speak?', a: 'English, Hindi and Gujarati.' },
      {
        q: 'Can Celesty guarantee my visa?',
        a: 'No. The Department of Home Affairs decides.',
      },
    ],
  },
};

export const PROFILE_SLUGS = Object.keys(PROFILES);
