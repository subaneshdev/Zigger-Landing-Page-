import TermsOfService from '../../components/TermsOfService';

export const metadata = {
  title: 'Terms of Service | Ziggers Staffing App',
  description: 'Legal terms for booking temporary staff, gig jobs, and on-demand staffing through the Ziggers hiring marketplace.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return <TermsOfService />;
}
