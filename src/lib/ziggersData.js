import { supabase } from './supabase';
import { haversineKm } from './geo';

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

function isOpenTask(status) {
  if (!status) return true;
  return OPEN_TASK_STATUSES.includes(status);
}

function matchesCategory(itemCategory, filter) {
  if (!filter || filter === 'All') return true;
  if (!itemCategory) return false;
  return itemCategory.toLowerCase().includes(filter.toLowerCase());
}

function matchesLocationSearch(locationName, searchText) {
  if (!searchText?.trim() || !locationName) return false;

  const normalizedName = locationName.toLowerCase();
  const query = searchText.trim().toLowerCase();

  if (normalizedName.includes(query)) return true;

  const tokens = query.split(/[\s,]+/).filter((token) => token.length >= 3);
  return tokens.some((token) => normalizedName.includes(token));
}

export async function fetchPlatformStats() {
  const { data, error } = await supabase
    .from('admin_analytics_snapshot')
    .select('metric_key, metric_value');

  if (error) throw error;

  const metrics = {};
  for (const row of data || []) {
    metrics[row.metric_key] = row.metric_value;
  }

  const overview = metrics.overview || {};
  const trust = metrics.trust_safety || {};
  const demographics = metrics.worker_demographics || {};

  const verifiedCount =
    (demographics.verification_statuses || []).find((v) => v.kyc_state === 'APPROVED')?.count || 0;
  const totalWorkers = overview.total_registered_workers || 0;
  const totalEmployers = overview.total_registered_employers || 0;

  return {
    totalWorkers,
    totalEmployers,
    totalPosted: overview.total_posted || 0,
    totalCompleted: overview.total_completed || 0,
    postedToday: overview.posted_today || 0,
    trustScore: trust.average_worker_trust_score || 100,
    verifiedWorkers: verifiedCount,
    totalUsers: totalWorkers + totalEmployers,
  };
}

export async function fetchNearbyTasks({
  lat,
  lng,
  category = 'All',
  searchText = '',
}) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      'id, title, description, location_name, geo_lat, geo_lng, payout, currency, start_time, end_time, estimated_hours, status, category, company_name, workers_required, payment_type, zig_type, created_at'
    )
    .order('created_at', { ascending: false });

  if (error) throw error;

  const openTasks = (data || [])
    .filter((task) => isOpenTask(task.status))
    .filter((task) => task.geo_lat != null && task.geo_lng != null)
    .filter((task) => matchesCategory(task.category || task.zig_type, category))
    .map((task) => ({
      ...task,
      distanceKm: haversineKm(lat, lng, task.geo_lat, task.geo_lng),
    }))
    .filter((task) => Number.isFinite(task.distanceKm));

  const byName = searchText.trim()
    ? openTasks.filter((task) => matchesLocationSearch(task.location_name, searchText))
    : [];

  const merged = new Map(openTasks.map((task) => [task.id, task]));
  for (const task of byName) {
    merged.set(task.id, task);
  }

  const items = Array.from(merged.values()).sort((a, b) => a.distanceKm - b.distanceKm);

  return {
    items,
    total: items.length,
  };
}

export async function fetchTaskById(id) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      'id, title, description, location_name, geo_lat, geo_lng, payout, currency, start_time, end_time, estimated_hours, status, category, company_name, workers_required, payment_type, zig_type, requirements, created_at'
    )
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

function matchesDistanceFilter(distanceKm, filterId, cityMatch = false) {
  switch (filterId) {
    case 'within-10':
      return distanceKm == null ? cityMatch : distanceKm <= 10;
    case 'within-25':
      return distanceKm == null ? cityMatch : distanceKm <= 25;
    case 'within-50':
      return distanceKm == null ? cityMatch : distanceKm <= 50;
    case 'all':
      return true;
    default:
      return distanceKm == null ? cityMatch : distanceKm <= 10;
  }
}

export async function fetchNearbyWorkers({
  lat,
  lng,
  distanceRange = 'within-10',
  category = 'All',
  locationLabel = '',
}) {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, worker_name, full_name, city, current_lat, current_lng, worker_kyc_status, zig_types, rating, trust_score, work_radius, is_suspended, account_status'
    )
    .eq('is_suspended', false)
    .neq('account_status', 'suspended');

  if (error) throw error;

  const areaToken = locationLabel.split(',')[0]?.trim().toLowerCase() || '';

  const workers = (data || []).filter((profile) => {
    const isWorker =
      profile.worker_kyc_status === 'APPROVED' ||
      profile.worker_name ||
      profile.zig_types;
    return isWorker;
  });

  const withDistance = workers
    .map((worker) => {
      const workerLat = worker.current_lat;
      const workerLng = worker.current_lng;

      if (workerLat == null || workerLng == null) {
        const cityMatch =
          areaToken &&
          worker.city &&
          worker.city.toLowerCase().includes(areaToken.toLowerCase());
        const inRange = matchesDistanceFilter(null, distanceRange, cityMatch);
        return { ...worker, distanceKm: null, inRange, cityMatch };
      }

      const distanceKm = haversineKm(lat, lng, workerLat, workerLng);
      const cityMatch =
        areaToken &&
        worker.city &&
        worker.city.toLowerCase().includes(areaToken.toLowerCase());
      const inRange = matchesDistanceFilter(distanceKm, distanceRange, cityMatch);

      return { ...worker, distanceKm, inRange, cityMatch };
    })
    .filter((worker) => {
      if (!worker.inRange) return false;
      if (!matchesCategory(worker.zig_types, category)) return false;
      return true;
    });

  return {
    count: withDistance.length,
    workers: withDistance.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999)),
  };
}

export async function fetchDistinctCategories() {
  const { data, error } = await supabase.from('tasks').select('category, zig_type');

  if (error) throw error;

  const set = new Set();
  for (const row of data || []) {
    if (row.category) set.add(row.category);
    if (row.zig_type) set.add(row.zig_type);
  }

  return Array.from(set);
}
