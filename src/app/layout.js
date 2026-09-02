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
  title: 'Ziggers | Hire Temporary Staff & Find Part-time Jobs in India',
  description: "Ziggers is India's on-demand gig marketplace for hiring catering staff, event workers, delivery partners, warehouse workers, hospitality staff, and finding part-time, temporary, flexible, and daily wage jobs across India.",
  keywords: "Zigger, Zigger App, Zigger Jobs, Zigger Chennai, Giggers, Giggers App, Giggers Jobs, Giggers Chennai, Giggers alternative, Ziggers vs Giggers, Hire Catering Staff, Catering Jobs, Waiter Jobs, Part-time Jobs, Daily Wage Jobs, Temporary Workers, Event Staff, Delivery Jobs, Warehouse Jobs, Driver Jobs, Student Jobs, Weekend Jobs, Near Me Jobs, Chennai Jobs, Bangalore Jobs",
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
    title: 'Ziggers | Hire Temporary Staff & Find Part-time Jobs in India',
    description: "Ziggers is India's on-demand gig marketplace for hiring catering staff, event workers, delivery partners, warehouse workers, hospitality staff, and finding part-time, temporary, flexible, and daily wage jobs across India.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ziggers Gig Staffing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ziggers | Hire Temporary Staff & Find Part-time Jobs in India',
    description: "Ziggers is India's on-demand gig marketplace for hiring catering staff, event workers, delivery partners, warehouse workers, hospitality staff, and finding part-time, temporary, flexible, and daily wage jobs across India.",
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
      alternateName: ["Zigger", "Zigger App", "Gigger", "Giggers", "Giggers App", "Gigger App"],
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, iOS, Web',
      description: "Ziggers is an on-demand gig marketplace that connects businesses with verified temporary staff and empowers workers to find flexible part-time and daily gig shifts across India.",
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
          reviewBody: 'Ziggers provides verified gig matching, same-day UPI payouts, and reliable on-demand workforce for businesses in India.',
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

