/**
 * Public booking calendar routing.
 * Keep aligned with resources/js/appointment-form/config.js
 * and App\Support\AppointmentEnquiryTypeResolver in the Laravel app.
 */

const SERVICE_TYPE_TO_ENQUIRY_TYPE: Record<string, string> = {
  'permanent-residency': 'kunal',
  'eoi-roi': 'kunal',
  eoi: 'kunal',
  roi: 'kunal',
  'expression-of-interest': 'kunal',
  'gsm-visas': 'kunal',
  'gsm-visa': 'kunal',
  gsm: 'kunal',
  'skilled-migration': 'kunal',
  'temporary-residency': 'tr',
  '485-visa': 'tr',
  '485': 'tr',
  'employer-sponsored-visas': 'pr_complex',
  'employer-sponsored': 'pr_complex',
  'employer-sponsored-visa': 'pr_complex',
  'jrp-skill-assessment': 'tr',
  'tourist-visa': 'tourist',
  'visitor-visa': 'tourist',
  'education-visa': 'education',
  'student-visa': 'education',
  'course-change': 'education',
  'student-dependent-visa': 'education',
  'complex-matters': 'ajay',
  'visa-cancellation': 'ajay',
  'protection-visa': 'ajay',
  'art-visa': 'ajay',
  'federal-case': 'ajay',
  'federal-review': 'ajay',
  noicc: 'ajay',
  'visa-refusal': 'ajay',
  'visa-refusals': 'ajay',
  'family-visas': 'ajay',
  'partner-visa': 'ajay',
  'parent-visa': 'ajay',
  'child-visa': 'ajay',
  citizenship: 'ajay',
  'australian-citizenship': 'ajay',
  'citizenship-test': 'ajay',
  'international-migration': 'pr_complex',
  overseas: 'pr_complex',
};

const MELBOURNE_TR_485 = new Set([
  'temporary-residency',
  'temporary residency',
  '485-visa',
  '485 visa',
  '485',
]);

const MELBOURNE_JRP = new Set([
  'permanent-residency',
  'eoi-roi',
  'eoi',
  'roi',
  'expression-of-interest',
  'gsm-visas',
  'gsm_visas',
  'gsm-visa',
  'gsm',
  'pr',
  'gsm visas: 491, 190, 189, 191',
  'gsm visas: 491, 190, 189, 191 or eoi/roi',
  'employer-sponsored-visas',
  'employer-sponsored',
  'employer-sponsored-visa',
  'employer sponsored visas',
  'employer_sponsored',
  'employer_sponsored_visa',
  'jrp-skill-assessment',
  'jrp_skill_assessment',
  'jrp skill assessment',
]);

const MELBOURNE_OUTSIDE = new Set([
  'international-migration',
  'international migration',
  'international_migration',
  'outside australia',
  'outside-australia',
  'overseas',
]);

export function getEffectiveEnquiryTypeForBooking(
  location: string,
  serviceTypeSlug: string | null | undefined,
  isPaid: boolean
): string {
  const slug = (serviceTypeSlug || '').toLowerCase().trim();
  const base = (slug && SERVICE_TYPE_TO_ENQUIRY_TYPE[slug]) || 'tr';

  if (location !== 'melbourne') return base;
  if (MELBOURNE_TR_485.has(slug)) return 'tourist';
  if (MELBOURNE_JRP.has(slug)) return isPaid ? 'ajay' : 'tr';
  if (MELBOURNE_OUTSIDE.has(slug)) return 'ajay';
  return base;
}

export function isPaidService(specificService: string | null | undefined): boolean {
  return specificService === 'paid-consultation' || specificService === 'overseas-enquiry';
}

export function serviceRequiresPaidPackage(serviceType: string, meetingType: string): boolean {
  return (
    meetingType === 'video-call' ||
    serviceType === 'international-migration' ||
    serviceType === 'complex-matters' ||
    serviceType === 'visa-cancellation'
  );
}

export function hideOverseasPackage(serviceType: string): boolean {
  return serviceType === 'complex-matters' || serviceType === 'visa-cancellation';
}
