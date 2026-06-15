import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import GigTasksSlider from './components/GigTasksSlider';
import ProblemSection from './components/ProblemSection';
import Features from './components/Features';
import WorkflowSwitcher from './components/WorkflowSwitcher';
import AppShowcaseSection from './components/AppShowcaseSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import BlogSection from './components/BlogSection';
import Blog from './components/Blog';
import ActingDrivers from './components/pages/ActingDrivers';
import CateringStaff from './components/pages/CateringStaff';
import BrandPromoters from './components/pages/BrandPromoters';

function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <Hero />
      <GigTasksSlider />
      <ProblemSection />
      <WorkflowSwitcher />
      <AppShowcaseSection />
      <Features />
      <BlogSection onNavigateToBlog={(postId) => postId ? navigate(`/blog/${postId}`) : navigate('/blog')} />
      <TrustSection />
    </main>
  );
}

function BlogRoute() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Blog 
      activePostId={id || null} 
      setActivePostId={(newId) => newId ? navigate(`/blog/${newId}`) : navigate('/blog')} 
      onBackToHome={() => navigate('/')} 
    />
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <Navigation />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Home />
            </motion.div>
          } />
          
          {/* Acting Drivers SEO Page */}
          <Route path="/hire-acting-drivers-chennai" element={
            <motion.div
              key="acting-drivers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ActingDrivers />
            </motion.div>
          } />

          {/* Catering Staff SEO Page */}
          <Route path="/hire-catering-staff-chennai" element={
            <motion.div
              key="catering-staff"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CateringStaff />
            </motion.div>
          } />

          {/* Brand Promoters SEO Page */}
          <Route path="/hire-brand-promoters-chennai" element={
            <motion.div
              key="brand-promoters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BrandPromoters />
            </motion.div>
          } />

          <Route path="/privacy" element={
            <motion.div
              key="privacy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PrivacyPolicy />
            </motion.div>
          } />

          <Route path="/terms" element={
            <motion.div
              key="terms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TermsOfService />
            </motion.div>
          } />

          <Route path="/blog" element={
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogRoute />
            </motion.div>
          } />

          <Route path="/blog/:id" element={
            <motion.div
              key="blog-post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogRoute />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;
