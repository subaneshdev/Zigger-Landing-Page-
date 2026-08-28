import Team from '../../components/pages/Team';

export const metadata = {
  title: 'Executive Leadership Team | Ziggers',
  description: "Meet the founding executive leadership team behind Ziggers — Subanesh C (CEO), Vijayrajkumar (COO), Harish Raj (CPO), Saai Abishek (CMO), and Vinayak (CIO). Building India's on-demand gig workforce.",
  keywords: "Ziggers Team, Ziggers Founders, Subanesh C CEO, Vijayrajkumar COO, Harish Raj CPO, Saai Abishek CMO, Vinayak CIO, Ziggers Leadership, On-Demand Gig Workforce India",
  alternates: {
    canonical: 'https://www.ziggers.in/team',
  },
  openGraph: {
    title: 'Executive Leadership Team | Ziggers',
    description: "Meet the founding executive leadership team behind Ziggers — Subanesh C (CEO), Vijayrajkumar (COO), Harish Raj (CPO), Saai Abishek (CMO), and Vinayak (CIO).",
    url: 'https://www.ziggers.in/team',
    type: 'website',
  }
};

export default function TeamPage() {
  return <Team />;
}
