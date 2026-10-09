import type { Campaign } from './types';

/** Campaign content, rewritten from the public campaign pages (October 2026). */
export const CAMPAIGNS: Campaign[] = [
  {
    slug: 'padyatra',
    title: 'PADyatra',
    icon: 'flower',
    tone: 'rose',
    tagline: 'Menstrual dignity through education, access and empowerment.',
    summary:
      'PADyatra measures its success in lives changed, not miles walked. It breaks the silence around periods and puts hygiene products in the hands of girls and women who go without.',
    stats: [{ value: 25521, label: 'Girls and women given sanitary napkins' }],
    paragraphs: [
      'Interactive workshops tackle myths and share practical hygiene advice, including for people living with PCOS or PCOD.',
      'Sanitary kits with eco-friendly products go to underprivileged communities, and outreach work aims to reduce taboos and build local partnerships.',
    ],
    giving: [
      {
        title: 'Items you can fund',
        note: 'Quantities and unit prices as published on the campaign page.',
        options: [
          { label: 'Reusable pads (10)', amount: 3500, detail: '10 at ₹350' },
          { label: 'Regular sanitary napkins (50)', amount: 4500, detail: '50 at ₹90' },
          { label: 'Menstruation comics (20)', amount: 4000, detail: '20 at ₹200' },
          { label: 'Menstrual training kits (2)', amount: 5000, detail: '2 at ₹2,500' },
          { label: 'Sewing machines (5)', amount: 28750, detail: '5 at ₹5,750' },
          { label: 'Reusable sanitary napkins (50)', amount: 17250, detail: '50 at ₹345' },
          { label: 'Health and hygiene kits (20)', amount: 9000, detail: '20 at ₹450' },
        ],
      },
    ],
  },
  {
    slug: 'blanket',
    title: 'Blanket campaign',
    icon: 'snowflake',
    tone: 'indigo',
    tagline: 'No one should have to face the winter cold alone.',
    summary:
      'Each winter the campaign hands out blankets to homeless people, street children and older people who have no shelter or warm clothing, in Mumbai, Thane and other parts of Maharashtra.',
    stats: [{ value: 1500, label: 'Blankets distributed since 2022' }],
    paragraphs: [
      'Cold nights cause avoidable illness and deaths among people living outdoors. A blanket is a simple, immediate answer.',
    ],
    giving: [
      {
        title: 'Blanket packages',
        note: 'About ₹375 per blanket, worked out from the published packages.',
        options: [
          { label: '10 blankets', amount: 3750 },
          { label: '20 blankets', amount: 7500 },
          { label: '50 blankets', amount: 18750 },
          { label: '100 blankets', amount: 37500 },
        ],
      },
    ],
  },
  {
    slug: 'christmas',
    title: 'Christmas campaign',
    icon: 'gift',
    tone: 'saffron',
    tagline: 'A season of gifts for children and women who rarely receive them.',
    summary:
      'The campaign gathers support for street children, rural women and girls, and children in orphanage support homes, with each gift itemised so donors can see where it goes.',
    stats: [{ value: 435, label: 'Children in the orphanage programme, across 5+ states' }],
    paragraphs: ['Items are grouped by the people they help, and every line shows the number of beneficiaries and the unit cost.'],
    giving: [
      {
        title: 'Education: gifts of wisdom',
        options: [
          { label: 'Cake and chocolate', amount: 2520, detail: '28 children at ₹90' },
          { label: 'Food and snacks', amount: 6020, detail: '28 children at ₹215' },
          { label: 'Education tour', amount: 16100, detail: '28 children at ₹575' },
        ],
      },
      {
        title: 'Needy street children',
        options: [
          { label: 'One day of food', amount: 14000, detail: '40 children at ₹350' },
          { label: 'Toys for the migrant community', amount: 9450, detail: '30 at ₹315' },
          { label: 'Blankets for the homeless', amount: 20000, detail: '50 at ₹400' },
        ],
      },
      {
        title: 'Women empowerment (village development)',
        options: [
          { label: 'Sewing machines', amount: 28750, detail: '5 at ₹5,750' },
          { label: 'Reusable sanitary napkins', amount: 17250, detail: '50 at ₹345' },
          { label: 'Health and hygiene kits', amount: 9000, detail: '20 at ₹450' },
        ],
      },
      {
        title: 'Orphanage support: glowing futures together',
        options: [
          { label: 'School kits', amount: 5500, detail: '10 at ₹550' },
          { label: 'Bicycles', amount: 15300, detail: '2 at ₹7,650' },
          { label: 'A month of education', amount: 30000, detail: '10 children at ₹3,000' },
        ],
      },
    ],
  },
  {
    slug: 'best-bappa-of-the-year',
    title: 'Best Bappa of the Year',
    icon: 'palette',
    tone: 'saffron',
    tagline: 'Children in care make eco-friendly Ganesha idols, and learn that they can create.',
    summary:
      'Children living in child care institutions make eco-friendly Ganesha idols for Ganesh Chaturthi. The workshops build focus, patience, teamwork and self-expression, and the campaign celebrates the children\'s work.',
    stats: [],
    paragraphs: [
      'Mentors guide the workshops, and prizes reward creativity, originality, dedication and artistic promise. No formal judging rules are published on the original page.',
    ],
    giving: [
      {
        title: 'Fund the awards and tokens',
        note: 'Tokens of appreciation work out to ₹500 per child.',
        options: [
          { label: 'Bappa of the Year award', amount: 25000 },
          { label: 'Second prize', amount: 15000 },
          { label: 'Third prize', amount: 7500 },
          { label: 'Tokens for 25 children', amount: 12500 },
          { label: 'Tokens for 55 children', amount: 27500 },
          { label: 'Tokens for 75 children', amount: 37500 },
          { label: 'Tokens for 105 children', amount: 52500 },
        ],
      },
    ],
    facts: [{ label: 'Who takes part', value: 'Children living in child care institutions' }],
  },
  {
    slug: 'kokan-kala-mahostav',
    title: 'Kokan Kala Mahostav',
    icon: 'users',
    tone: 'indigo',
    tagline: 'A festival of artists, changemakers and communities.',
    summary:
      'The Mahostav shows how creativity can drive lasting social impact. Editions are listed for 2023, 2024 and 2025, each honouring people and villages that inspire others.',
    stats: [],
    paragraphs: ['The event includes tributes to chief guests and cultural performances alongside the awards.'],
    listTitle: 'Award categories',
    list: [
      'Kokan Ratna: people who uplift communities and preserve culture',
      'Reel To Real: content creators whose online work drives social change',
      'Youth Icon: leaders who inspire young people',
      'Zero To Hero: people who turned hardship into positive impact',
      'Samaj Gaurav: selfless changemakers',
      "You Inspire: creators and cultural figures who motivate action",
      "Maharashtra's Adarsh Gaon: villages that show sustainable development",
    ],
    facts: [{ label: 'Editions listed', value: '2023, 2024, 2025' }],
  },
];

export const campaignBySlug = (slug: string) => CAMPAIGNS.find((c) => c.slug === slug);
