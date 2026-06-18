import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOG_POSTS } from '../src/data/blogPosts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

console.log('--- Starting Ziggers SEO Pre-rendering System ---');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: dist/index.html not found! Make sure you run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Helper to replace markdown links with HTML links
function parseMarkdownLinksHtml(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, linkHref) => {
    const href = linkHref.startsWith('#') ? `/${linkHref}` : linkHref;
    return `<a href="${href}" style="color: #c19a6b; text-decoration: underline; font-weight: bold;">${linkText}</a>`;
  });
}

// Function to generate individual page HTML
function prerenderPage({
  title,
  description,
  url,
  image,
  jsonLd,
  redirectHash,
  contentHtml
}) {
  let html = template;

  // 1. Replace Title Tag
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // 2. Replace Description Meta Tag
  const descMetaRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
  const newDescMeta = `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`;
  if (descMetaRegex.test(html)) {
    html = html.replace(descMetaRegex, newDescMeta);
  } else {
    html = html.replace('<head>', `<head>\n    ${newDescMeta}`);
  }

  // 3. Inject Open Graph and Twitter Card tags
  const ogMetaTags = `
    <!-- SEO & Social Graph Meta Tags -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${image}" />
  `;

  // 4. Inject JSON-LD Schema
  let schemaScript = '';
  if (jsonLd) {
    schemaScript = `\n    <script type="application/ld+json" id="seo-jsonld">\n      ${JSON.stringify(jsonLd, null, 2)}\n    </script>\n`;
  }

  // 5. Inject client redirect script (for SPA takeover)
  const redirectScript = `
    <script>
      // Redirect to React SPA hash route for navigation takeover
      window.location.replace("${redirectHash}");
    </script>
  `;

  // Insert Header additions
  html = html.replace('</head>', `${ogMetaTags}${schemaScript}${redirectScript}\n  </head>`);

  // 6. Inject the pre-rendered static content inside the root div
  html = html.replace('<div id="root"></div>', `<div id="root">${contentHtml}</div>`);

  return html;
}

// Helper to write files and create directories recursively
function writeFile(filePath, content) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// ------------------------------------
// 1. Generate Sitemap XML
// ------------------------------------
console.log('Generating sitemap.xml...');
const baseUrl = 'https://ziggers.in';
const lastMod = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/hire-acting-drivers-chennai</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/hire-catering-staff-chennai</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/hire-brand-promoters-chennai</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
`;

for (const post of BLOG_POSTS) {
  sitemapXml += `  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}
sitemapXml += `</urlset>\n`;

writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml);
writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
console.log('✓ sitemap.xml generated in public/ and dist/');


// ------------------------------------
// 2. Pre-render Blog Catalog Page (/blog/index.html)
// ------------------------------------
console.log('Pre-rendering Blog Catalog...');
let catalogHtml = `
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 140px 20px 100px; color: #1f2937;">
    <header style="text-align: center; margin-bottom: 60px;">
      <span style="letter-spacing: 0.15em; font-size: 12px; font-weight: 700; color: #c19a6b; text-transform: uppercase;">ZIGGERS KNOWLEDGE BASE</span>
      <h1 style="font-size: 48px; margin-top: 12px; margin-bottom: 20px; font-weight: 800;">Insights on ground operations.</h1>
      <p style="font-size: 18px; color: #4b5563; max-width: 600px; margin: 0 auto;">Learn how we are building the operating system for verified, geofenced catering and field staffing in Chennai.</p>
    </header>
    <div style="display: grid; grid-template-columns: 1fr; gap: 32px;">
`;

for (const post of BLOG_POSTS) {
  catalogHtml += `
      <article style="border: 1px solid #f3f4f6; background-color: #fff; padding: 32px; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <span style="font-size: 12px; font-weight: 700; color: #c19a6b; text-transform: uppercase;">${post.category}</span>
        <h2 style="font-size: 28px; margin-top: 8px; margin-bottom: 16px; font-weight: 800;">
          <a href="/blog/${post.id}" style="color: #111827; text-decoration: none;">${post.title}</a>
        </h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${post.excerpt}</p>
        <div style="font-size: 13px; color: #6b7280; font-weight: 500;">
          <span>${post.date}</span> • <span>${post.readTime}</span> • <span>By ${post.author} (${post.authorRole})</span>
        </div>
      </article>
  `;
}
catalogHtml += `
    </div>
  </div>
`;

