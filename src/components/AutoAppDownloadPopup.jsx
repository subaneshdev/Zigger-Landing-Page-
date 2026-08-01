"use client";
import React, { useState, useEffect } from 'react';
import AppDownloadModal from './AppDownloadModal';

export default function AutoAppDownloadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user dismissed popup in last 7 days
    const dismissedAt = localStorage.getItem('ziggers_app_popup_dismissed');
    if (dismissedAt) {
      const isExpired = Date.now() > parseInt(dismissedAt, 10);
      if (!isExpired) {
        return; // Don't show popup
      }
    }

    let timer;
    let hasTriggered = false;

    const triggerPopup = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setOpen(true);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };

    // Trigger after a 6-second delay
    timer = setTimeout(triggerPopup, 6000);

    // Trigger on scroll 25% down the page
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && scrollPosition / totalHeight > 0.25) {
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Dismiss for 7 days
    const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('ziggers_app_popup_dismissed', expiryTime.toString());
  };

  return (
    <AppDownloadModal
      open={open}
      onClose={handleClose}
      actionLabel="Download"
      title="Get the Ziggers Staffing App"
      message="Download the Ziggers app on Google Play to hire verified temporary staff or apply for daily gig jobs with same-day UPI pay."
    />
  );
}
