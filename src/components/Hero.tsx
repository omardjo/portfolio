// Hero section - Premium clean design inspired by rafsan-theta
import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown, MapPin } from 'lucide-react';
import { DocumentActions } from './DocumentActions';
import { HolographicAvatar } from './HolographicAvatar';
import { MagneticButton } from './MagneticButton';

export const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    // FIX PHOTO HERO - meilleur spacing + ring + ombre professionnelle
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-20">
      {/* Subtle gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-primary/[0.07] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-secondary/[0.07] rounded-full blur-[120px]" />

      <div className="container mx-auto px-5 md:px-8 max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* HOLOGRAPHIC HERO PROFILE AVATAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            <HolographicAvatar
              imageSrc="/assets/images/myPhoto.jpg"
              altText="Omar Djebbi"
            />
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 px-4 py-1.5 mb-6 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 hover:border-emerald-500/35 rounded-full transition-all duration-200 cursor-default shadow-sm shadow-emerald-500/5"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium tracking-wide">Disponible immédiatement</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 tracking-tight"
          >
            <span className="text-white">BUILDING BEAUTIFUL</span>
            <br />
            <span className="text-gradient-animate">MOBILE APPS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-3 leading-relaxed"
          >
            Développeur mobile spécialisé <span className="text-primary font-medium">Flutter & Firebase</span> avec 2+ ans d'expérience en applications cross-platform performantes.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-1.5 text-gray-500 text-sm mb-8"
          >
            <MapPin size={14} />
            <span>Tunis – Monplaisir, Tunisie</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-col items-center gap-5 mb-14 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <MagneticButton
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-7 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer magnetic-btn-glow text-[15px]"
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                type="button"
                onClick={() => scrollTo('projects')}
                className="px-7 py-3.5 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium rounded-xl border border-white/[0.1] transition-all duration-200 active:scale-[0.97] cursor-pointer text-[15px] hover:border-white/20"
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
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} className="text-gray-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};