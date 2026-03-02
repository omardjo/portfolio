import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import the Navbar (Default import)
import Navbar from './Navbar'; 
// Import AudioPlayer (ensure this file exists in components folder)
import { AudioPlayer } from './AudioPlayer';

// FLUTTER FOCUS: Footer with Flutter branding
const Footer = () => {
  return (
    <footer className="bg-dark/80 backdrop-blur-md border-t border-white/10 pt-12 pb-6 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            {/* FLUTTER FOCUS: Updated description */}
            <h3 className="text-xl font-bold text-white mb-4">Omar Djebbi</h3>
            <p className="text-slate-400">
              Développeur mobile spécialisé Flutter & Firebase, créant des applications mobiles performantes et des expériences digitales exceptionnelles.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Liens Rapides</h3>
            <div className="flex flex-col gap-2">
              <a href="/#about" className="text-slate-400 hover:text-primary transition-colors min-h-[44px] flex items-center" style={{ touchAction: 'manipulation' }}>À Propos</a>
              <a href="/projects" className="text-slate-400 hover:text-primary transition-colors min-h-[44px] flex items-center" style={{ touchAction: 'manipulation' }}>Tous les Projets</a>
              <a href="/#experience" className="text-slate-400 hover:text-primary transition-colors min-h-[44px] flex items-center" style={{ touchAction: 'manipulation' }}>Expérience</a>
              {/* FIX MOBILE: CV download in footer */}
              <a href="/assets/documents/Resume.pdf" download="Omar_Djebbi_CV.pdf" className="text-primary hover:text-white transition-colors min-h-[44px] flex items-center font-semibold" style={{ touchAction: 'manipulation' }}>📄 Télécharger CV</a>
            </div>
          </div>
          <div>
             <h3 className="text-xl font-bold text-white mb-4">Me Contacter</h3>
             {/* FIX MOBILE: Touch targets for social icons */}
             <div className="flex gap-3">
                <a href="https://linkedin.com/in/djebbi-omar" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[44px] min-h-[44px] bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer" style={{ touchAction: 'manipulation' }}><Linkedin size={20} /></a>
                <a href="https://github.com/omardjo" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[44px] min-h-[44px] bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer" style={{ touchAction: 'manipulation' }}><Github size={20} /></a>
                <a href="https://x.com/OmarDjebbi5" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[44px] min-h-[44px] bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer" style={{ touchAction: 'manipulation' }}><Twitter size={20} /></a>
                <a href="mailto:omar.djebbi@tijari.biz" className="p-3 min-w-[44px] min-h-[44px] bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer" style={{ touchAction: 'manipulation' }}><Mail size={20} /></a>
             </div>
          </div>
        </div>
        {/* FLUTTER FOCUS: Footer tagline */}
        <div className="text-center border-t border-white/10 pt-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Omar Djebbi. Tous droits réservés. Built with React • Passionné Flutter 🔥
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Scroll Progress Bar ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary origin-left z-[1001]"
      style={{ scaleX }}
    />
  );
};

// --- Background Effects ---
const BackgroundEffects = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
     <div className="stars"></div>
     <div className="stars2"></div>
  </div>
);

// --- Main Layout Export ---
// This is the Named Export that App.tsx is looking for
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundEffects />
      <ScrollProgress />
      
      {/* The Navbar is used here */}
      <Navbar /> 
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <AudioPlayer />
      <Footer />
    </div>
  );
};