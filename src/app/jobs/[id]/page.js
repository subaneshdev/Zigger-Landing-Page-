import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, IndianRupee, MapPin, Users, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { fetchTaskById } from '../../../lib/ziggersData';
import { getAppOpenHref } from '../../../lib/appLink';
import { SITE_URL } from '../../../constants/seo';

const OPEN_STATUSES = [
  'open',
  'OPEN',
  'posted',
  'POSTED',
  'published',
  'PUBLISHED',
  'active',
  'ACTIVE',
];

function isJobActive(task) {
  if (!task) return false;
  if (task.status && !OPEN_STATUSES.includes(task.status)) return false;
  if (task.end_time) {
    const end = new Date(task.end_time);
    if (!isNaN(end.getTime()) && end.getTime() < Date.now()) {
      return false;
    }
  }
  return true;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const task = await fetchTaskById(id);
    if (!task) {
      return {
        title: 'Job Not Found | Ziggers',
        description: 'The requested job posting could not be found or has already been filled.',
      };
    }

    const active = isJobActive(task);
    const titlePrefix = active ? '' : '[Filled/Expired] ';

    return {
      title: `${titlePrefix}${task.title} | ${task.location_name?.split(',')[0] || 'Chennai'} | Ziggers`,
      description: task.description ? task.description.slice(0, 160) : `Apply for ${task.title} job on Ziggers. Verified temporary gigs with same-day UPI payouts.`,
      alternates: {
        canonical: `${SITE_URL}/jobs/${id}`,
      },
      ...(!active && {
        robots: {
          index: false,
          follow: true,
        },
      }),
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Gig Jobs | Ziggers' };
  }
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  let task = null;
  let fetchError = false;

  try {
    task = await fetchTaskById(id);
  } catch (error) {
    console.error('Error fetching task details:', error);
    fetchError = true;
  }

  if (fetchError || !task) {
    notFound();
  }

  const active = isJobActive(task);

  // Format Helper with explicit Indian Standard Time (IST / Asia/Kolkata)
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Flexible';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Requirements sanitizer (filters out '{}', '[]', and empty objects)
  const hasValidRequirements = Boolean(
    task.requirements &&
    typeof task.requirements === 'string' &&
    task.requirements.trim() !== '' &&
    task.requirements.trim() !== '{}' &&
    task.requirements.trim() !== '[]' &&
    task.requirements.trim() !== 'null'
  );

  // Structured Data Schema for Google Jobs (Only for active postings!)
  const jobSchema = active ? {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: task.title,
    description: `<p>${task.description || ''}</p>${hasValidRequirements ? `<p><strong>Requirements:</strong> ${task.requirements}</p>` : ''}`,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Ziggers',
      value: `ZIG-${task.id.slice(0, 8)}`,
    },
    datePosted: task.created_at ? new Date(task.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    validThrough: task.end_time ? new Date(task.end_time).toISOString() : new Date(Date.now() + 14 * 86400000).toISOString(),
    employmentType: 'TEMPORARY',
    hiringOrganization: {
      '@type': 'Organization',
      name: task.company_name || 'Ziggers',
      sameAs: 'https://www.ziggers.in',
      logo: 'https://www.ziggers.in/icon.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: task.location_name?.split(',')[1]?.trim() || task.location_name?.split(',')[0]?.trim() || 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        value: Number(task.payout) || 0,
        unitText: 'DAY',
      },
    },
  } : null;

  return (
    <>
      {jobSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />
      )}

      <div style={{ backgroundColor: 'var(--color-linen)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* Back Navigation */}
          <div style={{ marginBottom: '24px' }}>
            <Link 
              href="/work" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' }}
            >
              <ArrowLeft size={16} /> Back to all jobs
            </Link>
          </div>

          {/* Job Card */}
          <article style={{ background: '#fff', borderRadius: '32px', border: '1px solid rgba(61,43,31,0.06)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
            
            {/* Expiry Banner if Job is closed */}
            {!active && (
              <div style={{ backgroundColor: '#FEF2F2', borderBottom: '1px solid #FEE2E2', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#991B1B' }}>
                <AlertCircle size={20} color="#DC2626" />
                <div>
                  <strong style={{ fontSize: '14px', display: 'block' }}>This shift has been filled or has ended.</strong>
                  <span style={{ fontSize: '13px', color: '#7F1D1D' }}>
                    Applications for this specific opening are currently closed. Explore active gigs available in your city.
                  </span>
                </div>
              </div>
            )}

            {/* Header Area */}
            <div style={{ padding: '40px', background: 'linear-gradient(to bottom, var(--color-linen), #ffffff)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-gold)', background: 'rgba(196,160,82,0.1)', padding: '6px 12px', borderRadius: '100px' }}>
                  {task.category || task.zig_type || 'Gig Job'}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-espresso)', background: 'rgba(61,43,31,0.06)', padding: '6px 12px', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> {active ? 'Verified Active Gig' : 'Completed Shift'}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--color-espresso)', fontFamily: 'var(--font-heading)', lineHeight: 1.2, marginBottom: '8px' }}>
                {task.title}
              </h1>

              {task.company_name && (
                <p style={{ fontSize: '16px', color: 'var(--color-muted)', fontWeight: 500, margin: 0 }}>
                  at {task.company_name}
                </p>
              )}
            </div>

            {/* Content Details */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Quick Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', background: 'var(--color-linen)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(61,43,31,0.04)' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</div>
                    <div style={{ fontSize: '15px', color: 'var(--color-espresso)', fontWeight: 500, marginTop: '2px' }}>{task.location_name}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <IndianRupee size={20} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payout</div>
                    <div style={{ fontSize: '18px', color: 'var(--color-espresso)', fontWeight: 700, marginTop: '2px' }}>
                      ₹{Number(task.payout).toLocaleString('en-IN')}
                      {task.payment_type ? <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-muted)' }}> / {task.payment_type}</span> : ''}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Calendar size={20} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Schedule</div>
                    <div style={{ fontSize: '15px', color: 'var(--color-espresso)', fontWeight: 500, marginTop: '2px' }}>
                      {task.start_time && task.end_time && formatDate(task.start_time) !== formatDate(task.end_time) ? (
                        <span>{formatDate(task.start_time)} – {formatDate(task.end_time)}</span>
                      ) : (
                        <span>{formatDate(task.start_time)}</span>
                      )}
                      {task.start_time ? (
                        <div style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {formatTime(task.start_time)}{task.end_time ? ` – ${formatTime(task.end_time)} (IST)` : ''}
                        </div>
                      ) : ''}
                    </div>
                  </div>
                </div>

                {task.workers_required && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Users size={20} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vacancy</div>
                      <div style={{ fontSize: '15px', color: 'var(--color-espresso)', fontWeight: 500, marginTop: '2px' }}>{task.workers_required} openings</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {task.description && (
                <div>
                  <h2 style={{ fontSize: '20px', color: 'var(--color-espresso)', marginBottom: '12px', fontWeight: 700 }}>Job Description</h2>
                  <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {task.description}
                  </p>
                </div>
              )}

              {/* Requirements */}
              {hasValidRequirements && (
                <div>
                  <h2 style={{ fontSize: '20px', color: 'var(--color-espresso)', marginBottom: '12px', fontWeight: 700 }}>Requirements</h2>
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {task.requirements}
                  </p>
                </div>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid rgba(61,43,31,0.08)', margin: '10px 0' }} />

              {/* Action Area */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                {active ? (
                  <>
                    <a 
                      href={getAppOpenHref()}
                      className="btn-primary" 
                      style={{ display: 'inline-flex', padding: '16px 40px', fontSize: '16px', borderRadius: '100px', textDecoration: 'none', background: 'var(--color-gold)', color: 'var(--color-espresso)', fontWeight: 700, width: '100%', maxWidth: '360px', justifyContent: 'center' }}
                    >
                      Apply &amp; Work on Ziggers App
                    </a>
                    <p style={{ fontSize: '13px', color: 'var(--color-muted)', margin: 0 }}>
                      Apply to this gig, complete your shift, and get paid instantly via UPI.
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      href="/work"
                      className="btn-primary"
                      style={{ display: 'inline-flex', padding: '16px 40px', fontSize: '16px', borderRadius: '100px', textDecoration: 'none', background: 'var(--color-espresso)', color: '#ffffff', fontWeight: 700, width: '100%', maxWidth: '360px', justifyContent: 'center' }}
                    >
                      Browse Other Active Shifts
                    </Link>
                    <p style={{ fontSize: '13px', color: 'var(--color-muted)', margin: 0 }}>
                      New daily wage and part-time shifts are added regularly across India.
                    </p>
                  </>
                )}
              </div>

            </div>
          </article>

        </div>
      </div>
    </>
  );
}
