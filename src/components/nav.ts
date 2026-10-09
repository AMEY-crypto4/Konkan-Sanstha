import { PROGRAMS, PROGRAM_GROUPS, programsByGroup } from '../content/programs';
import { CAMPAIGNS } from '../content/campaigns';
import { ALL_ROLES, DEPARTMENTS } from '../content/careers';
import type { IconName, Tone } from '../content/types';

export type NavLinkItem = { to: string; label: string; hint?: string; icon?: IconName; tone?: Tone };
export type NavColumn = { title: string; links: NavLinkItem[] };
export type NavItem =
  | { kind: 'link'; to: string; label: string }
  | { kind: 'mega'; label: string; base: string; columns: NavColumn[]; feature?: { title: string; body: string; cta: { to: string; label: string } } };

const programmeColumns: NavColumn[] = PROGRAM_GROUPS.map((g) => ({
  title: g,
  links: programsByGroup(g).map((p) => ({ to: `/programs/${p.slug}`, label: p.title, hint: p.tagline, icon: p.icon, tone: p.tone })),
}));

export const NAV: NavItem[] = [
  { kind: 'link', to: '/about', label: 'About' },
  {
    kind: 'mega',
    label: 'Our work',
    base: '/programs',
    columns: [
      programmeColumns[0], // Education
      { title: 'Child care and health', links: [...programmeColumns[1].links, ...programmeColumns[2].links] },
      { title: 'Community and relief', links: [...programmeColumns[3].links, ...programmeColumns[4].links] },
    ],
    feature: {
      title: `${PROGRAMS.length} programmes, one mission`,
      body: 'Browse everything the organisation runs, with the figures it publishes for each.',
      cta: { to: '/programs', label: 'All programmes' },
    },
  },
  {
    kind: 'mega',
    label: 'Campaigns',
    base: '/campaigns',
    columns: [
      {
        title: 'Seasonal and cause campaigns',
        links: CAMPAIGNS.map((c) => ({ to: `/campaigns/${c.slug}`, label: c.title, hint: c.tagline, icon: c.icon, tone: c.tone })),
      },
    ],
    feature: {
      title: 'Give to something specific',
      body: 'Each campaign lists what a gift buys, so you can see where it goes.',
      cta: { to: '/campaigns', label: 'All campaigns' },
    },
  },
  { kind: 'link', to: '/impact', label: 'Impact' },
  {
    kind: 'mega',
    label: 'Get involved',
    base: '/get-involved',
    columns: [
      {
        title: 'Ways to help',
        links: [
          { to: '/donate', label: 'Donate', hint: 'One-time or monthly gifts', icon: 'heart-handshake', tone: 'saffron' },
          { to: '/volunteer', label: 'Volunteer', hint: 'Give your time and skills', icon: 'users', tone: 'leaf' },
          { to: '/csr', label: 'Corporate partnerships', hint: 'CSR and employee giving', icon: 'sparkles', tone: 'indigo' },
          { to: '/careers', label: 'Careers', hint: `${ALL_ROLES.length} role types across ${DEPARTMENTS.length} departments`, icon: 'graduation-cap', tone: 'sun' },
        ],
      },
    ],
    feature: {
      title: 'Not sure where to start?',
      body: 'Read how you can help, from a single gift to a long-term partnership.',
      cta: { to: '/get-involved', label: 'See all ways to help' },
    },
  },
  { kind: 'link', to: '/transparency', label: 'Transparency' },
];

export const FOOTER_COLS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: 'Our work',
    links: [
      { to: '/programs/education', label: 'Education support' },
      { to: '/programs/saksham', label: 'Saksham' },
      { to: '/programs/medical-support', label: 'Medical support' },
      { to: '/programs/feed-one-feed-all', label: 'Feed One Feed All' },
      { to: '/programs', label: 'All programmes' },
    ],
  },
  {
    title: 'Campaigns',
    links: CAMPAIGNS.map((c) => ({ to: `/campaigns/${c.slug}`, label: c.title })),
  },
  {
    title: 'Get involved',
    links: [
      { to: '/donate', label: 'Donate' },
      { to: '/volunteer', label: 'Volunteer' },
      { to: '/csr', label: 'Corporate partnerships' },
      { to: '/careers', label: 'Careers' },
    ],
  },
  {
    title: 'The organisation',
    links: [
      { to: '/about', label: 'About' },
      { to: '/impact', label: 'Impact' },
      { to: '/stories', label: 'Stories' },
      { to: '/transparency', label: 'Transparency' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];
