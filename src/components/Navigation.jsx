import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Home, Briefcase, Star, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PlayStoreButton from './PlayStoreButton';
import { getSectionIdFromHref, scrollToSection } from '../lib/scrollToSection';

export default function Navigation() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') return undefined;

    const sectionId = location.state?.scrollTo || (location.hash ? location.hash.slice(1) : null);
    if (!sectionId) {
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return undefined;
    }

    const timer = setTimeout(() => scrollToSection(sectionId), 150);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, location.state?.scrollTo]);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    const current = scrollYProgress.get();
    const previous = scrollYProgress.getPrevious();
    const direction = current - previous;

    if (scrollYProgress.get() < 0.05) {
      setVisible(true);
    } else if (direction < 0) {
      setVisible(true);
    } else {
      setVisible(false);
      setMobileMenuOpen(false);
    }
  });

  const navItems = [
    { name: 'Hire Gig Workers', href: '/hire', icon: <Briefcase size={16} /> },
    { name: 'Find Jobs', href: '/work', icon: <Home size={16} /> },
    { name: 'Features', href: '/#features', icon: <Star size={16} /> },
    { name: 'Trust', href: '/#trust', icon: <ShieldCheck size={16} /> },
  ];

  const goToSection = (href) => {
    const sectionId = getSectionIdFromHref(href);
    if (!sectionId) return;

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    window.history.pushState(null, '', href);
    scrollToSection(sectionId);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const sectionId = getSectionIdFromHref(href);
    if (sectionId) {
      goToSection(href);
      return;
    }

    navigate(href);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header
          className="site-header"
          initial={{ opacity: 1, y: '-100%' }}
          animate={{ y: visible ? 0 : '-100%', opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="container site-header-inner">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo(0, 0);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: 'var(--color-espresso)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                Z
              </div>
              <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-espresso)' }}>Ziggers</span>
            </Link>

            <nav className="hidden md-flex site-header-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: location.pathname === item.href ? 'var(--color-espresso)' : 'var(--color-muted)',
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>

            <div className="site-header-actions">
              <div className="hidden md-flex">
                <PlayStoreButton label="Download" size="md" />
              </div>

              <button
                className="md-hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-espresso)',
                  display: 'flex',
                  padding: '8px',
                }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && visible && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(61, 43, 31, 0.08)',
              boxShadow: 'var(--shadow-soft)',
              zIndex: 99,
            }}
          >
            <div
              className="container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-espresso)',
                  }}
                >
                  <div style={{ color: 'var(--color-gold)' }}>{item.icon}</div>
                  {item.name}
                </a>
              ))}
              <PlayStoreButton label="Download on Google Play" style={{ width: '100%', justifyContent: 'center' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden.md-flex { display: none !important; }
        }
        @media (min-width: 769px) {
          .md-hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}
