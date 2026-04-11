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
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    
    document.querySelectorAll('button, a, input, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <motion.div
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
