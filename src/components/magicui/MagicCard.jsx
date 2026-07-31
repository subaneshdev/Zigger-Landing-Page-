"use client";
import React, { useState } from 'react';

export default function MagicCard({
  children,
  className = '',
  gradientColor = 'rgba(196, 160, 82, 0.15)',
  style = {},
  onClick,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`magic-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: '24px',
        border: '1.5px solid rgba(61, 43, 31, 0.08)',
        background: '#ffffff',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-soft)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        ...style,
      }}
    >
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 40%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
