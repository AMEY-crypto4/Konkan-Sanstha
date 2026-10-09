export type IconName =
  | 'book-open' | 'backpack' | 'graduation-cap' | 'bike' | 'home' | 'sparkles' | 'heart-handshake'
  | 'stethoscope' | 'eye' | 'droplets' | 'sprout' | 'utensils' | 'life-buoy' | 'scale'
  | 'snowflake' | 'gift' | 'palette' | 'flower' | 'users' | 'siren' | 'baby';

export type Tone = 'indigo' | 'saffron' | 'sun' | 'leaf' | 'rose';

export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** Short caveat shown in small print, e.g. where a figure is organisation-wide. */
  note?: string;
};

export type GivingOption = {
  label: string;
  amount: number;
  /** e.g. "per month", "one time" */
  cadence?: string;
  detail?: string;
};

export type GivingGroup = {
  title: string;
  note?: string;
  options: GivingOption[];
};

export type DataTable = {
  title: string;
  note?: string;
  columns: string[];
  rows: (string | number)[][];
  /** Numeric cells are formatted as rupees when true. */
  money?: boolean;
};

export type Program = {
  slug: string;
  title: string;
  group: ProgramGroup;
  icon: IconName;
  tone: Tone;
  tagline: string;
  summary: string;
  stats: Stat[];
  activities: { title: string; body: string }[];
  howItWorks?: { title: string; steps: string[] };
  eligibility?: { title: string; items: string[] };
  chips?: { title: string; items: string[] };
  giving?: GivingGroup[];
  tables?: DataTable[];
  faqs?: { q: string; a: string }[];
  related?: string[];
  /** Set when the original page is thin or empty so the template can say so honestly. */
  needsContent?: string;
};

export type ProgramGroup =
  | 'Education'
  | 'Child care'
  | 'Health'
  | 'Livelihood and community'
  | 'Humanitarian';

export type Campaign = {
  slug: string;
  title: string;
  icon: IconName;
  tone: Tone;
  tagline: string;
  summary: string;
  stats: Stat[];
  paragraphs: string[];
  giving?: GivingGroup[];
  facts?: { label: string; value: string }[];
  listTitle?: string;
  list?: string[];
};
