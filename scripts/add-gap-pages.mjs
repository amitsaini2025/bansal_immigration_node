import fs from 'fs';

const pagesPath = new URL('../content/pages.json', import.meta.url);
const indexPath = new URL('../content/index.json', import.meta.url);

const pricing =
  'These amounts are from the Department of Home Affairs [current visa pricing table](https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges/current-visa-pricing). Charges can change. Check the table before you apply. Some citizens of Pacific Island countries, Timor-Leste and ASEAN countries pay less for some visas.';
const times =
  'Check the [Home Affairs guide](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times). It shows recent decisions. It is not a promise for your application.';

const p = (x) => ({ t: 'p', x });
const h3 = (x) => ({ t: 'h3', x });
const ul = (items) => ({ t: 'ul', items: items.map((x) => ({ x })) });
const ol = (items) => ({ t: 'ol', items: items.map((x) => ({ x })) });

function costTable(rows) {
  return {
    t: 'table',
    head: ['Item', 'Amount', 'What it covers'],
    rows,
  };
}

function visaPage({
  path,
  category,
  name,
  primaryKeyword,
  keywords,
  pageType,
  title,
  description,
  h1,
  intro,
  facts,
  overview,
  eligibility,
  benefits,
  steps,
  duration,
  pathways,
  costs,
  related,
  faqs,
}) {
  return {
    path,
    category,
    isHub: false,
    name,
    primaryKeyword,
    keywords,
    pageType,
    seo: { title, description, h1 },
    hero: {
      badge: '',
      h1,
      intro,
      buttons: [
        { label: 'Book a Consultation', href: '/book-an-appointment' },
        { label: 'How to Apply', href: '#how-to-apply' },
      ],
      phone: true,
    },
    sections: [
      {
        id: 'key-facts-box',
        name: 'Key facts box',
        kind: 'keyfacts',
        h2: 'Key facts',
        blocks: [{ t: 'table', head: ['Fact', 'Detail'], rows: facts }],
      },
      { id: 'overview', name: 'Overview', kind: 'prose', h2: 'Overview', blocks: overview.map(p) },
      {
        id: 'eligibility',
        name: 'Eligibility',
        kind: 'prose',
        h2: 'Do You Have What It Takes?',
        blocks: [ul(eligibility)],
      },
      {
        id: 'benefits',
        name: 'Benefits',
        kind: 'prose',
        h2: 'Why Choose This Path?',
        blocks: [ul(benefits)],
      },
      {
        id: 'how-to-apply',
        name: 'How to apply',
        kind: 'prose',
        h2: 'Your Roadmap to Success',
        blocks: [ol(steps)],
      },
      {
        id: 'duration',
        name: 'Visa duration',
        kind: 'prose',
        h2: 'Visa Duration',
        blocks: [ul(duration)],
      },
      { id: 'pathways', name: 'Visa pathways', kind: 'prose', h2: 'Visa Pathways', blocks: pathways },
      {
        id: 'processing-times',
        name: 'Processing times',
        kind: 'prose',
        h2: 'Processing times',
        blocks: [{ t: 'table', head: ['Type', 'Time'], rows: [['Visa', times]] }],
      },
      { id: 'costs', name: 'Costs', kind: 'prose', h2: 'Visa application charge', blocks: costs },
      {
        id: 'related',
        name: 'Related pages',
        kind: 'related',
        h2: 'Related pages',
        blocks: [ul(related)],
      },
    ],
    faqs,
    cta: {
      title: 'Talk to a registered migration agent',
      text: 'Book a consultation or call +61 3 9602 1330. Adelaide office: +61 8 8317 1340.',
    },
    form: true,
  };
}

const pages = {};

pages['/employer-sponsored/ens-186-labour-agreement'] = visaPage({
  path: '/employer-sponsored/ens-186-labour-agreement',
  category: 'employer-sponsored',
  name: 'ENS 186 Labour Agreement Stream',
  primaryKeyword: '186 labour agreement stream',
  keywords: [
    '186 labour agreement visa',
    'ENS 186 DAMA permanent residence',
    '186 visa labour agreement requirements',
    'DAMA to 186',
    'employer nomination scheme labour agreement',
  ],
  pageType: 'Visa subpage (permanent employer-sponsored visa, labour agreement stream)',
  title: 'ENS 186 Labour Agreement Stream | Bansal Immigration',
  description:
    'The subclass 186 Labour Agreement stream is the permanent visa for workers nominated under a labour agreement, including DAMA. Permanent residence is not automatic.',
  h1: 'Employer Nomination Scheme 186 (Labour Agreement)',
  intro: [
    'This permanent visa is for a worker nominated by an employer that has a labour agreement with the Australian Government. The agreement, not the standard 186 rules, sets the occupation, age, English, skills and experience. The agreement must allow permanent residence for that occupation. A Designated Area Migration Agreement is one type of labour agreement. Permanent residence is not automatic.',
  ],
  facts: [
    ['Duration', 'Permanent'],
    ['Cost', 'AUD 6,140 for the main applicant'],
    ['Processing Time', 'No set time. Check the Department\'s guide'],
    ['Pathway', 'Australian citizenship after permanent residence'],
  ],
  overview: [
    'The **Labour Agreement stream** sits beside the [Temporary Residence Transition stream](/employer-sponsored/ens-186-trt) and the [Direct Entry stream](/employer-sponsored/ens-186-direct). Use this stream when the employer is a party to a current labour agreement and that agreement includes a permanent residence option for your occupation.',
    'Labour agreements include [Designated Area Migration Agreements (DAMA)](/employer-sponsored/dama), industry labour agreements and company-specific labour agreements. New [Global Talent Employer Sponsored](/employer-sponsored/gtes) agreements are closed. An older agreement only helps if it is still in force and it includes your occupation.',
    'You cannot apply for this stream on your own. The employer nominates you. You then apply for the visa.',
  ],
  eligibility: [
    'Your employer is a party to a current labour agreement.',
    'The agreement includes permanent residence for your occupation. If it does not, this stream is not open to you.',
    'You will work for that employer in the nominated position.',
    'You meet the age, English, skills, qualifications and experience set out in the agreement. If the agreement has no age concession, the usual age limit is under 45.',
    'The terms of employment are no less favourable than those for an Australian worker doing equivalent work.',
    'You meet health and character requirements.',
    'Get a skills assessment only if the labour agreement or the Department asks for one.',
  ],
  benefits: [
    'Permanent residence if the agreement includes that option and the visa is granted.',
    'Occupations that are not on the standard skilled lists, where the agreement lists them.',
    'Concessions on age, English or salary only where that agreement gives them.',
    'You can include eligible family members.',
    'After grant, you can live and work in Australia as a permanent resident. Citizenship has its own residence test.',
  ],
  steps: [
    'Read the labour agreement for your occupation. Confirm it includes permanent residence, and note the age, English, skills and salary rules.',
    'If the pathway is a DAMA, start with the [DAMA page](/employer-sponsored/dama), then the [South Australia](/employer-sponsored/dama-south-australia) or [Victoria](/employer-sponsored/dama-victoria) page if that is the region.',
    'The employer lodges a nomination under the Labour Agreement stream.',
    'You lodge the visa application and pay the visa application charge.',
    'Provide evidence that you meet the agreement, plus health and character documents.',
    'Answer any request from the Department, including a skills assessment if one is requested.',
    'If the visa is granted, check the conditions and the date you must enter Australia if you are outside the country.',
  ],
  duration: ['**Initial duration.** Permanent.'],
  pathways: [
    h3('Australian citizenship after permanent residence'),
    p('You can apply for [Australian citizenship by conferral](/citizenship/citizenship-by-conferral) after you have lived in Australia for 4 years, including at least 12 months as a permanent resident. You also need to meet the character rules and, in most cases, pass the [citizenship test](/citizenship/citizenship-test). Permanent residence is not automatic, and citizenship is a separate application.'),
  ],
  costs: [
    costTable([
      ['Base application charge', 'AUD 6,140', 'Same subclass 186 base charge published for the other 186 streams'],
      ['Additional applicant, 18 or over', 'AUD 3,070', 'Each extra applicant aged 18 or over'],
      ['Additional applicant, under 18', 'AUD 1,535', 'Each extra applicant under 18'],
    ]),
    p(pricing),
    p('If the main applicant does not have functional English, a second charge of AUD 9,800 is paid before the visa is granted. For each other applicant aged 18 or over, that second charge is AUD 4,890. It is nil for a person who has functional English. A labour agreement may set a different English level for the visa criteria. The second charge is separate. Check the pricing table.'),
    p('The employer also pays nomination charges and the Skilling Australians Fund levy. Those are not part of the visa application charge. See the [nomination guide](/employer-sponsored/nomination-process).'),
  ],
  related: [
    '[ENS 186 Temporary Residence Transition](/employer-sponsored/ens-186-trt)',
    '[ENS 186 Direct Entry](/employer-sponsored/ens-186-direct)',
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[482 Core Skills stream](/employer-sponsored/sid-482-core-skills)',
    '[482 Specialist Skills stream](/employer-sponsored/sid-482-specialist-skills)',
    '[DAMA](/employer-sponsored/dama)',
    '[DAMA South Australia](/employer-sponsored/dama-south-australia)',
    '[DAMA Victoria](/employer-sponsored/dama-victoria)',
    '[Skilled Employer Sponsored Regional (494)](/employer-sponsored/skilled-regional-494)',
  ],
  faqs: [
    {
      q: 'Is this the DAMA permanent visa?',
      a: 'Often, yes. Most DAMA pathways use the Labour Agreement stream of subclass 482, 494 or 186. Permanent residence is available only if that agreement includes it for your occupation.',
    },
    {
      q: 'Do I need a skills assessment before I apply?',
      a: 'Not unless the labour agreement or the Department asks for one. Do not order one in advance on the assumption that every 186 applicant needs it. Direct Entry is different.',
    },
    {
      q: 'What is the age limit?',
      a: 'Under 45, unless the labour agreement gives a higher age for your occupation. Read the agreement. Do not rely on a concession from a different region or a different occupation.',
    },
  ],
});

