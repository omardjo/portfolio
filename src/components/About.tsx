// FLUTTER FOCUS: About section with Flutter-first skills
import React from 'react';
import { motion } from 'framer-motion';

const colorVariants: Record<string, { text: string; gradient: string }> = {
  blue: { text: 'text-blue-400', gradient: 'from-blue-500 to-cyan-500' },
  purple: { text: 'text-purple-400', gradient: 'from-purple-500 to-pink-500' },
  green: { text: 'text-emerald-400', gradient: 'from-emerald-400 to-green-500' },
  orange: { text: 'text-orange-400', gradient: 'from-orange-400 to-amber-500' }
};

const SkillBar = ({ name, level, color }: { name: string, level: number, color: string }) => {
  const variant = colorVariants[color] || colorVariants.blue;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-white text-sm">{name}</span>
        <span className={`${variant.text} text-xs font-bold`}>{level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${variant.gradient}`}
        />
      </div>
    </div>
  );
};

// FLUTTER FOCUS: Skill tags for quick visual
const SkillTag = ({ name }: { name: string }) => (
  <span className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold">
    {name}
  </span>
);

export const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">À Propos</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Profile Text */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-xl"
          >
            {/* FLUTTER FOCUS: Profile description */}
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">Profil</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Développeur mobile spécialisé <strong className="text-primary">Flutter & Dart</strong> avec 2+ ans d'expérience.
              Je conçois, développe et livre des applications mobiles performantes et scalables
              avec un focus sur la fiabilité, l'UX et la qualité du code.
            </p>
            
            {/* FLUTTER FOCUS: Key tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Bloc', 'REST API', 'Node.js', 'Git'].map(skill => (
                <SkillTag key={skill} name={skill} />
              ))}
            </div>

            <div className="w-full h-px bg-gray-700 mb-6" />
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">Formation</h3>
            <div>
              <h4 className="font-bold text-lg text-white">Ingénierie Informatique</h4>
              <p className="text-accent mb-2">ESPRIT, Ariana, Tunis</p>
              <p className="text-gray-400 text-sm mb-2">Sep 2020 - Jul 2025</p>
              <p className="text-gray-300 text-sm">
                 Maîtrise des concepts fondamentaux d'algorithmes et structures de données,
                 essentiels pour la résolution efficace de problèmes et le développement logiciel.
              </p>
            </div>
          </motion.div>

          {/* Skills & Languages */}
          <div className="space-y-6 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-xl"
            >
              {/* FLUTTER FOCUS: Skills with Flutter first */}
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-cyan-400">Compétences Techniques</h3>
              <SkillBar name="Flutter & Dart" level={95} color="blue" />
              <SkillBar name="Firebase & Cloud" level={88} color="orange" />
              <SkillBar name="State Management (Riverpod/Bloc)" level={85} color="purple" />
              <SkillBar name="Node.js & Backend" level={80} color="blue" />
              <SkillBar name="React & Web" level={75} color="green" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-xl"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-indigo-400">Langues</h3>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                 {[
                   { lang: 'Arabe', level: 'Maternelle', flag: 'https://flagcdn.com/w80/tn.png' },
                   { lang: 'Anglais', level: 'Professionnel', flag: 'https://flagcdn.com/w80/gb.png' },
                   { lang: 'Français', level: 'Professionnel', flag: 'https://flagcdn.com/w80/fr.png' },
                 ].map((l) => (
                   <div key={l.lang} className="bg-gray-900/80 p-3 md:p-4 rounded-xl text-center border border-gray-700 hover:border-primary transition-colors">
                      <div className="w-10 h-7 md:w-12 md:h-8 mx-auto mb-2 overflow-hidden rounded shadow-sm">
                        <img src={l.flag} alt={`Drapeau ${l.lang}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="font-bold text-white text-xs md:text-sm">{l.lang}</div>
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