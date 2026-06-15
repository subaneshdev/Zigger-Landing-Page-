import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import GigTasksSlider from './components/GigTasksSlider'
import ProblemSection from './components/ProblemSection'
import Features from './components/Features'
import WorkflowSwitcher from './components/WorkflowSwitcher'
import AppShowcaseSection from './components/AppShowcaseSection'
import TrustSection from './components/TrustSection'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import BlogSection from './components/BlogSection'
import Blog from './components/Blog'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeBlogPostId, setActiveBlogPostId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else if (hash === '#terms') {
        setCurrentPage('terms');
        window.scrollTo(0, 0);
      } else if (hash === '#blog') {
        setCurrentPage('blog');
        setActiveBlogPostId(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#blog-post/')) {
        const id = hash.replace('#blog-post/', '');
        setCurrentPage('blog-post');
        setActiveBlogPostId(id);
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetPage = (page, postId = null) => {
    setCurrentPage(page);
    if (page === 'privacy') {
      window.location.hash = 'privacy';
    } else if (page === 'terms') {
      window.location.hash = 'terms';
    } else if (page === 'blog') {
      window.location.hash = 'blog';
      setActiveBlogPostId(null);
    } else if (page === 'blog-post' && postId) {
      window.location.hash = `blog-post/${postId}`;
      setActiveBlogPostId(postId);
    } else {
      if (
        window.location.hash === '#privacy' || 
        window.location.hash === '#terms' || 
        window.location.hash === '#blog' || 
        window.location.hash.startsWith('#blog-post/')
      ) {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="app-wrapper">
      <Navigation currentPage={currentPage} setCurrentPage={handleSetPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <main>
              <Hero />
              <GigTasksSlider />
              <ProblemSection />
              <WorkflowSwitcher />
              <AppShowcaseSection />
              <Features />
              <BlogSection onNavigateToBlog={(postId) => postId ? handleSetPage('blog-post', postId) : handleSetPage('blog')} />
              <TrustSection />
            </main>
          </motion.div>
        ) : currentPage === 'privacy' ? (
          <motion.div
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PrivacyPolicy onBack={() => handleSetPage('home')} />
          </motion.div>
        ) : currentPage === 'blog' || currentPage === 'blog-post' ? (
          <motion.div
            key="blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Blog 
              activePostId={activeBlogPostId} 
              setActivePostId={(id) => id ? handleSetPage('blog-post', id) : handleSetPage('blog')} 
              onBackToHome={() => handleSetPage('home')} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="terms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TermsOfService onBack={() => handleSetPage('home')} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer currentPage={currentPage} setCurrentPage={handleSetPage} />
    </div>
  )
}

export default App
