import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Home, Briefcase, Star, ShieldCheck } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navigation() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        // Always show at the very top
        setVisible(true);
      } else {
        if (direction < 0) {
          // Scrolling up
          setVisible(true);
        } else {
          // Scrolling down
          setVisible(false);
          setMobileMenuOpen(false); // Close menu if scrolling down
        }
      }
    }
  });

  const navItems = [
    { name: 'Hire', href: '#hire', icon: <Briefcase size={16} /> },
    { name: 'Work', href: '#work', icon: <Home size={16} /> },
    { name: 'Features', href: '#features', icon: <Star size={16} /> },
    { name: 'Trust', href: '#trust', icon: <ShieldCheck size={16} /> },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ 
            position: 'fixed', 
            top: '40px', 
            left: 0, 
            right: 0, 
            margin: '0 auto', 
            width: 'max-content', 
            maxWidth: '90vw', 
            zIndex: 100 
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '12px 12px 12px 24px',
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '100px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 20px 40px rgba(41, 33, 27, 0.08)'
          }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
               <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--color-primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>Z</div>
            </a>

            {/* Desktop Links */}
            <div className="hidden md-flex" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: 'var(--color-text-muted)',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                >
                  {item.icon} <span style={{ paddingTop: '2px' }}>{item.name}</span>
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Magnetic>
                 <a href="#waitlist" className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '100px' }}>
                    Join Waitlist
                 </a>
              </Magnetic>

              {/* Mobile Menu Toggle */}
              <button 
                className="md-hidden" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '50%'
                }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'fixed', 
              top: '110px', 
              left: '5vw', 
              right: '5vw', 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              padding: '24px', 
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: 'var(--shadow-strong)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px',
              zIndex: 99
            }}
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: 'var(--color-primary)'
                }}
              >
                <div style={{ color: 'var(--color-accent)' }}>{item.icon}</div>
                {item.name}
              </a>
            ))}
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