pages['/employer-sponsored/sid-482-core-skills'] = visaPage({
  path: '/employer-sponsored/sid-482-core-skills',
  category: 'employer-sponsored',
  name: 'Skills in Demand 482 Core Skills Stream',
  primaryKeyword: '482 core skills stream',
  keywords: [
    '482 core skills visa',
    'core skills occupation list',
    'core skills income threshold',
    'SID visa CSOL',
    '482 to 186 core skills',
  ],
  pageType: 'Visa subpage (temporary employer-sponsored work visa, core skills stream)',
  title: '482 Core Skills Stream | Skills in Demand Visa | Bansal Immigration',
  description:
    'The Core Skills stream of the subclass 482 visa is for occupations on the Core Skills Occupation List. Pay must meet the market rate and the Core Skills Income Threshold.',
  h1: 'Skills in Demand Visa (482) Core Skills Stream',
  intro: [
    'The Core Skills stream is the main Skills in Demand pathway. Your occupation must be on the Core Skills Occupation List. Your pay must meet the annual market salary rate and the Core Skills Income Threshold. For nominations lodged from 1 July 2026 to 30 June 2027, that threshold is AUD 79,423. Superannuation is not included. This is a temporary visa. It does not itself give permanent residence.',
  ],
  facts: [
    ['Duration', 'Up to 4 years, or up to 5 years for an eligible Hong Kong or British National (Overseas) passport'],
    ['Cost', 'AUD 4,015 for the main applicant'],
    ['Processing Time', 'No set time. Check the Department\'s guide'],
    ['Pathway', 'Employer Nomination Scheme subclass 186, if you qualify later'],
  ],
  overview: [
    'This page is the Core Skills stream only. The full [Skills in Demand (482)](/employer-sponsored/sid-visa-482) visa also has a [Specialist Skills stream](/employer-sponsored/sid-482-specialist-skills) and a Labour Agreement stream, including [DAMA](/employer-sponsored/dama). The old short-term and medium-term streams are closed. Do not use the old occupation lists for a new 482.',
    'A family member can apply as a subsequent entrant if you hold a 482, or if you still hold a 457. A new subclass 457 is closed.',
  ],
  eligibility: [
    'An approved sponsor nominates you. Most employers need [standard business sponsorship](/employer-sponsored/standard-business-sponsorship).',
    'The occupation is on the Core Skills Occupation List.',
    'You have the skills and experience for the occupation. In most cases that includes at least 1 year of relevant full-time work.',
    'Your pay is at least the annual market salary rate and at least the Core Skills Income Threshold. For nominations lodged from 1 July 2026 to 30 June 2027, the threshold is AUD 79,423. Superannuation is not included.',
    'You meet the English requirement for this stream.',
    'You meet health and character requirements and you hold adequate health insurance in Australia.',
    'Labour market testing can apply to the nomination. See the [nomination guide](/employer-sponsored/nomination-process).',
  ],
  benefits: [
    'A wide range of skilled occupations, including many trades that are on the Core Skills Occupation List.',
    'Stay of up to 4 years, or up to 5 years if you hold a Hong Kong or British National (Overseas) passport.',
    'Eligible family members can be included or can apply later as subsequent entrants.',
    'A later pathway to the [186 Temporary Residence Transition stream](/employer-sponsored/ens-186-trt) if you meet that visa\'s rules. Permanent residence is not automatic.',
  ],
  steps: [
    'Confirm the occupation is on the Core Skills Occupation List and that the pay meets both the market rate and AUD 79,423 for a nomination in the 2026–27 year.',
    'The employer becomes, or already is, an approved standard business sponsor.',
    'The employer lodges the nomination. See the [nomination guide](/employer-sponsored/nomination-process).',
    'You gather identity, qualifications, work experience, English and health insurance evidence.',
    'You lodge the visa in ImmiAccount and pay the visa application charge.',
    'Answer any request from the Department. If the visa is granted, work only as the conditions allow.',
  ],
  duration: [
    '**Stay.** Up to 4 years.',
    '**Hong Kong and British National (Overseas) passports.** Up to 5 years.',
  ],
  pathways: [
    h3('Temporary Residence Transition, subclass 186'),
    p('After 2 years of full-time work in the nominated occupation in the 3 years before you apply, your most recent approved sponsor can nominate you for the [186 Temporary Residence Transition stream](/employer-sponsored/ens-186-trt). Unpaid leave does not count. You are usually under 45 unless an exemption applies. The employer must nominate you again. Permanent residence is not automatic.'),
    p('If your employer uses a labour agreement instead of the Core Skills stream, the permanent visa may be the [186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement). The agreement sets that path.'),
  ],
  costs: [
    costTable([
      ['Base application charge', 'AUD 4,015', 'Core Skills stream. The same base charge applies to Specialist Skills and Labour Agreement'],
      ['Additional applicant, 18 or over', 'AUD 4,015', 'Each extra applicant aged 18 or over'],
      ['Additional applicant, under 18', 'AUD 1,005', 'Each extra applicant under 18'],
    ]),
    p(pricing),
    p('The employer pays the Skilling Australians Fund levy and the nomination charge. Those are separate from the visa application charge.'),
  ],
  related: [
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[482 Specialist Skills stream](/employer-sponsored/sid-482-specialist-skills)',
    '[186 Temporary Residence Transition](/employer-sponsored/ens-186-trt)',
    '[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)',
    '[Standard business sponsorship](/employer-sponsored/standard-business-sponsorship)',
    '[Nomination guide](/employer-sponsored/nomination-process)',
    '[DAMA](/employer-sponsored/dama)',
  ],
  faqs: [
    {
      q: 'What is the salary threshold?',
      a: 'For nominations lodged from 1 July 2026 to 30 June 2027, the Core Skills Income Threshold is AUD 79,423. You must also be paid the annual market salary rate if that rate is higher. Superannuation is not included.',
    },
    {
      q: 'Is this the old medium-term stream?',
      a: 'No. The old short-term and medium-term streams are closed. A new Core Skills application uses the Core Skills Occupation List and the Core Skills Income Threshold.',
    },
    {
      q: 'Can I change employers?',
      a: 'The visa is tied to your sponsor. If you stop working for them, check the conditions on your grant before you start with a new employer. You may have a limited time, often 180 days, to find a new approved sponsor. The grant letter controls.',
    },
  ],
});