const catalogPage = prerenderPage({
  title: 'Insights on Ground Operations | Ziggers Blog',
  description: 'Learn how we are building the operating system for verified, geofenced catering and field staffing in Chennai.',
  url: `${baseUrl}/blog`,
  image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  redirectHash: '/#blog',
  contentHtml: catalogHtml
});

writeFile(path.join(DIST_DIR, 'blog/index.html'), catalogPage);
console.log('✓ Blog Catalog pre-rendered.');


// ------------------------------------
// 3. Pre-render Individual Blog Posts (/blog/[post-id]/index.html)
// ------------------------------------
for (const post of BLOG_POSTS) {
  console.log(`Pre-rendering Blog Post: ${post.id}...`);

  // Build the schema markup
  const blogSchema = {
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seoDescription,
    "datePublished": post.date.includes('June 15') ? "2026-06-15" : post.date.includes('June 10') ? "2026-06-10" : "2026-06-02",
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ziggers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ziggers.in/logo.png"
      }
    },
    "image": post.image,
    "mainEntityOfPage": `${baseUrl}/blog/${post.id}`
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ziggers.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://ziggers.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://ziggers.in/blog/${post.id}`
      }
    ]
  };

  const graph = [blogSchema, breadcrumbSchema];

  if (post.id === 'hire-catering-boys-chennai') {
    const howToSchema = {
      "@type": "HowTo",
      "name": "How to Hire Verified Catering Boys in Chennai",
      "description": "Step-by-step guide to hiring reliable, background-verified catering workers and helpers in Chennai.",
      "totalTime": "PT30M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Define your event requirements",
          "text": "Specify the date, location (e.g. Mylapore or OMR), number of catering boys needed, shift hours, and uniform codes.",
          "url": "https://ziggers.in/blog/hire-catering-boys-chennai#features"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose a verified booking platform",
          "text": "Use Ziggers to access biometric Aadhaar and KYC-verified catering workers rather than informal WhatsApp groups.",
          "url": "https://ziggers.in/blog/hire-catering-boys-chennai#features"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Deposit wages into secure escrow",
          "text": "Fund the shift wages upfront into the secure escrow system, guaranteeing payment release upon task verification.",
          "url": "https://ziggers.in/blog/hire-catering-boys-chennai#trust"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Monitor live GPS footprint check-in",
          "text": "Watch your catering helpers check in on a map and automatically trigger a 10-minute backfill if a standby worker is needed.",
          "url": "https://ziggers.in/blog/hire-catering-boys-chennai#features"
        }
      ]
    };
    graph.push(howToSchema);
  }

  // Render the post body
  let bodyHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 140px 20px 100px; color: #1f2937;">
      <article>
        <header style="margin-bottom: 40px;">
          <span style="background-color: rgba(193, 154, 107, 0.12); color: #c19a6b; padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; text-transform: uppercase;">${post.category}</span>
          <h1 style="font-size: 48px; line-height: 1.15; margin-top: 20px; margin-bottom: 24px; font-weight: 800;">${post.title}</h1>
          <div style="display: flex; align-items: center; gap: 12px; color: #4b5563; font-size: 14px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #29211b; color: white; display: flex; alignItems: center; justify-content: center; font-weight: bold; line-height: 40px; text-align: center;">
              ${post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 style="font-weight: 700; margin: 0;">${post.author}</h4>
              <span style="font-size: 12px; color: #6b7280;">${post.authorRole}</span>
            </div>
            <span style="margin-left: auto;">${post.date} • ${post.readTime}</span>
          </div>
        </header>

        <div style="height: 480px; border-radius: 32px; overflow: hidden; margin-bottom: 48px;">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>

        <div style="font-size: 18px; line-height: 1.8; color: #29211b;">
  `;

  for (const block of post.content) {
    if (block.type === 'paragraph') {
      bodyHtml += `        <p style="margin-bottom: 28px;">${parseMarkdownLinksHtml(block.text)}</p>\n`;
    } else if (block.type === 'heading') {
      bodyHtml += `        <h2 style="font-size: 28px; margin-top: 48px; margin-bottom: 20px; font-weight: 800;">${block.text}</h2>\n`;
    } else if (block.type === 'table') {
      bodyHtml += `
        <div style="overflow-x: auto; margin: 36px 0; border: 1px solid rgba(0,0,0,0.06); border-radius: 16px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 15px;">
            <thead>
              <tr style="background-color: #f9f7f2; border-bottom: 1px solid rgba(0,0,0,0.08);">
      `;
      for (const h of block.headers) {
        bodyHtml += `                <th style="padding: 16px 20px; font-weight: 700; color: #29211b;">${h}</th>\n`;
      }
      bodyHtml += `              </tr>\n            </thead>\n            <tbody>\n`;
      for (const row of block.rows) {
        bodyHtml += `              <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">\n`;
        for (let i = 0; i < row.length; i++) {
          bodyHtml += `                <td style="padding: 16px 20px; color: ${i === 0 ? '#29211b' : '#6b7280'}; font-weight: ${i === 0 ? '600' : 'normal'};">${row[i]}</td>\n`;
        }
        bodyHtml += `              </tr>\n`;
      }
      bodyHtml += `            </tbody>\n          </table>\n        </div>\n`;
    } else if (block.type === 'faq') {
      bodyHtml += `
        <div style="margin: 40px 0;">
          <h3 style="font-size: 22px; margin-bottom: 20px; font-weight: 800;">Frequently Asked Questions (FAQ)</h3>
      `;
      const mainEntity = [];
      for (const item of block.items) {
        mainEntity.push({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        });
        bodyHtml += `
          <div style="border: 1px solid #f3f4f6; border-radius: 16px; margin-bottom: 16px; padding: 20px 24px; background-color: #fff;">
            <h4 style="font-weight: 700; margin-top: 0; margin-bottom: 10px; color: #29211b;">${item.q}</h4>
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">${item.a}</p>
          </div>
        `;
      }
      bodyHtml += `        </div>\n`;

      const faqSchema = {
        "@type": "FAQPage",
        "mainEntity": mainEntity
      };
      graph.push(faqSchema);
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  // Add references citation card
  if (post.references && post.references.length > 0) {
    bodyHtml += `
      <div style="margin-top: 60px; padding: 24px 32px; background-color: #F9F7F2; border-radius: 20px; border: 1px solid rgba(0,0,0,0.04);">
        <h4 style="font-size: 16px; font-weight: 800; margin-top: 0; margin-bottom: 16px; text-transform: uppercase; color: #29211b;">References & Verifications</h4>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    for (const ref of post.references) {
      bodyHtml += `
        <li style="font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #c19a6b;"></span>
          <a href="${ref.url}" style="color: #c19a6b; text-decoration: underline; font-weight: 600;">${ref.name}</a>
        </li>
      `;
    }
    bodyHtml += `        </ul>\n      </div>\n`;
  }

  bodyHtml += `
        </div>
      </article>
      <div style="margin-top: 80px; border-top: 1px solid #f3f4f6; padding-top: 32px;">
        <a href="/blog" style="color: #29211b; font-weight: 600; text-decoration: none;">← Back to Insights</a>
      </div>
    </div>
  `;

  const postPage = prerenderPage({
    title: `${post.title} | Ziggers`,
    description: post.seoDescription,
    url: `${baseUrl}/blog/${post.id}`,
    image: post.image,
    jsonLd,
    redirectHash: `/#blog-post/${post.id}`,
    contentHtml: bodyHtml
  });

  writeFile(path.join(DIST_DIR, `blog/${post.id}/index.html`), postPage);
  console.log(`✓ Blog Post pre-rendered: ${post.id}`);
}


