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

  return <IntentLandingPage page={page} />;
}
