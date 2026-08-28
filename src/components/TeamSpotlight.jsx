"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Linkedin } from 'lucide-react';

export const TEAM_MEMBERS = [
  {
    id: 'subanesh',
    name: 'Subanesh C',
    role: 'Chief Executive Officer (CEO)',
    shortRole: 'CEO',
    image: '/assets/team/subanesh.jpg',
    email: 'c.subanesh@gmail.com',
    linkedin: 'https://www.linkedin.com/in/subanesh-c/',
    bio: 'Leading Ziggers mission to organize and empower India gig workforce with verified instant staffing and on-demand daily wage opportunities.'
  },
  {
    id: 'vijayrajkumar',
    name: 'Vijayrajkumar',
    role: 'Chief Operating Officer (COO)',
    shortRole: 'COO',
    image: '/assets/team/vijayrajkumar.png',
    email: 'vijaykumarunfounded@gmail.com',
    linkedin: 'https://www.linkedin.com/in/vijayrajkumar-p/',
    bio: 'Spearheading ground operations, partner network growth, and hyper-local workforce fulfillment across metropolitan hubs.'
  },
  {
    id: 'jeeva',
    name: 'Jeeva',
    role: 'Chief Technology Officer (CTO)',
    shortRole: 'CTO',
    image: '/assets/team/jeeva.jpg',
    objectPosition: 'center 4%',
    email: 'jeeva@ziggers.in',
    linkedin: 'https://www.linkedin.com/in/jeeva-cto/',
    bio: 'Directing overarching technology architecture, platform scalability, and distributed backend infrastructure.'
  },
  {
    id: 'mukesh',
    name: 'Mukesh',
    role: 'Head of Engineering',
    shortRole: 'Head of Engg',
    image: '/assets/team/mukesh.jpg',
    email: 'mukesh@ziggers.in',
    linkedin: 'https://www.linkedin.com/in/mukesh-eng/',
    bio: 'Leading core product engineering, low-latency microservices, and mobile system reliability for high-frequency gig transactions.'
  },
  {
    id: 'harishraj',
    name: 'Harish Raj',
    role: 'Chief Product Officer (CPO)',
    shortRole: 'CPO',
    image: '/assets/team/harishraj.png',
    email: 'harish@ziggers.in',
    linkedin: 'https://www.linkedin.com/in/harish-raj/',
    bio: 'Architecting frictionless user experiences and cutting-edge matching algorithms for workers and enterprise hiring managers.'
  },
  {
    id: 'saaiabishek',
    name: 'Saai Abishek',
    role: 'Chief Marketing Officer (CMO)',
    shortRole: 'CMO',
    image: '/assets/team/saaiabishek.jpg',
    email: 'saaiabishek@ziggers.in',
    linkedin: 'https://www.linkedin.com/in/saai-abishek/',
    bio: 'Driving brand awareness, digital engagement campaigns, and community growth for Indias next-generation gig workforce.'
  },
  {
    id: 'vinayak',
    name: 'Vinayak',
    role: 'Chief Information Officer (CIO)',
    shortRole: 'CIO',
    image: '/assets/team/vinayak.png',
    email: 'vinayak@ziggers.in',
    linkedin: 'https://www.linkedin.com/in/vinayak-cio/',
    bio: 'Managing core information systems, enterprise data security, and platform reliability at scale.'
  }
];

export default function TeamSpotlight({ members = TEAM_MEMBERS }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const count = members.length;

  const goNext = useCallback(() => {
    if (count === 0) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count === 0) return;
    setDirection(-1);
    setIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  // Relative offset around circular loop
  const getRelativePosition = (i) => {
    if (count === 0) return 0;
    let diff = i - index;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  const currentMember = members[index];

  return (
    <div className="team-spotlight-container" ref={containerRef} style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Spotlight Stage */}
      <div style={{ position: 'relative', width: '100%', height: '430px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 12px' }}>
        
        {members.map((member, i) => {
          const rel = getRelativePosition(i);
          const isCenter = rel === 0;
          const distance = Math.abs(rel);
          
          // Responsive horizontal spread calculation
          const baseX = rel === 0 ? 0 : rel === -1 ? -180 : rel === 1 ? 180 : rel < 0 ? -320 : 320;
          const scale = distance === 0 ? 1 : distance === 1 ? 0.88 : 0.74;
          const rotate = rel === 0 ? 0 : rel < 0 ? -4 : 4;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.75 : 0.35;
          const blur = distance === 0 ? 0 : distance === 1 ? 2 : 5;
          const zIndexBase = count - distance;
          const isWrappingRight = direction === 1 && rel === Math.floor(count / 2);
          const isWrappingLeft = direction === -1 && rel === -Math.floor((count - 1) / 2);
          const zIndex = isWrappingRight || isWrappingLeft ? 0 : zIndexBase;

          return (
            <motion.div
              key={member.id || i}
              style={{
                position: 'absolute',
                borderRadius: '24px',
                transformOrigin: 'center center',
                cursor: isCenter ? 'default' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex
              }}
              animate={{
                x: baseX,
                scale,
                rotate,
                opacity,
                filter: `blur(${blur}px)`
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
                mass: 0.8
              }}
              onClick={() => {
                if (!isCenter) {
                  setDirection(rel > 0 ? 1 : -1);
                  setIndex(i);
                }
              }}
            >
              {/* Photo Frame */}
              <div 
                style={{
                  width: '270px',
                  height: '360px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#f1ede7',
                  border: isCenter ? '3px solid var(--color-gold)' : '1.5px solid rgba(61,43,31,0.1)',
                  boxShadow: isCenter ? '0 20px 48px rgba(61,43,31,0.22)' : '0 6px 16px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: member.objectPosition || 'center 12%',
                    display: 'block'
                  }}
                />

                {/* Role Pill on Image */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: isCenter ? 'rgba(61, 43, 31, 0.92)' : 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(8px)',
                  color: isCenter ? 'var(--color-gold)' : '#fff',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  {member.shortRole}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Center Member Details (Without Executive Leadership Badge, Compact Spacing) */}
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMember.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h3 style={{ fontSize: '30px', fontWeight: 900, color: 'var(--color-espresso)', margin: '0 0 4px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
              {currentMember.name}
            </h3>

            <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 10px' }}>
              {currentMember.role}
            </p>

            <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.5, maxWidth: '520px', margin: '0 0 16px' }}>
              {currentMember.bio}
            </p>

            {/* Social & Contact Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {currentMember.email && (
                <a
                  href={`mailto:${currentMember.email}`}
                  title="Send Email"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 15px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-espresso)',
                    border: '1.5px solid rgba(61,43,31,0.15)',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Mail size={14} color="var(--color-gold)" /> Email
                </a>
              )}
              {currentMember.linkedin && (
                <a
                  href={currentMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn Profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 15px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: 'var(--color-espresso)',
                    color: '#fff',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-soft)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Linkedin size={14} color="#fff" /> LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginTop: '24px' }}>
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous member"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-espresso)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(61,43,31,0.2)',
            transition: 'transform 0.2s, background-color 0.2s'
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Counter indicators */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? '24px' : '7px',
                height: '7px',
                borderRadius: '100px',
                backgroundColor: i === index ? 'var(--color-gold)' : 'rgba(61,43,31,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                padding: 0
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next member"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-espresso)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(61,43,31,0.2)',
            transition: 'transform 0.2s, background-color 0.2s'
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
}
