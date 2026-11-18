export const ENQUIRY_LABELS: Record<string, string> = {
  tr: 'JRP',
  tourist: 'Vijay',
  education: 'Education',
  kunal: 'Kunal (PR / GSM / EOI)',
  ajay: 'Ajay',
  arun: 'Arun',
  pr_complex: 'Employer Sponsored',
};

export const ENQUIRY_FILTERS = ['tr', 'tourist', 'education', 'ajay', 'arun'] as const;

export const BLOCK_ENQUIRY_TYPES = ['tr', 'tourist', 'education', 'ajay', 'arun', 'kunal', 'pr_complex'] as const;

/** Melbourne calendars shown in Calendar hours, in the same order as the current admin. */
export const MELBOURNE_CALENDARS = [
  {
    key: 'tr',
    title: 'JRP calendar',
    hover:
      'GSM Visas (491, 190, 189, 191), EOI/ROI, Employer Sponsored Visas (494, 482, 186, DAMA), JRP/Skill Assessment — Free only',
  },
  {
    key: 'tourist',
    title: 'Vijay',
    hover: 'Tourist Visa and TR: 485 visa. Free and paid.',
  },
  {
    key: 'education',
    title: 'Education',
    hover: 'Education, course change, student visa, and student dependent visa. Free and paid.',
  },
  {
    key: 'ajay',
    title: 'Ajay',
    hover:
      'Paid: GSM, EOI/ROI, employer sponsored, and JRP. Free and paid: complex matters, visa cancellations, family visas, citizenship, and outside Australia.',
  },
  {
    key: 'arun',
    title: 'Arun',
    hover: 'Arun calendar',
  },
] as const;

export const STATUSES = ['pending', 'confirmed', 'paid', 'in_progress', 'completed', 'cancelled', 'no_show'] as const;

export const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  paid: 'Paid',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

const SERVICE_LABELS: Record<string, string> = {
  'permanent-residency': 'GSM Visas: 491, 190, 189, 191',
  'eoi-roi': 'EOI/ROI',
  'temporary-residency': 'TR: 485 visa',
  'employer-sponsored-visas': 'Employer Sponsored Visas: 494, 482, 186, DAMA',
  'jrp-skill-assessment': 'JRP/Skill Assessment',
  'tourist-visa': 'Tourist Visa',
  'education-visa':
    'Education/Course Change/Student Visa/Student Dependent Visa (for education selection for Australian onshore clients only)',
  'complex-matters': 'Complex matters: ART, Protection visa',
  'visa-cancellation': 'Visa Cancellation/ NOICC/ Visa refusals',
  'family-visas': 'Family Visas (Parent Visa, Partner Visa, Child Visa)',
  citizenship: 'Citizenship',
  'international-migration': 'Anyone who is outside Australia',
  consultation: 'Free Consultation',
  'paid-consultation': 'Comprehensive Migration Advice',
  'overseas-enquiry': 'Overseas Applicant Enquiry',
};

export function enquiryLabel(value: string | null | undefined) {
  if (!value) return '—';
  return ENQUIRY_LABELS[value] || value;
}

export function serviceLabel(value: string | null | undefined) {
  if (!value) return '—';
  return SERVICE_LABELS[value] || value.replace(/[-_]/g, ' ');
}

export function statusLabel(value: string | null | undefined) {
  if (!value) return '—';
  return STATUS_LABELS[value] || value;
}

export function clock(value: unknown) {
  if (!value) return '—';
  const text = value instanceof Date
    ? `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`
    : String(value).slice(0, 5);
  const match = text.match(/^(\d{2}):(\d{2})/);
  if (!match) return text;
  const hours = Number(match[1]);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${match[2]} ${suffix}`;
}

export function dayLabel(value: unknown) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}
