// About section - Clean premium design
import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => {
  const colors: Record<string, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-sm font-semibold text-gray-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color] || colors.primary}`}
        />
      </div>
    </div>
  );
};

export const About = () => {
  const skills = [
    { name: 'Flutter & Dart', level: 95, color: 'primary' },
    { name: 'Firebase & Cloud', level: 88, color: 'orange' },
    { name: 'State Management (Provider)', level: 85, color: 'secondary' },
    { name: 'Node.js & Backend', level: 80, color: 'accent' },
    { name: 'React & Web', level: 75, color: 'emerald' },
  ];

  const techStack = ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Bloc', 'REST API', 'Node.js', 'Git'];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            About Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Know Me Better
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Profile / bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4">Profil</h3>
              <p className="text-gray-400 leading-relaxed text-[15px] mb-5">
                Développeur mobile spécialisé <span className="text-primary font-medium">Flutter & Dart</span> avec 2+ ans d'expérience.
                Je conçois, développe et livre des applications mobiles performantes et scalables
                avec un focus sur la fiabilité, l'UX et la qualité du code.
              </p>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {techStack.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/[0.08] border border-primary/[0.12] rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4">Formation</h3>
              <div>
                <h4 className="font-semibold text-white">Ingénierie Informatique</h4>
                <p className="text-primary text-sm mt-1">ESPRIT, Ariana, Tunis</p>
                <p className="text-gray-500 text-sm mt-1">Sep 2020 – Jul 2025</p>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Maîtrise des concepts fondamentaux d'algorithmes et structures de données,
                  essentiels pour la résolution efficace de problèmes et le développement logiciel.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills & Languages */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-white mb-6">Technical Skills</h3>
              {skills.map(s => (
                <SkillBar key={s.name} {...s} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-white mb-5">Langues</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { lang: 'Arabe', level: 'Maternelle', flag: 'https://flagcdn.com/w80/tn.png' },
                  { lang: 'Anglais', level: 'Professionnel', flag: 'https://flagcdn.com/w80/gb.png' },
                  { lang: 'Français', level: 'Professionnel', flag: 'https://flagcdn.com/w80/fr.png' },
                ].map(l => (
                  <div
                    key={l.lang}
                    className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl text-center hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-7 mx-auto mb-2 overflow-hidden rounded shadow-sm">
                      <img src={l.flag} alt={l.lang} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="text-white text-sm font-medium">{l.lang}</div>
                    <div className="text-gray-500 text-xs mt-1">{l.level}</div>
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