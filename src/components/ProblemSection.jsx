import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneOff, AlertTriangle, CheckCircle2, Navigation, ShieldCheck, ClipboardCheck } from 'lucide-react';

export default function ProblemSection() {
  const painPoints = [
    { icon: <MessageSquare size={20} />, text: "Manual WhatsApp group coordination" },
    { icon: <PhoneOff size={20} />, text: "No reliability or worker tracking" },
    { icon: <AlertTriangle size={20} />, text: "Frequent payment disputes" },
    { icon: <AlertTriangle size={20} />, text: "Zero proof of work execution" },
  ];

  const solutions = [
    { icon: <Navigation size={20} />, text: "Live GPS worker tracking" },
    { icon: <ShieldCheck size={20} />, text: "Secure Escrow payments" },
    { icon: <ClipboardCheck size={20} />, text: "Photo-based proof of work" },
    { icon: <CheckCircle2 size={20} />, text: "KYC-verified trusted workers" },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Stop the <span style={{ color: '#D97706' }}>WhatsApp Chaos</span>.</h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            On-ground hiring shouldn't be a gamble. We replace manual coordination with a structured operating system built for trust.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Chaos Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '48px', borderRadius: '32px', backgroundColor: '#FFF', border: '1px solid #F1F1F1' }}
          >
            <h3 style={{ fontSize: '28px', marginBottom: '32px', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '12px' }}>
              The Old Way
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {painPoints.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#6B7280', fontSize: '18px' }}>
                  <div style={{ color: '#EF4444', height: '20px' }}>{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '40px', padding: '20px', borderRadius: '16px', backgroundColor: '#FEF2F2', color: '#B91C1C', fontSize: '14px', fontWeight: '600' }}>
              "Is the worker even there? I have no way to know."
            </div>
          </motion.div>

          {/* Ziggers Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ padding: '48px', borderRadius: '32px', backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <h3 style={{ fontSize: '28px', marginBottom: '32px', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              The Ziggers Way
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {solutions.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#E5E7EB', fontSize: '18px' }}>
                  <div style={{ color: 'var(--color-secondary)', height: '20px' }}>{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '40px', padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-secondary)', fontSize: '14px', fontWeight: '600' }}>
              "Check-in verified via GPS and Photo. Payment ready."
            </div>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .section-padding > .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