pages['/employer-sponsored/sid-482-specialist-skills'] = visaPage({
  path: '/employer-sponsored/sid-482-specialist-skills',
  category: 'employer-sponsored',
  name: 'Skills in Demand 482 Specialist Skills Stream',
  primaryKeyword: '482 specialist skills stream',
  keywords: [
    '482 specialist skills visa',
    'specialist skills income threshold',
    'SID visa high salary',
    '482 ANZSCO major groups',
    'specialist skills to 186',
  ],
  pageType: 'Visa subpage (temporary employer-sponsored work visa, specialist skills stream)',
  title: '482 Specialist Skills Stream | Skills in Demand Visa | Bansal Immigration',
  description:
    'The Specialist Skills stream of the subclass 482 visa is for highly paid roles in eligible ANZSCO groups. There is no Core Skills Occupation List for this stream.',
  h1: 'Skills in Demand Visa (482) Specialist Skills Stream',
  intro: [
    'The Specialist Skills stream is for highly paid specialists. There is no Core Skills Occupation List for this stream. The occupation must be in ANZSCO major group 1, 2, 4, 5 or 6, and the pay must meet the market rate and the Specialist Skills Income Threshold. For nominations lodged from 1 July 2026 to 30 June 2027, that threshold is AUD 146,576. Superannuation is not included.',
  ],
  facts: [
    ['Duration', 'Up to 4 years, or up to 5 years for an eligible Hong Kong or British National (Overseas) passport'],
    ['Cost', 'AUD 4,015 for the main applicant'],
    ['Processing Time', 'No set time. Home Affairs gives this stream priority. Check the guide'],
    ['Pathway', 'Employer Nomination Scheme subclass 186, if you qualify later'],
  ],
  overview: [
    'Use this stream when the salary is high enough and the occupation is in an eligible major group. Trades, machinery operators and labourers are not in this stream. Those roles are ANZSCO major groups 3, 7 and 8. They need the [Core Skills stream](/employer-sponsored/sid-482-core-skills) if the occupation is on the Core Skills Occupation List, or a [labour agreement](/employer-sponsored/dama) if it is not.',
    'The parent page is [Skills in Demand (482)](/employer-sponsored/sid-visa-482). The old short-term and medium-term streams are closed.',
  ],
  eligibility: [
    'An approved standard business sponsor nominates you. See [standard business sponsorship](/employer-sponsored/standard-business-sponsorship).',
    'The occupation is in ANZSCO major group 1, 2, 4, 5 or 6.',
    'Your pay is at least the annual market salary rate and at least the Specialist Skills Income Threshold. For nominations lodged from 1 July 2026 to 30 June 2027, the threshold is AUD 146,576. Superannuation is not included.',
    'You have the skills and experience for the occupation. In most cases that includes at least 1 year of relevant full-time work.',
    'You meet the English requirement for this stream, and you meet health and character requirements.',
    'You hold adequate health insurance in Australia.',
  ],
  benefits: [
    'No Core Skills Occupation List for eligible major groups.',
    'Home Affairs gives this stream priority processing. There is still no set time.',
    'Stay of up to 4 years, or up to 5 years for an eligible Hong Kong or British National (Overseas) passport.',
    'A later pathway to the [186 Temporary Residence Transition stream](/employer-sponsored/ens-186-trt) after 2 years of full-time sponsored work, if you meet that visa\'s rules.',
  ],
  steps: [
    'Confirm the ANZSCO major group and that the pay is at least AUD 146,576, or the market rate if that is higher, for a nomination in the 2026–27 year.',
    'The employer holds standard business sponsorship and lodges the nomination. See the [nomination guide](/employer-sponsored/nomination-process).',
    'You lodge the visa with identity, skills, English, health insurance, health and character evidence.',
    'If the visa is granted, work only as the conditions allow.',
  ],
  duration: [
    '**Stay.** Up to 4 years.',
    '**Hong Kong and British National (Overseas) passports.** Up to 5 years.',
  ],
  pathways: [
    h3('Temporary Residence Transition, subclass 186'),
    p('The [186 Temporary Residence Transition stream](/employer-sponsored/ens-186-trt) is open to Specialist Skills holders after 2 years of full-time work in the nominated occupation in the last 3 years. Your most recent sponsor must nominate you again. You are usually under 45 unless an exemption applies. Permanent residence is not automatic.'),
  ],
  costs: [
    costTable([
      ['Base application charge', 'AUD 4,015', 'Same base charge as the Core Skills and Labour Agreement streams'],
      ['Additional applicant, 18 or over', 'AUD 4,015', 'Each extra applicant aged 18 or over'],
      ['Additional applicant, under 18', 'AUD 1,005', 'Each extra applicant under 18'],
    ]),
    p(pricing),
    p('The employer pays the Skilling Australians Fund levy and the nomination charge. Those are separate from the visa application charge.'),
  ],
  related: [
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[482 Core Skills stream](/employer-sponsored/sid-482-core-skills)',
    '[186 Temporary Residence Transition](/employer-sponsored/ens-186-trt)',
    '[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)',
    '[Standard business sponsorship](/employer-sponsored/standard-business-sponsorship)',
    '[Nomination guide](/employer-sponsored/nomination-process)',
  ],
  faqs: [
    {
      q: 'Is my occupation eligible?',
      a: 'It is generally eligible if it is in ANZSCO major group 1, 2, 4, 5 or 6 and the salary meets the Specialist Skills Income Threshold and the market rate. Major groups 3, 7 and 8 are excluded from this stream.',
    },
    {
      q: 'Is processing faster?',
      a: 'Home Affairs gives Specialist Skills nominations and visas priority. There is still no set processing time. Use the Home Affairs processing times guide.',
    },
    {
      q: 'Do I still need the market salary rate?',
      a: 'Yes. The pay must be at least the higher of the Specialist Skills Income Threshold and the annual market salary rate for the role. Superannuation is not included.',
    },
  ],
});

pages['/migrate-to-australia/skilled-independent-189-hong-kong'] = visaPage({
  path: '/migrate-to-australia/skilled-independent-189-hong-kong',
  category: 'migrate-to-australia',
  name: 'Skilled Independent 189 Hong Kong Stream',
  primaryKeyword: '189 Hong Kong stream',
  keywords: [
    'subclass 189 Hong Kong stream',
    '189 visa BNO passport',
    'Hong Kong permanent residence Australia',
    '189 no points test',
    '482 to 189 Hong Kong',
  ],
  pageType: 'Visa subpage (permanent skilled visa, Hong Kong stream)',
  title: '189 Hong Kong Stream | Skilled Independent Visa | Bansal Immigration',
  description:
    'The Hong Kong stream of subclass 189 is a permanent visa for eligible Hong Kong and British National (Overseas) passport holders. There is no points test and no invitation.',
  h1: 'Skilled Independent Visa (189) Hong Kong Stream',
  intro: [
    'The Hong Kong stream of the subclass 189 visa is permanent residence for people who hold a Hong Kong Special Administrative Region passport or a British National (Overseas) passport. There is no points test and no invitation. You must hold an eligible subclass 457, 482 or 485 visa and have been usually resident in Australia for a continuous period of at least 4 years immediately before you apply. A new subclass 457 is closed. The checklist on the main 189 page is for the points-tested stream only.',
  ],
  facts: [
    ['Duration', 'Permanent'],
    ['Cost', 'Check the pricing table. The points-tested stream on our 189 page is AUD 6,135'],
    ['Processing Time', 'No set time. Check the Department\'s guide'],
    ['Pathway', 'Australian citizenship after permanent residence'],
  ],
  overview: [
    'This is not the [points-tested subclass 189](/migrate-to-australia/skilled-independent-visa-subclass-189). You do not need a skills assessment, an expression of interest or an invitation for the Hong Kong stream. You do need the right passport, an eligible temporary visa, and 4 years of usual residence in Australia.',
    'The eligible visas are subclass 457, [482](/employer-sponsored/sid-visa-482) and [485](/migrate-to-australia/temporary-graduate-visa-subclass-485). You must hold the eligible visa as the primary holder. A new subclass 457 is closed. You can only use a 457 if you still hold one. Home Affairs applies extra rules about which visa grant counts, including when it was granted. Check those rules against your grant letters before you lodge.',
    'If you lived in a designated regional area, also read the [191 Hong Kong stream](/migrate-to-australia/permanent-residence-191-hong-kong). That stream uses a 3-year regional residence test.',
  ],
  eligibility: [
    'You hold a Hong Kong SAR passport or a British National (Overseas) passport.',
    'You hold an eligible subclass 457, 482 or 485 visa, granted to you as the primary applicant. A new 457 is closed.',
    'You have been usually resident in Australia for a continuous period of at least 4 years immediately before you apply.',
    'You have complied with the conditions of that visa.',
    'You meet health and character requirements.',
    'You can show functional English, or you pay the second visa application charge if the Department requests it for an applicant aged 18 or over.',
    'Family members can be included. They do not have to meet the 4-year primary-holder test themselves. They must meet health and character requirements.',
  ],
  benefits: [
    'Permanent residence without a points test or an invitation.',
    'No upper age limit on this stream.',
    'After grant, you can live and work anywhere in Australia.',
    'A separate pathway to [citizenship by conferral](/citizenship/citizenship-by-conferral) once you meet the citizenship residence rules.',
  ],
  steps: [
    'Check your passport and your visa grant letters. Confirm you are the primary holder of an eligible 457, 482 or 485, and that a new 457 is not being used.',
    'Gather evidence of usual residence for the 4 years immediately before lodgement: leases, employment, bills and travel records. Short trips are assessed. Long absences can break usual residence.',
    'Lodge in ImmiAccount with identity, visa history, residence, health and character evidence.',
    'Answer any request. If an applicant aged 18 or over does not have functional English, budget for the second charge.',
    'If the visa is granted, permanent residence starts from the grant. Citizenship is a later, separate application.',
  ],
  duration: ['**Initial duration.** Permanent.'],
  pathways: [
    h3('Citizenship, and the regional alternative'),
    p('Citizenship needs 4 years of residence, including 12 months as a permanent resident, plus character requirements and, in most cases, the [citizenship test](/citizenship/citizenship-test). See [citizenship by conferral](/citizenship/citizenship-by-conferral).'),
    p('If your 4 years were not all in Australia, but you have 3 years in a designated regional area on an eligible 457, 482 or 485, look at the [191 Hong Kong stream](/migrate-to-australia/permanent-residence-191-hong-kong). Use the [postcode checker](/postcode-checker) for the address.'),
  ],
  costs: [
    p('The [points-tested 189 page](/migrate-to-australia/skilled-independent-visa-subclass-189) publishes a base charge of AUD 6,135 for the main applicant, AUD 3,070 for each additional applicant aged 18 or over, and AUD 1,540 for each additional applicant under 18. That table is labelled for the points-tested stream. Check the pricing table for the Hong Kong stream before you lodge.'),
    p(pricing),
    p('If an applicant aged 18 or over does not have functional English, a second charge of AUD 4,885 can apply before the visa is granted. It is nil if they have functional English. Confirm this figure on the pricing table as well.'),
  ],
  related: [
    '[Skilled Independent (189) points-tested stream](/migrate-to-australia/skilled-independent-visa-subclass-189)',
    '[191 Hong Kong stream](/migrate-to-australia/permanent-residence-191-hong-kong)',
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[Temporary Graduate (485)](/migrate-to-australia/temporary-graduate-visa-subclass-485)',
    '[Post Study Work (485)](/migrate-to-australia/post-study-work-visa-subclass-485)',
    '[Citizenship by conferral](/citizenship/citizenship-by-conferral)',
  ],
  faqs: [
    {
      q: 'Is there a points test?',
      a: 'No. The Hong Kong stream does not use the points test and does not need an invitation.',
    },
    {
      q: 'Does time on a student visa count?',
      a: 'Student visa time can be part of your usual residence in Australia. The visa you must hold for this stream is still an eligible 457, 482 or 485 as the primary holder. A student visa alone does not meet that requirement.',
    },
    {
      q: 'What if I have spent time outside Australia?',
      a: 'Usual residence looks at where you actually lived and whether Australia was your home. Significant absences can affect the 4-year test. Bring your travel records to a consultation before you lodge.',
    },
  ],
});

