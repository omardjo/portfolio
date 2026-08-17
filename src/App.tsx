import React, { useEffect, Suspense, lazy } from 'react';
import './index.css'; 

import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

// Import Core Layout & Components
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';

// Lazy-load Chatbot (Loaded on-demand, not blocking initial render)
const Chatbot = lazy(() => import('./components/Chatbot').then(m => ({ default: m.Chatbot })));

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// BackButton Component
const BackButton = () => (
  <div className="container mx-auto px-5 md:px-8 mb-6">
    <Link 
      to="/" 
      className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.12] text-slate-300 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all shadow-md backdrop-blur-md group focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Retour à l'accueil"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

// Home Page
const Home = () => (
  <>
    <Hero />
    <About />
    <Projects featuredIds={['riwaq', 'kidora', 'mes', 'stripe', 'career']} />
    <Experience limit={3} />
    <Certifications limit={3} />
    <Contact />
  </>
);

const AllProjectsPage = () => (
  <div className="pt-28 pb-14 min-h-[80vh]">
    <BackButton />
    <Projects />
  </div>
);

const AllExperiencePage = () => (
  <div className="pt-28 pb-14 min-h-[80vh]">
    <BackButton />
    <div className="container mx-auto px-5 md:px-8 mb-10 text-center">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Parcours Professionnel Complet</h1>
      <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">Détail chronologique de toutes mes expériences professionnelles et projets freelance.</p>
    </div>
    <Experience />
  </div>
);

const AllCertificationsPage = () => (
  <div className="pt-28 pb-14 min-h-[80vh]">
    <BackButton />
    <div className="container mx-auto px-5 md:px-8 mb-10 text-center">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Toutes les Certifications</h1>
      <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">Certifications professionnelles validées dans le développement mobile, backend et cloud.</p>
    </div>
    <Certifications />
  </div>
);

// --- MAIN APP ---
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Omar Djebbi | Flutter Mobile Developer</title>
        <meta name="description" content="Omar Djebbi – Flutter Mobile Developer based in Tunis. Building beautiful cross-platform apps with Dart, Firebase & clean architecture." />
        <link rel="canonical" href="https://portfolio.mavision.site/" />
        <meta property="og:url" content="https://portfolio.mavision.site/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Omar Djebbi | Flutter Mobile Developer" />
        <meta property="og:description" content="Omar Djebbi – Flutter Mobile Developer based in Tunis. Building beautiful cross-platform apps with Dart, Firebase & clean architecture." />
        <meta property="og:image" content="https://portfolio.mavision.site/assets/images/myPhoto.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://portfolio.mavision.site/" />
        <meta name="twitter:title" content="Omar Djebbi | Flutter Mobile Developer" />
        <meta name="twitter:description" content="Omar Djebbi – Flutter Mobile Developer based in Tunis. Building beautiful cross-platform apps with Dart, Firebase & clean architecture." />
        <meta name="twitter:image" content="https://portfolio.mavision.site/assets/images/myPhoto.jpg" />
      </Helmet>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjectsPage />} />
            <Route path="/experience" element={<AllExperiencePage />} />
            <Route path="/certificates" element={<AllCertificationsPage />} />
          </Routes>
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
