import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Calendar, Clock, User, Share2, Twitter, Linkedin, Link2, Check, ArrowRight } from 'lucide-react';

export const BLOG_POSTS = [
  {
    id: 'hire-catering-boys-chennai',
    title: 'How to Hire Verified Catering Boys in Chennai: The Complete 2026 Guide',
    excerpt: 'Looking to hire catering boys in Chennai for your next event or wedding? Read our guide on finding background-verified, high-quality catering workers instantly.',
    seoDescription: 'Comprehensive guide to hiring reliable, background-verified catering boys and catering workers in Chennai for weddings, corporate events, and parties.',
    content: [
      { type: 'paragraph', text: 'Planning a major wedding in Mylapore, a corporate banquet in OMR, or an upscale party along ECR? In Chennai, event success depends heavily on the service staff. Yet, organizing reliable catering boys in Chennai remains a stressful chore, marked by late arrivals and poor grooming.' },
      { type: 'heading', text: 'The Landscape of Catering Staffing in Chennai' },
      { type: 'paragraph', text: 'Traditionally, Chennai caterers rely on local sub-contractors, WhatsApp groups, or informal networks to procure on-demand catering workers. This system is plagued by uncertainty. You rarely know who is checking in, their hygiene standards, or their experience level until they are already serving your guests.' },
      { type: 'heading', text: 'Why Verification Matters for Chennai Events' },
      { type: 'paragraph', text: 'Hiring verified catering staff in Chennai is no longer a luxury—it is essential for brand reputation. Verified workers undergo identity audits and biometric verification, ensuring safety for high-profile banquets and family weddings alike.' },
      { 
        type: 'faq', 
        items: [
          { 
            q: "How much does it cost to hire catering boys in Chennai per day?", 
            a: "The average daily rate for booking catering staff and helpers in Chennai ranges between ₹600 to ₹1,200 per shift (typically 8 to 10 hours), depending on experience, grooming standards, and event location (e.g., standard wedding halls vs. five-star venues)." 
          },
          { 
            q: "Where can I book verified catering workers in Chennai instantly?", 
            a: "Platforms like Ziggers provide automated, background-verified dispatch, matching you with professional catering workers nearby within minutes, with live GPS check-in tracking." 
          }
        ] 
      },
      { type: 'heading', text: 'Streamline Your Event Execution' },
      { type: 'paragraph', text: 'For event organizers seeking reliable field execution, Ziggers offers a unified operating system. You can bypass chaotic coordinator calls and [Join the Ziggers Waitlist](#waitlist) to access Aadhaar-verified event helpers on-demand. Learn more about our [features and GPS footprint tracking](#features) and see how our [secure escrow payments](#trust) protect both caterers and workers.' }
    ],
    date: 'June 15, 2026',
    readTime: '5 min read',
    author: 'Karthik Raja',
    authorRole: 'Chennai Operations Head',
    category: 'Staffing',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    color: '#E0F2FE'
  },
  {
    id: 'solving-no-show-catering-chennai',
    title: 'Solving the No-Show Problem: Managing Catering Workers in Chennai',
    excerpt: 'Tired of catering workers defaulting at the last minute? Discover how automated dispatch and 10-minute backfills secure your event execution in Chennai.',
    seoDescription: 'Learn how modern technology solves the catering worker no-show issue in Chennai. Discover GPS check-ins, automated backfills, and escrow systems.',
    content: [
      { type: 'paragraph', text: 'It\'s 7:00 AM on a Muhurtham morning. You have booked 30 catering boys for a massive breakfast service at a marriage hall in T. Nagar. But only 18 show up. The coordinator\'s phone is switched off. This is the ultimate nightmare for every professional wedding planner and caterer in Chennai.' },
      { type: 'heading', text: 'Why Attendance Fails in Informal Staffing' },
      { type: 'paragraph', text: 'The root cause of catering staff defaults in Chennai is the lack of direct accountability. Traditional agents book workers without any tracking. If a worker gets a slightly higher offer elsewhere or decides not to travel, they simply drop out without warning.' },
      { type: 'heading', text: 'Using Technology to Guarantee Execution' },
      { type: 'paragraph', text: 'To combat this, modern agencies use automated scheduling software. Real-time GPS footprints allow caterers to watch their staff check in on a map as they approach the venue. If a worker is not within the geofence 30 minutes before the shift, the system alerts the caterer.' },
      { 
        type: 'faq', 
        items: [
          { 
            q: "What should I do if my catering workers don't show up?", 
            a: "Traditionally, caterers scramble for sub-agents. With modern tech platforms like Ziggers, a 10-minute backfill safety net is triggered automatically, identifying nearby standby workers and dispatching them to your location instantly." 
          },
          { 
            q: "How does GPS tracking help in event helper management?", 
            a: "GPS tracking ensures that you only pay for the exact hours the worker is physically present at the venue, preventing false attendance logs and billing disputes." 
          }
        ] 
      },
      { type: 'heading', text: 'Scale Securely with Ziggers' },
      { type: 'paragraph', text: 'By shifting from loose contracts to a secure, digital platform, Chennai\'s event managers can scale operations seamlessly. Our [on-demand staffing engine](#features) guarantees that standby helpers are always ready. Avoid operational disruptions by signing up on our [exclusive waitlist today](#waitlist).' }
    ],
    date: 'June 10, 2026',
    readTime: '6 min read',
    author: 'Deepa Ramakrishnan',
    authorRole: 'Event Logistics Lead',
    category: 'Operations',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    color: '#FEF3C7'
  },
  {
    id: 'wedding-catering-boys-chennai',
    title: 'Muhurtham Season Rush: Scaling Wedding Catering Staff in Chennai',
    excerpt: 'How Chennai\'s top wedding caterers manage extreme demand fluctuations on auspicious dates by leveraging on-demand catering boys and helpers.',
    seoDescription: 'How wedding caterers in Chennai scale their catering staff and helpers during peak wedding dates using instant booking, escrows, and verified networks.',
    content: [
      { type: 'paragraph', text: 'Chennai\'s wedding seasons—especially during major Muhurtham dates in months like Chithirai, Vaigasi, and Aani—bring unprecedented demand. A single caterer might handle 10 weddings on the same day. Sourcing enough trained catering boys in Chennai to maintain luxury standards becomes an operational bottleneck.' },
      { type: 'heading', text: 'The Muhurtham Staffing Crisis' },
      { type: 'paragraph', text: 'During peak seasons, the demand for catering workers in Chennai surges by 400%. Wages skyrocket, and quality drops as untrained students or part-timers are rushed into service. To survive, caterers must build a resilient, pre-screened labor pool.' },
      { type: 'heading', text: 'Escrow Systems: Building Mutual Trust' },
      { type: 'paragraph', text: 'One of the best ways to secure high-quality catering staff is by offering secure, fast payments. Professional catering boys prefer clients who use secure escrow structures where their wages are locked and released immediately upon successful task completion. This eliminates the fear of payment default after a long, exhausting shift.' },
      { 
        type: 'faq', 
        items: [
          { 
            q: "How do wedding caterers handle bulk staffing requests in Chennai?", 
            a: "Successful caterers split their staff between core culinary teams and on-demand service helpers. They utilize digital platforms like Ziggers to book service staff in bulk, filtering by trust score and verified grooming compliance." 
          },
          { 
            q: "Why is grooming and language training important for catering boys?", 
            a: "Wedding guests expect courteous hospitality. Professional platforms screen catering workers for basic service etiquette, uniform compliance, and grooming before matching them to high-end events." 
          }
        ] 
      },
      { type: 'heading', text: 'Take Control of Your Operations' },
      { type: 'paragraph', text: 'Don\'t let staffing shortages compromise your culinary reputation. Transition to a tech-driven workforce solution. [Join our waitlist](#waitlist) to access Chennai\'s premier, vetted catering boys and helpers, and read our [terms of service](#terms) to understand our operational guarantees.' }
    ],
    date: 'June 02, 2026',
    readTime: '5 min read',
    author: 'Srinivasan Iyer',
    authorRole: 'Hospitality Consultant',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    color: '#DCFCE7'
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ 
      border: '1px solid rgba(0,0,0,0.06)', 
      borderRadius: '16px', 
      marginBottom: '16px', 
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          fontWeight: '700',
          fontSize: '16px',
          color: 'var(--color-primary)',
          cursor: 'pointer'
        }}
      >
        <span>{question}</span>
        <span style={{ fontSize: '18px', color: 'var(--color-accent)', fontWeight: 'bold' }}>{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 20px', color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Blog({ activePostId, setActivePostId, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Staffing', 'Operations', 'Business'];

  const currentPost = BLOG_POSTS.find(post => post.id === activePostId);

  // Dynamic SEO Optimization
  useEffect(() => {
    if (activePostId) {
      const post = BLOG_POSTS.find(p => p.id === activePostId);
      if (post) {
        document.title = `${post.title} | Ziggers`;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', post.seoDescription);
        }
      }
    } else {
      document.title = "ZIGGERS | The Operating System for On-Ground Gig Work";
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Hire nearby workers with live tracking, proof of work, and secure escrow payments. Turn informal hiring into structured execution.");
      }
    }
  }, [activePostId]);

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (postId) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-post/${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleSelectPost = (postId) => {
    setActivePostId(postId);
    window.location.hash = `blog-post/${postId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToCatalog = () => {
    setActivePostId(null);
    window.location.hash = 'blog';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Parse backlinks [Text](#hash) in content blocks
  const parseMarkdownLinks = (text) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const linkText = match[1];
      const linkHref = match[2];
      
      parts.push(
        <a 
          key={match.index} 
          href={linkHref}
          onClick={(e) => {
            if (linkHref.startsWith('#')) {
              e.preventDefault();
              onBackToHome();
              setTimeout(() => {
                const target = document.querySelector(linkHref);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else if (linkHref === '#waitlist') {
                  const wl = document.getElementById('waitlist');
                  if (wl) wl.scrollIntoView({ behavior: 'smooth' });
                }
              }, 150);
            }
          }}
          style={{ 
            color: 'var(--color-accent)', 
            textDecoration: 'underline', 
            fontWeight: '700' 
          }}
        >
          {linkText}
        </a>
      );
      
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <AnimatePresence mode="wait">
          {!activePostId ? (
            // ================== CATALOG VIEW ==================
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span style={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: 'var(--color-secondary)',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}>
                  ZIGGERS KNOWLEDGE BASE
                </span>
                <h1 style={{ fontSize: '48px', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>
                  Insights on <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: '400' }}>ground operations</span>.
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                  Learn how we are building the operating system for verified, geofenced catering and field staffing in Chennai.
                </p>
              </div>

              {/* Filters & Search */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '20px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                {/* Category Tabs */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', maxWidth: '100%' }} className="scrollbar-hidden">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '30px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'rgba(0,0,0,0.03)',
                        color: selectedCategory === cat ? 'white' : 'var(--color-text)',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center',
                  minWidth: '260px',
                  flex: '1',
                  maxWidth: '350px'
                }}>
                  <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search Chennai articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 48px',
                      borderRadius: '50px',
                      border: '1px solid rgba(0,0,0,0.08)',
                      backgroundColor: 'white',
                      fontSize: '14px',
                      color: 'var(--color-text)',
                      outline: 'none',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                  />
                </div>
              </div>

              {/* Articles Grid */}
              {filteredPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed rgba(0,0,0,0.1)', borderRadius: '24px' }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>No articles found matching your criteria.</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                    style={{ marginTop: '16px', background: 'transparent', border: 'none', color: 'var(--color-accent)', fontWeight: '700', textDecoration: 'underline' }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                  {filteredPosts.map((post, index) => {
                    const isFeatured = index === 0 && searchQuery === '' && selectedCategory === 'All';
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelectPost(post.id)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: isFeatured ? '1.2fr 1fr' : '1fr',
                          backgroundColor: 'white',
                          borderRadius: '24px',
                          overflow: 'hidden',
                          boxShadow: 'var(--shadow-soft)',
                          border: '1px solid rgba(0,0,0,0.03)',
                          cursor: 'pointer',
                          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease',
                        }}
                        className="blog-card-hover"
                      >
                        {/* Cover Image */}
                        <div style={{ 
                          position: 'relative', 
                          height: isFeatured ? '420px' : '260px',
                          overflow: 'hidden',
                          backgroundColor: post.color
                        }}>
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.6s ease'
                            }}
                            className="blog-card-img"
                          />
                          <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            padding: '6px 14px',
                            borderRadius: '100px',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: 'var(--color-primary)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                          }}>
                            {post.category}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div style={{ 
                          padding: isFeatured ? '48px' : '32px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center'
                        }}>
                          <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '16px', fontWeight: '500' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={13} /> {post.date}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={13} /> {post.readTime}
                            </span>
                          </div>
                          
                          <h2 style={{ 
                            fontSize: isFeatured ? '32px' : '22px', 
                            lineHeight: '1.2', 
                            marginBottom: '16px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '800'
                          }}>
                            {post.title}
                          </h2>
                          
                          <p style={{ 
                            color: 'var(--color-text-muted)', 
                            fontSize: '15px', 
                            lineHeight: '1.6', 
                            marginBottom: '24px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: isFeatured ? 3 : 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {post.excerpt}
                          </p>

                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginTop: 'auto',
                            borderTop: '1px solid rgba(0,0,0,0.05)',
                            paddingTop: '20px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ 
                                width: '32px', 
                                height: '32px', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--color-primary)', 
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: '700'
                              }}>
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h4 style={{ fontSize: '13px', fontWeight: '600' }}>{post.author}</h4>
                                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{post.authorRole}</span>
                              </div>
                            </div>
                            
                            <span style={{ 
                              color: 'var(--color-accent)', 
                              fontSize: '13px', 
                              fontWeight: '700', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '4px' 
                            }}>
                              Read Post <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              {/* Newsletter Callout in Blog List */}
              <div style={{ 
                marginTop: '80px', 
                backgroundColor: 'var(--color-primary)', 
                borderRadius: '32px', 
                padding: '60px 40px', 
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ color: 'white', fontSize: '32px', marginBottom: '12px' }}>Operational insights, delivered weekly.</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                    Join 4,000+ operations leaders who receive our breakdown of gig economy data, security compliance, and field scaling updates.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', padding: '4px', backgroundColor: 'white', borderRadius: '100px', border: '1px solid #E5E7EB', width: '100%', maxWidth: '450px' }}>
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        style={{ flex: 1, border: 'none', background: 'transparent', paddingLeft: '16px', outline: 'none', fontSize: '14px', color: 'var(--color-text)' }} 
                      />
                      <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '100px', width: 'auto' }}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(193,154,107,0.1)' }}></div>
                <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(193,154,107,0.05)' }}></div>
              </div>
            </motion.div>
          ) : (
            // ================== ARTICLE DETAIL VIEW ==================
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back button */}
              <button 
                onClick={handleBackToCatalog}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--color-text-muted)', 
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '40px',
                  cursor: 'pointer',
                  padding: '4px 0'
                }}
                className="btn-back-hover"
              >
                <ArrowLeft size={16} /> Back to Insights
              </button>

              {currentPost ? (
                <div>
                  {/* Article Metadata Header */}
                  <div style={{ marginBottom: '40px' }}>
                    <span style={{ 
                      backgroundColor: 'rgba(193,154,107,0.12)', 
                      color: 'var(--color-accent)', 
                      padding: '6px 14px', 
                      borderRadius: '100px', 
                      fontSize: '12px', 
                      fontWeight: '700',
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}>
                      {currentPost.category}
                    </span>
                    
                    {/* CRITICAL: Exactly one h1 tag for search engine indexing */}
                    <h1 style={{ 
                      fontSize: '48px', 
                      lineHeight: '1.15', 
                      marginBottom: '24px', 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '800'
                    }}>
                      {currentPost.title}
                    </h1>

                    {/* Author & Actions Bar */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '20px',
                      borderBottom: '1px solid rgba(0,0,0,0.08)',
                      paddingBottom: '24px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '44px', 
                          height: '44px', 
                          borderRadius: '50%', 
                          backgroundColor: 'var(--color-primary)', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '700'
                        }}>
                          {currentPost.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '15px', fontWeight: '700' }}>{currentPost.author}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{currentPost.authorRole}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={15} /> {currentPost.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={15} /> {currentPost.readTime}
                        </span>
                        <div style={{ display: 'flex', gap: '8px', borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '20px' }}>
                          <button 
                            onClick={() => handleShare(currentPost.id)}
                            style={{ 
                              background: 'rgba(0,0,0,0.03)', 
                              border: 'none', 
                              padding: '8px', 
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: 'var(--color-primary)',
                              position: 'relative'
                            }}
                          >
                            {copiedId === currentPost.id ? <Check size={16} style={{ color: 'green' }} /> : <Share2 size={16} />}
                            {copiedId === currentPost.id && (
                              <span style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: '50%',
                                transform: 'translateX(-50%) translateY(-6px)',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                whiteSpace: 'nowrap'
                              }}>
                                Copied Link
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Cover Image */}
                  <div style={{ 
                    height: '480px', 
                    borderRadius: '32px', 
                    overflow: 'hidden', 
                    marginBottom: '48px',
                    boxShadow: 'var(--shadow-strong)',
                    backgroundColor: currentPost.color
                  }}>
                    <img src={currentPost.image} alt={currentPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Article Body Content */}
                  <div style={{ 
                    maxWidth: '720px', 
                    margin: '0 auto', 
                    fontSize: '18px', 
                    lineHeight: '1.8', 
                    color: 'var(--color-text)' 
                  }}>
                    {currentPost.content.map((block, bIdx) => {
                      if (block.type === 'paragraph') {
                        return <p key={bIdx} style={{ marginBottom: '28px' }}>{parseMarkdownLinks(block.text)}</p>;
                      }
                      if (block.type === 'heading') {
                        return <h2 key={bIdx} style={{ fontSize: '28px', marginTop: '48px', marginBottom: '20px', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>{block.text}</h2>;
                      }
                      if (block.type === 'faq') {
                        return (
                          <div key={bIdx} style={{ margin: '40px 0' }} data-testid="aeo-faq-block">
                            <h3 style={{ fontSize: '22px', marginBottom: '20px', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>Frequently Asked Questions (FAQ)</h3>
                            {block.items.map((item, idx) => (
                              <FAQItem key={idx} question={item.q} answer={item.a} />
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Share Bottom & Back Footer */}
                  <div style={{ 
                    maxWidth: '720px', 
                    margin: '80px auto 0', 
                    borderTop: '1px solid rgba(0,0,0,0.08)', 
                    paddingTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <button 
                      onClick={handleBackToCatalog}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: 'var(--color-surface)', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        padding: '10px 20px', 
                        borderRadius: '100px', 
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                      className="btn-back-hover"
                    >
                      <ArrowLeft size={16} /> Back to Index
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: '600' }}>Share Article:</span>
                      <button 
                        onClick={() => handleShare(currentPost.id)}
                        style={{ display: 'flex', gap: '6px', alignItems: 'center', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                      >
                        <Twitter size={18} />
                      </button>
                      <button 
                        onClick={() => handleShare(currentPost.id)}
                        style={{ display: 'flex', gap: '6px', alignItems: 'center', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                      >
                        <Linkedin size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Related Posts */}
                  <div style={{ marginTop: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '60px' }}>
                    <h3 style={{ fontSize: '28px', marginBottom: '32px', fontFamily: 'var(--font-heading)' }}>Related Articles</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                      {BLOG_POSTS.filter(post => post.id !== currentPost.id).slice(0, 2).map(post => (
                        <div 
                          key={post.id}
                          onClick={() => handleSelectPost(post.id)}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-soft)',
                            border: '1px solid rgba(0,0,0,0.03)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease'
                          }}
                          className="blog-card-hover"
                        >
                          <div style={{ height: '180px', overflow: 'hidden', backgroundColor: post.color }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '24px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>
                            <h4 style={{ fontSize: '18px', marginTop: '8px', marginBottom: '12px', lineHeight: '1.3' }}>{post.title}</h4>
                            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={12} /> {post.readTime}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                  <h2>Article not found</h2>
                  <button onClick={handleBackToCatalog} className="btn-primary" style={{ marginTop: '20px' }}>Back to Insights</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .blog-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-strong) !important;
        }
        .blog-card-hover:hover .blog-card-img {
          transform: scale(1.04);
        }
        .btn-back-hover {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .btn-back-hover:hover {
          color: var(--color-primary) !important;
          transform: translateX(-4px);
        }
        @media (max-width: 768px) {
          .blog-card-hover {
            grid-template-columns: 1fr !important;
          }
          .blog-card-hover .blog-card-img {
            height: 220px !important;
          }
          h1 {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
