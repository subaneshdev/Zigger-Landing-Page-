import React from 'react';
import { motion } from 'framer-motion';
import { Map, Shield, Camera, Users, Target, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Live GPS Footprints",
      desc: "Track your local workforce on an interactive live map. Real-time workforce management for on-demand staffing and event staffing.",
      icon: <Map />,
      color: "#F6F1EB",
      size: "large"
    },
    {
      title: "Secure Escrows",
      desc: "Lock funds safely. Payments are only released to the worker once you approve the completed task proof.",
      icon: <Shield />,
      color: "#EDE8DF",
      size: "small"
    },
    {
      title: "Proof of Work",
      desc: "Anti-tamper, geofenced milestone photographs uploaded by workers on the spot. Verifiable truth in seconds.",
      icon: <Camera />,
      color: "#F6F1EB",
      size: "small"
    },
    {
      title: "KYC Verified Workers",
      desc: "Every gig worker undergoes biometric Aadhaar verification, address checks, and bank-account audits before AI job matching.",
      icon: <Users />,
      color: "#EDE8DF",
      size: "small"
    },
    {
      title: "AI Match Engine",
      desc: "Smart matching instantly links your gig jobs with verified gig workers based on distance, category history, and trust rank.",
      icon: <Target />,
      color: "#F6F1EB",
      size: "small"
    },
    {
      title: "10-Min Backfill Safety Net",
      desc: "If a worker falls sick or defaults, our smart ecosystem automatically dispatches a trained backup nearby. Your ground operations never stop.",
      icon: <Zap />,
      color: "#EDE8DF",
      size: "large"
    }
  ];

  return (
    <section id="features" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: '12px' }}>Built for <span style={{ color: 'var(--color-gold)' }}>Temporary Staffing</span>.</h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', maxWidth: '560px', margin: '0 auto' }}>
            India's instant staffing platform with AI hiring, verified workers, and workforce automation for flawless on-ground execution.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`feature-card ${feature.size}`}
              style={{
                backgroundColor: feature.color,
                padding: '28px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  backgroundColor: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '24px',
                  color: 'var(--color-primary)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}>
                  {React.cloneElement(feature.icon, { size: 28 })}
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: '1.55' }}>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 260px;
          gap: 16px;
        }
        .feature-card.large {
          grid-column: span 2;
        }
        @media (max-width: 992px) {
          .features-grid { grid-template-columns: 1fr 1fr; }
          .feature-card.large { grid-column: span 1; }
        }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
        }
      `}</style>
    </section>
  );
}
