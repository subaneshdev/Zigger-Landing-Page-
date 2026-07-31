"use client";
import React from 'react';

export default function AnimatedShinyText({ children, className = '', style = {} }) {
  return (
    <span
      className={`animated-shiny-text ${className}`}
      style={{
        background: 'linear-gradient(110deg, #3D2B1F 35%, #C4A052 50%, #3D2B1F 65%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'shinyText 3s infinite linear',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
      <style>{`
        @keyframes shinyText {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </span>
  );
}
