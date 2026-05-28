import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Shield, Wallet, Navigation, Eye } from 'lucide-react';

import imgScreen1 from '../assets/screen1.jpg';
import imgScreen2 from '../assets/screen2.jpg';
import imgScreen3 from '../assets/screen3.jpg';
import imgScreen4 from '../assets/screen4.jpg';

export default function AppShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  const appScreens = [
    {
      title: "1. Phone Verification",
      tagline: "Secure, geofenced onboarding.",
      desc: "Fast, background-verified OTP and referral registration. Protects device integrity and secures financial operations from the very first tap.",
      icon: <Shield size={20} />,
      image: imgScreen1
    },
    {
      title: "2. Employer Dashboard",
      tagline: "Form teams and secure escrows.",
      desc: "Fund secure escrows instantly, form worker team pools, post custom gigs, and track active coordination balances.",
      icon: <Wallet size={20} />,
      image: imgScreen2
    },
    {
      title: "3. Browse ZIG Jobs",
      tagline: "Find manual work in your neighborhood.",
      desc: "Workers track gig shifts in their local 5km radius with live map pins, precise coordinate routes, and active payout indexes.",
      icon: <Navigation size={20} />,
      image: imgScreen3
    },
    {
      title: "4. Live Geofence Maps",
      tagline: "Absolute visibility on ground truth.",
      desc: "Track on-ground check-ins, verify worker coordinates, and follow milestone proofs in real-time.",
      icon: <Eye size={20} />,
      image: imgScreen4
    }
  ];

  return (
    <section className="app-showcase-section" style={{ backgroundColor: '#FDFBF7', padding: '100px 0', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: 'var(--color-accent)', 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            marginBottom: '12px' 
          }}>
            THE ZIGGERS MOBILE EXPERIENCE
          </p>
          <h2 style={{ 
            fontSize: '44px', 
            fontWeight: '800', 
            color: 'var(--color-primary)', 
            lineHeight: 1.1,
            fontFamily: 'var(--font-heading)'
          }}>
            Take a Look Inside the App
          </h2>
        </div>

        {/* Showcase Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }} className="showcase-layout-grid">
          
          {/* Left Side: Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {appScreens.map((screen, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className="interactive-showcase-tab"
                  style={{
                    padding: '24px',
                    borderRadius: '24px',
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    border: isActive ? '1px solid rgba(41,33,27,0.06)' : '1px solid transparent',
                    boxShadow: isActive ? '0 10px 30px rgba(41, 33, 27, 0.04)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '20px',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isActive ? '#ffffff' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}>
                    {screen.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '800', 
                      color: 'var(--color-primary)',
                      marginBottom: '4px'
                    }}>
                      {screen.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: isActive ? 'var(--color-text-muted)' : 'rgba(133,117,104,0.6)',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {isActive ? screen.desc : screen.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Smartphone Viewport with Real Uploaded Screenshot */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <motion.div
              key={activeTab}
              initial={{ scale: 0.95, opacity: 0.8, rotateY: 15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              style={{
                width: '300px',
                height: '620px',
                borderRadius: '44px',
                border: '10px solid #29211B', // Solid brown bezel
                backgroundColor: '#29211B',
                boxShadow: '0 25px 60px rgba(41, 33, 27, 0.25)',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1000px',
              }}
            >
              {/* Dynamic Image screen rendered perfectly */}
              <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${appScreens[activeTab].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '34px',
              }} />

              {/* Dynamic Reflection Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 5
              }} />

              {/* Camera Notch */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#1E1E1E',
                zIndex: 6
              }} />
            </motion.div>

            {/* Glowing Aura behind screen */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              background: 'var(--color-secondary)',
              filter: 'blur(80px)',
              opacity: 0.12,
              zIndex: -1
            }} />
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .showcase-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </section>
  );
}
