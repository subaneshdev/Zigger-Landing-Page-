"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * StaggeredText Component (React Bits Pro specification)
 * 
 * High-performance, staggered text reveal animation powered by Framer Motion.
 * Supports character, word, and line segmentation with viewport scroll lazy-loading.
 * 
 * @param {string} text - The text string to animate
 * @param {string} as - HTML tag to render (h1, h2, h3, h4, p, span, div)
 * @param {'characters'|'words'|'lines'|'Characters'|'Words'|'Lines'} segmentBy - How to split the text
 * @param {'forward'|'reverse'|'random'|'center'|'Forward'|'Reverse'|'Random'|'Center'} staggerDirection - Stagger sequence order
 * @param {'top'|'bottom'|'left'|'right'|'Top'|'Bottom'|'Left'|'Right'} direction - Direction of movement
 * @param {number|string} duration - Duration of each segment's transition (e.g. 0.6 or "0.6s")
 * @param {number|string} delay - Initial delay before animation starts
 * @param {number|string} staggerDelay - Delay between consecutive segments
 * @param {string|number[]} easing - Easing curve (easeOut, easeInOut, anticipate, or cubic bezier array)
 * @param {boolean} triggerOnScroll - Trigger animation when scrolled into viewport
 * @param {boolean} once - Only animate once when scrolled into view
 * @param {string[]} highlightWords - Array of words to highlight with accent/gold color
 * @param {string} highlightClassName - CSS class for highlighted words
 * @param {string} className - Wrapper CSS class
 * @param {object} style - Wrapper inline styles
 */
export function StaggeredText({
  text = '',
  as = 'span',
  segmentBy = 'words',
  staggerDirection = 'forward',
  direction = 'bottom',
  duration = 0.5,
  delay = 0,
  staggerDelay = 0.04,
  easing = [0.22, 1, 0.36, 1],
  triggerOnScroll = true,
  once = true,
  highlightWords = [],
  highlightClassName = '',
  highlightStyle = {},
  className = '',
  style = {},
  ...props
}) {
  // Normalize string/number values
  const parseTime = (val, fallback) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      if (val.endsWith('ms')) return parseFloat(val) / 1000;
      if (val.endsWith('s')) return parseFloat(val);
      return parseFloat(val) || fallback;
    }
    return fallback;
  };

  const parsedDuration = parseTime(duration, 0.5);
  const parsedDelay = parseTime(delay, 0);
  const parsedStaggerDelay = parseTime(staggerDelay, 0.04);
  const normSegmentBy = String(segmentBy).toLowerCase();
  const normStaggerDir = String(staggerDirection).toLowerCase();
  const normDirection = String(direction).toLowerCase();

  // Easing mapping
  const easingMap = {
    linear: 'linear',
    easein: 'easeIn',
    easeout: 'easeOut',
    easeinout: 'easeInOut',
    anticipate: 'anticipate',
    circout: [0, 0.55, 0.45, 1],
    backout: [0.34, 1.56, 0.64, 1]
  };

  const resolvedEasing = typeof easing === 'string' 
    ? (easingMap[easing.toLowerCase()] || [0.22, 1, 0.36, 1])
    : easing;

  // Direction offsets
  const getInitialOffset = () => {
    switch (normDirection) {
      case 'top': return { y: '-100%', x: 0 };
      case 'bottom': return { y: '100%', x: 0 };
      case 'left': return { x: '-60%', y: 0 };
      case 'right': return { x: '60%', y: 0 };
      default: return { y: '100%', x: 0 };
    }
  };

  const offset = getInitialOffset();

  // Split text into tokens
  const segments = useMemo(() => {
    if (!text) return [];
    if (normSegmentBy === 'characters' || normSegmentBy === 'chars') {
      return text.split('').map((char, index) => ({
        id: index,
        content: char,
        isSpace: char === ' ',
        isHighlight: false
      }));
    }

    if (normSegmentBy === 'lines') {
      return text.split('\n').map((line, index) => ({
        id: index,
        content: line,
        isSpace: false,
        isHighlight: false
      }));
    }

    // Default: 'words'
    return text.split(/(\s+)/).map((segment, index) => {
      const isSpace = /^\s+$/.test(segment);
      const cleanWord = segment.trim().replace(/[.,!?;:()]/g, '');
      const isHighlight = highlightWords.some(
        hw => hw.toLowerCase() === cleanWord.toLowerCase()
      );
      return {
        id: index,
        content: segment,
        isSpace,
        isHighlight
      };
    });
  }, [text, normSegmentBy, highlightWords]);

  // Compute staggered delay sequence for each segment
  const getStaggerIndex = (index, total) => {
    if (total <= 1) return 0;
    switch (normStaggerDir) {
      case 'reverse':
      case 'backward':
        return total - 1 - index;
      case 'center': {
        const mid = (total - 1) / 2;
        return Math.abs(index - mid);
      }
      case 'edges': {
        const mid = (total - 1) / 2;
        return mid - Math.abs(index - mid);
      }
      case 'random': {
        const pseudo = ((index * 9301 + 49297) % 233280) / 233280;
        return pseudo * total;
      }
      case 'forward':
      default:
        return index;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: parsedDelay,
        staggerChildren: parsedStaggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: 'blur(4px)'
    },
    visible: (customIndex) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: parsedDuration,
        delay: parsedDelay + customIndex * parsedStaggerDelay,
        ease: resolvedEasing
      }
    })
  };

  const MotionComponent = motion[as] || motion.span;

  return (
    <MotionComponent
      className={`staggered-text-wrapper ${className}`.trim()}
      initial="hidden"
      whileInView={triggerOnScroll ? "visible" : undefined}
      animate={!triggerOnScroll ? "visible" : undefined}
      viewport={triggerOnScroll ? { once, margin: "-40px" } : undefined}
      variants={containerVariants}
      style={{
        display: as === 'span' ? 'inline-flex' : 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        verticalAlign: 'baseline',
        ...style
      }}
      {...props}
    >
      {segments.map((seg, idx) => {
        if (seg.isSpace) {
          return <span key={idx} style={{ whiteSpace: 'pre' }}> </span>;
        }

        const staggerIdx = getStaggerIndex(idx, segments.length);

        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'baseline',
              paddingBottom: '0.05em'
            }}
          >
            <motion.span
              custom={staggerIdx}
              variants={itemVariants}
              initial="hidden"
              whileInView={triggerOnScroll ? "visible" : undefined}
              animate={!triggerOnScroll ? "visible" : undefined}
              viewport={triggerOnScroll ? { once, margin: "-40px" } : undefined}
              className={seg.isHighlight ? highlightClassName : undefined}
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity, filter',
                color: seg.isHighlight ? 'var(--color-gold)' : 'inherit',
                ...highlightStyle
              }}
            >
              {seg.content}
            </motion.span>
          </span>
        );
      })}
    </MotionComponent>
  );
}

export default StaggeredText;
