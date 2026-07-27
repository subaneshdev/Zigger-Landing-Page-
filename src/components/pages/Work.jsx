import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Loader2,
  Filter,
  Calendar,
  Clock,
  IndianRupee,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { JOB_CATEGORIES } from '../../constants/brand';
import { fetchNearbyTasks, fetchTaskById } from '../../lib/ziggersData';
import AppDownloadModal from '../AppDownloadModal';
import LocationSearchInput from '../LocationSearchInput';

const CHENNAI_DEFAULT = { lat: 13.0827, lng: 80.2707, label: 'Chennai, Tamil Nadu' };

const DISTANCE_SECTIONS = [
  { id: 'nearby', title: 'Jobs within 10 km', match: (km) => km <= 10 },
  { id: '10-25', title: 'Jobs within 25 km', match: (km) => km > 10 && km <= 25 },
  { id: '25-50', title: 'Jobs within 50 km', match: (km) => km > 25 && km <= 50 },
  { id: '50-plus', title: 'Jobs longer than 50 km', match: (km) => km > 50 },
];

function formatDate(value) {
  if (!value) return 'Flexible';
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function groupJobsByDistance(jobs) {
  return DISTANCE_SECTIONS.map((section) => ({
    ...section,
    jobs: jobs.filter((job) => section.match(job.distanceKm)),
  })).filter((section) => section.jobs.length > 0);
}

function JobCard({ job, onOpen }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={() => onOpen(job)}
      style={{
        textAlign: 'left',
        background: '#fff',
        border: '1px solid rgba(61,43,31,0.08)',
        borderRadius: '16px',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--color-linen)',
          borderBottom: '1px solid rgba(61,43,31,0.06)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
          }}
        >
          {job.category || job.zig_type || 'Gig'}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
          {job.distanceKm?.toFixed(1)} km away
        </span>
      </div>

      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '17px', lineHeight: 1.35 }}>{job.title}</h3>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-muted)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {job.location_name}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid rgba(61,43,31,0.06)',
            fontSize: '12px',
            color: 'var(--color-espresso)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} /> {formatDate(job.start_time)}
          </span>
          {job.start_time ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} />
              {formatTime(job.start_time)}
              {job.end_time ? ` – ${formatTime(job.end_time)}` : ''}
            </span>
          ) : (
            <span />
          )}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 700,
              color: 'var(--color-gold)',
              gridColumn: '1 / -1',
            }}
          >
            <IndianRupee size={13} /> {Number(job.payout).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderTop: '1px solid rgba(61,43,31,0.06)',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-espresso)',
        }}
      >
        View details
        <ChevronRight size={16} color="var(--color-muted)" />
      </div>
    </motion.button>
  );
}

