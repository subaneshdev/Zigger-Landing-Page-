import { SEO_CITIES, buildCityHubPage } from '../../constants/seoPages';
import IntentLandingPage from '../../components/pages/IntentLandingPage';

export async function generateStaticParams() {
  return SEO_CITIES.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityObj = SEO_CITIES.find((c) => c.slug === city);
  if (!cityObj) return {};

  const page = buildCityHubPage(cityObj);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/jobs-in-${city}`,
    },
  };
}

export default async function CityHubRoute({ params }) {
  const { city } = await params;
  const cityObj = SEO_CITIES.find((c) => c.slug === city);
  if (!cityObj) return null;

  const page = buildCityHubPage(cityObj);

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
        item: 'https://www.ziggers.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: `https://www.ziggers.in${page.path}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: page.eyebrow,
    provider: {
      '@type': 'Organization',
      name: 'Ziggers',
      url: 'https://www.ziggers.in',
    },
    areaServed: {
      '@type': 'Place',
      name: cityObj.name,
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
