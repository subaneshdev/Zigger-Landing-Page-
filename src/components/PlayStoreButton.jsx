import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getAppOpenHref, isMobile, openAppOrPlayStore } from '../lib/appLink';

export default function PlayStoreButton({
  label = 'Get it on Google Play',
  variant = 'gold',
  size = 'md',
  style = {},
}) {
  const isGold = variant === 'gold';
  const padding = size === 'lg' ? '16px 32px' : '12px 24px';
  const fontSize = size === 'lg' ? '16px' : '14px';

  return (
    <a
      href={getAppOpenHref()}
      target={isMobile() ? undefined : '_blank'}
      rel="noopener noreferrer"
      onClick={(event) => {
        if (isMobile()) openAppOrPlayStore(event);
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding,
        borderRadius: '100px',
        fontWeight: 700,
        fontSize,
        letterSpacing: '0.5px',
        backgroundColor: isGold ? 'var(--color-gold)' : 'var(--color-espresso)',
        color: isGold ? 'var(--color-espresso)' : '#fff',
        border: isGold ? 'none' : '1px solid var(--color-espresso)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.6 1.8c-.3.2-.5.6-.5 1v18.4c0 .4.2.8.5 1l10.8-10.8L3.6 1.8zm12.1 8.5-2.8-2.8 3.4-1.9c.6-.3 1.3.1 1.3.8v.3c0 .3-.1.5-.3.7l-1.6 2.9zm-2.8 2.8 2.8 2.8-3.4 1.9c-.6.3-1.3-.1-1.3-.8v-.3c0-.3.1-.5.3-.7l1.6-2.9zM5.8 3.3l9.9 9.9-3.1 3.1L3.6 3.8c.1-.2.3-.4.5-.5h1.7zM12.6 16.3l3.1 3.1-9.9 1.7c-.5.1-1-.3-1-.8v-1.7l9.9-2.3z" />
      </svg>
      {label}
      <ExternalLink size={16} />
    </a>
  );
}
