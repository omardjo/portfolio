// Certifications - clean premium design
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
    <section id="certifications" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Credentials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {limit ? 'Certifications' : 'All Certifications'}
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayedCerts.map((cert, index) => {
            const Icon = iconMap[cert.icon] || Globe;
            const accentColor = cert.color.startsWith('#') ? cert.color : '#6366f1';

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
                  >
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-gray-500 text-sm mb-5 flex-grow leading-relaxed">{cert.description}</p>

                <a
                  href={cert.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-white py-2.5 px-4 rounded-lg transition-all w-full active:scale-[0.97] cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  <Download size={14} /> Download
                </a>
              </motion.div>
            );
          })}
        </div>

        {limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-14"
          >
            <Link
              to="/certificates"
              className="inline-flex items-center gap-2 px-7 py-3 text-[15px] font-semibold text-primary border border-primary/20 bg-primary/[0.06] hover:bg-primary/[0.12] rounded-xl transition-all active:scale-[0.97] cursor-pointer"
            >
              View All Certifications <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};