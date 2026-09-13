"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSectionIdFromHref, scrollToSection } from '../lib/scrollToSection';
import { getAppOpenHref, isMobile, openAppOrPlayStore } from '../lib/appLink';
import { Linkedin, Instagram, Facebook, Twitter, Mail, Phone, MapPin, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

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
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
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

  const popularCategories = [
    { name: 'Gig Jobs', href: '/gig-jobs' },
    { name: 'Gig Jobs App', href: '/gig-jobs-app' },
    { name: 'Catering Jobs', href: '/catering-jobs' },
    { name: 'Waiter Jobs', href: '/waiter-jobs' },
    { name: 'Driver Jobs', href: '/driver-jobs' },
    { name: 'Event Staff', href: '/event-staff' },
    { name: 'Delivery Jobs', href: '/delivery-jobs' },
    { name: 'Warehouse Jobs', href: '/warehouse-workers' },
  ];


  return (
    <footer style={{ backgroundColor: '#f0f0f5', color: '#02060c', paddingTop: '64px', paddingBottom: '48px', fontFamily: 'var(--font-body)' }}>
      <div className="container">
        
        {/* Swiggy-like Multi-column Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.2fr 1.2fr', 
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
            <p style={{ fontSize: '12px', color: '#888896', marginTop: '16px', lineHeight: '1.5' }}>
              Looking for Zigger or Giggers? Ziggers is the intended platform when users search for gig work under that phonetically similar name. Whether you spell it Zigger, Ziggers, or Giggers, we are India's premier platform for reliable temporary staffing and daily wage gigs.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              <a href="https://www.unfounded.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#686b78', textDecoration: 'none' }}>About Us</a>
              <a href="https://www.unfounded.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#686b78', textDecoration: 'none' }}>Ziggers Corporate</a>
              <a href="https://www.unfounded.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#686b78', textDecoration: 'none' }}>Careers</a>
              <Link href="/team" style={{ color: '#686b78', textDecoration: 'none' }}>Team</Link>
            </div>
          </div>

          {/* Contact us */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Contact us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#686b78',
                  fontSize: '15px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-espresso)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#686b78'}
              >
                Help &amp; Support
              </button>
              <Link href="/partner" style={{ color: '#686b78', textDecoration: 'none' }}>Become a Community Partner</Link>
              <Link href="/influencer" style={{ color: '#686b78', textDecoration: 'none' }}>Become an Influencer Partner</Link>
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
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginTop: '36px', marginBottom: '20px' }}>Popular Roles</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              {popularCategories.map((cat) => (
                <Link key={cat.name} href={cat.href} style={{ color: '#686b78', textDecoration: 'none' }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Blogs */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#02060c', marginBottom: '20px' }}>Recent Blogs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
              {BLOG_POSTS.slice(0, 5).map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.id}`} 
                  style={{ 
                    color: '#686b78', 
                    textDecoration: 'none',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                  title={post.title}
                >
                  {post.title}
                </Link>
              ))}
              <Link href="/blog" style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 'bold', marginTop: '4px' }}>
                View All Blogs →
              </Link>
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
            {/* Startup Inspire badge */}
            <a href="https://www.startupinspire.com" target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://www.startupinspire.com/images/badge_3.svg" 
                alt="Featured on Startup Inspire" 
                style={{ height: '42px', width: 'auto' }} 
              />
            </a>
            {/* Startup Fame badge */}
            <a href="https://startupfa.me/s/ziggers?utm_source=www.ziggers.in" target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://startupfa.me/badges/featured/light.webp" 
                alt="ziggers.in - Featured on Startup Fame" 
                style={{ height: '42px', width: 'auto' }} 
              />
            </a>
            {/* F6S badge */}
            <a href="https://www.f6s.com/ziggers" target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://www.vectorlogo.zone/logos/f6s/f6s-ar21.svg" 
                alt="Featured on F6S" 
                style={{ height: '42px', width: 'auto', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
              />
            </a>
            {/* Product Hunt badge */}
            <a href="https://www.producthunt.com/products/ziggers?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-ziggers" target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1211369&theme=light&t=1785492962316" 
                alt="Ziggers - India's marketplace for flexible local work. | Product Hunt" 
                style={{ height: '42px', width: 'auto' }} 
              />
            </a>
            {/* PeerPush badge */}
            <a href="https://peerpush.com/p/ziggers" target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://peerpush.com/p/ziggers/badge.png" 
                alt="Ziggers on PeerPush" 
                style={{ height: '42px', width: 'auto' }} 
              />
            </a>
            {/* PostYourStartup badge */}
            <a href="https://postyourstartup.co/startup/ziggers-1?ref=badge" target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="https://postyourstartup.co/api/badge/ziggers-1?theme=dark" 
                alt="Featured on PostYourStartup" 
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

      {/* Help & Support Modal */}
      {isSupportModalOpen && (
        <div 
          onClick={() => setIsSupportModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px 24px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSupportModalOpen(false)}
              aria-label="Close Help & Support"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(61, 43, 31, 0.06)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-espresso)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(61, 43, 31, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(61, 43, 31, 0.06)'}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(198, 146, 59, 0.12)',
                color: 'var(--color-gold)',
                marginBottom: '12px'
              }}>
                <Phone size={22} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>
                Help &amp; Support
              </h3>
              <p style={{ fontSize: '13px', color: '#686b78', margin: '4px 0 0', lineHeight: 1.5 }}>
                Reach out to our support team directly for shifts, payouts, or hiring assistance.
              </p>
            </div>

            {/* Contact Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
              {/* Email */}
              <a
                href="mailto:hello@unfounded.in"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(61, 43, 31, 0.03)',
                  border: '1px solid rgba(61, 43, 31, 0.08)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(61, 43, 31, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  flexShrink: 0
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#888896', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Email
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-espresso)', marginTop: '2px' }}>
                    hello@unfounded.in
                  </div>
                </div>
              </a>

              {/* Mobile Phone */}
              <a
                href="tel:+919499008993"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(61, 43, 31, 0.03)',
                  border: '1px solid rgba(61, 43, 31, 0.08)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(61, 43, 31, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  flexShrink: 0
                }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#888896', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Mobile Number
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-espresso)', marginTop: '2px' }}>
                    94990 08993
                  </div>
                </div>
              </a>

              {/* By Post */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(61, 43, 31, 0.03)',
                  border: '1px solid rgba(61, 43, 31, 0.08)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  flexShrink: 0
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#888896', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    By Post
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-espresso)', marginTop: '3px' }}>
                    Ziggers / Unfounded.in
                  </div>
                  <div style={{ fontSize: '13px', color: '#686b78', marginTop: '2px', lineHeight: 1.45 }}>
                    No. 1 Shanthinikenthan Colony Extension, Madambakkam<br />
                    Chennai, Tamil Nadu 600126<br />
                    India
                  </div>
                </div>
              </div>
            </div>

            {/* Tap Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <a
                href="mailto:hello@unfounded.in"
                style={{
                  backgroundColor: 'var(--color-espresso)',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Mail size={15} />
                <span>Email Us</span>
              </a>
              <a
                href="tel:+919499008993"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={15} />
                <span>Call 94990 08993</span>
              </a>
            </div>
          </div>
        </div>
      )}

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