// ------------------------------------
// 4. Pre-render Privacy Policy (/privacy/index.html)
// ------------------------------------
console.log('Pre-rendering Privacy Policy...');
const privacyHtml = `
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 140px 20px 100px; color: #29211b; line-height: 1.6;">
    <h1>Privacy Policy</h1>
    <p style="color: #6b7280;">Last updated May 29, 2026</p>
    <p style="margin-top: 24px;">This Privacy Notice for Ziggers ("we", "us", or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services...</p>
    <div style="margin-top: 40px; padding: 24px; background-color: #f9f7f2; border-radius: 16px; border-left: 4px solid #c19a6b;">
      <strong>Ziggers</strong> is a mobile platform that connects employers with local gig workers for short-term, on-ground work opportunities across India. We collect location coordinates, pemerintah identifiers for Aadhaar KYC audits, and payment cards for escrow transaction releases.
    </div>
    <h2 style="margin-top: 40px;">1. WHAT INFORMATION DO WE COLLECT?</h2>
    <p>We collect names, phone numbers, email addresses, billing addresses, government ID records for background checks, and geofencing timestamps during active event operations...</p>
    <h2 style="margin-top: 32px;">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
    <p>We process coordinates for security check-ins, manage secure escrow deposits with Zoho Pay, and run ratings layers to protect workers and employers from no-shows...</p>
    <div style="margin-top: 60px; border-top: 1px solid #f3f4f6; padding-top: 32px;">
      <a href="/" style="color: #29211b; font-weight: 600; text-decoration: none;">← Back to Home</a>
    </div>
  </div>
`;

