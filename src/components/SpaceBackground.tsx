import React, { useEffect, useRef } from 'react';

interface DistantStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  colorIndex: number;
}

interface MidStar {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  colorIndex: number;
  parallax: number;
}

interface BrightStar {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasSpikes: boolean;
  parallax: number;
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
}

type RGB = [number, number, number];

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY;
    let maxScroll = 1;

    const isMobile = window.innerWidth < 768;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Star Colors
    const starPalette = [
      '#ffffff',
      '#e0e7ff',
      '#c7d2fe',
      '#a5b4fc',
      '#67e8f9',
      '#fef08a',
      '#38bdf8',
      '#a855f7',
    ];

    // Star Collections
    let distantStars: DistantStar[] = [];
    let midStars: MidStar[] = [];
    let brightStars: BrightStar[] = [];
    let dustParticles: DustParticle[] = [];
    let comets: Comet[] = [];

    const initStars = () => {
      // 1. Distant Micro-Stars (Dense layer - 4,000 to 5,500 on desktop, 1,600 on mobile)
      const distantCount = isMobile
        ? Math.min(Math.floor((width * height) / 450), 1600)
        : Math.min(Math.floor((width * height) / 200), 5200);

      distantStars = [];
      for (let i = 0; i < distantCount; i++) {
        distantStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 3.5,
          size: Math.random() * 0.9 + 0.5,
          alpha: Math.random() * 0.5 + 0.25,
          colorIndex: Math.floor(Math.random() * starPalette.length),
        });
      }

      // 2. Mid Shimmering Stars (900 on desktop, 350 on mobile)
      const midCount = isMobile ? 320 : 950;
      midStars = [];
      for (let i = 0; i < midCount; i++) {
        midStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 3.5,
          size: Math.random() * 1.3 + 1.0,
          baseAlpha: Math.random() * 0.45 + 0.45,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          colorIndex: Math.floor(Math.random() * starPalette.length),
          parallax: Math.random() * 0.6 + 0.4,
        });
      }

      // 3. Bright Feature Stars (160 on desktop, 60 on mobile)
      const brightCount = isMobile ? 60 : 160;
      brightStars = [];
      for (let i = 0; i < brightCount; i++) {
        brightStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 3.5,
          size: Math.random() * 1.8 + 1.6,
          baseAlpha: Math.random() * 0.3 + 0.7,
          twinkleSpeed: Math.random() * 0.035 + 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starPalette[Math.floor(Math.random() * starPalette.length)],
          hasSpikes: Math.random() > 0.35,
          parallax: Math.random() * 0.8 + 0.8,
        });
      }

      // 4. Atmospheric Cosmic Dust Particles
      const dustCount = isMobile ? 40 : 120;
      dustParticles = [];
      for (let i = 0; i < dustCount; i++) {
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25 - 0.08,
          size: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.4 + 0.2,
          color: Math.random() > 0.5 ? 'rgba(99, 102, 241,' : 'rgba(6, 182, 212,',
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      handleScroll();
      initStars();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Comet / Shooting Star Spawner
    let lastCometTime = Date.now();
    let cometInterval = 7000 + Math.random() * 6000;

    const triggerComet = () => {
      comets.push({
        x: Math.random() * width * 1.1 - width * 0.05,
        y: Math.random() * (height * 0.4),
        length: 120 + Math.random() * 120,
        speed: 12 + Math.random() * 7,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        active: true,
        decay: 0.014,
      });
    };

    setTimeout(triggerComet, 1800);

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const lerpColor = (c1: RGB, c2: RGB, factor: number): RGB => [
      Math.round(c1[0] + (c2[0] - c1[0]) * factor),
      Math.round(c1[1] + (c2[1] - c1[1]) * factor),
      Math.round(c1[2] + (c2[2] - c1[2]) * factor),
    ];

    let time = 0;

    // Main Render Function
    const render = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.01;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const scrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Section Sky Interpolation
      const bgDeepSpace: RGB = [7, 10, 19];
      const bgProjects: RGB = [9, 14, 28];
      const bgSunset: RGB = [18, 12, 26];
      const bgCrystal: RGB = [8, 18, 32];
      const bgContact: RGB = [11, 12, 25];

      let currentBgRGB: RGB = bgDeepSpace;
      if (scrollRatio < 0.25) {
        currentBgRGB = lerpColor(bgDeepSpace, bgProjects, scrollRatio / 0.25);
      } else if (scrollRatio < 0.55) {
        currentBgRGB = lerpColor(bgProjects, bgSunset, (scrollRatio - 0.25) / 0.3);
      } else if (scrollRatio < 0.75) {
        currentBgRGB = lerpColor(bgSunset, bgCrystal, (scrollRatio - 0.55) / 0.2);
      } else {
        currentBgRGB = lerpColor(bgCrystal, bgContact, (scrollRatio - 0.75) / 0.25);
      }

      // 1. Clear Canvas Base
      ctx.fillStyle = `rgb(${currentBgRGB[0]}, ${currentBgRGB[1]}, ${currentBgRGB[2]})`;
      ctx.fillRect(0, 0, width, height);

      const scrollOffset = scrollY * 0.12;

      // 2. Volumetric Ambient Nebulae (Smooth radial glows)
      let nebula1Color = 'rgba(76, 29, 149, 0.28)'; // Deep Indigo/Violet (Hero)
      let nebula2Color = 'rgba(14, 116, 144, 0.22)'; // Electric Cyan (Hero)

      if (scrollRatio > 0.15 && scrollRatio < 0.45) {
        nebula1Color = 'rgba(2, 132, 199, 0.26)'; // Cyan/Blue (Projects)
        nebula2Color = 'rgba(124, 58, 237, 0.24)'; // Violet
      } else if (scrollRatio >= 0.45 && scrollRatio < 0.7) {
        nebula1Color = 'rgba(194, 65, 12, 0.25)'; // Amber/Gold (Experience)
        nebula2Color = 'rgba(180, 83, 9, 0.22)';
      } else if (scrollRatio >= 0.7 && scrollRatio < 0.85) {
        nebula1Color = 'rgba(6, 182, 212, 0.26)'; // Crystal Cyan (Certificates)
        nebula2Color = 'rgba(56, 189, 248, 0.22)';
      } else if (scrollRatio >= 0.85) {
        nebula1Color = 'rgba(217, 119, 6, 0.24)'; // Warm Sunset / Prism (Contact)
        nebula2Color = 'rgba(147, 51, 234, 0.25)';
      }

      const g1 = ctx.createRadialGradient(
        width * 0.25 + mouseX * 1.5,
        height * 0.25 - scrollOffset * 0.3 + Math.sin(time * 0.4) * 25,
        30,
        width * 0.25 + mouseX * 1.5,
        height * 0.25 - scrollOffset * 0.3,
        width * 0.6
      );
      g1.addColorStop(0, nebula1Color);
      g1.addColorStop(0.7, 'rgba(15, 23, 42, 0.06)');
      g1.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.78 + mouseX * 1.8,
        height * 0.68 - scrollOffset * 0.25 + Math.cos(time * 0.35) * 30,
        40,
        width * 0.78 + mouseX * 1.8,
        height * 0.68 - scrollOffset * 0.25,
        width * 0.55
      );
      g2.addColorStop(0, nebula2Color);
      g2.addColorStop(0.7, 'rgba(15, 23, 42, 0.06)');
      g2.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Sinuous Aurora Ribbon (Projects)
      if (scrollRatio > 0.12 && scrollRatio < 0.58 && !isMobile) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const ribbonAlpha = Math.sin(((scrollRatio - 0.12) / 0.46) * Math.PI) * 0.22;

        const rGrad = ctx.createLinearGradient(0, height * 0.2, width, height * 0.8);
        rGrad.addColorStop(0, `rgba(6, 182, 212, ${ribbonAlpha})`);
        rGrad.addColorStop(0.5, `rgba(168, 85, 247, ${ribbonAlpha * 0.85})`);
        rGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.strokeStyle = rGrad;
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.moveTo(-50, height * 0.35 + Math.sin(time * 0.3) * 30);
        ctx.bezierCurveTo(
          width * 0.3,
          height * 0.2 + Math.cos(time * 0.25) * 45,
          width * 0.7,
          height * 0.55 + Math.sin(time * 0.4) * 45,
          width + 50,
          height * 0.3 + Math.cos(time * 0.3) * 30
        );
        ctx.stroke();
        ctx.restore();
      }

      // 4. BATCHED TIER 1: Distant Micro-Stars (Zero-overhead batching by palette color)
      const distantCycle = height * 1.5;
      for (let c = 0; c < starPalette.length; c++) {
        ctx.fillStyle = starPalette[c];
        ctx.beginPath();
        for (let i = 0; i < distantStars.length; i++) {
          const star = distantStars[i];
          if (star.colorIndex !== c) continue;

          const starYRel = (star.y - scrollY * 0.04) % distantCycle;
          const drawY = (starYRel < 0 ? starYRel + distantCycle : starYRel) - height * 0.2;
          const drawX = star.x + mouseX * 0.25;

          if (drawY < -5 || drawY > height + 5 || drawX < -5 || drawX > width + 5) continue;

          ctx.rect(drawX, drawY, star.size, star.size);
        }
        ctx.globalAlpha = 0.55;
        ctx.fill();
      }

      // 5. BATCHED TIER 2: Mid Shimmering Stars
      const midCycle = height * 1.6;
      for (let c = 0; c < starPalette.length; c++) {
        ctx.fillStyle = starPalette[c];
        ctx.beginPath();
        for (let i = 0; i < midStars.length; i++) {
          const star = midStars[i];
          if (star.colorIndex !== c) continue;

          if (!prefersReducedMotion) {
            star.twinklePhase += star.twinkleSpeed;
          }

          const starYRel = (star.y - scrollY * (0.06 * star.parallax)) % midCycle;
          const drawY = (starYRel < 0 ? starYRel + midCycle : starYRel) - height * 0.25;
          const drawX = star.x + mouseX * star.parallax;

          if (drawY < -5 || drawY > height + 5 || drawX < -5 || drawX > width + 5) continue;

          ctx.rect(drawX, drawY, star.size, star.size);
        }
        ctx.globalAlpha = 0.75;
        ctx.fill();
      }

      // 6. TIER 3: Bright Prominent Stars & Cross Diffraction Flares
      const brightCycle = height * 1.7;
      for (let i = 0; i < brightStars.length; i++) {
        const star = brightStars[i];

        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
        }

        const alphaMod = prefersReducedMotion ? star.baseAlpha : star.baseAlpha + Math.sin(star.twinklePhase) * 0.25;
        const finalAlpha = Math.max(0.2, Math.min(1, alphaMod));

        const starYRel = (star.y - scrollY * (0.08 * star.parallax)) % brightCycle;
        const drawY = (starYRel < 0 ? starYRel + brightCycle : starYRel) - height * 0.3;
        const drawX = star.x + mouseX * star.parallax;

        if (drawY < -10 || drawY > height + 10 || drawX < -10 || drawX > width + 10) continue;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = finalAlpha;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross-Diffraction Flares
        if (star.hasSpikes && finalAlpha > 0.65) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.6;
          const spikeLen = star.size * 2.6;
          ctx.beginPath();
          ctx.moveTo(drawX - spikeLen, drawY);
          ctx.lineTo(drawX + spikeLen, drawY);
          ctx.moveTo(drawX, drawY - spikeLen);
          ctx.lineTo(drawX, drawY + spikeLen);
          ctx.stroke();
        }
      }

      // 7. Atmospheric Cosmic Dust Embers
      ctx.globalAlpha = 1;
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx + mouseX * 0.008;
          p.y += p.vy - scrollY * 0.0002;
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

      // 8. Dynamic Comets / Meteor Trails
      const now = Date.now();
      if (!prefersReducedMotion && now - lastCometTime > cometInterval) {
        triggerComet();
        lastCometTime = now;
        cometInterval = 7000 + Math.random() * 7000;
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

        const headX = c.x;
        const headY = c.y;
        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const cometGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha})`);
        cometGrad.addColorStop(0.35, `rgba(99, 102, 241, ${c.alpha * 0.75})`);
        cometGrad.addColorStop(0.7, `rgba(6, 182, 212, ${c.alpha * 0.35})`);
        cometGrad.addColorStop(1, 'rgba(7, 10, 19, 0)');

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
        ctx.beginPath();
        ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
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
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#070a13]" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};