pages['/migrate-to-australia/permanent-residence-191-hong-kong'] = visaPage({
  path: '/migrate-to-australia/permanent-residence-191-hong-kong',
  category: 'migrate-to-australia',
  name: 'Permanent Residence 191 Hong Kong Stream',
  primaryKeyword: '191 Hong Kong stream',
  keywords: [
    'subclass 191 Hong Kong stream',
    '191 visa regional Hong Kong',
    'BNO 191 visa',
    '191 visa designated regional area',
    '457 482 485 to 191',
  ],
  pageType: 'Visa subpage (permanent regional visa, Hong Kong stream)',
  title: '191 Hong Kong Stream | Permanent Residence Regional | Bansal Immigration',
  description:
    'The Hong Kong stream of subclass 191 is permanent residence for eligible Hong Kong and British National (Overseas) passport holders who have lived in regional Australia for 3 years.',
  h1: 'Permanent Residence (Skilled Regional) Visa (191) Hong Kong Stream',
  intro: [
    'The Hong Kong stream of subclass 191 is a permanent visa for people who hold a Hong Kong passport or a British National (Overseas) passport, hold an eligible subclass 457, 482 or 485 visa, and have lived in a designated regional area for at least 3 years. There is no points test and no invitation. This is not the pathway for subclass 491 or 494 holders.',
  ],
  facts: [
    ['Duration', 'Permanent'],
    ['Cost', 'Not the AUD 630 regional provisional charge. Check the pricing table'],
    ['Processing Time', 'No set time. Check the Department\'s guide'],
    ['Pathway', 'Australian citizenship after permanent residence'],
  ],
  overview: [
    'The [main 191 page](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191) covers the regional provisional stream. That stream is for people who have held a [491](/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491) or a [494](/employer-sponsored/skilled-regional-494) for at least 3 years and who provide tax notices for 3 income years. The Hong Kong stream is a different set of rules.',
    'For this stream you need a Hong Kong SAR or British National (Overseas) passport, an eligible 457, 482 or 485 held as the primary applicant, and usual residence in a designated regional area for a continuous period of at least 3 years immediately before you apply. During that period you need to have lived, worked and studied only in a designated regional area. A new subclass 457 is closed.',
    'The taxable-income test and the Australian Taxation Office notices belong to the regional provisional stream. They are not the test for this Hong Kong stream.',
  ],
  eligibility: [
    'You hold a Hong Kong SAR passport or a British National (Overseas) passport.',
    'You hold an eligible subclass 457, 482 or 485 visa as the primary holder. A new 457 is closed.',
    'You have been usually resident in a designated regional area for a continuous period of at least 3 years immediately before you apply.',
    'During those 3 years you lived, worked and studied only in a designated regional area. Check the address on the [postcode checker](/postcode-checker).',
    'You meet health and character requirements.',
    'You have complied with the conditions of your eligible visa.',
  ],
  benefits: [
    'Permanent residence without a points test, an invitation or an employer nomination.',
    'No upper age limit on this stream.',
    'After grant, you can live and work anywhere in Australia. The regional limit applies to the 3 years before grant, not to your life after grant.',
    'Eligible family members can be included.',
  ],
  steps: [
    'Confirm this is the Hong Kong stream and not the 491 or 494 stream on the [main 191 page](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191).',
    'Check each address for the last 3 years on the [postcode checker](/postcode-checker). Gather leases, work records and study records that show you stayed in a designated regional area.',
    'Check your grant letters for the eligible 457, 482 or 485, including when it was granted. Home Affairs applies extra rules here.',
    'Lodge in ImmiAccount with identity, passport, visa history, regional residence evidence, health and character documents.',
    'If the visa is granted, you can live anywhere in Australia. Citizenship is a separate application.',
  ],
  duration: ['**Initial duration.** Permanent.'],
  pathways: [
    h3('If you were not in a regional area'),
    p('If you have been usually resident anywhere in Australia for 4 years, rather than 3 years in a designated regional area, read the [189 Hong Kong stream](/migrate-to-australia/skilled-independent-189-hong-kong).'),
    p('After grant, [citizenship by conferral](/citizenship/citizenship-by-conferral) needs 4 years of residence, including 12 months as a permanent resident, plus the character rules and in most cases the [citizenship test](/citizenship/citizenship-test).'),
  ],
  costs: [
    p('The regional provisional stream of subclass 191 is AUD 630 for the main applicant on our [191 page](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191). That page states that the Hong Kong stream is a different charge. Do not pay or budget the AUD 630 figure for this stream until you have checked the pricing table.'),
    p(pricing),
  ],
  related: [
    '[Permanent Residence Regional (191) regional provisional stream](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191)',
    '[189 Hong Kong stream](/migrate-to-australia/skilled-independent-189-hong-kong)',
    '[Skilled Work Regional (491)](/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491)',
    '[Skilled Employer Sponsored Regional (494)](/employer-sponsored/skilled-regional-494)',
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[Temporary Graduate (485)](/migrate-to-australia/temporary-graduate-visa-subclass-485)',
    '[Regional postcode checker](/postcode-checker)',
  ],
  faqs: [
    {
      q: 'Is this the same as the 191 visa for 491 and 494 holders?',
      a: 'No. Holders of a 491 or 494 use the regional provisional stream. The Hong Kong stream is for primary holders of an eligible 457, 482 or 485 who have lived in a designated regional area for 3 years and who hold a Hong Kong or British National (Overseas) passport.',
    },
    {
      q: 'Do I need tax notices or a minimum income?',
      a: 'The income test and the tax notices are for the regional provisional stream. They are not the criteria for the Hong Kong stream.',
    },
    {
      q: 'Can I move to a city after the visa is granted?',
      a: 'After a 191 grant you can live anywhere in Australia. The regional requirement is about the 3 years before you apply.',
    },
  ],
});

