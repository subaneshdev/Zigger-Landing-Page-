import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Wallet, Navigation, Eye } from 'lucide-react';
import PlayStoreButton from './PlayStoreButton';

import imgScreen1 from '../assets/screen1.jpg';
import imgScreen2 from '../assets/screen2.jpg';
import imgScreen3 from '../assets/screen3.jpg';
import imgScreen4 from '../assets/screen4.jpg';

export default function AppShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  const appScreens = [
    {
      title: 'Hire Temporary Staff in Minutes',
      tagline: 'Instant hiring for on-demand staffing.',
      desc: 'Post gig jobs in under 2 minutes — catering staff, driver jobs, warehouse workers, and more. Fund escrow and get matched with verified gig workers nearby.',
      icon: <Shield size={20} />,
      image: imgScreen1,
    },
    {
      title: 'Find Gig Jobs Near You',
      tagline: 'Browse nearby jobs on the live map.',
      desc: 'Discover part-time jobs, daily jobs, shift jobs, and hourly jobs near you. Apply instantly for flexible work with same-day UPI payouts.',
      icon: <Navigation size={20} />,
      image: imgScreen2,
    },
    {
      title: 'Get Paid Securely',
      tagline: 'Track earnings and withdraw anytime.',
      desc: 'Wallet balance, linked bank account, and transaction history — all in one place.',
      icon: <Wallet size={20} />,
      image: imgScreen3,
    },
    {
      title: 'Workforce Management',
      tagline: 'Live GPS and proof of work.',
      desc: 'Track your casual workforce on a live map, verify geofenced photos, and release payment on completion — full staff management in one staffing app.',
      icon: <Eye size={20} />,
      image: imgScreen4,
    },
  ];

  return (
    <section className="app-showcase-section section-padding" style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            The Ziggers staffing app
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: '12px' }}>Your gig marketplace, in your pocket</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '16px' }}>Hiring app & workforce solution — available on Google Play</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }} className="showcase-layout-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {appScreens.map((screen, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    backgroundColor: isActive ? 'var(--color-linen)' : 'transparent',
                    border: isActive ? '1px solid rgba(61,43,31,0.08)' : '1px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '16px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'var(--color-espresso)' : 'var(--color-linen)',
                      color: isActive ? '#fff' : 'var(--color-espresso)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {screen.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{screen.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                      {isActive ? screen.desc : screen.tagline}
                    </p>
                  </div>
                </button>
              );
            })}

            <div style={{ marginTop: '12px' }}>
              <PlayStoreButton label="Download the app" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <motion.div
              key={activeTab}
              initial={{ scale: 0.95, opacity: 0.85, rotateY: 10 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              style={{
                width: '300px',
                height: '620px',
                borderRadius: '44px',
                border: '10px solid var(--color-espresso)',
                backgroundColor: 'var(--color-espresso)',
                boxShadow: 'var(--shadow-strong)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${appScreens[activeTab].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '34px',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#1E1E1E',
                  zIndex: 6,
                }}
              />
            </motion.div>

            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: 'var(--color-gold)',
                filter: 'blur(80px)',
                opacity: 0.1,
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .showcase-layout-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
