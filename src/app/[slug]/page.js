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

  return <IntentLandingPage page={page} />;
}
