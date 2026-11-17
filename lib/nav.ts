/** Single source of truth for header mega menu, mobile menu and footer. Every href is a live page. */
export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}
export interface NavColumn {
  heading: string;
  links: NavLink[];
}
export interface NavGroup {
  id: string;
  label: string;
  hub: NavLink;
  blurb: string;
  columns: NavColumn[];
}

export const VISA_GROUPS: NavGroup[] = [
  {
    id: 'skilled',
    label: 'Skilled migration',
    hub: { label: 'Skilled migration overview', href: '/migrate-to-australia' },
    blurb: 'Points-tested visas for skilled workers and graduates.',
    columns: [
      {
        heading: 'Permanent and regional visas',
        links: [
          { label: 'Skilled Independent (189)', href: '/migrate-to-australia/skilled-independent-visa-subclass-189', desc: 'No sponsor or nomination' },
          { label: '189 Hong Kong stream', href: '/migrate-to-australia/skilled-independent-189-hong-kong', desc: 'No points test or invitation' },
          { label: 'Skilled Nominated (190)', href: '/migrate-to-australia/skilled-nominated-visa-subclass-190', desc: 'State or territory nomination' },
          { label: 'Skilled Work Regional (491)', href: '/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491', desc: 'Regional provisional visa' },
          { label: 'Permanent Residence Regional (191)', href: '/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191' },
          { label: '191 Hong Kong stream', href: '/migrate-to-australia/permanent-residence-191-hong-kong', desc: 'Three years in regional Australia' },
          { label: 'Skilled Regional (887)', href: '/migrate-to-australia/skilled-regional-visa-subclass-887' },
        ],
      },
      {
        heading: 'Graduates and planning',
        links: [
          { label: 'Temporary Graduate (485)', href: '/migrate-to-australia/temporary-graduate-visa-subclass-485' },
          { label: 'Post Study Work (485)', href: '/migrate-to-australia/post-study-work-visa-subclass-485' },
          { label: 'Second Temporary Graduate (485)', href: '/skilled-migration/temporary-graduate-visa-extension', desc: 'Extra stay for regional graduates' },
          { label: 'How points are calculated', href: '/skilled-migration/how-points-are-calculated' },
          { label: 'Points for an English score', href: '/migrate-to-australia/points-for-english-score' },
          { label: 'Regional points', href: '/migrate-to-australia/how-to-claim-regional-points' },
          { label: 'How skilled migration works', href: '/skilled-migration' },
          { label: 'Step-by-step process guide', href: '/migrate-to-australia/migration' },
        ],
      },
      {
        heading: 'State nomination',
        links: [
          { label: 'Victoria', href: '/migrate-to-australia/victoria-state-nomination', desc: '190 ROIs open, 491 not open' },
          { label: 'New South Wales', href: '/migrate-to-australia/nsw-state-nomination', desc: '190 by invitation, 491 closed' },
          { label: 'Queensland', href: '/migrate-to-australia/queensland-state-nomination', desc: 'New ROI for 2026–27' },
          { label: 'Western Australia', href: '/migrate-to-australia/western-australia-state-nomination', desc: 'Selected from SkillSelect' },
          { label: 'South Australia', href: '/south-australia-state-nomination', desc: 'Migration SA streams' },
          { label: 'Tasmania', href: '/migrate-to-australia/tasmania-state-nomination', desc: 'ROI ranked Gold, Green, Orange' },
          { label: 'Australian Capital Territory', href: '/migrate-to-australia/act-state-nomination', desc: 'Canberra Matrix' },
          { label: 'Northern Territory', href: '/migrate-to-australia/northern-territory-state-nomination', desc: 'Most streams closed' },
        ],
      },
      {
        heading: 'Talent visas',
        links: [
          { label: 'National Innovation visa (858)', href: '/migrate-to-australia/national-innovation-visa-858' },
          { label: 'Global Talent Independent', href: '/migrate-to-australia/global-talent-independent-program-gti' },
          { label: 'Distinguished Talent (124)', href: '/migrate-to-australia/distinguished-talent-visa-124' },
          { label: 'Distinguished Talent (858)', href: '/migrate-to-australia/distinguished-talent-visa-858' },
        ],
      },
    ],
  },
  {
    id: 'assessment',
    label: 'Skill assessment',
    hub: { label: 'Skill assessment overview', href: '/skill-assessment' },
    blurb: 'Skills assessments for skilled and trade occupations.',
    columns: [
      {
        heading: 'Professional assessments',
        links: [
          { label: 'Teachers (AITSL)', href: '/skill-assessment/skills-assessment-for-teachers', desc: 'School teacher skills assessment' },
          { label: 'Doctors', href: '/skill-assessment/skills-assessment-for-doctors', desc: 'Medical Board registration' },
          { label: 'Social workers', href: '/skill-assessment/skills-assessment-for-social-workers', desc: 'AASW skills assessment' },
          { label: 'ACS (ICT)', href: '/skill-assessment/acs-skill-assessment' },
          { label: 'VETASSESS', href: '/skill-assessment/vetassess-skill-assessment' },
          { label: 'Engineers Australia', href: '/skill-assessment/ea-skill-assessment' },
          { label: 'Accounting', href: '/skill-assessment/accountant-skill-assessment' },
          { label: 'Nursing (AHPRA and ANMAC)', href: '/skill-assessment/nursing-aphara-registration-and-anmac-skill-assessment' },
        ],
      },
      {
        heading: 'Trades',
        links: [
          { label: 'Trades Recognition Australia', href: '/skill-assessment/trades-recognition-australia' },
          { label: 'Skills assessment for trades', href: '/skill-assessment/skills-assessment-for-trades' },
          { label: 'Job Ready Program', href: '/skill-assessment/job-ready-program' },
        ],
      },
      {
        heading: 'Guides',
        links: [
          { label: 'Skills assessment guide', href: '/skill-assessment/guide' },
          { label: 'Assessment requirements', href: '/skill-assessment/requirements' },
          { label: 'Assessment timeline', href: '/skill-assessment/timeline' },
        ],
      },
    ],
  },
  {
    id: 'employer',
    label: 'Employer sponsored',
    hub: { label: 'Employer sponsored overview', href: '/employer-sponsored' },
    blurb: 'Visas where an Australian employer sponsors the worker.',
    columns: [
      {
        heading: 'Main sponsored visas',
        links: [
          { label: 'Skills in Demand (482)', href: '/employer-sponsored/sid-visa-482', desc: 'Temporary, up to 4 years' },
          { label: '482 Core Skills', href: '/employer-sponsored/sid-482-core-skills', desc: 'Occupations on the Core Skills list' },
          { label: '482 Specialist Skills', href: '/employer-sponsored/sid-482-specialist-skills', desc: 'High-salary roles' },
          { label: 'ENS 186 Transition (TRT)', href: '/employer-sponsored/ens-186-trt', desc: 'Permanent, from a 482' },
          { label: 'ENS 186 Direct Entry', href: '/employer-sponsored/ens-186-direct' },
          { label: 'ENS 186 Labour Agreement', href: '/employer-sponsored/ens-186-labour-agreement', desc: 'Permanent, under a labour agreement' },
          { label: 'Regional Sponsored (494)', href: '/employer-sponsored/skilled-regional-494' },
          { label: 'DAMA labour agreements', href: '/employer-sponsored/dama' },
          { label: 'DAMA South Australia', href: '/employer-sponsored/dama-south-australia', desc: 'Adelaide and regional SA' },
          { label: 'DAMA Victoria', href: '/employer-sponsored/dama-victoria', desc: 'Goulburn Valley and Great South Coast' },
          { label: 'Global Talent Employer Sponsored (closed)', href: '/employer-sponsored/gtes', desc: 'No new agreements' },
        ],
      },
      {
        heading: 'Other work visas',
        links: [
          { label: 'Temporary Activity (408)', href: '/employer-sponsored/temporary-activity-408' },
          { label: 'Short Stay Specialist (400)', href: '/employer-sponsored/short-stay-400' },
          { label: 'Training visa (407)', href: '/employer-sponsored/training-visa-407' },
          { label: 'International Relations (403)', href: '/employer-sponsored/temporary-work-international-relations-403' },
          { label: 'PALM scheme (403)', href: '/employer-sponsored/palm-scheme-403', desc: 'Pacific workers and Timor-Leste' },
        ],
      },
      {
        heading: 'For employers',
        links: [
          { label: 'Standard Business Sponsorship', href: '/employer-sponsored/standard-business-sponsorship' },
          { label: 'Position nomination guide', href: '/employer-sponsored/nomination-process' },
          { label: 'Application process guide', href: '/employer-sponsored/application-process-guide' },
        ],
      },
    ],
  },
  {
    id: 'family',
    label: 'Family and partner',
    hub: { label: 'Family and partner overview', href: '/family-visa' },
    blurb: 'Partner, parent, child and other family visas.',
    columns: [
      {
        heading: 'Partner visas',
        links: [
          { label: 'Partner onshore (820)', href: '/family-visa/partner-provisional-visa-subclass-820' },
          { label: 'Partner onshore permanent (801)', href: '/family-visa/partner-permanent-visa-subclass-801' },
          { label: 'Partner offshore (309)', href: '/family-visa/partner-provisional-visa-subclass-309' },
          { label: 'Partner offshore permanent (100)', href: '/family-visa/partner-permanent-visa-subclass-100' },
          { label: 'Prospective Marriage (300)', href: '/family-visa/prospective-marriage-visa-subclass-300' },
        ],
      },
      {
        heading: 'Parent visas',
        links: [
          { label: 'Contributory Parent (143)', href: '/family-visa/contributory-parent-visa-subclass-143' },
          { label: 'Parent (103)', href: '/family-visa/parent-visa-subclass-103' },
          { label: 'Contributory Aged Parent (864)', href: '/family-visa/contributory-aged-parent-visa-subclass-864' },
          { label: 'Aged Parent (804)', href: '/family-visa/aged-parent-visa-subclass-804' },
          { label: 'Sponsored Parent Temporary (870)', href: '/family-visa/sponsored-parent-temporary-visa-subclass-870' },
          { label: 'Contributory Parent Temporary (173)', href: '/family-visa/contributory-parent-temporary-visa-subclass-173' },
          { label: 'Contributory Aged Parent Temporary (884)', href: '/family-visa/contributory-aged-parent-temporary-visa-subclass-884' },
          { label: 'Cost of contributory visas', href: '/family-visa/cost-for-contributory-visas' },
        ],
      },
      {
        heading: 'Child and other relatives',
        links: [
          { label: 'Child offshore (101)', href: '/family-visa/child-visa-subclass-101' },
          { label: 'Child onshore (802)', href: '/family-visa/child-visa-subclass-802' },
          { label: 'Dependent Child', href: '/family-visa/dependent-child-visa' },
          { label: 'Adoption visa', href: '/family-visa/adoption-visa' },
          { label: 'Carer (116 offshore, 836 onshore)', href: '/family-visa/carer-visa-offshore-subclass-116' },
          { label: 'Remaining Relative (115, 835)', href: '/family-visa/remaining-relative-visa-subclass-115' },
          { label: 'Aged Dependent Relative (114, 838)', href: '/family-visa/aged-dependent-114' },
          { label: 'Orphan Relative (117, 837)', href: '/family-visa/orphan-relative-visa-837' },
          { label: 'NZ Citizen Family Relationship (461)', href: '/family-visa/new-zealand-citizen-family-relationship-visa-subclass-461' },
        ],
      },
    ],
  },
  {
    id: 'study',
    label: 'Study in Australia',
    hub: { label: 'Study in Australia overview', href: '/study-australia' },
    blurb: 'From choosing a course to your student visa.',
    columns: [
      {
        heading: 'Courses and enrolment',
        links: [
          { label: 'Admission in Australia', href: '/study-australia/admission-in-australia' },
          { label: 'New Confirmation of Enrolment', href: '/study-australia/new-coe' },
          { label: 'Course change', href: '/study-australia/course-change-in-australia' },
          { label: 'Recognition of Prior Learning', href: '/study-australia/what-is-recognized-prior-learning-rpl-australia' },
          { label: 'Professional Year program', href: '/study-australia/professional-year-program' },
          { label: 'Defer your studies', href: '/study-australia/request-to-defer-your-studies' },
        ],
      },
      {
        heading: 'Student visas',
        links: [
          { label: 'Student visa information (500)', href: '/study-australia/student-visa-information' },
          { label: 'Student visa journey', href: '/study-australia/student-visa-journey' },
          { label: 'Student visa extension', href: '/study-australia/student-visa-extension' },
          { label: 'Family on a student visa (500)', href: '/study-australia/student-dependent-visa-500' },
          { label: 'Student Guardian (590)', href: '/study-australia/student-guardian-visa-590' },
          { label: 'Financial calculator', href: '/study-australia/student-visa-financial-calculator' },
        ],
      },
    ],
  },
  {
    id: 'visitor',
    label: 'Visitor and business',
    hub: { label: 'Visitor visas overview', href: '/visitor-visa' },
    blurb: 'Visit, holiday-work, or invest and run a business.',
    columns: [
      {
        heading: 'Visitor and holiday visas',
        links: [
          { label: 'Visitor visa (600)', href: '/visitor-visa/visitor-visa-600' },
          { label: 'Business Visitor (600)', href: '/visitor-visa/visitor-600-business-visitor', desc: 'Meetings and conferences, not work' },
          { label: 'Frequent Traveller (600)', href: '/visitor-visa/visitor-600-frequent-traveller', desc: 'Up to 10 years for selected passports' },
          { label: 'eVisitor (651)', href: '/visitor-visa/evisitor-651' },
          { label: 'Electronic Travel Authority (601)', href: '/visitor-visa/electronic-travel-authority-601' },
          { label: 'Sponsored family visitor', href: '/visitor-visa/sponsored-family' },
          { label: 'Working Holiday (417)', href: '/visitor-visa/work-holiday-417' },
          { label: 'Work and Holiday (462)', href: '/visitor-visa/work-holiday-462' },
          { label: 'Stay longer (onshore)', href: '/visitor-visa/onshore-visitor-visa-extension' },
          { label: 'Stay longer (offshore)', href: '/visitor-visa/offshore-extension' },
        ],
      },
      {
        heading: 'Business and investor',
        links: [
          { label: 'Business visas overview', href: '/business-visa' },
          { label: 'Business Innovation provisional (188)', href: '/business-visa/business-innovation-and-investment-provisional-visa-subclass-188' },
          { label: 'Business Innovation permanent (888)', href: '/business-visa/business-innovation-and-investment-permanent-visa-subclass-888' },
          { label: 'Business Talent permanent (132)', href: '/business-visa/business-talent-permanent-visa-subclass-132' },
        ],
      },
    ],
  },
  {
    id: 'appeals',
    label: 'Appeals and reviews',
    hub: { label: 'Appeals and reviews overview', href: '/appeals' },
    blurb: 'Refusals, cancellations and your review rights.',
    columns: [
      {
        heading: 'If you have a decision',
        links: [
          { label: 'Visa refusal', href: '/appeals/visa-refusal' },
          { label: 'Visa cancellation', href: '/appeals/visa-cancellation' },
          { label: 'Notice of Intention to Consider Cancellation', href: '/appeals/notice-of-intention-to-consider-cancellation' },
          { label: 'Review process', href: '/appeals/review-process' },
        ],
      },
      {
        heading: 'Review and court options',
        links: [
          { label: 'ART appeals', href: '/appeals/art-appeals' },
          { label: 'Federal Court appeals', href: '/appeals/federal-court-appeals' },
          { label: 'Ministerial intervention', href: '/appeals/ministerial-intervention' },
          { label: 'Waiver request', href: '/appeals/waiver-request' },
          { label: 'Applying for work rights', href: '/appeals/applying-for-work-rights' },
          { label: 'Applying for study rights', href: '/appeals/applying-for-study-rights' },
        ],
      },
    ],
  },
  {
    id: 'more',
    label: 'More visas',
    hub: { label: 'Citizenship', href: '/citizenship' },
    blurb: 'Bridging, travel, medical, maritime and other options.',
    columns: [
      {
        heading: 'Bridging and citizenship',
        links: [
          { label: 'Bridging and Resident Return overview', href: '/bridging-return-visas' },
          { label: 'Bridging Visa A (010)', href: '/bridging-return-visas/bridging-visa-a-010' },
          { label: 'Bridging Visa B (020)', href: '/bridging-return-visas/bridging-visa-b-020' },
          { label: 'Bridging Visa C (030)', href: '/bridging-return-visas/bridging-visa-c-030' },
          { label: 'Bridging Visa E (050/051)', href: '/bridging-return-visas/bridging-visa-e-050-051' },
          { label: 'Resident Return (155/157)', href: '/bridging-return-visas/resident-return-visa-155-157' },
        ],
      },
      {
        heading: 'Citizenship and other countries',
        links: [
          { label: 'Australian citizenship', href: '/citizenship' },
          { label: 'Citizenship by conferral', href: '/citizenship/citizenship-by-conferral' },
          { label: 'NZ citizens on a 444 visa', href: '/citizenship/new-zealand-citizens-subclass-444', desc: 'Citizenship without a permanent visa first' },
          { label: 'Citizenship by descent', href: '/citizenship/citizenship-by-descent' },
          { label: 'Citizenship by birth', href: '/citizenship/citizenship-by-birth' },
          { label: 'Dual citizenship', href: '/citizenship/dual-citizenship' },
          { label: 'Citizenship test', href: '/citizenship/citizenship-test' },
          { label: 'Evidence of citizenship', href: '/citizenship/evidence-of-australian-citizenship' },
          { label: 'Other countries', href: '/other-countries' },
          { label: 'Canada', href: '/other-countries/canada' },
          { label: 'New Zealand', href: '/other-countries/new-zealand' },
          { label: 'United States', href: '/other-countries/usa' },
          { label: 'Celebrity visas', href: '/celebrity-visas' },
        ],
      },
      {
        heading: 'Medical, travel and maritime',
        links: [
          { label: 'Medical and humanitarian overview', href: '/medical-humanitarian' },
          { label: 'Medical Treatment (602)', href: '/medical-humanitarian/medical-treatment-visa-602' },
          { label: 'Pacific Engagement (192)', href: '/medical-humanitarian/pacific-engagement-visa-192' },
          { label: 'Former Resident (151)', href: '/medical-humanitarian/former-resident-visa-151' },
          { label: 'Transit and special purpose overview', href: '/transit-special-purpose' },
          { label: 'Transit (771)', href: '/transit-special-purpose/transit-visa-771' },
          { label: 'Special Category (444)', href: '/transit-special-purpose/special-category-visa-444' },
          { label: 'Maritime crew overview', href: '/maritime-crew' },
          { label: 'Maritime Crew (988)', href: '/maritime-crew/maritime-crew-visa-988' },
        ],
      },
    ],
  },
];

