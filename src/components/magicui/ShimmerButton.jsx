"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ShimmerButton({
  children,
  shimmerColor = '#ffffff',
  shimmerDuration = '3s',
  background = 'var(--color-espresso)',
  borderRadius = '100px',
  className = '',
  onClick,
  style = {},
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`magic-shimmer-btn ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '14px 28px',
        borderRadius,
        background,
        color: '#fff',
        fontWeight: 700,
        fontSize: '15px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-soft)',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          opacity: 0.25,
          animation: `shimmerSweep ${shimmerDuration} infinite`,
          transform: 'skewX(-20deg)',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
      <style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </motion.button>
  );
}
