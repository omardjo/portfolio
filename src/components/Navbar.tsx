// FIX MOBILE NAV - Complete rewrite for 100% mobile compatibility
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Code, Download } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX MOBILE NAV: Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Flutter Apps', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  // FIX MOBILE NAV: Unified click/tap handler with preventDefault
  const handleNavClick = useCallback((e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Close mobile menu immediately
    setIsOpen(false);

    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');

      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      };

      if (isHome) {
        // Small delay to let menu close animation finish
        setTimeout(scrollToElement, 100);
      } else {
        navigate('/');
        setTimeout(scrollToElement, 300);
      }
    }
  }, [isHome, navigate]);

  // FIX MOBILE NAV: Toggle with explicit state
  const toggleMenu = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* FIX MOBILE NAV: Fixed navbar with proper z-index */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-300 ${scrolled ? 'pt-2 md:pt-4' : 'pt-3 md:pt-6'}`}
        style={{ touchAction: 'manipulation' }}
      >
        <div className={`
          relative w-[95%] max-w-6xl mx-auto px-4 md:px-6 py-3 rounded-full transition-all duration-300
          ${scrolled 
            ? 'bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
            : 'bg-gray-900/40 backdrop-blur-md border border-white/5'}
        `}>
          <div className="flex justify-between items-center">
            {/* FLUTTER FOCUS: Logo */}
            <Link 
              to="/" 
              onClick={closeMenu}
              className="flex items-center gap-2 font-bold text-lg md:text-xl text-white hover:text-primary transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              <Code className="w-5 h-5 md:w-6 md:h-6 text-primary" />
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}

              {/* Desktop CV Button */}
              <a
                href="/assets/documents/Resume.pdf"
                download="Omar_Djebbi_CV.pdf"
                className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/80 transition-all duration-300 flex items-center gap-1.5"
              >
                <Download size={14} /> CV
              </a>
            </div>

            {/* FIX MOBILE NAV: Hamburger button - min 48px touch target */}
            <button 
              type="button"
              className="md:hidden flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-full text-white bg-white/10 active:scale-95 active:bg-white/20 transition-all cursor-pointer"
              onClick={toggleMenu}
              onTouchEnd={toggleMenu}
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* FIX MOBILE NAV: Full-screen mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99] md:hidden"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Backdrop - tap to close */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
            onTouchEnd={(e) => { e.preventDefault(); closeMenu(); }}
          />
          
          {/* Menu panel */}
          <div 
            className="absolute top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-2 animate-slideDown"
          >
            <Link 
              to="/" 
              onClick={closeMenu}
              className="flex items-center justify-center min-h-[48px] py-3 rounded-xl bg-white/5 text-white hover:bg-primary/20 active:scale-95 transition-all font-medium cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              Home
            </Link>
            
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onTouchEnd={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-center min-h-[48px] py-3 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white active:scale-95 transition-all font-medium cursor-pointer"
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              >
                {link.name}
              </a>
            ))}

            {/* FIX MOBILE NAV: CV download button in mobile menu */}
            <a
              href="/assets/documents/Resume.pdf"
              download="Omar_Djebbi_CV.pdf"
              className="flex items-center justify-center gap-2 min-h-[48px] py-3 rounded-xl bg-primary text-white font-semibold active:scale-95 transition-all cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              <Download size={18} /> Télécharger CV
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;