const privacyPage = prerenderPage({
  title: 'Privacy Policy | Ziggers',
  description: 'Privacy Notice details on how Ziggers protects, collects, and manages employer and gig worker information in India.',
  url: `${baseUrl}/privacy`,
  image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  redirectHash: '/#privacy',
  contentHtml: privacyHtml
});

writeFile(path.join(DIST_DIR, 'privacy/index.html'), privacyPage);
console.log('✓ Privacy Policy pre-rendered.');


// ------------------------------------
// 5. Pre-render Terms of Service (/terms/index.html)
// ------------------------------------
console.log('Pre-rendering Terms of Service...');
const termsHtml = `
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 140px 20px 100px; color: #29211b; line-height: 1.6;">
    <h1>Terms of Service</h1>
    <p style="color: #6b7280;">Last updated May 29, 2026</p>
    <p style="margin-top: 24px;">Welcome to Ziggers. These Terms of Service outline the rules, obligations, and legal standards governing employers booking catering boys and gig helpers, and workers accepting active shifts...</p>
    <h2 style="margin-top: 40px;">1. ESCROW DEPOSIT AND FEE DISBURSAL</h2>
    <p>Employers agree to deposit full shift wages into Ziggers' escrow account prior to job matches. Funds are released automatically to workers upon verification of proof-of-work compliance and GPS check-in logs...</p>
    <h2 style="margin-top: 32px;">2. ZERO-TOLERANCE NO-SHOW STANDARDS</h2>
    <p>Both parties agree that late cancellations and no-shows degrade gig reliability. Repeat defaults will result in automated blocklists, temporary matching suspensions, and rating penalties...</p>
    <div style="margin-top: 60px; border-top: 1px solid #f3f4f6; padding-top: 32px;">
      <a href="/" style="color: #29211b; font-weight: 600; text-decoration: none;">← Back to Home</a>
    </div>
  </div>
`;

const termsPage = prerenderPage({
  title: 'Terms of Service | Ziggers',
  description: 'Legal terms and conditions governing the booking of on-demand catering workers and payment escrows on Ziggers.',
  url: `${baseUrl}/terms`,
  image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  redirectHash: '/#terms',
  contentHtml: termsHtml
});

writeFile(path.join(DIST_DIR, 'terms/index.html'), termsPage);
console.log('✓ Terms of Service pre-rendered.');

console.log('--- Ziggers SEO Pre-rendering Complete ---');
