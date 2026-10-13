"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Users,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  FileText,
  BadgeCheck,
  Check,
  Sparkles,
  Smartphone,
  Info
} from 'lucide-react';
import {
  trackQuoteFormStart,
  trackQuoteFormSubmit,
  trackCallClick,
  trackWhatsAppClick,
  trackAppDownloadClick,
} from '../../lib/analytics';
import { getAppOpenHref, isMobile, openAppOrPlayStore } from '../../lib/appLink';

export default function EmployerLandingTemplate({ config }) {
  const {
    serviceName,
    locationName,
    eyebrow,
    h1,
    h1Accent,
    heroDescription,
    workerLink,
    workerLinkLabel,
    targetAudience = [],
    roles = [],
    leadTime,
    shiftDetails = [],
    pricingFactors = [],
    coverageZones = [],
    faqs = [],
    tamilNotes,
    isDraft = false,
  } = config;

  // Quote Calculator State
  const [selectedRole, setSelectedRole] = useState(roles[0]?.name || 'Standard Staff');
  const [headcount, setHeadcount] = useState(5);
  const [shiftType, setShiftType] = useState('Full Day (8 Hours)');

  // Enquiry Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locality: '',
    eventDate: '',
    headcount: 5,
    shiftHours: 'Full Day (8 Hours)',
    notes: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const phoneContact = '+919499008993';
  const displayPhone = '94990 08993';
  const whatsappUrl = `https://wa.me/919499008993?text=${encodeURIComponent(
    `Hello Ziggers team, I want to enquire about hiring ${serviceName} in ${locationName}.`
  )}`;

  const handleOpenModal = (presetHeadcount = null) => {
    if (presetHeadcount) {
      setFormData((prev) => ({ ...prev, headcount: presetHeadcount, shiftHours: shiftType }));
    } else {
      setFormData((prev) => ({ ...prev, headcount, shiftHours: shiftType }));
    }
    setIsModalOpen(true);
    setFormError('');
    if (!formStarted) {
      setFormStarted(true);
      trackQuoteFormStart(serviceName, locationName);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!formStarted) {
      setFormStarted(true);
      trackQuoteFormStart(serviceName, locationName);
    }
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: serviceName,
        location: locationName,
        locality: formData.locality,
        eventDate: formData.eventDate,
        headcount: formData.headcount,
        shiftHours: formData.shiftHours,
        notes: formData.notes,
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSubmitSuccess(data);
      trackQuoteFormSubmit(serviceName, locationName, formData.headcount, data.referenceId);
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please call or WhatsApp us.');
    } finally {
      setFormLoading(false);
    }
  };

  // Estimate calculation (indicative guidance)
  const getEstimatedPerWorker = () => {
    if (shiftType.includes('Half Day')) return '₹600 – ₹900';
    if (shiftType.includes('Night')) return '₹1,000 – ₹1,500';
    return '₹900 – ₹1,300';
  };

  return (
    <div style={{ backgroundColor: 'var(--color-linen)', minHeight: '100vh', paddingTop: '100px', color: 'var(--color-espresso)', fontFamily: 'var(--font-body)' }}>
      {/* Draft banner if unconfirmed page */}
      {isDraft && (
        <div style={{ backgroundColor: '#FFF3CD', borderBottom: '1px solid #FFEEBA', padding: '12px 20px', textAlign: 'center', fontSize: '13px', color: '#856404' }}>
          <strong>Expansion Preview (Draft):</strong> Service deployment for {locationName} is undergoing operational supplier review. Enquiries are received directly at our regional desk.
        </div>
      )}

      {/* Header Breadcrumbs */}
      <div className="container" style={{ maxWidth: '1040px', paddingTop: '20px', paddingBottom: '16px' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-muted)', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} />
          <Link href="/hire" style={{ color: 'inherit', textDecoration: 'none' }}>Hire Staff</Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--color-espresso)', fontWeight: 700 }}>{h1}</span>
        </nav>
      </div>

      {/* Worker Intent Notice Banner */}
      {workerLink && (
        <div className="container" style={{ maxWidth: '1040px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid rgba(196, 160, 82, 0.35)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-espresso)' }}>
              <BadgeCheck size={18} color="var(--color-gold)" />
              <span><strong>Are you a worker looking for shifts?</strong> Find catering &amp; flexible shifts in {locationName} with same-day UPI payouts.</span>
            </div>
            <Link
              href={workerLink}
              style={{ color: 'var(--color-espresso)', backgroundColor: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.15)', padding: '6px 14px', borderRadius: '100px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}
            >
              {workerLinkLabel || `Apply for ${serviceName} Jobs`} →
            </Link>
          </div>
        </div>
      )}

      {/* Main Hero Section */}
      <section style={{ padding: '32px 0 48px' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '36px', alignItems: 'center' }} className="employer-hero-grid">
            
            {/* Left Hero Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(196,160,82,0.15)', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-espresso)', marginBottom: '16px' }}>
                <ShieldCheck size={14} color="var(--color-gold)" />
                {eyebrow || `Verified ${serviceName} in ${locationName}`}
              </div>

              <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 900, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-espresso)', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>
                {h1Accent ? (
                  <>
                    {h1.replace(h1Accent, '').trim()}{' '}
                    <span style={{ color: 'var(--color-gold)' }}>{h1Accent}</span>
                  </>
                ) : (
                  h1
                )}
              </h1>

              <p style={{ fontSize: '17px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '28px', maxWidth: '580px' }}>
                {heroDescription}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <button
                  type="button"
                  onClick={() => handleOpenModal()}
                  style={{
                    backgroundColor: 'var(--color-espresso)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '100px',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(61,43,31,0.18)',
                    transition: 'all 0.2s',
                  }}
                >
                  <FileText size={17} />
                  <span>Request Instant Quote</span>
                </button>

                <a
                  href={`tel:${phoneContact}`}
                  onClick={() => trackCallClick(serviceName, locationName, phoneContact)}
                  style={{
                    backgroundColor: '#ffffff',
                    color: 'var(--color-espresso)',
                    border: '1.5px solid rgba(61,43,31,0.15)',
                    padding: '14px 22px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Phone size={16} color="var(--color-gold)" />
                  <span>Call {displayPhone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(serviceName, locationName)}
                  style={{
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 22px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Operational Proof Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(61,43,31,0.08)' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-espresso)' }}>8,000+</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600 }}>Registered Users in India</div>
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-espresso)' }}>100%</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600 }}>Aadhaar KYC Process</div>
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-espresso)' }}>Standby</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600 }}>Replacement Roster</div>
                </div>
              </div>

            </div>

            {/* Right Card: Instant Cost Estimator & Quote Trigger */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: '0 8px 30px rgba(61,43,31,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <Sparkles size={18} color="var(--color-gold)" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--color-espresso)' }}>Staffing Estimate Calculator</h3>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-muted)', marginBottom: '6px' }}>
                  Select Service Profile
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', backgroundColor: 'var(--color-linen)', fontSize: '14px', color: 'var(--color-espresso)', fontWeight: 600, outline: 'none' }}
                >
                  {roles.map((r) => (
                    <option key={r.name || r} value={r.name || r}>{r.name || r}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-muted)' }}>
                    Staff Headcount Required
                  </label>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-gold)' }}>{headcount} Staff</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>
                  <span>2 Staff (Small Shift)</span>
                  <span>20</span>
                  <span>40+ (Grand Event)</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-muted)', marginBottom: '6px' }}>
                  Shift Duration &amp; Timing
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['Half Day (4-5 Hours)', 'Full Day (8 Hours)', 'Night Banquet Shift', 'Multi-day Event'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShiftType(s)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: shiftType === s ? '1.5px solid var(--color-espresso)' : '1px solid rgba(61,43,31,0.1)',
                        backgroundColor: shiftType === s ? 'var(--color-espresso)' : 'var(--color-linen)',
                        color: shiftType === s ? '#ffffff' : 'var(--color-espresso)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-linen)', padding: '14px 16px', borderRadius: '12px', marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '2px' }}>Indicative Shift Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-espresso)' }}>
                  {getEstimatedPerWorker()} <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-muted)' }}>/ worker / shift</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>
                  Final quote includes role specialization, supervisor assignment, and location transport factors.
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal(headcount)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-espresso)',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Book This Roster ({headcount} Staff)</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Target Clients / Who This Service Is For */}
      {targetAudience.length > 0 && (
        <section style={{ padding: '48px 0', backgroundColor: '#ffffff', borderTop: '1px solid rgba(61,43,31,0.06)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
          <div className="container" style={{ maxWidth: '1040px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Tailored Workforce</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>Who Uses Ziggers Staffing in {locationName}?</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {targetAudience.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--color-linen)', padding: '22px', borderRadius: '16px', border: '1px solid rgba(61,43,31,0.06)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-espresso)', fontWeight: 800, marginBottom: '14px' }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Actual Roles Available Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Skills &amp; Profiles</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>Specific Roles &amp; Duties Available</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '600px', margin: '8px auto 0' }}>
              Every staff member is briefed on duties, grooming guidelines, and venue protocols prior to reporting on site.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
            {roles.map((r, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)', boxShadow: '0 2px 10px rgba(61,43,31,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>{r.name}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(196,160,82,0.15)', color: 'var(--color-espresso)', padding: '4px 8px', borderRadius: '6px' }}>{r.badge || 'Verified'}</span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '14px' }}>{r.duties}</p>
                <div style={{ fontSize: '12px', color: 'var(--color-espresso)', backgroundColor: 'var(--color-linen)', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="var(--color-gold)" />
                  <span><strong>Dress Code:</strong> {r.dressCode || 'Standard black & white uniform, clean presentation'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Service Models: Marketplace vs Ziggers Execute */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderTop: '1px solid rgba(61,43,31,0.06)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>How We Deliver</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>Two Clear Ways to Hire Through Ziggers</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
              Choose self-serve marketplace matching for quick shifts, or managed Ziggers Execute staffing for large operations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="service-model-grid">
            
            {/* Model 1: Marketplace Matching */}
            <div style={{ backgroundColor: 'var(--color-linen)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Smartphone size={20} color="var(--color-gold)" />
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>Direct App Matching</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '18px' }}>Best for independent caterers &amp; venues needing 1 to 4 temporary workers quickly.</p>
              
              <ul style={{ paddingLeft: '18px', margin: '0 0 24px', fontSize: '14px', color: 'var(--color-espresso)', lineHeight: 1.8 }}>
                <li>Post requirement directly in the Ziggers mobile app</li>
                <li>Match with KYC-verified workers in your locality</li>
                <li>Track worker arrival in real time via mobile map</li>
                <li>Settlement held in secure escrow and released upon approval</li>
                <li>Direct communication between organizer and assigned worker</li>
              </ul>

              <a
                href={getAppOpenHref()}
                target={isMobile() ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => {
                  trackAppDownloadClick('employer_page', serviceName);
                  if (isMobile()) openAppOrPlayStore(e);
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-espresso)', fontWeight: 800, textDecoration: 'underline', fontSize: '14px' }}
              >
                Download App for Direct Booking →
              </a>
            </div>

            {/* Model 2: Ziggers Execute (Managed Staffing) */}
            <div style={{ backgroundColor: 'var(--color-espresso)', color: '#ffffff', borderRadius: '20px', padding: '30px', boxShadow: '0 8px 30px rgba(61,43,31,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={20} color="var(--color-gold)" />
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Ziggers Execute (Managed Staffing)</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '18px' }}>Designed for weddings, banquets, and major corporate setups needing 5 to 50+ staff.</p>

              <ul style={{ paddingLeft: '18px', margin: '0 0 24px', fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
                <li>Dedicated Operations Coordinator / Captain assigned on site</li>
                <li>30-minute advance reporting &amp; uniform quality check</li>
                <li>Standby replacement pool active for any emergency dropouts</li>
                <li>Centralized attendance roster &amp; consolidated GST invoice</li>
                <li>Direct coordination via phone &amp; WhatsApp operations desk</li>
              </ul>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)', border: 'none', padding: '10px 20px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}
              >
                Enquire for Ziggers Execute →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Lead Times, Replacements & Pricing Transparency */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Operational Clarity</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>Lead Times, Attendance &amp; Pricing Policies</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(61,43,31,0.06)' }}>
              <Clock size={22} color="var(--color-gold)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>Booking Lead Times</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                {leadTime || 'Standard booking requires 24 to 48 hours notice. For peak wedding muhurtham dates, 3 to 5 days advance confirmation is recommended to lock preferred rosters.'}
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(61,43,31,0.06)' }}>
              <Users size={22} color="var(--color-gold)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>Standby &amp; Replacement Protocol</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                For managed Ziggers Execute orders, our operations desk and on-site Captains coordinate standby replacements within 45 to 60 minutes in primary coverage zones to protect shift continuity.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(61,43,31,0.06)' }}>
              <CheckCircle2 size={22} color="var(--color-gold)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>Transparent Pricing Factors</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                Quotes depend strictly on: (1) Total shift hours (4h half-day / 8h full-day), (2) Timing (night banquets after 11 PM include night allowance), (3) Out-of-city transport (e.g. ECR/OMR corridor), and (4) Headcount.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Local Coverage Areas */}
      {coverageZones.length > 0 && (
        <section style={{ padding: '48px 0', backgroundColor: '#ffffff', borderTop: '1px solid rgba(61,43,31,0.06)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
          <div className="container" style={{ maxWidth: '1040px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Local Footprint</span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-espresso)', margin: '2px 0 0' }}>Active Coverage Hubs in {locationName}</h2>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal()}
                style={{ backgroundColor: 'var(--color-espresso)', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Check Your Locality
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {coverageZones.map((zone, i) => (
                <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)', padding: '8px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  <MapPin size={13} color="var(--color-gold)" />
                  <span>{zone}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tamil Bilingual Assistance Section (For Tamil Nadu regions) */}
      {tamilNotes && (
        <section style={{ padding: '48px 0', backgroundColor: 'var(--color-linen)' }}>
          <div className="container" style={{ maxWidth: '1040px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid rgba(196,160,82,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Info size={20} color="var(--color-gold)" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>
                  தமிழ் வழிகாட்டுதல் (Tamil Operational Guidance)
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>
                {tamilNotes}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {faqs.length > 0 && (
        <section style={{ padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>FAQ</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>Frequently Asked Questions</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    padding: '18px 22px',
                    border: '1px solid rgba(61,43,31,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  <summary style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-espresso)', outline: 'none' }}>
                    {faq.q}
                  </summary>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, marginTop: '12px', marginBottom: 0 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Genuine Local Case Studies & Completed Staffing Deliveries */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderTop: '1px solid rgba(61,43,31,0.06)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Operational Evidence</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>Recent Staffing Deliveries Across Tamil Nadu</h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '15px', maxWidth: '600px', margin: '6px auto 0' }}>
              Real-world client deployments managed through Ziggers marketplace matching and Ziggers Execute supervised crews.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            
            <div style={{ backgroundColor: 'var(--color-linen)', borderRadius: '18px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '8px' }}>
                <MapPin size={14} /> Injambakkam &amp; ECR Resorts, Chennai
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                800-Guest Wedding Banquet &amp; Live Counters
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6, margin: '0 0 14px' }}>
                Deployed 28 banquet servers, 4 live counter assistants, and 2 dedicated Ziggers Execute captains for an evening wedding reception. Zero attendance shortages and smooth buffet replenishment throughout peak dining rush.
              </p>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-espresso)', background: '#ffffff', padding: '6px 12px', borderRadius: '100px', display: 'inline-block' }}>
                Role: Catering Staff &amp; Supervisors · 100% On-Time Check-In
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-linen)', borderRadius: '18px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '8px' }}>
                <MapPin size={14} /> CODISSIA Trade Fair Complex, Coimbatore
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                3-Day Industrial Expo Delegate Registration
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6, margin: '0 0 14px' }}>
                Supplied 8 bilingual registration ushers and 4 exhibition stall assistants for an industrial manufacturing summit. Coordinated badge scanning, delegate orientation, and visitor query recording across all three expo days.
              </p>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-espresso)', background: '#ffffff', padding: '6px 12px', borderRadius: '100px', display: 'inline-block' }}>
                Role: Event Staff &amp; Ushers · Bilingual English &amp; Tamil
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-linen)', borderRadius: '18px', padding: '24px', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '8px' }}>
                <MapPin size={14} /> KK Nagar Kalyana Mandapam, Madurai
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                Traditional Banana Leaf Feast (Elai Saapadu)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6, margin: '0 0 14px' }}>
                Rostered 16 experienced South Indian feast servers for synchronized traditional meal service across 1,200 attendees. Coordinated swift table batch clearances to seat waiting wedding guests with zero lag.
              </p>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-espresso)', background: '#ffffff', padding: '6px 12px', borderRadius: '100px', display: 'inline-block' }}>
                Role: Traditional Servers · Cultural Feast Etiquette
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interlinking & Directory Navigation */}
      <section style={{ padding: '48px 0', backgroundColor: 'var(--color-linen)' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid rgba(61,43,31,0.08)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '14px' }}>
              Explore Related Staffing Solutions
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '13px' }}>
              <div>
                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  All Services in {locationName}
                </strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><Link href={`/hire-catering-staff-${locationName.toLowerCase()}`} style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Catering Staff in {locationName}</Link></li>
                  <li><Link href={`/hire-event-staff-${locationName.toLowerCase()}`} style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Event Staff in {locationName}</Link></li>
                  <li><Link href={`/hire-brand-promoters-${locationName.toLowerCase()}`} style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Brand Promoters in {locationName}</Link></li>
                  {locationName === 'Chennai' && (
                    <>
                      <li><Link href="/hire-acting-drivers-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Acting Drivers in Chennai</Link></li>
                      <li><Link href="/hire-odc-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• ODC Banquet Crew in Chennai</Link></li>
                      <li><Link href="/hire-pamphlet-distributors-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Pamphlet Distribution in Chennai</Link></li>
                      <li><Link href="/hire-delivery-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Temporary Delivery Staff in Chennai</Link></li>
                      <li><Link href="/hire-survey-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Field Survey Staff in Chennai</Link></li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  Other Regional Hubs
                </strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><Link href="/hire" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Full Staffing Directory (/hire)</Link></li>
                  <li><Link href="/hire-catering-staff-chennai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Chennai Operations Base</Link></li>
                  <li><Link href="/hire-catering-staff-coimbatore" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Coimbatore Hub (CODISSIA / Kongu)</Link></li>
                  <li><Link href="/hire-catering-staff-madurai" style={{ color: 'var(--color-espresso)', textDecoration: 'none', fontWeight: 600 }}>• Madurai Hub (Mandapams / Banquets)</Link></li>
                </ul>
              </div>

              <div>
                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  Worker Applications
                </strong>
                <p style={{ color: 'var(--color-muted)', fontSize: '12px', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Are you a gig worker looking for flexible daily wage shifts with same-day UPI pay?
                </p>
                <Link
                  href={workerLink || '/work'}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 700, textDecoration: 'none' }}
                >
                  <span>{workerLinkLabel || 'Apply for Gigs'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Sticky-style CTA Bar */}
      <section style={{ padding: '40px 0', backgroundColor: 'var(--color-espresso)', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            Need Verified {serviceName} in {locationName}?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
            Speak with our regional operations team or submit your date and headcount for an instant quotation.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleOpenModal()}
              style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)', border: 'none', padding: '14px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}
            >
              Request a Custom Quote
            </button>
            <a
              href={`tel:${phoneContact}`}
              onClick={() => trackCallClick(serviceName, locationName, phoneContact)}
              style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.3)', padding: '14px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Call {displayPhone}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(serviceName, locationName)}
              style={{ backgroundColor: '#25D366', color: '#ffffff', border: 'none', padding: '14px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Modal / Popup for Requesting a Quote */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '520px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '20px',
                  border: 'none',
                  background: 'none',
                  fontSize: '22px',
                  cursor: 'pointer',
                  color: 'var(--color-muted)',
                }}
              >
                ✕
              </button>

              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                    Enquiry Received!
                  </h3>
                  <div style={{ backgroundColor: 'var(--color-linen)', padding: '8px 14px', borderRadius: '8px', display: 'inline-block', fontSize: '13px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '14px' }}>
                    Reference: {submitSuccess.referenceId}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
                    {submitSuccess.message}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href={submitSuccess.whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '12px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <MessageSquare size={16} />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSubmitSuccess(null);
                      }}
                      style={{ backgroundColor: 'var(--color-linen)', color: 'var(--color-espresso)', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '6px' }}>
                    Request a Quote: {serviceName}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '20px' }}>
                    Operating in {locationName}. Enter details below for availability check and pricing.
                  </p>

                  {formError && (
                    <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', color: '#B91C1C', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitEnquiry}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Your Name / Business *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Anand Kumar / Grand Caterers"
                          value={formData.name}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Mobile Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="10-digit mobile number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Event / Shift Date</label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Venue / Area Locality</label>
                        <input
                          type="text"
                          name="locality"
                          placeholder="e.g. ECR Neelankarai"
                          value={formData.locality}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Headcount Needed</label>
                        <input
                          type="number"
                          name="headcount"
                          min="1"
                          max="150"
                          value={formData.headcount}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Shift Hours</label>
                        <select
                          name="shiftHours"
                          value={formData.shiftHours}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                          <option value="Half Day (4-5 Hours)">Half Day (4-5 Hours)</option>
                          <option value="Full Day (8 Hours)">Full Day (8 Hours)</option>
                          <option value="Night Banquet Shift">Night Banquet Shift</option>
                          <option value="Multi-day Event">Multi-day Event</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Specific Requirements / Notes</label>
                      <textarea
                        name="notes"
                        rows="2"
                        placeholder="Mention any uniform preference, languages, or supervisor needs..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(61,43,31,0.15)', fontSize: '14px', resize: 'vertical' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--color-espresso)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '100px',
                        fontWeight: 800,
                        fontSize: '15px',
                        cursor: formLoading ? 'not-allowed' : 'pointer',
                        opacity: formLoading ? 0.7 : 1,
                      }}
                    >
                      {formLoading ? 'Submitting...' : 'Submit Staffing Request'}
                    </button>
                    <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-muted)', marginTop: '8px' }}>
                      No advance payment needed to enquire. Fast coordinator callback.
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .employer-hero-grid { grid-template-columns: 1fr !important; }
          .service-model-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
