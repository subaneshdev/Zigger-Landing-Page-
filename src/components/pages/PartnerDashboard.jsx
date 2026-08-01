"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Copy, 
  Check, 
  Share2, 
  LogOut, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ShimmerButton from '../magicui/ShimmerButton';
import { getWhatsAppShareUrl, getReferralUrl, getGroupWelcomeMessage } from '../../lib/referral';

export default function PartnerDashboard() {
  const [partner, setPartner] = useState(null);
  const [referredMembers, setReferredMembers] = useState([]);
  const [metrics, setMetrics] = useState({
    total_invited: 0,
    converted_referrals: 0,
    total_works_completed: 0,
    total_cash_earned: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toastNotice, setToastNotice] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const router = useRouter();

  const fetchDashboardData = async (userObj, isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const code = userObj?.unique_code;
      const email = userObj?.email;
      const response = await fetch(`/api/partner/auth/me?code=${code || ''}&email=${email || ''}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ziggers_partner_token') || ''}`
        }
      });
      const data = await response.json();

      if (data.success && data.partner) {
        setPartner(data.partner);
        setMetrics({
          total_invited: data.partner.total_referred_users || 0,
          converted_referrals: data.partner.active_workers_count || 0,
          total_works_completed: data.partner.total_works_completed || 0,
          total_cash_earned: data.partner.total_rewards || 0
        });
        setReferredMembers(data.referred_members || []);

        if (isManualRefresh) {
          setToastNotice('✨ Dashboard stats refreshed with live database data!');
          setTimeout(() => setToastNotice(''), 4000);
        }
      }
    } catch (err) {
      console.warn('Dashboard data fetch error:', err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('ziggers_partner_user');
    if (!stored) {
      router.push('/partner#partner-form');
      return;
    }
    try {
      const userObj = JSON.parse(stored);
      setPartner(userObj);
      fetchDashboardData(userObj);
    } catch (e) {
      router.push('/partner#partner-form');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ziggers_partner_token');
    localStorage.removeItem('ziggers_partner_user');
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  const code = partner?.unique_code || 'ZIGPARTNER';
  const welcomeText = getGroupWelcomeMessage(code);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getReferralUrl(code));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const copyWelcomeMsg = () => {
    navigator.clipboard.writeText(welcomeText);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 3000);
  };

  if (!partner && loading) {
    return (
      <main style={{ paddingTop: '140px', paddingBottom: '90px', minHeight: '100vh', background: 'var(--color-bg)', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-espresso)' }}>
          Loading Partner Dashboard...
        </div>
      </main>
    );
  }

  return (
    <main style={{ 
      paddingTop: '120px', 
      paddingBottom: '90px', 
      minHeight: '100vh', 
      background: 'var(--color-bg)', 
      color: 'var(--color-espresso)', 
      fontFamily: 'var(--font-body)' 
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Toast Notification */}
        {toastNotice && (
          <div style={{ background: '#25D366', color: '#fff', padding: '12px 20px', borderRadius: '14px', fontWeight: 800, fontSize: '14px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 14px rgba(37,211,102,0.3)' }}>
            {toastNotice}
          </div>
        )}

        {/* Header Title & Logout Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,211,102,0.12)', padding: '4px 14px', borderRadius: '100px', marginBottom: '8px' }}>
              <img src="/assets/mascot_winking.jpg" alt="Mascot" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#128C7E' }}>OFFICIAL COMMUNITY PARTNER</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
              Welcome back, {partner?.name || 'Partner'}!
            </h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: '4px 0 0' }}>
              {partner?.email ? `${partner.email} • ` : ''}Phone: {partner?.contact_number || 'N/A'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => fetchDashboardData(partner, true)}
              disabled={refreshing}
              style={{ background: '#fff', border: '1.5px solid rgba(61,43,31,0.12)', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={15} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} /> {refreshing ? 'Refreshing...' : 'Refresh Stats'}
            </button>
            <button
              onClick={handleLogout}
              style={{ background: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'none', padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* 4 Core Metrics Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '36px' }}>
          
          <div style={{ background: '#fff', padding: '24px 20px', borderRadius: '20px', border: '1.5px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-muted)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
              <DollarSign size={20} color="var(--color-gold)" /> Cash Earned
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-gold)' }}>
              ₹{metrics.total_cash_earned}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>
              Instant UPI payouts
            </div>
          </div>

          <div style={{ background: '#fff', padding: '24px 20px', borderRadius: '20px', border: '1.5px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-muted)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
              <Users size={20} color="#25D366" /> Active Workers
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#25D366' }}>
              {metrics.converted_referrals}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>
              Members working shifts
            </div>
          </div>

          <div style={{ background: '#fff', padding: '24px 20px', borderRadius: '20px', border: '1.5px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-muted)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
              <Briefcase size={20} color="#128C7E" /> Total Works Done
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#128C7E' }}>
              {metrics.total_works_completed}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>
              Completed gig shifts
            </div>
          </div>

          <div style={{ background: '#fff', padding: '24px 20px', borderRadius: '20px', border: '1.5px solid rgba(61,43,31,0.08)', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-muted)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
              <TrendingUp size={20} color="var(--color-espresso)" /> Total Invited
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-espresso)' }}>
              {metrics.total_invited}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>
              Signed up via your link
            </div>
          </div>

        </div>

        {/* Unique Referral Code Card & WhatsApp Share Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #3D2B1F 0%, #1f140e 100%)',
          color: '#fff',
          borderRadius: '24px',
          padding: '32px 28px',
          marginBottom: '36px',
          boxShadow: 'var(--shadow-strong)',
          border: '1.5px solid rgba(196,160,82,0.4)',
          position: 'relative'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
            ⚡ YOUR OFFICIAL COMMUNITY REFERRAL CODE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 900, color: '#25D366', letterSpacing: '2px', background: 'rgba(255,255,255,0.06)', padding: '10px 22px', borderRadius: '14px', border: '1px border-dashed rgba(37,211,102,0.4)' }}>
              {code}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={copyCode}
                style={{ background: copiedCode ? '#25D366' : 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {copiedCode ? <Check size={18} /> : <Copy size={18} />}
                {copiedCode ? 'Code Copied!' : 'Copy Code'}
              </button>

              <button
                type="button"
                onClick={copyLink}
                style={{ background: copiedLink ? '#25D366' : 'var(--color-gold)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {copiedLink ? <Check size={18} /> : <ExternalLink size={18} />}
                {copiedLink ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <a
            href={getWhatsAppShareUrl(code)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: '#25D366',
              color: '#fff',
              padding: '16px',
              borderRadius: '14px',
              fontWeight: 900,
              fontSize: '16px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
              width: '100%'
            }}
          >
            <Share2 size={22} /> Share Directly in Your WhatsApp Group
          </a>
        </div>

        {/* Referred Members Live Status Table */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px 28px', boxShadow: 'var(--shadow-soft)', border: '1.5px solid rgba(61,43,31,0.08)', marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={22} color="var(--color-gold)" /> Referred Community Members
            </h3>
            <span style={{ fontSize: '12px', background: '#25D366', color: '#fff', fontWeight: 800, padding: '4px 12px', borderRadius: '100px' }}>
              Supabase Live Sync
            </span>
          </div>

          {referredMembers && referredMembers.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(61,43,31,0.1)', color: 'var(--color-muted)' }}>
                    <th style={{ padding: '12px 8px' }}>Member Name &amp; Phone</th>
                    <th style={{ padding: '12px 8px' }}>Date Joined</th>
                    <th style={{ padding: '12px 8px' }}>Works Completed</th>
                    <th style={{ padding: '12px 8px' }}>Earning Status</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right' }}>Cash Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {referredMembers.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(61,43,31,0.06)' }}>
                      <td style={{ padding: '14px 8px', fontWeight: 700 }}>{m.name} ({m.phone})</td>
                      <td style={{ padding: '14px 8px', color: 'var(--color-muted)' }}>{m.date_joined}</td>
                      <td style={{ padding: '14px 8px', fontWeight: 800, color: '#128C7E' }}>{m.works_completed || 0} shifts</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{
                          background: m.status === 'REWARD_CLAIMED' ? 'rgba(37,211,102,0.15)' : 'rgba(196,160,82,0.15)',
                          color: m.status === 'REWARD_CLAIMED' ? '#128C7E' : 'var(--color-gold)',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: '100px'
                        }}>
                          {m.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 8px', fontWeight: 900, color: m.status === 'REWARD_CLAIMED' ? '#25D366' : 'var(--color-gold)', textAlign: 'right' }}>
                        {m.reward_earned}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ background: '#fcf8f3', padding: '32px 20px', borderRadius: '16px', border: '1px border-dashed rgba(196,160,82,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚀</div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px', color: 'var(--color-espresso)' }}>
                Your Partner Link is Ready to Share!
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                No members have signed up using your code yet. Share your code <strong>{code}</strong> in your group to start earning ₹20 per referral!
              </p>
            </div>
          )}
        </div>

        {/* WhatsApp Group Announcement Template */}
        <div style={{ background: '#111b21', color: '#e9edef', borderRadius: '24px', padding: '32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                Copyable WhatsApp Group Announcement Message
              </h3>
              <p style={{ color: '#8696a0', fontSize: '13px', margin: 0 }}>
                Copy &amp; paste this message into your WhatsApp group!
              </p>
            </div>
            <button
              onClick={copyWelcomeMsg}
              style={{ background: copiedMsg ? '#25D366' : 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {copiedMsg ? <Check size={16} /> : <Copy size={16} />}
              {copiedMsg ? 'Copied Announcement!' : 'Copy Template'}
            </button>
          </div>

          <div style={{ background: '#202c33', borderRadius: '14px', padding: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.7, color: '#d1d7db', whiteSpace: 'pre-wrap' }}>
            {welcomeText}
          </div>
        </div>

      </div>
    </main>
  );
}
