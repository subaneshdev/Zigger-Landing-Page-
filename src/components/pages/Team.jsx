"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Zap, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TeamSpotlight, { TEAM_MEMBERS } from '../TeamSpotlight';
import StaggeredText from '../ui/StaggeredText';
import ShimmerButton from '../magicui/ShimmerButton';

export default function Team() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-espresso)', minHeight: '100vh', paddingTop: '90px', paddingBottom: '70px' }}>
      
      {/* 1. HERO SECTION (Compact & Lifted Higher) */}
      <section style={{ padding: '20px 0 10px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196, 160, 82, 0.12)', border: '1px solid rgba(196, 160, 82, 0.3)', padding: '5px 16px', borderRadius: '100px', marginBottom: '14px' }}
          >
            <Users size={15} color="var(--color-gold)" />
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Leadership Team
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
            duration={0.55}
            staggerDelay={0.035}
            triggerOnScroll={false}
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '12px',
              color: 'var(--color-espresso)',
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-heading)',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              fontSize: '15px',
              color: 'var(--color-muted)',
              maxWidth: '660px',
              margin: '0 auto 16px',
              lineHeight: 1.5
            }}
          >
            Meet the founding team dedicated to creating transparent, instant, and dignified gig work for millions across India.
          </motion.p>

        </div>
      </section>

      {/* 2. 3D TEAM SPOTLIGHT (Elevated & Compact) */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
          <TeamSpotlight members={TEAM_MEMBERS} />
        </div>
      </section>

      {/* 3. CORE VALUES & COMPANY MISSION */}
      <section style={{ padding: '48px 0', backgroundColor: '#ffffff', borderTop: '1px solid rgba(61,43,31,0.06)', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '6px' }}>
              What Drives Us
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-espresso)', letterSpacing: '-0.02em' }}>
              Our Founding Principles
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            
            <div style={{ padding: '24px', borderRadius: '18px', background: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(196,160,82,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Zap size={22} color="var(--color-gold)" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>Instant Fulfillment</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, margin: 0 }}>
                Matching verified gig staff in under 15 minutes, solving last-minute staffing shortages for businesses across India.
              </p>
            </div>

            <div style={{ padding: '24px', borderRadius: '18px', background: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <ShieldCheck size={22} color="#25D366" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>100% Payout Trust</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, margin: 0 }}>
                Zero commission deductions from gig worker daily wages, with instant UPI settlements directly upon shift completion.
              </p>
            </div>

            <div style={{ padding: '24px', borderRadius: '18px', background: 'var(--color-linen)', border: '1px solid rgba(61,43,31,0.08)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(61,43,31,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <HeartHandshake size={22} color="var(--color-espresso)" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>Community First</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, margin: 0 }}>
                Empowering WhatsApp and Telegram community leaders with automated tools to monetize their local networks ethically.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. JOIN US CTA */}
      <section style={{ padding: '60px 0 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #3D2B1F 0%, #1f140e 100%)', borderRadius: '28px', padding: '40px 28px', color: '#fff', boxShadow: 'var(--shadow-strong)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Want to Join the Mission?
            </h2>
            <p style={{ color: '#d8c4b6', fontSize: '15px', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Whether you are an ambitious engineer, operator, or community leader, we are always looking for passionate builders.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/partner" style={{ textDecoration: 'none' }}>
                <ShimmerButton background="var(--color-gold)" style={{ padding: '12px 26px', fontSize: '14px' }}>
                  Become a Partner <ArrowRight size={16} />
                </ShimmerButton>
              </Link>
              <a href="mailto:hello@unfounded.in" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    padding: '12px 26px',
                    borderRadius: '100px',
                    fontSize: '14px',
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
