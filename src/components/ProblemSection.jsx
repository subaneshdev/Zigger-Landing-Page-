import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneOff, AlertTriangle, CheckCircle2, Navigation, ShieldCheck, ClipboardCheck } from 'lucide-react';

export default function ProblemSection() {
  const painPoints = [
    { icon: <MessageSquare size={20} />, text: "Spamming 20 WhatsApp groups to recruit 10 gig workers" },
    { icon: <PhoneOff size={20} />, text: "Coordinators calling workers on repeat, only to get ghosted" },
    { icon: <AlertTriangle size={20} />, text: "Zero physical evidence. Did they actually show up?" },
    { icon: <AlertTriangle size={20} />, text: "Frequent payment disputes and manual cash handshakes" },
  ];

  const solutions = [
    { icon: <Navigation size={20} />, text: "KYC-verified workers matched in 10 minutes" },
    { icon: <ShieldCheck size={20} />, text: "Live GPS coordinates showing exact operational footprint" },
    { icon: <ClipboardCheck size={20} />, text: "Mandatory photo uploads during execution milestones" },
    { icon: <CheckCircle2 size={20} />, text: "Funds locked in secure escrow until you approve the proof" },
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
          <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Staff didn't show up? <span style={{ color: '#D97706' }}>Stop the Chaos.</span></h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.5 }}>
            Managing a physical promotional campaign, logistics run, or event shouldn't feel like a gamble. We replace endless WhatsApp groups and last-minute ghosting with single-tap operational peace.
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
              The Manual Nightmare
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
              \"The event starts in 30 minutes and the hired host is not responding to calls.\"
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
              The Ziggers Standard
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
              \"Attendance verified automatically. Backup staff activated nearby as safety net.\"
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
