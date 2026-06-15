import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  MapPin, 
  Camera, 
  Mic, 
  Cpu, 
  Database, 
  Sparkles, 
  Lock, 
  Calendar, 
  RefreshCw, 
  Mail 
} from 'lucide-react';

export default function PrivacyPolicy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '120px 0 80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Button */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="btn-secondary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '40px',
              padding: '12px 24px',
              borderRadius: '100px',
              border: '1px solid rgba(41, 33, 27, 0.1)',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: 'inherit'
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </motion.div>
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '20px', 
            backgroundColor: 'var(--color-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--color-secondary)',
            margin: '0 auto 24px',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <Shield size={32} />
          </div>
          
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            color: 'var(--color-primary)', 
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            Ziggers Privacy Policy
          </h1>
          
          <p style={{ 
            color: 'var(--color-secondary)', 
            fontWeight: '600', 
            fontSize: '15px', 
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Last Updated: May 20, 2026
          </p>
        </motion.div>

        {/* Policy Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          {/* 1. Introduction */}
          <motion.div 
            variants={itemVariants}
            className="policy-card"
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '24px', 
              padding: '32px',
              border: '1px solid rgba(41, 33, 27, 0.06)',
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', marginBottom: '16px', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'var(--color-surface)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>1</span>
              Introduction
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: '1.7' }}>
              Welcome to Ziggers. We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs our data safety practices for the Ziggers mobile application and service ecosystem.
            </p>
          </motion.div>

          {/* 2. Information We Collect */}
          <motion.div 
            variants={itemVariants}
            className="policy-card"
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '24px', 
              padding: '32px',
              border: '1px solid rgba(41, 33, 27, 0.06)',
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', marginBottom: '24px', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'var(--color-surface)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>2</span>
              Information We Collect
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Location Data */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><MapPin size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>Precise Location Data (ACCESS_FINE_LOCATION)</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    Collected to calculate geofencing boundaries, confirm worker check-in/check-out at assigned tasks, and show nearby jobs. Location data is processed only when the app is active or executing active gig check-ins.
                  </p>
                </div>
              </div>

              {/* Camera and Photos */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><Camera size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>Camera and Photos</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    Used to capture profile images, QR codes for verification, and proof-of-completion photographs uploaded by workers during task milestones.
                  </p>
                </div>
              </div>

              {/* Audio Recording */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><Mic size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>Audio Recording</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    Microphone permissions are requested exclusively to allow users to record and send voice notes in the in-app chat.
                  </p>
                </div>
              </div>

              {/* App Integrity & Telemetry */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><Cpu size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>App Integrity and Anti-Tamper Telemetry</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    Automated runtime checks to detect rooted/jailbroken devices, emulators, and instrumentation frameworks to prevent fraud and protect financial operations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. How We Process and Store Your Data */}
          <motion.div 
            variants={itemVariants}
            className="policy-card"
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '24px', 
              padding: '32px',
              border: '1px solid rgba(41, 33, 27, 0.06)',
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', marginBottom: '24px', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'var(--color-surface)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>3</span>
              How We Process and Store Your Data
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Supabase */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><Database size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>Supabase Database & Cloud Storage</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    Profile credentials, document proofs, chat threads, and wallet transactions are stored on encrypted Supabase database instances. Files are uploaded via secure, authenticated token handshakes.
                  </p>
                </div>
              </div>

              {/* Gemini AI */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><Sparkles size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>Gemini AI Integration</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    User prompt titles and parameters are securely analyzed using the Gemini AI API for task extraction. No persistent personally identifiable details are sent to third-party AI models.
                  </p>
                </div>
              </div>

              {/* Encryption */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--color-secondary)', paddingTop: '2px' }}><Lock size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-primary)' }}>No Plain Text Storage</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                    Sensitive tokens, sessions, and credentials are encrypted at rest and in memory using OS-provided secure enclaves (Keychain/Keystore).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Data Retention and Deletion */}
          <motion.div 
            variants={itemVariants}
            className="policy-card"
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '24px', 
              padding: '32px',
              border: '1px solid rgba(41, 33, 27, 0.06)',
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', marginBottom: '16px', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'var(--color-surface)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>4</span>
              Data Retention and Deletion
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: '1.7' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', marginTop: '10px', flexShrink: 0 }}></div>
                <p>Retained only as long as necessary or to comply with payment audits.</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', marginTop: '10px', flexShrink: 0 }}></div>
                <p>
                  Users can request account and data deletion via <code style={{ backgroundColor: 'var(--color-surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '14px', fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: '600' }}>Settings &gt; Account Security &gt; Request Data Deletion</code> in the app, or by emailing <a href="mailto:subaneshdev@gmail.com" style={{ color: 'var(--color-secondary)', fontWeight: '600', textDecoration: 'underline' }}>subaneshdev@gmail.com</a>. Deletions are processed within 30 business days.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 5. Changes to This Privacy Policy */}
          <motion.div 
            variants={itemVariants}
            className="policy-card"
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '24px', 
              padding: '32px',
              border: '1px solid rgba(41, 33, 27, 0.06)',
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', marginBottom: '16px', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'var(--color-surface)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>5</span>
              Changes to This Privacy Policy
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: '1.7' }}>
              Updated from time to time to reflect changes in service structures or regulations.
            </p>
          </motion.div>

          {/* 6. Contact Us */}
          <motion.div 
            variants={itemVariants}
            className="policy-card"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '24px', 
              padding: '32px',
              color: 'white',
              boxShadow: 'var(--shadow-strong)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '22px', marginBottom: '16px', color: '#fff' }}>
                <Mail size={24} style={{ color: 'var(--color-secondary)' }} />
                Contact Us
              </h3>
              <p style={{ color: '#BCAFA3', fontSize: '15px', marginBottom: '24px', maxWidth: '400px' }}>
                Got questions or concerns about your privacy? Reach out directly and our data team will assist you.
              </p>
              <a 
                href="mailto:hello@unfounded.in" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  backgroundColor: 'var(--color-secondary)', 
                  color: 'var(--color-primary)', 
                  padding: '12px 32px',
                  borderRadius: '100px',
                  fontWeight: '700',
                  fontSize: '16px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                hello@unfounded.in
              </a>
            </div>

            {/* Glowing Accent Circle */}
            <div style={{ 
              position: 'absolute', 
              bottom: '-80px', 
              right: '-80px', 
              width: '200px', 
              height: '200px', 
              borderRadius: '50%', 
              background: 'rgba(193,154,107,0.15)',
              filter: 'blur(30px)'
            }} />
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        .policy-card {
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
        }
        .policy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(41, 33, 27, 0.06) !important;
        }
      `}</style>
    </div>
  );
}
