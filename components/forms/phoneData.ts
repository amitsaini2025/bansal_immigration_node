export interface PhoneCountry {
  iso: string;
  name: string;
  flag: string;
  dial: string;
  /** Digit groups of the national number, e.g. [3,3,3] -> "412 345 678" */
  groups: number[];
  min: number;
  max: number;
  /** National numbers often start with a trunk 0 that is dropped after the country code. */
  trunkZero: boolean;
  example: string;
  /** US/Canada style "(212) 555-1234" */
  parens?: boolean;
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: 'AU', name: 'Australia', flag: '🇦🇺', dial: '+61', groups: [3, 3, 3], min: 9, max: 9, trunkZero: true, example: '412 345 678' },
  { iso: 'IN', name: 'India', flag: '🇮🇳', dial: '+91', groups: [5, 5], min: 10, max: 10, trunkZero: true, example: '98765 43210' },
  { iso: 'NZ', name: 'New Zealand', flag: '🇳🇿', dial: '+64', groups: [2, 3, 4], min: 8, max: 10, trunkZero: true, example: '21 234 5678' },
  { iso: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44', groups: [4, 6], min: 10, max: 10, trunkZero: true, example: '7123 456789' },
  { iso: 'US', name: 'United States', flag: '🇺🇸', dial: '+1', groups: [3, 3, 4], min: 10, max: 10, trunkZero: false, example: '(212) 555-1234', parens: true },
  { iso: 'CA', name: 'Canada', flag: '🇨🇦', dial: '+1', groups: [3, 3, 4], min: 10, max: 10, trunkZero: false, example: '(416) 555-1234', parens: true },
  { iso: 'PH', name: 'Philippines', flag: '🇵🇭', dial: '+63', groups: [3, 3, 4], min: 10, max: 10, trunkZero: true, example: '917 123 4567' },
  { iso: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dial: '+971', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '50 123 4567' },
  { iso: 'SG', name: 'Singapore', flag: '🇸🇬', dial: '+65', groups: [4, 4], min: 8, max: 8, trunkZero: false, example: '8123 4567' },
  { iso: 'MY', name: 'Malaysia', flag: '🇲🇾', dial: '+60', groups: [2, 3, 4], min: 9, max: 10, trunkZero: true, example: '12 345 6789' },
  { iso: 'BD', name: 'Bangladesh', flag: '🇧🇩', dial: '+880', groups: [4, 6], min: 10, max: 10, trunkZero: true, example: '1712 345678' },
  { iso: 'NP', name: 'Nepal', flag: '🇳🇵', dial: '+977', groups: [3, 3, 4], min: 10, max: 10, trunkZero: false, example: '984 123 4567' },
  { iso: 'PK', name: 'Pakistan', flag: '🇵🇰', dial: '+92', groups: [3, 7], min: 10, max: 10, trunkZero: true, example: '300 1234567' },
  { iso: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dial: '+94', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '71 234 5678' },
  { iso: 'ZA', name: 'South Africa', flag: '🇿🇦', dial: '+27', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '82 123 4567' },
  { iso: 'NG', name: 'Nigeria', flag: '🇳🇬', dial: '+234', groups: [3, 3, 4], min: 10, max: 10, trunkZero: true, example: '802 123 4567' },
  { iso: 'IE', name: 'Ireland', flag: '🇮🇪', dial: '+353', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '85 123 4567' },
  { iso: 'HK', name: 'Hong Kong', flag: '🇭🇰', dial: '+852', groups: [4, 4], min: 8, max: 8, trunkZero: false, example: '5123 4567' },
  { iso: 'CN', name: 'China', flag: '🇨🇳', dial: '+86', groups: [3, 4, 4], min: 11, max: 11, trunkZero: false, example: '131 2345 6789' },
  { iso: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81', groups: [2, 4, 4], min: 10, max: 10, trunkZero: true, example: '90 1234 5678' },
  { iso: 'KR', name: 'South Korea', flag: '🇰🇷', dial: '+82', groups: [2, 4, 4], min: 9, max: 10, trunkZero: true, example: '10 1234 5678' },
  { iso: 'TH', name: 'Thailand', flag: '🇹🇭', dial: '+66', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '81 234 5678' },
  { iso: 'ID', name: 'Indonesia', flag: '🇮🇩', dial: '+62', groups: [3, 4, 4], min: 9, max: 12, trunkZero: true, example: '812 3456 7890' },
  { iso: 'VN', name: 'Vietnam', flag: '🇻🇳', dial: '+84', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '91 234 5678' },
  { iso: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dial: '+966', groups: [2, 3, 4], min: 9, max: 9, trunkZero: true, example: '50 123 4567' },
  { iso: 'QA', name: 'Qatar', flag: '🇶🇦', dial: '+974', groups: [4, 4], min: 8, max: 8, trunkZero: false, example: '3312 3456' },
  { iso: 'KW', name: 'Kuwait', flag: '🇰🇼', dial: '+965', groups: [4, 4], min: 8, max: 8, trunkZero: false, example: '5012 3456' },
  { iso: 'FR', name: 'France', flag: '🇫🇷', dial: '+33', groups: [1, 2, 2, 2, 2], min: 9, max: 9, trunkZero: true, example: '6 12 34 56 78' },
  { iso: 'DE', name: 'Germany', flag: '🇩🇪', dial: '+49', groups: [3, 4, 4], min: 10, max: 11, trunkZero: true, example: '151 2345 6789' },
  { iso: 'IT', name: 'Italy', flag: '🇮🇹', dial: '+39', groups: [3, 3, 4], min: 9, max: 10, trunkZero: false, example: '312 345 6789' },
  { iso: 'ES', name: 'Spain', flag: '🇪🇸', dial: '+34', groups: [3, 3, 3], min: 9, max: 9, trunkZero: false, example: '612 345 678' },
];

export const DEFAULT_ISO = 'AU';

export function countryByIso(iso: string): PhoneCountry {
  return PHONE_COUNTRIES.find((c) => c.iso === iso) ?? PHONE_COUNTRIES[0];
}

/** First country with this dial code (US for +1). */
export function countryByDial(dial: string): PhoneCountry {
  return PHONE_COUNTRIES.find((c) => c.dial === dial) ?? PHONE_COUNTRIES[0];
}

/** Keep digits, drop a pasted country code and the trunk 0, cap length. */
export function cleanDigits(raw: string, c: PhoneCountry): string {
  let d = raw.replace(/\D/g, '');
  const dialDigits = c.dial.replace('+', '');
  if (raw.trim().startsWith('+') && d.startsWith(dialDigits)) d = d.slice(dialDigits.length);
  else if (raw.trim().startsWith('00') && d.startsWith('00' + dialDigits)) d = d.slice(2 + dialDigits.length);
  if (c.trunkZero && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, c.max);
}

export function formatNational(digits: string, c: PhoneCountry): string {
  if (c.parens) {
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const r = digits.slice(6, 10);
    if (digits.length <= 3) return a;
    if (digits.length <= 6) return `(${a}) ${b}`;
    return `(${a}) ${b}-${r}`;
  }
  const parts: string[] = [];
  let i = 0;
  for (const g of c.groups) {
    if (i >= digits.length) break;
    parts.push(digits.slice(i, i + g));
    i += g;
  }
  if (i < digits.length) parts.push(digits.slice(i));
  return parts.join(' ');
}

const TZ: Record<string, string> = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Pacific/Auckland': 'NZ', 'Europe/London': 'GB', 'Asia/Manila': 'PH',
  'Asia/Dubai': 'AE', 'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Dhaka': 'BD', 'Asia/Kathmandu': 'NP',
  'Asia/Karachi': 'PK', 'Asia/Colombo': 'LK', 'Africa/Johannesburg': 'ZA', 'Africa/Lagos': 'NG', 'Europe/Dublin': 'IE',
  'Asia/Hong_Kong': 'HK', 'Asia/Shanghai': 'CN', 'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR', 'Asia/Bangkok': 'TH',
  'Asia/Jakarta': 'ID', 'Asia/Ho_Chi_Minh': 'VN', 'Asia/Saigon': 'VN', 'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE', 'Europe/Rome': 'IT', 'Europe/Madrid': 'ES',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'America/Regina': 'CA',
};

/** Best guess from browser settings: time zone first, then language region. */
export function guessIsoFromBrowser(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Australia/')) return 'AU';
    if (TZ[tz]) return TZ[tz];
    if (tz.startsWith('America/') || tz.startsWith('US/')) return 'US';
    const region = (navigator.language || '').split('-')[1]?.toUpperCase();
    if (region && PHONE_COUNTRIES.some((c) => c.iso === region)) return region;
  } catch {
    /* ignore */
  }
  return null;
}
