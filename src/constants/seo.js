import {
  buildIntentPrerenderEntries,
  buildIntentSitemapRoutes,
} from './seoPages.js';

export const SITE_NAME = 'Ziggers';

export const SITE_URL = 'https://www.ziggers.in';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SITE_DESCRIPTION =
  "Ziggers is India's #1 gig jobs app — find gig jobs near you or hire verified gig workers instantly. Browse catering jobs, delivery jobs, event staff, warehouse workers, and daily wage shifts across India with same-day UPI payouts.";

export const SITE_TITLE =
  'Ziggers | Gig Jobs App — Find Gig Jobs & Hire Temporary Staff in India';

export const META_KEYWORDS = [
  // Head terms — primary ranking targets
  'Gig Jobs',
  'Gig Jobs App',
  'Gig Jobs Near Me',
  'Gig Jobs India',
  'Gig Worker App India',
  'Gig Economy Jobs',
  'Find Gig Jobs',
  'Gig Jobs Platform',
  'Gig Work India',
  // Hiring intent
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
  // Job-seeker intent
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
  // City combos
  'Catering Jobs in Chennai',
  'Part-time Jobs in Bangalore',
  'Event Staff in Hyderabad',
  'Hire Waiters in Chennai',
  'Temporary Workers in Coimbatore',
  'Delivery Jobs in Mumbai',
  'Student Jobs in Tamil Nadu',
  // Brand + competitor
  'Hire Catering Staff Near Me',
  'Need Waiters for Wedding',
  'Last-minute Event Staff',
  'Instant Staff Hiring',
  'Daily Wage Workers Near Me',
  'On-demand Staffing',
  'Verified Workers',
  'Staffing App India',
  'Giggers',
  'Gigger',
  'Gigger App',
  'Giggers App',
  'Giggers Jobs',
  'Giggers Chennai',
  'Giggers alternative',
  'sites like Giggers',
  'Giggers vs Ziggers',
].join(', ');

export const PAGE_SEO = {
  home: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  work: {
    title: 'Gig Jobs Near Me | Part-time, Daily Wage & Weekend Jobs | Ziggers',
    description:
      'Find gig jobs, part-time jobs, student jobs, weekend jobs, daily wage jobs, and temporary jobs near you. Catering jobs, waiter jobs, delivery jobs, warehouse work — apply and get paid same-day via UPI.',
  },
  hire: {
    title: 'Hire Gig Workers & Temporary Staff On Demand | Catering, Events, Delivery | Ziggers',
    description:
      'Need to hire gig workers fast? Find catering staff, waiters, delivery boys, warehouse helpers, or event volunteers. Hire verified gig workers in minutes — last-minute staffing with secure payments.',
  },
  gigJobs: {
    title: 'Gig Jobs in India | Find Gig Jobs Near Me | Ziggers',
    description:
      'Find gig jobs near you in India. Browse catering gig jobs, delivery gig jobs, event gig jobs, warehouse gig jobs, and daily wage shifts. Apply instantly, get paid same-day via UPI on Ziggers — India’s #1 gig jobs platform.',
  },
  gigJobsApp: {
    title: 'Gig Jobs App India | Download Ziggers — Find Gig Work & Hire Gig Staff',
    description:
      'Download Ziggers — India’s #1 gig jobs app. Find gig jobs near you or hire verified gig workers instantly. KYC-verified staff, 15-min matching, same-day UPI payouts. Available on Android & iOS.',
  },
  blog: {
    title: 'Gig Jobs Guide & Staffing Insights | Ziggers Blog',
    description:
      'Guides on gig jobs, event staffing, temporary staffing, blue collar hiring, and flexible jobs in Chennai and across India — from India’s #1 gig jobs marketplace.',
  },
  actingDrivers: {
    title: 'Driver Jobs in Chennai | Hire Gig Workers | Ziggers',
    description:
      'Hire verified driver jobs and acting drivers in Chennai instantly. AI-powered gig marketplace with live tracking, verified workers, and secure payments for temporary staffing.',
  },
  cateringStaff: {
    title: 'Catering Workers & Catering Staff in Chennai | Ziggers',
    description:
      'Hire catering workers, catering staff, and hospitality staffing for weddings and events in Chennai. Last-minute hiring of verified temporary staff through Ziggers.',
  },
  brandPromoters: {
    title: 'Hire Promotional Staff & Event Staffing in Chennai | Ziggers',
    description:
      'Hire promotional staff for mall activations and event hiring in Chennai. Find verified gig workers for brand activations with live workforce management on Ziggers.',
  },
  privacy: {
    title: 'Privacy Policy | Ziggers Gig Jobs App',
    description:
      'How Ziggers protects gig workers and employers on our gig jobs platform and workforce marketplace in India.',
  },
  terms: {
    title: 'Terms of Service | Ziggers Gig Jobs App',
    description:
      'Legal terms for booking temporary staff, gig jobs, and on-demand staffing through the Ziggers gig jobs app.',
  },
  partner: {
    title: 'Official Manpower Partner for Sports Events, Brands, & Governments | Ziggers',
    description:
      'Partner with Ziggers as your official manpower supplier. Scale BTL marketing, brand promotions, and major sports events (IPL, ISL, Pro Kabaddi) with KYC-verified temporary staff.',
  },
  influencer: {
    title: 'Become an Influencer Partner | Create UGC & Earn | Ziggers',
    description:
      'We are looking for UGC creators to help us spread the word about Ziggers. Earn ₹20 for every referred registration + ₹20 for every 5 completed gigs for recurring passive income!',
  },
};

/** Static routes included in sitemap.xml (blog posts added separately at build time) */
export const SITEMAP_ROUTES = [
  { path: '/', pageKey: 'home', changefreq: 'daily', priority: '1.0' },
  { path: '/gig-jobs', pageKey: 'gigJobs', changefreq: 'weekly', priority: '0.95' },
  { path: '/gig-jobs-app', pageKey: 'gigJobsApp', changefreq: 'weekly', priority: '0.95' },
  { path: '/work', pageKey: 'work', changefreq: 'daily', priority: '0.9' },
  { path: '/hire', pageKey: 'hire', changefreq: 'daily', priority: '0.9' },
  { path: '/partner', pageKey: 'partner', changefreq: 'weekly', priority: '0.8' },
  { path: '/influencer', pageKey: 'influencer', changefreq: 'weekly', priority: '0.8' },
  { path: '/hire-acting-drivers-chennai', pageKey: 'actingDrivers', changefreq: 'weekly', priority: '0.8' },
  { path: '/hire-catering-staff-chennai', pageKey: 'cateringStaff', changefreq: 'weekly', priority: '0.8' },
  { path: '/hire-brand-promoters-chennai', pageKey: 'brandPromoters', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', pageKey: 'blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/team', pageKey: 'team', changefreq: 'monthly', priority: '0.7' },
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
  '/partner': 'partner',
  '/hire-acting-drivers-chennai': 'actingDrivers',
  '/hire-catering-staff-chennai': 'cateringStaff',
  '/hire-brand-promoters-chennai': 'brandPromoters',
  '/blog': 'blog',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/influencer': 'influencer',
};

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Android, iOS, Web',
  description: SITE_DESCRIPTION,
  url: 'https://www.ziggers.in/',
  image: 'https://www.ziggers.in/icon.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '1250',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Subanesh C',
      },
      datePublished: '2026-08-15',
      reviewBody: 'Ziggers provides verified gig matching, same-day UPI payouts, and reliable on-demand workforce for businesses in India.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
  keywords: META_KEYWORDS,
};
