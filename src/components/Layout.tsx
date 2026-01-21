import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import the Navbar (Default import)
import Navbar from './Navbar'; 
// Import AudioPlayer (ensure this file exists in components folder)
import { AudioPlayer } from './AudioPlayer';

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-dark/80 backdrop-blur-md border-t border-white/10 pt-12 pb-6 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Omar Djebbi</h3>
            <p className="text-slate-400">
              Mobile developer specialized in Flutter and Node.js, creating exceptional digital experiences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="/#about" className="text-slate-400 hover:text-primary transition-colors">About Me</a>
              <a href="/projects" className="text-slate-400 hover:text-primary transition-colors">All Projects</a>
              <a href="/#experience" className="text-slate-400 hover:text-primary transition-colors">Experience</a>
            </div>
          </div>
          <div>
             <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
             <div className="flex gap-4">
                <a href="https://linkedin.com/in/djebbi-omar" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Linkedin size={20} /></a>
                <a href="https://github.com/omardjo" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Github size={20} /></a>
                <a href="https://x.com/OmarDjebbi5" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Twitter size={20} /></a>
                <a href="mailto:omar.djebbi@tijari.biz" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Mail size={20} /></a>
             </div>
          </div>
        </div>
        <div className="text-center border-t border-white/10 pt-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Omar Djebbi. All rights reserved. Made with ❤️ using React & Tailwind.
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