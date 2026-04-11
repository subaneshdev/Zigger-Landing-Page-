import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, Globe, Heart } from 'lucide-react';

export default function TrustSection() {
  const stats = [
    { label: "Identity Verified", val: "100%", icon: <ShieldAlert size={24} /> },
    { label: "Cities Covered", val: "25+", icon: <Globe size={24} /> },
    { label: "Successful Gigs", val: "150k+", icon: <Award size={24} /> },
    { label: "Happy Employers", val: "5k+", icon: <Heart size={24} /> },
  ];

  return (
    <section id="trust" className="section-padding" style={{ backgroundColor: 'var(--color-primary)', color: 'white', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '48px', marginBottom: '24px', color: 'white' }}>Trusted by Thousands. <br/><span style={{ color: 'var(--color-secondary)' }}>Secured by Ziggers.</span></h2>
            <p style={{ fontSize: '18px', color: '#9CA3AF', marginBottom: '40px' }}>
              We've built a multi-layered trust ecosystem to ensure that every handshake on our platform lead to a successful outcome. Our tech stack is designed to defend against uncertainty.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {stats.map((stat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--color-secondary)' }}>{stat.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '24px', color: 'white' }}>{stat.val}</h4>
                    <p style={{ fontSize: '14px', color: '#9CA3AF' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div className="glass" style={{ padding: '40px', borderRadius: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,0.1)' }}>
               {/* A visual representation of a "Trust Score" card */}
               <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{ fontSize: '64px', fontWeight: '800', color: 'var(--color-secondary)' }}>98.5</div>
                  <div style={{ fontSize: '16px', color: '#9CA3AF', fontWeight: '600', letterSpacing: '2px' }}>PLATFORM TRUST INDEX</div>
               </div>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${80 + i*5}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i*0.2 }}
                        style={{ height: '100%', background: 'var(--color-secondary)', opacity: 0.6 + i*0.1 }}
                      />
                    </div>
                  ))}
               </div>
               
               <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ padding: '12px 24px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>
                    POW PROTOCOL ACTIVE
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .section-padding > .container > div { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
}
