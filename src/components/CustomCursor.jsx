import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Event delegation for hover states
      const target = e.target.closest('button, a, input, [role="button"], .feature-card, .policy-card');
      setIsHovered(!!target);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor-element"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isHovered ? 60 : 20,
        height: isHovered ? 60 : 20,
        borderRadius: '50%',
        backgroundColor: isHovered ? 'var(--color-secondary)' : 'var(--color-primary)',
        mixBlendMode: isHovered ? 'difference' : 'normal',
        pointerEvents: 'none',
        zIndex: 10000,
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
        opacity: 0.8,
        border: isHovered ? '1px solid white' : 'none',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250 }}
    />
  );
}
