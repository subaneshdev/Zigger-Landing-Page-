import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Utensils, 
  MessageSquare, 
  HardHat, 
  Package, 
  FileText, 
  Sparkles, 
  Heart, 
  Plus, 
  ArrowRight 
} from 'lucide-react';

export default function GigTasksSlider() {
  const scrollContainerRef = useRef(null);

  const tasks = [
    {
      title: "Acting Driver",
      desc: "Book vetted professional drivers for private transits, executive travel, and vehicle delivery runs.",
      icon: <Car size={24} />,
      bgImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80",
      color: "rgba(193, 154, 107, 0.15)"
    },
    {
      title: "Caterers",
      desc: "On-demand culinary staff, servers, and kitchen helpers to manage hospitality logistics at events.",
      icon: <Utensils size={24} />,
      bgImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80",
      color: "rgba(167, 130, 91, 0.15)"
    },
    {
      title: "Communication Workers",
      desc: "Promotional staff, customer survey heads, and brand hosts to run operations smoothly.",
      icon: <MessageSquare size={24} />,
      bgImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
      color: "rgba(41, 33, 27, 0.05)"
    },
    {
      title: "Construction",
      desc: "Vetted labor force for manual site support, assembly operations, and heavy lifting tasks.",
      icon: <HardHat size={24} />,
      bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
      color: "rgba(193, 154, 107, 0.15)"
    },
    {
      title: "Packers",
      desc: "Experienced packers, loaders, and moving crew to execute instant packing and inventory shifts.",
      icon: <Package size={24} />,
      bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
      color: "rgba(167, 130, 91, 0.15)"
    },
    {
      title: "Pamphlet",
      desc: "Hand-to-hand distribution teams tracked via real-time GPS footprints and geofenced proof snaps.",
      icon: <FileText size={24} />,
      bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      color: "rgba(41, 33, 27, 0.05)"
    },
    {
      title: "Performers",
      desc: "Event artists, street promoters, and creative talent to elevate engagement at physical launches.",
      icon: <Sparkles size={24} />,
      bgImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
      color: "rgba(193, 154, 107, 0.15)"
    },
    {
      title: "Volunteer",
      desc: "Vetted coordinate volunteers for charity operations, event crowd safety, and community outreach.",
      icon: <Heart size={24} />,
      bgImage: "https://images.unsplash.com/photo-1559027615-cd4486d2303f?auto=format&fit=crop&w=400&q=80",
      color: "rgba(167, 130, 91, 0.15)"
    },
    {
      title: "Others",
      desc: "Need custom manual execution? Post your specific task scope and match in 15 minutes.",
      icon: <Plus size={24} />,
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
      color: "rgba(41, 33, 27, 0.05)"
    }
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="slider-section" style={{ backgroundColor: '#ffffff', padding: '100px 0', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Header Block matching Snabbit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', gap: '20px' }}>
          <div>
            <p style={{ 
              fontSize: '12px', 
              fontWeight: '700', 
              color: 'var(--color-accent)', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              marginBottom: '12px' 
            }}>
              GIG FORCE SERVICES
            </p>
            <h2 style={{ 
              fontSize: '40px', 
              fontWeight: '800', 
              color: 'var(--color-primary)', 
              lineHeight: 1.1,
              fontFamily: 'var(--font-heading)'
            }}>
              What Can Your Ziggers Do?
            </h2>
          </div>
          
          <button 
            onClick={scrollRight}
            className="group"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '15px', 
              fontWeight: '700', 
              color: 'var(--color-primary)', 
              backgroundColor: 'transparent',
              padding: '8px 16px',
              borderRadius: '50px',
              border: '1px solid rgba(41,33,27,0.12)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              e.currentTarget.style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(41,33,27,0.12)';
            }}
          >
            Explore Next 
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary)', 
              color: '#fff',
              fontSize: '12px',
              marginLeft: '4px',
              transition: 'transform 0.3s ease'
            }} className="arrow-badge">
              →
            </span>
          </button>
        </div>

        {/* Horizontal Slider Layout */}
        <div style={{ position: 'relative' }}>
          <div 
            ref={scrollContainerRef}
            className="slider-scroll-container"
            style={{ 
              display: 'flex', 
              gap: '24px', 
              overflowX: 'auto', 
              paddingBottom: '30px', 
              cursor: 'grab',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none'
            }}
          >
            {tasks.map((task, idx) => (
              <motion.div
                key={idx}
                className="slider-card"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{ 
                  flexShrink: 0,
                  width: '320px', 
                  height: '380px', 
                  borderRadius: '32px', 
                  position: 'relative', 
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                  boxShadow: '0 10px 30px rgba(41, 33, 27, 0.05)',
                  border: '1px solid rgba(41, 33, 27, 0.04)',
                  cursor: 'pointer'
                }}
              >
                {/* Background Image with elegant overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${task.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease'
                }} className="card-bg-image" />
                
                {/* Colored Tint matching brand */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: task.color,
                  mixBlendMode: 'multiply',
                  zIndex: 1
                }} />

                {/* Dark Vignette Overlay for excellent contrast */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(41, 33, 27, 0.1) 0%, rgba(41, 33, 27, 0.4) 50%, rgba(41, 33, 27, 0.9) 100%)',
                  zIndex: 2
                }} />

                {/* Content Block */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  padding: '32px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  zIndex: 3 
                }}>
                  {/* Top Icon Badge */}
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '16px', 
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {task.icon}
                  </div>

                  {/* Bottom Text */}
                  <div>
                    <h3 style={{ 
                      fontSize: '22px', 
                      fontWeight: '800', 
                      color: '#ffffff', 
                      marginBottom: '8px',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {task.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'rgba(255,255,255,0.75)', 
                      lineHeight: '1.5' 
                    }}>
                      {task.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .slider-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .slider-card:hover .card-bg-image {
          transform: scale(1.1);
        }
        .group:hover .arrow-badge {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
