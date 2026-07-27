import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import PlayStoreButton from './PlayStoreButton';

function ZiggersAppIcon({ size = 72 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.22),
        background: 'var(--color-espresso)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        boxShadow: '0 8px 24px rgba(61, 43, 31, 0.2)',
        padding: '0 6px',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          color: '#fff',
          fontWeight: 800,
          fontSize: size * 0.19,
          letterSpacing: '-0.4px',
          lineHeight: 1,
          fontFamily: 'var(--font-heading)',
        }}
      >
        Ziggers
      </span>
    </div>
  );
}

const CONFETTI = [
  { x: -52, y: -38, color: '#C4A052', delay: 0.05 },
  { x: 48, y: -42, color: '#3D2B1F', delay: 0.1 },
  { x: -44, y: 28, color: '#C4A052', delay: 0.15 },
  { x: 56, y: 22, color: '#8B6849', delay: 0.08 },
  { x: -8, y: -52, color: '#3D2B1F', delay: 0.12 },
  { x: 12, y: 46, color: '#C4A052', delay: 0.18 },
  { x: -60, y: 4, color: '#8B6849', delay: 0.14 },
  { x: 62, y: -6, color: '#C4A052', delay: 0.06 },
];

function HireResultCelebration({ count, area, loading }) {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="hire-loading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--color-espresso)',
            borderRadius: '16px',
            padding: '32px 24px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
          }}
        >
          <Loader2 size={28} color="var(--color-gold)" className="app-modal-spin" />
        </motion.div>
      ) : (
        <motion.div
          key={`hire-result-${count}-${area}`}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          style={{
            background: 'linear-gradient(145deg, var(--color-espresso) 0%, #2a1e16 100%)',
            borderRadius: '16px',
            padding: '24px 20px',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
          }}
        >
          {CONFETTI.map((piece, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.6], x: piece.x, y: piece.y }}
              transition={{ duration: 0.85, delay: piece.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: piece.color,
                marginTop: '-4px',
                marginLeft: '-4px',
                pointerEvents: 'none',
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.05 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '140px',
              height: '140px',
              marginTop: '-70px',
              marginLeft: '-70px',
              borderRadius: '50%',
              background: 'rgba(196, 160, 82, 0.12)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '100px',
                background: 'rgba(196, 160, 82, 0.18)',
                color: 'var(--color-gold)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <Sparkles size={12} />
              Workers found
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.2 }}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 size={22} color="var(--color-espresso)" strokeWidth={2.5} />
              </motion.div>

              <div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                  style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.35, margin: 0, color: '#fff' }}
                >
                  <motion.span
                    key={count}
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.32 }}
                    style={{
                      color: 'var(--color-gold)',
                      fontSize: '24px',
                      fontWeight: 800,
                      marginRight: '6px',
                      display: 'inline-block',
                    }}
                  >
                    {count}
                  </motion.span>
                  verified gig workers near {area}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  style={{ fontSize: '13px', opacity: 0.78, margin: '6px 0 0', color: '#fff', lineHeight: 1.5 }}
                >
                  Background-checked — ready for instant hiring
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AppDownloadModal({
  open,
  onClose,
  title,
  message,
  actionLabel = 'Work',
  hireResult = null,
  hireResultLoading = false,
}) {
  const showHireResult = hireResult != null;

  return (
    <>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13, 10, 8, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: showHireResult ? '460px' : '420px',
              background: '#fff',
              borderRadius: '24px',
              padding: '28px 28px 32px',
              textAlign: 'center',
              border: '1px solid rgba(61, 43, 31, 0.08)',
              boxShadow: 'var(--shadow-strong)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--color-linen)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '14px' }}>
              <ZiggersAppIcon size={72} />
            </div>

            <p
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--color-gold)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              Ziggers
            </p>

            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--color-espresso)', lineHeight: 1.3 }}>
              {title || `Download Ziggers to ${actionLabel}`}
            </h3>

            <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.55, marginBottom: showHireResult ? '20px' : '22px' }}>
              {message ||
                'Ziggers is live on Google Play. Download the staffing app to find flexible work, apply to gig jobs, and get paid securely.'}
            </p>

            {showHireResult && (
              <HireResultCelebration
                count={hireResult.count}
                area={hireResult.area}
                loading={hireResultLoading}
              />
            )}

            <PlayStoreButton label="Download on Google Play" size="lg" style={{ width: '100%', justifyContent: 'center' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <style>{`
      .app-modal-spin { animation: appModalSpin 1s linear infinite; }
      @keyframes appModalSpin { to { transform: rotate(360deg); } }
    `}</style>
    </>
  );
}
