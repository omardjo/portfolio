// Projects section - Numbered cards inspired by rafsan-theta
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Github, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { VideoModal } from './VideoModal';

interface ProjectsProps {
  featuredIds?: string[];
}

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
        <div className="space-y-8 md:space-y-10">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-7 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 md:h-64 rounded-xl overflow-hidden bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  loading="lazy"
                />
                {/* Number overlay */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between py-1">
                <div>
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
                    {project.description}
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
          ))}
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