// NAVBAR FIXED TOP - Premium design inspired by rafsan-theta
// FIX MOBILE MENU BUTTONS - Complete rewrite for 100% clickable mobile nav
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // NAVBAR FIXED TOP: Track scroll for background opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX MOBILE MENU: Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  // SMOOTH SCROLL GET IN TOUCH - single handler for all nav clicks
  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);

    if (!href.startsWith('#')) return;

    const targetId = href.replace('#', '');
    const doScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (isHome) {
      // Small delay so mobile menu closes first
      setTimeout(doScroll, 150);
    } else {
      navigate('/');
      setTimeout(doScroll, 400);
    }
  }, [isHome, navigate]);

  return (
    <>
      {/* NAVBAR FIXED TOP - never moves on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b1121]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg tracking-tight hover:text-primary transition-colors select-none"
            >
              Omar<span className="text-primary">.</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}

              {/* Desktop "Get in Touch" */}
              <button
                type="button"
                onClick={() => handleNavClick('#contact')}
                className="ml-3 px-5 py-2 text-[13px] font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                Get in Touch
              </button>
            </div>

            {/* FIX MOBILE MENU BUTTONS: Hamburger - clean, no double handlers */}
            <button
              type="button"
              onClick={() => setIsOpen(prev => !prev)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE REFAIT (comme rafsan-theta) - Full-screen overlay + slide élégant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] md:hidden"
          >
            {/* Backdrop - full screen blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0b1121]/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel - slides from top, bigger and more refined */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-[72px] inset-x-0 mx-3 bg-[#111827]/95 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-2xl"
            >
              <div className="p-4 flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-5 py-4 text-[16px] font-medium text-gray-200 rounded-xl hover:bg-white/[0.06] hover:text-white active:bg-white/[0.1] active:scale-[0.98] transition-all duration-150 cursor-pointer"
                  >
                    {link.name}
                  </motion.button>
                ))}

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mx-3 my-2" />

                {/* SMOOTH SCROLL GET IN TOUCH - mobile CTA */}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.25 }}
                  onClick={() => handleNavClick('#contact')}
                  className="w-full text-center px-5 py-4 text-[16px] font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl active:scale-[0.97] transition-all duration-150 cursor-pointer shadow-lg shadow-primary/20"
                >
                  Get in Touch
                </motion.button>

                {/* CV Download */}
                <motion.a
                  href="/assets/documents/Omar_Djebbi_CV.pdf"
                  download="Omar_Djebbi_CV.pdf"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 + 0.05, duration: 0.25 }}
                  className="w-full text-center px-5 py-4 text-[16px] font-medium text-gray-300 border border-white/[0.08] rounded-xl hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download size={16} /> Download CV
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;