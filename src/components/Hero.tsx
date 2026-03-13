// Hero section - Premium clean design inspired by rafsan-theta
import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown, MapPin } from 'lucide-react';

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

          {/* FIX PHOTO HERO - repositionnée avec ring élégant, ombre douce, look pro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10"
          >
            {/* Glow effect behind photo */}
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/20 blur-2xl scale-110 -z-10" />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-[3px] ring-primary/25 ring-offset-[5px] ring-offset-[#0b1121] shadow-2xl shadow-primary/15">
              <img
                src="/assets/images/myPhoto.jpg"
                alt="Omar Djebbi"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Online status dot */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-[#0b1121] shadow-lg shadow-emerald-500/30" />
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Disponible immédiatement</span>
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
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12"
          >
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="px-7 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-lg shadow-primary/20 text-[15px]"
            >
              Get in Touch
            </button>
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="px-7 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium rounded-xl border border-white/[0.08] transition-all duration-200 active:scale-[0.97] cursor-pointer text-[15px]"
            >
              View Projects
            </button>
            <a
              href="/assets/documents/Omar_Djebbi_CV.pdf"
              download="Omar_Djebbi_CV.pdf"
              className="px-7 py-3 text-gray-400 hover:text-white font-medium rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-2 text-[15px]"
            >
              <Download size={16} /> Download CV
            </a>
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