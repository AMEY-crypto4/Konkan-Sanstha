/**
 * Organisation facts, contact details and global config.
 * Every value here was taken from the public kokanngo.org site (October 2026) and rewritten.
 * Anything marked CONFIRM is inconsistent on the original site and needs a decision from the team.
 */

export const CONCEPT = {
  /** Shows the "unofficial concept" strip on every page. Keep true for anything shared outside the team. */
  banner: true,
  officialSite: 'https://www.kokanngo.org/',
} as const;

export const ORG = {
  shortName: 'Kokan NGO India',
  legalName: 'Kokan Kala Va Shikshan Vikas Sanstha',
  tagline: 'The movement from darkness to light',
  established: 2012,
  yearsOfWork: 14,
  states: 12,
  projects: 12,
  /** CONFIRM: the site shows 14,70,152 in two places and 11,67,606 in the homepage body text. */
  beneficiaries: 1470152,
  /** CONFIRM: the mission page says 3 million by 2030; the journey page says 2,10,420 by 2030. */
  target2030: 3000000,
} as const;

export const CONTACT = {
  phone: { display: '+91-022 4973 7396', href: 'tel:+912249737396' },
  helpline: { display: '+91-77095 85110', href: 'tel:+917709585110' },
  whatsapp: 'https://wa.me/917709585110',
  emails: {
    general: 'admin@kokanngo.org',
    volunteers: 'volunteers@kokanngo.org',
    adoption: 'SAA@kokanngo.org',
  },
} as const;

export type Office = {
  city: string;
  area: string;
  address: string;
  note?: string;
};

export const OFFICES: Office[] = [
  {
    city: 'Mumbai',
    area: 'Dadar East',
    address:
      '3rd Floor, Laxmi Building, Mahatma Jyotiba Phule Road, near Sharada Talkies, Dadar East, Mumbai 400014',
    note: 'Listed first on the original contact page.',
  },
  {
    city: 'Pune',
    area: 'Swargate',
    address:
      '505, 5th Floor, Kumar Surabhi Co-op Housing Ltd, Pune Satara Road, near Laxmi Narayan Talkies, Pune 411009',
  },
  {
    city: 'Sindhudurg',
    area: 'Kudal',
    address:
      '2550, Survey No. 82/36, Mangao Bamboo Cluster, Shrilochan Chowk, Kumbharwadi, Mangaon, Kudal, Sindhudurg 416519',
  },
  {
    city: 'Delhi NCR',
    area: 'Noida',
    address: '1st Floor, Office No. 103, B-42, Noida Sector 2, Delhi NCR 201301',
  },
];

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/kokanngo_india' },
  { label: 'YouTube', href: 'https://www.youtube.com/@kokanngoindia' },
  { label: 'Facebook', href: 'https://www.facebook.com/Kokanngo.org' },
] as const;

export const STATES = [
  'Maharashtra',
  'Karnataka',
  'Delhi',
  'Gujarat',
  'Madhya Pradesh',
  'Andhra Pradesh',
  'Tamil Nadu',
  'Telangana',
  'Goa',
  'Kerala',
  'Haryana',
  'West Bengal',
] as const;

/** Giving rules stated on the original donation and programme pages. */
export const GIVING = {
  minCustomAmount: 500,
  presets: [500, 1000, 2500, 5000],
  recurringNote: 'Monthly gifts are set up through an eNACH mandate or UPI AutoPay.',
  taxNote:
    'An 80G tax benefit is available when valid PAN and address details are provided for the receipt.',
} as const;

export const CAUTION =
  'Please note: some people falsely claim to represent Kokan NGO India. The organisation says it does not run investment or trading platforms, does not ask for funds for them, and never asks for confidential information through unofficial channels. Verify any request on the official website before you give money or personal details.';
