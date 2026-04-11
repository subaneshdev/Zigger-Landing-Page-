import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Download, Star } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import AppShowcase from './AppShowcase';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section className="hero-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      backgroundColor: 'var(--color-primary)', 
      color: 'white', 
      overflow: 'hidden',
      paddingTop: '100px'
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
          background: 'radial-gradient(circle, rgba(193,154,107,0.15) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(193,154,107,0.1) 0%, transparent 70%)',
          y: y1
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-secondary)', fontWeight: '600', fontSize: '14px', marginBottom: '32px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', display: 'inline-block' }}></span>
              COMING SOON TO APP STORE & PLAY STORE
            </div>
            
            <h1 style={{ fontSize: '72px', color: 'white', marginBottom: '32px', lineHeight: 0.95 }}>
              The Operating System for <span style={{ color: 'var(--color-secondary)' }}>On-Ground</span> Work.
            </h1>
            
            <p style={{ fontSize: '22px', color: '#9CA3AF', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.5 }}>
              Reliable hiring. Live tracking. Secure escrow. Be the first to transform your manual coordination into 100% structured execution.
            </p>
            
            <div style={{ marginBottom: '48px' }}>
              <h4 style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>Join the waitlist for early access</h4>
              <WaitlistForm />
            </div>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '4px', color: '#FCD34D' }}>
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <p style={{ fontSize: '14px', color: '#9CA3AF' }}>“Finally, a professional way to manage event staff.”</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <motion.div style={{ y: y1 }}>
              <AppShowcase />
            </motion.div>
          </motion.div>

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
