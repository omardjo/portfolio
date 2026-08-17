import React, { useEffect, useRef } from 'react';

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
    let isMobile = false;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY;
    let maxScroll = 1;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      targetMouseX = (e.clientX - width / 2) * 0.035;
      targetMouseY = (e.clientY - height / 2) * 0.035;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Star Palette
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

    // Offscreen Canvas for Static Distant Stars
    let offscreenCanvas: HTMLCanvasElement | null = null;
    let offscreenHeight = 0;

    let midStars: MidStar[] = [];
    let brightStars: BrightStar[] = [];
    let dustParticles: DustParticle[] = [];
    let comets: Comet[] = [];

    const initDistantStarBuffer = (w: number, h: number, pixelRatio: number) => {
      offscreenHeight = Math.floor(h * (isMobile ? 1.5 : 2));
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = Math.floor(w * pixelRatio);
      offscreenCanvas.height = Math.floor(offscreenHeight * pixelRatio);

      const offCtx = offscreenCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      // Adaptive star count
      const distantCount = isMobile
        ? Math.min(Math.floor((w * h) / 380), 1400)
        : Math.min(Math.floor((w * h) / 180), 5500);

      for (let c = 0; c < starPalette.length; c++) {
        offCtx.fillStyle = starPalette[c];
        offCtx.beginPath();
        const starsPerColor = Math.floor(distantCount / starPalette.length);
        for (let i = 0; i < starsPerColor; i++) {
          const sx = Math.random() * w;
          const sy = Math.random() * offscreenHeight;
          const sz = Math.random() * 0.9 + 0.4;
          offCtx.rect(sx, sy, sz, sz);
        }
        offCtx.globalAlpha = 0.55;
        offCtx.fill();
      }
    };

    const initStars = () => {
      initDistantStarBuffer(width, height, dpr);

      // Dynamic Mid Shimmering Stars
      const midCount = isMobile ? 35 : 180;
      midStars = [];
      for (let i = 0; i < midCount; i++) {
        midStars.push({
          x: Math.random() * width,
          y: Math.random() * height * (isMobile ? 2 : 3),
          size: Math.random() * 1.3 + 1.0,
          baseAlpha: Math.random() * 0.45 + 0.45,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          colorIndex: Math.floor(Math.random() * starPalette.length),
          parallax: Math.random() * 0.5 + 0.4,
        });
      }

      // Bright Feature Stars with Flares
      const brightCount = isMobile ? 12 : 45;
      brightStars = [];
      for (let i = 0; i < brightCount; i++) {
        brightStars.push({
          x: Math.random() * width,
          y: Math.random() * height * (isMobile ? 2 : 3),
          size: Math.random() * 1.5 + 1.4,
          baseAlpha: Math.random() * 0.25 + 0.75,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starPalette[Math.floor(Math.random() * starPalette.length)],
          hasSpikes: !isMobile,
          parallax: Math.random() * 0.7 + 0.8,
        });
      }

      // Atmospheric Cosmic Dust Embers
      const dustCount = isMobile ? 15 : 60;
      dustParticles = [];
      for (let i = 0; i < dustCount; i++) {
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2),
          vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2) - 0.05,
          size: Math.random() * 2.0 + 0.8,
          alpha: Math.random() * 0.35 + 0.15,
          color: Math.random() > 0.5 ? 'rgba(99, 102, 241,' : 'rgba(6, 182, 212,',
        });
      }
    };

    const resize = () => {
      isMobile = window.innerWidth < 768 || window.matchMedia('(hover: none)').matches;
      // Intelligently cap DPR on mobile to 1.15 to avoid rendering 3 million pixels on 3x screens
      dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.15) : Math.min(window.devicePixelRatio || 1, 2);
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
    let cometInterval = isMobile ? 22000 : 14000 + Math.random() * 10000;

    const triggerComet = () => {
      comets.push({
        x: Math.random() * width * 1.1 - width * 0.05,
        y: Math.random() * (height * 0.35),
        length: isMobile ? 90 : 140,
        speed: isMobile ? 12 : 14,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.15,
        alpha: 1,
        active: true,
        decay: isMobile ? 0.018 : 0.012,
      });
    };

    if (!isMobile) {
      setTimeout(triggerComet, 4000);
    }

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

    // Main Render Loop
    const render = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += isMobile ? 0.005 : 0.008;

      if (!isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      const scrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Celestial Background Interpolation
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

      const scrollOffset = scrollY * 0.1;

      // 2. Ambient Volumetric Nebulae
      let nebula1Color = 'rgba(76, 29, 149, 0.25)'; // Hero
      let nebula2Color = 'rgba(14, 116, 144, 0.20)';

      if (scrollRatio > 0.15 && scrollRatio < 0.45) {
        nebula1Color = 'rgba(2, 132, 199, 0.24)'; // Projects
        nebula2Color = 'rgba(124, 58, 237, 0.22)';
      } else if (scrollRatio >= 0.45 && scrollRatio < 0.7) {
        nebula1Color = 'rgba(194, 65, 12, 0.22)'; // Experience
        nebula2Color = 'rgba(180, 83, 9, 0.20)';
      } else if (scrollRatio >= 0.7 && scrollRatio < 0.85) {
        nebula1Color = 'rgba(6, 182, 212, 0.24)'; // Certifications
        nebula2Color = 'rgba(56, 189, 248, 0.20)';
      } else if (scrollRatio >= 0.85) {
        nebula1Color = 'rgba(217, 119, 6, 0.22)'; // Contact
        nebula2Color = 'rgba(147, 51, 234, 0.22)';
      }

      const g1 = ctx.createRadialGradient(
        width * 0.25 + mouseX * 1.5,
        height * 0.25 - scrollOffset * 0.25 + Math.sin(time * 0.35) * (isMobile ? 10 : 20),
        20,
        width * 0.25 + mouseX * 1.5,
        height * 0.25 - scrollOffset * 0.25,
        width * (isMobile ? 0.7 : 0.58)
      );
      g1.addColorStop(0, nebula1Color);
      g1.addColorStop(0.7, 'rgba(15, 23, 42, 0.05)');
      g1.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.78 + mouseX * 1.8,
        height * 0.68 - scrollOffset * 0.2 + Math.cos(time * 0.3) * (isMobile ? 12 : 25),
        30,
        width * 0.78 + mouseX * 1.8,
        height * 0.68 - scrollOffset * 0.2,
        width * (isMobile ? 0.65 : 0.52)
      );
      g2.addColorStop(0, nebula2Color);
      g2.addColorStop(0.7, 'rgba(15, 23, 42, 0.05)');
      g2.addColorStop(1, 'rgba(7, 10, 19, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // 3. LAYER 1: Pre-rendered Distant Starfield (1 drawImage call for thousands of stars!)
      if (offscreenCanvas) {
        const distantScrollY = (scrollY * 0.03) % offscreenHeight;
        const drawY1 = -distantScrollY;
        const drawY2 = drawY1 + offscreenHeight;

        ctx.drawImage(offscreenCanvas, mouseX * 0.2, drawY1, width, offscreenHeight);
        if (drawY2 < height) {
          ctx.drawImage(offscreenCanvas, mouseX * 0.2, drawY2, width, offscreenHeight);
        }
      }

      // 4. LAYER 2: Batched Mid Shimmering Stars
      const midCycle = height * (isMobile ? 1.3 : 1.5);
      for (let c = 0; c < starPalette.length; c++) {
        ctx.fillStyle = starPalette[c];
        ctx.beginPath();
        for (let i = 0; i < midStars.length; i++) {
          const star = midStars[i];
          if (star.colorIndex !== c) continue;

          if (!prefersReducedMotion) {
            star.twinklePhase += star.twinkleSpeed;
          }

          const starYRel = (star.y - scrollY * (0.05 * star.parallax)) % midCycle;
          const drawY = (starYRel < 0 ? starYRel + midCycle : starYRel) - height * 0.25;
          const drawX = star.x + mouseX * star.parallax;

          if (drawY < -5 || drawY > height + 5 || drawX < -5 || drawX > width + 5) continue;

          ctx.rect(drawX, drawY, star.size, star.size);
        }
        ctx.globalAlpha = 0.75;
        ctx.fill();
      }

      // 5. LAYER 3: Bright Feature Stars
      const brightCycle = height * (isMobile ? 1.4 : 1.6);
      for (let i = 0; i < brightStars.length; i++) {
        const star = brightStars[i];

        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
        }

        const alphaMod = prefersReducedMotion ? star.baseAlpha : star.baseAlpha + Math.sin(star.twinklePhase) * 0.22;
        const finalAlpha = Math.max(0.25, Math.min(1, alphaMod));

        const starYRel = (star.y - scrollY * (0.07 * star.parallax)) % brightCycle;
        const drawY = (starYRel < 0 ? starYRel + brightCycle : starYRel) - height * 0.3;
        const drawX = star.x + mouseX * star.parallax;

        if (drawY < -10 || drawY > height + 10 || drawX < -10 || drawX > width + 10) continue;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = finalAlpha;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross-Diffraction Flares (desktop only for max performance)
        if (star.hasSpikes && finalAlpha > 0.65) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.55;
          const spikeLen = star.size * 2.5;
          ctx.beginPath();
          ctx.moveTo(drawX - spikeLen, drawY);
          ctx.lineTo(drawX + spikeLen, drawY);
          ctx.moveTo(drawX, drawY - spikeLen);
          ctx.lineTo(drawX, drawY + spikeLen);
          ctx.stroke();
        }
      }

      // 6. Cosmic Dust Embers
      ctx.globalAlpha = 1;
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx + mouseX * 0.006;
          p.y += p.vy - scrollY * 0.00015;
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

      // 7. LAYER 4: Rare Celestial Event (Comets)
      const now = Date.now();
      if (!prefersReducedMotion && now - lastCometTime > cometInterval) {
        triggerComet();
        lastCometTime = now;
        cometInterval = isMobile ? 24000 : 14000 + Math.random() * 10000;
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
        cometGrad.addColorStop(0.35, `rgba(99, 102, 241, ${c.alpha * 0.7})`);
        cometGrad.addColorStop(0.7, `rgba(6, 182, 212, ${c.alpha * 0.3})`);
        cometGrad.addColorStop(1, 'rgba(7, 10, 19, 0)');

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = isMobile ? 1.4 : 1.8;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
        ctx.beginPath();
        ctx.arc(headX, headY, isMobile ? 1.8 : 2.2, 0, Math.PI * 2);
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
      offscreenCanvas = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#070a13]" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};