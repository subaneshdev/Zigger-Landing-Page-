"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Search } from 'lucide-react';
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
