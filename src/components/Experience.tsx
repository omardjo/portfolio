import React from 'react';
import { EXPERIENCES } from '../constants';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ExperienceProps {
  limit?: number;
}

export const Experience: React.FC<ExperienceProps> = ({ limit }) => {
  const displayedExp = limit ? EXPERIENCES.slice(0, limit) : EXPERIENCES;

  return (
    <section id="experience" className="py-20 bg-dark/30 relative">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              {limit ? 'Recent Experience' : 'Professional Journey'}
            </span>
          </h2>
          {!limit && (
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              A detailed timeline of my development career, projects, and internships.
            </p>
          )}
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 border-l-2 border-gray-700 space-y-12">
             {displayedExp.map((exp, index) => (
               <motion.div 
                 key={exp.id}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="relative group"
               >
                 {/* Timeline Dot */}
                 <div 
                   className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 bg-dark transition-colors duration-300 z-10 border-${exp.color === 'primary' ? 'primary' : exp.color === 'secondary' ? 'secondary' : 'accent'} group-hover:border-white`} 
                 />
                 
                 {/* UPDATED: Card with Hover Glow */}
                 <div className={`relative backdrop-blur-md rounded-2xl p-6 border border-white/5 hover-glow-border transition-all duration-300 hover:-translate-x-[-5px]`}>
                    <div className="relative z-10"> {/* Content Container */}
                      <span className={`inline-block px-3 py-1 bg-${exp.color}/20 text-${exp.color} rounded-full text-xs font-semibold mb-3`}>
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-bold mb-1 text-white">{exp.role}</h3>
                      <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                      <ul className="space-y-2">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 text-${exp.color}`} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>

          {limit && (
            <div className="text-center mt-12">
              <Link to="/experience" className="inline-flex items-center gap-2 px-8 py-3 border border-gray-700 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-all">
                View Full Career History <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};