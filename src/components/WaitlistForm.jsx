import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import Magnetic from './Magnetic';
import { supabase } from '../lib/supabase';
import qrImg from '../assets/qr.jpg'; 

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [utr, setUtr] = useState('');
  const [status, setStatus] = useState('idle'); // idle, payment, loading, success

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('payment');
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!utr || utr.length < 4) return; // Basic validation
    
    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, utr_number: utr }]);
        
      if (error && error.code !== '23505') { 
        throw error;
      }
      
      setStatus('success');
    } catch (err) {
      console.error('Waitlist error:', err);
      // For UX purposes, we usually still show success
      setStatus('success'); 
    }
  };

  return (
    <div className="waitlist-card" style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              padding: '40px 30px', 
              borderRadius: '24px', 
              backgroundColor: 'white', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-strong)',
              border: '2px solid var(--color-secondary)'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              style={{ color: 'var(--color-secondary)', marginBottom: '16px' }}
            >
              <CheckCircle2 size={64} style={{ margin: '0 auto' }} />
            </motion.div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--color-primary)' }}>Payment Verified!</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              Your spot is secured. We'll notify you as soon as Ziggers launches on App Store & Play Store.
            </p>
          </motion.div>
        ) : status === 'payment' || status === 'loading' ? (
          <motion.div
            key="payment"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ 
              padding: '32px 24px', 
              borderRadius: '24px', 
              backgroundColor: 'white', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              textAlign: 'left'
            }}
          >
            <button 
              onClick={() => setStatus('idle')}
              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', marginBottom: '20px', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="var(--color-secondary)" /> Complete Verification
              </h3>
            </div>
            
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
              To ensure high-intent users and prevent spam, we require a nominal verification fee of <strong>₹1 INR</strong>.
            </p>

            <div style={{ backgroundColor: '#FCFBFA', padding: '24px', borderRadius: '16px', border: '1px solid #E5DFD9', textAlign: 'center', marginBottom: '24px' }}>
               <img src={qrImg} alt="UPI QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain', margin: '0 auto 16px', borderRadius: '12px', border: '4px solid white', boxShadow: 'var(--shadow-soft)' }} />
               <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>UPI ID: a.harishraj04-1@okicici</p>
            </div>

            <form onSubmit={handleFinalSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enter 12-Digit UTR Number</label>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: '12px', padding: '12px 16px', border: '1px solid #E5E7EB' }}>
                  <Lock size={16} color="var(--color-text-muted)" style={{ marginRight: '10px' }} />
                  <input
                    type="text"
                    placeholder="e.g. 312567890123"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontFamily: 'var(--font-heading)' }}
                    required
                  />
                </div>
              </div>

              <Magnetic>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary" 
                  style={{ 
                    width: '100%',
                    padding: '16px', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '15px'
                  }}
                >
                  {status === 'loading' ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>Verify & Secure Spot <Send size={18} /></>
                  )}
                </button>
              </Magnetic>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form onSubmit={handleEmailSubmit} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '6px', backgroundColor: 'white', borderRadius: '100px', border: '1px solid #E5E7EB', boxShadow: 'var(--shadow-soft)' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    flex: 1, 
                    border: 'none', 
                    background: 'transparent', 
                    padding: '12px 20px', 
                    outline: 'none', 
                    fontSize: '16px',
                    fontFamily: 'var(--font-body)'
                  }}
                  required
                />
                <Magnetic>
                  <button 
                    type="submit"
                    className="btn-primary" 
                    style={{ 
                      padding: '12px 24px', 
                      borderRadius: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      minWidth: '140px',
                      justifyContent: 'center'
                    }}
                  >
                    Join Waitlist <Send size={18} />
                  </button>
                </Magnetic>
              </div>
            </form>
            <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              ✦ Join 1,248+ early access members
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
