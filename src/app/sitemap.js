import { SITEMAP_ROUTES, SITE_URL } from '../constants/seo';
import { BLOG_POSTS } from '../data/blogPosts';
import { getIndexableCoverageRecords } from '../data/coverageMatrix';
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

// Truthful last modified date baseline for site audit & content updates
const AUDIT_UPDATE_DATE = new Date('2026-10-14T00:00:00.000Z');

export default async function sitemap() {
  const sitemapMap = new Map();

  const addEntry = (url, lastModified, changeFrequency, priority) => {
    if (!url) return;
    const cleanUrl = url.trim();
    if (!sitemapMap.has(cleanUrl)) {
      sitemapMap.set(cleanUrl, {
        url: cleanUrl,
        lastModified: lastModified || AUDIT_UPDATE_DATE,
        changeFrequency: changeFrequency || 'weekly',
        priority: Number(priority) || 0.7,
      });
    }
  };

  // 1. Core and Intent routes from canonical registry
  for (const route of SITEMAP_ROUTES) {
    const fullUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
    addEntry(
      fullUrl,
      AUDIT_UPDATE_DATE,
      route.changefreq || 'weekly',
      parseFloat(route.priority) || 0.8
    );
  }

  // 2. Confirmed indexable employer coverage records
  const indexableCoverage = getIndexableCoverageRecords();
  for (const record of indexableCoverage) {
    const fullUrl = `${SITE_URL}${record.proposedCanonicalUrl}`;
    addEntry(
      fullUrl,
      AUDIT_UPDATE_DATE,
      'weekly',
      record.launchPriority === 'P0' ? 0.9 : 0.8
    );
  }

  // 3. Blog posts with accurate modification timestamps
  for (const post of BLOG_POSTS) {
    const dateModified = post.schema?.['@graph']?.[0]?.dateModified;
    const postDate = dateModified ? new Date(dateModified) : (post.date ? new Date(post.date) : AUDIT_UPDATE_DATE);
    const fullUrl = `${SITE_URL}/blog/${post.id}`;
    addEntry(fullUrl, postDate, 'weekly', 0.8);
  }

  // 4. Genuine dynamic open jobs
  try {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('id, created_at, status, end_time')
      .in('status', OPEN_TASK_STATUSES);

    const now = Date.now();
    for (const task of tasks || []) {
      // Exclude expired tasks
      if (task.end_time) {
        const endTime = new Date(task.end_time).getTime();
        if (!isNaN(endTime) && endTime < now) {
          continue;
        }
      }

      const taskDate = task.created_at ? new Date(task.created_at) : AUDIT_UPDATE_DATE;
      const fullUrl = `${SITE_URL}/jobs/${task.id}`;
      addEntry(fullUrl, taskDate, 'daily', 0.8);
    }
  } catch (error) {
    console.error('Error generating dynamic job sitemap:', error);
  }

  // Return strictly deduplicated array of canonical entries
  return Array.from(sitemapMap.values());
}
