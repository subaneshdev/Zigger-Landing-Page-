/**
 * Ziggers Editorial Coverage Matrix (102 Competitor Targets + Specialty Offerings)
 * Evaluated against giggers.in coverage map on 14 October 2026.
 *
 * Publication Rules:
 * - Only verified operations with real local coverage and working enquiry handling are marked `isIndexable: true`.
 * - Unconfirmed expansion targets are preserved as `draft_unconfirmed` with `isIndexable: false` (noindex, excluded from sitemap).
 */

export const COMPETITOR_SERVICES = [
  {
    id: 'catering',
    name: 'Catering Staff',
    titleSuffix: 'Catering Staff & Banquet Servers',
    slugPrefix: 'hire-catering-staff',
    defaultLeadTime: '24–48 hours advance booking; emergency morning cover subject to zone roster',
    baseRoles: ['Banquet Captain', 'Table Server', 'Buffet Food Runner', 'Kitchen Helper / Dishwashing', 'Live Counter Assistant'],
    keywords: ['hire catering staff', 'catering workers for wedding', 'banquet servers on demand', 'catering boys for functions'],
  },
  {
    id: 'events',
    name: 'Event Staff',
    titleSuffix: 'Event Staff, Ushers & Crew',
    slugPrefix: 'hire-event-staff',
    defaultLeadTime: '48–72 hours for multi-crew events; 24 hours for small corporate rosters',
    baseRoles: ['Event Coordinator', 'Guest Usher / Registration Desk', 'Crowd Management Crew', 'Exhibition Stall Assistant', 'Stage & Sound Runner'],
    keywords: ['hire event staff', 'event manpower agency', 'ushers for corporate events', 'exhibition stall staff'],
  },
  {
    id: 'pamphlets',
    name: 'Pamphlet Distributors',
    titleSuffix: 'Pamphlet & Flyer Distribution Staff',
    slugPrefix: 'hire-pamphlet-distributors',
    defaultLeadTime: '48 hours for route mapping and distribution zone allocation',
    baseRoles: ['Door-to-Door Distributor', 'Newspaper Insert Distributor', 'High-Footfall Junction Promoters', 'Commercial Hub Field Crew'],
    keywords: ['pamphlet distribution staff', 'flyer distribution agency', 'brochure distribution crew', 'field leaflet promoters'],
  },
  {
    id: 'delivery',
    name: 'Delivery Staff',
    titleSuffix: 'Temporary Delivery Staff & Couriers',
    slugPrefix: 'hire-delivery-staff',
    defaultLeadTime: '24 hours for dedicated shift staffing; two-wheeler delivery riders',
    baseRoles: ['Local Parcel Courier', 'Food & Cloud Kitchen Delivery Partner', 'B2B Retail Dispatch Assistant', 'Warehouse-to-Store Runner'],
    keywords: ['hire delivery staff', 'temporary delivery boys', 'on-demand delivery partners', 'contract courier riders'],
  },
  {
    id: 'promoters',
    name: 'Brand Promoters',
    titleSuffix: 'Brand Promoters & Retail Activations',
    slugPrefix: 'hire-brand-promoters',
    defaultLeadTime: '48–72 hours for product briefing and uniform coordination',
    baseRoles: ['In-Store Sales Promoter', 'Mall Activation Brand Ambassador', 'Product Sampling Crew', 'Roadshow Demonstrator', 'Lead Capture Specialist'],
    keywords: ['hire brand promoters', 'mall activation promoters', 'retail sales promoters', 'BTL marketing field staff'],
  },
  {
    id: 'surveys',
    name: 'Survey Staff',
    titleSuffix: 'Field Survey Staff & Data Collectors',
    slugPrefix: 'hire-survey-staff',
    defaultLeadTime: '72 hours for questionnaire training and route briefing',
    baseRoles: ['Field Data Enumerator', 'Consumer Research Interviewer', 'B2B Market Survey Field Agent', 'Digital Tablet Form Collector'],
    keywords: ['hire survey staff', 'field research enumerators', 'market research survey crew', 'door to door survey workers'],
  },
];

