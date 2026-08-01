"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ArrowRight, Loader2, LogIn, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PartnerAuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'forgot' | 'reset_new'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [partnerDetails, setPartnerDetails] = useState(null);

  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your Email/Phone and Password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/partner/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Login failed. Please check credentials.');
        setLoading(false);
        return;
      }

      localStorage.setItem('ziggers_partner_token', data.token);
      localStorage.setItem('ziggers_partner_user', JSON.stringify(data.partner));
      window.dispatchEvent(new Event('storage'));

      setLoading(false);
      onClose();
      router.push('/partner/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleVerifyAccount = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered Email or WhatsApp Phone');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/partner/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', emailOrPhone: email })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Account not found.');
        setLoading(false);
        return;
      }

      setPartnerDetails(data);
      setSuccessMsg(`Account verified for ${data.partnerName}! Please set your new password.`);
      setMode('reset_new');
      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/partner/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset', emailOrPhone: email, newPassword })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to reset password.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Password updated successfully! You can now sign in.');
      setMode('login');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(17, 27, 33, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#ffffff',
            borderRadius: '28px',
            maxWidth: '440px',
            width: '100%',
            padding: '36px 30px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            border: '1.5px solid rgba(61, 43, 31, 0.1)',
            position: 'relative',
            color: 'var(--color-espresso)',
            fontFamily: 'var(--font-body)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(61,43,31,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-espresso)'
            }}
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196,160,82,0.12)', padding: '6px 14px', borderRadius: '100px', marginBottom: '12px' }}>
              <img src="/assets/mascot_winking.jpg" alt="Mascot" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '0.5px' }}>
                COMMUNITY PARTNER PORTAL
              </span>
            </div>
            
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 6px', color: 'var(--color-espresso)' }}>
              {mode === 'login' ? 'Partner Sign In' : mode === 'forgot' ? 'Reset Your Password' : 'Create New Password'}
            </h3>
            
            <p style={{ color: 'var(--color-muted)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
              {mode === 'login' 
                ? 'Sign in to track your referral earnings, active workers, & total completed gigs.' 
                : mode === 'forgot' 
                ? 'Enter your registered email or phone number to verify your account.' 
                : 'Enter your new password below.'}
            </p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#128C7E', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
              {successMsg}
            </div>
          )}

          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  Email Address or WhatsApp Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@ziggers.in or +919876543210"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)' }}>
                    Account Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--color-gold)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'var(--color-espresso)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-soft)',
                  marginTop: '8px'
                }}
              >
                {loading ? <Loader2 size={18} className="partner-submit-spin" /> : <>Sign In to Partner Dashboard <LogIn size={18} /></>}
              </button>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleVerifyAccount} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  Registered Email Address or WhatsApp Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@ziggers.in or +919876543210"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'var(--color-gold)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                {loading ? <Loader2 size={18} className="partner-submit-spin" /> : <>Verify Account <KeyRound size={18} /></>}
              </button>

              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-muted)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '4px' }}
              >
                <ArrowLeft size={14} /> Back to Sign In
              </button>
            </form>
          )}

          {/* MODE: RESET NEW PASSWORD */}
          {mode === 'reset_new' && (
            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  New Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  Confirm New Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                {loading ? <Loader2 size={18} className="partner-submit-spin" /> : <>Save New Password <CheckCircle2 size={18} /></>}
              </button>
            </form>
          )}

          {/* Footer Toggle */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(61,43,31,0.08)', textAlign: 'center', fontSize: '13px', color: 'var(--color-muted)' }}>
            Not a Community Partner yet?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push('/partner#partner-form');
              }}
              style={{ background: 'none', border: 'none', color: 'var(--color-gold)', fontWeight: 800, cursor: 'pointer', padding: 0 }}
            >
              Register Here <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
