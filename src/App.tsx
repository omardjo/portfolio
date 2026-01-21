import React, { useEffect } from 'react';
// 1. IMPORT THE CSS FILE HERE TO FIX THE "DAMAGED STYLE" ISSUE
import './index.css'; 

import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

// Import Components
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// BackButton Component
const BackButton = () => (
  <div className="container mx-auto px-4 mb-6">
    <Link 
      to="/" 
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 text-slate-300 hover:text-white hover:bg-primary hover:border-primary transition-all shadow-lg backdrop-blur-sm group"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
    </Link>
  </div>
);

// Page Components
const Home = () => (
  <>
    <Hero />
    <About />
    <Projects featuredIds={['kidora', 'stripe', 'mes']} />
    <Experience limit={3} />
    <Certifications limit={3} />
    <Contact />
  </>
);

const AllProjectsPage = () => (
  <div className="pt-28 pb-10">
    <BackButton />
    <Projects />
  </div>
);

const AllExperiencePage = () => (
  <div className="pt-28 pb-10">
    <BackButton />
    <div className="container mx-auto px-4 mb-10 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Full Career History</h1>
    </div>
    <Experience />
  </div>
);

const AllCertificationsPage = () => (
  <div className="pt-28 pb-10">
    <BackButton />
    <div className="container mx-auto px-4 mb-10 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">All Certifications</h1>
    </div>
    <Certifications />
  </div>
);

// --- MAIN APP ---
const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjectsPage />} />
            <Route path="/experience" element={<AllExperiencePage />} />
            <Route path="/certificates" element={<AllCertificationsPage />} />
          </Routes>
          <Chatbot />
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;