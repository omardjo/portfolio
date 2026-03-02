// FLUTTER FOCUS: Hero section with Flutter branding
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Download, ChevronRight, Mail, Smartphone } from 'lucide-react';

export const Hero = () => {
  // FLUTTER FOCUS: Updated typing text
  const typingText = "Mobile Developer spécialisé Flutter & Firebase | 2+ ans d'expérience | Tunis";

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden py-10 md:py-12">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Image with Glow */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-glow opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
            <img
              src="/assets/images/myPhoto.jpg"
              alt="Omar Djebbi - Développeur Flutter"
              className="relative w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl z-10"
              loading="eager"
            />
          </div>

          {/* FLUTTER FOCUS: Badge */}
          <div className="inline-flex items-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl mb-4 shadow-lg backdrop-blur-sm">
            <Smartphone className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Développeur Mobile Flutter</span>
          </div>

          {/* FLUTTER FOCUS: Updated title */}
          <h1 className="text-3xl md:text-6xl font-bold mb-4 text-gradient-animate pb-2">
            Omar Djebbi | Développeur Mobile Flutter
          </h1>

          {/* FLUTTER FOCUS: Typewriter subtitle */}
          <div className="min-h-[2rem] md:h-8 mb-4 flex justify-center items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 3.5, ease: "linear" }}
              className="overflow-hidden whitespace-nowrap border-r-4 border-primary pr-2"
            >
              <p className="text-base md:text-xl text-gray-300 font-light">
                {typingText}
              </p>
            </motion.div>
          </div>

          {/* FLUTTER FOCUS: React disclaimer */}
          <p className="text-sm text-gray-500 mb-4 italic">
            Ce portfolio est fait avec React, mais je suis avant tout un expert Flutter (toutes mes apps mobiles sont en Dart/Flutter) 🔥
          </p>

          {/* FLUTTER FOCUS: Description */}
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Conception et développement d'applications mobiles performantes et scalables avec Flutter & Firebase.
            Spécialisé en développement cross-platform et architectures robustes (Riverpod, Bloc, Clean Architecture).
          </p>

          {/* FIX MOBILE: Buttons with proper touch targets */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a 
              href="#projects" 
              className="relative overflow-hidden px-6 py-3 min-h-[48px] bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span>Mes Apps Flutter</span> <ChevronRight size={18} />
            </a>

            <a
              href="#contact"
              className="px-6 py-3 min-h-[48px] bg-card border border-gray-700 text-white rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              <Mail size={18} /> Me Contacter
            </a>

            <a
              href="/assets/documents/Resume.pdf"
              download="Omar_Djebbi_CV.pdf"
              className="px-6 py-3 min-h-[48px] bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-semibold hover:bg-gray-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              <Download size={18} /> Télécharger CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};