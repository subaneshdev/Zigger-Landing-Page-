/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/10th-12th-pass-part-time-jobs-chennai',
        destination: '/blog/10th-12th-pass-part-time-jobs-chennai',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
