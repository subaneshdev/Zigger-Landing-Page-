"use client";
import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Gift } from 'lucide-react';
import ShimmerButton from '../../components/magicui/ShimmerButton';

function JoinContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || searchParams.get('code') || '';

  useEffect(() => {
    if (refCode) {
      localStorage.setItem('ziggers_referral_code', refCode);
    }
  }, [refCode]);

  return (
    <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: '#fff',
          borderRadius: '28px',
          padding: '44px 32px',
          boxShadow: 'var(--shadow-strong)',
          border: '1.5px solid rgba(61,43,31,0.08)'
        }}
      >
        <img 
          src="/assets/mascot_winking.jpg" 
          alt="Ziggi Mascot" 
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', display: 'block', border: '3px solid var(--color-gold)' }}
        />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(37, 211, 102, 0.12)',
          color: '#128C7E',
          padding: '6px 16px',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 800,
          marginBottom: '16px'
        }}>
          <Gift size={16} /> Official Partner Invite
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 36px)', fontWeight: 900, marginBottom: '12px', lineHeight: 1.2 }}>
          You Were Invited to Join Ziggers!
        </h1>

        {refCode && (
          <div style={{
            background: '#fcf8f3',
            border: '1px dashed var(--color-gold)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '13px', color: 'var(--color-muted)', fontWeight: 600 }}>Community Referral Code:</span>
            <strong style={{ fontSize: '18px', color: 'var(--color-gold)', letterSpacing: '1px' }}>{refCode}</strong>
          </div>
        )}

        <p style={{ color: 'var(--color-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
          Access verified daily gig jobs in Chennai, Bangalore, &amp; major cities with <strong>0% commission</strong>, guaranteed payout protection, and <strong>instant UPI payment</strong> directly after your shift!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', textAlign: 'left', marginBottom: '32px' }}>
          <div style={{ background: 'var(--color-bg)', padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#25D366" /> 100% Payout Protection
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#25D366" /> Instant UPI Payouts
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#25D366" /> 0% Worker Commission
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#25D366" /> Verified Employers
          </div>
        </div>

        <ShimmerButton 
          onClick={() => {
            window.open('https://play.google.com/store/apps/details?id=com.ziggers.app', '_blank');
          }}
          style={{ width: '100%', padding: '18px', fontSize: '17px', fontWeight: 800 }}
        >
          Download Ziggers App &amp; Apply Code <Download size={20} />
        </ShimmerButton>
      </motion.div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <main style={{ 
      paddingTop: '120px', 
      paddingBottom: '90px', 
      minHeight: '100vh', 
      background: 'var(--color-bg)', 
      color: 'var(--color-espresso)', 
      fontFamily: 'var(--font-body)' 
    }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Loading invite details...</div>}>
        <JoinContent />
      </Suspense>
    </main>
  );
}
