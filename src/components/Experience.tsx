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
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-5xl relative z-10">
        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Career
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            {limit ? 'Experience' : 'Full Career Timeline'}
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-6 md:pl-8 border-l border-white/[0.1] space-y-8 md:space-y-10">
            {displayedExp.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[29px] md:-left-[37px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-[3px] border-primary bg-[#070a13] group-hover:border-[#36E3FF] group-hover:shadow-[0_0_12px_#36E3FF] transition-all z-10" />

                <div className="glass-card rounded-2xl p-5 md:p-7">
                  <span className="inline-block px-3.5 py-1 glass-pill text-primary rounded-full text-xs font-semibold mb-3">
                    {exp.period}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <p className={`text-gray-400 font-medium text-sm ${exp.details.length ? 'mb-4' : ''}`}>
                    {exp.company}
                  </p>
                  {exp.details.length > 0 && (
                    <ul className="space-y-2.5">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed font-normal">
                          <CheckCircle size={14} className="flex-shrink-0 mt-1 text-primary/90" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {limit && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12 md:mt-14"
            >
              <Link
                to="/experience"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 text-[15px] font-bold btn-secondary-glass rounded-xl active:scale-[0.97] cursor-pointer"
              >
                View Full Timeline <ArrowRight size={18} className="text-[#36E3FF]" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
