import Link from 'next/link';
import { PAGE_SEO, SITE_URL } from '../../constants/seo';

export const metadata = {
  title: PAGE_SEO.gigJobs.title,
  description: PAGE_SEO.gigJobs.description,
  keywords:
    'gig jobs, gig jobs near me, gig jobs India, gig jobs app, gig economy jobs, gig work India, find gig jobs, catering gig jobs, delivery gig jobs, event gig jobs, daily wage gig jobs, part-time gig jobs',
  alternates: {
    canonical: `${SITE_URL}/gig-jobs`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/gig-jobs`,
    title: PAGE_SEO.gigJobs.title,
    description: PAGE_SEO.gigJobs.description,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Gig Jobs in India — Ziggers' }],
  },
};

const gigJobCategories = [
  { title: 'Catering Gig Jobs', desc: 'Banquet, kitchen, and wedding catering shifts', href: '/catering-jobs', emoji: '🍽️' },
  { title: 'Delivery Gig Jobs', desc: 'Local delivery, e-commerce, and food delivery shifts', href: '/delivery-jobs', emoji: '🚴' },
  { title: 'Event Gig Jobs', desc: 'Event volunteers, ushers, and exhibition staff', href: '/event-staff', emoji: '🎪' },
  { title: 'Driver Gig Jobs', desc: 'Acting drivers, cab duty, and logistics driving', href: '/driver-jobs', emoji: '🚗' },
  { title: 'Warehouse Gig Jobs', desc: 'Packing, loading, and inventory gig shifts', href: '/warehouse-workers', emoji: '📦' },
  { title: 'Hotel Gig Jobs', desc: 'Hospitality, banquet, and restaurant gig roles', href: '/hotel-jobs', emoji: '🏨' },
  { title: 'Security Gig Jobs', desc: 'Event security, night shift, and guard gig roles', href: '/security-guards', emoji: '🛡️' },
  { title: 'Promoter Gig Jobs', desc: 'Brand promoter, retail, and exhibition gig work', href: '/retail-promoters', emoji: '📣' },
];

const topCities = [
  { name: 'Chennai', href: '/jobs-in-chennai' },
  { name: 'Bangalore', href: '/jobs-in-bangalore' },
  { name: 'Mumbai', href: '/jobs-in-mumbai' },
  { name: 'Hyderabad', href: '/jobs-in-hyderabad' },
  { name: 'Delhi', href: '/jobs-in-delhi' },
  { name: 'Pune', href: '/jobs-in-pune' },
];

const faqs = [
  {
    q: 'What are gig jobs?',
    a: 'Gig jobs are short-term, flexible work assignments where you get paid per task or per shift — instead of a fixed monthly salary. Common gig jobs include catering shifts, delivery runs, event staffing, acting driver gigs, and warehouse packing shifts. You choose when you work and how much you earn.',
  },
  {
    q: 'How do I find gig jobs near me in India?',
    a: 'Download the Ziggers gig jobs app on Android or visit ziggers.in. Select your city, browse open gig job listings nearby, and apply instantly. Most workers get their first gig job matched within 15 minutes of applying.',
  },
  {
    q: 'How much do gig jobs pay in India?',
    a: 'Gig job pay in India ranges from ₹500 to ₹3,000+ per shift depending on the role, duration, and city. Catering gig jobs typically pay ₹600–₹1,200 per shift, delivery gig jobs pay ₹700–₹1,500 per day, and event gig jobs pay ₹800–₹2,500 per shift. Ziggers pays workers same-day via UPI after each completed gig.',
  },
  {
    q: 'Do I need any experience or qualification for gig jobs?',
    a: 'Most entry-level gig jobs on Ziggers require no prior experience. Catering gig jobs, warehouse packing gigs, and event staff roles are open to 10th and 12th pass candidates. You need a smartphone and a valid ID to complete KYC verification before your first shift.',
  },
  {
    q: 'What is the best gig jobs app in India?',
    a: 'Ziggers is India\'s leading gig jobs app with thousands of verified gig job listings across catering, delivery, events, driving, and warehouse work. The app offers instant matching, KYC-verified workers, live GPS tracking, and same-day UPI payments — making it the most trusted gig jobs platform in India.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ziggers.in/' },
    { '@type': 'ListItem', position: 2, name: 'Gig Jobs', item: 'https://www.ziggers.in/gig-jobs' },
  ],
};

export default function GigJobsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main style={{ backgroundColor: '#ffffff', color: '#1c1c1c', fontFamily: 'var(--font-body)' }}>

        {/* Hero Section */}
        <section style={{ backgroundColor: 'var(--color-linen)', paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, var(--color-gold) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
              <ol style={{ display: 'flex', justifyContent: 'center', gap: '8px', listStyle: 'none', fontSize: '13px', color: 'var(--color-muted)', padding: 0, margin: 0 }}>
                <li><Link href="/" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ fontWeight: 600 }}>Gig Jobs</li>
              </ol>
            </nav>

            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
              India&apos;s #1 Gig Jobs Platform
            </span>

            <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.03em', color: 'var(--color-espresso)', marginBottom: '20px' }}>
              Find <span style={{ color: 'var(--color-gold)' }}>Gig Jobs</span> Near You<br />or Hire Gig Workers Instantly
            </h1>

            <p style={{ fontSize: '17px', color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 36px' }}>
              Browse thousands of gig jobs in catering, delivery, events, driving, and warehouse work across India.
              Get paid same-day via UPI. KYC-verified workers. 15-minute matching.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/work"
                style={{ backgroundColor: 'var(--color-espresso)', color: '#fff', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Find Gig Jobs →
              </Link>
              <Link
                href="/gig-jobs-app"
                style={{ backgroundColor: '#ffffff', color: 'var(--color-espresso)', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', border: '2px solid var(--color-espresso)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Download Gig Jobs App
              </Link>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '40px', flexWrap: 'wrap' }}>
              {[['5,000+', 'Gig Jobs Posted'], ['15 min', 'Avg Match Time'], ['₹0', 'Worker Registration Fee'], ['4.8★', 'App Rating']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-espresso)' }}>{val}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Are Gig Jobs — Featured Snippet Target */}
        <section style={{ padding: '72px 0', backgroundColor: '#ffffff', borderBottom: '1px solid rgba(61,43,31,0.07)' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="gig-explainer-grid">
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>What Are Gig Jobs?</span>
                <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '16px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                  Flexible work, daily pay — on your terms
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                  <strong>Gig jobs</strong> are short-term, flexible work assignments where you earn per shift or task — no monthly salary lock-in, no long-term contract. You choose when you work, how many shifts you take, and which gig jobs you accept.
                </p>
                <p style={{ fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
                  On Ziggers, gig jobs include catering shifts at weddings and corporate events, delivery gig runs, one-day driver gigs, warehouse packing jobs, and event volunteer roles — all across India with same-day UPI payouts.
                </p>
                <Link href="/work" style={{ color: 'var(--color-gold)', fontWeight: 800, textDecoration: 'none', fontSize: '15px' }}>
                  Browse all gig jobs →
                </Link>
              </div>
              <div style={{ backgroundColor: 'var(--color-linen)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '⚡', title: 'Instant Apply', desc: 'Apply to gig jobs in seconds with your Ziggers profile' },
                  { icon: '🔒', title: 'KYC Verified', desc: 'Every gig worker completes identity verification before their first shift' },
                  { icon: '💸', title: 'Same-day Pay', desc: 'Get paid via UPI after each completed gig — no waiting' },
                  { icon: '📍', title: 'Gig Jobs Near You', desc: 'Filter gig jobs by your city and neighbourhood' },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-espresso)', fontSize: '14px' }}>{item.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gig Job Categories */}
        <section style={{ padding: '72px 0', backgroundColor: '#fafafa' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>Browse by Category</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-espresso)', letterSpacing: '-0.02em' }}>Popular Gig Job Categories</h2>
              <p style={{ fontSize: '15px', color: 'var(--color-muted)', marginTop: '8px' }}>Over 8 gig job types. Thousands of verified shifts across India.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="gig-cat-grid">
              {gigJobCategories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  style={{ backgroundColor: '#ffffff', border: '1px solid rgba(61,43,31,0.09)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  className="gig-cat-card"
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.emoji}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '6px' }}>{cat.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gig Jobs By City */}
        <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Gig Jobs by City</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-muted)', marginBottom: '28px' }}>Find verified gig jobs in your city with daily shifts and same-day UPI payouts.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="city-gig-grid">
              {topCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  style={{ border: '1px solid #e8e8e8', borderRadius: '10px', padding: '16px 20px', textDecoration: 'none', color: 'var(--color-espresso)', fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', transition: 'border 0.2s, box-shadow 0.2s' }}
                  className="city-gig-card"
                >
                  Gig Jobs in {city.name} <span style={{ color: 'var(--color-gold)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How Gig Jobs Work on Ziggers */}
        <section style={{ padding: '72px 0', backgroundColor: 'var(--color-linen)' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>How It Works</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-espresso)', letterSpacing: '-0.02em', marginBottom: '48px' }}>Get Your First Gig Job in 3 Steps</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="steps-grid">
              {[
                { step: '01', title: 'Download the Gig Jobs App', desc: 'Get the Ziggers app on Android. Complete your free KYC verification in minutes.' },
                { step: '02', title: 'Browse Gig Jobs Near You', desc: 'Filter gig jobs by city, role, and date. See shift timings, location, and pay upfront.' },
                { step: '03', title: 'Apply & Get Paid Same Day', desc: 'Accept a gig job, complete the shift, and receive your payment via UPI instantly.' },
              ].map((item) => (
                <div key={item.step} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px 24px', boxShadow: '0 4px 16px rgba(61,43,31,0.06)' }}>
                  <div style={{ fontSize: '40px', fontWeight: 900, color: 'var(--color-gold)', opacity: 0.4, marginBottom: '12px' }}>{item.step}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: '72px 0', backgroundColor: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '36px', letterSpacing: '-0.02em' }}>Frequently Asked Questions about Gig Jobs</h2>
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

        {/* CTA Banner */}
        <section style={{ padding: '72px 0', backgroundColor: 'var(--color-espresso)', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em' }}>Ready to Find Gig Jobs?</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '32px', lineHeight: 1.6 }}>
              Join 50,000+ workers who find gig jobs on Ziggers every month. Free to register. Get paid same-day.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/work" style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', textDecoration: 'none' }}>
                Find Gig Jobs Now
              </Link>
              <Link href="/gig-jobs-app" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)' }}>
                Download the Gig Jobs App
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Link Footer */}
        <section style={{ padding: '40px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid rgba(61,43,31,0.06)' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
            <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.8, textAlign: 'center' }}>
              Looking for more? <Link href="/gig-jobs-app" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Download our Gig Jobs App</Link> ·{' '}
              <Link href="/hire" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Hire Gig Workers</Link> ·{' '}
              <Link href="/blog" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Read our Gig Jobs Guide</Link> ·{' '}
              <Link href="/jobs-in-chennai" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Gig Jobs in Chennai</Link> ·{' '}
              <Link href="/jobs-in-bangalore" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Gig Jobs in Bangalore</Link>
            </p>
          </div>
        </section>

        <style>{`
          @media (max-width: 768px) {
            .gig-explainer-grid { grid-template-columns: 1fr !important; }
            .gig-cat-grid { grid-template-columns: 1fr 1fr !important; }
            .city-gig-grid { grid-template-columns: 1fr 1fr !important; }
            .steps-grid { grid-template-columns: 1fr !important; }
          }
          .gig-cat-card:hover { box-shadow: 0 8px 24px rgba(61,43,31,0.1) !important; transform: translateY(-2px); }
          .city-gig-card:hover { border-color: var(--color-gold) !important; box-shadow: 0 4px 12px rgba(61,43,31,0.08) !important; }
        `}</style>
      </main>
    </>
  );
}
