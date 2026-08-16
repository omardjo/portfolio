import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { DocumentActions } from './DocumentActions';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // High-performance scroll tracking for navbar background transition
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 30;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // High-performance IntersectionObserver for active section highlight (Zero layout thrashing)
  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sectionIds = ['about', 'projects', 'experience', 'certifications', 'contact'];
    const observedElements: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observedElements.push(el);
      }
    });

    return () => {
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [isHome]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smooth scroll click handler
  const handleNavClick = useCallback(
    (href: string) => {
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
        doScroll();
      } else {
        navigate('/');
        setTimeout(doScroll, 350);
      }
    },
    [isHome, navigate]
  );

  return (
    <>
      {/* NAVBAR FIXED TOP */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#070a13]/85 backdrop-blur-xl border-b border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white font-extrabold text-xl tracking-tight hover:text-[#36E3FF] transition-colors select-none group"
            >
              Omar<span className="text-[#36E3FF] group-hover:text-[#7C5CFF] transition-colors">.</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 cursor-pointer relative group ${
                      isActive
                        ? 'text-white bg-white/[0.1] shadow-inner'
                        : 'text-[#D7DCE5] hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {/* Glowing Underline Indicator */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[#36E3FF] to-[#7C5CFF] rounded-full transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Desktop "Get in Touch" */}
              <button
                type="button"
                onClick={() => handleNavClick('#contact')}
                className="ml-2 px-5 py-2 text-[13px] font-bold text-white bg-gradient-to-r from-[#6366f1] via-[#7C5CFF] to-[#36E3FF] hover:opacity-95 rounded-full transition-all duration-200 cursor-pointer active:scale-[0.97] shadow-md hover:shadow-[0_0_20px_rgba(54,227,255,0.4)]"
              >
                Get in Touch
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#070a13]/85 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-[72px] inset-x-0 mx-3 bg-[#0f172a]/95 border border-white/[0.14] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
            >
              <div className="p-4 flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href;

                  return (
                    <motion.button
                      key={link.name}
                      type="button"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-5 py-3.5 text-[15px] font-semibold rounded-xl transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'text-[#36E3FF] bg-white/[0.08] border-l-4 border-[#36E3FF]'
                          : 'text-[#D7DCE5] hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      {link.name}
                    </motion.button>
                  );
                })}

                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent mx-3 my-2" />

                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.04, duration: 0.2 }}
                  onClick={() => handleNavClick('#contact')}
                  className="w-full text-center px-5 py-3.5 text-[15px] font-bold text-white bg-gradient-to-r from-[#6366f1] via-[#7C5CFF] to-[#36E3FF] rounded-xl active:scale-[0.97] transition-all duration-150 cursor-pointer shadow-lg shadow-[#7C5CFF]/30"
                >
                  Get in Touch
                </motion.button>

                <DocumentActions variant="navbar-mobile" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;