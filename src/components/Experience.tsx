// Experience section - clean premium design
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
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {limit ? 'Experience' : 'Full Career Timeline'}
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-6 md:pl-8 border-l border-white/[0.08] space-y-8 md:space-y-10">
            {displayedExp.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[29px] md:-left-[37px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-[3px] border-primary bg-[#0b1121] group-hover:border-white transition-colors z-10" />

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-7 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-primary/[0.08] text-primary border border-primary/[0.12] rounded-full text-xs font-medium mb-3">
                    {exp.period}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-gray-500 font-medium mb-4 text-sm">{exp.company}</p>
                  <ul className="space-y-2.5">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-primary/60" />
                        {detail}
                      </li>
                    ))}
                  </ul>
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
                className="inline-flex items-center gap-2 px-7 py-3 text-[15px] font-semibold text-gray-300 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] rounded-xl transition-all active:scale-[0.97] cursor-pointer"
              >
                View Full Timeline <ArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};