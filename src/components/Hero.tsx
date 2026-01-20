import React from 'react';
import { motion } from 'framer-motion';
import { Code, Download, ChevronRight, Mail } from 'lucide-react';

export const Hero = () => {
  const typingText = "Mobile Developer | Flutter & Node.js Expert";

  return (
    // Reduced top/bottom padding from py-20 to py-12 for a more compact layout
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden py-12">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Image with Glow - Reduced size and margin */}
          <div className="relative w-32 h-32 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-glow opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
            <img
              src="/assets/images/myPhoto.jpg"
              alt="Omar Djebbi"
              className="relative w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl z-10"
              loading="eager"
            />
          </div>

          {/* Badge - Reduced margin */}
          <div className="inline-flex items-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl mb-4 shadow-lg backdrop-blur-sm">
            <Code className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Full Stack Developer</span>
          </div>

          {/* Shimmering Gradient Text - Slightly smaller font size */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient-animate pb-2">
            Omar Djebbi
          </h1>

          {/* Typewriter Animation - Reduced height and font size */}
          <div className="h-8 mb-6 flex justify-center items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 3.5, ease: "linear" }}
              className="overflow-hidden whitespace-nowrap border-r-4 border-primary pr-2"
            >
              <p className="text-lg md:text-xl text-gray-300 font-light">
                {typingText}
              </p>
            </motion.div>
          </div>

          {/* Description - Reduced margin */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Crafting highly performant and scalable applications.
            Specializing in cross-platform mobile development and robust backend architectures.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Buttons - Slightly reduced padding */}
            <a href="#projects" className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 group">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span>View Projects</span> <ChevronRight size={18} />
            </a>

            <a
              href="#contact"
              className="px-6 py-2.5 bg-card border border-gray-700 text-white rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Mail size={18} /> Get In Touch
            </a>

            <a
              href="/assets/documents/Resume.pdf"
              download="Resume.pdf"
              className="px-6 py-2.5 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-semibold hover:bg-gray-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Download size={18} /> Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};