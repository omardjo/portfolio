import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ name, level, color }: { name: string, level: number, color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="font-semibold text-white text-sm">{name}</span>
      <span className={`text-${color}-400 text-xs font-bold`}>{level}%</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full bg-gradient-to-r ${color === 'blue' ? 'from-blue-500 to-cyan-500' : color === 'purple' ? 'from-purple-500 to-pink-500' : 'from-emerald-400 to-green-500'}`}
      />
    </div>
  </div>
);

export const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">About Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Profile Text */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Profile</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              Mobile developer specialized in Flutter and Node.js with 2+ years of experience.
              Designs, develops, and delivers highly performant and scalable applications
              for various clients, with particular emphasis on reliability and user experience.
            </p>
            <div className="w-full h-px bg-gray-700 mb-8" />
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Education</h3>
            <div>
              <h4 className="font-bold text-lg text-white">Computer Science Engineering</h4>
              <p className="text-accent mb-2">ESPRIT, Ariana, Tunis</p>
              <p className="text-gray-400 text-sm mb-2">Sep 2020 - Jul 2025</p>
              <p className="text-gray-300 text-sm">
                 Mastered core concepts of algorithms and data structures
                 essential for efficient problem-solving and software development.
              </p>
            </div>
          </motion.div>

          {/* Skills & Languages */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Technical Skills</h3>
              <SkillBar name="Flutter & Dart" level={95} color="blue" />
              <SkillBar name="Node.js & Backend" level={85} color="blue" />
              <SkillBar name="React Native" level={80} color="purple" />
              <SkillBar name="Databases & Cloud" level={65} color="green" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-indigo-400">Languages</h3>
              <div className="grid grid-cols-3 gap-4">
                 {[
                   { lang: 'Arabic', level: 'Native', flag: 'https://flagcdn.com/w80/tn.png' },
                   { lang: 'English', level: 'Professional', flag: 'https://flagcdn.com/w80/gb.png' },
                   { lang: 'French', level: 'Professional', flag: 'https://flagcdn.com/w80/fr.png' },
                 ].map((l) => (
                   <div key={l.lang} className="bg-gray-900/80 p-4 rounded-xl text-center border border-gray-700 hover:border-primary transition-colors">
                      <div className="w-12 h-8 mx-auto mb-2 overflow-hidden rounded shadow-sm">
                        <img src={l.flag} alt={`${l.lang} flag`} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-bold text-white text-sm">{l.lang}</div>
                      <div className="text-xs text-gray-400 mt-1">{l.level}</div>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};