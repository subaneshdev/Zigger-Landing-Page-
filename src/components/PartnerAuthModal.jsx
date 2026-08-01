"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ArrowRight, Loader2, LogIn, KeyRound, CheckCircle2, ArrowLeft, Smartphone, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PartnerAuthModal({ isOpen, onClose }) {
  // Modes: 'login' | 'forgot_send' | 'forgot_otp' | 'reset_new'
  const [mode, setMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [maskedContact, setMaskedContact] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Please enter your registered WhatsApp Phone Number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');
    setWhatsappUrl('');

    try {
      const response = await fetch('/api/partner/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_otp', phone })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'No Community Partner account found with this phone number.');
        setLoading(false);
        return;
      }

      setMaskedContact(data.maskedContact || phone);
      setSuccessMsg(data.message);
      if (data.whatsapp_url) {
        setWhatsappUrl(data.whatsapp_url);
      }
      setMode('forgot_otp');
      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length !== 4) {
      setError('Please enter the 4-digit OTP code sent to your phone');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/partner/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_otp', phone, otp: otp.trim() })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Invalid 4-digit OTP code.');
        setLoading(false);
        return;
      }

      setSuccessMsg('4-Digit OTP verified successfully! Create your new password below.');
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
        body: JSON.stringify({ action: 'reset_password', phone, newPassword })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to reset password.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Password updated successfully! You can now sign in with your new password.');
      setMode('login');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setOtp('');
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
              {mode === 'login' && 'Partner Sign In'}
              {mode === 'forgot_send' && 'Send 4-Digit OTP'}
              {mode === 'forgot_otp' && 'Verify 4-Digit OTP'}
              {mode === 'reset_new' && 'Set New Password'}
            </h3>
            
            <p style={{ color: 'var(--color-muted)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
              {mode === 'login' && 'Sign in to track your referral earnings, active workers, & total completed gigs.'}
              {mode === 'forgot_send' && 'Enter your registered WhatsApp phone number to receive a 4-digit verification code.'}
              {mode === 'forgot_otp' && `Enter the 4-digit code sent to ${maskedContact || 'your phone'}.`}
              {mode === 'reset_new' && 'Your phone is verified! Create a new secure password.'}
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

          {/* MODE 1: LOGIN */}
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
                    onClick={() => { setMode('forgot_send'); setError(''); setSuccessMsg(''); setPhone(email); }}
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

          {/* MODE 2: FORGOT - SEND OTP BY PHONE */}
          {mode === 'forgot_send' && (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  Registered WhatsApp Phone Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <Smartphone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
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
                {loading ? <Loader2 size={18} className="partner-submit-spin" /> : <>Send 4-Digit OTP Code <KeyRound size={18} /></>}
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

          {/* MODE 3: FORGOT - VERIFY 4-DIGIT OTP */}
          {mode === 'forgot_otp' && (
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  Enter 4-Digit Security OTP *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="••••"
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid var(--color-gold)', fontSize: '24px', fontWeight: 900, textAlign: 'center', letterSpacing: '8px', outline: 'none', boxSizing: 'border-box' }}
                  required
                />
              </div>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  <MessageSquare size={16} /> Open WhatsApp to Receive OTP Message
                </a>
              )}

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
                  marginTop: '4px'
                }}
              >
                {loading ? <Loader2 size={18} className="partner-submit-spin" /> : <>Verify 4-Digit OTP <CheckCircle2 size={18} /></>}
              </button>

              <button
                type="button"
                onClick={() => { setMode('forgot_send'); setError(''); setSuccessMsg(''); setOtp(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-muted)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '4px' }}
              >
                <ArrowLeft size={14} /> Resend OTP / Change Mobile Number
              </button>
            </form>
          )}

          {/* MODE 4: RESET NEW PASSWORD */}
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
