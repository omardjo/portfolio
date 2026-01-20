import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const getLinkTarget = (href: string) => {
    if (href.startsWith('#') && !isHome) {
      return `/${href}`;
    }
    return href;
  };

  return (
    // Outer container handles positioning
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}>
      
      {/* Inner Container: The Floating Glass Pill */}
      <div className={`
        relative w-[95%] max-w-6xl mx-auto px-6 py-3 rounded-full transition-all duration-300
        ${scrolled 
          ? 'bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent border border-transparent'}
      `}>
        
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-primary transition-colors">
            <Code className="w-6 h-6 text-primary" />
            <span>Omar Djebbi</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isHome ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={getLinkTarget(link.href)} 
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown (Inside the glass container context) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden overflow-hidden flex flex-col gap-2"
            >
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="text-center py-3 rounded-xl bg-white/5 text-white hover:bg-primary/20"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={getLinkTarget(link.href)}
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;