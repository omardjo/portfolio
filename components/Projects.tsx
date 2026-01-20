import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Github, ArrowRight } from 'lucide-react';
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
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-animate">
            {featuredIds ? 'Featured Projects' : 'All Projects'}
          </h2>
          {!featuredIds && (
            <p className="text-xl text-gray-400">
              A comprehensive showcase of my work in mobile development, web applications, and innovative solutions.
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // FIX: Removed 'bg-card/30'. The 'hover-glow-border' class now handles the background.
              className="group relative backdrop-blur-md rounded-2xl overflow-hidden hover-glow-border hover:-translate-y-2 flex flex-col border border-white/5"
            >
              <div className="h-48 bg-gray-900 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex-grow flex flex-col relative z-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span key={tag} className={`px-3 py-1 rounded-full text-xs font-semibold border ${i % 2 === 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm flex-grow">
                  {project.description}
                </p>
                
                <div className="mt-auto flex gap-4">
                  {project.videoUrl && (
                    <button 
                      onClick={() => openVideo(project.videoUrl!, project.title)}
                      className="inline-flex items-center text-primary hover:text-white transition-colors text-sm font-semibold gap-1"
                    >
                      Watch Demo <PlayCircle size={16} />
                    </button>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent hover:text-white transition-colors text-sm font-semibold gap-1 ml-auto"
                    >
                      View Code <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {featuredIds && (
          <div className="text-center mt-12">
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3 border border-primary/30 bg-primary/10 text-primary rounded-full font-semibold hover:bg-primary/20 hover:border-primary transition-all backdrop-blur-md">
              View All Projects <ArrowRight size={20} />
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