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
  style = {},
  className = "",
}) {
  const elementRef = useRef(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    let annotation = null;
    let resizeObserver = null;

    if (shouldShow && element) {
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
      currentAnnotation.show();

      resizeObserver = new ResizeObserver(() => {
        try {
          currentAnnotation.hide();
          currentAnnotation.show();
        } catch (e) {
          // ignore resize errors
        }
      });

      resizeObserver.observe(element);
      if (document.body) {
        resizeObserver.observe(document.body);
      }
    }

    return () => {
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
