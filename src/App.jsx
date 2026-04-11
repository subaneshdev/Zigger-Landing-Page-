import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import Features from './components/Features'
import WorkflowSwitcher from './components/WorkflowSwitcher'
import TrustSection from './components/TrustSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-wrapper">
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <WorkflowSwitcher />
        <Features />
        <TrustSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
