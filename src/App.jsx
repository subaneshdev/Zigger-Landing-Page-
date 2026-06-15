import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

export default App
