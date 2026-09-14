export default function robots() {
  return {
    rules: [
      // Standard web crawlers — full access
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/partner/dashboard'],
      },
      // Google flagship + AI overview crawler — explicit allow for GEO
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/partner/dashboard'],
      },
      // Google-Extended: powers AI Overviews, Bard / Gemini training — allow for AEO
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // OpenAI ChatGPT / GPT-4 web browsing crawler
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // Anthropic Claude crawler
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Perplexity AI answer engine crawler
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Apple Intelligence / Spotlight crawler
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // Meta AI crawler (Llama-based)
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      // Common Crawl (powers many LLM training datasets)
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Diffbot — used by enterprise AI knowledge graphs
      {
        userAgent: 'Diffbot',
        allow: '/',
      },
      // Bytespider (TikTok / ByteDance AI)
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // Amazon Alexa / Rufus AI crawler
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // You.com AI search crawler
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      // Bing / Microsoft Copilot
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/partner/dashboard'],
      },
    ],
    sitemap: [
      'https://www.ziggers.in/sitemap.xml',
    ],
    host: 'https://www.ziggers.in',
  };
}
