import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom'; // Added for routing logic
import { AudioPlayer } from './AudioPlayer'; // Import the AudioPlayer

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Get current page path
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' }, // If you want this to link to section on home
    // If 'Projects' should link to the separate page, change href to '/projects' and adjust logic
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  // Helper to determine where a link should go
  const getLinkTarget = (href: string) => {
    // If it's a hash link (#about) and we are NOT on home, go to /#about
    if (href.startsWith('#') && !isHome) {
      return `/${href}`;
    }
    return href;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-white/10 py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo links back to Home */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-primary transition-colors">
            <Code className="w-6 h-6 text-primary" />
            <span>Omar Djebbi</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={getLinkTarget(link.href)} 
                className="text-slate-300 hover:text-white font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full" />
              </a>
            ))}
            {/* Direct link to All Projects Page if not in the list above */}
            {!isHome && (
               <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">
                  Home
               </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-dark/95 border-b border-white/10 p-4 flex flex-col gap-4 backdrop-blur-md"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={getLinkTarget(link.href)}
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-primary py-2 px-4 rounded hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/projects" 
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-primary py-2 px-4 rounded hover:bg-white/5 transition-all font-semibold"
          >
            All Projects Archive
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

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

// Updated to match your CSS file (space-background-fixed)
const BackgroundEffects = () => (
  <div className="space-background-fixed">
     <div className="stars"></div>
     <div className="stars2"></div>
  </div>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundEffects />
      <ScrollProgress />
      
      <Navbar />
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      {/* Persistent Audio Player */}
      <AudioPlayer />
      
      <Footer />
    </div>
  );
};