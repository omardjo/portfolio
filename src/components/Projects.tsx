// Projects section - Numbered cards inspired by rafsan-theta
// AJOUT PROJET TICK8ING - avec carousel d'images
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Github, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { VideoModal } from './VideoModal';

interface ProjectsProps {
  featuredIds?: string[];
}

// FIX SCREENSHOTS FULL DISPLAY - Phone frame component
// Shows full phone screenshot with contain + subtle device frame
const PhoneFrame = ({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) => (
  <div className="relative bg-gradient-to-b from-gray-800/40 to-gray-900/60 rounded-[20px] border border-white/[0.08] shadow-xl shadow-black/30 p-2 md:p-2.5 aspect-[9/19] w-full max-w-[220px] mx-auto">
    {/* Notch / status bar hint */}
    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-16 h-[4px] bg-white/[0.06] rounded-full z-10" />
    <div className="w-full h-full rounded-[14px] overflow-hidden bg-black/40">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  </div>
);

// PC / Laptop browser mockup frame for web & desktop apps
const PCFrame = ({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) => (
  <div className="relative w-full max-w-[520px] mx-auto">
    {/* Laptop screen */}
    <div className="bg-gradient-to-b from-gray-700/50 to-gray-800/60 rounded-t-lg border border-white/[0.08] border-b-0 shadow-xl shadow-black/30 p-[3px] pt-0">
      {/* Browser top bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 rounded-t-lg">
        <div className="flex gap-1.5">
          <div className="w-[10px] h-[10px] rounded-full bg-red-500/80" />
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-500/80" />
          <div className="w-[10px] h-[10px] rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-gray-800/90 rounded-md px-3 py-1 text-[10px] text-gray-500 font-mono truncate border border-white/[0.04]">
            https://app.example.com
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div className="bg-black/50 overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
    </div>
    {/* Laptop base / hinge */}
    <div className="relative">
      <div className="mx-auto w-[110%] -ml-[5%] h-[14px] bg-gradient-to-b from-gray-600/40 to-gray-700/50 rounded-b-xl border border-t-0 border-white/[0.06]" />
      <div className="mx-auto w-[30%] h-[4px] bg-gray-600/30 rounded-b-md" />
    </div>
  </div>
);

// Generic frame renderer — picks Phone or PC based on mockupType
const MockupFrame = ({ src, alt, eager, mockupType }: { src: string; alt: string; eager?: boolean; mockupType?: 'phone' | 'pc' }) => {
  if (mockupType === 'pc') return <PCFrame src={src} alt={alt} eager={eager} />;
  return <PhoneFrame src={src} alt={alt} eager={eager} />;
};

// FIX SCREENSHOTS FULL DISPLAY - Image carousel with adaptive frames
const ImageCarousel = ({ images, alt, mockupType }: { images: string[]; alt: string; mockupType?: 'phone' | 'pc' }) => {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(c => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(c => (c + 1) % images.length);
  };

  return (
    <div className="relative group/carousel">
      {/* Adaptive frame with full screenshot */}
      <div className="flex justify-center py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <MockupFrame
              src={images[current]}
              alt={`${alt} ${current + 1}`}
              eager={current === 0}
              mockupType={mockupType}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-primary/80 cursor-pointer active:scale-90 z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-primary/80 cursor-pointer active:scale-90 z-10"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-3">
          <div className="flex gap-1.5 bg-white/[0.04] backdrop-blur-sm rounded-full px-3 py-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? 'bg-primary w-5 h-2' : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image counter badge */}
      <div className="absolute top-1 right-1 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs text-white/80 font-medium z-10">
        {current + 1}/{images.length}
      </div>
    </div>
  );
};

// FIX SCREENSHOTS FULL DISPLAY - Grid of frames for multi-image projects
const ScreenshotGrid = ({ images, alt, mockupType }: { images: string[]; alt: string; mockupType?: 'phone' | 'pc' }) => (
  <div className={mockupType === 'pc'
    ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'
    : 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'
  }>
    {images.map((img, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08, duration: 0.4 }}
      >
        <MockupFrame src={img} alt={`${alt} ${i + 1}`} eager={i === 0} mockupType={mockupType} />
      </motion.div>
    ))}
  </div>
);

export const Projects: React.FC<ProjectsProps> = ({ featuredIds }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState({ url: '', title: '' });

  const displayedProjects = featuredIds 
    ? PROJECTS.filter(p => featuredIds.includes(p.id))
    : PROJECTS;

  const openVideo = (url: string, title: string) => {
    setActiveVideo({ url, title });
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {featuredIds ? 'Featured Projects' : 'All Projects'}
          </motion.h2>
        </div>

        {/* Project cards */}
        <div className="space-y-10 md:space-y-14">
          {displayedProjects.map((project, index) => {
            const hasMultiImages = project.images && project.images.length > 1;
            const frameType = project.mockupType || 'phone';
            
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-7 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Number overlay */}
              <div className="absolute top-5 left-5 w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <span className="text-white font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* FIX SCREENSHOTS FULL DISPLAY - Adaptive mockup frame per project */}
              {hasMultiImages ? (
                <div className="mb-6 mt-8">
                  <ScreenshotGrid images={project.images!} alt={project.title} mockupType={frameType} />
                </div>
              ) : (
                <div className="mb-6 mt-8 flex justify-center">
                  <MockupFrame src={project.image} alt={project.title} mockupType={frameType} />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col justify-between py-1">
                <div>
                  {/* AJOUT PROJET TICK8ING - Badge freelance + period */}
                  {(project.period || project.type) && (
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {project.type && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 rounded-full">
                          <MapPin size={11} />
                          {project.type}
                        </span>
                      )}
                      {project.period && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] rounded-full">
                          <Calendar size={11} />
                          {project.period}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-primary/90 bg-primary/[0.08] border border-primary/[0.12] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-[15px] leading-relaxed mb-5">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  {project.videoUrl && (
                    <button 
                      onClick={() => openVideo(project.videoUrl!, project.title)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary/20 hover:bg-primary/30 border border-primary/20 rounded-lg transition-all cursor-pointer active:scale-[0.97]"
                    >
                      <PlayCircle size={16} /> Demo
                    </button>
                  )}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/15 rounded-lg transition-all cursor-pointer active:scale-[0.97]"
                    >
                      <ExternalLink size={14} /> Play Store
                    </a>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg transition-all cursor-pointer active:scale-[0.97]"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {featuredIds && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-14"
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-7 py-3 text-[15px] font-semibold text-primary border border-primary/20 bg-primary/[0.06] hover:bg-primary/[0.12] rounded-xl transition-all active:scale-[0.97] cursor-pointer"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>

      <VideoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        videoUrl={activeVideo.url}
        title={activeVideo.title}
      />
    </section>
  );
};