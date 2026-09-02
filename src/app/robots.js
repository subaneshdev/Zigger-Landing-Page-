export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/partner/dashboard'],
      },
    ],
    sitemap: 'https://www.ziggers.in/sitemap.xml',
  };
}
