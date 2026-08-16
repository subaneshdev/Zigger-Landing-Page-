"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  Share2, 
  TrendingUp, 
  DollarSign, 
  Award, 
  ExternalLink,
  Video,
  Play,
  Download
} from 'lucide-react';
import Magnetic from '../Magnetic';
import NumberTicker from '../NumberTicker';
import AnimatedShinyText from '../magicui/AnimatedShinyText';
import ShimmerButton from '../magicui/ShimmerButton';
import MagicCard from '../magicui/MagicCard';
import PlayStoreButton from '../PlayStoreButton';
import { generateCodeFromMobile, getWhatsAppShareUrl, getReferralUrl } from '../../lib/referral';

export default function Influencer() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    platform: 'Instagram',
    memberCount: '5k - 20k',
    category: 'Career/Jobs & Finance',
    socialHandle: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [generatedCode, setGeneratedCode] = useState('');
  const [referralData, setReferralData] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Calculator State
  const [estimatedViews, setEstimatedViews] = useState(25000);
  const [conversionRate, setConversionRate] = useState(1.5); // %
  const [gigsPerWorker, setGigsPerWorker] = useState(6);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  // Calculated Metrics
  const activeWorkers = Math.round((estimatedViews * conversionRate) / 100);
  const totalMonthlyGigs = activeWorkers * gigsPerWorker;
  const signupBonus = activeWorkers * 20;
  const recurringMonthlyIncome = Math.floor(totalMonthlyGigs / 5) * 20;
  const totalMonthOne = signupBonus + recurringMonthlyIncome;

  const liveAutoCode = generateCodeFromMobile(formData.name, formData.phone);
  const activeCode = generatedCode || liveAutoCode || 'ZIGCREATOR';

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city || !formData.email || !formData.password) return;

    setStatus('loading');
    const finalCode = generateCodeFromMobile(formData.name, formData.phone) || 'ZIGCREATOR';

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
          platform: `${formData.platform} (${formData.socialHandle || 'No Handle'})`,
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
      q: "What is Ziggers?",
      a: "Ziggers is a gig-work platform where people can find short-term jobs and earn by completing them. From catering, event work, packing, cleaning, and driving to volunteering, stall work, and construction, users discover gigs matching their skills and availability."
    },
    {
      q: "How does the influencer earnings model work?",
      a: "You get a unique referral code/link. You earn ₹20 immediately for every user who registers through your link and completes KYC. Plus, you get ₹20 for every 5 gigs they complete. This is true, recurring passive income as long as your referred users work!"
    },
    {
      q: "What format of content can I create?",
      a: "You can create Reels, TikToks, Shorts, feed posts, carousel images, or blog posts. Any format that fits your style is welcome! The goal is to make authentic, engaging content introducing Ziggers to your audience."
    },
    {
      q: "Is there a minimum follower requirement?",
      a: "Nope! We are looking for creators of all sizes (Nano, Micro, and Macro). What matters most is authenticity, engagement, and your ability to explain the simplicity and benefits of Ziggers."
    },
    {
      q: "How do I withdraw my earnings?",
      a: "Earnings accrue in real time and are shown in your Creator Partner Dashboard. You can request direct UPI or bank payouts instantly once your balance reaches ₹100."
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
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 64px', position: 'relative' }}>
          
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
                🎬 WE ARE HIRING UGC CREATORS
              </AnimatedShinyText>
              <div style={{ fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600 }}>
                Spread the word &amp; earn recurring passive income
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
            Make Authentic Content. <br />
            <span style={{ color: 'var(--color-gold)' }}>Get Paid for Every Gig Completed.</span>
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
            Looking for UGC Creators to Create Reels &amp; Shorts. <span style={{ color: '#25D366' }}>GET RECURRING CASH.</span>
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
            We are looking for creative and authentic creators to introduce Ziggers to their audience. Tell them why they should join, find gigs, and earn instantly. You get paid <strong>₹20 per referral</strong> plus <strong>recurring ₹20 for every 5 completed gigs</strong>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <ShimmerButton 
              onClick={() => {
                const formEl = document.getElementById('influencer-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 800 }}
            >
              Join Influencer Program <ArrowRight size={18} />
            </ShimmerButton>

            <Magnetic>
              <a 
                href="#creator-calculator" 
                className="btn-secondary" 
                style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}
              >
                Calculate My Earnings
              </a>
            </Magnetic>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* WHAT IS ZIGGERS & DOWNLOAD SHOWCASE */}
        {/* ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #3D2B1F 0%, #1f140e 100%)', 
            color: '#fff',
            borderRadius: '28px', 
            padding: '48px 36px', 
            boxShadow: 'var(--shadow-strong)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                WHAT IS ZIGGERS?
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>
                The Ultimate Gig-Work Platform 💸
              </h2>
              <p style={{ color: '#d8c4b6', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                Ziggers is a gig-work platform where people find short-term jobs and earn by completing them. From catering, event work, packing, cleaning, and driving to volunteering, stall work, construction, and more, users discover gigs matching their skills.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>🔍</div>
                  Find a Gig
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>🛠️</div>
                  Do the Work
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>💰</div>
                  Get Paid Immediately
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(255,255,255,0.06)', 
              borderRadius: '24px', 
              padding: '32px', 
              border: '1.5px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <img 
                src="/assets/mascot_winking.jpg" 
                alt="Ziggi mascot" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid var(--color-gold)' }}
              />
              <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>Try the Ziggers App Yourself</h3>
              <p style={{ color: '#a08c7d', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5 }}>
                Authentic content starts with trying it out. Download the Ziggers app, complete your profile, and see how easy it is to find gigs!
              </p>
              <PlayStoreButton label="Download Ziggers App" variant="gold" size="lg" style={{ width: '100%', justifyContent: 'center' }} />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CREATOR CALCULATOR */}
        {/* ========================================================================= */}
        <section id="creator-calculator" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
          
          <div className="responsive-container" style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #fcf8f3 100%)', 
            borderRadius: '28px', 
            border: '2px solid rgba(196,160,82,0.2)',
            boxShadow: 'var(--shadow-strong)'
          }}>
            
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                Estimate Your Rewards
              </span>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, marginBottom: '12px', marginTop: '6px' }}>
                Creator Income Calculator
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '16px' }}>
                Calculate how much you can earn from your content views, conversions, and recurring worker commissions.
              </p>
            </div>

            <div className="responsive-inner-grid" style={{ 
              background: '#3D2B1F', 
              color: '#fff', 
              borderRadius: '24px', 
              display: 'grid', 
              gap: '36px',
              alignItems: 'center'
            }}>
              
              {/* Controls Column */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingUp size={24} style={{ color: 'var(--color-gold)' }} /> 
                  Interactive Sliders
                </h3>

                {/* Slider 1: Views */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ color: '#d8c4b6' }}>Estimated Content Views</span>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>{estimatedViews.toLocaleString()} views</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="200000" 
                    step="5000" 
                    value={estimatedViews} 
                    onChange={(e) => setEstimatedViews(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                  />
                </div>

                {/* Slider 2: Conversion % */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ color: '#d8c4b6' }}>View-to-Signup Conversion Rate</span>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>{conversionRate}% ({activeWorkers} active workers)</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="5.0" 
                    step="0.1" 
                    value={conversionRate} 
                    onChange={(e) => setConversionRate(Number(e.target.value))} 
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
                    min="1" 
                    max="20" 
                    step="1" 
                    value={gigsPerWorker} 
                    onChange={(e) => setGigsPerWorker(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Live Output Card */}
              <div style={{ 
                background: 'rgba(255,255,255,0.06)', 
                borderRadius: '20px', 
                padding: '28px', 
                border: '1px solid rgba(255,255,255,0.12)',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', color: '#d8c4b6', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Estimated Month 1 Income
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
                    <span style={{ color: '#a08c7d', display: 'block' }}>Creator Signup Bonus</span>
                    <strong style={{ color: '#fff', fontSize: '15px' }}>₹<NumberTicker value={signupBonus} /></strong>
                  </div>
                  <div>
                    <span style={{ color: '#a08c7d', display: 'block' }}>Monthly Commission</span>
                    <strong style={{ color: '#25D366', fontSize: '15px' }}>₹<NumberTicker value={recurringMonthlyIncome} />/mo</strong>
                  </div>
                </div>

                <div style={{ background: 'rgba(37, 211, 102, 0.15)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#e0f7fa', lineHeight: 1.4 }}>
                  💡 <strong>Recurring Profit:</strong> When referred users continue to work on Ziggers, you continue earning passive commissions month-over-month.
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. CAMPAIGN GUIDE / STEPS */}
        {/* ========================================================================= */}
        <section style={{ marginBottom: '88px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
              Campaign Blueprint
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', fontWeight: 900, marginBottom: '14px', marginTop: '6px' }}>
              How to Start and Earn
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '28px' 
          }}>
            
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
                Register Your Creator Account
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Sign up below to generate your personalized creator referral code and link. This will track your referrals and earnings in real time.
              </p>
            </MagicCard>

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
                <Video size={32} color="var(--color-gold)" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>
                Create and Post UGC Content
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Explain the Ziggers concept: <strong>Find a gig ➔ Do the work ➔ Get paid 💸</strong>. Tell your audience about the flexibility, instant payouts, and zero commission model.
              </p>
            </MagicCard>

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
                Earn Passive Income
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Watch your referral count grow. Every worker who registers earns you ₹20, and you collect ₹20 for every 5 gigs they complete.
              </p>
            </MagicCard>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. FORM & REGISTRATION */}
        {/* ========================================================================= */}
        <section id="influencer-form" style={{ marginBottom: '88px', scrollMarginTop: '100px' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '48px', 
            alignItems: 'center' 
          }}>
            
            {/* Left Column: Why Join */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                Influencer Perks
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 900, marginBottom: '24px', marginTop: '6px' }}>
                Why Creators Promote Ziggers
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(196,160,82,0.15)', color: 'var(--color-gold)', borderRadius: '12px', padding: '12px', height: 'fit-content' }}>
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>High-Paying Structure</h4>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                      Earn upfront + recurring commissions. The more workers you refer, the higher your monthly passive check.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', borderRadius: '12px', padding: '12px', height: 'fit-content' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>Zero Commissions &amp; Payout Protection</h4>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                      Ziggers guarantees payouts for workers via escrow. Your audience is safe, verified, and gets paid immediately.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(61,43,31,0.1)', color: 'var(--color-espresso)', borderRadius: '12px', padding: '12px', height: 'fit-content' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>Genuine Value to Your Audience</h4>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                      Help students, daily workers, and freelancers access high-paying catering, delivery, warehouse, and events gigs.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Form */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '28px', 
              padding: '40px 32px', 
              boxShadow: 'var(--shadow-strong)', 
              border: '1.5px solid rgba(61,43,31,0.08)'
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
                        alt="Zippy Mascot" 
                        style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', display: 'block', border: '3px solid #25D366' }}
                      />
                      <div style={{ color: '#25D366', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '6px' }}>Creator Profile Saved!</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0 }}>
                        Your registration is successful. Start promoting Ziggers using your links below!
                      </p>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, #3D2B1F 0%, #1f140e 100%)',
                      color: '#fff',
                      borderRadius: '20px',
                      padding: '24px',
                      marginBottom: '24px',
                      border: '1.5px solid rgba(196,160,82,0.4)'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        ✨ YOUR UNIQUE CREATOR CODE
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <div style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 900, color: '#25D366', letterSpacing: '1px', background: 'rgba(255,255,255,0.06)', padding: '8px 18px', borderRadius: '12px' }}>
                          {activeCode}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button 
                            type="button"
                            onClick={copyCodeOnly}
                            style={{ background: copiedCode ? '#25D366' : 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                            {copiedCode ? 'Copied!' : 'Copy Code'}
                          </button>

                          <button 
                            type="button"
                            onClick={copyLinkOnly}
                            style={{ background: copiedLink ? '#25D366' : 'var(--color-gold)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            {copiedLink ? <Check size={16} /> : <ExternalLink size={16} />}
                            {copiedLink ? 'Copied!' : 'Copy Link'}
                          </button>
                        </div>
                      </div>

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
                        <Share2 size={20} /> Share via WhatsApp
                      </a>
                    </div>

                    {/* Stats Table placeholder/display */}
                    <div style={{ background: '#fcf8f3', borderRadius: '16px', padding: '20px', border: '1px solid rgba(196,160,82,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--color-espresso)' }}>
                          Your Referral Performance
                        </h4>
                      </div>
                      <div className="stats-grid-4" style={{ textAlign: 'center' }}>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Invited</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--color-espresso)' }}>{referralData?.data?.metrics?.total_invited || 0}</div>
                        </div>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Active</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: '#25D366' }}>{referralData?.data?.metrics?.converted_referrals || 0}</div>
                        </div>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Completed</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: '#128C7E' }}>{referralData?.data?.metrics?.total_works_completed || 0}</div>
                        </div>
                        <div style={{ background: '#fff', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(61,43,31,0.08)' }}>
                          <div style={{ fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600 }}>Earnings</div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--color-gold)' }}>₹{referralData?.data?.metrics?.total_cash_earned || 0}</div>
                        </div>
                      </div>
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
                      <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>Become an Influencer</h3>
                    </div>
                    <p style={{ color: 'var(--color-muted)', fontSize: '14px', marginBottom: '24px' }}>
                      Fill in your profile details to create your creator partner code.
                    </p>

                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Your Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleFormChange} 
                          placeholder="e.g. Aditi Rao"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                          required 
                        />
                      </div>

                      <div className="form-grid-2">
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
                            placeholder="e.g. Bangalore"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                            required 
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleFormChange} 
                            placeholder="creator@gmail.com"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                            required 
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Set Password *</label>
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

                      <div className="form-grid-2">
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Primary Platform</label>
                          <select 
                            name="platform" 
                            value={formData.platform} 
                            onChange={handleFormChange} 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff' }}
                          >
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Social Handle (e.g. @name)</label>
                          <input 
                            type="text" 
                            name="socialHandle" 
                            value={formData.socialHandle} 
                            onChange={handleFormChange} 
                            placeholder="@aditi_creates"
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Follower Count</label>
                          <select 
                            name="memberCount" 
                            value={formData.memberCount} 
                            onChange={handleFormChange} 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff' }}
                          >
                            <option value="Under 5k">Under 5k followers</option>
                            <option value="5k - 20k">5k - 20k followers</option>
                            <option value="20k - 100k">20k - 100k followers</option>
                            <option value="100k+">100k+ followers</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>Niche / Niche Category</label>
                          <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleFormChange} 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid rgba(61,43,31,0.12)', fontSize: '14px', outline: 'none', background: '#fff' }}
                          >
                            <option value="Career/Jobs &amp; Finance">Career/Jobs &amp; Finance</option>
                            <option value="Lifestyle &amp; Vlogs">Lifestyle &amp; Vlogs</option>
                            <option value="Comedy &amp; Entertainment">Comedy &amp; Entertainment</option>
                            <option value="Education &amp; Tech">Education &amp; Tech</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {liveAutoCode && (
                        <div style={{ background: 'rgba(196,160,82,0.12)', border: '1px dashed var(--color-gold)', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600 }}>⚡ Auto-Generated Creator Code:</span>
                          <strong style={{ fontSize: '15px', letterSpacing: '0.8px', color: 'var(--color-gold)', background: '#fff', padding: '2px 10px', borderRadius: '6px', border: '1px solid rgba(196,160,82,0.3)' }}>
                            {liveAutoCode}
                          </strong>
                        </div>
                      )}

                      <div style={{ marginTop: '8px' }}>
                        <ShimmerButton 
                          type="submit"
                          disabled={status === 'loading'}
                          style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 800 }}
                        >
                          {status === 'loading' ? (
                            <Loader2 size={20} className="partner-submit-spin" />
                          ) : (
                            <>Submit &amp; Get Code <Send size={18} /></>
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
        {/* 6. FAQ */}
        {/* ========================================================================= */}
        <section style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 34px)', fontWeight: 900, marginBottom: '10px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '16px' }}>
              Everything you need to know about the Ziggers Influencer Partner Program.
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

        .responsive-container {
          padding: 48px 36px;
        }
        .responsive-inner-grid {
          padding: 36px 30px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .stats-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        @media (max-width: 768px) {
          .responsive-container {
            padding: 24px 16px !important;
            border-radius: 20px !important;
          }
          .responsive-inner-grid {
            padding: 24px 16px !important;
            border-radius: 16px !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
          .stats-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

      `}</style>
    </main>
  );
}
