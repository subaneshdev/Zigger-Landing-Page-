import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Download, Star } from 'lucide-react';
import { gsap } from 'gsap';
import WaitlistForm from './WaitlistForm';
import AppShowcase from './AppShowcase';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);

  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Staggered entrance animation for an ultra-premium feel
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.1 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 50, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, delay: -0.8 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: -0.9 }
    )
    .fromTo(showcaseRef.current,
      { opacity: 0, scale: 0.9, rotateX: 20 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 1.4, delay: -1 }
    );
  }, []);

  return (
    <section className="hero-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      background: 'linear-gradient(to bottom, #F4ECE6 0%, #FAF6F2 45%, #ffffff 100%)', 
      color: 'var(--color-primary)', 
      overflow: 'hidden',
      paddingTop: '120px',
      paddingBottom: '60px'
    }}>
      {/* Abstract Background Shapes */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '10%', 
          right: '-5%', 
          width: '600px', 
          height: '600px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(193,154,107,0.2) 0%, transparent 70%)',
          y: y2
        }} 
      />
      <motion.div 
        style={{ 
          position: 'absolute', 
          bottom: '5%', 
          left: '-10%', 
          width: '400px', 
          height: '400px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(193,154,107,0.15) 0%, transparent 70%)',
          y: y1
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
          
          <div>
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', backgroundColor: 'var(--color-surface)', border: '1px solid rgba(41, 33, 27, 0.1)', color: 'var(--color-accent)', fontWeight: '700', fontSize: '12px', marginBottom: '32px', letterSpacing: '1px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'inline-block' }}></span>
                ⚡ TRUSTED BY 1,200+ OPERATIONS TEAMS
              </div>
            </div>
            
            <h1 
              ref={titleRef} 
              style={{ 
                fontSize: '72px', 
                color: 'var(--color-primary)', 
                marginBottom: '32px', 
                lineHeight: 0.95,
                opacity: 0,
                fontFamily: 'var(--font-heading)'
              }}
            >
              Verified Gig Workers at Your Location in <span style={{ color: 'var(--color-accent)' }}>15 Minutes</span>.
            </h1>
            
            <div ref={subtitleRef} style={{ opacity: 0 }}>
              <p style={{ fontSize: '20px', color: 'var(--color-text-muted)', marginBottom: '48px', maxWidth: '650px', lineHeight: 1.5 }}>
                Need 5 event hosts by 9 AM? Or 20 delivery riders right now? Stop scrolling chaotic WhatsApp groups. Book background-verified, on-ground Ziggers instantly with secure escrow protections.
              </p>
              
              <div style={{ marginBottom: '48px' }}>
                <h4 style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '700' }}>Join the waitlist for instant operational relief</h4>
                <WaitlistForm />
              </div>

              <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '4px', color: '#D97706' }}>
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: '600' }}>“No more morning coordinator stress. They just show up.”</p>
              </div>
            </div>
          </div>

          <div
            ref={showcaseRef}
            style={{ position: 'relative', opacity: 0 }}
          >
            <motion.div style={{ y: y1 }}>
              <AppShowcase />
            </motion.div>

            {/* Snabbit-Inspired Floating Card 1: ETA Progress */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '-50px',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '16px',
                boxShadow: '0 15px 35px rgba(41, 33, 27, 0.12)',
                border: '1px solid rgba(41, 33, 27, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                minWidth: '190px'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)'
              }}>
                <Smartphone size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-primary)', margin: 0, textTransform: 'uppercase' }}>Zigger deployed</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '2px 0 6px' }}>ETA: ~15 minutes</p>
                <div style={{ height: '4px', width: '100%', backgroundColor: '#EFEAE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div 
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    style={{ height: '100%', backgroundColor: 'var(--color-accent)' }} 
                  />
                </div>
              </div>
            </motion.div>

            {/* Snabbit-Inspired Floating Card 2: Rating Capsule */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                position: 'absolute',
                top: '40px',
                right: '-50px',
                backgroundColor: '#ffffff',
                borderRadius: '50px',
                padding: '10px 20px',
                boxShadow: '0 15px 35px rgba(41, 33, 27, 0.12)',
                border: '1px solid rgba(41, 33, 27, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10
              }}
            >
              <Star size={16} fill="#D97706" color="#D97706" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-primary)' }}>4.9 Rated</span>
                <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>12k+ Shifts Done</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .hero-section > .container > div { grid-template-columns: 1fr !important; }
          h1 { font-size: 52px !important; }
        }
      `}</style>
    </section>
  );
}
