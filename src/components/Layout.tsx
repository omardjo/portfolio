import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import { AudioPlayer } from './AudioPlayer';

// Clean footer inspired by rafsan-theta
const Footer = () => (
  <footer className="border-t border-white/[0.06] py-10 relative z-10">
    <div className="container mx-auto px-5 md:px-8 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left - brand */}
        <div className="text-center md:text-left">
          <p className="text-white font-semibold text-lg">
            Omar<span className="text-primary">.</span>
          </p>
          <p className="text-gray-500 text-sm mt-1">Flutter Mobile Developer</p>
        </div>

        {/* Center - social icons */}
        <div className="flex items-center gap-3">
          {[
            { Icon: Linkedin, href: 'https://linkedin.com/in/djebbi-omar', label: 'LinkedIn' },
            { Icon: Github, href: 'https://github.com/omardjo', label: 'GitHub' },
            { Icon: Twitter, href: 'https://x.com/OmarDjebbi5', label: 'Twitter' },
            { Icon: Mail, href: 'mailto:omar.djebbi@tijari.biz', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] hover:bg-primary/20 hover:text-primary text-gray-500 transition-all duration-200 cursor-pointer"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Right - copyright */}
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Omar Djebbi
        </p>
      </div>
    </div>
  </footer>
);

// Scroll Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[1001]"
      style={{ scaleX }}
    />
  );
};

// Background Stars
const BackgroundEffects = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="stars" />
    <div className="stars2" />
  </div>
);

// Main Layout
export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen flex flex-col">
    <BackgroundEffects />
    <ScrollProgress />
    <Navbar />
    <main className="flex-grow pt-0">{children}</main>
    <AudioPlayer />
    <Footer />
  </div>
);