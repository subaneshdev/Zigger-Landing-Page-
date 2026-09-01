import PartnerDashboard from '../../../components/pages/PartnerDashboard';

export const metadata = {
  title: 'Partner Dashboard & Earnings | Ziggers',
  description: 'Manage your Ziggers Community Partner account, track active referred workers, monitor total completed shifts, and view real-time UPI earnings.',
  alternates: {
    canonical: '/partner/dashboard',
  },
};

export default function PartnerDashboardPage() {
  return <PartnerDashboard />;
}