export const COMPETITOR_LOCATIONS = [
  {
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    status: 'active',
    hubNote: 'Ziggers primary operational base (Madambakkam HQ, ECR/OMR banquet corridors, Anna Nagar, T. Nagar, Guindy, Tambaram)',
    popularLocalities: ['ECR & Injambakkam', 'OMR Corridor', 'T. Nagar', 'Anna Nagar', 'Velachery', 'Guindy', 'Tambaram', 'Kilpauk'],
  },
  {
    slug: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    status: 'active',
    hubNote: 'Western Tamil Nadu hub with active catering, industrial dispatch, and exhibition centre staffing',
    popularLocalities: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Avinashi Road', 'Saravanampatti', 'Singanallur'],
  },
  {
    slug: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    status: 'active',
    hubNote: 'South-central cultural and wedding hub with frequent kalyana mandapam banquets and festival activations',
    popularLocalities: ['KK Nagar', 'Anna Nagar', 'Simmakkal', 'Mattuthavani', 'Tallakulam', 'Thirunagar'],
  },
  {
    slug: 'tiruchirappalli',
    name: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Central Tamil Nadu transit & educational corridor (expansion candidate pending local vendor roster)',
    popularLocalities: ['Thillai Nagar', 'Cantonment', 'Srirangam', 'Kattur', 'KK Nagar'],
  },
  {
    slug: 'salem',
    name: 'Salem',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Steel & textile commercial center (expansion candidate pending local vendor roster)',
    popularLocalities: ['Fairlands', 'Alagapuram', 'Hasthampatti', 'Suramangalam', 'Shevapet'],
  },
  {
    slug: 'tirunelveli',
    name: 'Tirunelveli',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Southern agricultural & commercial hub (expansion candidate pending local vendor roster)',
    popularLocalities: ['Palayamkottai', 'Vannarpettai', 'Town', 'Tirunelveli Junction'],
  },
  {
    slug: 'erode',
    name: 'Erode',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Textile market & logistics center (expansion candidate pending local vendor roster)',
    popularLocalities: ['Perundurai Road', 'Brough Road', 'Veerappanchatram', 'Thindal'],
  },
  {
    slug: 'vellore',
    name: 'Vellore',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Healthcare & educational city (expansion candidate pending local vendor roster)',
    popularLocalities: ['Katpadi', 'Gandhi Nagar', 'Sathuvachari', 'Bagayam'],
  },
  {
    slug: 'tiruppur',
    name: 'Tiruppur',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Knitwear export industrial cluster (expansion candidate pending local vendor roster)',
    popularLocalities: ['Avinashi Road', 'Kangeyam Road', 'Palladam Road', 'Dharapuram Road'],
  },
  {
    slug: 'thoothukudi',
    name: 'Thoothukudi',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Port & industrial logistics hub (expansion candidate pending local vendor roster)',
    popularLocalities: ['Millerpuram', 'Thermal Nagar', 'Bryant Nagar', 'Meenatchi Patti'],
  },
  {
    slug: 'thanjavur',
    name: 'Thanjavur',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Delta agricultural & cultural center (expansion candidate pending local vendor roster)',
    popularLocalities: ['Medical College Road', 'Santhapillai Gate', 'Yagappa Nagar', 'Vallam'],
  },
  {
    slug: 'kanchipuram',
    name: 'Kanchipuram',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Silk weaving & industrial corridor adjacent to Chennai outer ring (expansion candidate)',
    popularLocalities: ['Gandhi Road', 'Ennaikaran', 'Orikkai', 'Little Kanchipuram'],
  },
  {
    slug: 'hosur',
    name: 'Hosur',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Automotive & electronics industrial hub bordering Bangalore (expansion candidate)',
    popularLocalities: ['Sipcot Phase 1', 'Bagalur Road', 'Rayakottai Road', 'Mathigiri'],
  },
  {
    slug: 'nagercoil',
    name: 'Nagercoil',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Kanyakumari district commercial hub (expansion candidate pending local vendor roster)',
    popularLocalities: ['Vadasery', 'Kottar', 'Meenakshipuram', 'Asambu Road'],
  },
  {
    slug: 'dindigul',
    name: 'Dindigul',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Lock & textile hub on central highway (expansion candidate pending local vendor roster)',
    popularLocalities: ['Nagal Nagar', 'Round Road', 'Batlagundu Road', 'Begambur'],
  },
  {
    slug: 'karur',
    name: 'Karur',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Home textiles manufacturing city (expansion candidate pending local vendor roster)',
    popularLocalities: ['Gandhigramam', 'Thanthonimalai', 'Jawahar Bazaar', 'Vengamedu'],
  },
  {
    slug: 'tamil-nadu',
    name: 'Tamil Nadu',
    state: 'Tamil Nadu',
    status: 'unconfirmed',
    hubNote: 'Statewide managed crew deployments for multi-city brand activations and roadshows',
    popularLocalities: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'],
  },
];

