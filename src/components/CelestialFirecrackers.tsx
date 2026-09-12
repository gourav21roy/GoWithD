import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  sparkle: boolean;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

const FIREWORK_COLORS = [
  '#FFD700', // Royal Gold
  '#FFA500', // Saffron Amber
  '#FF3366', // Rose Crimson
  '#00E676', // Emerald Green
  '#00E5FF', // Celestial Cyan
  '#FF6D00', // Festive Orange
  '#E040FB', // Royal Orchid
  '#FFF8E7', // Radiant Ivory
];

export const CelestialFirecrackers: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastAutoLaunch = Date.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const flashes: { x: number; y: number; radius: number; color: string; alpha: number }[] = [];

    // Launch a celebratory rocket that ascends and bursts in the clouds
    const launchRocket = (startX?: number, targetY?: number, color?: string) => {
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) return;

      const x = startX ?? (w * 0.15 + Math.random() * (w * 0.7));
      const chosenColor = color ?? FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      // Burst between 15% and 55% of the clouds height
      const tY = targetY ?? (h * 0.12 + Math.random() * (h * 0.45));

      rockets.push({
        x,
        y: h + 10,
        targetY: tY,
        vy: -(Math.random() * 3 + 8),
        color: chosenColor,
        exploded: false,
        trail: []
      });
    };

    // Detonate the rocket into sparkling burst particles
    const explode = (x: number, y: number, color: string) => {
      // Add ambient flash that lights up surrounding clouds
      flashes.push({
        x,
        y,
        radius: Math.random() * 70 + 90,
        color,
        alpha: 0.35
      });

      // Ring and bouquet particles
      const count = Math.floor(Math.random() * 25 + 40);
      const secondaryColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 4.5 + 1.5;
        const pColor = Math.random() > 0.3 ? color : secondaryColor;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          size: Math.random() * 2.5 + 1.5,
          color: pColor,
          sparkle: Math.random() > 0.4,
          gravity: 0.06
        });
      }

      // Add a cluster of shimmering golden micro-glitters (Tara Baji effect)
      for (let j = 0; j < 20; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.01,
          size: Math.random() * 1.8 + 0.8,
          color: '#FFF8E7',
          sparkle: true,
          gravity: 0.04
        });
      }
    };

    // Initial 2 launch bursts
    launchRocket(canvas.width * 0.3, canvas.height * 0.28, '#FFD700');
    setTimeout(() => {
      launchRocket(canvas.width * 0.7, canvas.height * 0.22, '#FF3366');
    }, 900);

    // Interactive burst on click / touch on the clouds
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        explode(x, y, FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]);
      }
    };

    canvas.addEventListener('click', handlePointerDown);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodically auto-launch firecrackers (every 2 to 3.2 seconds)
      const now = Date.now();
      if (now - lastAutoLaunch > 2200 + Math.random() * 1200) {
        launchRocket();
        lastAutoLaunch = now;
      }

      // 1. Render Cloud Illumination Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.alpha -= 0.02;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        const radial = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        radial.addColorStop(0, f.color);
        radial.addColorStop(0.5, f.color + '44');
        radial.addColorStop(1, 'transparent');

        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render Ascending Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;

        // Add tail spark
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.shift();

        // Draw rocket trail
        ctx.save();
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.6 * (t / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = (t / r.trail.length) * 0.75;
          ctx.fill();
        }
        ctx.restore();

        // Rocket head spark
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF8E7';
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Check if rocket reached explosion height
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // 3. Render Burst Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.sparkle && Math.random() > 0.4 ? p.alpha * 0.5 : p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto cursor-pointer ${className}`}
      style={{ zIndex: 18 }}
      title="Click on the sky to burst celebratory wedding firecrackers!"
    />
  );
};
export default CelestialFirecrackers;
