import {
  buildIntentPrerenderEntries,
  buildIntentSitemapRoutes,
} from './seoPages.js';

export const SITE_NAME = 'Ziggers';

export const SITE_URL = 'https://www.ziggers.in';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SITE_DESCRIPTION =
  'Hire catering staff, waiters, drivers, delivery boys, warehouse workers, and temporary staff on demand — or find part-time jobs, daily wage jobs, and weekend jobs near you. Ziggers is India\'s verified staffing app.';

export const SITE_TITLE =
  'Ziggers | Hire Temporary Staff & Find Part-time Jobs in India';

export const META_KEYWORDS = [
  'Hire Catering Staff',
  'Catering Workers',
  'Catering Helpers',
  'Event Staff',
  'Event Volunteers',
  'Wedding Staff',
  'Waiters for Hire',
  'Hire Waiters',
  'Kitchen Helpers',
  'Housekeeping Staff',
  'Cleaning Staff',
  'Delivery Staff',
  'Warehouse Workers',
  'Construction Workers',
  'Security Guards',
  'Brand Promoters',
  'Hospitality Staff',
  'Temporary Workers',
  'Part-time Jobs',
  'Daily Wage Jobs',
  'Weekend Jobs',
  'Student Jobs',
  'One-day Jobs',
  'Shift Jobs',
  'Flexible Jobs',
  'Temporary Jobs',
  'Near Me Jobs',
  'Catering Jobs',
  'Waiter Jobs',
  'Driver Jobs',
  'Delivery Jobs',
  'Hotel Jobs',
  'Restaurant Jobs',
  'Warehouse Jobs',
  'Construction Jobs',
  'Security Jobs',
  'Promoter Jobs',
  'Helper Jobs',
  'Catering Jobs in Chennai',
  'Part-time Jobs in Bangalore',
  'Event Staff in Hyderabad',
  'Hire Waiters in Chennai',
  'Temporary Workers in Coimbatore',
  'Delivery Jobs in Mumbai',
  'Student Jobs in Tamil Nadu',
  'Hire Catering Staff Near Me',
  'Need Waiters for Wedding',
  'Last-minute Event Staff',
  'Instant Staff Hiring',
  'Daily Wage Workers Near Me',
  'Gig Jobs Near Me',
  'On-demand Staffing',
  'Verified Workers',
  'Staffing App India',
].join(', ');

export const PAGE_SEO = {
  home: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  work: {
    title: 'Part-time Jobs Near Me | Daily Wage, Weekend & Student Jobs | Ziggers',
    description:
      'Find part-time jobs, student jobs, weekend jobs, daily wage jobs, shift jobs, and temporary jobs near you. Catering jobs, waiter jobs, delivery jobs, warehouse work, and more with same-day pay.',
  },
  hire: {
    title: 'Hire Temporary Workers & Staff On Demand | Catering, Events, Delivery | Ziggers',
    description:
      'Need catering staff, waiters, delivery boys, warehouse helpers, or event volunteers? Hire verified temporary workers in minutes — last-minute staffing with secure payments.',
  },
  blog: {
    title: 'Gig Jobs & Staffing Insights | Ziggers Blog',
    description:
      'Guides on event staffing, temporary staffing, blue collar hiring, and flexible jobs in Chennai and across India — from the workforce marketplace built for on-demand staffing.',
  },
  actingDrivers: {
    title: 'Driver Jobs in Chennai | Hire Gig Workers | Ziggers',
    description:
      'Hire verified driver jobs and acting drivers in Chennai instantly. AI-powered gig marketplace with live tracking, verified workers, and secure payments for temporary staffing.',
  },
  cateringStaff: {
    title: 'Hire Catering Staff & Event Staffing in Chennai | Ziggers',
    description:
      'Hire catering staff and hospitality staffing for weddings and events in Chennai. Last-minute hiring of verified temporary staff through India\'s on-demand workforce marketplace.',
  },
  brandPromoters: {
    title: 'Hire Promotional Staff & Event Staffing in Chennai | Ziggers',
    description:
      'Hire promotional staff for mall activations and event hiring in Chennai. Find verified gig workers for brand activations with live workforce management on Ziggers.',
  },
  privacy: {
    title: 'Privacy Policy | Ziggers Gig Marketplace',
    description:
      'How Ziggers protects gig workers and employers on our temporary staffing platform and workforce marketplace in India.',
  },
  terms: {
    title: 'Terms of Service | Ziggers Staffing App',
    description:
      'Legal terms for booking temporary staff, gig jobs, and on-demand staffing through the Ziggers hiring marketplace.',
  },
};

