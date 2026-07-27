import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, Users, ShieldCheck } from 'lucide-react';
import { fetchPlatformStats } from '../lib/ziggersData';

export default function TrustSection() {
  const [stats, setStats] = useState({
    verifiedWorkers: 2,
    totalWorkers: 2,
    totalEmployers: 1,
    totalCompleted: 0,
    trustScore: 100,
  });

  useEffect(() => {
    fetchPlatformStats()
      .then(setStats)
      .catch(() => {});
  }, []);

  const displayStats = [
    { label: 'KYC Verified Gig Workers', val: `${stats.verifiedWorkers}`, icon: <ShieldAlert size={22} /> },
    { label: 'Registered Gig Workers', val: `${stats.totalWorkers}`, icon: <Users size={22} /> },
    { label: 'Registered Employers', val: `${stats.totalEmployers}`, icon: <Award size={22} /> },
    { label: 'Gig Jobs Completed', val: `${stats.totalCompleted}`, icon: <ShieldCheck size={22} /> },
  ];

  return (
    <section id="trust" className="section-padding" style={{ backgroundColor: 'var(--color-espresso)', color: 'white', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }} className="trust-grid">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: '16px', color: 'white' }}>
              100% <span style={{ color: 'var(--color-gold)' }}>Verified Workers.</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.6 }}>
              Every gig worker and employer on our workforce marketplace goes through verification. Verified workers, real flexible work — no fakes, no strangers.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {displayStats.map((stat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--color-gold)' }}>{stat.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '22px', color: 'white', marginBottom: '2px' }}>{stat.val}</h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div style={{ padding: '32px', borderRadius: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,160,82,0.2)' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-gold)' }}>{stats.trustScore}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Average Trust Score
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Identity verification', 'Bank audit', 'Live GPS tracking'].map((label, i) => (
                  <div key={label} style={{ height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${85 + i * 5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                      style={{ height: '100%', background: 'var(--color-gold)', opacity: 0.7 + i * 0.1 }}
                    />
                  </div>
                ))}
              </div>

              <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                Safety first — always
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .trust-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