pages['/citizenship/new-zealand-citizens-subclass-444'] = visaPage({
  path: '/citizenship/new-zealand-citizens-subclass-444',
  category: 'citizenship',
  name: 'Citizenship for New Zealand Citizens on Subclass 444',
  primaryKeyword: 'New Zealand citizen Australian citizenship 444',
  keywords: [
    'NZ citizen Australian citizenship',
    'subclass 444 citizenship',
    'special category visa citizenship',
    '189 New Zealand stream closed',
    'New Zealand citizen conferral',
  ],
  pageType: 'Service page (citizenship pathway for subclass 444 holders)',
  title: 'Australian Citizenship for New Zealand Citizens (Subclass 444) | Bansal Immigration',
  description:
    'Eligible New Zealand citizens on a Special Category visa (subclass 444) can apply for Australian citizenship by conferral without first getting a permanent visa. The 189 New Zealand stream is closed.',
  h1: 'Australian Citizenship for New Zealand Citizens on a Subclass 444 Visa',
  intro: [
    'From 1 July 2023, an eligible New Zealand citizen who holds a Special Category visa (subclass 444) can apply for Australian citizenship by conferral without first becoming a permanent resident on another visa. The New Zealand stream of subclass 189 is closed to new applications. Time on a 444 can count towards the citizenship residence requirement.',
  ],
  facts: [
    ['Visa you hold', 'Special Category visa (subclass 444)'],
    ['What you apply for', 'Citizenship by conferral, not a permanent visa'],
    ['Residence', '4 years lawful residence, with the last 12 months counted as permanent residence'],
    ['189 New Zealand stream', 'Closed to new applications'],
  ],
  overview: [
    'A New Zealand citizen is usually granted a [Special Category visa (subclass 444)](/transit-special-purpose/special-category-visa-444) on arrival. You can live and work in Australia, but the 444 is still a temporary visa. It ends when you leave Australia and can be granted again when you return, if you remain eligible.',
    'For citizenship, you are generally treated as a permanent resident from 1 July 2022 if you held a subclass 444 before that date, or from the date of your first subclass 444 if it was granted on or after 1 July 2022. That start date matters for the 12-month permanent residence part of the residence test.',
    'The [points-tested subclass 189](/migrate-to-australia/skilled-independent-visa-subclass-189) is a different visa. Its New Zealand stream is closed. Do not lodge a 189 New Zealand stream application.',
  ],
  eligibility: [
    'You are a New Zealand citizen and you hold a subclass 444 when you apply and when a decision is made.',
    'You have lived in Australia lawfully for 4 years immediately before you apply.',
    'You meet the permanent residence part of the test. For an eligible 444 holder, the start date above is what counts.',
    'You were not absent from Australia for more than 12 months in total in those 4 years, and not for more than 90 days in the final 12 months.',
    'You meet the identity and character requirements, including police checks.',
    'You pass the [citizenship test](/citizenship/citizenship-test) if it applies to you. Some applicants are exempt.',
    'You intend to live in Australia, or to maintain a close and continuing association with Australia.',
  ],
  benefits: [
    'You do not need a skilled visa or an employer-sponsored permanent visa first.',
    'After conferral you are an Australian citizen. See [dual citizenship](/citizenship/dual-citizenship). New Zealand allows its citizens to hold another citizenship. Confirm your own position before you apply.',
    'A child born in Australia on or after 1 July 2022 to a subclass 444 holder may already be an Australian citizen. Read the note on the [subclass 444 page](/transit-special-purpose/special-category-visa-444) and [citizenship by birth](/citizenship/citizenship-by-birth).',
  ],
  steps: [
    'Confirm you hold a subclass 444 and work out your permanent residence start date for citizenship.',
    'Count your absences. Use travel records, not memory.',
    'Read [citizenship by conferral](/citizenship/citizenship-by-conferral) for the general process, then lodge the citizenship application.',
    'Obtain police certificates for Australia and for other countries where you lived for the required period.',
    'Sit the citizenship test if you are required to.',
    'If approved, attend the citizenship ceremony.',
  ],
  duration: [
    '**This is not a visa application.** Citizenship does not expire. The subclass 444 continues to end each time you leave Australia until you become a citizen or hold another visa.',
  ],
  pathways: [
    h3('Family members who are not New Zealand citizens'),
    p('A partner or child who is not a New Zealand citizen does not receive a subclass 444. They need their own visa. The usual family visa is the [New Zealand Citizen Family Relationship visa (subclass 461)](/family-visa/new-zealand-citizen-family-relationship-visa-subclass-461). A partner of an Australian citizen or permanent resident looks at the [partner visas](/family-visa) instead.'),
  ],
  costs: [
    p('Citizenship has its own application charge. It is not a visa application charge. Check the figure on the Home Affairs citizenship page before you apply. The charge also depends on how you apply and whether a concession applies.'),
  ],
  related: [
    '[Special Category visa (444)](/transit-special-purpose/special-category-visa-444)',
    '[Citizenship by conferral](/citizenship/citizenship-by-conferral)',
    '[Citizenship test](/citizenship/citizenship-test)',
    '[Citizenship by birth](/citizenship/citizenship-by-birth)',
    '[Dual citizenship](/citizenship/dual-citizenship)',
    '[New Zealand Citizen Family Relationship visa (461)](/family-visa/new-zealand-citizen-family-relationship-visa-subclass-461)',
    '[Skilled Independent (189)](/migrate-to-australia/skilled-independent-visa-subclass-189)',
  ],
  faqs: [
    {
      q: 'Do I still need permanent residence first?',
      a: 'You do not need a separate permanent visa such as a 189 or 186. From 1 July 2023, an eligible subclass 444 holder is treated as a permanent resident for the citizenship residence test, from the start date explained on this page.',
    },
    {
      q: 'What happened to the 189 New Zealand stream?',
      a: 'It is closed to new applications. The citizenship pathway on this page replaced it for eligible New Zealand citizens.',
    },
    {
      q: 'Can my partner who is not a New Zealand citizen apply with me?',
      a: 'No. They need their own visa, often a subclass 461, and their own citizenship application later if they become eligible.',
    },
  ],
});

