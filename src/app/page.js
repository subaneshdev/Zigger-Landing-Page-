"use client";
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronUp, ShieldCheck, Clock, Users, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Hero from '../components/Hero';
import NumberTicker from '../components/NumberTicker';

export default function Home() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionIndex) => {
    setOpenSection(openSection === sectionIndex ? null : sectionIndex);
  };

  const collections = [
    {
      title: 'Catering Workers',
      count: 'Explore verified gig roles and match with on-demand work portfolios',
      image: '/assets/col_catering.jpg',
      href: '/catering-jobs-chennai',
    },
    {
      title: 'Acting Drivers',
      count: 'Explore verified gig roles and match with on-demand work portfolios',
      image: '/assets/col_driver.jpg',
      href: '/driver-jobs',
    },
    {
      title: 'Delivery Partners',
      count: 'Explore verified gig roles and match with on-demand work portfolios',
      image: '/assets/col_delivery.jpg',
      href: '/jobs-in-chennai',
    },
    {
      title: 'Pamphlet Workers',
      count: 'Explore verified gig roles and match with on-demand work portfolios',
      image: '/assets/col_pamphlet.jpg',
      href: '/work',
    },
  ];

  const cities = [
    { name: 'Chennai', count: 1200, href: '/jobs-in-chennai' },
    { name: 'Bangalore', count: 850, href: '/jobs-in-bangalore' },
    { name: 'Hyderabad', count: 910, href: '/jobs-in-hyderabad' },
    { name: 'Mumbai', count: 740, href: '/jobs-in-mumbai' },
    { name: 'Delhi', count: 630, href: '/jobs-in-delhi' },
    { name: 'Coimbatore', count: 480, href: '/jobs-in-coimbatore' },
    { name: 'Pune', count: 520, href: '/jobs-in-pune' },
    { name: 'Madurai', count: 310, href: '/jobs-in-madurai' },
  ];

  const marqueeWorkers = [
    { name: 'Manoj K.', role: 'Catering Captain', rating: '4.9', payout: '₹1,800', time: 'Matched in 8 mins' },
    { name: 'Priya R.', role: 'Exhibition Promoter', rating: '5.0', payout: '₹2,200', time: 'Matched in 12 mins' },
    { name: 'Satish Kumar', role: 'Acting Driver', rating: '4.8', payout: '₹1,500', time: 'Matched in 5 mins' },
    { name: 'Arun M.', role: 'Warehouse Loader', rating: '4.9', payout: '₹1,400', time: 'Matched in 15 mins' },
    { name: 'Deepika S.', role: 'Office Assistant', rating: '5.0', payout: '₹2,000', time: 'Matched in 10 mins' },
    { name: 'Ranjith V.', role: 'Event Volunteer', rating: '4.7', payout: '₹1,200', time: 'Matched in 9 mins' }
  ];

  const hiringIntentKeywords = [
    'Hire Catering Staff Near Me', 'Need Waiters for Wedding', 'Temporary Staff for Events', 
    'Daily Wage Workers Near Me', 'Restaurant Helpers Near Me', 'Hotel Staff for One Day', 
    'Packing Helpers Near Me', 'Event Volunteers Near Me', 'Instant Staff Hiring', 
    'Last-minute Event Staff', 'Hire Helpers Today', 'Gig Jobs Near Me', 'Need Catering Staff',
    'Hire Waiters', 'Need Delivery Boys', 'Temporary Workers', 'Warehouse Labour',
    'Construction Helpers', 'Restaurant Staff', 'Housekeeping Services', 'Cleaning Workers',
    'Promoters for Exhibition', 'Security Guards Near Me', 'Event Volunteers'
  ];

  const jobIntentKeywords = [
    'Catering Jobs', 'Waiter Jobs', 'Event Jobs', 'Weekend Jobs', 'Student Jobs', 
    'Part-time Jobs', 'Hotel Jobs', 'Restaurant Jobs', 'Kitchen Helper Jobs', 
    'Warehouse Jobs', 'Delivery Jobs', 'Packing Jobs', 'Construction Jobs', 
    'Driver Jobs', 'Security Jobs', 'Promoter Jobs', 'Office Assistant Jobs', 
    'Helper Jobs', 'Daily Wage Jobs', 'One-day Jobs', 'Shift Jobs', 
    'Flexible Jobs', 'Temporary Jobs', 'Near Me Jobs', 'Part-time Job Near Me',
    'Weekend Job', 'Daily Salary Job', 'Catering Job Today', 'Waiter Job',
    'Delivery Job', 'Kitchen Helper Job', 'Student Job', 'Night Shift Job',
    'Flexible Work', 'One-day Job', 'Temporary Job', 'Daily Wage Job'
  ];

  const cityCombos = [
    'Catering Jobs in Chennai', 'Part-time Jobs in Bangalore', 'Event Staff in Hyderabad', 
    'Hire Waiters in Chennai', 'Temporary Workers in Coimbatore', 'Delivery Jobs in Mumbai', 
    'Security Guards in Delhi', 'Construction Workers in Madurai', 'Student Jobs in Tamil Nadu'
  ];

  return (
    <main style={{ backgroundColor: '#ffffff', color: '#1c1c1c', fontFamily: 'var(--font-body)' }}>
      <Hero />

      {/* Magic UI-style Infinite Testimony/Workers Marquee */}
      <section style={{ padding: '40px 0', backgroundColor: '#ffffff', overflow: 'hidden', borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px', textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-gold)', letterSpacing: '1.5px' }}>
            Live Gig Transactions
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-espresso)', marginTop: '4px' }}>
            Verified matches & instant payouts near you
          </h2>
        </div>

        <div style={{ display: 'flex', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div className="marquee-content" style={{ display: 'flex', gap: '20px', animation: 'scrollMarquee 25s linear infinite' }}>
            {[...marqueeWorkers, ...marqueeWorkers].map((worker, index) => (
              <div
                key={index}
                style={{
                  flexShrink: 0,
                  width: '280px',
                  backgroundColor: 'var(--color-linen)',
                  border: '1px solid rgba(61, 43, 31, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-espresso)', fontSize: '15px' }}>{worker.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: 'var(--color-gold)', fontWeight: 700 }}>
                    <Star size={12} fill="var(--color-gold)" /> {worker.rating}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-muted)', fontWeight: 600 }}>{worker.role}</div>
                <hr style={{ border: 'none', borderTop: '1px dashed rgba(61, 43, 31, 0.1)', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>Paid {worker.payout} via UPI</span>
                  <span style={{ color: 'var(--color-muted)' }}>{worker.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zomato-style "Collections" Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1c1c1c', marginBottom: '8px' }}>Collections</h2>
          <p style={{ fontSize: '15px', color: '#686b78', marginBottom: '24px' }}>
            Explore verified gig roles and match with on-demand work portfolios
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }} className="collections-grid">
            {collections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'block',
                  textDecoration: 'none'
                }}
                className="collection-card"
              >
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s ease'
                }} className="card-bg-img" />

                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 100%)',
                  zIndex: 2
                }} />

                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  zIndex: 3,
                  color: '#ffffff'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{item.title}</h3>
                  <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.85 }}>
                    {item.count} <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zomato-style "Popular Localities" Grid with Magic UI NumberTicker */}
      <section style={{ padding: '40px 0 60px', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#1c1c1c', marginBottom: '24px' }}>
            Popular regions in India
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }} className="localities-grid">
            {cities.map((city) => (
              <Link
                key={city.name}
                href={city.href}
                style={{
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0px 1px 4px rgba(0,0,0,0.02)',
                  transition: 'box-shadow 0.2s, border 0.2s'
                }}
                className="locality-card"
              >
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1c1c1c', marginBottom: '4px' }}>
                    {city.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#686b78', fontWeight: 700 }}>
                    <NumberTicker value={city.count} />+ gigs
                  </span>
                </div>
                <ChevronRight size={18} color="#1c1c1c" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zomato-style Banner Features Section (Border Beam Effect on Image container) */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--color-linen)' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }} className="features-grid">
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
              Why Ziggers
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Verified Staffing Marketplace
            </h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', color: 'var(--color-gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '4px' }}>KYC Verified Workers</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Every gig worker completes digital identity check and background check before picking shifts.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', color: 'var(--color-gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '4px' }}>15-Minute Staff Matching</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Post a temporary job requirement, set headcount, and get nearby staff matched instantly.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', color: 'var(--color-gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '4px' }}>Real-time GPS Tracking</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Monitor check-ins, check-outs, and live tracking of workforce directly from the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="border-beam-container" style={{
              width: '240px',
              height: '480px',
              borderRadius: '36px',
              border: '6px solid var(--color-espresso)',
              background: '#ffffff',
              boxShadow: 'var(--shadow-strong)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src="/assets/screen-hire-talent.png" 
                alt="Ziggers App Interface" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zomato-style Dynamic FAQ and SEO Accordions */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#1c1c1c', marginBottom: '24px' }}>
            Explore options near me
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ border: '1px solid #e8e8e8', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <button
                onClick={() => toggleSection(0)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#1c1c1c',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                Popular hiring searches near me
                {openSection === 0 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSection === 0 && (
                <div style={{ padding: '0 24px 24px', color: '#686b78', fontSize: '14px', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
                    {hiringIntentKeywords.map((keyword, i) => (
                      <Link key={i} href="/hire" style={{ color: '#686b78', textDecoration: 'none' }} className="seo-tag">
                        {keyword} <span style={{ color: '#d3d3d3', marginLeft: '4px' }}>•</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ border: '1px solid #e8e8e8', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <button
                onClick={() => toggleSection(1)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#1c1c1c',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                Popular job searches near me
                {openSection === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSection === 1 && (
                <div style={{ padding: '0 24px 24px', color: '#686b78', fontSize: '14px', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
                    {jobIntentKeywords.map((keyword, i) => (
                      <Link key={i} href="/work" style={{ color: '#686b78', textDecoration: 'none' }} className="seo-tag">
                        {keyword} <span style={{ color: '#d3d3d3', marginLeft: '4px' }}>•</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ border: '1px solid #e8e8e8', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <button
                onClick={() => toggleSection(2)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#1c1c1c',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                Popular city & role combinations
                {openSection === 2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSection === 2 && (
                <div style={{ padding: '0 24px 24px', color: '#686b78', fontSize: '14px', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
                    {cityCombos.map((keyword, i) => (
                      <Link key={i} href="/work" style={{ color: '#686b78', textDecoration: 'none' }} className="seo-tag">
                        {keyword} <span style={{ color: '#d3d3d3', marginLeft: '4px' }}>•</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .collection-card:hover .card-bg-img {
          transform: scale(1.05);
        }
        .locality-card:hover {
          box-shadow: 0px 4px 12px rgba(28, 28, 28, 0.08) !important;
          border: 1px solid #d3d3d3 !important;
        }
        .seo-tag:hover {
          color: var(--color-gold) !important;
          text-decoration: underline !important;
        }
        .border-beam-container::after {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          background-size: 200% 100%;
          animation: borderBeam 4s linear infinite;
          border-radius: 36px;
          z-index: -1;
          pointer-events: none;
        }
        @keyframes borderBeam {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 768px) {
          .collections-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .localities-grid {
            grid-template-columns: 1fr !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
