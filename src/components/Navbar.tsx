import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we are currently on the Home page
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

  // --- THE FIX: Smart Scroll Handler ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept links that start with '#' (sections)
    if (href.startsWith('#')) {
      e.preventDefault(); // STOP the router from changing the URL (Fixes the empty page)
      
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);

      if (isHome) {
        // If we are already Home, just scroll to the section
        if (element) {
          const navHeight = 80; // Offset for the fixed header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
      
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        // If we are on another page (like /projects), go Home first
        navigate('/');
        // Wait for Home to load, then scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
      setIsOpen(false); // Close mobile menu
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}>
      
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
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)} // <--- THIS IS CRITICAL
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
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

        {/* Mobile Menu Dropdown */}
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
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)} // <--- APPLIED HERE TOO
                  className="text-center py-3 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
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