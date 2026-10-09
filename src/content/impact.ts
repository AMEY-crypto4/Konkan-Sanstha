import { ORG } from './org';
import type { Stat } from './types';

/** The four headline numbers used on the home page and the impact page. */
export const HEADLINE: Stat[] = [
  { value: ORG.beneficiaries, label: 'Lives touched', note: 'Cumulative, as reported by the organisation' },
  { value: ORG.states, label: 'States reached' },
  { value: ORG.projects, suffix: '+', label: 'Projects running' },
  { value: ORG.yearsOfWork, label: 'Years of impact' },
];

export type ImpactBlock = { programme: string; slug: string; stats: Stat[] };

/** Programme-level figures exactly as published. Several are cumulative "till date" counts. */
export const IMPACT_BLOCKS: ImpactBlock[] = [
  {
    programme: 'Education support',
    slug: 'education',
    stats: [
      { value: 14013, label: 'Children helped' },
      { value: 2208, label: 'School kits given to rural students' },
      { value: 1164, label: 'Scholarships awarded' },
      { value: 4404, label: 'Nutrition kits for street children' },
      { value: 1059, label: 'Career guidance sessions' },
      { value: 126, label: 'Bicycles for girl students' },
    ],
  },
  {
    programme: 'Saksham (child care institutions)',
    slug: 'saksham',
    stats: [
      { value: 17, suffix: '+', label: 'Child care institutions' },
      { value: 1210, suffix: '+', label: 'Children reached' },
      { value: 148, suffix: '+', label: 'Workshops held' },
      { value: 30, suffix: '+', label: 'Caregivers and staff trained' },
    ],
  },
  {
    programme: 'Medical support',
    slug: 'medical-support',
    stats: [
      { value: 15000, suffix: '+', label: 'Children supported' },
      { value: 500, suffix: '+', label: 'Surgeries and medical cases' },
      { value: 85, suffix: '%', label: 'Treatments reported successful' },
    ],
  },
  {
    programme: 'Sulochana cataract initiative',
    slug: 'sulochana',
    stats: [
      { value: 1627, suffix: '+', label: 'Rural health camps' },
      { value: 306, label: 'Cataract surgeries' },
      { value: 200, label: 'Early cataracts detected' },
      { value: 150, label: 'Awareness camps' },
    ],
  },
  {
    programme: 'Village development',
    slug: 'village-development',
    stats: [
      { value: 3000, suffix: '+', label: 'Women through Kokan Silai school' },
      { value: 1000, suffix: '+', label: 'Beauty parlour course graduates' },
      { value: 200, suffix: '+', label: 'Nursing assistant graduates' },
      { value: 78, suffix: '+', label: 'Sewing machines provided' },
      { value: 90, suffix: '+', label: 'Women who started bakeries' },
    ],
  },
  {
    programme: 'Feed One Feed All',
    slug: 'feed-one-feed-all',
    stats: [{ value: 37463, label: 'People fed since October 2023', note: 'Pune project, till date' }],
  },
  {
    programme: 'PADyatra',
    slug: 'padyatra',
    stats: [{ value: 25521, label: 'Girls and women given sanitary napkins' }],
  },
  {
    programme: 'CSR partnerships',
    slug: 'csr-partnership',
    stats: [
      { value: 20, suffix: '+', label: 'National and multinational brands' },
      { value: 42068, label: 'People reached' },
      { value: 825, label: 'Villages' },
    ],
  },
];

/**
 * Unit costs used by the "what your gift can do" calculator.
 * `stated` costs are printed on the original site; `derived` costs are calculated from its
 * published tiers (for example 150 meals for ₹6,000 gives ₹40 a meal). Derived values are flagged
 * in the interface so nobody mistakes them for official prices.
 */
export type UnitCost = {
  id: string;
  /** Singular and plural noun phrases, so a count reads naturally: "1 pair of school shoes", "4 pairs of school shoes". */
  one: string;
  many: string;
  cost: number;
  basis: 'stated' | 'derived';
  source: string;
};

export const UNIT_COSTS: UnitCost[] = [
  { id: 'meal', one: "nutritious meal", many: "nutritious meals", cost: 40, basis: 'derived', source: '150 meals for ₹6,000 (Feed One Feed All)' },
  { id: 'blanket', one: "winter blanket", many: "winter blankets", cost: 375, basis: 'derived', source: '10 blankets for ₹3,750 (Blanket campaign)' },
  { id: 'shoes', one: "pair of school shoes", many: "pairs of school shoes", cost: 240, basis: 'stated', source: 'School Kit programme' },
  { id: 'raincoat', one: "raincoat", many: "raincoats", cost: 420, basis: 'stated', source: 'School Kit programme' },
  { id: 'kit', one: "school kit", many: "school kits", cost: 635, basis: 'stated', source: 'School Kit programme' },
  { id: 'stationery', one: "stationery kit", many: "stationery kits", cost: 769, basis: 'stated', source: 'School Kit programme' },
  { id: 'specs', one: "pair of spectacles", many: "pairs of spectacles", cost: 499, basis: 'derived', source: '25 pairs for ₹12,475 (Sulochana)' },
  { id: 'napkins', one: "pack of reusable sanitary napkins", many: "packs of reusable sanitary napkins", cost: 345, basis: 'stated', source: 'PADyatra campaign' },
  { id: 'surgery', one: "cataract surgery", many: "cataract surgeries", cost: 5500, basis: 'derived', source: '2 surgeries for ₹11,000 (Sulochana)' },
  { id: 'machine', one: "sewing machine", many: "sewing machines", cost: 5750, basis: 'stated', source: 'PADyatra and Village Development' },
  { id: 'bicycle', one: "bicycle for a girl student", many: "bicycles for girl students", cost: 8000, basis: 'stated', source: "Let's reCYCLE" },
  { id: 'guardian', one: "month of guardianship for one child", many: "months of guardianship for one child", cost: 12000, basis: 'stated', source: 'Orphanage support' },
  { id: 'sponsor', one: "child's education sponsorship", many: "children's education sponsorships", cost: 15000, basis: 'stated', source: 'Education support' },
];
