"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  delay = 0,
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <span
      className={cn("relative inline-block", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.span
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
          style={{ display: 'block', position: 'absolute', inset: 0 }}
        >
          <motion.span
            className={cn(
              "absolute inset-0 border border-neutral-800 dark:border-neutral-200",
              rectangleClassName
            )}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              boxSizing: 'border-box',
              display: 'block'
            }}
            initial={{
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: delay + 0.2,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 2,
              y: dimensions.height + 2,
            }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              rotate: -90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            transition={{
              opacity: { duration: 0.1, delay: delay + 0.2, ease: "easeInOut" },
              duration: 1,
              delay: delay + 0.2,
              ease: "easeInOut",
            }}
          >
            <Pointer
              className={cn("h-5 w-5 text-blue-500", pointerClassName)}
            />
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}

const Pointer = ({ className, ...props }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1.2em"
      width="1.2em"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  );
};

export default PointerHighlight;
