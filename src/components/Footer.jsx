import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PlayStoreButton from './PlayStoreButton';
import { getSectionIdFromHref, scrollToSection } from '../lib/scrollToSection';

function SectionLink({ to, children, style }) {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionId = getSectionIdFromHref(to);

  if (!sectionId) {
    return <Link to={to} style={style}>{children}</Link>;
  }

  return (
    <a
      href={to}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
          navigate('/', { state: { scrollTo: sectionId } });
        } else {
          window.history.pushState(null, '', to);
          scrollToSection(sectionId);
        }
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-linen)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--color-espresso)',
            borderRadius: '24px',
            padding: '48px 32px',
            textAlign: 'center',
            marginBottom: '64px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '12px', color: 'white' }}>
              Ziggers is <span style={{ color: 'var(--color-gold)' }}>live</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
              Download the staffing app to post gig jobs, find flexible work, track shifts, and get paid securely.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PlayStoreButton label="Get it on Google Play" size="lg" />
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: '28px', marginBottom: '48px' }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--color-espresso)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '13px' }}>Z</div>
              <span style={{ fontSize: '18px', fontWeight: 800 }}>Ziggers</span>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6 }}>
              India's AI-powered gig marketplace for flexible work. Hire temporary staff or find part-time and daily wage jobs — reliable, tracked, and secure.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '15px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-muted)' }}>
              <Link to="/hire">Hire Gig Workers</Link>
              <Link to="/work">Find Part-time Jobs</Link>
              <SectionLink to="/#features">Features</SectionLink>
              <SectionLink to="/#trust">Trust & Safety</SectionLink>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '15px' }}>Job Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-muted)' }}>
              <Link to="/catering-jobs">Catering Jobs</Link>
              <Link to="/waiter-jobs">Waiter Jobs</Link>
              <Link to="/driver-jobs">Driver Jobs</Link>
              <Link to="/delivery-jobs">Delivery Jobs</Link>
              <Link to="/event-staff">Event Staff</Link>
              <Link to="/student-part-time-jobs">Student Part-time Jobs</Link>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '15px' }}>Jobs by City</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-muted)' }}>
              <Link to="/jobs-in-chennai">Jobs in Chennai</Link>
              <Link to="/jobs-in-bangalore">Jobs in Bangalore</Link>
              <Link to="/jobs-in-hyderabad">Jobs in Hyderabad</Link>
              <Link to="/jobs-in-mumbai">Jobs in Mumbai</Link>
              <Link to="/catering-jobs-chennai">Catering Jobs in Chennai</Link>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '15px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-muted)' }}>
              <Link to="/">About</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(61,43,31,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>© {new Date().getFullYear()} Ziggers. All rights reserved.</p>
          <p style={{ fontSize: '12px', color: 'var(--color-muted)' }}>hello@unfounded.in · Chennai Gig Jobs · India Gig Platform</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
