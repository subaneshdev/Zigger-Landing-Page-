import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ShieldCheck, CreditCard } from 'lucide-react';
import Magnetic from './Magnetic';
import { supabase } from '../lib/supabase';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const openRazorpay = () => {
    const options = {
      key: RAZORPAY_KEY,
      amount: 500, // ₹5.00 in paise
      currency: 'INR',
      name: 'Ziggers',
      description: 'Waitlist Verification Fee — ₹5',
      image: '', // Will use default
      prefill: {
        email: email,
      },
      theme: {
        color: '#29211B',
        backdrop_color: 'rgba(41, 33, 27, 0.85)',
      },
      modal: {
        confirm_close: true,
        ondismiss: () => {
          setStatus('idle');
        },
      },
      handler: async (response) => {
        // Payment succeeded — save to Supabase
        const paymentId = response.razorpay_payment_id;

        try {
          const { error } = await supabase
            .from('waitlist')
            .insert([{ 
              email, 
              razorpay_payment_id: paymentId
            }]);

          if (error && error.code !== '23505') {
            console.error('Supabase insert error:', error);
          }
        } catch (err) {
          console.error('DB error:', err);
        }

        setStatus('success');
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      console.error('Payment failed:', response.error);
      setStatus('idle');
    });
    rzp.open();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Small delay for UX before opening modal
    setTimeout(() => {
      openRazorpay();
    }, 400);
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
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form onSubmit={handleEmailSubmit} style={{ position: 'relative' }}>
              <div className="waitlist-input-group">
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
                    disabled={status === 'loading'}
                    className="btn-primary waitlist-btn" 
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
                    {status === 'loading' ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>Join Waitlist <Send size={18} /></>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                ✦ Join 1,248+ early access members
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)', opacity: 0.7 }}>
                <ShieldCheck size={14} />
                <span>₹5 · Secured by Razorpay</span>
              </div>
            </div>
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
