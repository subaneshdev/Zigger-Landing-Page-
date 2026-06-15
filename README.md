# Ziggers Landing Page

Ziggers is the operating system for on-ground gig work. This repository contains the source code for the Ziggers landing page, an optimized, fast, and SEO-friendly Vite/React application.

## Recent Branch Updates

The following core features and optimizations have been built into this branch:

### 1. Structural Migration to React Router
- **Standardized URL Routing**: Replaced custom state-based hash routing with standard URL paths using `react-router-dom`. 
- **Preserved Animations**: Integrated `<AnimatePresence>` to ensure `framer-motion` page transition animations trigger smoothly between page navigations.
- **Dynamic Routing**: Configured dynamic URL parameters for individual blog posts (e.g., `/blog/:id`).

### 2. Comprehensive SEO Foundation & Server Config
- **Meta Tags**: Upgraded `index.html` with full descriptive tags, Open Graph (Social Graph) tags, and Twitter Cards to ensure rich link previews.
- **Indexing Assets**: Included standard `robots.txt` and `sitemap.xml` files inside the `public/` directory for search engine crawling.
- **Server Support**: Created an Apache `.htaccess` file inside `public/` to ensure Hostinger correctly redirects fallback traffic to `index.html`, eliminating 404 errors on direct links or page refreshes.

### 3. Localized SEO Landing Pages
- **Service-Specific Pages**: Built dedicated React components tailored to high-intent local search keywords:
  - "Hire Acting Drivers in Chennai" (`/hire-acting-drivers-chennai`)
  - "Hire Catering Staff in Chennai" (`/hire-catering-staff-chennai`)
  - "Hire Brand Promoters in Chennai" (`/hire-brand-promoters-chennai`)
- **Dynamic Meta Injection**: Each page dynamically rewrites the browser `<title>` and `<meta name="description">` using `useEffect` based on the page context.
- **Navigation Integration**: Updated the Footer with a new "Services" column linking to these targeted landing pages.

### 4. Major UI & Aesthetics Redesign
- **Premium Style Revamp**: Rebuilt the main Hero layout to include floating ETA progression cards, rating badges, and overlapping asset layers for a premium aesthetic.
- **Dynamic Phone Mockups**: Implemented an `AppShowcase` component displaying high-resolution screenshots of the upcoming Ziggers mobile app framed inside an iPhone casing.
- **Design Cleanup**: Redesigned the Privacy Policy page using glassmorphism and removed the custom cursor bubble that was causing UX friction on mobile devices.
- **Content Integration**: Added the Blog Section and Terms of Service pages, fully integrated with the new React Router architecture.

### 5. Payment & Conversion Workflows
- **Razorpay Integration**: Replaced the manual QR code and UTR entry system with a fully automated Razorpay checkout modal for streamlined onboarding.
- **Waitlist Optimization**: Fixed mobile overflow issues on Waitlist forms to ensure higher conversion rates from mobile devices.

---

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the local development server
4. Run `npm run build` to generate the production bundle into the `dist/` folder
