import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogSection({ onNavigateToBlog }) {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  const handleCardClick = (postId) => {
    if (onNavigateToBlog) {
      onNavigateToBlog(postId);
    }
  };

  return (
    <section id="blog-preview" className="section-padding" style={{ backgroundColor: '#FCFBFA', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '60px',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '500px' }}
          >
            <span style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              fontSize: '12px', 
              fontWeight: '700', 
              color: 'var(--color-secondary)',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              LATEST INSIGHTS
            </span>
            <h2 style={{ fontSize: '48px', lineHeight: '1.05', fontFamily: 'var(--font-heading)' }}>
              From the <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: '400' }}>ground up</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href="#blog" 
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToBlog) onNavigateToBlog();
              }}
              className="btn-secondary"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                borderRadius: '100px',
                cursor: 'pointer'
              }}
            >
              View All Articles <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick(post.id)}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid rgba(0,0,0,0.03)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease'
              }}
              className="preview-blog-card"
            >
              {/* Image Container */}
              <div style={{ 
                position: 'relative', 
                height: '220px', 
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
                  className="preview-blog-card-img"
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--color-primary)'
                }}>
                  {post.category}
                </div>
              </div>

              {/* Text Container */}
              <div style={{ 
                padding: '28px', 
                display: 'flex', 
                flexDirection: 'column', 
                flexGrow: 1 
              }}>
                <div style={{ display: 'flex', gap: '12px', color: 'var(--color-text-muted)', fontSize: '12px', marginBottom: '14px', fontWeight: '500' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ 
                  fontSize: '20px', 
                  lineHeight: '1.3', 
                  marginBottom: '12px', 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800'
                }}>
                  {post.title}
                </h3>

                <p style={{ 
                  color: 'var(--color-text-muted)', 
                  fontSize: '14px', 
                  lineHeight: '1.6', 
                  marginBottom: '20px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {post.excerpt}
                </p>

                <div style={{ 
                  marginTop: 'auto', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderTop: '1px solid rgba(0,0,0,0.05)',
                  paddingTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--color-primary)', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '700'
                    }}>
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>{post.author}</span>
                  </div>

                  <span style={{ 
                    color: 'var(--color-accent)', 
                    fontSize: '12px', 
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      <style>{`
        .preview-blog-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-strong) !important;
        }
        .preview-blog-card:hover .preview-blog-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
