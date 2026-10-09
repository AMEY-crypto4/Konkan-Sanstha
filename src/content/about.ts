export type TimelineEntry = { when: string; title: string; body: string };

export const TIMELINE: TimelineEntry[] = [
  {
    when: '2010',
    title: 'The journey begins',
    body: "A small effort in Maharashtra to support children's education through scholarships, school kits, career counselling seminars and the Vidyarthi Dattak Yojana for street and marginalised children.",
  },
  {
    when: '2012',
    title: 'Registered as a charitable organisation',
    body: 'Registered under the Bombay Public Trust and Society Act, in Sindhudurg, Maharashtra.',
  },
  {
    when: '2014',
    title: 'Tax registrations granted',
    body: 'The 12A and 80G certificates arrive, allowing donors to claim a tax benefit.',
  },
  {
    when: '2010–2015',
    title: 'Programmes widen',
    body: 'Education support is joined by orphanage support, village development, medical support and disaster relief.',
  },
  {
    when: '2018',
    title: 'Kerala flood response',
    body: 'Relief supplies and hygiene kits reach families in flood camps in Idukki and Wayanad.',
  },
  {
    when: '2021',
    title: 'Unicorn Child Development Centre',
    body: 'A shelter opens for children who have no family or steady home.',
  },
  {
    when: '2022',
    title: 'Blankets and bicycles',
    body: "The Blanket campaign begins, and Let's reCYCLE is re-launched on Women's Day.",
  },
  {
    when: '2023',
    title: 'Feed One Feed All',
    body: 'Announced on 21 October 2023 to serve nourishing meals to underprivileged people in cities. The first Kokan Kala Mahostav also falls in this year.',
  },
  {
    when: '2030',
    title: 'The goal',
    body: 'To empower 3 million people from marginalised communities through programmes aligned with the global Sustainable Development Goals.',
  },
];

export const OBJECTIVES = [
  'Provide quality education, scholarships and financial aid for needy children in rural and underserved areas.',
  'Improve educational infrastructure and resources in remote regions.',
  "Run child welfare programmes that protect children's rights to education, health, safety and well-being.",
  'Address hunger and malnutrition among the needy.',
  'Empower women and rural communities through skills training, entrepreneurship and livelihood programmes.',
  'Expand access to clean water and sanitation for last-mile communities.',
  'Promote environmental conservation through community education and engagement.',
  'Build partnerships with government, civil society, academia and the private sector.',
];

export const STORIES = [
  { title: 'Son preference: the cause of female foeticide', topic: 'Gender' },
  { title: "Girls' education: towards a better future for all", topic: 'Education' },
  { title: 'Women fight shame in flood relief camps', topic: 'Relief' },
  { title: 'Access to health care: a distant dream for rural India', topic: 'Health' },
  { title: 'Right to education: beyond the reach of many', topic: 'Education' },
  { title: 'Not disabled, but specially abled', topic: 'Inclusion' },
  { title: 'Fighting hunger for a better future for children', topic: 'Hunger' },
] as const;
