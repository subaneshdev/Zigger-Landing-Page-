import BlogPageClient from './BlogPageClient';

export const metadata = {
  title: 'Gig Jobs & Staffing Insights | Ziggers Blog',
  description: 'Guides on event staffing, temporary staffing, blue collar hiring, and flexible jobs in Chennai and across India — from the workforce marketplace built for on-demand staffing.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogRoute() {
  return <BlogPageClient />;
}
