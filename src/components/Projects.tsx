import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Github, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { VideoModal } from './VideoModal';

interface ProjectsProps {
  featuredIds?: string[];
}

// Phone frame component
const PhoneFrame = ({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) => (
  <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-[22px] border border-white/[0.12] shadow-xl shadow-black/40 p-2 md:p-2.5 aspect-[9/19] w-full max-w-[220px] mx-auto">
    {/* Notch */}
    <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-14 h-[3.5px] bg-white/[0.15] rounded-full z-10" />
    <div className="w-full h-full rounded-[16px] overflow-hidden bg-black/40">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  </div>
);

const LandscapePhoneFrame = ({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) => (
  <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/70 rounded-[22px] border border-white/[0.12] shadow-xl shadow-black/40 p-2 md:p-2.5 aspect-[19/9] w-full max-w-[420px] mx-auto">
    <div className="absolute left-[7px] top-1/2 -translate-y-1/2 h-14 w-[3.5px] bg-white/[0.15] rounded-full z-10" />
    <div className="w-full h-full rounded-[16px] overflow-hidden bg-black/40">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  </div>
);

// PC / Laptop browser mockup frame
const PCFrame = ({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) => (
  <div className="relative w-full max-w-[520px] mx-auto">
    {/* Laptop screen */}
    <div className="bg-gradient-to-b from-gray-700/60 to-gray-800/70 rounded-t-lg border border-white/[0.12] border-b-0 shadow-xl shadow-black/40 p-[3px] pt-0">
      {/* Browser top bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/90 rounded-t-lg">
        <div className="flex gap-1.5">
          <div className="w-[9px] h-[9px] rounded-full bg-red-500/80" />
          <div className="w-[9px] h-[9px] rounded-full bg-yellow-500/80" />
          <div className="w-[9px] h-[9px] rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-gray-800/90 rounded-md px-3 py-0.5 text-[10px] text-gray-400 font-mono truncate border border-white/[0.04]">
            https://app.mavision.site
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div className="bg-black/60 overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
    </div>
    {/* Laptop base */}
    <div className="relative">
      <div className="mx-auto w-[110%] -ml-[5%] h-[14px] bg-gradient-to-b from-gray-600/40 to-gray-700/50 rounded-b-xl border border-t-0 border-white/[0.08]" />
      <div className="mx-auto w-[30%] h-[4px] bg-gray-600/40 rounded-b-md" />
    </div>
  </div>
);

// Generic frame renderer
const MockupFrame = ({
  src,
  alt,
  eager,
  mockupType,
  orientation = 'portrait',
}: {
  src: string;
  alt: string;
  eager?: boolean;
  mockupType?: 'phone' | 'pc';
  orientation?: 'portrait' | 'landscape';
}) => {
  if (mockupType === 'pc') return <PCFrame src={src} alt={alt} eager={eager} />;
  if (orientation === 'landscape') return <LandscapePhoneFrame src={src} alt={alt} eager={eager} />;
  return <PhoneFrame src={src} alt={alt} eager={eager} />;
};

// Multi-image screenshot grid
const ScreenshotGrid = ({
  images,
  alt,
  mockupType,
  landscapeImages = [],
}: {
  images: string[];
  alt: string;
  mockupType?: 'phone' | 'pc';
  landscapeImages?: string[];
}) => {
  const phoneColumns = images.length > 8 ? 'lg:grid-cols-6' : images.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4';

  return (
    <div
      className={
        mockupType === 'pc'
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'
          : `grid grid-cols-2 sm:grid-cols-3 ${phoneColumns} gap-3 md:gap-4 rounded-2xl border border-white/[0.08] bg-[#05070d]/60 p-3 md:p-4 shadow-inner shadow-black/40`
      }
    >
      {images.map((img, i) => {
        const isLandscape = landscapeImages.includes(img);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className={isLandscape && mockupType !== 'pc' ? 'col-span-2' : undefined}
          >
            <MockupFrame
              src={img}
              alt={`${alt} ${i + 1}`}
              eager={i === 0}
              mockupType={mockupType}
              orientation={isLandscape ? 'landscape' : 'portrait'}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ featuredIds }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState({ url: '', title: '' });

  const displayedProjects = featuredIds
    ? featuredIds
        .map((id) => PROJECTS.find((p) => p.id === id))
        .filter((project): project is (typeof PROJECTS)[number] => Boolean(project))
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
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            {featuredIds ? 'Featured Projects' : 'All Projects'}
          </motion.h2>
        </div>

        {/* Project cards */}
        <div className="space-y-10 md:space-y-14">
          {displayedProjects.map((project, index) => {
            const hasMultiImages = project.images && project.images.length > 1;
            const frameType = project.mockupType || 'phone';
            const glowClass =
              project.id === 'stripe'
                ? 'project-card-glow-emerald'
                : project.id === 'riwaq'
                ? 'project-card-glow-purple'
                : project.id === 'kidora'
                ? 'project-card-glow-cyan'
                : 'project-card-glow-blue';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className={`group relative glass-card rounded-2xl p-5 md:p-7 transition-all ${glowClass}`}
              >
                {/* Number overlay */}
                <div className="absolute top-5 left-5 w-9 h-9 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10 shadow-md">
                  <span className="text-white font-bold text-xs tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Adaptive mockup frame */}
                {hasMultiImages ? (
                  <div className="mb-6 mt-8">
                    <ScreenshotGrid
                      images={project.images!}
                      alt={project.title}
                      mockupType={frameType}
                      landscapeImages={project.landscapeImages}
                    />
                  </div>
                ) : (
                  <div className="mb-6 mt-8 flex justify-center">
                    <MockupFrame src={project.image} alt={project.title} mockupType={frameType} />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    {(project.period || project.type) && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.type && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
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
                          className="px-3.5 py-1 text-xs font-semibold text-primary/90 glass-pill rounded-full cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-slate-200 text-[15px] leading-relaxed mb-5 font-normal">
                      {project.fullDescription || project.description}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.videoUrl && (
                      <button
                        type="button"
                        onClick={() => openVideo(project.videoUrl!, project.title)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#F5F7FA] bg-[#7C5CFF]/20 hover:bg-[#7C5CFF]/35 border border-[#7C5CFF]/40 rounded-xl transition-all cursor-pointer active:scale-[0.97] shadow-md hover:shadow-[0_0_16px_rgba(124,92,255,0.4)] focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <PlayCircle size={16} className="text-[#36E3FF]" /> Demo
                      </button>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#F5F7FA] bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/35 rounded-xl transition-all cursor-pointer active:scale-[0.97] shadow-md hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] focus-visible:ring-2 focus-visible:ring-emerald-400"
                      >
                        <ExternalLink size={15} className="text-emerald-400" /> Play Store
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#F5F7FA] bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.18] rounded-xl transition-all cursor-pointer active:scale-[0.97] shadow-md hover:shadow-[0_0_16px_rgba(255,255,255,0.2)] focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <Github size={16} className="text-slate-200" /> Source Code
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
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-[15px] font-bold btn-secondary-glass rounded-xl active:scale-[0.97] cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
            >
              View All Projects <ArrowRight size={18} className="text-[#36E3FF]" />
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
