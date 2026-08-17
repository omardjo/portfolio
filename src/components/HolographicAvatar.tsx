import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicAvatarProps {
  imageSrc?: string;
  altText?: string;
}

export const HolographicAvatar: React.FC<HolographicAvatarProps> = ({
  imageSrc = '/assets/images/myPhoto.webp',
  altText = 'Omar Djebbi',
}) => {
  const [canHover, setCanHover] = useState(false);

  // 3D Mouse Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex items-center justify-center p-3 sm:p-4">
      {/* 1. Multi-Layer Background Halo Breathing Glow */}
      <div className="absolute w-44 h-44 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-tr from-[#7C5CFF]/25 via-[#4CC9FF]/15 to-[#36E3FF]/20 blur-2xl md:blur-3xl animate-breathing-glow pointer-events-none -z-10 will-change-transform" />

      {/* 2. Outer Counter-Rotating Holographic Ring */}
      <div className="absolute w-40 h-40 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full border border-[#36E3FF]/20 md:border-[#36E3FF]/25 border-dashed animate-spin-reverse-slow pointer-events-none -z-10 will-change-transform">
        <div className="absolute top-2 right-4 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#36E3FF] shadow-[0_0_8px_#36E3FF]" />
        <div className="absolute bottom-2 left-4 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#B17DFF] shadow-[0_0_8px_#B17DFF]" />
      </div>

      {/* 3. Inner Clockwise Rotating Energy Orbit */}
      <div className="absolute w-34 h-34 sm:w-38 sm:h-38 md:w-50 md:h-50 rounded-full border border-[#7C5CFF]/30 md:border-[#7C5CFF]/35 border-t-[#36E3FF] border-r-transparent animate-spin-slow pointer-events-none -z-10 will-change-transform">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#36E3FF] shadow-[0_0_10px_#36E3FF]" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#7C5CFF] shadow-[0_0_10px_#7C5CFF]" />
      </div>

      {/* 4. Interactive 3D Holographic Container */}
      <motion.div
        onMouseMove={canHover ? handleMouseMove : undefined}
        onMouseLeave={canHover ? handleMouseLeave : undefined}
        style={
          canHover
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        className="relative cursor-pointer group will-change-transform"
      >
        {/* Holographic Ring Edge */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-[3px] ring-[#36E3FF]/40 ring-offset-[4px] sm:ring-offset-[6px] ring-offset-[#070a13] shadow-xl md:shadow-2xl shadow-[#7C5CFF]/20 md:shadow-[#7C5CFF]/25 transition-all duration-300 group-hover:ring-[#36E3FF] group-hover:shadow-[0_0_40px_rgba(54,227,255,0.45)]">
          <picture>
            <source srcSet="/assets/images/myPhoto.webp" type="image/webp" />
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              decoding="async"
              // @ts-expect-error React 18 fetchPriority support
              fetchpriority="high"
              width={160}
              height={160}
            />
          </picture>

          {/* Holographic Light Reflection Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>

        {/* Online Status Indicator Dot */}
        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-emerald-500 rounded-full border-[2.5px] sm:border-[3px] border-[#070a13] shadow-md sm:shadow-lg shadow-emerald-500/50" />
      </motion.div>
    </div>
  );
};
