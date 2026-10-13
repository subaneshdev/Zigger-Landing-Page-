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

// Accurately resolved last modified dates reflecting actual significant content releases
function getAccurateLastModified(path) {
  // 1. Newly launched / significantly updated employer routes
  if (path.startsWith('/hire-')) {
    if (path.includes('pamphlet') || path.includes('delivery') || path.includes('survey')) {
      return new Date('2026-10-13T21:15:00+05:30');
    }
    return new Date('2026-10-13T20:30:00+05:30');
  }

  // 2. Core commercial & product pages
  if (path === '/') return new Date('2026-10-13T21:00:00+05:30');
  if (path === '/hire') return new Date('2026-10-13T21:15:00+05:30');
  if (path === '/work') return new Date('2026-09-20T10:00:00+05:30');
  if (path === '/gig-jobs' || path === '/gig-jobs-app') return new Date('2026-09-13T19:56:00+05:30');
  if (path === '/team') return new Date('2026-09-23T02:10:00+05:30');
  if (path === '/partner' || path === '/influencer') return new Date('2026-09-07T14:00:00+05:30');
  if (path === '/privacy' || path === '/terms') return new Date('2026-08-25T12:00:00+05:30');
  if (path === '/blog') return new Date('2026-09-23T01:30:00+05:30');

  // 3. City job hubs (/jobs-in-{city})
  if (path.startsWith('/jobs-in-')) {
    return new Date('2026-09-14T13:00:00+05:30');
  }

  // 4. Category & city intent routes by service family
  if (path.includes('catering-jobs') || path.includes('catering-boys') || path.includes('catering-workers')) {
    return new Date('2026-09-02T10:00:00+05:30');
  }
  if (path.includes('event-staff')) {
    return new Date('2026-09-04T11:00:00+05:30');
  }
  if (path.includes('waiter-jobs')) {
    return new Date('2026-09-05T12:00:00+05:30');
  }
  if (path.includes('driver-jobs')) {
    return new Date('2026-09-06T14:00:00+05:30');
  }
  if (path.includes('delivery-jobs')) {
    return new Date('2026-09-08T15:00:00+05:30');
  }
  if (path.includes('warehouse-workers')) {
    return new Date('2026-09-09T16:00:00+05:30');
  }
  if (path.includes('construction-workers')) {
    return new Date('2026-09-10T09:00:00+05:30');
  }
  if (path.includes('security-guards')) {
    return new Date('2026-09-10T14:00:00+05:30');
  }
  if (path.includes('cleaning-staff')) {
    return new Date('2026-09-11T10:00:00+05:30');
  }
  if (path.includes('hotel-jobs')) {
    return new Date('2026-09-11T16:00:00+05:30');
  }
  if (path.includes('retail-promoters')) {
    return new Date('2026-09-12T12:00:00+05:30');
  }
  if (path.includes('student-part-time-jobs')) {
    return new Date('2026-09-13T10:00:00+05:30');
  }

  // Default fallback
  return new Date('2026-09-15T12:00:00+05:30');
}

export default async function sitemap() {
  const sitemapMap = new Map();

  const addEntry = (url, lastModified, changeFrequency, priority) => {
    if (!url) return;
    const cleanUrl = url.trim();
    if (!sitemapMap.has(cleanUrl)) {
      sitemapMap.set(cleanUrl, {
        url: cleanUrl,
        lastModified: lastModified || new Date('2026-09-15T12:00:00+05:30'),
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
      getAccurateLastModified(route.path),
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
      getAccurateLastModified(record.proposedCanonicalUrl),
      'weekly',
      record.launchPriority === 'P0' ? 0.9 : 0.8
    );
  }

  // 3. Blog posts with accurate modification timestamps
  for (const post of BLOG_POSTS) {
    const rawDate = post.schema?.['@graph']?.[0]?.dateModified || post.schema?.dateModified || post.date;
    const postDate = rawDate ? new Date(rawDate) : new Date('2026-09-01T10:00:00+05:30');
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
