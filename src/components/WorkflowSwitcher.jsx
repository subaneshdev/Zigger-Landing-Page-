import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, User, Smartphone, MapPin, Camera, CheckCircle } from 'lucide-react';

export default function WorkflowSwitcher() {
  const [activeRole, setActiveRole] = useState('employer');

  const employerSteps = [
    { title: "Post Gig", desc: "Define location, pay, and workers needed.", icon: <Briefcase /> },
    { title: "Escrow Pay", desc: "Funds locked safely in our system.", icon: <Smartphone /> },
    { title: "Live Tracking", desc: "Watch workers arrive in real-time.", icon: <MapPin /> },
    { title: "Approve Work", desc: "Review proofs and release payment.", icon: <CheckCircle /> },
  ];

  const workerSteps = [
    { title: "Find Gigs", desc: "Browse nearby on-ground work.", icon: <User /> },
    { title: "Check-In", desc: "Verify arrival via GPS & Photo.", icon: <MapPin /> },
    { title: "Execute", desc: "Update progress and upload proof.", icon: <Camera /> },
    { title: "Get Paid", desc: "Instant credit upon approval.", icon: <CheckCircle /> },
  ];

  const steps = activeRole === 'employer' ? employerSteps : workerSteps;

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '40px', marginBottom: '32px' }}>How it Works</h2>
          
          <div style={{ display: 'inline-flex', padding: '6px', backgroundColor: '#F3F4F6', borderRadius: '100px', border: '1px solid #E5E7EB' }}>
            <button 
              onClick={() => setActiveRole('employer')}
              style={{ 
                padding: '12px 30px', 
                borderRadius: '100px', 
                fontWeight: '600',
                backgroundColor: activeRole === 'employer' ? 'white' : 'transparent',
                color: activeRole === 'employer' ? 'var(--color-primary)' : '#6B7280',
                boxShadow: activeRole === 'employer' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              I'm an Employer
            </button>
            <button 
              onClick={() => setActiveRole('worker')}
              style={{ 
                padding: '12px 30px', 
                borderRadius: '100px', 
                fontWeight: '600',
                backgroundColor: activeRole === 'worker' ? 'white' : 'transparent',
                color: activeRole === 'worker' ? 'var(--color-primary)' : '#6B7280',
                boxShadow: activeRole === 'worker' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              I'm a Worker
            </button>
          </div>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <AnimatePresence mode="wait">
              {steps.map((step, idx) => (
                <motion.div
                  key={`${activeRole}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ textAlign: 'center', padding: '32px 20px' }}
                >
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '24px', 
                    backgroundColor: 'var(--color-surface)', 
                    color: 'var(--color-primary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 24px',
                    fontSize: '32px'
                  }}>
                    {React.cloneElement(step.icon, { size: 32 })}
                  </div>
                  <h4 style={{ fontSize: '20px', marginBottom: '12px' }}>{step.title}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>{step.desc}</p>
                  
                  {idx < 3 && (
                    <div className="step-arrow md-hidden" style={{ position: 'absolute', right: '-12px', top: '72px', color: '#E5E7EB' }}>
                      {/* Arrow indicator for desktop */}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 576px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
