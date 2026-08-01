"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [city, setCity] = useState('chennai');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/work?query=${encodeURIComponent(searchQuery)}&city=${city}`);
    } else {
      router.push(`/work?city=${city}`);
    }
  };

  const citiesList = [
    { slug: 'chennai', name: 'Chennai' },
    { slug: 'bangalore', name: 'Bangalore' },
    { slug: 'hyderabad', name: 'Hyderabad' },
    { slug: 'mumbai', name: 'Mumbai' },
    { slug: 'delhi', name: 'Delhi' },
    { slug: 'coimbatore', name: 'Coimbatore' },
    { slug: 'pune', name: 'Pune' },
    { slug: 'madurai', name: 'Madurai' },
  ];

  return (
    <section
      style={{
        backgroundColor: 'var(--color-linen)',
        color: 'var(--color-espresso)',
        paddingTop: '160px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Decorative background grid pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle, var(--color-gold) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '24px',
            color: 'var(--color-espresso)',
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Find gig jobs & verified staff. Discover local shifts. <span style={{ color: 'var(--color-gold)' }}>Zigger it!</span>
        </h1>

        <p style={{ fontSize: '16px', color: 'var(--color-muted)', marginBottom: '36px', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 36px' }}>
          Connect instantly with verified on-demand catering staff, drivers, and delivery partners near you. Paid same-day via secure UPI.
        </p>

        {/* Premium, High-Contrast Search Bar (Centered & Mobile Optimized) */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(61, 43, 31, 0.12)',
            display: 'flex',
            alignItems: 'center',
            padding: '6px',
            marginBottom: '48px',
            border: '2px solid var(--color-gold)',
            transition: 'all 0.25s ease',
            maxWidth: '720px',
            margin: '0 auto 48px'
          }}
          className="search-bar-form-premium"
        >
          {/* Location Select (Left side) */}
          <div 
            className="location-wrapper"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '12px 20px', 
              borderRight: '2px solid rgba(61, 43, 31, 0.08)', 
              position: 'relative', 
              flexShrink: 0 
            }}
          >
            <MapPin size={22} color="var(--color-gold)" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--color-espresso)',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                paddingRight: '16px',
                WebkitAppearance: 'none'
              }}
            >
              {citiesList.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <span style={{ fontSize: '10px', color: 'var(--color-muted)', pointerEvents: 'none', marginLeft: '-6px' }}>▼</span>
          </div>

          {/* Job/Skill Search Input (Right side) */}
          <div 
            className="search-input-wrapper"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              flex: 1, 
              padding: '8px 16px', 
              gap: '10px' 
            }}
          >
            <input
              type="text"
              placeholder="Search for catering jobs, driver jobs, delivery partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '16px',
                color: 'var(--color-espresso)',
                fontWeight: 600,
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--color-espresso)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 20px',
                borderRadius: '10px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                gap: '6px',
                transition: 'background-color 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#523a2a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-espresso)'}
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* PeerPush Rating Badge */}
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'center' }}>
          <a href="https://peerpush.com/p/ziggers" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <img
              src="https://peerpush.com/p/ziggers/rating-badge.png"
              alt="Ziggers rating on PeerPush"
              style={{ width: '100%', maxWidth: '320px', height: 'auto', display: 'block' }}
            />
          </a>
        </div>

        {/* 3 Premium Service Cards (Centered) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="cards-grid">
          
          <div 
            onClick={() => router.push('/work')}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              color: 'var(--color-espresso)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform 0.2s',
              border: '1px solid rgba(61, 43, 31, 0.04)'
            }}
            className="hover-card"
          >
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '6px', color: 'var(--color-espresso)', letterSpacing: '0.5px' }}>FIND GIG JOBS</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Flexible shifts, catering gigs, driver jobs & same-day UPI
            </p>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <ArrowRight size={14} />
            </div>
          </div>

          <div 
            onClick={() => router.push('/hire')}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              color: 'var(--color-espresso)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform 0.2s',
              border: '1px solid rgba(61, 43, 31, 0.04)'
            }}
            className="hover-card"
          >
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '6px', color: 'var(--color-espresso)', letterSpacing: '0.5px' }}>HIRE GIG STAFF</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Post requirements & match verified workers in 15 mins
            </p>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <ArrowRight size={14} />
            </div>
          </div>

          <div 
            onClick={() => router.push('/work')}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              color: 'var(--color-espresso)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform 0.2s',
              border: '1px solid rgba(61, 43, 31, 0.04)'
            }}
            className="hover-card"
          >
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '6px', color: 'var(--color-espresso)', letterSpacing: '0.5px' }}>DAILY WAGES</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Escrow secure deposits, instant withdrawals & ratings
            </p>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <ArrowRight size={14} />
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .search-bar-form-premium {
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            border-radius: 20px;
          }
          .location-wrapper {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 2px solid rgba(61, 43, 31, 0.08);
            justify-content: center;
            padding-bottom: 14px !important;
          }
          .search-input-wrapper {
            width: 100% !important;
            flex-direction: column !important;
            gap: 14px !important;
            padding: 4px 0 0 0 !important;
          }
          .search-bar-form-premium select,
          .search-bar-form-premium input {
            height: 48px !important;
            width: 100% !important;
            text-align: center;
            font-size: 15px !important;
          }
          .search-bar-form-premium button {
            width: 100%;
            height: 48px;
            font-size: 15px !important;
            justify-content: center;
          }
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
