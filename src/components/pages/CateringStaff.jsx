import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CateringStaff() {
  useEffect(() => {
    document.title = "Hire Catering Staff in Chennai | Ziggers";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Need reliable catering staff in Chennai for your event or wedding? Hire background-checked servers and food service professionals instantly with Ziggers.');
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Hire Catering Staff in Chennai</span>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '32px',
            padding: '60px 40px',
            border: '1px solid rgba(41, 33, 27, 0.06)',
            boxShadow: 'var(--shadow-soft)',
            marginBottom: '60px',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: '48px', color: 'var(--color-primary)', marginBottom: '24px', fontFamily: 'var(--font-heading)', lineHeight: '1.1' }}>
            Hire Catering Staff in <span style={{ color: 'var(--color-accent)' }}>Chennai</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Hosting a wedding, corporate event, or a private party? Connect with locally verified servers, kitchen helpers, and food service professionals in Chennai instantly. 
          </p>
          <a 
            href="/#waitlist" 
            className="btn-primary"
            style={{ display: 'inline-flex', padding: '16px 32px', fontSize: '16px', borderRadius: '100px', textDecoration: 'none' }}
          >
            Download the App to Book Staff
          </a>
        </motion.div>

        {/* Features Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '40px', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
            Why Choose Ziggers for Event Catering Staff?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(41, 33, 27, 0.06)' }}
            >
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '24px' }}>
                <Utensils size={24} />
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: '700' }}>Trained Service Professionals</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Whether you need servers, bussers, or prep cooks, get access to experienced catering staff who ensure your guests are well taken care of.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(41, 33, 27, 0.06)' }}
            >
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '24px' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: '700' }}>On-Time Reliability</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Events are time-sensitive. Track your staff's arrival in real-time to ensure your kitchen and dining areas are fully prepped before guests arrive.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(41, 33, 27, 0.06)' }}
            >
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '24px' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: '700' }}>Verified Background Checks</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Safety and professionalism matter at events. All Ziggers catering personnel undergo rigorous background checks and KYC verification.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
