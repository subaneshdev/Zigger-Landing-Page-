const SITE_NAME = 'Ziggers';

export const SEO_CITIES = [
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi NCR' },
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra' },
  { slug: 'madurai', name: 'Madurai', state: 'Tamil Nadu' },
];

export const SEO_CATEGORIES = [
  {
    slug: 'catering-jobs',
    primaryKeyword: 'Catering Workers',
    hireKeyword: 'Hire Catering Staff',
    role: 'catering workers',
    workerTerms: ['Catering Workers', 'Catering Jobs', 'Kitchen Helper Jobs', 'Waiter Jobs', 'Daily Wage Jobs'],
    employerTerms: ['Catering Workers', 'Hire Catering Staff', 'Catering Helpers', 'Kitchen Helpers', 'Restaurant Helpers'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'event-staff',
    primaryKeyword: 'Event Jobs',
    hireKeyword: 'Hire Event Staff',
    role: 'event staff',
    workerTerms: ['Event Jobs', 'Event Volunteers', 'Weekend Jobs', 'Shift Jobs', 'Temporary Jobs'],
    employerTerms: ['Event Staff', 'Event Volunteers', 'Wedding Staff', 'Temporary Staff for Events', 'Last-minute Event Staff'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'waiter-jobs',
    primaryKeyword: 'Waiter Jobs',
    hireKeyword: 'Hire Waiters',
    role: 'waiters and servers',
    workerTerms: ['Waiter Jobs', 'Server Jobs', 'Restaurant Jobs', 'Banquet Staff Jobs', 'Part-time Jobs'],
    employerTerms: ['Hire Waiters', 'Waiters for Hire', 'Servers for Events', 'Need Waiters for Wedding', 'Restaurant Staff'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'driver-jobs',
    primaryKeyword: 'Driver Jobs',
    hireKeyword: 'Hire Drivers',
    role: 'drivers',
    workerTerms: ['Driver Jobs', 'Acting Driver Jobs', 'Daily Salary Job', 'Flexible Work', 'Shift Jobs'],
    employerTerms: ['Hire Drivers', 'Acting Drivers', 'Temporary Drivers', 'Driver on Demand', 'Instant Staff Hiring'],
    workLink: '/work',
    hireLink: '/hire-acting-drivers-chennai',
  },
  {
    slug: 'delivery-jobs',
    primaryKeyword: 'Delivery Jobs',
    hireKeyword: 'Hire Delivery Staff',
    role: 'delivery staff',
    workerTerms: ['Delivery Jobs', 'Delivery Partner Jobs', 'Part-time Jobs', 'Flexible Jobs', 'Near Me Jobs'],
    employerTerms: ['Hire Delivery Staff', 'Need Delivery Boys', 'Delivery Boys Near Me', 'Temporary Delivery Workers', 'Daily Wage Workers'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'warehouse-workers',
    primaryKeyword: 'Warehouse Jobs',
    hireKeyword: 'Hire Warehouse Workers',
    role: 'warehouse workers',
    workerTerms: ['Warehouse Jobs', 'Packing Jobs', 'Loading Jobs', 'Inventory Staff Jobs', 'Daily Wage Jobs'],
    employerTerms: ['Warehouse Workers', 'Warehouse Labour', 'Packers and Movers Helpers', 'Loading and Unloading Workers', 'Inventory Staff'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'construction-workers',
    primaryKeyword: 'Construction Jobs',
    hireKeyword: 'Hire Construction Workers',
    role: 'construction workers',
    workerTerms: ['Construction Jobs', 'Helper Jobs', 'Daily Wage Jobs', 'Temporary Jobs', 'Shift Jobs'],
    employerTerms: ['Construction Workers', 'Construction Helpers', 'Electricians', 'Plumbers', 'Painters', 'Carpenters'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'security-guards',
    primaryKeyword: 'Security Guard Jobs',
    hireKeyword: 'Hire Security Guards',
    role: 'security guards',
    workerTerms: ['Security Jobs', 'Night Shift Jobs', 'Temporary Jobs', 'Daily Wage Jobs', 'Flexible Work'],
    employerTerms: ['Security Guards', 'Security Guards Near Me', 'Event Security Staff', 'Temporary Security', 'Hire Guards Today'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'cleaning-staff',
    primaryKeyword: 'Cleaning Jobs',
    hireKeyword: 'Hire Cleaning Staff',
    role: 'cleaning staff',
    workerTerms: ['Cleaning Jobs', 'Housekeeping Jobs', 'Part-time Jobs', 'One-day Jobs', 'Daily Wage Jobs'],
    employerTerms: ['Cleaning Staff', 'Housekeeping Staff', 'Cleaning Workers', 'Housekeeping Services', 'Hotel Housekeeping'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'hotel-jobs',
    primaryKeyword: 'Hotel Jobs',
    hireKeyword: 'Hire Hotel Staff',
    role: 'hotel and hospitality staff',
    workerTerms: ['Hotel Jobs', 'Hospitality Jobs', 'Banquet Staff Jobs', 'Weekend Jobs', 'Part-time Jobs'],
    employerTerms: ['Hotel Staff', 'Hospitality Staff', 'Banquet Staff', 'Hotel Staff for One Day', 'Restaurant Staff'],
    workLink: '/work',
    hireLink: '/hire',
  },
  {
    slug: 'retail-promoters',
    primaryKeyword: 'Promoter Jobs',
    hireKeyword: 'Hire Brand Promoters',
    role: 'brand promoters',
    workerTerms: ['Promoter Jobs', 'Retail Jobs', 'Weekend Jobs', 'Student Jobs', 'Part-time Jobs'],
    employerTerms: ['Brand Promoters', 'Retail Sales Promoters', 'Exhibition Staff', 'Stall Promoters', 'Promoters for Exhibition'],
    workLink: '/work',
    hireLink: '/hire-brand-promoters-chennai',
  },
  {
    slug: 'student-part-time-jobs',
    primaryKeyword: 'Student Part-time Jobs',
    hireKeyword: 'Hire Temporary Workers',
    role: 'student and part-time workers',
    workerTerms: ['Student Jobs', 'Part-time Jobs', 'Weekend Jobs', 'Flexible Jobs', 'Extra Income'],
    employerTerms: ['Temporary Workers', 'Part-time Staff', 'Student Workers', 'Weekend Staff', 'Flexible Workforce'],
    workLink: '/work',
    hireLink: '/hire',
  },
];

function buildFaqs(category, city) {
  const place = city ? city.name : 'your city';
  const nearMe = city ? `in ${city.name}` : 'near you';

  return [
    {
      q: `How do I find ${category.primaryKeyword.toLowerCase()} ${nearMe}?`,
      a: `Download the ${SITE_NAME} app or browse open roles on our work page. Filter by location to see verified ${category.role} jobs ${nearMe} with flexible shifts, daily wage pay, and same-day UPI payouts.`,
    },
    {
      q: `Can I ${category.hireKeyword.toLowerCase()} for a one-day event?`,
      a: `Yes. ${SITE_NAME} is built for temporary and last-minute staffing. Post your requirement in the app, set the date and headcount, and get matched with verified ${category.role} in ${place} within minutes.`,
    },
    {
      q: `Are workers on ${SITE_NAME} verified?`,
      a: `Every worker completes KYC verification before accepting gigs. Employers get background-checked ${category.role}, live check-ins, and secure escrow payments — so you hire with confidence.`,
    },
    {
      q: `What types of ${category.role} jobs are available?`,
      a: `Common searches include ${category.workerTerms.slice(0, 3).join(', ')}, and ${category.workerTerms[3]}. Employers typically need ${category.employerTerms.slice(0, 3).join(', ')}.`,
    },
  ];
}

function buildRelatedLinks(category, city, allPages) {
  const links = [
    { path: category.workLink, label: `Find ${category.primaryKeyword}` },
    { path: category.hireLink, label: category.hireKeyword },
  ];

  const siblings = SEO_CATEGORIES.filter((item) => item.slug !== category.slug).slice(0, 3);
  for (const sibling of siblings) {
    links.push({
      path: city ? `/${sibling.slug}-${city.slug}` : `/${sibling.slug}`,
      label: city ? `${sibling.primaryKeyword} in ${city.name}` : sibling.primaryKeyword,
    });
  }

  if (city) {
    const national = allPages.find((page) => page.path === `/${category.slug}`);
    if (national) {
      links.unshift({ path: national.path, label: `${category.primaryKeyword} in India` });
    }
  } else {
    for (const otherCity of SEO_CITIES.slice(0, 4)) {
      links.push({
        path: `/${category.slug}-${otherCity.slug}`,
        label: `${category.primaryKeyword} in ${otherCity.name}`,
      });
    }
  }

  return links.slice(0, 8);
}

export function buildCategoryPage(category, city = null) {
  const isLocal = Boolean(city);
  const path = isLocal ? `/${category.slug}-${city.slug}` : `/${category.slug}`;
  const locationIn = isLocal ? ` in ${city.name}` : '';
  const locationLabel = isLocal ? city.name : 'India';

  const title = isLocal
    ? `${category.primaryKeyword} in ${city.name} | ${category.hireKeyword} | ${SITE_NAME}`
    : `${category.primaryKeyword} & ${category.hireKeyword} | Part-time & Temporary | ${SITE_NAME}`;

  const description = isLocal
    ? `Find ${category.primaryKeyword.toLowerCase()}${locationIn} or ${category.hireKeyword.toLowerCase()} for events and businesses. Verified ${category.role}, daily wage jobs, part-time shifts, and instant staffing on ${SITE_NAME}.`
    : `Discover ${category.primaryKeyword.toLowerCase()} and ${category.hireKeyword.toLowerCase()} across India. Temporary workers, daily wage jobs, weekend shifts, and last-minute staffing — apply or hire on ${SITE_NAME}.`;

  const eyebrow = isLocal ? `${locationLabel} staffing` : 'Jobs & hiring';
  const h1 = isLocal ? `${category.primaryKeyword} in ${city.name}` : `${category.primaryKeyword} & ${category.hireKeyword}`;
  const h1Accent = isLocal ? city.name : category.hireKeyword.split(' ').slice(-2).join(' ');

  const intro = isLocal
    ? `Looking for ${category.primaryKeyword.toLowerCase()}${locationIn}? ${SITE_NAME} connects workers with ${category.employerTerms.slice(0, 2).join(' and ').toLowerCase()} needs — from daily shifts to last-minute event cover.`
    : `Whether you need ${category.primaryKeyword.toLowerCase()} or want to ${category.hireKeyword.toLowerCase()}, ${SITE_NAME} matches verified ${category.role} with businesses across India — part-time, temporary, and daily wage work.`;

  const workerHeading = `Find ${category.primaryKeyword}${locationIn}`;
  const workerBody = `Search ${category.workerTerms.join(', ').toLowerCase()}${locationIn}. Apply for flexible shifts, weekend work, and daily salary jobs with transparent pay and instant UPI transfers after each completed gig.`;

  const employerHeading = `${category.hireKeyword}${locationIn}`;
  const employerBody = `Need ${category.employerTerms.slice(0, 4).join(', ').toLowerCase()}${locationIn}? Post a requirement and get matched with verified temporary workers — ideal for weddings, restaurants, warehouses, exhibitions, and one-day operations.`;

  const faqs = buildFaqs(category, city);
  const features = [
    {
      title: 'Verified workers',
      body: `Every ${category.role.slice(0, -1) || category.role} completes KYC before their first shift — so you hire temporary staff with confidence.`,
    },
    {
      title: 'Same-day matching',
      body: `Last-minute need? ${SITE_NAME} surfaces available ${category.role}${locationIn} so you can fill shifts in minutes, not days.`,
    },
    {
      title: 'Secure payments',
      body: 'Wages sit in escrow until work is verified. Workers get paid on time; employers avoid no-shows and payment disputes.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return {
    path,
    type: isLocal ? 'local-category' : 'category',
    categorySlug: category.slug,
    citySlug: city?.slug ?? null,
    title,
    description,
    eyebrow,
    h1,
    h1Accent,
    intro,
    workerHeading,
    workerBody,
    employerHeading,
    employerBody,
    workerTerms: category.workerTerms,
    employerTerms: category.employerTerms,
    workLink: category.workLink,
    hireLink: category.hireLink,
    faqs,
    features,
    jsonLd,
    sitemap: {
      changefreq: 'weekly',
      priority: isLocal ? '0.75' : '0.85',
    },
    prerender: { eyebrow, heading: h1, intro },
  };
}

export function buildCityHubPage(city) {
  const path = `/jobs-in-${city.slug}`;
  const title = `Part-time Jobs in ${city.name} | Daily Wage & Temporary Jobs | ${SITE_NAME}`;
  const description = `Find part-time jobs, student jobs, weekend jobs, daily wage jobs, and temporary work in ${city.name}. Browse nearby shifts, flexible hours, and same-day pay on ${SITE_NAME}.`;
  const h1 = `Part-time & Temporary Jobs in ${city.name}`;
  const intro = `Searching for part-time jobs near me in ${city.name}? ${SITE_NAME} lists catering jobs, delivery jobs, event jobs, warehouse work, and more — with verified employers and secure UPI payouts.`;

  const faqs = [
    {
      q: `What part-time jobs are available in ${city.name}?`,
      a: `Popular categories include catering jobs, waiter jobs, delivery jobs, event staff, warehouse jobs, cleaning jobs, and student part-time roles across ${city.name} and nearby areas.`,
    },
    {
      q: `Are these daily wage or shift-based jobs?`,
      a: `Most gigs on ${SITE_NAME} are shift-based with daily or weekly payouts. You choose flexible jobs, one-day work, or recurring part-time shifts that fit your schedule.`,
    },
    {
      q: `How quickly can I start working in ${city.name}?`,
      a: `Download the app, complete verification, and apply to open gigs near you. Many workers start the same day on catering, event, and delivery shifts in ${city.name}.`,
    },
  ];

  const relatedLinks = SEO_CATEGORIES.slice(0, 6).map((category) => ({
    path: `/${category.slug}-${city.slug}`,
    label: `${category.primaryKeyword} in ${city.name}`,
  }));

  return {
    path,
    type: 'city-hub',
    citySlug: city.slug,
    title,
    description,
    eyebrow: `${city.name} jobs`,
    h1,
    h1Accent: city.name,
    intro,
    workerHeading: `Browse jobs in ${city.name}`,
    workerBody: intro,
    employerHeading: `Hire temporary staff in ${city.name}`,
    employerBody: `Need waiters, catering staff, delivery boys, warehouse helpers, or event volunteers in ${city.name}? Post a requirement and get verified workers matched in minutes.`,
    workLink: '/work',
    hireLink: '/hire',
    faqs,
    features: [
      { title: 'Jobs near you', body: `See open gigs across ${city.name}, ${city.state}, and surrounding neighbourhoods.` },
      { title: 'Flexible schedules', body: 'Pick weekend jobs, night shifts, one-day gigs, or recurring part-time work.' },
      { title: 'Trusted platform', body: 'Verified profiles, ratings, and escrow payments protect workers and employers.' },
    ],
    relatedLinks,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    sitemap: { changefreq: 'weekly', priority: '0.8' },
    prerender: { eyebrow: `${city.name} jobs`, heading: h1, intro },
  };
}

function buildAllPages() {
  const pages = [];

  for (const category of SEO_CATEGORIES) {
    pages.push(buildCategoryPage(category));
    for (const city of SEO_CITIES) {
      pages.push(buildCategoryPage(category, city));
    }
  }

  for (const city of SEO_CITIES) {
    pages.push(buildCityHubPage(city));
  }

  for (const page of pages) {
    const category = SEO_CATEGORIES.find((item) => item.slug === page.categorySlug);
    if (category) {
      page.relatedLinks = buildRelatedLinks(category, SEO_CITIES.find((c) => c.slug === page.citySlug), pages);
    }
  }

  return pages;
}

export const ALL_INTENT_PAGES = buildAllPages();

export const SEO_PAGES_BY_PATH = Object.fromEntries(
  ALL_INTENT_PAGES.map((page) => [page.path, page])
);

export function getSeoPageByPath(pathname) {
  return SEO_PAGES_BY_PATH[pathname] ?? null;
}

export function buildIntentSitemapRoutes() {
  return ALL_INTENT_PAGES.map((page) => ({
    path: page.path,
    changefreq: page.sitemap.changefreq,
    priority: page.sitemap.priority,
  }));
}

export function buildIntentPrerenderEntries() {
  return ALL_INTENT_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.description,
    eyebrow: page.prerender.eyebrow,
    heading: page.prerender.heading,
    intro: page.prerender.intro,
    jsonLd: page.jsonLd,
  }));
}
