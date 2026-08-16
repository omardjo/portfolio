import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicAvatarProps {
  imageSrc: string;
  altText: string;
}

export const HolographicAvatar: React.FC<HolographicAvatarProps> = ({ imageSrc, altText }) => {
  // 3D Mouse Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* 1. Multi-Layer Background Halo Breathing Glow */}
      <div className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-tr from-[#7C5CFF]/30 via-[#4CC9FF]/20 to-[#36E3FF]/25 blur-3xl animate-breathing-glow pointer-events-none -z-10 will-change-transform" />

      {/* 2. Outer Counter-Rotating Holographic Ring */}
      <div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-[#36E3FF]/25 border-dashed animate-spin-reverse-slow pointer-events-none -z-10 will-change-transform">
        <div className="absolute top-2 right-4 w-2.5 h-2.5 rounded-full bg-[#36E3FF] shadow-[0_0_10px_#36E3FF]" />
        <div className="absolute bottom-2 left-4 w-2.5 h-2.5 rounded-full bg-[#B17DFF] shadow-[0_0_10px_#B17DFF]" />
      </div>

      {/* 3. Inner Clockwise Rotating Energy Orbit */}
      <div className="absolute w-38 h-38 md:w-50 md:h-50 rounded-full border border-[#7C5CFF]/35 border-t-[#36E3FF] border-r-transparent animate-spin-slow pointer-events-none -z-10 will-change-transform">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#36E3FF] shadow-[0_0_12px_#36E3FF]" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#7C5CFF] shadow-[0_0_12px_#7C5CFF]" />
      </div>

      {/* 4. Interactive 3D Holographic Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-pointer group will-change-transform"
      >
        {/* Holographic Ring Edge */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-[3px] ring-[#36E3FF]/40 ring-offset-[6px] ring-offset-[#070a13] shadow-2xl shadow-[#7C5CFF]/25 transition-all duration-300 group-hover:ring-[#36E3FF] group-hover:shadow-[0_0_40px_rgba(54,227,255,0.45)]">
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            width={160}
            height={160}
          />

          {/* Holographic Light Reflection Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>

        {/* Online Status Indicator Dot */}
        <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 rounded-full border-[3px] border-[#070a13] shadow-lg shadow-emerald-500/50" />
      </motion.div>
    </div>
  );
};
