import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number; // depth tier: 1 (far), 2 (mid), 3 (close)
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  decay: number;
  tailParticles: { x: number; y: number; alpha: number; size: number }[];
}

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse & scroll tracking with smooth inertia (lerp)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize 2500+ Stars naturally distributed
    const starColors = [
      '#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc', 
      '#67e8f9', '#f472b6', '#e9d5ff', '#38bdf8'
    ];

    const starCount = Math.min(Math.floor((width * height) / 450), 3200);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const z = Math.random() < 0.65 ? 1 : Math.random() < 0.88 ? 2 : 3;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 3, // span long vertical height for smooth scroll
        z,
        size: z === 1 ? Math.random() * 0.9 + 0.4 : z === 2 ? Math.random() * 1.4 + 0.9 : Math.random() * 2.2 + 1.2,
        baseAlpha: z === 1 ? Math.random() * 0.4 + 0.2 : z === 2 ? Math.random() * 0.5 + 0.4 : Math.random() * 0.3 + 0.7,
        alpha: 0.5,
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    // Initialize Cosmic Dust Particles
    const dustCount = Math.min(Math.floor(width / 14), 110);
    const dustParticles: DustParticle[] = [];

    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2 - 0.08,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, '
      });
    }

    // Comets / Shooting Stars System (Occurs every 20-40s)
    let lastCometTime = Date.now();
    let cometInterval = 20000 + Math.random() * 15000;
    const comets: Comet[] = [];

    const triggerComet = () => {
      const startX = Math.random() * width * 1.2 - width * 0.1;
      const startY = Math.random() * (height * 0.4);
      comets.push({
        x: startX,
        y: startY,
        length: 140 + Math.random() * 100,
        speed: 12 + Math.random() * 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg diagonal
        alpha: 1,
        active: true,
        decay: 0.015,
        tailParticles: []
      });
    };

    // Trigger initial comet after 3s
    setTimeout(triggerComet, 3000);

    // Tab visibility handling to pause canvas when hidden
    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Main Render Loop (Target 60 FPS)
    let time = 0;

    const render = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.01;

      // Mouse Smooth Lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // 1. Clear background with deep space dark tone
      ctx.fillStyle = '#070a13';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Multi-Layer Volumetric Nebula Clouds
      const scrollOffset = scrollY * 0.15;
      
      // Nebula Blob 1: Deep Indigo / Purple (Top Left)
      const g1 = ctx.createRadialGradient(
        width * 0.2 + mouseX * 1.5,
        height * 0.2 - scrollOffset * 0.5 + Math.sin(time * 0.5) * 30,
        50,
        width * 0.2 + mouseX * 1.5,
        height * 0.2 - scrollOffset * 0.5,
        width * 0.55
      );
      g1.addColorStop(0, 'rgba(76, 29, 149, 0.24)');
      g1.addColorStop(0.5, 'rgba(88, 28, 135, 0.12)');
      g1.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Nebula Blob 2: Vibrant Cyan / Teal (Bottom Right)
      const g2 = ctx.createRadialGradient(
        width * 0.8 + mouseX * 2,
        height * 0.7 - scrollOffset * 0.3 + Math.cos(time * 0.4) * 40,
        40,
        width * 0.8 + mouseX * 2,
        height * 0.7 - scrollOffset * 0.3,
        width * 0.5
      );
      g2.addColorStop(0, 'rgba(14, 116, 144, 0.20)');
      g2.addColorStop(0.6, 'rgba(30, 27, 75, 0.10)');
      g2.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Nebula Blob 3: Cosmic Magenta / Pink Glow (Center Ambient)
      const g3 = ctx.createRadialGradient(
        width * 0.5 - mouseX * 1.2,
        height * 0.45 - scrollOffset * 0.4 + Math.sin(time * 0.3) * 25,
        30,
        width * 0.5 - mouseX * 1.2,
        height * 0.45 - scrollOffset * 0.4,
        width * 0.42
      );
      g3.addColorStop(0, 'rgba(131, 24, 67, 0.14)');
      g3.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
      g3.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Stars with Differential Parallax & Twinkle
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle logic
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.25 * star.baseAlpha;
        } else {
          star.alpha = star.baseAlpha;
        }

        // Compute mouse parallax multiplier by depth z
        const parallaxFactor = star.z * 0.8;
        const starYRelative = (star.y - scrollY * (0.05 * star.z)) % (height * 1.5);
        const drawY = (starYRelative < 0 ? starYRelative + height * 1.5 : starYRelative) - (height * 0.25);
        const drawX = star.x + mouseX * parallaxFactor;

        // Skip offscreen
        if (drawY < -10 || drawY > height + 10 || drawX < -10 || drawX > width + 10) continue;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross diffraction sparkle on large foreground stars (z === 3)
        if (star.z === 3 && star.alpha > 0.75) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(drawX - star.size * 2.2, drawY);
          ctx.lineTo(drawX + star.size * 2.2, drawY);
          ctx.moveTo(drawX, drawY - star.size * 2.2);
          ctx.lineTo(drawX, drawY + star.size * 2.2);
          ctx.stroke();
        }
      }

      // 4. Render Cosmic Dust Particles
      ctx.globalAlpha = 1;
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx + mouseX * 0.01;
          p.y += p.vy - scrollY * 0.0003;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Render Comets / Shooting Stars System
      const now = Date.now();
      if (!prefersReducedMotion && now - lastCometTime > cometInterval) {
        triggerComet();
        lastCometTime = now;
        cometInterval = 20000 + Math.random() * 20000; // Next comet in 20-40s
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        if (!c.active) continue;

        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;
        c.alpha -= c.decay;

        if (c.alpha <= 0 || c.x > width + 200 || c.y > height + 200) {
          c.active = false;
          comets.splice(i, 1);
          continue;
        }

        // Add tail particles
        c.tailParticles.push({
          x: c.x,
          y: c.y,
          alpha: c.alpha,
          size: Math.random() * 1.5 + 0.5
        });

        if (c.tailParticles.length > 25) c.tailParticles.shift();

        // Draw glowing tail
        const headX = c.x;
        const headY = c.y;
        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const cometGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha})`);
        cometGrad.addColorStop(0.3, `rgba(99, 102, 241, ${c.alpha * 0.7})`);
        cometGrad.addColorStop(0.7, `rgba(6, 182, 212, ${c.alpha * 0.3})`);
        cometGrad.addColorStop(1, 'rgba(7, 10, 19, 0)');

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Head bright glow point
        ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
        ctx.beginPath();
        ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#070a13]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};