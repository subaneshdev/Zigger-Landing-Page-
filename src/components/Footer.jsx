"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSectionIdFromHref, scrollToSection } from '../lib/scrollToSection';
import { getAppOpenHref, isMobile, openAppOrPlayStore } from '../lib/appLink';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

function SectionLink({ to, children, style }) {
  const pathname = usePathname();
  const router = useRouter();
  const sectionId = getSectionIdFromHref(to);

  if (!sectionId) {
    return <Link href={to} style={style}>{children}</Link>;
  }

  return (
    <a
      href={to}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== '/') {
          localStorage.setItem('scrollToSection', sectionId);
          router.push('/');
        } else {
          window.history.pushState(null, '', to);
          scrollToSection(sectionId);
        }
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const router = useRouter();
  
  const handleDownloadClick = (e) => {
    if (isMobile()) {
      openAppOrPlayStore(e);
    } else {
      window.open(getAppOpenHref(), '_blank', 'noopener,noreferrer');
    }
  };

  const cities = [
    { name: 'Bangalore', href: '/jobs-in-bangalore' },
    { name: 'Chennai', href: '/jobs-in-chennai' },
    { name: 'Hyderabad', href: '/jobs-in-hyderabad' },
    { name: 'Delhi', href: '/jobs-in-delhi' },
    { name: 'Mumbai', href: '/jobs-in-mumbai' },
    { name: 'Pune', href: '/jobs-in-pune' },
  ];

  return (
    <footer style={{ backgroundColor: '#f0f0f5', color: '#02060c', paddingTop: '64px', paddingBottom: '48px', fontFamily: 'var(--font-body)' }}>
      <div className="container">
        
        {/* Swiggy-like Multi-column Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.2fr', 
          gap: '40px', 
          marginBottom: '56px' 
        }} className="footer-grid">
          
          {/* Logo & Copyright */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--color-espresso)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '16px',
                }}
              >
                Z
              </div>
              <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--color-espresso)' }}>Ziggers</span>
            </div>
            <p style={{ color: '#686b78', fontSize: '15px', marginBottom: '8px' }}>
              © {new Date().getFullYear()} Ziggers Limited
            </p>
            <p style={{ fontSize: '13px', color: '#686b78' }}>
              An <a href="https://www.unfounded.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 'bold' }}>Unfounded</a> Company
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              <SectionLink to="/" style={{ color: '#686b78', textDecoration: 'none' }}>About Us</SectionLink>
              <SectionLink to="/" style={{ color: '#686b78', textDecoration: 'none' }}>Ziggers Corporate</SectionLink>
              <SectionLink to="/" style={{ color: '#686b78', textDecoration: 'none' }}>Careers</SectionLink>
              <SectionLink to="/" style={{ color: '#686b78', textDecoration: 'none' }}>Team</SectionLink>
            </div>
          </div>

          {/* Contact us */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Contact us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              <a href="mailto:hello@unfounded.in" style={{ color: '#686b78', textDecoration: 'none' }}>Help & Support</a>
              <Link href="/work" style={{ color: '#686b78', textDecoration: 'none' }}>Partner With Us</Link>
              <Link href="/hire" style={{ color: '#686b78', textDecoration: 'none' }}>Ride With Us</Link>
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginTop: '36px', marginBottom: '20px' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              <Link href="/terms" style={{ color: '#686b78', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/privacy" style={{ color: '#686b78', textDecoration: 'none' }}>Cookie Policy</Link>
              <Link href="/privacy" style={{ color: '#686b78', textDecoration: 'none' }}>Privacy Policy</Link>
            </div>
          </div>

          {/* Available in: */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Available in:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              {cities.map((city) => (
                <Link key={city.name} href={city.href} style={{ color: '#686b78', textDecoration: 'none' }}>
                  {city.name}
                </Link>
              ))}
              
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 12px',
                border: '1.5px solid #d3d3d3',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#686b78',
                fontWeight: 700,
                width: 'fit-content',
                cursor: 'pointer',
                marginTop: '8px'
              }}
              onClick={() => router.push('/work')}
              >
                8 cities <span style={{ marginLeft: '6px', fontSize: '10px' }}>▼</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Social Links</h4>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', color: '#02060c' }}>
              <a href="https://www.linkedin.com/company/ziggers" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/ziggers.in?igsh=MXIwcXdqcWs0Z3gx" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Instagram size={20} /></a>
              <a href="https://www.facebook.com/share/1MVoXCTfP7/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Facebook size={20} /></a>
            </div>
            <div style={{ marginTop: '16px' }}>
              <img 
                src="/assets/mascot_winking.jpg" 
                alt="Ziggers Mascot Winking Bee - On-Demand Staffing Companion" 
                style={{ 
                  height: '110px', 
                  width: 'auto',
                  mixBlendMode: 'multiply',
                  display: 'block'
                }} 
              />
            </div>
          </div>

        </div>

        {/* Bottom Download Banner */}
        <div style={{ 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)', 
          paddingTop: '36px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '24px' 
        }}>
          <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800, color: '#02060c', letterSpacing: '-0.02em' }}>
            For better experience, download the Ziggers app now
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* StartupBase badge */}
            <a href="https://startupbase.io/products/ziggers?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-light" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://statics.startupbase.io/site/badges/launched-on-sb.svg" 
                alt="Launched on StartupBase" 
                style={{ height: '42px', width: 'auto' }} 
              />
            </a>
            {/* App Store badge */}
            <a href="#" onClick={handleDownloadClick} style={{ display: 'inline-block' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download Ziggers App on Apple App Store for iOS Gigs & Hiring" 
                style={{ height: '42px', borderRadius: '6px' }}
              />
            </a>
            {/* Play Store badge */}
            <a href="#" onClick={handleDownloadClick} style={{ display: 'inline-block' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get Ziggers App on Google Play Store for Android Gig Jobs" 
                style={{ height: '42px', borderRadius: '6px' }}
              />
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
