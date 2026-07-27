import { BLOG_POSTS } from '../data/blogPosts';
import {
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  ROUTE_SEO,
  SITE_URL,
} from '../constants/seo';
import { getSeoPageByPath } from '../constants/seoPages';

function pageUrl(path = '/') {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function setMeta(attr, name, content) {
  if (!content) return;

  const selector = attr === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let el = document.querySelector(selector);

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

function setCanonical(path = '/') {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', pageUrl(path));
}

export function setPageSEO({
  title,
  description,
  path = '/',
  ogType = 'website',
  image = DEFAULT_OG_IMAGE,
}) {
  const url = pageUrl(path);

  if (title) {
    document.title = title;
  }

  setMeta('name', 'description', description);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:url', url);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
  setCanonical(path);
}

export function applyRouteSEO(pathname) {
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);

  if (blogMatch) {
    const post = BLOG_POSTS.find((entry) => entry.id === blogMatch[1]);

    if (post) {
      setPageSEO({
        title: `${post.title} | Ziggers`,
        description: post.seoDescription,
        path: pathname,
        ogType: 'article',
        image: post.image,
      });
      return;
    }
  }

  const intentPage = getSeoPageByPath(pathname);

  if (intentPage) {
    setPageSEO({
      title: intentPage.title,
      description: intentPage.description,
      path: pathname,
    });
    return;
  }

  const pageKey = ROUTE_SEO[pathname];

  if (pageKey && PAGE_SEO[pageKey]) {
    setPageSEO({
      ...PAGE_SEO[pageKey],
      path: pathname,
      ogType: pathname.startsWith('/blog') ? 'article' : 'website',
    });
  }
}

export function usePageSEO(pageKey) {
  const seo = PAGE_SEO[pageKey];

  if (seo) {
    setPageSEO(seo);
  }
}
