import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { gsap } from 'gsap';
import PlayStoreButton from './PlayStoreButton';
import { fetchPlatformStats } from '../lib/ziggersData';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -40]);
  const y2 = useTransform(scrollY, [0, 500], [0, 25]);

  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const phoneRef = useRef(null);

  const [stats, setStats] = useState({ totalWorkers: 2, totalPosted: 0 });

  useEffect(() => {
    fetchPlatformStats()
      .then(setStats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo(phoneRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.5');
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, var(--color-linen) 0%, #fff 100%)',
        overflow: 'hidden',
        paddingTop: 'calc(var(--header-height) + 40px)',
        paddingBottom: '56px',
        minHeight: 'auto',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,160,82,0.1) 0%, transparent 70%)',
          y: y2,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
          <div>
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  backgroundColor: 'var(--color-espresso)',
                  color: 'var(--color-gold)',
                  fontWeight: 700,
                  fontSize: '11px',
                  marginBottom: '20px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
                Now live on Google Play
              </div>
            </div>

            <h1
              ref={titleRef}
              style={{
                fontSize: 'clamp(30px, 4.2vw, 46px)',
                marginBottom: '16px',
                opacity: 0,
                lineHeight: 1.12,
              }}
            >
              Find gig jobs. Get paid. <span style={{ color: 'var(--color-gold)' }}>Today.</span>
            </h1>

            <div ref={subtitleRef} style={{ opacity: 0 }}>
              <p style={{ fontSize: '16px', color: 'var(--color-muted)', marginBottom: '24px', maxWidth: '480px', lineHeight: 1.6 }}>
                India's AI-powered gig marketplace — hire gig workers in 15 minutes, find part-time and daily wage jobs nearby, and get paid same-day via UPI.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <div style={{ padding: '8px 14px', borderRadius: '100px', background: '#fff', border: '1px solid rgba(61,43,31,0.08)', fontSize: '12px', fontWeight: 600 }}>
                  {stats.totalWorkers}+ gig workers registered
                </div>
                <div style={{ padding: '8px 14px', borderRadius: '100px', background: '#fff', border: '1px solid rgba(61,43,31,0.08)', fontSize: '12px', fontWeight: 600 }}>
                  {stats.totalPosted}+ gig jobs posted
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--color-muted)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Explore on the web
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link to="/work" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    Browse jobs
                  </Link>
                  <Link to="/hire" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    Hire
                  </Link>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <PlayStoreButton label="Download on Google Play" size="lg" />
              </div>
            </div>
          </div>

          <motion.div
            ref={phoneRef}
            className="hero-phone-wrap"
            style={{
              opacity: 0,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <motion.div style={{ y: y1 }}>
              <div
                style={{
                  width: '280px',
                  height: '580px',
                  borderRadius: '40px',
                  border: '8px solid var(--color-espresso)',
                  background: 'var(--color-espresso)',
                  boxShadow: 'var(--shadow-strong)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src="/assets/screen-hire-talent.png"
                  alt="Ziggers gig marketplace app — find gig jobs near you"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '32px',
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '-24px',
                background: '#fff',
                borderRadius: '16px',
                padding: '14px 16px',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid rgba(61,43,31,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minWidth: '160px',
              }}
            >
              <Smartphone size={18} color="var(--color-gold)" />
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>Available now</p>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', margin: 0 }}>Google Play</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-phone-wrap {
            margin: 8px auto 0;
          }
        }
      `}</style>
    </section>
  );
}
