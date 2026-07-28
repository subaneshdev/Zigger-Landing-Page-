"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Search, Download } from 'lucide-react';
import { getAppOpenHref, isMobile, openAppOrPlayStore } from '../lib/appLink';

export default function MobileStickyCTA() {
  const router = useRouter();

  const handleDownloadClick = (e) => {
    if (isMobile()) {
      openAppOrPlayStore(e);
    } else {
      window.open(getAppOpenHref(), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="mobile-sticky-cta"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(61, 43, 31, 0.08)',
        boxShadow: '0 -4px 20px rgba(61, 43, 31, 0.06)',
        zIndex: 90,
        display: 'none', // Managed by media query below
        padding: '12px 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}
    >
      <button
        onClick={() => router.push('/work')}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-linen)',
          color: 'var(--color-espresso)',
          padding: '12px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Search size={16} color="var(--color-gold)" />
        <span>Find Jobs</span>
      </button>

      <button
        onClick={() => router.push('/hire')}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-espresso)',
          color: '#ffffff',
          padding: '12px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Briefcase size={16} />
        <span>Hire Staff</span>
      </button>

      <button
        onClick={handleDownloadClick}
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-gold)',
          color: '#ffffff',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0
        }}
        aria-label="Download App"
      >
        <Download size={18} />
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta {
            display: flex !important;
          }
          /* Prevent page content from being hidden behind sticky bar */
          body {
            padding-bottom: 70px !important;
          }
        }
      `}</style>
    </div>
  );
}