export default function Work() {
  const [locationInput, setLocationInput] = useState('Chennai');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(CHENNAI_DEFAULT);
  const [category, setCategory] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  const loadJobs = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError('');

    try {
      const result = await fetchNearbyTasks({
        lat: location.lat,
        lng: location.lng,
        category,
        searchText: searchQuery,
      });

      setJobs(result.items);
      setTotal(result.total);
    } catch (err) {
      setError('Could not load jobs right now. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [location, category, searchQuery]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const openJob = async (job) => {
    setDetailLoading(true);
    try {
      const full = await fetchTaskById(job.id);
      setSelectedJob(full || job);
    } catch {
      setSelectedJob(job);
    } finally {
      setDetailLoading(false);
    }
  };

  const jobSections = groupJobsByDistance(jobs);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'var(--color-linen)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Find gig jobs near me
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '8px' }}>
            Browse <span style={{ color: 'var(--color-gold)' }}>Part-time & Daily Jobs</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '16px', maxWidth: '560px' }}>
            Nearby jobs for students, weekend jobs, shift jobs, and hourly jobs. Flexible work with instant apply and same-day UPI payouts.
          </p>
        </motion.div>

        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(61, 43, 31, 0.08)',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <LocationSearchInput
            value={locationInput}
            onChange={setLocationInput}
            onLocationSelect={setLocation}
            onSearchQuery={setSearchQuery}
            selectedLocation={location}
            placeholder="Enter area — e.g. Tambaram, Chennai"
          />

          {location?.label && (
            <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '16px', marginBottom: '16px' }}>
              Showing jobs near: <strong style={{ color: 'var(--color-espresso)' }}>{location.label}</strong>
            </p>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Filter size={16} color="var(--color-muted)" />
            {JOB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: category === cat ? 'none' : '1px solid rgba(61,43,31,0.12)',
                  background: category === cat ? 'var(--color-espresso)' : '#fff',
                  color: category === cat ? '#fff' : 'var(--color-espresso)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'rgba(196,160,82,0.15)', color: 'var(--color-espresso)', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            border: '1px solid rgba(61, 43, 31, 0.08)',
            boxShadow: 'var(--shadow-soft)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(61, 43, 31, 0.08)',
              background: 'var(--color-linen)',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>
              {loading ? 'Loading jobs…' : `${total} open gig job${total === 1 ? '' : 's'}`}
            </h2>
            {location?.label && (
              <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
                Showing results near <strong style={{ color: 'var(--color-espresso)' }}>{location.label}</strong>
              </p>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--color-muted)' }}>
              <Loader2 size={32} className="spin" style={{ margin: '0 auto 12px' }} />
              Loading jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <Briefcase size={40} color="var(--color-gold)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No gig jobs near you right now</h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: '20px', maxWidth: '420px', marginInline: 'auto' }}>
                Try a different area or check back tomorrow — new part-time and daily jobs go live daily.
              </p>
              <button type="button" className="btn-primary" onClick={() => setShowAppModal(true)}>
                Get notified in the app
              </button>
            </div>
          ) : (
            <div style={{ padding: '24px' }}>
              {jobSections.map((section, index) => (
                <section key={section.id} style={{ marginBottom: index < jobSections.length - 1 ? '28px' : 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '16px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(61,43,31,0.08)',
                    }}
                  >
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-espresso)' }}>
                      {section.title}
                    </h3>
                    <span style={{ fontSize: '13px', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                      {section.jobs.length} job{section.jobs.length === 1 ? '' : 's'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '16px',
                    }}
                  >
                    {section.jobs.map((job) => (
                      <JobCard key={job.id} job={job} onOpen={openJob} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedJob(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(13,10,8,0.55)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '16px' }}
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '560px', maxHeight: '85vh', overflow: 'auto', background: '#fff', borderRadius: '24px 24px 16px 16px', padding: '28px' }}
          >
            {detailLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}><Loader2 size={28} className="spin" /></div>
            ) : (
              <>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}>
                  {selectedJob.category || selectedJob.zig_type || 'Zig details'}
                </p>
                <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{selectedJob.title}</h2>
                {selectedJob.company_name && <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '16px' }}>{selectedJob.company_name}</p>}

                <div style={{ display: 'grid', gap: '12px', marginBottom: '20px', fontSize: '14px' }}>
                  <div><strong>Location:</strong> {selectedJob.location_name}</div>
                  <div><strong>Pay:</strong> ₹{Number(selectedJob.payout).toLocaleString('en-IN')} {selectedJob.payment_type ? `(${selectedJob.payment_type})` : ''}</div>
                  <div><strong>Schedule:</strong> {formatDate(selectedJob.start_time)} {selectedJob.start_time ? `· ${formatTime(selectedJob.start_time)}` : ''}</div>
                  {selectedJob.workers_required && <div><strong>Workers needed:</strong> {selectedJob.workers_required}</div>}
                </div>

                {selectedJob.description && (
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-muted)', marginBottom: '16px' }}>{selectedJob.description}</p>
                )}
                {selectedJob.requirements && (
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-muted)', marginBottom: '24px' }}><strong>Requirements:</strong> {selectedJob.requirements}</p>
                )}

                <button type="button" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--color-gold)', color: 'var(--color-espresso)' }} onClick={() => setShowAppModal(true)}>
                  Work — Apply in App
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

      <AppDownloadModal
        open={showAppModal}
        onClose={() => setShowAppModal(false)}
        actionLabel="Work"
        title="Download Ziggers to apply"
        message="Apply to gig jobs, track your shift, and earn extra income with same-day pay — all in the Ziggers staffing app."
      />

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
