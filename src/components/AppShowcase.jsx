import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bookmark, Plus, Grid, Home, MessageSquare, User, Bell } from 'lucide-react';
import { gsap } from 'gsap';

export default function AppShowcase() {
  const cardRef = useRef(null);

  useEffect(() => {
    // Initial slight 3D angle setup
    if (cardRef.current) {
      gsap.set(cardRef.current, {
        rotateX: 8,
        rotateY: -8,
        transformPerspective: 1000
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth interactive tilt
    gsap.to(card, {
      rotateY: x * 0.08,
      rotateX: -y * 0.08,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    // Return to default resting tilt smoothly
    gsap.to(card, {
      rotateX: 8,
      rotateY: -8,
      ease: 'power3.out',
      duration: 0.8
    });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      position: 'relative',
      perspective: '1000px'
    }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: '#FCFBFA',
          borderRadius: '40px',
          padding: '24px 20px',
          boxShadow: '0 25px 60px rgba(41, 33, 27, 0.4), inset 0 2px 10px rgba(255,255,255,0.7)',
          border: '8px solid #E5DFD9',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 35px 80px rgba(41, 33, 27, 0.5), inset 0 2px 10px rgba(255,255,255,0.7)';
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', transform: 'translateZ(20px)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5DFD9', backgroundImage: 'url(https://i.pravatar.cc/150?img=11)', backgroundSize: 'cover' }}></div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Hello, Emp...</p>
              <h4 style={{ fontSize: '20px', fontWeight: '800', lineHeight: 1 }}>saai</h4>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <div style={{ padding: '4px 12px', borderRadius: '100px', border: '1px solid #10B981', color: '#10B981', fontSize: '10px', fontWeight: '700' }}>✔ VERIFIED</div>
             <Bell size={20} color="var(--color-text-muted)" />
          </div>
        </div>

        {/* Balance Card */}
        <div 
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            borderRadius: '24px', 
            padding: '24px', 
            color: 'white',
            marginBottom: '16px',
            boxShadow: '0 10px 30px rgba(41, 33, 27, 0.2)',
            transform: 'translateZ(40px)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateZ(50px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateZ(40px)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#BCAFA3' }}>Available Balance</p>
             <Bookmark size={16} color="#BCAFA3" />
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '24px', letterSpacing: '-1px' }}>₹431461.00</h2>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '12px' }}>
              ADD FUNDS
            </button>
            <button style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid #5A4E46', color: 'white', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '12px' }}>
              WITHDRAW
            </button>
          </div>
        </div>

        {/* Action Cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', transform: 'translateZ(30px)' }}>
          <div 
            style={{ 
              flex: 1, 
              backgroundColor: 'var(--color-surface)', 
              borderRadius: '24px', 
              padding: '24px 16px', 
              boxShadow: 'inset 0 2px 5px white, 0 4px 15px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            <div style={{ width: '40px', height: '40px', backgroundColor: '#EDE5DC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-accent)' }}>
              <Plus size={20} />
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '4px' }}>POST A GIG</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Start hiring</p>
          </div>

          <div 
            style={{ 
              flex: 1, 
              backgroundColor: 'var(--color-surface)', 
              borderRadius: '24px', 
              padding: '24px 16px', 
              boxShadow: 'inset 0 2px 5px white, 0 4px 15px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            <div style={{ width: '40px', height: '40px', backgroundColor: '#E0D8D0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-primary)' }}>
              <Grid size={20} />
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '4px' }}>MANAGE GIGS</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Track work</p>
          </div>
        </div>

        {/* Serif Heading */}
        <div style={{ marginBottom: '16px', transform: 'translateZ(20px)' }}>
           <h3 style={{ fontFamily: 'var(--font-accent)', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>CURRENT GIGS & TRAC...</h3>
        </div>

        {/* Bottom Nav Mock */}
        <div style={{ 
          backgroundColor: 'var(--color-primary)', 
          borderRadius: '30px', 
          padding: '16px 32px', 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#655B53',
          marginTop: 'auto',
          transform: 'translateZ(10px)'
        }}>
          <div style={{ padding: '8px 16px', backgroundColor: '#3A3028', borderRadius: '16px', color: 'var(--color-accent)' }}>
             <Home size={20} />
          </div>
          <div style={{ padding: '8px' }}><Plus size={20} /></div>
          <div style={{ padding: '8px' }}><MessageSquare size={20} /></div>
          <div style={{ padding: '8px' }}><User size={20} /></div>
        </div>

      </div>
      
      {/* Decorative Blur */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.3, zIndex: -1 }}></div>
    </div>
  );
}
