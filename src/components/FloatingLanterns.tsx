import React from 'react';
import { motion } from 'motion/react';

interface LanternData {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
}

const LANTERNS: LanternData[] = [
  { id: 1, left: '6%', size: 20, duration: 18, delay: 0, sway: 18, opacity: 0.75 },
  { id: 2, left: '16%', size: 16, duration: 22, delay: 4, sway: -14, opacity: 0.65 },
  { id: 3, left: '26%', size: 24, duration: 16, delay: 8, sway: 22, opacity: 0.8 },
  { id: 4, left: '38%', size: 18, duration: 20, delay: 2, sway: -16, opacity: 0.7 },
  { id: 5, left: '50%', size: 26, duration: 15, delay: 7, sway: 20, opacity: 0.85 },
  { id: 6, left: '62%', size: 15, duration: 23, delay: 5, sway: -12, opacity: 0.6 },
  { id: 7, left: '72%', size: 22, duration: 17, delay: 1, sway: 16, opacity: 0.8 },
  { id: 8, left: '84%', size: 18, duration: 21, delay: 9, sway: -18, opacity: 0.75 },
  { id: 9, left: '92%', size: 22, duration: 19, delay: 3, sway: 15, opacity: 0.7 },
  { id: 10, left: '44%', size: 14, duration: 25, delay: 11, sway: -10, opacity: 0.55 },
  { id: 11, left: '78%', size: 20, duration: 18, delay: 13, sway: 14, opacity: 0.75 }
];

export const FloatingLanterns: React.FC = () => {
  const travelDistance = typeof window !== 'undefined' ? -(window.innerHeight * 1.6) : -1200;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {LANTERNS.map((lantern) => (
        <motion.div
          key={`floating-lantern-${lantern.id}`}
          className="absolute"
          style={{
            left: lantern.left,
            bottom: '-60px',
            width: `${lantern.size}px`,
            height: `${lantern.size * 1.45}px`,
            opacity: lantern.opacity
          }}
          animate={{
            y: [0, travelDistance],
            x: [0, lantern.sway, -lantern.sway * 0.7, lantern.sway * 0.5, 0],
            rotate: [-2, 3, -3, 2, -2]
          }}
          transition={{
            y: {
              duration: lantern.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: lantern.delay
            },
            x: {
              duration: lantern.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: lantern.delay
            },
            rotate: {
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          {/* Lantern Body SVG with Warm Golden Glow */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Outer Aura Glow */}
            <div
              className="absolute inset-0 rounded-full blur-[8px] bg-gradient-to-t from-[#FF6F00]/50 via-[#FFA000]/40 to-transparent"
              style={{ transform: 'scale(1.6)' }}
            />

            <svg
              viewBox="0 0 30 44"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(255,160,0,0.85)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Paper Lantern Envelope (Fanush) */}
              <path
                d="M 5 10 C 2 24, 7 36, 11 40 L 19 40 C 23 36, 28 24, 25 10 C 21 4, 9 4, 5 10 Z"
                fill="url(#lanternGradient)"
                stroke="#FFD54F"
                strokeWidth="0.8"
              />

              {/* Lantern Ribs / Creases */}
              <path
                d="M 15 5 L 15 40"
                stroke="#FF8F00"
                strokeWidth="0.6"
                opacity="0.65"
              />
              <path
                d="M 10 7 C 8 18, 10 32, 13 39"
                stroke="#FF8F00"
                strokeWidth="0.5"
                opacity="0.5"
              />
              <path
                d="M 20 7 C 22 18, 20 32, 17 39"
                stroke="#FF8F00"
                strokeWidth="0.5"
                opacity="0.5"
              />

              {/* Lower Opening Rim */}
              <ellipse cx="15" cy="40" rx="4.5" ry="1.2" fill="#E65100" stroke="#FFD54F" strokeWidth="0.6" />

              {/* Inner Flame / Wick (Glowing Fire) */}
              <circle cx="15" cy="36" r="3" fill="#FFF8E7" filter="drop-shadow(0 0 4px #FFD54F)" />
              <ellipse cx="15" cy="35" rx="1.8" ry="2.5" fill="#FFE082" />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="lanternGradient" x1="15" y1="4" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFA000" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FF6F00" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E65100" stopOpacity="0.95" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
