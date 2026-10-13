import React from 'react';
import { notFound } from 'next/navigation';
import { ALL_INTENT_PAGES } from '../../constants/seoPages';
import IntentLandingPage from '../../components/pages/IntentLandingPage';
import EmployerLandingTemplate from '../../components/pages/EmployerLandingTemplate';
import { COVERAGE_BY_SLUG, COVERAGE_MATRIX } from '../../data/coverageMatrix';
import { getEmployerPageData } from '../../data/employerPagesData';
import { generateEmployerJsonLd } from '../../lib/employerSeo';
import { SITE_URL } from '../../constants/seo';

// Dedicated route directories that Next.js already handles explicitly
const DEDICATED_ROUTES = new Set([
  'hire-catering-staff-chennai',
  'hire-event-staff-chennai',
  'hire-brand-promoters-chennai',
  'hire-acting-drivers-chennai',
  'hire-odc-staff-chennai',
  'hire-pamphlet-distributors-chennai',
  'hire-delivery-staff-chennai',
  'hire-survey-staff-chennai',
  'hire-catering-staff-coimbatore',
  'hire-catering-staff-madurai',
  'hire-event-staff-coimbatore',
  'hire-event-staff-madurai',
  'hire-brand-promoters-coimbatore',
  'hire-brand-promoters-madurai',
]);

export async function generateStaticParams() {
  const intentSlugs = ALL_INTENT_PAGES
    .filter((page) => !page.path.startsWith('/jobs-in-'))
    .map((page) => page.path.replace(/^\//, ''));

  const coverageSlugs = COVERAGE_MATRIX
    .map((record) => record.slug)
    .filter((slug) => !DEDICATED_ROUTES.has(slug));

  const allSlugs = Array.from(new Set([...intentSlugs, ...coverageSlugs]));

  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = `/${slug}`;

  // 1. Check Coverage Matrix
  const coverageRecord = COVERAGE_BY_SLUG[slug];
  if (coverageRecord) {
    const isIndexable = coverageRecord.isIndexable;
    const title = `Hire ${coverageRecord.serviceName} in ${coverageRecord.locationName} | Ziggers`;
    const description = `Hire verified ${coverageRecord.serviceName.toLowerCase()} in ${coverageRecord.locationName}. Aadhaar KYC-checked temporary workers with transparent shift pricing.`;

    if (!isIndexable) {
      return {
        title: `[Preview] Hire ${coverageRecord.serviceName} in ${coverageRecord.locationName} | Ziggers`,
        description,
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}${path}`,
      },
      openGraph: {
        type: 'website',
        url: `${SITE_URL}${path}`,
        title,
        description,
      },
    };
  }

  // 2. Check Intent Pages
  const page = ALL_INTENT_PAGES.find((p) => p.path === path);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
  };
}

export default async function DynamicSlugRoute({ params }) {
  const { slug } = await params;
  const path = `/${slug}`;

  // 1. Check Coverage Matrix
  const coverageRecord = COVERAGE_BY_SLUG[slug];
  if (coverageRecord) {
    const dedicatedConfig = getEmployerPageData(slug);
    const config = dedicatedConfig || {
      slug: coverageRecord.slug,
      serviceName: coverageRecord.serviceName,
      locationName: coverageRecord.locationName,
      eyebrow: `Verified ${coverageRecord.serviceName} in ${coverageRecord.locationName}`,
      h1: `Hire ${coverageRecord.serviceName} in ${coverageRecord.locationName}`,
      h1Accent: coverageRecord.locationName,
      title: `Hire ${coverageRecord.serviceName} in ${coverageRecord.locationName} | Ziggers`,
      description: `Hire verified ${coverageRecord.serviceName.toLowerCase()} in ${coverageRecord.locationName}.`,
      heroDescription: `Connect with verified ${coverageRecord.serviceName.toLowerCase()} across ${coverageRecord.locationName}. Available for on-demand shifts, event operations, and temporary staffing.`,
      workerLink: coverageRecord.existingRelatedUrl || '/work',
      workerLinkLabel: `Find ${coverageRecord.serviceName} Shifts in ${coverageRecord.locationName}`,
      targetAudience: [
        { title: 'Commercial Businesses', desc: `Reliable temporary staffing for retail, event, and enterprise operations in ${coverageRecord.locationName}.` },
        { title: 'Event & Banquet Planners', desc: `On-demand staff to support peak shifts and venue requirements in ${coverageRecord.locationName}.` },
      ],
      roles: (coverageRecord.roles || []).map((roleName) => ({
        name: roleName,
        badge: 'Verified',
        duties: `Standard operational responsibilities for ${roleName.toLowerCase()} assignments.`,
        dressCode: 'Clean professional attire as required by client venue.',
      })),
      leadTime: coverageRecord.leadTime,
      pricingFactors: [coverageRecord.pricingFactors],
      coverageZones: coverageRecord.coverageZones || [],
      faqs: [
        {
          q: `How do I book ${coverageRecord.serviceName.toLowerCase()} in ${coverageRecord.locationName}?`,
          a: `Submit an enquiry through this page or call our operations desk at +91 94990 08993 to check roster availability.`,
        },
        {
          q: `Are all personnel identity-verified?`,
          a: `Yes, all workers undergo Aadhaar KYC verification before undertaking active client shifts.`,
        },
      ],
      isDraft: !coverageRecord.isIndexable,
    };

    const jsonLd = generateEmployerJsonLd(config);

    return (
      <>
        {coverageRecord.isIndexable && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <EmployerLandingTemplate config={config} />
      </>
    );
  }

  // 2. Check Intent Category Page
  const page = ALL_INTENT_PAGES.find((p) => p.path === path);
  if (!page) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs ? page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })) : [],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: `${SITE_URL}${page.path}`,
      },
    ],
  };

  const areaServedName = page.h1.includes('in ') ? page.h1.split('in ').pop().split('|')[0].trim() : 'India';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: page.eyebrow,
    provider: {
      '@type': 'Organization',
      name: 'Ziggers',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: areaServedName,
    },
    description: page.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <IntentLandingPage page={page} />
    </>
  );
}
