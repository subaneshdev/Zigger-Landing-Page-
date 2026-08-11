import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Ziggers',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--color-linen)', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '480px', width: '90%', background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', textAlign: 'center', border: '1px solid rgba(61,43,31,0.06)' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--color-espresso)', marginBottom: '16px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>404 - Page Not Found</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
          Oops! The page you are looking for could not be found. It might have expired, been filled, or is no longer active.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-flex', textDecoration: 'none', background: 'var(--color-espresso)', color: '#fff', padding: '12px 32px', borderRadius: '100px', fontWeight: 600 }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