/** Static routes included in sitemap.xml (blog posts added separately at build time) */
export const SITEMAP_ROUTES = [
  { path: '/', pageKey: 'home', changefreq: 'daily', priority: '1.0' },
  { path: '/work', pageKey: 'work', changefreq: 'daily', priority: '0.9' },
  { path: '/hire', pageKey: 'hire', changefreq: 'daily', priority: '0.9' },
  { path: '/hire-acting-drivers-chennai', pageKey: 'actingDrivers', changefreq: 'weekly', priority: '0.8' },
  { path: '/hire-catering-staff-chennai', pageKey: 'cateringStaff', changefreq: 'weekly', priority: '0.8' },
  { path: '/hire-brand-promoters-chennai', pageKey: 'brandPromoters', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', pageKey: 'blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/privacy', pageKey: 'privacy', changefreq: 'monthly', priority: '0.3' },
  { path: '/terms', pageKey: 'terms', changefreq: 'monthly', priority: '0.3' },
  ...buildIntentSitemapRoutes(),
];

/** Landing pages pre-rendered for crawlers at build time */
export const PRERENDER_LANDING_PAGES = [
  {
    path: '/work',
    pageKey: 'work',
    eyebrow: 'Find gig jobs near me',
    heading: 'Browse Part-time & Daily Jobs',
    intro:
      'Nearby jobs for students, weekend jobs, shift jobs, and hourly jobs. Flexible work with instant apply and same-day UPI payouts.',
  },
  {
    path: '/hire',
    pageKey: 'hire',
    eyebrow: 'Hire gig workers',
    heading: 'Staff on Demand in Minutes',
    intro:
      'On-demand staffing for catering staff, driver jobs, event staffing, and blue collar hiring — verified temporary staff near your location.',
  },
  {
    path: '/hire-acting-drivers-chennai',
    pageKey: 'actingDrivers',
    eyebrow: 'Chennai driver jobs',
    heading: 'Hire Acting Drivers in Chennai',
    intro:
      'Need a reliable driver for a few hours or a full day? Hire verified gig workers for driver jobs in Chennai — instant hiring with live tracking and secure payments.',
  },
  {
    path: '/hire-catering-staff-chennai',
    pageKey: 'cateringStaff',
    eyebrow: 'Event staffing Chennai',
    heading: 'Hire Catering Staff in Chennai',
    intro:
      'Hosting a wedding, corporate event, or private party? Hire catering staff and hospitality staffing in Chennai instantly — last-minute hiring with verified temporary staff.',
  },
  {
    path: '/hire-brand-promoters-chennai',
    pageKey: 'brandPromoters',
    eyebrow: 'Promotional staff Chennai',
    heading: 'Hire Brand Promoters in Chennai',
    intro:
      'Planning a mall activation, roadshow, or event hiring? Hire promotional staff and verified gig workers in Chennai for brand activations with live workforce management.',
  },
  ...buildIntentPrerenderEntries(),
];

/** Maps pathname → PAGE_SEO key for client-side route SEO */
export const ROUTE_SEO = {
  '/': 'home',
  '/work': 'work',
  '/hire': 'hire',
  '/hire-acting-drivers-chennai': 'actingDrivers',
  '/hire-catering-staff-chennai': 'cateringStaff',
  '/hire-brand-promoters-chennai': 'brandPromoters',
  '/blog': 'blog',
  '/privacy': 'privacy',
  '/terms': 'terms',
};

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Android',
  description: SITE_DESCRIPTION,
  url: 'https://www.ziggers.in/',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '100',
  },
  keywords: META_KEYWORDS,
};
