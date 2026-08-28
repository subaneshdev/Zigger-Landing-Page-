"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, ShieldCheck, Zap, HeartHandshake, ArrowRight, Linkedin, Mail, ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';
import TeamSpotlight, { TEAM_MEMBERS } from '../TeamSpotlight';
import StaggeredText from '../ui/StaggeredText';
import ShimmerButton from '../magicui/ShimmerButton';

export default function Team() {
  const [activeTab, setActiveTab] = useState('spotlight'); // 'spotlight' | 'grid'

  return (
    <main style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-espresso)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ padding: '40px 0 60px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196, 160, 82, 0.12)', border: '1px solid rgba(196, 160, 82, 0.3)', padding: '6px 18px', borderRadius: '100px', marginBottom: '20px' }}
          >
            <Users size={16} color="var(--color-gold)" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Leadership &amp; Creators
            </span>
          </motion.div>

          {/* Staggered Heading */}
          <StaggeredText
            as="h1"
            text="The Minds Behind Ziggers. Building India's On-Demand Workforce."
            highlightWords={["Ziggers.", "On-Demand", "Workforce."]}
            segmentBy="words"
            staggerDirection="forward"
            direction="bottom"
            duration={0.6}
            staggerDelay={0.04}
            triggerOnScroll={false}
            style={{
              fontSize: 'clamp(32px, 5.5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '20px',
              color: 'var(--color-espresso)',
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-heading)',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: 'var(--color-muted)',
              maxWidth: '720px',
              margin: '0 auto 36px',
              lineHeight: 1.6
            }}
          >
            Meet the founding team dedicated to creating transparent, instant, and dignified gig work for millions across India.
          </motion.p>

          {/* View Mode Toggle */}
          <div style={{ display: 'inline-flex', background: '#ede6dd', padding: '4px', borderRadius: '100px', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('spotlight')}
              style={{
                background: activeTab === 'spotlight' ? 'var(--color-espresso)' : 'transparent',
                color: activeTab === 'spotlight' ? '#fff' : 'var(--color-muted)',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✨ 3D Spotlight View
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              style={{
                background: activeTab === 'grid' ? 'var(--color-espresso)' : 'transparent',
                color: activeTab === 'grid' ? '#fff' : 'var(--color-muted)',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              👥 Executive Grid
            </button>
          </div>

        </div>
      </section>

      {/* 2. TEAM SPOTLIGHT OR GRID VIEW */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          
          {activeTab === 'spotlight' ? (
            <TeamSpotlight members={TEAM_MEMBERS} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
              {TEAM_MEMBERS.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-soft)',
                    border: '1.5px solid rgba(61,43,31,0.08)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '320px', position: 'relative', overflow: 'hidden', backgroundColor: '#f5f1eb' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(61,43,31,0.85)', backdropFilter: 'blur(8px)', color: 'var(--color-gold)', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800 }}>
                      {member.shortRole}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-espresso)', margin: '0 0 4px', fontFamily: 'var(--font-heading)' }}>
                      {member.name}
                    </h3>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 12px' }}>
                      {member.role}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, margin: '0 0 20px', flex: 1 }}>
                      {member.bio}
                    </p>

                    <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(61,43,31,0.08)' }}>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--color-espresso)', textDecoration: 'none', background: '#f5f1eb', padding: '6px 12px', borderRadius: '8px' }}
                        >
                          <Mail size={14} color="var(--color-gold)" /> Contact
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#fff', textDecoration: 'none', background: 'var(--color-espresso)', padding: '6px 12px', borderRadius: '8px' }}
                        >
                          <Linkedin size={14} color="#fff" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 3. CORE VALUES & COMPANY MISSION */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderTop: '1px solid rgba(61,43,31,0.06)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
              What Drives Us
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-espresso)', letterSpacing: '-0.02em' }}>
              Our Founding Principles
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            <div style={{ padding: '28px', borderRadius: '20px', background: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(196,160,82,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Zap size={24} color="var(--color-gold)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Instant Fulfillment</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                Matching verified gig staff in under 15 minutes, solving last-minute staffing shortages for businesses across India.
              </p>
            </div>

            <div style={{ padding: '28px', borderRadius: '20px', background: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={24} color="#25D366" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>100% Payout Trust</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                Zero commission deductions from gig worker daily wages, with instant UPI settlements directly upon shift completion.
              </p>
            </div>

            <div style={{ padding: '28px', borderRadius: '20px', background: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(61,43,31,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <HeartHandshake size={24} color="var(--color-espresso)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Community First</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                Empowering WhatsApp and Telegram community leaders with automated tools to monetize their local networks ethically.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. JOIN US CTA */}
      <section style={{ padding: '80px 0 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #3D2B1F 0%, #1f140e 100%)', borderRadius: '32px', padding: '48px 32px', color: '#fff', boxShadow: 'var(--shadow-strong)' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Want to Join the Mission?
            </h2>
            <p style={{ color: '#d8c4b6', fontSize: '16px', maxWidth: '540px', margin: '0 auto 30px', lineHeight: 1.6 }}>
              Whether you are an ambitious engineer, operator, or community leader, we are always looking for passionate builders.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/partner" style={{ textDecoration: 'none' }}>
                <ShimmerButton background="var(--color-gold)" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  Become a Partner <ArrowRight size={16} />
                </ShimmerButton>
              </Link>
              <a href="mailto:hello@unfounded.in" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    padding: '14px 28px',
                    borderRadius: '100px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Contact Leadership
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
