"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Loader2, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  Share2, 
  TrendingUp, 
  MessageSquare, 
  DollarSign, 
  Award, 
  CheckSquare,
  ExternalLink
} from 'lucide-react';
import Magnetic from '../Magnetic';
import NumberTicker from '../NumberTicker';
import AnimatedShinyText from '../magicui/AnimatedShinyText';
import ShimmerButton from '../magicui/ShimmerButton';
import MagicCard from '../magicui/MagicCard';
import { generateCodeFromMobile, getWhatsAppShareUrl, getReferralUrl, getGroupWelcomeMessage } from '../../lib/referral';

export default function Partner() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    platform: 'WhatsApp Group',
    memberCount: '512 - 1,024',
    category: 'Event Staff & Promoters',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [generatedCode, setGeneratedCode] = useState('');
  const [referralData, setReferralData] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Calculator State
  const [groupSize, setGroupSize] = useState(1024);
  const [joinPercent, setJoinPercent] = useState(15);
  const [gigsPerWorker, setGigsPerWorker] = useState(8);

  // Copy State
  const [copied, setCopied] = useState(false);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  // Calculated Metrics
  const activeWorkers = Math.round((groupSize * joinPercent) / 100);
  const totalMonthlyGigs = activeWorkers * gigsPerWorker;
  const signupBonus = activeWorkers * 20;
  const recurringMonthlyIncome = Math.floor(totalMonthlyGigs / 5) * 20;
  const totalMonthOne = signupBonus + recurringMonthlyIncome;

  const liveAutoCode = generateCodeFromMobile(formData.name, formData.phone);
  const activeCode = generatedCode || liveAutoCode || 'ZIGPARTNER';

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city || !formData.email || !formData.password) return;

    setStatus('loading');
    const finalCode = generateCodeFromMobile(formData.name, formData.phone) || 'ZIGPARTNER';

    try {
      const response = await fetch('/api/partner/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          platform: formData.platform,
          memberCount: formData.memberCount,
          category: formData.category,
          referralCode: finalCode
        })
      });
      const resData = await response.json();
      setReferralData(resData);

      if (resData.token && resData.partner) {
        localStorage.setItem('ziggers_partner_token', resData.token);
        localStorage.setItem('ziggers_partner_user', JSON.stringify(resData.partner));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.warn('API route call notice:', err);
    }

    setGeneratedCode(finalCode);
    setStatus('success');
  };

  const welcomeMessageText = getGroupWelcomeMessage(activeCode);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(welcomeMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const copyCodeOnly = () => {
    navigator.clipboard.writeText(activeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const copyLinkOnly = () => {
    navigator.clipboard.writeText(getReferralUrl(activeCode));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const faqs = [
    {
      q: "How does the ₹20 referral + ₹20 per 5 gigs income model work?",
      a: "As a Ziggers Community Partner, you get a unique community referral link. For every worker who signs up using your link, you earn ₹20 immediately. Furthermore, for every 5 completed gigs by that worker, you earn an additional ₹20 continuously! This creates true recurring passive revenue from active workers."
    },
    {
      q: "Is it 100% free to become a Ziggers Community Partner?",
      a: "Yes! There are zero registration fees, zero hidden costs, and zero software subscriptions. We provide WhatsApp and Telegram group admins with a completely free monetization platform."
    },
    {
      q: "Why should I change my group setting to 'Only Admins Can Send Messages'?",
      a: "Setting your community group to 'Only Admins Can Send Messages' keeps your group clean from spam, duplicate messages, and irrelevant chatter. When you forward official Ziggers job links, member notification read-rates jump by over 80%!"
    },
    {
      q: "How do I receive payments and how often can I withdraw?",
      a: "All earnings are credited to your Ziggers Partner Dashboard in real time. You can withdraw your balance directly to your bank account or UPI (Google Pay, PhonePe, Paytm, BHIM) instantly whenever you reach ₹100."
    },
    {
      q: "What types of job links will I get to forward?",
      a: "You will receive high-demand daily gig links for Event Ushers, Brand Promoters, Catering Staff, Delivery Partners, Warehouse Packers, and Acting Drivers across major Indian cities."
    }
  ];

  return (
    <main style={{ 
      paddingTop: '110px', 
      paddingBottom: '90px', 
      minHeight: '100vh', 
      background: 'var(--color-bg)', 
      color: 'var(--color-espresso)', 
      fontFamily: 'var(--font-body)' 
    }}>
      <div className="container">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION WITH ZIGGERS MASCOT & MAGIC UI SHINY TEXT */}
        {/* ========================================================================= */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 64px', position: 'relative' }}>
          
          {/* Mascot Floating Companion Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#ffffff',
              padding: '8px 20px 8px 10px',
              borderRadius: '100px',
              boxShadow: 'var(--shadow-soft)',
              border: '1.5px solid rgba(61,43,31,0.08)',
              marginBottom: '20px'
            }}
          >
            <img 
              src="/assets/mascot_winking.jpg" 
              alt="Ziggi Ziggers Mascot" 
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left' }}>
              <AnimatedShinyText style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px' }}>
                ✨ MEET ZIGGI THE ZIGGERS MASCOT
              </AnimatedShinyText>
              <div style={{ fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600 }}>
                WhatsApp &amp; Telegram Group Monetization
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(32px, 5.5vw, 54px)', 
              fontWeight: 900, 
              lineHeight: 1.15, 
              marginBottom: '20px',
              letterSpacing: '-0.03em'
            }}
          >
            Turn Your Group Into Income. <br />
            <span style={{ color: 'var(--color-gold)' }}>Earn Every Time Your Community Hires.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: '#3D2B1F',
              color: '#fff',
              display: 'inline-block',
              padding: '10px 24px',
              borderRadius: '14px',
              fontSize: 'clamp(14px, 2vw, 17px)',
              fontWeight: 800,
              letterSpacing: '0.5px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            From WhatsApp Admin to Community Entrepreneur. <span style={{ color: '#25D366' }}>STOP WORKING FOR FREE.</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ 
              color: 'var(--color-muted)', 
              fontSize: 'clamp(16px, 2.2vw, 19px)', 
              lineHeight: 1.6, 
              margin: '0 auto 36px',
              maxWidth: '760px'
            }}
          >
            Your WhatsApp group has thousands of members. It generates opportunities every single day. 
            Now it's time your group generated income for you too! Monetize your community with Ziggers — earn <strong>₹20 for every referral</strong> + <strong>₹20 for every 5 completed gigs</strong> for recurring passive income!
          </motion.p>

          {/* Value Pills Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '12px', 
              marginBottom: '40px' 
            }}
          >
            <span style={{ background: '#fff', padding: '8px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: '1px solid rgba(61,43,31,0.1)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} color="var(--color-gold)" /> Your Community. Your Revenue.
            </span>
            <span style={{ background: '#fff', padding: '8px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: '1px solid rgba(61,43,31,0.1)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={16} color="#25D366" /> ₹20 Referral + ₹20 Every 5 Gigs
            </span>
            <span style={{ background: '#fff', padding: '8px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: '1px solid rgba(61,43,31,0.1)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} color="var(--color-gold)" /> Recurring Income From 1 Worker
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <ShimmerButton 
              onClick={() => {
                const formEl = document.getElementById('partner-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 800 }}
            >
              Become a Community Partner <ArrowRight size={18} />
            </ShimmerButton>

            <Magnetic>
              <a 
                href="#income-calculator" 
                className="btn-secondary" 
                style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}
              >
                Calculate My Group Earnings
              </a>
            </Magnetic>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 2. RECURRING INCOME CALCULATOR WITH MAGIC UI NUMBER TICKER & MASCOT */}
        {/* ========================================================================= */}
        <section id="income-calculator" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcf8f3 100%)', 
            borderRadius: '28px', 
            padding: '48px 36px', 
            border: '2px solid rgba(196,160,82,0.2)',
            boxShadow: 'var(--shadow-strong)',
            position: 'relative'
          }}>
            
            {/* Mascot Banner Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <img 
                src="/assets/workers-mascot.png" 
                alt="Ziggers Mascot Workers Team" 
                style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
              />
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                Transparent Earning Structure
              </span>
            </div>

            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, marginBottom: '12px' }}>
                How Your Recurring Income Works
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '16px' }}>
                You don't just earn once when someone joins. You get paid continuously every time your referred workers complete 5 gigs!
              </p>
            </div>

            {/* Income Dual Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px', 
              marginBottom: '48px' 
            }}>
              
              {/* Card 1: Signup Referral */}
              <MagicCard gradientColor="rgba(196, 160, 82, 0.2)" style={{ padding: '28px' }}>
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  background: 'var(--color-gold)', 
                  color: '#fff', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  padding: '6px 14px', 
                  borderBottomLeftRadius: '12px',
                  textTransform: 'uppercase'
                }}>
                  Instant Bonus
                </div>
                <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--color-espresso)', marginBottom: '4px' }}>
                  ₹20 <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-muted)' }}>/ worker</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Every Referral Signup</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                  Earn ₹20 as soon as a member from your WhatsApp group registers on Ziggers using your community partner link.
                </p>
              </MagicCard>

              {/* Card 2: Recurring Gig Bonus */}
              <MagicCard gradientColor="rgba(37, 211, 102, 0.2)" style={{ padding: '28px', border: '2px solid #25D366' }}>
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  background: '#25D366', 
                  color: '#fff', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  padding: '6px 14px', 
                  borderBottomLeftRadius: '12px',
                  textTransform: 'uppercase'
                }}>
                  Passive &amp; Recurring
                </div>
                <div style={{ fontSize: '38px', fontWeight: 900, color: '#128C7E', marginBottom: '4px' }}>
                  ₹20 <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-muted)' }}>/ 5 gigs</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Every 5 Completed Gigs</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                  Get ₹20 for every 5 gigs completed by a worker. Continuous passive income even from a single active worker!
                </p>
              </MagicCard>

            </div>

            {/* Interactive Calculator Container */}
            <div style={{ 
              background: '#3D2B1F', 
              color: '#fff', 
              borderRadius: '24px', 
              padding: '36px 30px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '36px',
              alignItems: 'center'
            }}>
              
              {/* Controls Column */}
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingUp size={24} style={{ color: 'var(--color-gold)' }} /> 
                  Interactive Income Calculator
                </h3>

                {/* Slider 1: Group Size */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ color: '#d8c4b6' }}>Group Size (Members)</span>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>{groupSize.toLocaleString()} members</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1024" 
                    step="10" 
                    value={groupSize} 
                    onChange={(e) => setGroupSize(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                  />
                </div>

                {/* Slider 2: % Joining */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ color: '#d8c4b6' }}>Members Joining &amp; Working</span>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>{joinPercent}% ({activeWorkers} workers)</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="50" 
                    step="5" 
                    value={joinPercent} 
                    onChange={(e) => setJoinPercent(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                  />
                </div>

                {/* Slider 3: Gigs per Worker */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ color: '#d8c4b6' }}>Avg Gigs / Worker / Month</span>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>{gigsPerWorker} gigs</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="20" 
                    step="1" 
                    value={gigsPerWorker} 
                    onChange={(e) => setGigsPerWorker(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Live Output Card with Magic UI NumberTicker */}
              <div style={{ 
                background: 'rgba(255,255,255,0.06)', 
                borderRadius: '20px', 
                padding: '28px', 
                border: '1px solid rgba(255,255,255,0.12)',
                textAlign: 'center',
                position: 'relative'
              }}>
                <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', color: '#d8c4b6', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Estimated Month 1 Earnings
                </p>

                <div style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: '#25D366', marginBottom: '16px', lineHeight: 1 }}>
                  ₹<NumberTicker value={totalMonthOne} />
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px', 
                  borderTop: '1px solid rgba(255,255,255,0.1)', 
                  paddingTop: '16px',
                  marginBottom: '20px',
                  fontSize: '13px'
                }}>
                  <div>
                    <span style={{ color: '#a08c7d', display: 'block' }}>One-time Signup Bonus</span>
                    <strong style={{ color: '#fff', fontSize: '15px' }}>₹<NumberTicker value={signupBonus} /></strong>
                  </div>
                  <div>
                    <span style={{ color: '#a08c7d', display: 'block' }}>Monthly Recurring Income</span>
                    <strong style={{ color: '#25D366', fontSize: '15px' }}>₹<NumberTicker value={recurringMonthlyIncome} />/mo</strong>
                  </div>
                </div>

                <div style={{ background: 'rgba(37, 211, 102, 0.15)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#e0f7fa', lineHeight: 1.4 }}>
                  💡 <strong>Passive Power:</strong> In Month 2 onwards, you continue earning <strong>₹<NumberTicker value={recurringMonthlyIncome} /> every month</strong> passively without any extra effort!
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. 3-STEP ADMIN BLUEPRINT WITH MAGIC UI MAGIC CARDS */}
        {/* ========================================================================= */}
        <section style={{ marginBottom: '88px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Simple 3-Step Process
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', fontWeight: 900, marginBottom: '14px' }}>
              How To Monetize Your Group in 3 Steps
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '17px', margin: 0 }}>
              Follow these simple steps to set up your community and start generating recurring revenue.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '28px' 
          }}>
            
            {/* Step 1 */}
            <MagicCard gradientColor="rgba(196,160,82,0.12)" style={{ padding: '36px 28px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '14px', 
                background: 'var(--color-espresso)', 
                color: 'var(--color-gold)', 
                fontSize: '22px', 
                fontWeight: 900, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>
                Set Group to "Only Admins Can Send Messages"
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                Protect your community from noise and spam. When members know only official job alerts are posted, notification read-rates skyrocket!
              </p>
              <div style={{ background: 'var(--color-bg)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', color: 'var(--color-espresso)', fontWeight: 600 }}>
                📱 WhatsApp: Group Settings ➔ Send Messages ➔ <strong>Only Admins</strong>
              </div>
            </MagicCard>

            {/* Step 2 with Mascot Accent */}
            <MagicCard gradientColor="rgba(37,211,102,0.15)" style={{ padding: '36px 28px', border: '2px solid var(--color-gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '14px', 
                  background: 'var(--color-gold)', 
                  color: '#fff', 
                  fontSize: '22px', 
                  fontWeight: 900, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  2
                </div>
                <img 
                  src="/assets/mascot_winking.jpg" 
                  alt="Zippy Mascot" 
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>
                Post the Ziggers Welcome Message
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                Share the official announcement in your group explaining <strong>Why Ziggers</strong>:
              </p>
              <ul style={{ fontSize: '13px', color: 'var(--color-espresso)', lineHeight: 1.7, paddingLeft: '18px', margin: 0, fontWeight: 600 }}>
                <li>✅ <strong>No backouts</strong> for employer</li>
                <li>✅ Ziggers worker <strong>fair price</strong></li>
                <li>✅ <strong>0% commissions</strong></li>
                <li>✅ <strong>Instant UPI payments</strong> post-gig</li>
                <li>✅ <strong>No ghosting</strong></li>
              </ul>
            </MagicCard>

            {/* Step 3 */}
            <MagicCard gradientColor="rgba(37,211,102,0.12)" style={{ padding: '36px 28px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '14px', 
                background: '#25D366', 
                color: '#fff', 
                fontSize: '22px', 
                fontWeight: 900, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>
                Forward Regular Ziggers Work Links
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                From Ziggers, you will regularly receive verified job links. Simply forward them to your group. Members apply, work, and you collect recurring cash!
              </p>
              <div style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', color: '#128C7E', fontWeight: 700 }}>
                💰 Earn ₹20 on signup + ₹20 every 5 gigs completed!
              </div>
            </MagicCard>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. COPYABLE WHATSAPP WELCOME MESSAGE CARD WITH MASCOT */}
        {/* ========================================================================= */}
        <section style={{ marginBottom: '88px' }}>
          
          <div style={{ 
            background: '#111b21', 
            color: '#e9edef', 
            borderRadius: '24px', 
            padding: '40px 32px', 
            boxShadow: 'var(--shadow-strong)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '16px', 
              marginBottom: '24px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src="/assets/mascot_winking.jpg" 
                  alt="Zippy Mascot" 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #25D366' }}
                />
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Official WhatsApp Group Welcome Template
                  </h3>
                  <p style={{ color: '#8696a0', fontSize: '13px', margin: 0 }}>
                    Ziggi says: Copy &amp; paste this message directly into your WhatsApp group!
                  </p>
                </div>
              </div>

              <ShimmerButton 
                onClick={copyToClipboard}
                background={copied ? '#25D366' : 'rgba(255,255,255,0.15)'}
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied to Clipboard!' : 'Copy Welcome Message'}
              </ShimmerButton>
            </div>

            {/* Code Box */}
            <div style={{ 
              background: '#202c33', 
              borderRadius: '16px', 
              padding: '24px', 
              fontFamily: 'monospace', 
              fontSize: '14px', 
              lineHeight: 1.7, 
              color: '#d1d7db',
              whiteSpace: 'pre-wrap',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              {welcomeMessageText}
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. FORM & WHY JOIN SPLIT SECTION WITH MASCOT */}
        {/* ========================================================================= */}
        <section id="partner-form" style={{ marginBottom: '88px', scrollMarginTop: '100px' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '48px', 
            alignItems: 'center' 
          }}>
            
            {/* Left Column: Why Become a Partner */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Join India's Top Community Network
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 900, marginBottom: '24px' }}>
                Why WhatsApp Group Admins Love Ziggers
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(196,160,82,0.15)', color: 'var(--color-gold)', borderRadius: '12px', padding: '12px', height: 'fit-content' }}>
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>Stop Working For Free</h4>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                      You built your community through hard work. Monetize every job opportunity shared without charging your members a single rupee.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', borderRadius: '12px', padding: '12px', height: 'fit-content' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>Zero Upfront Investment &amp; 100% Free</h4>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                      No registration fee, no monthly subscriptions. Start earning immediately from day one.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(61,43,31,0.1)', color: 'var(--color-espresso)', borderRadius: '12px', padding: '12px', height: 'fit-content' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>Verified Jobs For Your Members</h4>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                      Help your community access high-paying catering, event, promoter, and delivery gigs with guaranteed payout protection.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Registration Form Card */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '28px', 
              padding: '40px 32px', 
              boxShadow: 'var(--shadow-strong)', 
              border: '1.5px solid rgba(61,43,31,0.08)',
              position: 'relative'
            }}>
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'left', padding: '12px 0' }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <img 
                        src="/assets/mascot_winking.jpg" 
                        alt="Zippy Mascot Celebrating" 
                        style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', display: 'block', border: '3px solid #25D366' }}
                      />
                      <div style={{ color: '#25D366', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '6px' }}>Partner Registration Successful!</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0 }}>
                        Your group details &amp; referral code have been saved to the database.
                      </p>
                    </div>

                    {/* Gradient Referral Code Card */}
                    <div style={{
                      background: 'linear-gradient(135deg, #3D2B1F 0%, #1f140e 100%)',
                      color: '#fff',
                      borderRadius: '20px',
                      padding: '24px',
                      marginBottom: '24px',
                      boxShadow: 'var(--shadow-strong)',
                      border: '1.5px solid rgba(196,160,82,0.4)',
                      position: 'relative'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        ✨ YOUR UNIQUE PARTNER REFERRAL CODE
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <div style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 900, color: '#25D366', letterSpacing: '1px', background: 'rgba(255,255,255,0.06)', padding: '8px 18px', borderRadius: '12px', border: '1px border-dashed rgba(37,211,102,0.3)' }}>
                          {activeCode}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button 
                            type="button"
                            onClick={copyCodeOnly}
                            style={{ background: copiedCode ? '#25D366' : 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                            {copiedCode ? 'Code Copied!' : 'Copy Code'}
                          </button>

                          <button 
                            type="button"
                            onClick={copyLinkOnly}
                            style={{ background: copiedLink ? '#25D366' : 'var(--color-gold)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            {copiedLink ? <Check size={16} /> : <ExternalLink size={16} />}
                            {copiedLink ? 'Link Copied!' : 'Copy Link'}
                          </button>
                        </div>
                      </div>

                      {/* 1-Click WhatsApp Share Button */}
                      <a 
                        href={getWhatsAppShareUrl(activeCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          background: '#25D366',
                          color: '#fff',
                          padding: '14px',
                          borderRadius: '12px',
                          fontWeight: 800,
                          fontSize: '15px',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px rgba(37,211,102,0.4)',
                          width: '100%'
                        }}
                      >
                        <Share2 size={20} /> Share Directly on WhatsApp
                      </a>
                    </div>

                    {/* Organization Referral Tracking Table */}
                    <div style={{ background: '#fcf8f3', borderRadius: '16px', padding: '20px', border: '1px solid rgba(196,160,82,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <TrendingUp size={18} color="var(--color-gold)" /> Referred Members Tracking
                        </h4>
                        <span style={{ fontSize: '12px', background: '#25D366', color: '#fff', fontWeight: 800, padding: '4px 10px', borderRadius: '100px' }}>
                          Live Database Status
                        </span>
                      </div>

                      {/* Stats Quick Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px', textAlign: 'center' }}>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Invited</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--color-espresso)' }}>
                            {referralData?.data?.metrics?.total_invited || 0}
                          </div>
                        </div>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Active</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: '#25D366' }}>
                            {referralData?.data?.metrics?.converted_referrals || 0}
                          </div>
                        </div>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Works Done</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: '#128C7E' }}>
                            {referralData?.data?.metrics?.total_works_completed || 0}
                          </div>
                        </div>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Earned</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--color-gold)' }}>
                            ₹{referralData?.data?.metrics?.total_cash_earned || 0}
                          </div>
                        </div>
                      </div>

                      {/* Member List Table / Empty State */}
                      {referralData?.data?.referred_members && referralData.data.referred_members.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                              <tr style={{ borderBottom: '1.5px solid rgba(61,43,31,0.1)', color: 'var(--color-muted)' }}>
                                <th style={{ padding: '8px 4px' }}>Member</th>
                                <th style={{ padding: '8px 4px' }}>Date</th>
                                <th style={{ padding: '8px 4px' }}>Works</th>
                                <th style={{ padding: '8px 4px' }}>Status</th>
                                <th style={{ padding: '8px 4px', textAlign: 'right' }}>Earned</th>
                              </tr>
                            </thead>
                            <tbody>
                              {referralData.data.referred_members.map((member, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
                                  <td style={{ padding: '8px 4px', fontWeight: 700 }}>{member.name} ({member.phone})</td>
                                  <td style={{ padding: '8px 4px', color: 'var(--color-muted)' }}>{member.date_joined}</td>
                                  <td style={{ padding: '8px 4px', fontWeight: 800, color: '#128C7E' }}>{member.works_completed || 0} gigs</td>
                                  <td style={{ padding: '8px 4px' }}>
                                    <span style={{ 
                                      background: member.status === 'REWARD_CLAIMED' ? 'rgba(37,211,102,0.15)' : 'rgba(196,160,82,0.15)', 
                                      color: member.status === 'REWARD_CLAIMED' ? '#128C7E' : 'var(--color-gold)', 
                                      fontSize: '10px', 
                                      fontWeight: 800, 
                                      padding: '2px 8px', 
                                      borderRadius: '100px' 
                                    }}>
                                      {member.status}
                                    </span>
                                  </td>
                                  <td style={{ padding: '8px 4px', fontWeight: 800, color: member.status === 'REWARD_CLAIMED' ? '#25D366' : 'var(--color-gold)', textAlign: 'right' }}>
                                    {member.reward_earned}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div style={{ background: '#fff', padding: '24px 16px', borderRadius: '12px', border: '1px border-dashed rgba(61,43,31,0.12)', textAlign: 'center' }}>
                          <div style={{ fontSize: '28px', marginBottom: '6px' }}>🚀</div>
                          <h5 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-espresso)', margin: '0 0 4px' }}>
                            Your Partner Link is Ready to Share!
                          </h5>
                          <p style={{ fontSize: '13px', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                            No community members have signed up using your code yet. Click the <strong>Share Directly on WhatsApp</strong> button above to start earning ₹20 per referral!
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img 
                        src="/assets/mascot.jpg" 
                        alt="Ziggers Mascot" 
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>Register As Community Partner</h3>
                    </div>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', marginBottom: '24px' }}>
                      Fill in your group details to receive your partner referral link &amp; job forwarding access.
                    </p>

                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Your Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleFormChange} 
                          placeholder="e.g. Rahul Sharma"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                          required 
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>WhatsApp Number *</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleFormChange} 
                            placeholder="+91 98765 43210"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                            required 
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Your City *</label>
                          <input 
                            type="text" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleFormChange} 
                            placeholder="e.g. Chennai / Bangalore"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                            required 
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleFormChange} 
                            placeholder="partner@gmail.com"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                            required 
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Set Account Password *</label>
                          <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleFormChange} 
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                            required 
                          />
                        </div>
                      </div>

                      {/* Live Auto-Generated Code Preview Badge */}
                      {liveAutoCode && (
                        <div style={{ background: 'rgba(196,160,82,0.12)', border: '1px dashed var(--color-gold)', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600 }}>⚡ Auto-Generated Partner Code:</span>
                          <strong style={{ fontSize: '15px', letterSpacing: '0.8px', color: 'var(--color-gold)', background: '#fff', padding: '2px 10px', borderRadius: '6px', border: '1px solid rgba(196,160,82,0.3)' }}>
                            {liveAutoCode}
                          </strong>
                        </div>
                      )}

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Platform</label>
                          <select 
                            name="platform" 
                            value={formData.platform} 
                            onChange={handleFormChange} 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff' }}
                          >
                            <option value="WhatsApp Group">WhatsApp Group</option>
                            <option value="Telegram Channel">Telegram Channel</option>
                            <option value="Facebook Group">Facebook Group</option>
                            <option value="Other">Other Community</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Member Count</label>
                          <select 
                            name="memberCount" 
                            value={formData.memberCount} 
                            onChange={handleFormChange} 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff' }}
                          >
                            <option value="100 - 256">100 - 256 members</option>
                            <option value="256 - 512">256 - 512 members</option>
                            <option value="512 - 1,024">512 - 1,024 members (Full WhatsApp Group)</option>
                            <option value="Multiple Groups (1,024+)">Multiple Groups (1,024+ members)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Primary Member Niche</label>
                        <select 
                          name="category" 
                          value={formData.category} 
                          onChange={handleFormChange} 
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff' }}
                        >
                          <option value="Event Staff &amp; Promoters">Event Staff &amp; Brand Promoters</option>
                          <option value="College Students">College Students &amp; Youth</option>
                          <option value="Catering &amp; Waiters">Catering &amp; Restaurant Staff</option>
                          <option value="Delivery &amp; Drivers">Delivery Partners &amp; Drivers</option>
                          <option value="General Job Seekers">General Daily Wage Job Seekers</option>
                        </select>
                      </div>

                      <div style={{ marginTop: '8px' }}>
                        <ShimmerButton 
                          type="submit"
                          disabled={status === 'loading'}
                          style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 800 }}
                        >
                          {status === 'loading' ? (
                            <Loader2 size={20} className="partner-submit-spin" />
                          ) : (
                            <>Submit &amp; Get Partner Link <Send size={18} /></>
                          )}
                        </ShimmerButton>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 34px)', fontWeight: 900, marginBottom: '10px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '16px' }}>
              Everything you need to know about becoming a Ziggers Community Partner.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  style={{ 
                    background: '#fff', 
                    borderRadius: '16px', 
                    padding: '20px 24px', 
                    border: '1.5px solid rgba(61,43,31,0.08)', 
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-soft)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--color-espresso)' }}>
                      {faq.q}
                    </h3>
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: 700, 
                      color: 'var(--color-gold)', 
                      transform: isOpen ? 'rotate(45deg)' : 'none', 
                      transition: 'transform 0.2s ease' 
                    }}>
                      +
                    </div>
                  </div>
                  {isOpen && (
                    <p style={{ color: 'var(--color-muted)', fontSize: '15px', lineHeight: 1.6, marginTop: '14px', marginBottom: 0 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </section>

      </div>

      <style>{`
        .partner-submit-spin { animation: partnerSubmitSpin 1s linear infinite; }
        @keyframes partnerSubmitSpin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