pages['/employer-sponsored/dama-south-australia'] = visaPage({
  path: '/employer-sponsored/dama-south-australia',
  category: 'employer-sponsored',
  name: 'DAMA South Australia',
  primaryKeyword: 'South Australia DAMA',
  keywords: [
    'Adelaide DAMA',
    'South Australian Regional Workforce DAMA',
    'DAMA visa Adelaide',
    'SA DAMA occupation list',
    'DAMA 186 South Australia',
  ],
  pageType: 'Visa subpage (regional employer agreement, South Australia)',
  title: 'South Australia DAMA | Adelaide and Regional SA | Bansal Immigration',
  description:
    'South Australia has two Designated Area Migration Agreements: one for Adelaide technology and innovation, and one for the regional workforce across the state. An employer must sponsor you.',
  h1: 'Designated Area Migration Agreements in South Australia',
  intro: [
    'South Australia uses two Designated Area Migration Agreements. The Adelaide agreement covers technology, defence, space, advanced manufacturing and innovation in greater Adelaide. The regional workforce agreement covers the state, including agribusiness, health, aged care, tourism, hospitality, construction and trades. You cannot apply on your own. An employer in the designated area must sponsor you.',
  ],
  facts: [
    ['Who can use it', 'An employer endorsed for the relevant South Australian DAMA'],
    ['Visas', 'Labour Agreement stream of subclass 482, 494 or 186'],
    ['Cost', 'The charge for the visa in the agreement. Subclass 482 base charge is AUD 4,015'],
    ['Permanent residence', 'Only if that agreement includes it for the occupation'],
  ],
  overview: [
    'Read the [DAMA overview](/employer-sponsored/dama) first. A DAMA is a labour agreement between the Australian Government and a regional representative. It can list occupations that are not on the standard skilled lists, and it can concede age, English or salary for specified occupations. The concession is on the occupation line. It is not a general discount.',
    '**Adelaide City Technology and Innovation Advancement DAMA.** This is for greater Adelaide and for the technology and innovation occupations in that agreement.',
    '**South Australian Regional Workforce DAMA.** This is for employers across South Australia in the sectors that agreement covers.',
    'These are not the same as [South Australian state nomination](/south-australia-state-nomination) for a subclass 190 or 491. State nomination does not need this employer agreement. A DAMA does.',
  ],
  eligibility: [
    'The job is in the designated area for that agreement, and the occupation is on that agreement\'s current list.',
    'The employer is endorsed by the South Australian Designated Area Representative and then enters a labour agreement with the Department of Home Affairs.',
    'You meet the age, English, skills, experience and salary in the agreement for that occupation. Do not assume a concession. Many lists use a lower English score or a salary below the standard threshold only for named occupations.',
    'The visa is the Labour Agreement stream of the [482](/employer-sponsored/sid-visa-482), the [494](/employer-sponsored/skilled-regional-494), or the [186](/employer-sponsored/ens-186-labour-agreement), as the agreement allows.',
    'You meet health and character requirements.',
  ],
  benefits: [
    'Occupations that standard sponsorship does not cover, where the SA list includes them.',
    'Concessions only where the occupation line gives them. Age concessions in some DAMAs go above 45. English and salary concessions are also occupation-specific.',
    'A permanent residence path through the [186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement) when the agreement includes it, often after a period of work on a 482 or 494 granted under the same agreement.',
    'Our Adelaide office can act for the employer and for the worker. Adelaide: Unit 5, 55 Gawler Place. Phone +61 8 8317 1340.',
  ],
  steps: [
    'The employer checks the current South Australian occupation list and the end date of the agreement with Skilled and Business Migration in South Australia. Lists and end dates change. Do not rely on an old PDF.',
    'The employer seeks endorsement from the Designated Area Representative.',
    'The employer signs the labour agreement with the Department of Home Affairs.',
    'The employer nominates the worker. See the [nomination guide](/employer-sponsored/nomination-process).',
    'The worker lodges the 482, 494 or 186 visa named in the nomination.',
  ],
  duration: [
    '**482 under a DAMA.** Temporary. The stay is set by the visa grant, up to 4 years on a standard 482.',
    '**494 under a DAMA.** Provisional, usually 5 years, and tied to regional Australia.',
    '**186 under a DAMA.** Permanent, if the agreement allows that nomination and the visa is granted.',
  ],
  pathways: [
    h3('Permanent residence'),
    p('There is no separate DAMA permanent visa. The permanent visa is the [186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement). Some workers hold a [494](/employer-sponsored/skilled-regional-494) and later look at subclass [191](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191). Which path is open depends on the visa you hold and on the agreement. Permanent residence is not automatic.'),
  ],
  costs: [
    p('A DAMA has no visa charge of its own. You pay the charge for the visa used in the agreement. The subclass 482 base charge is AUD 4,015. The subclass 494 and subclass 186 base charge published on those pages is AUD 6,140.'),
    p(pricing),
    p('The employer also pays endorsement, nomination and levy costs. Ask for those before the agreement is requested.'),
  ],
  related: [
    '[DAMA overview](/employer-sponsored/dama)',
    '[DAMA Victoria](/employer-sponsored/dama-victoria)',
    '[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)',
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[Skilled Employer Sponsored Regional (494)](/employer-sponsored/skilled-regional-494)',
    '[South Australia state nomination](/south-australia-state-nomination)',
    '[Nomination guide](/employer-sponsored/nomination-process)',
  ],
  faqs: [
    {
      q: 'Is Adelaide covered?',
      a: 'Greater Adelaide is covered by the Adelaide technology and innovation DAMA, for the occupations on that list. The regional workforce DAMA covers a broader set of occupations across South Australia. Check which agreement lists the job.',
    },
    {
      q: 'Can I apply without an employer?',
      a: 'No. An endorsed employer must sponsor and nominate you.',
    },
    {
      q: 'Is the salary always 90 per cent of the threshold?',
      a: 'No. A salary concession applies only where the agreement states it for that occupation, and the pay must still meet the rate in the agreement and the market rate where that is required.',
    },
  ],
});

pages['/employer-sponsored/dama-victoria'] = visaPage({
  path: '/employer-sponsored/dama-victoria',
  category: 'employer-sponsored',
  name: 'DAMA Victoria',
  primaryKeyword: 'Victoria DAMA',
  keywords: [
    'Goulburn Valley DAMA',
    'Great South Coast DAMA',
    'Victoria regional DAMA visa',
    'DAMA Shepparton',
    'DAMA Warrnambool',
  ],
  pageType: 'Visa subpage (regional employer agreement, Victoria)',
  title: 'Victoria DAMA | Goulburn Valley and Great South Coast | Bansal Immigration',
  description:
    'Victorian DAMA pathways for employers in the Goulburn Valley and the Great South Coast. Melbourne is not a DAMA area. An employer must sponsor the worker.',
  h1: 'Designated Area Migration Agreements in Victoria',
  intro: [
    'This page covers two Victorian Designated Area Migration Agreements: the Goulburn Valley DAMA and the Great South Coast DAMA. They let endorsed employers in those regions sponsor workers for occupations on the agreement list, sometimes with concessions. Melbourne is not covered. An individual cannot apply without an employer.',
  ],
  facts: [
    ['Regions on this page', 'Goulburn Valley and Great South Coast'],
    ['Not covered', 'Melbourne and other areas that are outside the agreement'],
    ['Visas', 'Labour Agreement stream of subclass 482, 494 or 186'],
    ['Permanent residence', 'Only if that agreement includes it for the occupation'],
  ],
  overview: [
    'Start with the [DAMA overview](/employer-sponsored/dama). Each Victorian agreement has its own Designated Area Representative, occupation list, postcodes and end date. Confirm the current list before the employer spends money on endorsement.',
    '**Goulburn Valley** includes the Shepparton region. **Great South Coast** includes the Warrnambool region. The exact postcodes are in the agreement. Use the [postcode checker](/postcode-checker) only as a regional guide, then confirm the address with the Designated Area Representative. Other Victorian regions may have their own agreement. This page does not cover an agreement it does not name.',
    'If the employer is in Melbourne, use a standard [482](/employer-sponsored/sid-visa-482) or [186](/employer-sponsored/ens-186-direct) pathway, not a DAMA.',
  ],
  eligibility: [
    'The position is located in the designated area and the occupation is on that area\'s current DAMA list.',
    'The employer is endorsed by the Victorian Designated Area Representative for that region and signs a labour agreement with the Department.',
    'You meet the concessions and the standard criteria that the agreement sets for the occupation. Concessions are not automatic.',
    'The nomination uses the Labour Agreement stream of a [482](/employer-sponsored/sid-visa-482), [494](/employer-sponsored/skilled-regional-494) or [186](/employer-sponsored/ens-186-labour-agreement).',
    'You meet health and character requirements.',
  ],
  benefits: [
    'Access to occupations agreed for that region, including roles that are hard to fill locally.',
    'Age, English and experience concessions where the occupation line provides them.',
    'A permanent residence path through the [186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement) when the agreement includes it.',
  ],
  steps: [
    'Confirm the workplace postcode is inside the Goulburn Valley or Great South Coast agreement.',
    'The employer applies for endorsement from that region\'s Designated Area Representative.',
    'The labour agreement is signed with the Department of Home Affairs.',
    'The employer nominates the worker. See the [nomination guide](/employer-sponsored/nomination-process).',
    'The worker lodges the visa named in the nomination.',
  ],
  duration: [
    '**482.** Temporary, up to 4 years on a standard grant.',
    '**494.** Provisional, usually 5 years in regional Australia.',
    '**186.** Permanent, if the agreement allows that nomination and the visa is granted.',
  ],
  pathways: [
    h3('Permanent residence'),
    p('The permanent visa under these agreements is the [186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement). A worker on a 494 may instead qualify later for subclass [191](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191). Check which visa the agreement will nominate before you start.'),
    p('South Australian employers should use the [South Australia DAMA page](/employer-sponsored/dama-south-australia).'),
  ],
  costs: [
    p('You pay the visa charge for the subclass in the agreement. The subclass 482 base charge is AUD 4,015. The subclass 494 and subclass 186 base charge published on those pages is AUD 6,140.'),
    p(pricing),
  ],
  related: [
    '[DAMA overview](/employer-sponsored/dama)',
    '[DAMA South Australia](/employer-sponsored/dama-south-australia)',
    '[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)',
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[482 Core Skills stream](/employer-sponsored/sid-482-core-skills)',
    '[Skilled Employer Sponsored Regional (494)](/employer-sponsored/skilled-regional-494)',
    '[Regional postcode checker](/postcode-checker)',
  ],
  faqs: [
    {
      q: 'Which parts of Victoria are covered here?',
      a: 'The Goulburn Valley DAMA and the Great South Coast DAMA. Confirm the workplace postcode with the Designated Area Representative. Do not assume a nearby town is included.',
    },
    {
      q: 'Is Melbourne covered?',
      a: 'No. Employers in Melbourne use the standard employer sponsored visas.',
    },
    {
      q: 'Is there a pathway to permanent residence?',
      a: 'Yes, where the agreement includes the 186 Labour Agreement stream for that occupation, usually after a period of employment. It is not automatic.',
    },
  ],
});

