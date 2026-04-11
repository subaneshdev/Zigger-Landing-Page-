import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Github, ArrowRight, Smartphone } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#F9F7F2', paddingTop: '100px', paddingBottom: '40px' }}>
      <div className="container">
        
        {/* Main CTA in Footer */}
        <div id="waitlist" style={{ backgroundColor: 'var(--color-primary)', borderRadius: '48px', padding: '80px 40px', textAlign: 'center', marginBottom: '100px', color: 'white', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '48px', marginBottom: '24px', color: 'white' }}>Don't miss the launch.</h2>
            <p style={{ fontSize: '18px', color: '#9CA3AF', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              We're launching soon. Join 1,248+ Ziggers and be the first to know when we hit the stores.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
              <WaitlistForm />
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', opacity: 0.5 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}><Smartphone size={20} /> coming soon to App Store</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}><Smartphone size={20} /> coming soon to Play Store</div>
            </div>
          </motion.div>
          {/* Decorative Circles */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(193,154,107,0.1)' }}></div>
          <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(193,154,107,0.05)' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '80px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>Z</div>
              <span style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>ZIGGERS</span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
              The operating system for on-ground gig work. Reliable, tracked, and secure execution for every business.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '18px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
              <a href="#">For Employers</a>
              <a href="#">For Workers</a>
              <a href="#">Pricing</a>
              <a href="#">Infrastructure</a>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '18px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '18px' }}>Newsletter</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Stay updated with gig economy insights.</p>
            <div style={{ display: 'flex', padding: '4px', backgroundColor: 'white', borderRadius: '100px', border: '1px solid #E5E7EB' }}>
              <input type="email" placeholder="Email address" style={{ flex: 1, border: 'none', background: 'transparent', paddingLeft: '16px', outline: 'none', fontSize: '14px' }} />
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>© {new Date().getFullYear()} Ziggers Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px', color: 'var(--color-primary)' }}>
            <Instagram size={20} />
            <Twitter size={20} />
            <Linkedin size={20} />
            <Github size={20} />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Powered by Loop Ecosystem</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          footer .container > div:nth-child(2) { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 576px) {
          footer .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
