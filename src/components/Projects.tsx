// FLUTTER FOCUS: Projects section with Flutter branding + FIX MOBILE touch targets
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
    <section id="projects" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* FLUTTER FOCUS: Section title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gradient-animate">
            {featuredIds ? 'Mes Apps Flutter' : 'Tous les Projets'}
          </h2>
          {!featuredIds && (
            <p className="text-lg text-gray-400">
              Un showcase complet de mes travaux en développement mobile Flutter, applications web et solutions innovantes.
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative backdrop-blur-md rounded-2xl overflow-hidden hover-glow-border hover:-translate-y-2 flex flex-col border border-white/5 transition-all duration-300"
            >
              <div className="h-44 md:h-48 bg-gray-900 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-5 md:p-6 flex-grow flex flex-col relative z-10">
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${i % 2 === 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm flex-grow">
                  {project.description}
                </p>
                
                {/* FIX MOBILE: Buttons with proper touch targets */}
                <div className="mt-auto flex gap-3 flex-wrap">
                  {project.videoUrl && (
                    <button 
                      onClick={() => openVideo(project.videoUrl!, project.title)}
                      className="inline-flex items-center min-h-[44px] px-3 py-2 text-primary hover:text-white hover:bg-primary/20 rounded-lg transition-all text-sm font-semibold gap-1.5 active:scale-95 cursor-pointer"
                      style={{ touchAction: 'manipulation' }}
                    >
                      Démo <PlayCircle size={16} />
                    </button>
                  )}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[44px] px-3 py-2 text-green-400 hover:text-white hover:bg-green-500/20 rounded-lg transition-all text-sm font-semibold gap-1.5 active:scale-95 cursor-pointer"
                      style={{ touchAction: 'manipulation' }}
                    >
                      Play Store <ExternalLink size={14} />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[44px] px-3 py-2 text-accent hover:text-white hover:bg-accent/20 rounded-lg transition-all text-sm font-semibold gap-1.5 ml-auto active:scale-95 cursor-pointer"
                      style={{ touchAction: 'manipulation' }}
                    >
                      GitHub <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {featuredIds && (
          <div className="text-center mt-10 md:mt-12">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-8 py-3 min-h-[48px] border border-primary/30 bg-primary/10 text-primary rounded-full font-semibold hover:bg-primary/20 hover:border-primary transition-all backdrop-blur-md active:scale-95 cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              Voir Tous les Projets <ArrowRight size={20} />
            </Link>
          </div>
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