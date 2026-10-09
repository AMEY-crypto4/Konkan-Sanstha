import type { Program, ProgramGroup } from './types';

/**
 * Programme content, rewritten from the public programme pages (October 2026).
 * Figures are as published. Where a page was thin, `needsContent` says so rather than inventing text.
 * In a production build this file is the shape of the CMS collection (WordPress REST, Sanity, Strapi...).
 */
export const PROGRAMS: Program[] = [
  {
    slug: 'education',
    title: 'Education support',
    group: 'Education',
    icon: 'book-open',
    tone: 'indigo',
    tagline: 'Bringing street and marginalised children back to school, and keeping them there.',
    summary:
      'Education is the longest-running part of the organisation. It reaches children who have never been enrolled or have dropped out, and supports them with kits, scholarships, guidance and nutrition.',
    stats: [
      { value: 14013, label: 'Children helped' },
      { value: 2208, label: 'School kits for rural students' },
      { value: 1164, label: 'Scholarships awarded' },
      { value: 4404, label: 'Nutrition kits for street and deprived children' },
      { value: 1059, label: 'Career guidance and counselling sessions' },
      { value: 126, label: 'Bicycles for girl students' },
    ],
    activities: [
      {
        title: 'School starter kits',
        body: 'Uniforms, books, bags and other essentials so a child can begin the school year on equal footing.',
      },
      {
        title: 'Scholarships and guidance',
        body: 'Financial aid for able students from low-income homes, with counselling to plan what comes after school.',
      },
      {
        title: 'Back to the classroom',
        body: 'Work with children who live and work on the street, to ease their move away from street life and into education.',
      },
      {
        title: 'Goal 4 aligned',
        body: 'The programme supports the global goal of inclusive, good-quality education for every child.',
      },
    ],
    chips: { title: 'Initiatives under this programme', items: ['Gully School', 'Yuva Kiran', "Let's reCYCLE", 'Dream Paaya'] },
    giving: [
      {
        title: 'Sponsor a child',
        note: 'Sponsorship tiers as published for the education programme.',
        options: [
          { label: 'Sponsor 1 child', amount: 15000 },
          { label: 'Sponsor 2 children', amount: 30000 },
          { label: 'Sponsor 5 children', amount: 75000 },
        ],
      },
    ],
    related: ['school-kit', 'scholarship', 'lets-recycle'],
  },
  {
    slug: 'school-kit',
    title: 'School kit',
    group: 'Education',
    icon: 'backpack',
    tone: 'saffron',
    tagline: 'Everything a child needs for the first day of school, from bag to raincoat.',
    summary:
      'Children in rural and tribal areas often start the year without a bag, shoes or stationery. The school kit programme closes that gap with items priced individually, so every gift is easy to trace.',
    stats: [
      { value: 635, prefix: '₹', label: 'School kit' },
      { value: 769, prefix: '₹', label: 'Stationery kit' },
      { value: 240, prefix: '₹', label: 'School shoes' },
      { value: 420, prefix: '₹', label: 'Raincoat' },
    ],
    activities: [
      { title: 'School kit', body: 'A school bag and the core learning materials for the year.' },
      { title: 'Stationery kit', body: 'Notebooks, pens and the everyday items children run short of.' },
      { title: 'School shoes', body: 'A proper pair, so the walk to school is not a reason to stay home.' },
      { title: 'Raincoat', body: 'Keeps children and their books dry through the monsoon term.' },
    ],
    giving: [
      {
        title: 'Cover a group of students',
        note: 'A full set (kit, stationery, shoes and raincoat) is ₹635 per student on the published plans.',
        options: [
          { label: 'Equip 10 students', amount: 6350 },
          { label: 'Equip 25 students', amount: 15875 },
          { label: 'Equip 50 students', amount: 31750 },
          { label: 'Equip 200 students', amount: 127000 },
          { label: 'Equip 500 students', amount: 317500 },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I give a different amount?',
        a: 'Yes. Quick amounts of ₹1,000, ₹2,500 and ₹5,000 are offered, and a custom amount above ₹500 is accepted.',
      },
      {
        q: 'Will I get a tax receipt?',
        a: 'An 80G tax benefit is available when valid PAN and address details are provided.',
      },
    ],
    related: ['education', 'scholarship', 'lets-recycle'],
  },
  {
    slug: 'scholarship',
    title: 'Scholarship programme',
    group: 'Education',
    icon: 'graduation-cap',
    tone: 'indigo',
    tagline: 'So that no capable student drops out for lack of money.',
    summary:
      'The scholarship supports students from economically weaker families who have strong marks but cannot afford higher education. Applications are free and decided after verification and an interview.',
    stats: [
      { value: 80, suffix: '%', label: 'Minimum marks in Class 10 and 12' },
      { value: 150000, prefix: '₹', label: 'Family income ceiling per year' },
    ],
    activities: [
      { title: 'Open to government and private colleges', body: 'Students from either can apply.' },
      { title: 'Mentoring and career counselling', body: 'Selected students may receive educational guidance alongside funding.' },
      { title: 'Relaxation for achievers', body: 'A 5% to 10% marks relaxation for students with disabilities or outstanding sports achievements.' },
    ],
    eligibility: {
      title: 'Who can apply',
      items: [
        'Scored 80% or above in both Class 10 and Class 12 examinations.',
        'Annual family income below ₹1,50,000.',
        'A 5% to 10% relaxation on marks applies to students with disabilities or outstanding sports achievements.',
      ],
    },
    howItWorks: {
      title: 'How to apply',
      steps: [
        'Complete the online registration form.',
        'Upload scanned copies of your documents.',
        'Wait while the documents are verified.',
        'Attend an interview and counselling session. The student and parents both attend.',
        'Receive final approval and disbursal of funds.',
      ],
    },
    chips: {
      title: 'Documents to keep ready',
      items: [
        'Aadhaar card',
        'Income proof',
        'Class 10 and 12 marksheets',
        'Ration card',
        'Disability certificate (if applicable)',
        'Caste certificate',
        'Passport-size photo',
      ],
    },
    faqs: [
      { q: 'Is there a fee to apply?', a: 'No. Applications are free.' },
      {
        q: 'What can cause an application to be rejected?',
        a: 'Incomplete applications, and documents that are not original or cannot be verified.',
      },
      {
        q: 'Is funding guaranteed if I meet the criteria?',
        a: 'No. Support depends on eligibility, verification, the interview and available funding.',
      },
    ],
    related: ['education', 'school-kit'],
  },
  {
    slug: 'lets-recycle',
    title: "Let's reCYCLE",
    group: 'Education',
    icon: 'bike',
    tone: 'leaf',
    tagline: 'A bicycle can be the difference between finishing school and leaving it.',
    summary:
      'Girls in remote tribal and rural areas often walk very long distances to reach school, and many drop out because of it. Let\'s reCYCLE puts a bicycle under them. It was re-launched on Women\'s Day 2022.',
    stats: [
      { value: 120, suffix: '+', label: 'Students supported in the previous phase' },
      { value: 200, suffix: '+', label: 'Girl students targeted in this phase' },
      { value: 8000, prefix: '₹', label: 'Cost of one bicycle' },
    ],
    activities: [
      { title: 'Shorter journeys', body: 'A bicycle cuts the daily commute so attendance holds up through the year.' },
      { title: 'Rural and tribal focus', body: 'Support goes to girls in areas where school is far and transport is scarce.' },
    ],
    giving: [
      {
        title: 'Fund bicycles',
        options: [
          { label: '3 bicycles', amount: 24000 },
          { label: '5 bicycles', amount: 40000 },
          { label: '8 bicycles', amount: 64000 },
          { label: '12 bicycles', amount: 96000 },
          { label: '15 bicycles', amount: 120000 },
        ],
      },
    ],
    needsContent: 'The original page does not explain how to hand over a used bicycle in person.',
    related: ['education', 'scholarship'],
  },
  {
    slug: 'orphanage-support',
    title: 'Orphanage support',
    group: 'Child care',
    icon: 'home',
    tone: 'rose',
    tagline: 'Food, health and schooling for children growing up in care.',
    summary:
      'The programme finds orphanages and children\'s homes that need extra help and works out, with each home, how best to meet the needs of the children in its care. It also runs the Unicorn Child Development Centre, set up in 2021 as a shelter for children without family or a steady home.',
    stats: [
      { value: 435, label: 'Children supported across 5+ states', note: 'From the Christmas campaign page' },
      { value: 12000, prefix: '₹', label: 'Monthly guardianship of one child' },
    ],
    activities: [
      { title: 'Guardianship', body: 'Regular monthly support for the food, schooling and care of one child.' },
      { title: 'Meal sponsorship', body: 'One-time nutritious meals, or a special meal for a celebration, for groups of 28 children.' },
      { title: 'Health and hygiene', body: 'Support that covers hygiene essentials and basic healthcare for children in homes.' },
      { title: 'Quality education', body: 'School costs for children who would otherwise fall behind.' },
    ],
    giving: [
      {
        title: 'One-time gifts',
        options: [
          { label: 'Special meal sponsorship for 28 children', amount: 7000 },
          { label: 'Nutritious meal for 28 children', amount: 3500 },
        ],
      },
      {
        title: 'Monthly gift',
        options: [{ label: 'Guardian for 1 child', amount: 12000, cadence: 'per month' }],
      },
    ],
    tables: [
      {
        title: 'Support plans',
        note: 'Amounts in rupees as published.',
        columns: ['Support', '3 months', '6 months', '1 year'],
        rows: [
          ['Two nutritious meals a day for 4 children', 24000, 48000, 96000],
          ['Two nutritious meals a day for 2 children', 12000, 24000, 48000],
          ['Health and hygiene for 3 children', 27000, 54000, 108000],
          ['Quality education for 3 children', 27000, 54000, 108000],
          ['Quality education for 1 child', 9000, 18000, 36000],
        ],
        money: true,
      },
    ],
    related: ['saksham', 'adoption-centre', 'feed-one-feed-all'],
  },
  {
    slug: 'saksham',
    title: 'Saksham',
    group: 'Child care',
    icon: 'sparkles',
    tone: 'saffron',
    tagline: 'Turning shelter homes into places where children can grow into independent adults.',
    summary:
      'Saksham works with child care institutions to build long-term capability, not a temporary fix. It covers the children, their caregivers and the way the institution is run.',
    stats: [
      { value: 17, suffix: '+', label: 'Child care institutions' },
      { value: 1210, suffix: '+', label: 'Children reached' },
      { value: 148, suffix: '+', label: 'Workshops conducted' },
      { value: 30, suffix: '+', label: 'Staff trained' },
    ],
    activities: [
      { title: 'Health and nutrition', body: 'Healthcare and nutritious meals for children in the institutions.' },
      { title: 'Digital and vocational skills', body: 'Training that prepares older children for work and independence.' },
      { title: 'Capacity building', body: 'Training for staff in child protection and caregiving.' },
      { title: 'Caregiver support', body: 'Support for caregivers, including financial independence training for institutions.' },
    ],
    giving: [
      {
        title: 'One-time gifts',
        options: [
          { label: 'Nutritious meal for 135 children', amount: 16875 },
          { label: 'Nutritious meal for 220 children', amount: 27500 },
          { label: 'Special occasion meal for 35 children', amount: 8750 },
          { label: 'Special occasion meal for 55 children', amount: 13750 },
        ],
      },
      {
        title: 'Monthly gifts',
        options: [
          { label: 'A month of education for 6 children', amount: 18000, cadence: 'per month' },
          { label: 'A month of education for 15 children', amount: 45000, cadence: 'per month' },
          { label: 'A month of food, education and health support for 1 child', amount: 8000, cadence: 'per month' },
        ],
      },
    ],
    faqs: [
      { q: 'Is there a child protection policy?', a: 'Yes. It is published as a PDF on the organisation\'s site and listed on the transparency page here.' },
    ],
    related: ['orphanage-support', 'adoption-centre'],
  },
  {
    slug: 'adoption-centre',
    title: 'Premalaya Adoption Centre',
    group: 'Child care',
    icon: 'baby',
    tone: 'rose',
    tagline: 'A Special Adoption Agency that cares for children until a family is found.',
    summary:
      'Premalaya works as a Special Adoption Agency for orphaned, abandoned and surrendered children. It is a non-financially granted partner of the Women and Child Welfare Department, Government of Maharashtra.',
    stats: [],
    activities: [
      { title: 'Family-based care', body: 'Quality childcare during the period before a child is placed with a family.' },
      { title: 'An individual care plan', body: 'Each child has a plan built around what is in that child\'s best interest.' },
    ],
    eligibility: {
      title: 'Who can adopt',
      items: [
        'Prospective parents should be physically, mentally and emotionally stable, financially capable and motivated to adopt.',
        'Any prospective parent may apply, whatever their marital status and whether or not they have biological children.',
        'A single woman may adopt a child of any gender. A single man may not adopt a girl.',
        'Married couples need the consent of both spouses.',
        'Age limits are counted on the date of registration, as shown below.',
      ],
    },
    tables: [
      {
        title: 'Maximum age of parents, by age of the child',
        columns: ['Child\'s age', 'Couple (combined age)', 'Single parent'],
        rows: [
          ['Up to 2 years', 85, 40],
          ['Above 2 to 4 years', 90, 45],
          ['Above 4 to 8 years', 100, 50],
          ['Above 8 to 18 years', 110, 55],
        ],
      },
    ],
    needsContent: 'The original page does not describe the application steps. Add them here before publishing.',
    related: ['orphanage-support', 'saksham'],
  },
  {
    slug: 'medical-support',
    title: 'Medical support',
    group: 'Health',
    icon: 'stethoscope',
    tone: 'rose',
    tagline: 'Treatment for children whose families cannot afford it.',
    summary:
      'The programme funds care for children with serious conditions such as cancer, congenital heart defects and HIV/AIDS, and runs community health work with mothers and children alongside it.',
    stats: [
      { value: 15000, suffix: '+', label: 'Children supported' },
      { value: 500, suffix: '+', label: 'Surgeries and medical cases' },
      { value: 12, label: 'States covered' },
      { value: 85, suffix: '%', label: 'Treatments reported successful' },
    ],
    activities: [
      { title: 'Treatment funding', body: 'Surgery and treatment costs for children with cancer, heart conditions and HIV/AIDS.' },
      { title: 'Eye care and eye donation', body: 'Screening, treatment and awareness for eye health.' },
      { title: 'Sickle cell and bone care', body: 'Specialist care for conditions that are often under-served in rural areas.' },
      { title: 'Camps and check-ups', body: 'Blood donation camps, diabetes and blood pressure check-ups, gastro and hepatitis care.' },
      { title: 'Health counselling', body: 'Hygiene promotion and a whole-family approach that educates mothers as well as children.' },
    ],
    giving: [
      {
        title: 'Quick amounts',
        options: [
          { label: 'Quick gift', amount: 500 },
          { label: 'Quick gift', amount: 1000 },
        ],
      },
    ],
    faqs: [
      {
        q: 'How are emergency cases shown?',
        a: 'Each case has a funding goal, a headline, a short appeal and a Donate button, with a full case page behind it. At the time of review, two cases were active with goals of ₹4,00,000 and ₹2,00,000.',
      },
      {
        q: 'How can a family ask for help?',
        a: 'The original page lists only the helpline and email address. The application process is not described there.',
      },
    ],
    related: ['sulochana', 'wash'],
  },
  {
    slug: 'sulochana',
    title: 'Sulochana cataract initiative',
    group: 'Health',
    icon: 'eye',
    tone: 'sun',
    tagline: 'Clearing vision, changing lives.',
    summary:
      'Sulochana provides cataract surgery and eye care to older people, mainly in rural areas, together with health camps, awareness work and vaccination support.',
    stats: [
      { value: 1627, suffix: '+', label: 'Rural health camps' },
      { value: 306, label: 'Cataract surgeries' },
      { value: 200, label: 'Early cataracts detected' },
      { value: 150, label: 'Awareness camps' },
    ],
    activities: [
      { title: 'Affordable surgery', body: 'Restoring eyesight for seniors who could not otherwise pay for it.' },
      { title: 'Early detection', body: 'Camps that find cataracts early and promote preventive eye care.' },
      { title: 'Fewer falls and accidents', body: 'Better sight reduces accidents and dependence in older age. The programme reports a 40% reduction in vision-related accidents.' },
      { title: 'Local health workers', body: 'Training that strengthens village health workers. The programme reports 60% of them empowered, which also lifted vaccination.' },
    ],
    giving: [
      {
        title: 'Ways to help',
        options: [
          { label: 'Restore eyesight for 5 people', amount: 27500 },
          { label: 'Cataract surgery for 2 people', amount: 11000 },
          { label: 'Spectacles for 25 people', amount: 12475 },
          { label: 'Spectacles for 45 people', amount: 22455 },
          { label: 'Early-detection camp for 100 people', amount: 47800 },
        ],
      },
    ],
    faqs: [
      {
        q: 'What does the programme aim for next?',
        a: 'More than 1,200 people regaining vision and more than 5,000 rural residents receiving eye check-ups.',
      },
    ],
    related: ['medical-support', 'wash'],
  },
  {
    slug: 'village-development',
    title: 'Village development',
    group: 'Livelihood and community',
    icon: 'sprout',
    tone: 'leaf',
    tagline: 'Skills and tools that let women earn a living close to home.',
    summary:
      'The programme\'s main focus is women\'s employability. Free workshops teach practical skills, and tools such as sewing machines help women start small businesses of their own.',
    stats: [
      { value: 3000, suffix: '+', label: 'Women through Kokan Silai school' },
      { value: 1000, suffix: '+', label: 'Beauty parlour course graduates' },
      { value: 200, suffix: '+', label: 'Nursing assistant graduates' },
      { value: 90, suffix: '+', label: 'Women who started bakeries' },
      { value: 78, suffix: '+', label: 'Sewing machines provided' },
      { value: 60, suffix: '+', label: 'Women self-employed in health and hygiene products' },
    ],
    activities: [
      { title: 'Livelihood skills', body: 'Tailoring, beauty parlour, fashion design, nursing education, herbal soap making and baking.' },
      { title: 'Personal development', body: 'English speaking, personality development, yoga and meditation, and organic farming.' },
      { title: 'Free workshops', body: 'Short workshops in fashion design, tailoring, baking, home decor, soap making and paper dishes.' },
      { title: 'Women who teach others', body: 'More than 50 women trained others in these skills, and over 35 pursue careers in fashion.' },
    ],
    related: ['wash', 'education'],
  },
  {
    slug: 'wash',
    title: 'Water, sanitation and hygiene',
    group: 'Livelihood and community',
    icon: 'droplets',
    tone: 'indigo',
    tagline: 'Safe water, clean toilets and menstrual dignity in rural schools and clinics.',
    summary:
      'WaSH works with rural schools and health facilities to improve water, sanitation and handwashing, and to set up infection-prevention routines. It also covers menstrual health and rural health camps.',
    stats: [{ value: 25521, label: 'Girls and women given sanitary napkins', note: 'Through the PADyatra campaign' }],
    activities: [
      { title: 'Water and sanitation in schools', body: 'Safe drinking water, usable toilets and handwashing facilities in rural schools and health centres.' },
      { title: 'Menstrual health', body: 'Sanitary napkins and hygiene education for girls and women in rural and tribal areas.' },
      { title: 'Solar power for schools', body: 'Solar panels that fix power cuts affecting digital learning and attendance.' },
      { title: 'Annual rural health camps', body: 'Free check-ups, oral cancer and dental screening, medication and health education.' },
      { title: 'COVID-19 response', body: 'Free oxygen concentrators for people who could not afford them in Sindhudurg, Maharashtra.' },
    ],
    related: ['village-development', 'medical-support'],
  },
  {
    slug: 'feed-one-feed-all',
    title: 'Feed One Feed All',
    group: 'Humanitarian',
    icon: 'utensils',
    tone: 'saffron',
    tagline: 'Nourishing meals for people who go hungry in our cities.',
    summary:
      'Announced on 21 October 2023, the campaign serves meals to underprivileged people in cities. The Pune project also works to improve recipients\' health, schooling and livelihoods.',
    stats: [{ value: 37463, label: 'People fed to date' }, { value: 40, prefix: '₹', label: 'Approximate cost of one meal', note: 'Worked out from the published tiers' }],
    activities: [
      { title: 'City meal service', body: 'Hot, nutritious meals for people who cannot afford regular food.' },
      { title: 'Beyond a single meal', body: 'The Pune project links recipients to health, education and livelihood support.' },
    ],
    giving: [
      {
        title: 'Meal tiers',
        options: [
          { label: '150 meals', amount: 6000 },
          { label: '250 meals', amount: 10000 },
          { label: '350 meals', amount: 14000 },
          { label: '400 meals', amount: 16000 },
        ],
      },
      {
        title: 'Quick amounts',
        options: [
          { label: 'Quick gift', amount: 500 },
          { label: 'Quick gift', amount: 800 },
          { label: 'Quick gift', amount: 1000 },
          { label: 'Quick gift', amount: 1200 },
        ],
      },
    ],
    related: ['relief', 'orphanage-support'],
  },
  {
    slug: 'relief',
    title: 'Disaster and flood relief',
    group: 'Humanitarian',
    icon: 'life-buoy',
    tone: 'rose',
    tagline: 'First response when floods and landslides leave families with nothing.',
    summary:
      'The organisation responds to floods with essentials first, then helps families resettle. Relief work has covered the Kerala floods of 2018 and monsoon floods across Maharashtra, with pages for Punjab, Mandi in Himachal Pradesh and Wayanad.',
    stats: [],
    activities: [
      { title: 'Maharashtra monsoon floods', body: 'Response in hard-hit areas including Chiplun, Ratnagiri, Kolhapur, Khed, Lonavala, Pune, Palghar and Satara.' },
      { title: 'Kerala floods and landslides', body: 'Food, hygiene kits, water containers, utensils, bedding, clothes and water purifiers for relief camps in Idukki and Wayanad.' },
      { title: 'What families receive', body: 'Blankets, water, soap, sanitiser, towels, toothbrushes, sanitary pads, animal feed and bleaching powder.' },
      { title: 'Recovery', body: 'Shelter repairs, well cleaning, community centre repairs, training and awareness so villages are better prepared next time.' },
    ],
    needsContent:
      'The original page reports no totals or outcomes, and its achievements section contains only images. Add figures here before publishing.',
    related: ['feed-one-feed-all', 'medical-support'],
  },
  {
    slug: 'access-to-justice',
    title: 'Access to justice',
    group: 'Humanitarian',
    icon: 'scale',
    tone: 'indigo',
    tagline: 'Legal help and awareness for children and families.',
    summary:
      'This programme appears in the organisation\'s menus and campaign lists, but its own page does not yet describe what it does.',
    stats: [],
    activities: [],
    needsContent:
      'The original programme page has a name and image but no text, no figures and no locations. This page is a placeholder until the team supplies the content.',
    related: ['orphanage-support', 'saksham'],
  },
];

export const PROGRAM_GROUPS: ProgramGroup[] = [
  'Education',
  'Child care',
  'Health',
  'Livelihood and community',
  'Humanitarian',
];

export const programBySlug = (slug: string) => PROGRAMS.find((p) => p.slug === slug);

export const programsByGroup = (group: ProgramGroup) => PROGRAMS.filter((p) => p.group === group);
