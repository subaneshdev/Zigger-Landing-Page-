import { SITEMAP_ROUTES, SITE_URL } from '../constants/seo';
import { BLOG_POSTS } from '../data/blogPosts';

export default function sitemap() {
  const routes = SITEMAP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq || 'weekly',
    priority: parseFloat(route.priority) || 0.5,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.id}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