export const TOOLS: NavLink[] = [
  { label: 'PR Points Calculator', href: '/migrate-to-australia/pr-point-calculator', desc: 'Estimate points for 189, 190 and 491' },
  { label: 'Victorian Points Test', href: '/migrate-to-australia/victorian-points-test', desc: 'Check your fit for Victorian nomination' },
  { label: 'Occupation Finder', href: '/occupation-finder', desc: 'Find ANZSCO codes and assessing authorities' },
  { label: 'Regional Postcode Checker', href: '/postcode-checker', desc: 'See if a postcode is regional' },
  { label: 'Student Visa Financial Calculator', href: '/study-australia/student-visa-financial-calculator', desc: 'Estimate funds for a Subclass 500' },
  { label: 'South Australia Nomination', href: '/south-australia-state-nomination', desc: 'Guide to SA state nomination' },
  { label: 'AFP National Police Check', href: '/afp-national-police-check', desc: 'Apply for an Australian police check' },
  { label: 'Office Visit Form', href: '/office-visit-form', desc: 'Fill in before you visit us' },
];

export const COMPANY: NavLink[] = [
  { label: 'About us', href: '/about' },
  { label: 'Our team', href: '/team' },
  { label: 'Client reviews', href: '/testimonials' },
  { label: 'Success stories', href: '/success-stories' },
  { label: 'Blogs and guides', href: '/blogs' },
  { label: 'Contact us', href: '/contact' },
];

export const LEGAL: NavLink[] = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms and conditions', href: '/terms-conditions' },
  { label: 'Cookie policy', href: '/cookie-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

export const CONTACT = {
  phone: '+61 3 9602 1330',
  phoneHref: 'tel:+61396021330',
  email: 'info@bansalimmigration.com.au',
  hours: 'Monday to Friday, 9:30 am to 6:00 pm',
  offices: [
    { name: 'Melbourne head office', address: 'Level 8, 278 Collins Street, Melbourne VIC 3000' },
    { name: 'Adelaide office', address: 'Unit 5, 55 Gawler Place, Adelaide SA 5000', phone: '+61 8 8317 1340', phoneHref: 'tel:+61883171340' },
  ],
};
