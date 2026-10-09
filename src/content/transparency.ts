/** Registrations, recognition and policies as listed on the original site (names only, no numbers). */

export const REGISTRATIONS = [
  { name: 'Society Registration Act', group: 'Legal registration' },
  { name: 'Bombay Public Trust Act', group: 'Legal registration' },
  { name: 'NGO Darpan', group: 'Legal registration' },
  { name: 'PAN card', group: 'Tax' },
  { name: '12AB certificate', group: 'Tax' },
  { name: '80G certificate', group: 'Tax' },
  { name: 'CSR approval', group: 'Funding and compliance' },
  { name: 'FCRA registration', group: 'Funding and compliance' },
] as const;

export type Award = { title: string; body: string; year: string; to?: string };

export const AWARDS: Award[] = [
  { title: 'District Youth Award', body: 'Government of Maharashtra', year: '2025–26' },
  { title: 'Outstanding Social Service honour', body: "Charity Commissioner's Office", year: '2025–26' },
  { title: 'National WASH Leadership Excellence Award', body: 'Awarding body not stated', year: '2025–26' },
  { title: '14+ Years of Lifesaving Impact Award', body: 'Wockhardt Hospitals, Mumbai Central', year: '2025–26' },
  { title: 'Orange City Icon Award', body: 'Awarding body not stated', year: '2025–26', to: 'Founder' },
  { title: 'Kokan Sanman Award', body: 'Awarding body not stated', year: '2024–25', to: 'Founder' },
  { title: 'Sir Ratanji Tata Excellence Award', body: 'Awarding body not stated', year: '2024–25', to: 'Founder' },
  { title: 'Child Rights & Women Empowerment Award (Best CSR Projects in Child and Women Welfare)', body: 'Awarding body not stated', year: '2024–25' },
  { title: 'Community Impact Excellence Award', body: 'Nation Wide Awards', year: '2023–24' },
  { title: 'Best NGO of the Year', body: 'Awarding body not stated', year: '2022–23' },
  { title: 'Community Development Award', body: 'Awarding body not stated', year: '2022–23' },
  { title: 'Neighborhood Hero of Mumbai', body: 'HDFC Bank', year: '2021–22', to: 'Individual recipient' },
  { title: 'Social Youth Icon', body: 'Dingane Panchkroshi Shikshan Vikas Mandal', year: '2014–15' },
];

export const ACCREDITATIONS = [
  'Bharat Economic Forum',
  'Benevity',
  'GuideStar India',
  'United Way',
  'NSS tie-up, Mumbai University',
  'VANI',
  'Give India',
  'AFARM',
  'CSR Box',
  'CAF',
  'India Donates',
  'Toolbox India',
  'NGO Federation',
  'VibhaVani',
];

export const ANNUAL_REPORTS = ['2024–2025', '2023–2024', '2022–2023', '2021–2022', '2020–2021', '2019–2020', '2018–2019'];

export const FINANCIALS = ['Financial statements FY 2024–25', 'FCRA financials FY 2024–25', 'Financial statements FY 2023–24'];

export const POLICIES = [
  'Privacy policy',
  'Donor privacy policy',
  'Terms and conditions',
  'Refund and cancellation',
  'Disclaimer',
  'Child protection policy',
];
