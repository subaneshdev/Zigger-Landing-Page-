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

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetPage = (page) => {
    setCurrentPage(page);
    if (page === 'privacy') {
      window.location.hash = 'privacy';
    } else {
      if (window.location.hash === '#privacy') {
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
              <TrustSection />
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PrivacyPolicy onBack={() => handleSetPage('home')} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer currentPage={currentPage} setCurrentPage={handleSetPage} />
    </div>
  )
}

export default App
