import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PetalsCanvasProps {
  enabled?: boolean;
}

export const PetalsCanvas: React.FC<PetalsCanvasProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(enabled);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isViewingClouds = true;

    const checkCloudsVisibility = () => {
      const heroCard = document.getElementById('hero-invitation-container');
      if (heroCard) {
        const rect = heroCard.getBoundingClientRect();
        // Petals are suppressed while the user is still in the celestial clouds sky
        isViewingClouds = rect.top > window.innerHeight * 0.45;
      } else {
        isViewingClouds = window.scrollY < window.innerHeight * 0.8;
      }
    };

    checkCloudsVisibility();
    window.addEventListener('scroll', checkCloudsVisibility, { passive: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      checkCloudsVisibility();
    };
    resize();
    window.addEventListener('resize', resize);

    const petalCount = 18;
    // Rich, authentic velvety rose petal colors
    const roseColors = [
      { base: '#700B1A', mid: '#B71C1C', edge: '#D32F2F' }, // Royal Velvet Rose
      { base: '#560027', mid: '#880E4F', edge: '#AD1457' }, // Deep Burgundy Rose
      { base: '#880E4F', mid: '#C2185B', edge: '#E91E63' }, // Classic Indian Crimson
      { base: '#800C1F', mid: '#C62828', edge: '#EF5350' }, // Scarlet Wedding Rose
      { base: '#4A001F', mid: '#7B112B', edge: '#C2185B' }, // Dark Maroon Velvet
    ];

    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 9,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.random() * 0.7 - 0.35,
      angle: Math.random() * 360,
      spin: Math.random() * 1.2 - 0.6,
      flipAngle: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.03 + 0.015,
      palette: roseColors[Math.floor(Math.random() * roseColors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Do NOT show petals while in the celestial clouds
      if (isViewingClouds) {
        animationId = requestAnimationFrame(render);
        return;
      }

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.008) * 0.7 + p.speedX;
        p.angle += p.spin;
        p.flipAngle += p.flipSpeed;

        if (p.y > canvas.height + 30) {
          p.y = -30;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);

        // 3D fluttering & tumbling effect as petal flips in breeze
        const flipScale = Math.cos(p.flipAngle);
        ctx.scale(flipScale, 1);

        const s = p.size;

        // Velvety Rose Petal Gradient (darker base near calyx, rich glowing crimson edge)
        const radGrad = ctx.createRadialGradient(0, s * 0.3, s * 0.1, 0, -s * 0.2, s * 1.1);
        radGrad.addColorStop(0, p.palette.base);
        radGrad.addColorStop(0.55, p.palette.mid);
        radGrad.addColorStop(1, p.palette.edge);

        ctx.fillStyle = radGrad;
        ctx.globalAlpha = 0.88;

        // Authentic Cupped Rose Petal Path (Heart-cleft rounded top, smooth curved cheeks, narrow base)
        ctx.beginPath();
        // Start at narrow base (calyx attachment)
        ctx.moveTo(0, s * 0.85);

        // Left curved cheek expanding outward
        ctx.bezierCurveTo(
          -s * 0.35, s * 0.75,
          -s * 0.85, s * 0.35,
          -s * 0.82, -s * 0.15
        );

        // Top-left rounded petal lobe
        ctx.bezierCurveTo(
          -s * 0.80, -s * 0.65,
          -s * 0.45, -s * 0.95,
          -s * 0.12, -s * 0.92
        );

        // Gentle central dip / cleft at petal crown
        ctx.bezierCurveTo(
          -s * 0.05, -s * 0.85,
          s * 0.05, -s * 0.85,
          s * 0.12, -s * 0.92
        );

        // Top-right rounded petal lobe
        ctx.bezierCurveTo(
          s * 0.45, -s * 0.95,
          s * 0.80, -s * 0.65,
          s * 0.82, -s * 0.15
        );

        // Right curved cheek tapering down to base
        ctx.bezierCurveTo(
          s * 0.85, s * 0.35,
          s * 0.35, s * 0.75,
          0, s * 0.85
        );

        ctx.closePath();
        ctx.fill();

        // Soft velvety specular light curve along curled petal edge
        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = '#FFE4E6';
        ctx.lineWidth = Math.max(0.7, s * 0.05);
        ctx.beginPath();
        ctx.bezierCurveTo(
          -s * 0.75, -s * 0.2,
          -s * 0.65, -s * 0.8,
          -s * 0.1, -s * 0.88
        );
        ctx.stroke();
        ctx.restore();

        // Subtle shaded inner cup depth
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#2A0008';
        ctx.beginPath();
        ctx.ellipse(0, s * 0.35, s * 0.28, s * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.ellipse(
          -p.size * 0.18, -p.size * 0.28,
          p.size * 0.12, p.size * 0.32,
          -0.25, 0, Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', checkCloudsVisibility);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  return (
    <>
      <canvas
        id="petals-canvas"
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0 }}
      />
      
      {/* Subtle Floating Petal Toggle */}
      <button
        id="petal-toggle-btn"
        onClick={() => setActive(!active)}
        title={active ? 'Hide falling petals' : 'Show falling petals'}
        aria-label="Toggle floral petals"
        className="fixed bottom-20 right-4 z-40 p-2.5 rounded-full bg-[#1A0206]/85 border border-[#D4AF37]/40 text-[#FCE2A6] hover:text-white hover:border-[#D4AF37] transition-all shadow-xl backdrop-blur-md text-xs flex items-center space-x-1.5 group opacity-85 hover:opacity-100"
      >
        <Sparkles className={`w-3.5 h-3.5 text-[#F7D070] transition-transform ${active ? 'animate-spin-slow' : 'opacity-40'}`} />
        <span className="hidden sm:inline font-sans text-[11px] font-medium text-[#FCE2A6]">
          {active ? 'Petals: On' : 'Petals: Off'}
        </span>
      </button>
    </>
  );
};
