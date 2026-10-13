"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, Search, ShieldCheck, Clock, MapPin, ArrowRight, Phone, MessageSquare, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { DISTANCE_FILTER_OPTIONS, JOB_CATEGORIES } from '../../constants/brand';
import { fetchNearbyWorkers } from '../../lib/ziggersData';
import AppDownloadModal from '../AppDownloadModal';
import LocationSearchInput from '../LocationSearchInput';

const CHENNAI_DEFAULT = { lat: 13.0827, lng: 80.2707, label: 'Chennai, Tamil Nadu' };
const HIRE_SEARCH_FORM_ID = 'hire-location-search';

const filterLabelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  marginBottom: '8px',
};

const filterSelectStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '100px',
  border: '1.5px solid rgba(61,43,31,0.12)',
  background: 'var(--color-linen)',
  fontSize: '14px',
  color: 'var(--color-espresso)',
  outline: 'none',
  cursor: 'pointer',
};

function areaLabel(location) {
  if (!location?.label) return 'your area';
  return location.label.split(',')[0].trim();
}

export default function Hire() {
  const [locationInput, setLocationInput] = useState('Chennai');
  const [location, setLocation] = useState(CHENNAI_DEFAULT);
  const [distanceRange, setDistanceRange] = useState('within-50');
  const [category, setCategory] = useState('All');
  const [workerCount, setWorkerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locationBusy, setLocationBusy] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  const loadWorkers = useCallback(async (searchLocation = location, { openModal = false } = {}) => {
    if (!searchLocation) return;
    setLoading(true);
    setError('');

    try {
      const result = await fetchNearbyWorkers({
        lat: searchLocation.lat,
        lng: searchLocation.lng,
        distanceRange,
        category,
        locationLabel: searchLocation.label,
      });
      setWorkerCount(result.count);
      if (openModal) setShowAppModal(true);
    } catch (err) {
      setError('Could not load worker data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [location, distanceRange, category]);

  const handleSearch = useCallback((selected = location) => {
    if (selected) setLocation(selected);
    setHasSearched(true);
    loadWorkers(selected || location, { openModal: true });
  }, [location, loadWorkers]);

  useEffect(() => {
    if (!hasSearched || !showAppModal) return;
    loadWorkers(undefined, { openModal: false });
  }, [distanceRange, category]); // eslint-disable-line react-hooks/exhaustive-deps

  const area = areaLabel(location);
  const searchBusy = locationBusy || loading;

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'var(--color-linen)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 28px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Hire gig workers
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '12px' }}>
            Staff on Demand in <span style={{ color: 'var(--color-gold)' }}>Minutes</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            On-demand staffing for catering staff, driver jobs, event staffing, and blue collar hiring — verified temporary staff near your location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid rgba(61, 43, 31, 0.08)',
            boxShadow: 'var(--shadow-soft)',
            maxWidth: '520px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div>
            <label htmlFor="hire-location-input" style={filterLabelStyle}>
              Location
            </label>
            <LocationSearchInput
              value={locationInput}
              onChange={setLocationInput}
              onLocationSelect={setLocation}
              onSearchComplete={handleSearch}
              selectedLocation={location}
              placeholder="Enter location"
              layout="input-only"
              showSubmitButton={false}
              formId={HIRE_SEARCH_FORM_ID}
              inputId="hire-location-input"
              onBusyChange={setLocationBusy}
            />
          </div>

          <div
            style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(61, 43, 31, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <label htmlFor="hire-distance-filter" style={filterLabelStyle}>
                Distance
              </label>
              <select
                id="hire-distance-filter"
                value={distanceRange}
                onChange={(e) => setDistanceRange(e.target.value)}
                style={filterSelectStyle}
              >
                {DISTANCE_FILTER_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hire-category-filter" style={filterLabelStyle}>
                Category
              </label>
              <select
                id="hire-category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={filterSelectStyle}
              >
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(61, 43, 31, 0.08)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              type="submit"
              form={HIRE_SEARCH_FORM_ID}
              className="btn-primary"
              disabled={searchBusy}
              style={{
                minWidth: '180px',
                justifyContent: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              {searchBusy ? <Loader2 size={18} className="hire-search-spin" /> : <Search size={18} />}
              Search
            </button>
          </div>

          {error && (
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-espresso)',
                background: 'rgba(196,160,82,0.15)',
                padding: '12px',
                borderRadius: '12px',
                marginTop: '16px',
                marginBottom: 0,
              }}
            >
              {error}
            </p>
          )}
        </motion.div>

        {/* Visible Service and City Staffing Directory */}
        <section style={{ marginTop: '64px', maxWidth: '1100px', margin: '64px auto 0' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
              Verified Staffing Directory
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '6px', marginBottom: '10px' }}>
              Browse On-Demand Staffing by Service &amp; City
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '15px', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Direct access to our dedicated regional hiring hubs with transparent shift pricing, Aadhaar KYC verification, and on-site supervisor coordination.
            </p>
          </div>

          {/* Service Directory Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            
            {/* Catering Staff */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>🍲</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Catering &amp; Banquet Staff</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Weddings, Receptions &amp; Banquets</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Banquet captains, buffet food runners, table stewards, and kitchen helpers with clean hygiene presentation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-catering-staff-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Catering Staff in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-odc-staff-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire ODC Banquet Staff in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-catering-staff-coimbatore" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Catering Staff in Coimbatore</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-catering-staff-madurai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Catering Staff in Madurai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

            {/* Event Staff */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>🎪</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Event Staff &amp; Crew</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Expos, Trade Fairs &amp; Galas</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Bilingual registration ushers, crowd marshals, exhibition booth runners, and stage support crew.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-event-staff-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Event Staff in Chennai (CTC / ECR)</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-event-staff-coimbatore" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Event Staff in Coimbatore (CODISSIA)</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-event-staff-madurai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Event Staff in Madurai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

            {/* Brand Promoters */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>📢</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Brand Promoters &amp; Retail Crew</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Mall Activations &amp; Sampling</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Articulate product pitch ambassadors, taste sampling assistants, and in-store sales converters.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-brand-promoters-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Brand Promoters in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-brand-promoters-coimbatore" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Brand Promoters in Coimbatore</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
                <Link href="/hire-brand-promoters-madurai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Brand Promoters in Madurai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

            {/* Acting Drivers */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>🚗</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Acting Drivers &amp; Valet</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Personal &amp; Commercial Chauffeurs</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Licence-verified acting drivers for city errands, late-night transit, outstation highway trips, and wedding valet parking.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-acting-drivers-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Acting Drivers in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

            {/* Pamphlet Distributors */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Pamphlet Distribution</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Flyer Inserts &amp; Field Leaflet Teams</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Newspaper insertion runners, high-footfall junction teams, and residential delivery squads with GPS accountability.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-pamphlet-distributors-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Pamphlet Distributors in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

            {/* Delivery Staff */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>🛵</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Temporary Delivery Staff</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Cloud Kitchens &amp; Courier Fleet</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Two-wheeler dispatch partners for peak meal rushes, dark store parcel dispatches, and retail backfill.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-delivery-staff-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Delivery Staff in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

            {/* Survey Staff */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>📊</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Field Survey Staff</h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>Market Research &amp; Data Collection</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Trained bilingual survey enumerators for digital tablet questionnaires, merchant mapping, and intercept interviews.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/hire-survey-staff-chennai" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-linen)', borderRadius: '10px', textDecoration: 'none', color: 'var(--color-espresso)', fontSize: '13px', fontWeight: 700 }}>
                  <span>Hire Survey Staff in Chennai</span>
                  <ChevronRight size={14} color="var(--color-gold)" />
                </Link>
              </div>
            </div>

          </div>

          {/* Regional Hubs & National Cities */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '32px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '16px' }}>
              Staffing Coverage by Regional Hub
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Chennai State Operations HQ
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <li><Link href="/hire-catering-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Catering Staff in Chennai</Link></li>
                  <li><Link href="/hire-event-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Event Staff in Chennai</Link></li>
                  <li><Link href="/hire-brand-promoters-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Brand Promoters in Chennai</Link></li>
                  <li><Link href="/hire-acting-drivers-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Acting Drivers in Chennai</Link></li>
                  <li><Link href="/hire-odc-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• ODC Banquet Crew in Chennai</Link></li>
                  <li><Link href="/hire-pamphlet-distributors-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Pamphlet Distribution in Chennai</Link></li>
                  <li><Link href="/hire-delivery-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Temporary Delivery Staff in Chennai</Link></li>
                  <li><Link href="/hire-survey-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Field Survey Staff in Chennai</Link></li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Coimbatore Western Hub
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <li><Link href="/hire-catering-staff-coimbatore" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Catering Staff in Coimbatore</Link></li>
                  <li><Link href="/hire-event-staff-coimbatore" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Event Ushers at CODISSIA</Link></li>
                  <li><Link href="/hire-brand-promoters-coimbatore" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Mall &amp; Retail Promoters</Link></li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Madurai Southern Hub
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <li><Link href="/hire-catering-staff-madurai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Traditional Mandapam Servers</Link></li>
                  <li><Link href="/hire-event-staff-madurai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Convention &amp; Festival Crew</Link></li>
                  <li><Link href="/hire-brand-promoters-madurai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Showroom &amp; Retail Promoters</Link></li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  National Gigs Hubs
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '8px' }}>
                  Looking for gig shifts or on-demand staffing across India?
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune'].map((c) => (
                    <Link key={c} href={`/jobs-in-${c.toLowerCase()}`} style={{ fontSize: '12px', padding: '4px 10px', background: 'var(--color-linen)', borderRadius: '6px', color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>
                      {c} Hub
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Helpline Bar */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(61,43,31,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--color-espresso)', display: 'block' }}>Need Custom Staffing for 5 to 50+ Personnel?</strong>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Speak directly with our operations desk for instant roster coordination and GST invoicing.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="tel:+919499008993" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: 'var(--color-espresso)', color: '#ffffff', borderRadius: '100px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
                  <Phone size={14} color="var(--color-gold)" /> Call 94990 08993
                </a>
                <a href="https://wa.me/919499008993?text=Hi%20Ziggers%20team%2C%20I%20need%20temporary%20staffing%20support" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: '#25D366', color: '#ffffff', borderRadius: '100px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
            </div>

          </div>

        </section>
      </div>

      <AppDownloadModal
        open={showAppModal}
        onClose={() => setShowAppModal(false)}
        actionLabel="Hire"
        title="Download Ziggers to hire"
        message="Post gig jobs, hire temporary staff, track your workforce live, and release payment — India's instant staffing platform on Google Play."
        hireResult={hasSearched ? { count: workerCount, area } : null}
        hireResultLoading={loading}
      />

      <style>{`
        .hire-search-spin { animation: hireSearchSpin 1s linear infinite; }
        @keyframes hireSearchSpin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
