import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import { AudioPlayer } from './AudioPlayer';
import { SpaceBackground } from './SpaceBackground';

// Refined footer
const Footer: React.FC = () => (
  <footer className="relative z-10 py-12 bg-[#070a13]/85 backdrop-blur-xl border-t border-white/[0.1] shadow-[0_-15px_35px_rgba(0,0,0,0.5)]">
    <div className="section-divider-glow w-full absolute top-0 left-0 right-0" />
    <div className="container mx-auto px-5 md:px-8 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left - brand */}
        <div className="text-center md:text-left">
          <p className="text-[#F5F7FA] font-bold text-xl tracking-tight">
            Omar<span className="text-[#36E3FF]">.</span>
          </p>
          <p className="text-[#D7DCE5] text-sm font-medium mt-1 tracking-wide">
            Flutter Mobile Developer
          </p>
        </div>

        {/* Center - social icons */}
        <div className="flex items-center gap-3.5">
          {[
            { Icon: Linkedin, href: 'https://linkedin.com/in/djebbi-omar', label: 'LinkedIn' },
            { Icon: Github, href: 'https://github.com/omardjo', label: 'GitHub' },
            { Icon: Twitter, href: 'https://x.com/OmarDjebbi5', label: 'Twitter' },
            { Icon: Mail, href: 'mailto:omar.djebbi@mavision.site', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#A8B3C7] hover:text-[#36E3FF] hover:bg-[#7C5CFF]/20 hover:border-[#36E3FF]/50 transition-all duration-300 active:scale-95 shadow-md hover:shadow-[0_0_20px_rgba(54,227,255,0.35)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Right - copyright */}
        <p className="text-[#A8B3C7] text-sm font-medium">
          © {new Date().getFullYear()} Omar Djebbi
        </p>
      </div>
    </div>
  </footer>
);

// Scroll Progress Bar
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[1001] pointer-events-none"
      style={{ scaleX }}
    />
  );
};

// Main Layout
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative min-h-screen flex flex-col">
    <SpaceBackground />
    <ScrollProgress />
    <Navbar />
    <main className="flex-grow pt-0">{children}</main>
    <AudioPlayer />
    <Footer />
  </div>
);