pages['/employer-sponsored/palm-scheme-403'] = visaPage({
  path: '/employer-sponsored/palm-scheme-403',
  category: 'employer-sponsored',
  name: 'PALM Scheme Subclass 403',
  primaryKeyword: 'PALM scheme visa 403',
  keywords: [
    'Pacific Australia Labour Mobility visa',
    'PALM scheme subclass 403',
    'seasonal worker visa Australia',
    '403 PALM stream',
    'Pacific labour scheme visa',
  ],
  pageType: 'Visa subpage (PALM stream of subclass 403)',
  title: 'PALM Scheme Visa (Subclass 403) | Bansal Immigration',
  description:
    'The Pacific Australia Labour Mobility scheme uses the subclass 403 visa. Workers from participating Pacific countries and Timor-Leste need an approved PALM employer. You cannot apply on your own.',
  h1: 'Pacific Australia Labour Mobility (PALM) Scheme, Subclass 403',
  intro: [
    'The PALM scheme lets approved Australian employers recruit workers from participating Pacific island countries and Timor-Leste when they cannot fill the jobs locally. The visa is the Pacific Australia Labour Mobility stream of the [Temporary Work (International Relations) visa (subclass 403)](/employer-sponsored/temporary-work-international-relations-403). You must be recruited through your country\'s labour sending unit. You cannot lodge this visa as a private applicant with a job offer.',
  ],
  facts: [
    ['Visa', 'Subclass 403, PALM stream'],
    ['Who it is for', 'Citizens of participating Pacific countries and Timor-Leste'],
    ['Stay', 'Short-term placements up to 9 months, or long-term placements of 1 to 4 years'],
    ['Pathway to permanent residence', 'No direct pathway'],
  ],
  overview: [
    'Participating countries are Fiji, Kiribati, Nauru, Papua New Guinea, Samoa, Solomon Islands, Timor-Leste, Tonga, Tuvalu and Vanuatu. The worker is recruited through the labour sending unit in their home country and employed by an approved PALM employer.',
    'The scheme replaced the Seasonal Worker Programme and the Pacific Labour Scheme. Short-term placements are seasonal. Long-term placements run from 1 to 4 years. The visa grant and the work agreement set the exact stay.',
    'This is not a [Skills in Demand (482)](/employer-sponsored/sid-visa-482) visa. If an Australian business wants to sponsor a skilled worker who is not coming through PALM, use the 482 page.',
  ],
  eligibility: [
    'You are a citizen of a participating country and you are recruited through that country\'s labour sending unit.',
    'You are aged 21 or over.',
    'You have a job with an approved PALM scheme employer.',
    'The employer is approved for PALM and can sponsor the subclass 403.',
    'You meet health, character and health insurance requirements.',
    'You apply online as part of that recruitment. A direct application without the labour sending unit will not be accepted.',
  ],
  benefits: [
    'Lawful work in Australia for the approved employer, for the season or for the long-term placement in your contract.',
    'Short-term workers can return in later seasons where the visa and the scheme allow it.',
    'Travel in and out of Australia while the visa and the work agreement are valid, subject to the conditions on the grant.',
  ],
  steps: [
    'The employer is approved as a PALM scheme employer. Approval sits with the Department of Employment and Workplace Relations, and the employer also needs to be able to sponsor the 403.',
    'Recruitment goes through the labour sending unit in the worker\'s country. The worker does not arrange a private nomination.',
    'The worker lodges the subclass 403 PALM stream application online with the recruitment paperwork.',
    'After grant, the worker works only for the approved employer and follows the conditions on the visa.',
  ],
  duration: [
    '**Short-term.** Up to 9 months in a 12-month period. A multi-entry visa can allow return each season.',
    '**Long-term.** Between 1 and 4 years, as set in the placement.',
  ],
  pathways: [
    h3('There is no PALM permanent visa'),
    p('The subclass 403 does not lead to permanent residence. Many PALM grants also carry a no further stay condition. That condition can stop you applying for another visa while you are in Australia, unless it is waived. Read the [403 page](/employer-sponsored/temporary-work-international-relations-403) and your grant letter. A later [482](/employer-sponsored/sid-visa-482) or family visa is a new application with its own criteria.'),
  ],
  costs: [
    p('The [403 page](/employer-sponsored/temporary-work-international-relations-403) does not lock in a dollar figure, because the charge depends on the stream. Check the current visa pricing table for the PALM stream before anyone pays.'),
    p(pricing),
  ],
  related: [
    '[Temporary Work (International Relations) 403](/employer-sponsored/temporary-work-international-relations-403)',
    '[Skills in Demand (482)](/employer-sponsored/sid-visa-482)',
    '[482 Core Skills stream](/employer-sponsored/sid-482-core-skills)',
    '[Short Stay Specialist (400)](/employer-sponsored/short-stay-400)',
    '[Temporary Activity (408)](/employer-sponsored/temporary-activity-408)',
    '[Employer sponsored visas](/employer-sponsored)',
  ],
  faqs: [
    {
      q: 'Can I apply for this visa myself?',
      a: 'No. You must be recruited through your country\'s labour sending unit and sponsored by an approved PALM employer.',
    },
    {
      q: 'Can the job be in a city?',
      a: 'PALM placements are mainly in regional and rural Australia. Agriculture and some related processing can have wider locations. The employer\'s PALM approval sets where the work can be.',
    },
    {
      q: 'Can I stay and apply for permanent residence?',
      a: 'Not on this visa. There is no direct permanent residence pathway, and a no further stay condition may stop a further application in Australia.',
    },
  ],
});

function once(text, from, to, label) {
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`${label}: found ${count}`);
  return text.replace(from, to);
}

let text = fs.readFileSync(pagesPath, 'utf8');

text = once(
  text,
  '**Hong Kong stream**: Open. It is for people who hold a Hong Kong passport or a British National (Overseas) passport, hold an eligible 457, 482 or 485 visa, and have usually lived in Australia for 4 years. There is no points test and no invitation. A new subclass 457 is closed. You can only use a 457 if you still hold one.',
  '**Hong Kong stream**: Open. Read the [189 Hong Kong stream](/migrate-to-australia/skilled-independent-189-hong-kong) page. It is for people who hold a Hong Kong passport or a British National (Overseas) passport, hold an eligible 457, 482 or 485 visa, and have usually lived in Australia for 4 years. There is no points test and no invitation. A new subclass 457 is closed. You can only use a 457 if you still hold one.',
  '189 hk sentence',
);

text = once(
  text,
  `        "x": "[Permanent Residence Skilled Regional Visa Subclass 191](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [
   {
    "q": "1. What is the Subclass 189 visa?",`,
  `        "x": "[Permanent Residence Skilled Regional Visa Subclass 191](/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191)"
       },
       {
        "x": "[189 Hong Kong stream](/migrate-to-australia/skilled-independent-189-hong-kong)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [
   {
    "q": "1. What is the Subclass 189 visa?",`,
  '189 related',
);

text = once(
  text,
  'The Hong Kong stream is also open. It is for people who hold a Hong Kong passport or a British National (Overseas) passport, hold an eligible 457, 482 or 485 visa, and have lived in a designated regional area for at least 3 years. A new subclass 457 is closed. You can only use a 457 if you still hold one.',
  'The [Hong Kong stream](/migrate-to-australia/permanent-residence-191-hong-kong) is also open. It is for people who hold a Hong Kong passport or a British National (Overseas) passport, hold an eligible 457, 482 or 485 visa, and have lived in a designated regional area for at least 3 years. A new subclass 457 is closed. You can only use a 457 if you still hold one. The income test on this page is for the regional provisional stream.',
  '191 hk sentence',
);

text = once(
  text,
  `        "x": "[Skilled Regional Visa Subclass 887](/migrate-to-australia/skilled-regional-visa-subclass-887)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [
   {
    "q": "1. What is the Subclass 191 visa?",`,
  `        "x": "[Skilled Regional Visa Subclass 887](/migrate-to-australia/skilled-regional-visa-subclass-887)"
       },
       {
        "x": "[191 Hong Kong stream](/migrate-to-australia/permanent-residence-191-hong-kong)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [
   {
    "q": "1. What is the Subclass 191 visa?",`,
  '191 related',
);

text = once(
  text,
  'The Core Skills, Specialist Skills, and Labour Agreement streams are open.',
  'The [Core Skills](/employer-sponsored/sid-482-core-skills), [Specialist Skills](/employer-sponsored/sid-482-specialist-skills), and [Labour Agreement](/employer-sponsored/dama) streams are open.',
  '482 streams',
);

text = once(
  text,
  'A labour agreement can set a different path to permanent residence. Permanent residence is not automatic.',
  'A labour agreement can set a different path to permanent residence. See the [186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement). Permanent residence is not automatic.',
  '482 pathway',
);

