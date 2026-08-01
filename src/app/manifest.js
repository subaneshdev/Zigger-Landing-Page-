export default function manifest() {
  return {
    name: 'Ziggers Gig Staffing Platform',
    short_name: 'Ziggers',
    description: "Ziggers is India's on-demand gig marketplace for hiring catering staff, event workers, delivery partners, warehouse workers, hospitality staff, and finding part-time jobs.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#3D2B1F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
