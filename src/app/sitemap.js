import { SITEMAP_ROUTES, SITE_URL } from '../constants/seo';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEO_CITIES } from '../constants/seoPages';
import { supabase } from '../lib/supabase';

const OPEN_TASK_STATUSES = [
  'open',
  'OPEN',
  'posted',
  'POSTED',
  'published',
  'PUBLISHED',
  'active',
  'ACTIVE',
];

export default async function sitemap() {
  // ─── Static core routes ──────────────────────────────────────────────────
  const routes = SITEMAP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq || 'weekly',
    priority: parseFloat(route.priority) || 0.5,
  }));

  // ─── Blog post routes ─────────────────────────────────────────────────────
  const blogRoutes = BLOG_POSTS.map((post) => {
    const dateModified = post.schema?.['@graph']?.[0]?.dateModified;
    return {
      url: `${SITE_URL}/blog/${post.id}`,
      lastModified: dateModified ? new Date(dateModified) : new Date(post.date || new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  // ─── City hub pages: /jobs-in-{city} ─────────────────────────────────────
  // These are separate from intent category pages and need explicit entries
  const cityHubRoutes = SEO_CITIES.map((city) => ({
    url: `${SITE_URL}/jobs-in-${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // ─── Dynamic live job listing routes ─────────────────────────────────────
  let taskRoutes = [];
  try {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('id, created_at')
      .in('status', OPEN_TASK_STATUSES);

    if (tasks && tasks.length > 0) {
      taskRoutes = tasks.map((task) => ({
        url: `${SITE_URL}/jobs/${task.id}`,
        lastModified: task.created_at ? new Date(task.created_at) : new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error generating dynamic job sitemap:', error);
  }

  return [...routes, ...blogRoutes, ...cityHubRoutes, ...taskRoutes];
}