text = once(
  text,
  `        "x": "[Employer Nomination Scheme 186 (Direct Entry)](/employer-sponsored/ens-186-direct)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": false
 },
 "/employer-sponsored/temporary-work-international-relations-403":`,
  `        "x": "[Employer Nomination Scheme 186 (Direct Entry)](/employer-sponsored/ens-186-direct)"
       },
       {
        "x": "[482 Core Skills stream](/employer-sponsored/sid-482-core-skills)"
       },
       {
        "x": "[482 Specialist Skills stream](/employer-sponsored/sid-482-specialist-skills)"
       },
       {
        "x": "[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": false
 },
 "/employer-sponsored/temporary-work-international-relations-403":`,
  '482 related',
);

text = once(
  text,
  `        "x": "[Employer Nomination Scheme 186 (Direct Entry)](/employer-sponsored/ens-186-direct)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": true
 },
 "/employer-sponsored/ens-186-direct":`,
  `        "x": "[Employer Nomination Scheme 186 (Direct Entry)](/employer-sponsored/ens-186-direct)"
       },
       {
        "x": "[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": true
 },
 "/employer-sponsored/ens-186-direct":`,
  '186 trt related',
);

text = once(
  text,
  `        "x": "[Employer Nomination Scheme 186 (Direct Entry)](/employer-sponsored/ens-186-direct)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": true
 },
 "/employer-sponsored/skilled-regional-494":`,
  `        "x": "[Employer Nomination Scheme 186 (Direct Entry)](/employer-sponsored/ens-186-direct)"
       },
       {
        "x": "[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)"
       },
       {
        "x": "[DAMA South Australia](/employer-sponsored/dama-south-australia)"
       },
       {
        "x": "[DAMA Victoria](/employer-sponsored/dama-victoria)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": true
 },
 "/employer-sponsored/skilled-regional-494":`,
  'dama related',
);

text = once(
  text,
  `        "x": "[Training visa 407](/employer-sponsored/training-visa-407)"
       },
       {
        "x": "[Visitor visas](/visitor-visa)"
       },`,
  `        "x": "[Training visa 407](/employer-sponsored/training-visa-407)"
       },
       {
        "x": "[PALM scheme (403)](/employer-sponsored/palm-scheme-403)"
       },
       {
        "x": "[Visitor visas](/visitor-visa)"
       },`,
  '403 related',
);

text = once(
  text,
  `        "Government staff or a government agreement worker",
        "[Temporary Work 403](/employer-sponsored/temporary-work-international-relations-403)",
        "Temporary"
       ]
      ]`,
  `        "Government staff or a government agreement worker",
        "[Temporary Work 403](/employer-sponsored/temporary-work-international-relations-403)",
        "Temporary"
       ],
       [
        "The occupation is on the Core Skills Occupation List",
        "[482 Core Skills stream](/employer-sponsored/sid-482-core-skills)",
        "Temporary, up to 4 years"
       ],
       [
        "The salary meets the Specialist Skills threshold and the occupation is in an eligible ANZSCO group",
        "[482 Specialist Skills stream](/employer-sponsored/sid-482-specialist-skills)",
        "Temporary, up to 4 years"
       ],
       [
        "The employer has a labour agreement that allows permanent residence",
        "[186 Labour Agreement stream](/employer-sponsored/ens-186-labour-agreement)",
        "Permanent"
       ],
       [
        "The employer is using a South Australian DAMA",
        "[DAMA South Australia](/employer-sponsored/dama-south-australia)",
        "Agreement-based"
       ],
       [
        "The employer is in the Goulburn Valley or the Great South Coast",
        "[DAMA Victoria](/employer-sponsored/dama-victoria)",
        "Agreement-based"
       ],
       [
        "The worker is recruited from a Pacific country or Timor-Leste under PALM",
        "[PALM scheme (403)](/employer-sponsored/palm-scheme-403)",
        "Temporary"
       ]
      ]`,
  'employer table',
);

text = once(
  text,
  'Note: If you had a child born in Australia to an SCV holding parent on or after 1 July 2022 your child may have acquired Australian citizenship automatically by operation of law at the time of their birth. Children who meet these circumstances can apply for their proof of citizenship.',
  'Note: If you had a child born in Australia to an SCV holding parent on or after 1 July 2022 your child may have acquired Australian citizenship automatically by operation of law at the time of their birth. Children who meet these circumstances can apply for their proof of citizenship. Eligible New Zealand citizens on a subclass 444 can apply for [citizenship by conferral](/citizenship/new-zealand-citizens-subclass-444) without a separate permanent visa. The subclass 189 New Zealand stream is closed.',
  '444 note',
);

text = once(
  text,
  `        "x": "[Special Purpose Travel Authority (945)](/transit-special-purpose/special-purpose-travel-authority-945)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": false
 },
 "/transit-special-purpose/special-purpose-visa":`,
  `        "x": "[Special Purpose Travel Authority (945)](/transit-special-purpose/special-purpose-travel-authority-945)"
       },
       {
        "x": "[Citizenship for New Zealand citizens on a 444](/citizenship/new-zealand-citizens-subclass-444)"
       },
       {
        "x": "[New Zealand Citizen Family Relationship visa (461)](/family-visa/new-zealand-citizen-family-relationship-visa-subclass-461)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": false
 },
 "/transit-special-purpose/special-purpose-visa":`,
  '444 related',
);

text = once(
  text,
  `        "x": "[Dual Citizenship Australia - Complete Guide to Multiple Citizenships](/citizenship/dual-citizenship)"
       },
       {
        "x": "[Citizenship by Birth](/citizenship/citizenship-by-birth)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": true
 },
 "/citizenship/citizenship-by-descent":`,
  `        "x": "[Dual Citizenship Australia - Complete Guide to Multiple Citizenships](/citizenship/dual-citizenship)"
       },
       {
        "x": "[Citizenship by Birth](/citizenship/citizenship-by-birth)"
       },
       {
        "x": "[New Zealand citizens on a subclass 444](/citizenship/new-zealand-citizens-subclass-444)"
       }
      ]
     }
    ]
   }
  ],
  "faqs": [],
  "cta": {
   "title": "Talk to a registered migration agent",
   "text": "Book a consultation or call +61 3 9602 1330."
  },
  "form": true
 },
 "/citizenship/citizenship-by-descent":`,
  'conferral related',
);

const body = JSON.stringify(pages, null, 1).replace(/^\{\n/, '').replace(/\n\}$/, '');
if (!text.endsWith('\n}\n') && !text.endsWith('\n}')) {
  throw new Error('pages.json ending unexpected');
}
const trimmed = text.endsWith('\n') ? text.slice(0, -1) : text;
if (!trimmed.endsWith('}')) throw new Error('root brace missing');
const withPages = trimmed.slice(0, -1).replace(/\s*$/, '') + ',\n' + body + '\n}\n';

JSON.parse(withPages);
fs.writeFileSync(pagesPath, withPages);

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const start = index.reduce((max, entry) => Math.max(max, entry.order), 0) + 1;
const additions = [
  ['/employer-sponsored/ens-186-labour-agreement', 'ENS 186 Labour Agreement Stream', 'employer-sponsored'],
  ['/employer-sponsored/sid-482-core-skills', 'Skills in Demand 482 Core Skills Stream', 'employer-sponsored'],
  ['/employer-sponsored/sid-482-specialist-skills', 'Skills in Demand 482 Specialist Skills Stream', 'employer-sponsored'],
  ['/migrate-to-australia/skilled-independent-189-hong-kong', 'Skilled Independent 189 Hong Kong Stream', 'migrate-to-australia'],
  ['/migrate-to-australia/permanent-residence-191-hong-kong', 'Permanent Residence 191 Hong Kong Stream', 'migrate-to-australia'],
  ['/citizenship/new-zealand-citizens-subclass-444', 'Citizenship for New Zealand Citizens on Subclass 444', 'citizenship'],
  ['/employer-sponsored/dama-south-australia', 'DAMA South Australia', 'employer-sponsored'],
  ['/employer-sponsored/dama-victoria', 'DAMA Victoria', 'employer-sponsored'],
  ['/employer-sponsored/palm-scheme-403', 'PALM Scheme Subclass 403', 'employer-sponsored'],
];
additions.forEach(([path, name, category], i) => {
  if (index.some((entry) => entry.path === path)) throw new Error('duplicate index ' + path);
  index.push({ path, name, category, isHub: false, order: start + i });
});
fs.writeFileSync(indexPath, JSON.stringify(index, null, 1) + '\n');
console.log('added', additions.length, 'pages from order', start);
