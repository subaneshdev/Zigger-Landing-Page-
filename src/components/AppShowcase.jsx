import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bookmark, Plus, Grid, Home, MessageSquare, User, Bell } from 'lucide-react';

export default function AppShowcase() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      position: 'relative',
      perspective: '1000px'
    }}>
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotateY: [0, 5, 0],
          rotateX: [5, 10, 5]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          backgroundColor: '#FCFBFA',
          borderRadius: '40px',
          padding: '24px 20px',
          boxShadow: '0 25px 60px rgba(41, 33, 27, 0.4), inset 0 2px 10px rgba(255,255,255,0.7)',
          border: '8px solid #E5DFD9',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
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
        <motion.div 
          whileHover={{ scale: 1.02 }}
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            borderRadius: '24px', 
            padding: '24px', 
            color: 'white',
            marginBottom: '16px',
            boxShadow: '0 10px 30px rgba(41, 33, 27, 0.2)'
          }}
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
        </motion.div>

        {/* Action Cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <motion.div 
            whileHover={{ y: -5 }}
            style={{ flex: 1, backgroundColor: 'var(--color-surface)', borderRadius: '24px', padding: '24px 16px', boxShadow: 'inset 0 2px 5px white, 0 4px 15px rgba(0,0,0,0.03)' }}
          >
            <div style={{ width: '40px', height: '40px', backgroundColor: '#EDE5DC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-accent)' }}>
              <Plus size={20} />
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '4px' }}>POST A GIG</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Start hiring</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            style={{ flex: 1, backgroundColor: 'var(--color-surface)', borderRadius: '24px', padding: '24px 16px', boxShadow: 'inset 0 2px 5px white, 0 4px 15px rgba(0,0,0,0.03)' }}
          >
            <div style={{ width: '40px', height: '40px', backgroundColor: '#E0D8D0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-primary)' }}>
              <Grid size={20} />
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '4px' }}>MANAGE GIGS</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Track work</p>
          </motion.div>
        </div>

        {/* Serif Heading */}
        <div style={{ marginBottom: '16px' }}>
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
          marginTop: 'auto'
        }}>
          <div style={{ padding: '8px 16px', backgroundColor: '#3A3028', borderRadius: '16px', color: 'var(--color-accent)' }}>
             <Home size={20} />
          </div>
          <div style={{ padding: '8px' }}><Plus size={20} /></div>
          <div style={{ padding: '8px' }}><MessageSquare size={20} /></div>
          <div style={{ padding: '8px' }}><User size={20} /></div>
        </div>

      </motion.div>
      
      {/* Decorative Blur */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.3, zIndex: -1 }}></div>
    </div>
  );
}
