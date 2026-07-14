import React from 'react';

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#090d16]">
      {/* Subtle Atmospheric Cosmic Nebula Layers */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[140px]" />
      <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] bg-violet-900/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[5%] left-[25%] w-[550px] h-[550px] bg-cyan-900/10 rounded-full blur-[160px]" />

      {/* Deep Multi-Layer Parallax Starfield (~105 naturally distributed stars) */}
      <div className="stars-distant" />
      <div className="stars-mid" />
      <div className="stars-near" />

      {/* Periodic Shooting Star Effect */}
      <div className="shooting-star" />
    </div>
  );
};