"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Users, ShieldAlert, Trophy, Target, Landmark } from 'lucide-react';
import Magnetic from '../Magnetic';

export default function Partner() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    partnershipType: 'Sports Event',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company) return;

    setStatus('loading');

    // Simulate backend submission response
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const verticals = [
    {
      icon: <Trophy size={32} style={{ color: 'var(--color-gold)' }} />,
      title: 'Sports Events',
      description: 'Official manpower partner for premier sporting events like IPL, ISL, Pro Kabaddi, and international marathons. We deploy ushers, ticketing staff, crowd management, and field helpers.'
    },
    {
      icon: <Target size={32} style={{ color: 'var(--color-gold)' }} />,
      title: 'Brands & BTL Promotions',
      description: 'Powering product launches, sampling campaigns, roadshows, and mall activations in VR Mall, EA, and Phoenix Marketcity. Reliable, verified brand promoters to maximize BTL ROI.'
    },
    {
      icon: <Landmark size={32} style={{ color: 'var(--color-gold)' }} />,
      title: 'Government Operations',
      description: 'Licensed workforce partner supplying background-verified manpower at scale for public logistics, administrative support, data verification drives, and local municipalities.'
    }
  ];

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'var(--color-linen)', color: 'var(--color-espresso)', fontFamily: 'var(--font-body)' }}>
      <div className="container">
        
        {/* Header Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Enterprise Manpower Partner
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', marginBottom: '16px', lineHeight: '1.2' }}>
            Official Workforce Partner for <span style={{ color: 'var(--color-gold)' }}>Events, Brands &amp; Governments</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
            Scale your operations seamlessly. Ziggers provides fully KYC-verified, on-demand workforce solutions for India\'s largest sports events (IPL, ISL, Pro Kabaddi), brand promotions, and public sector projects.
          </p>
        </div>

        {/* Verticals Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px', 
          marginBottom: '56px' 
        }}>
          {verticals.map((vert, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#fff', 
                padding: '32px 24px', 
                borderRadius: '20px', 
                border: '1.5px solid rgba(61,43,31,0.06)',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <div style={{ marginBottom: '16px' }}>{vert.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>{vert.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{vert.description}</p>
            </div>
          ))}
        </div>

        {/* Content & Form Split Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Partnership Trust Value Proposition */}
          <div>
            <h2 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: 900 }}>Why Partner With Ziggers?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-gold)', marginTop: '4px' }}><Users size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '4px' }}>100% KYC &amp; Aadhaar Verified</h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>Every event helper, hostess, or promoter undergoes strict digital verification to ensure security compliance.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-gold)', marginTop: '4px' }}><ShieldAlert size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '4px' }}>Real-time GPS Tracking</h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>Track promoter attendance and event usher locations live on the dashboard during activations.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-gold)', marginTop: '4px' }}><CheckCircle2 size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '4px' }}>Escrow &amp; Instant UPI Payouts</h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>Guaranteed financial transparency with automated disbursements immediately after shifts end.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Partnership Contact Form */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '24px', 
            padding: '36px 28px', 
            boxShadow: 'var(--shadow-strong)',
            border: '1.5px solid rgba(61,43,31,0.06)'
          }}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '24px 0' }}
                >
                  <div style={{ color: 'var(--color-gold)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle2 size={64} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Partnership Request Sent!</h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '15px', lineHeight: 1.5, marginBottom: 0 }}>
                    Thank you for reaching out. Our partnerships team will review your requirements and get in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>Request Partnership</h3>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                          required 
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Company Name *</label>
                        <input 
                          type="text" 
                          name="company" 
                          value={formData.company} 
                          onChange={handleChange} 
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Corporate Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                        required 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Contact Number *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="e.g. +91 98765 43210"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                        required 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Partnership Sector *</label>
                      <select 
                        name="partnershipType" 
                        value={formData.partnershipType} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="Sports Event">Sports Events (IPL, ISL, Kabaddi)</option>
                        <option value="Brand Promotion">BTL Marketing &amp; Brand Promotions</option>
                        <option value="Government">Government &amp; Large-scale Logistics</option>
                        <option value="Corporate Event">Corporate &amp; MICE Events</option>
                        <option value="Other">Other Enterprise Staffing</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Brief Requirements</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows="3"
                        placeholder="Tell us about your event, location, and manpower requirements..."
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', resize: 'none' }}
                      />
                    </div>

                    <div style={{ marginTop: '8px' }}>
                      <Magnetic>
                        <button 
                          type="submit" 
                          disabled={status === 'loading'}
                          className="btn-primary"
                          style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px', fontSize: '15px', fontWeight: 700 }}
                        >
                          {status === 'loading' ? (
                            <Loader2 size={18} className="partner-submit-spin" />
                          ) : (
                            <>Send Request <Send size={16} /></>
                          )}
                        </button>
                      </Magnetic>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
      
      <style>{`
        .partner-submit-spin { animation: partnerSubmitSpin 1s linear infinite; }
        @keyframes partnerSubmitSpin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
