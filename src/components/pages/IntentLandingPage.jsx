"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Zap, Wallet } from 'lucide-react';
import Link from 'next/link';
import { getAppOpenHref, isMobile, openAppOrPlayStore } from '../../lib/appLink';

const featureIcons = [ShieldCheck, Zap, Wallet];

export default function IntentLandingPage({ page }) {
  if (!page) return null;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <nav
          aria-label="Breadcrumb"
          style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{page.h1}</span>
        </nav>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#fff',
            borderRadius: '32px',
            padding: '60px 40px',
            border: '1px solid rgba(41, 33, 27, 0.06)',
            boxShadow: 'var(--shadow-soft)',
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '12px' }}>
            {page.eyebrow}
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--color-primary)', marginBottom: '24px', fontFamily: 'var(--font-heading)', lineHeight: '1.1' }}>
            {page.h1.includes(page.h1Accent) ? (
              <>
                {page.h1.replace(page.h1Accent, '').trim()}{' '}
                <span style={{ color: 'var(--color-accent)' }}>{page.h1Accent}</span>
              </>
            ) : (
              page.h1
            )}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto 32px', lineHeight: '1.6' }}>
            {page.intro}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={page.workLink} className="btn-primary" style={{ display: 'inline-flex', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none' }}>
              Find Jobs
            </Link>
            <Link
              href={page.hireLink}
              style={{
                display: 'inline-flex',
                padding: '14px 28px',
                borderRadius: '100px',
                textDecoration: 'none',
                border: '1.5px solid rgba(61,43,31,0.15)',
                color: 'var(--color-primary)',
                fontWeight: 600,
              }}
            >
              Hire Staff
            </Link>
            <a
              href={getAppOpenHref()}
              target={isMobile() ? undefined : '_blank'}
              rel="noopener noreferrer"
              onClick={(event) => {
                if (isMobile()) openAppOrPlayStore(event);
              }}
              style={{ display: 'inline-flex', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', background: 'var(--color-gold)', color: 'var(--color-espresso)', fontWeight: 600 }}
            >
              Get the App
            </a>
          </div>
        </motion.header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(41, 33, 27, 0.06)' }}
          >
            <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--color-primary)' }}>{page.workerHeading}</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>{page.workerBody}</p>
            {page.workerTerms && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Popular searches: {page.workerTerms.join(' · ')}
              </p>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(41, 33, 27, 0.06)' }}
          >
            <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--color-primary)' }}>{page.employerHeading}</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>{page.employerBody}</p>
            {page.employerTerms && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Employers search for: {page.employerTerms.slice(0, 5).join(' · ')}
              </p>
            )}
          </motion.section>
        </div>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '28px', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
            Why use Ziggers?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {page.features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  style={{ backgroundColor: '#fff', padding: '28px', borderRadius: '24px', border: '1px solid rgba(41, 33, 27, 0.06)' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '16px' }}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--color-primary)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{feature.body}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {page.faqs?.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {page.faqs.map((item) => (
                <article key={item.q} style={{ backgroundColor: '#fff', padding: '24px 28px', borderRadius: '20px', border: '1px solid rgba(41, 33, 27, 0.06)' }}>
                  <h3 style={{ fontSize: '17px', marginBottom: '10px', color: 'var(--color-primary)' }}>{item.q}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {page.relatedLinks?.length > 0 && (
          <section>
            <h2 style={{ fontSize: '22px', color: 'var(--color-primary)', marginBottom: '16px' }}>Related pages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '100px',
                    border: '1px solid rgba(61,43,31,0.12)',
                    fontSize: '14px',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    background: '#fff',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
