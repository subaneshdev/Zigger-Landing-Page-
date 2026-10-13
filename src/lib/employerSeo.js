import { SITE_URL } from '../constants/seo';

export function generateEmployerMetadata(config) {
  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `${SITE_URL}/${config.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${config.slug}`,
      title: config.title,
      description: config.description,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [`${SITE_URL}/twitter-image.jpg`],
    },
  };
}

export function generateEmployerJsonLd(config) {
  const breadcrumb = {
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
        name: 'Hire Staff',
        item: `${SITE_URL}/hire`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.h1,
        item: `${SITE_URL}/${config.slug}`,
      },
    ],
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: config.serviceName,
    provider: {
      '@type': 'Organization',
      name: 'Ziggers',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      sameAs: [
        'https://play.google.com/store/apps/details?id=com.ziggers.ziggers',
        'https://www.linkedin.com/company/ziggers',
        'https://www.instagram.com/ziggers.in?igsh=MXIwcXdqcWs0Z3gx',
        'https://www.facebook.com/share/1MVoXCTfP7/',
        'https://www.crunchbase.com/organization/ziggers',
      ],
    },
    areaServed: {
      '@type': 'City',
      name: config.locationName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Tamil Nadu',
      },
    },
    description: config.description,
    termsOfService: `${SITE_URL}/terms`,
  };

  const faqs = config.faqs && config.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null;

  return [breadcrumb, service, faqs].filter(Boolean);
}
