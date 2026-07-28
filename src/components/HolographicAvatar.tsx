import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicAvatarProps {
  imageSrc: string;
  altText: string;
}

export const HolographicAvatar: React.FC<HolographicAvatarProps> = ({ imageSrc, altText }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Mouse Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* 1. Multi-Layer Background Halo Breathing Glow */}
      <div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-primary/30 via-violet-600/20 to-cyan-400/25 blur-3xl animate-breathing-glow pointer-events-none -z-10" />

      {/* 2. Primary Outer Counter-Rotating Holographic Energy Ring */}
      <div className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-cyan-500/20 border-dashed animate-spin-reverse-slow pointer-events-none -z-10" />

      {/* 3. Secondary Inner Clockwise Rotating Energy Orbit with Light Nodes */}
      <div className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full border border-primary/30 border-t-primary border-r-transparent animate-spin-slow pointer-events-none -z-10">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#6366f1]" />
      </div>

      {/* 4. Interactive 3D Holographic Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-pointer group"
      >
        {/* Holographic Ring Edge */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-[3px] ring-primary/30 ring-offset-[6px] ring-offset-[#070a13] shadow-2xl shadow-primary/25 transition-all duration-300 group-hover:ring-cyan-400/50 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]">
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />

          {/* Holographic Light Reflection Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>

        {/* Online Status Indicator Dot */}
        <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-[#070a13] shadow-lg shadow-emerald-500/40" />
      </motion.div>
    </div>
  );
};
