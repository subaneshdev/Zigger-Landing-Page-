"use client";
import React, { useEffect } from 'react';

export default function WaitlistForm() {
  useEffect(() => {
    // Re-initialize LaunchList if script has already loaded
    if (window.Launchlist) {
      window.Launchlist.init();
    }
  }, []);

  return (
    <div className="waitlist-card" style={{ width: '100%', maxWidth: '440px', margin: '0 auto', minHeight: '150px' }}>
      <div className="launchlist-widget" data-key-id="FUzaoX"></div>
    </div>
  );
}
