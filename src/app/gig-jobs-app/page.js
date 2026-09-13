import Link from 'next/link';
import { PAGE_SEO, SITE_URL } from '../../constants/seo';

export const metadata = {
  title: PAGE_SEO.gigJobsApp.title,
  description: PAGE_SEO.gigJobsApp.description,
  keywords:
    'gig jobs app, gig jobs app India, best gig jobs app, download gig jobs app, gig worker app, gig jobs app download, Ziggers app, gig jobs app Android, find gig jobs app, gig economy app India',
  alternates: {
    canonical: `${SITE_URL}/gig-jobs-app`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/gig-jobs-app`,
    title: PAGE_SEO.gigJobsApp.title,
    description: PAGE_SEO.gigJobsApp.description,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Ziggers — India's Gig Jobs App" }],
  },
};

const appFeatures = [
  {
    emoji: '🔍',
    title: 'Instant Gig Job Discovery',
    desc: 'Browse hundreds of gig jobs near you filtered by city, role, date, and pay. New gig jobs posted daily across India.',
  },
  {
    emoji: '⚡',
    title: '15-Minute Matching',
    desc: "Post a gig job requirement or apply to one and get matched in minutes — not days. India's fastest gig jobs platform.",
  },
  {
    emoji: '🔒',
    title: 'KYC-Verified Workers',
    desc: 'Every gig worker on the app completes digital ID verification before their first shift. Hire with full confidence.',
  },
  {
    emoji: '💸',
    title: 'Same-Day UPI Payouts',
    desc: 'Workers get paid on the same day via UPI after a completed shift. No delays, no cash handling, no disputes.',
  },
  {
    emoji: '📍',
    title: 'Live GPS Tracking',
    desc: "Track worker check-ins, check-outs, and live location directly from the app. Full visibility on your gig workers' shifts.",
  },
  {
    emoji: '🛡️',
    title: 'Escrow Payment Protection',
    desc: 'Payments are held in escrow until work is verified — protecting both workers and employers on every gig job.',
  },
];

const gigJobTypes = [
  'Catering Gig Jobs', 'Delivery Gig Jobs', 'Event Staff Gig Jobs', 'Driver Gig Jobs',
  'Warehouse Gig Jobs', 'Housekeeping Gig Jobs', 'Security Gig Jobs', 'Promoter Gig Jobs',
  'Hotel Gig Jobs', 'Construction Gig Jobs', 'Student Gig Jobs', 'Part-time Gig Jobs',
];

const faqs = [
  {
    q: 'What is the Ziggers gig jobs app?',
    a: "Ziggers is India's #1 gig jobs app that connects workers with verified short-term gig jobs and helps businesses hire gig workers instantly. The app is available on Android and supports gig jobs across catering, delivery, events, driving, and warehouse categories.",
  },
  {
    q: 'Is the gig jobs app free to download?',
    a: "Yes, the Ziggers gig jobs app is completely free to download and register. Workers can browse gig jobs, apply, and get paid without any subscription fees. Employers pay only when they successfully hire a gig worker.",
  },
  {
    q: 'Which cities have gig jobs on the Ziggers app?',
    a: 'Ziggers has active gig jobs in Chennai, Bangalore, Hyderabad, Mumbai, Delhi, Coimbatore, Pune, and Madurai. New cities are added regularly as the gig jobs network expands across India.',
  },
  {
    q: 'How is the Ziggers gig jobs app different from other job apps?',
    a: "Unlike general job apps, Ziggers specialises exclusively in gig jobs and short-term shifts. Key differences: same-day UPI payouts (not weekly or monthly), KYC-verified gig workers (not anonymous), 15-minute matching (not days), and escrow payment protection for both parties.",
  },
  {
    q: 'Can employers post gig jobs on the app?',
    a: 'Yes. Employers can post a gig job requirement in under 2 minutes, set headcount, date, location, and pay rate, and get matched with verified gig workers near them. The app is designed for both individual gig workers and business employers.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Ziggers Gig Jobs App',
    alternateName: ['Ziggers', 'Gig Jobs App India', 'Zigger App'],
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Gig Jobs',
    operatingSystem: 'Android',
    description: "Ziggers is India's #1 gig jobs app — find gig jobs near you or hire verified gig workers instantly. Browse catering, delivery, event, and warehouse gig jobs with same-day UPI payouts.",
    url: 'https://www.ziggers.in/gig-jobs-app',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.ziggers.ziggers',
    installUrl: 'https://play.google.com/store/apps/details?id=com.ziggers.ziggers',
    image: 'https://www.ziggers.in/icon.png',
    keywords: 'gig jobs app, gig jobs app India, gig worker app, find gig jobs',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ziggers.in/' },
      { '@type': 'ListItem', position: 2, name: 'Gig Jobs', item: 'https://www.ziggers.in/gig-jobs' },
      { '@type': 'ListItem', position: 3, name: 'Gig Jobs App', item: 'https://www.ziggers.in/gig-jobs-app' },
    ],
  },
];

export default function GigJobsAppPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main style={{ backgroundColor: '#ffffff', color: '#1c1c1c', fontFamily: 'var(--font-body)' }}>

        {/* Hero */}
        <section style={{ backgroundColor: 'var(--color-espresso)', paddingTop: '130px', paddingBottom: '90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
              <ol style={{ display: 'flex', justifyContent: 'center', gap: '8px', listStyle: 'none', fontSize: '13px', color: 'rgba(255,255,255,0.6)', padding: 0, margin: 0 }}>
                <li><Link href="/" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Home</Link></li>
                <li>/</li>
                <li><Link href="/gig-jobs" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Gig Jobs</Link></li>
                <li>/</li>
                <li style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Gig Jobs App</li>
              </ol>
            </nav>

            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
              #1 Gig Jobs App in India
            </span>

            <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '20px' }}>
              Ziggers — India&apos;s <span style={{ color: 'var(--color-gold)' }}>Gig Jobs App</span><br />Find Gig Work & Hire Gig Staff
            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 36px' }}>
              The gig jobs app built for India. Workers find verified shifts instantly. Employers hire KYC-verified gig workers in minutes. Same-day UPI payouts. Zero registration fees.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.ziggers.ziggers"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)', padding: '16px 36px', borderRadius: '14px', fontWeight: 800, fontSize: '17px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                📱 Download Gig Jobs App — Free
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[['4.8★', 'App Rating'], ['50,000+', 'Active Gig Workers'], ['₹0', 'Worker Fee'], ['15 min', 'Avg Match Time']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-gold)' }}>{val}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Features */}
        <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>App Features</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-espresso)', letterSpacing: '-0.02em' }}>Why Ziggers is India&apos;s Best Gig Jobs App</h2>
              <p style={{ fontSize: '15px', color: 'var(--color-muted)', marginTop: '8px' }}>Built ground-up for gig workers and gig employers in India.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="app-features-grid">
              {appFeatures.map((feature) => (
                <div key={feature.title} style={{ backgroundColor: 'var(--color-linen)', borderRadius: '18px', padding: '28px 24px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{feature.emoji}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>{feature.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gig Job Types in the App */}
        <section style={{ padding: '64px 0', backgroundColor: '#fafafa' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '12px', letterSpacing: '-0.02em' }}>Gig Job Types Available on the App</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-muted)', marginBottom: '36px' }}>Find all gig job categories in one place.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {gigJobTypes.map((type) => (
                <Link key={type} href="/gig-jobs" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(61,43,31,0.12)', borderRadius: '100px', padding: '8px 18px', fontSize: '14px', fontWeight: 700, color: 'var(--color-espresso)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }} className="gig-tag">
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How the App Works */}
        <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-espresso)', letterSpacing: '-0.02em' }}>How the Gig Jobs App Works</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="how-it-works-grid">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--color-gold)' }}>👷 For Gig Workers</h3>
                {['Download the free Ziggers gig jobs app on Android', 'Register & complete KYC verification (takes 5 minutes)', 'Browse gig jobs near you by role, city, and date', 'Apply with one tap — no resume needed', 'Attend the shift, get paid same-day via UPI'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ minWidth: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-espresso)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>{step}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--color-gold)' }}>🏢 For Employers</h3>
                {['Sign up as an employer on the Ziggers gig jobs app', 'Post your gig job requirement in under 2 minutes', 'Set headcount, shift timing, location, and pay rate', 'Get matched with KYC-verified nearby gig workers', 'Approve check-in, confirm work, release UPI payment'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ minWidth: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '72px 0', backgroundColor: '#fafafa' }}>
          <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '36px', letterSpacing: '-0.02em' }}>FAQs About the Ziggers Gig Jobs App</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {faqs.map((faq) => (
                <div key={faq.q} style={{ borderBottom: '1px solid rgba(61,43,31,0.08)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '10px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--color-linen)', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '14px' }}>Download Now — It&apos;s Free</span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-espresso)', marginBottom: '16px', letterSpacing: '-0.02em' }}>India&apos;s #1 Gig Jobs App — Start Today</h2>
            <p style={{ fontSize: '16px', color: 'var(--color-muted)', marginBottom: '36px', lineHeight: 1.7 }}>
              Join 50,000+ gig workers and 5,000+ employers who use the Ziggers gig jobs app every day. Free to download. Instant KYC. Same-day pay.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.ziggers.ziggers"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: 'var(--color-espresso)', color: '#fff', padding: '16px 40px', borderRadius: '14px', fontWeight: 800, fontSize: '17px', textDecoration: 'none', display: 'inline-block' }}
            >
              📱 Download on Google Play — Free
            </a>
            <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '16px' }}>
              Available on Android · iOS coming soon · Web at <Link href="/" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>ziggers.in</Link>
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section style={{ padding: '36px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid rgba(61,43,31,0.06)' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.8 }}>
              Explore: <Link href="/gig-jobs" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Browse Gig Jobs</Link> ·{' '}
              <Link href="/hire" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Hire Gig Workers</Link> ·{' '}
              <Link href="/work" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Find Jobs Near Me</Link> ·{' '}
              <Link href="/blog" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Gig Jobs Blog</Link> ·{' '}
              <Link href="/jobs-in-chennai" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Chennai Gig Jobs</Link>
            </p>
          </div>
        </section>

        <style>{`
          @media (max-width: 768px) {
            .app-features-grid { grid-template-columns: 1fr 1fr !important; }
            .how-it-works-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 480px) {
            .app-features-grid { grid-template-columns: 1fr !important; }
          }
          .gig-tag:hover { background-color: var(--color-espresso) !important; color: #fff !important; }
        `}</style>
      </main>
    </>
  );
}
