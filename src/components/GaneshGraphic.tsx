import React from 'react';

interface GaneshGraphicProps {
  className?: string;
  size?: number;
}

export const GaneshGraphic: React.FC<GaneshGraphicProps> = ({
  className = 'w-16 h-16 sm:w-20 sm:h-20',
  size
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Ambient Divine Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#FFD54F]/40 to-[#D4AF37]/30 blur-md pointer-events-none" />

      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shimmering Golden Gradient for Divine Form */}
          <linearGradient id="ganeshGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="30%" stopColor="#FFE082" />
            <stop offset="65%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997312" />
          </linearGradient>

          {/* Crown Radiance */}
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#8D5B00" />
          </linearGradient>

          {/* Auspicious Vermillion Red */}
          <linearGradient id="sindoorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF5252" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>
        </defs>

        {/* 1. RADIANT AURA / PRABHAVALI (Background Halo) */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="#1A0206"
          fillOpacity="0.8"
          stroke="url(#ganeshGoldGrad)"
          strokeWidth="1.8"
          strokeDasharray="4 2"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#FFE082"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Halo Sunburst Rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + Math.cos(rad) * 44;
          const y1 = 60 + Math.sin(rad) * 44;
          const x2 = 60 + Math.cos(rad) * 48;
          const y2 = 60 + Math.sin(rad) * 48;
          return (
            <line
              key={`ray-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFD54F"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          );
        })}

        {/* 2. ORNATE ROYAL MUKUT (Crown) */}
        {/* Tier 1 Base Band */}
        <rect
          x="44"
          y="26"
          width="32"
          height="5.5"
          rx="2"
          fill="url(#crownGrad)"
          stroke="#664603"
          strokeWidth="0.8"
        />
        {/* Crown Jewels */}
        <circle cx="49" cy="28.8" r="1.2" fill="#E53935" />
        <circle cx="60" cy="28.8" r="1.5" fill="#FFF" />
        <circle cx="71" cy="28.8" r="1.2" fill="#E53935" />

        {/* Tier 2 Conical Crown Peak */}
        <path
          d="M 46 26 L 60 12 L 74 26 Z"
          fill="url(#crownGrad)"
          stroke="#7A5200"
          strokeWidth="0.8"
        />
        <path
          d="M 50 26 L 60 15 L 70 26 Z"
          fill="#FFE082"
          opacity="0.7"
        />
        {/* Kalash Finial on Crown Top */}
        <circle cx="60" cy="11" r="2.2" fill="#FFE082" stroke="#AA7C11" strokeWidth="0.8" />
        <line x1="60" y1="6" x2="60" y2="9" stroke="#FFD54F" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="60" cy="6" r="1.2" fill="#FF5252" />

        {/* 3. BROAD EARS (SUPAKARNA) */}
        {/* Left Ear */}
        <path
          d="M 44 38 C 24 35, 20 48, 26 58 C 30 65, 39 67, 44 63"
          fill="url(#ganeshGoldGrad)"
          stroke="#5E4305"
          strokeWidth="1.5"
        />
        <path
          d="M 40 43 C 28 41, 26 51, 31 58"
          fill="none"
          stroke="#8C650C"
          strokeWidth="1.2"
        />
        {/* Left Kundal Earring */}
        <circle cx="28" cy="60" r="2.5" fill="#FFD54F" stroke="#8C650C" strokeWidth="0.8" />

        {/* Right Ear */}
        <path
          d="M 76 38 C 96 35, 100 48, 94 58 C 90 65, 81 67, 76 63"
          fill="url(#ganeshGoldGrad)"
          stroke="#5E4305"
          strokeWidth="1.5"
        />
        <path
          d="M 80 43 C 92 41, 94 51, 89 58"
          fill="none"
          stroke="#8C650C"
          strokeWidth="1.2"
        />
        {/* Right Kundal Earring */}
        <circle cx="92" cy="60" r="2.5" fill="#FFD54F" stroke="#8C650C" strokeWidth="0.8" />

        {/* 4. SACRED HEAD & FOREHEAD (Mastaka) */}
        <path
          d="M 44 32 C 44 32, 52 30, 60 30 C 68 30, 76 32, 76 32 C 78 44, 76 56, 73 63 C 68 69, 52 69, 47 63 C 44 56, 42 44, 44 32 Z"
          fill="url(#ganeshGoldGrad)"
          stroke="#5E4305"
          strokeWidth="1.5"
        />

        {/* AUSPICIOUS SINDOOR CHANDAN TILAK (Trishul Crescent & Red Vermillion Bindu) */}
        {/* Chandan Yellow Crescent */}
        <path
          d="M 52 38 Q 60 41 68 38"
          fill="none"
          stroke="#FFF9C4"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 54 41 Q 60 44 66 41"
          fill="none"
          stroke="#FFE082"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Red Vermillion Central Tilak */}
        <line x1="60" y1="34" x2="60" y2="44" stroke="url(#sindoorGrad)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="60" cy="45" r="1.8" fill="url(#sindoorGrad)" />

        {/* 5. DIVINE EYES (Netra) */}
        <path d="M 49 46 Q 53 44 56 46" fill="none" stroke="#2D1A02" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="53" cy="46" r="1" fill="#2D1A02" />

        <path d="M 64 46 Q 67 44 71 46" fill="none" stroke="#2D1A02" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="67" cy="46" r="1" fill="#2D1A02" />

        {/* 6. SACRED TUSK (Ekadanta) */}
        {/* Left Half Tusk (broken) */}
        <polygon points="48,60 52,60 50,64" fill="#FFFDE7" stroke="#8C650C" strokeWidth="0.8" />
        {/* Right Full Curved Tusk */}
        <path d="M 72 60 Q 75 64 71 67" fill="none" stroke="#FFFDE7" strokeWidth="2.2" strokeLinecap="round" />

        {/* 7. ELEGANT CURVED TRUNK (Vakratunda) */}
        <path
          d="M 57 52 
             C 57 58, 56 70, 52 78 
             C 47 88, 38 90, 36 84 
             C 34 78, 41 74, 46 76 
             C 48 77, 48 80, 46 81"
          fill="none"
          stroke="url(#ganeshGoldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 57 52 
             C 57 58, 56 70, 52 78 
             C 47 88, 38 90, 36 84 
             C 34 78, 41 74, 46 76 
             C 48 77, 48 80, 46 81"
          fill="none"
          stroke="#5E4305"
          strokeWidth="1.2"
        />

        {/* Decorative Golden Bands on Trunk */}
        <path d="M 55 60 Q 58 61 61 60" fill="none" stroke="#E53935" strokeWidth="1.2" />
        <path d="M 53 66 Q 56 67 59 66" fill="none" stroke="#FFF9C4" strokeWidth="1.2" />
        <path d="M 50 72 Q 53 73 56 72" fill="none" stroke="#E53935" strokeWidth="1.2" />

        {/* 8. GOLDEN MODAK (Sweet Delight in Trunk's Curve) */}
        <g transform="translate(37, 73)">
          {/* Sweet Modak shape */}
          <path
            d="M 4 8 C 1 8, 0 5, 3 3 C 4 1, 6 1, 7 3 C 10 5, 9 8, 6 8 Z"
            fill="#FFD54F"
            stroke="#B28704"
            strokeWidth="0.8"
          />
          <line x1="5" y1="2" x2="5" y2="7" stroke="#FFE082" strokeWidth="0.8" />
          <circle cx="5" cy="2" r="0.8" fill="#E53935" />
        </g>

        {/* 9. ABHAYA MUDRA / BLESSING HAND WITH SACRED OM */}
        <g transform="translate(73, 67)">
          {/* Palm */}
          <path
            d="M 5 6 C 5 2, 11 2, 12 5 C 13 8, 11 14, 6 13 C 3 12, 3 9, 5 6 Z"
            fill="url(#ganeshGoldGrad)"
            stroke="#5E4305"
            strokeWidth="1"
          />
          {/* Little Red Alta / Tilak on Palm */}
          <circle cx="8" cy="8" r="1.5" fill="#E53935" />
        </g>
      </svg>
    </div>
  );
};
