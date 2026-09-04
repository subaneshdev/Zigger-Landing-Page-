"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "!@#$%^&*<>{}[]|/\\~";

export function LoaderGlitchText({
  text = "LOADING",
  intensity = "medium",
  className,
  style,
}) {
  const [displayText, setDisplayText] = useState(text);
  const textRef = useRef(text);
  const rafRef = useRef(0);
  const lastScrambleRef = useRef(0);
  const scrambleTimeoutRef = useRef(undefined);

  textRef.current = text;

  const intensityConfig = {
    subtle: {
      translateScale: 1,
      duration: "4s",
      interval: 300,
      scrambleChars: 1,
    },
    medium: {
      translateScale: 1,
      duration: "2s",
      interval: 150,
      scrambleChars: 2,
    },
    heavy: {
      translateScale: 1.5,
      duration: "1s",
      interval: 80,
      scrambleChars: 3,
    },
  }[intensity] || {
    translateScale: 1,
    duration: "2s",
    interval: 150,
    scrambleChars: 2,
  };

  const scrambleText = useCallback(() => {
    const chars = textRef.current.split("");
    const indices = new Set();

    while (
      indices.size < Math.min(intensityConfig.scrambleChars, chars.length)
    ) {
      indices.add(Math.floor(Math.random() * chars.length));
    }

    const scrambled = chars.map((char, i) =>
      indices.has(i) && char !== " "
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : char
    );

    setDisplayText(scrambled.join(""));

    scrambleTimeoutRef.current = setTimeout(() => {
      setDisplayText(textRef.current);
    }, 50 + Math.random() * 50);
  }, [intensityConfig.scrambleChars]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    let running = true;

    const animate = (timestamp) => {
      if (!running) return;

      if (timestamp - lastScrambleRef.current >= intensityConfig.interval) {
        lastScrambleRef.current = timestamp;
        scrambleText();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrambleTimeoutRef.current) {
        clearTimeout(scrambleTimeoutRef.current);
      }
    };
  }, [intensityConfig.interval, scrambleText]);

  return (
    <>
      <style>{`
        @keyframes glitch-clip-1 {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(calc(-2px * var(--translate-scale)), calc(-1px * var(--translate-scale))); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(calc(1px * var(--translate-scale)), calc(2px * var(--translate-scale))); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(calc(-1px * var(--translate-scale)), calc(3px * var(--translate-scale))); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(calc(3px * var(--translate-scale)), calc(-1px * var(--translate-scale))); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(calc(-2px * var(--translate-scale)), calc(2px * var(--translate-scale))); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(calc(2px * var(--translate-scale)), calc(-2px * var(--translate-scale))); }
        }

        @keyframes glitch-clip-2 {
          0% { clip-path: inset(65% 0 13% 0); transform: translate(calc(2px * var(--translate-scale)), calc(1px * var(--translate-scale))); }
          20% { clip-path: inset(79% 0 14% 0); transform: translate(calc(-3px * var(--translate-scale)), 0px); }
          40% { clip-path: inset(32% 0 52% 0); transform: translate(calc(1px * var(--translate-scale)), calc(-2px * var(--translate-scale))); }
          60% { clip-path: inset(8% 0 76% 0); transform: translate(calc(-1px * var(--translate-scale)), calc(3px * var(--translate-scale))); }
          80% { clip-path: inset(71% 0 2% 0); transform: translate(calc(3px * var(--translate-scale)), calc(1px * var(--translate-scale))); }
          100% { clip-path: inset(15% 0 62% 0); transform: translate(calc(-2px * var(--translate-scale)), calc(-1px * var(--translate-scale))); }
        }
      `}</style>
      <output
        data-slot="loader-glitch-text"
        aria-live="polite"
        aria-label={text}
        className={cn("relative inline-block select-none", className)}
        style={{
          "--translate-scale": intensityConfig.translateScale,
          ...style,
        }}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="relative" style={{ color: "inherit" }}>
          {displayText}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            color: "var(--color-gold, #C19A6B)",
            animation: `glitch-clip-1 ${intensityConfig.duration} infinite linear alternate-reverse`,
            pointerEvents: "none",
          }}
        >
          {displayText}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            color: "var(--color-espresso, #3D2B1F)",
            opacity: 0.4,
            animation: `glitch-clip-2 ${intensityConfig.duration} infinite linear alternate-reverse`,
            pointerEvents: "none",
          }}
        >
          {displayText}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)",
          }}
        />
      </output>
    </>
  );
}

export default LoaderGlitchText;
