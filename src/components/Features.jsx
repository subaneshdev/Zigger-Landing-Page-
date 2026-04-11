import React from 'react';
import { motion } from 'framer-motion';
import { Map, Shield, Camera, Users, Target, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Live GPS Tracking",
      desc: "Real-time location updates for every worker on the ground. Know exactly where your manpower is.",
      icon: <Map />,
      color: "#E0F2FE", // Blue tint
      size: "large"
    },
    {
      title: "Escrow Payments",
      desc: "Secure funds before work starts. Payments are only released upon your approval.",
      icon: <Shield />,
      color: "#FEF3C7", // Amber tint
      size: "small"
    },
    {
      title: "Proof of Work",
      desc: "Mandatory entry/exit photos and periodic progress updates.",
      icon: <Camera />,
      color: "#DCFCE7", // Green tint
      size: "small"
    },
    {
      title: "KYC Verified",
      desc: "Every Zigger undergoes identity and bank verification before joining the platform.",
      icon: <Users />,
      color: "#F3E8FF", // Purple tint
      size: "small"
    },
    {
      title: "Matching Engine",
      desc: "AI-driven matching based on location, category, and historical reliability scores.",
      icon: <Target />,
      color: "#FFEDD5", // Orange tint
      size: "small"
    },
    {
      title: "Instant Scaling",
      desc: "Need 50 workers by tomorrow? Our platform handles bulk hiring with ease.",
      icon: <Zap />,
      color: "#F1F5F9", // Slate tint
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
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Built for <span style={{ color: 'var(--color-secondary)' }}>Reliability</span>.</h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We've integrated every tool needed to ensure your on-ground execution is flawless and stress-free.
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
                padding: '40px',
                borderRadius: '32px',
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
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 320px;
          gap: 24px;
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