// Existing Ziggers URLs matched to services
const EXISTING_URL_MAP = {
  'catering-chennai': '/hire-catering-staff-chennai',
  'catering-coimbatore': '/catering-workers-coimbatore',
  'catering-madurai': '/catering-workers-madurai',
  'events-chennai': '/event-staff-chennai',
  'events-coimbatore': '/event-staff-coimbatore',
  'events-madurai': '/event-staff-madurai',
  'promoters-chennai': '/hire-brand-promoters-chennai',
  'promoters-coimbatore': '/retail-promoters-coimbatore',
  'promoters-madurai': '/retail-promoters-madurai',
  'delivery-chennai': '/delivery-jobs-chennai',
  'delivery-coimbatore': '/delivery-jobs-coimbatore',
  'delivery-madurai': '/delivery-jobs-madurai',
};

// Generate all 102 targets
function generateCoverageMatrix() {
  const records = [];

  for (const service of COMPETITOR_SERVICES) {
    for (const location of COMPETITOR_LOCATIONS) {
      const slug = `${service.slugPrefix}-${location.slug}`;
      const pairKey = `${service.id}-${location.slug}`;
      const existingRelated = EXISTING_URL_MAP[pairKey] || null;

      // Status determination:
      // Chennai is fully active for core services (catering, events, promoters).
      // Coimbatore & Madurai are active for catering, events, and promoters.
      // Other 13 cities or unconfirmed services (pamphlets, delivery, surveys) are kept as draft_unconfirmed.
      const isCoreActiveCity = ['chennai', 'coimbatore', 'madurai'].includes(location.slug);
      const isCoreActiveService = ['catering', 'events', 'promoters'].includes(service.id);

      const isActive = isCoreActiveCity && isCoreActiveService;
      const operationalStatus = isActive ? 'published_active' : 'draft_unconfirmed';
      const isIndexable = isActive;

      let launchPriority = 'P3';
      if (location.slug === 'chennai') {
        launchPriority = isActive ? 'P0' : 'P1';
      } else if (['coimbatore', 'madurai'].includes(location.slug)) {
        launchPriority = isActive ? 'P1' : 'P2';
      }

      records.push({
        id: slug,
        slug,
        serviceId: service.id,
        serviceName: service.name,
        locationSlug: location.slug,
        locationName: location.name,
        intent: 'employer',
        existingRelatedUrl: existingRelated,
        proposedCanonicalUrl: `/${slug}`,
        operationalStatus,
        isIndexable,
        launchPriority,
        primaryKeywordCluster: `${service.keywords[0]} ${location.name}, ${service.keywords[1]} ${location.name}`,
        sourceOfLocalFacts: location.hubNote,
        roles: service.baseRoles,
        leadTime: service.defaultLeadTime,
        pricingFactors: 'Calculated by shift length (4h half-day / 8h full-day), timing (day vs night banquet), role specialization, and venue distance from city center.',
        coverageZones: location.popularLocalities,
      });
    }
  }

  // Add Ziggers 2 Specialty Offerings:
  // 1. /hire-odc-staff-chennai (Outdoor Catering & Banquet Managed Operations)
  records.push({
    id: 'hire-odc-staff-chennai',
    slug: 'hire-odc-staff-chennai',
    serviceId: 'odc',
    serviceName: 'ODC & Banquet Staff',
    locationSlug: 'chennai',
    locationName: 'Chennai',
    intent: 'employer',
    existingRelatedUrl: '/hire-catering-staff-chennai',
    proposedCanonicalUrl: '/hire-odc-staff-chennai',
    operationalStatus: 'published_active',
    isIndexable: true,
    launchPriority: 'P0',
    primaryKeywordCluster: 'ODC staff Chennai, outdoor catering manpower Chennai, banquet staffing Chennai',
    sourceOfLocalFacts: 'Chennai convention centres, ECR banquet resorts, kalyana mandapams across Tambaram and Anna Nagar',
    roles: ['ODC Captain', 'Live Counter Chef Assistant', 'Buffet Line Controller', 'Plate Clearance & Dishwashing Crew', 'VIP Table Steward'],
    leadTime: '24–48 hours for large outdoor setups (10–50+ staff); emergency backup available',
    pricingFactors: 'Per-shift rates based on guest headcount, service hours, and transport outside core city limits.',
    coverageZones: ['ECR Beach Resorts', 'OMR Corridor', 'Maduravoyal & Porur', 'Tambaram Mandapams', 'Guindy Hotels'],
  });

  // 2. /hire-acting-drivers-chennai (Strengthened Driver Hiring Offering)
  records.push({
    id: 'hire-acting-drivers-chennai',
    slug: 'hire-acting-drivers-chennai',
    serviceId: 'drivers',
    serviceName: 'Acting Drivers',
    locationSlug: 'chennai',
    locationName: 'Chennai',
    intent: 'employer',
    existingRelatedUrl: '/hire-acting-drivers-chennai',
    proposedCanonicalUrl: '/hire-acting-drivers-chennai',
    operationalStatus: 'published_active',
    isIndexable: true,
    launchPriority: 'P0',
    primaryKeywordCluster: 'hire acting drivers Chennai, temporary drivers for hire Chennai, call drivers Chennai outstation',
    sourceOfLocalFacts: 'Chennai citywide with verified driving licence and local navigation experience',
    roles: ['Personal Car Acting Driver', 'Outstation Highway Driver', 'Corporate Transit Chauffeur', 'Event Valet Parking Crew'],
    leadTime: 'Instant or 2-hour notice for city drives; 12 hours advance for outstation trips',
    pricingFactors: 'Billed per hour or fixed day rate (8h / 12h) plus night allowance and outstation food/stay allowances.',
    coverageZones: ['Adyar & Besant Nagar', 'Anna Nagar', 'T. Nagar', 'Velachery', 'OMR & Sholinganallur', 'Airport Area'],
  });

  return records;
}

export const COVERAGE_MATRIX = generateCoverageMatrix();

export const COVERAGE_BY_SLUG = Object.fromEntries(
  COVERAGE_MATRIX.map((rec) => [rec.slug, rec])
);

export function getCoverageRecord(slug) {
  return COVERAGE_BY_SLUG[slug] || null;
}

export function getIndexableCoverageRecords() {
  return COVERAGE_MATRIX.filter((rec) => rec.isIndexable);
}

export function getDraftCoverageRecords() {
  return COVERAGE_MATRIX.filter((rec) => !rec.isIndexable);
}
