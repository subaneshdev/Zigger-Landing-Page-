import { Poppins } from 'next/font/google';
import Script from 'next/script';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MobileStickyCTA from '../components/MobileStickyCTA';
import FirebaseInit from '../components/FirebaseInit';
import AutoAppDownloadPopup from '../components/AutoAppDownloadPopup';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Ziggers | Gig Jobs App — Find Gig Jobs & Hire Temporary Staff in India',
  description: "Ziggers is India's #1 gig jobs app — find gig jobs near you or hire verified gig workers instantly. Browse catering jobs, delivery jobs, event staff, warehouse workers, and daily wage shifts across India with same-day UPI payouts.",
  keywords: "gig jobs, gig jobs app, gig jobs India, gig jobs near me, gig worker app India, gig economy jobs, find gig jobs, Zigger, Zigger App, Giggers, Giggers App, Giggers Jobs, Giggers alternative, Ziggers vs Giggers, Hire Catering Staff, Catering Jobs, Waiter Jobs, Part-time Jobs, Daily Wage Jobs, Temporary Workers, Event Staff, Delivery Jobs, Warehouse Jobs, Driver Jobs, Student Jobs, Weekend Jobs, Near Me Jobs, Chennai Jobs, Bangalore Jobs",
  metadataBase: new URL('https://www.ziggers.in'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.ziggers.in/',
    title: 'Ziggers | Gig Jobs App — Find Gig Jobs & Hire Temporary Staff in India',
    description: "Ziggers is India's #1 gig jobs app — find gig jobs near you or hire verified gig workers instantly. Browse catering jobs, delivery jobs, event staff, warehouse workers, and daily wage shifts across India.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ziggers Gig Jobs App — Find Gig Jobs & Hire Staff in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ziggers | Gig Jobs App — Find Gig Jobs & Hire Temporary Staff in India',
    description: "Ziggers is India's #1 gig jobs app — find gig jobs near you or hire verified gig workers instantly. Daily wage jobs, catering, delivery, event staff across India.",
    images: ['/twitter-image.jpg'],
  },
  other: {
    'google-play-app': 'app-id=com.ziggers.ziggers',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': ['SoftwareApplication', 'MobileApplication'],
      name: 'Ziggers',
      alternateName: ["Zigger", "Zigger App", "Gigger", "Giggers", "Giggers App", "Gigger App", "Gig Jobs App"],
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Gig Jobs',
      operatingSystem: 'Android, iOS, Web',
      description: "Ziggers is India's #1 gig jobs app — find gig jobs near you or hire verified gig workers instantly. Browse catering jobs, delivery jobs, event staff, and daily wage shifts across India with same-day UPI payouts.",
      keywords: 'gig jobs, gig jobs app, gig jobs India, gig jobs near me, gig worker app, find gig jobs, daily wage jobs, part-time jobs, temporary jobs, hire gig workers',
      url: 'https://www.ziggers.in/',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.ziggers.ziggers',
      installUrl: 'https://play.google.com/store/apps/details?id=com.ziggers.ziggers',
      screenshot: 'https://www.ziggers.in/og-image.jpg',
      image: 'https://www.ziggers.in/icon.png',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1250',
        ratingCount: '1250',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Subanesh C',
          },
          datePublished: '2026-08-15',
          reviewBody: 'Ziggers is the best gig jobs app in India — verified gig matching, same-day UPI payouts, and a reliable on-demand workforce for businesses across India.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Ziggers',
      url: 'https://www.ziggers.in/',
      logo: 'https://www.ziggers.in/icon.png',
      image: 'https://www.ziggers.in/icon.png',
      sameAs: [
        'https://play.google.com/store/apps/details?id=com.ziggers.ziggers',
        'https://www.crunchbase.com/organization/ziggers',
        'https://www.producthunt.com/products/ziggers',
        'https://postyourstartup.co/startup/ziggers-1',
        'https://www.linkedin.com/in/subanesh/'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ziggers',
      url: 'https://www.ziggers.in/'
    }
  ];

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-295EB79EJJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-295EB79EJJ');
          `}
        </Script>
        
        {/* LaunchList Widget */}
        <Script 
          src="https://getlaunchlist.com/js/widget.js" 
          strategy="afterInteractive"
          defer 
        />

        <FirebaseInit />

        <div className="app-wrapper">
          <Navigation />
          {children}
          <Footer />
          <MobileStickyCTA />
          <AutoAppDownloadPopup />
        </div>
      </body>
    </html>
  );
}

