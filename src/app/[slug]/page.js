import { ALL_INTENT_PAGES } from '../../constants/seoPages';
import IntentLandingPage from '../../components/pages/IntentLandingPage';

export async function generateStaticParams() {
  // We only want paths that are not city hubs (city hubs are in /jobs-in-[city])
  // And we want to strip the leading '/'
  const slugPages = ALL_INTENT_PAGES.filter((page) => !page.path.startsWith('/jobs-in-'));
  return slugPages.map((page) => ({
    slug: page.path.replace(/^\//, ''),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = `/${slug}`;
  const page = ALL_INTENT_PAGES.find((p) => p.path === path);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
    },
  };
}

export default async function IntentPageRoute({ params }) {
  const { slug } = await params;
  const path = `/${slug}`;
  const page = ALL_INTENT_PAGES.find((p) => p.path === path);
  if (!page) return null;

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

  const areaServedName = page.h1.includes('in ') ? page.h1.split('in ').pop().split('|')[0].trim() : 'India';

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
