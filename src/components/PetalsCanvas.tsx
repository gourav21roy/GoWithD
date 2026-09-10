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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petalCount = 14;
    const colors = ['#E2583E', '#F7D070', '#C4432B', '#D4AF37', '#8C2B1A', '#FF9E80'];

    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 9 + 7,
      speedY: Math.random() * 1.1 + 0.7,
      speedX: Math.random() * 0.8 - 0.4,
      angle: Math.random() * 360,
      spin: Math.random() * 1.8 - 0.9,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
        p.angle += p.spin;

        if (p.y > canvas.height + 25) {
          p.y = -25;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);

        // Organic flower petal
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.82;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.15, -p.size * 0.94,
          p.size * 0.42, -p.size * 0.82,
          p.size * 0.68, -p.size * 0.55
        );
        ctx.bezierCurveTo(
          p.size * 0.92, -p.size * 0.25,
          p.size * 0.98, p.size * 0.15,
          p.size * 0.78, p.size * 0.48
        );
        ctx.bezierCurveTo(
          p.size * 0.58, p.size * 0.78,
          p.size * 0.32, p.size * 0.95,
          p.size * 0.12, p.size
        );
        ctx.bezierCurveTo(
          0, p.size * 1.04,
          -p.size * 0.14, p.size * 1.02,
          -p.size * 0.28, p.size * 0.92
        );
        ctx.bezierCurveTo(
          -p.size * 0.58, p.size * 0.72,
          -p.size * 0.86, p.size * 0.38,
          -p.size * 0.88, p.size * 0.02
        );
        ctx.bezierCurveTo(
          -p.size * 0.90, -p.size * 0.32,
          -p.size * 0.55, -p.size * 0.72,
          -p.size * 0.20, -p.size * 0.92
        );
        ctx.bezierCurveTo(
          -p.size * 0.08, -p.size * 0.98,
          -p.size * 0.03, -p.size,
          0, -p.size
        );
        ctx.closePath();
        ctx.fill();

        // Soft inner petal fold line
        ctx.strokeStyle = 'rgba(255, 248, 231, 0.32)';
        ctx.lineWidth = Math.max(0.6, p.size * 0.02);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.70);
        ctx.bezierCurveTo(
          p.size * 0.04, -p.size * 0.42,
          p.size * 0.08, -p.size * 0.05,
          p.size * 0.03, p.size * 0.55
        );
        ctx.stroke();

        // Delicate highlight ellipse
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = '#FFF8E7';
        ctx.beginPath();
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
