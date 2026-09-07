"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  repeat = true,
  repeatDelay = 2500,
  pauseDuration = 500,
  delay = 0,
  style = {},
  className = "",
}) {
  const elementRef = useRef(null);

  const isInView = useInView(elementRef, {
    once: false,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!shouldShow || !element) return;

    let annotation = null;
    let resizeObserver = null;
    let isDestroyed = false;
    let timer1 = null;
    let timer2 = null;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const currentAnnotation = annotate(element, annotationConfig);
    annotation = currentAnnotation;

    function playCycle() {
      if (isDestroyed) return;
      try {
        currentAnnotation.show();
      } catch (e) {}

      if (repeat) {
        timer1 = setTimeout(() => {
          if (isDestroyed) return;
          try {
            currentAnnotation.hide();
          } catch (e) {}

          timer2 = setTimeout(() => {
            if (isDestroyed) return;
            playCycle();
          }, pauseDuration);
        }, animationDuration + repeatDelay);
      }
    }

    if (delay > 0) {
      timer1 = setTimeout(() => {
        playCycle();
      }, delay);
    } else {
      playCycle();
    }

    resizeObserver = new ResizeObserver(() => {
      try {
        currentAnnotation.hide();
        currentAnnotation.show();
      } catch (e) {}
    });

    resizeObserver.observe(element);
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      isDestroyed = true;
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      try {
        annotation?.remove();
      } catch (e) {}
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    repeat,
    repeatDelay,
    pauseDuration,
    delay,
  ]);

  return (
    <span
      ref={elementRef}
      className={`relative inline-block bg-transparent ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Highlighter;
