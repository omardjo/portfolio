import React from 'react';
import { motion } from 'framer-motion';

const TunisiaFlag = () => (
  <svg viewBox="0 0 1200 800" className="w-full h-full object-cover">
    <rect width="1200" height="800" fill="#E70013" />
    <circle cx="600" cy="400" r="200" fill="#FFFFFF" />
    <circle cx="640" cy="400" r="150" fill="#E70013" />
    <circle cx="670" cy="400" r="120" fill="#FFFFFF" />
    <polygon
      points="620,400 660,412 636,380 636,420 660,388"
      fill="#E70013"
    />
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
    <clipPath id="uk-s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="uk-t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#uk-s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FranceFlag = () => (
  <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
    <rect width="1" height="2" fill="#002654" />
    <rect x="1" width="1" height="2" fill="#FFFFFF" />
    <rect x="2" width="1" height="2" fill="#CE1126" />
  </svg>
);

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
        <span className="text-sm font-medium text-gray-200">{name}</span>
        <span className="text-sm font-semibold text-primary">{level}%</span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden p-[1px]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${colors[color] || colors.primary} shadow-[0_0_10px_currentColor]`}
        />
      </div>
    </div>
  );
};

export const About: React.FC = () => {
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
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
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
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4 tracking-wide">Profil</h3>
              <p className="text-slate-200 leading-relaxed text-[15px] mb-5">
                Développeur mobile spécialisé <span className="text-primary font-semibold">Flutter & Dart</span> avec 2+ ans d'expérience.
                Je conçois, développe et livre des applications mobiles performantes et scalables
                avec un focus sur la fiabilité, l'UX et la qualité du code.
              </p>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 text-xs font-semibold text-primary glass-pill rounded-full cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4 tracking-wide">Formation</h3>
              <div>
                <h4 className="font-semibold text-white text-base">Ingénierie Informatique</h4>
                <p className="text-primary text-sm mt-1 font-medium">ESPRIT, Ariana, Tunis</p>
                <p className="text-gray-400 text-xs mt-1">Sep 2020 – Jul 2025</p>
                <p className="text-slate-200 text-sm mt-3 leading-relaxed">
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
              transition={{ duration: 0.35 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Technical Skills</h3>
              {skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-white mb-5 tracking-wide">Langues</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { lang: 'Arabe', level: 'Maternelle', FlagComponent: TunisiaFlag },
                  { lang: 'Anglais', level: 'Professionnel', FlagComponent: UKFlag },
                  { lang: 'Français', level: 'Professionnel', FlagComponent: FranceFlag },
                ].map(({ lang, level, FlagComponent }) => (
                  <div
                    key={lang}
                    className="bg-white/[0.03] border border-white/[0.08] hover:border-primary/40 p-4 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-7 mx-auto mb-2 overflow-hidden rounded shadow-sm">
                      <FlagComponent />
                    </div>
                    <div className="text-white text-sm font-semibold">{lang}</div>
                    <div className="text-gray-400 text-xs mt-1">{level}</div>
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