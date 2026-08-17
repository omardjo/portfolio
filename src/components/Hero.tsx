import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { DocumentActions } from './DocumentActions';
import { HolographicAvatar } from './HolographicAvatar';
import { MagneticButton } from './MagneticButton';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-20">
      {/* Hero Spotlight Focus Zone */}
      <div className="absolute inset-0 hero-spotlight-zone pointer-events-none -z-10" />

      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 -left-32 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-[#36E3FF]/[0.05] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-[#7C5CFF]/[0.05] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* HOLOGRAPHIC HERO PROFILE AVATAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-4 sm:mb-5"
          >
            <HolographicAvatar
              imageSrc="/assets/images/myPhoto.jpg"
              altText="Omar Djebbi"
            />
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center gap-2 px-3.5 py-1.5 mb-4 sm:mb-5 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 rounded-full transition-all duration-200 cursor-default shadow-sm shadow-emerald-500/10"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium tracking-wide">
              Disponible immédiatement
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-3.5 sm:mb-5 tracking-tight hero-title-shadow leading-[1.12]"
          >
            <span className="text-white">BUILDING BEAUTIFUL</span>
            <br />
            <span className="text-gradient-animate">MOBILE APPS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
            className="text-[#E8ECF7] text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-2 sm:mb-3 leading-relaxed font-normal drop-shadow-md"
          >
            Développeur mobile spécialisé <span className="text-[#36E3FF] font-semibold">Flutter & Firebase</span> avec 2+ ans d'expérience en applications cross-platform performantes.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm mb-6 sm:mb-7"
          >
            <MapPin size={13} className="text-[#36E3FF]" />
            <span>Tunis – Monplaisir, Tunisie</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.3 }}
            className="flex flex-col items-center gap-3.5 sm:gap-4 mb-10 sm:mb-14 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <MagneticButton
                type="button"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-gradient-to-r from-[#6366f1] via-[#7C5CFF] to-[#36E3FF] hover:opacity-95 text-white font-semibold rounded-xl transition-all duration-150 active:scale-[0.97] cursor-pointer text-sm sm:text-[15px] shadow-lg shadow-[#7C5CFF]/30 focus-visible:ring-2 focus-visible:ring-primary"
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                type="button"
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium rounded-xl border border-white/[0.15] transition-all duration-150 active:scale-[0.97] cursor-pointer text-sm sm:text-[15px] hover:border-white/30 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-white"
              >
                View Projects
              </MagneticButton>
            </div>
            <DocumentActions variant="hero" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} className="text-gray-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};