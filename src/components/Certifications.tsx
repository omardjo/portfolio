import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Layers, Briefcase, Box, Globe, Database, Layout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CERTIFICATES } from '../constants';

interface CertProps {
  limit?: number;
}

const iconMap: any = {
  smartphone: Smartphone,
  layers: Layers,
  briefcase: Briefcase,
  box: Box,
  globe: Globe,
  database: Database,
  layout: Layout
};

export const Certifications: React.FC<CertProps> = ({ limit }) => {
  const displayedCerts = limit ? CERTIFICATES.slice(0, limit) : CERTIFICATES;

  return (
    <section id="certifications" className="py-20 relative">
      {!limit && (
         <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl animate-float pointer-events-none" />
      )}
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {limit ? 'Recent Certifications' : 'Professional Certifications'}
          </h2>
          {!limit && (
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A showcase of my continuous learning journey in mobile development, web technologies, and data engineering.
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCerts.map((cert, index) => {
            const Icon = iconMap[cert.icon] || Globe;
            const isHex = cert.color.startsWith('#');
            
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // UPDATED: Used hover-glow-border class for better readability
                className="group relative backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-white/10 hover-glow-border transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${!isHex ? `bg-${cert.color}/20 text-${cert.color}` : ''}`}
                       style={isHex ? { backgroundColor: `${cert.color}33`, color: cert.color } : {}}
                  >
                    <Icon size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${!isHex ? `bg-${cert.color}/10 text-${cert.color}` : ''}`}
                        style={isHex ? { backgroundColor: `${cert.color}1a`, color: cert.color } : {}}
                  >
                    {cert.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white relative z-10">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow relative z-10">
                  {cert.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-700/50 relative z-10">
                  <a 
                    href={cert.pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 text-sm font-semibold text-white py-2 px-4 rounded-lg transition-colors w-full ${!isHex ? `bg-${cert.color} hover:bg-${cert.color}/80` : ''}`}
                    style={isHex ? { backgroundColor: cert.color } : {}}
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {limit && (
          <div className="text-center mt-12">
            <Link to="/certificates" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-lg hover:shadow-primary/50 transition-all">
              View All Certificates <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};