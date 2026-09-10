import React from 'react';
import { motion } from 'motion/react';

interface CelestialCloudSkyProps {
  className?: string;
}

export const CelestialCloudSky: React.FC<CelestialCloudSkyProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Deep Midnight Royal Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020512] via-[#040E26] to-[#12030A]" />

      {/* Atmospheric Starry Sky & Luminous Crescent Moon Canvas */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Luminous Moon Radiant Aura */}
            <radialGradient id="celestialMoonAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#D97706" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>

            {/* Glowing Golden Star Halo */}
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF8E7" stopOpacity="1" />
              <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>

            {/* Cloud Soft Filter Glow */}
            <filter id="celestialSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FDE68A" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* AUSPICIOUS SAPTARSHI & NAKSHATRA CONSTELLATION LINES     */}
          {/* ========================================================= */}
          <g opacity="0.4" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="3 4">
            <line x1="140" y1="130" x2="230" y2="100" />
            <line x1="230" y1="100" x2="310" y2="150" />
            <line x1="310" y1="150" x2="400" y2="120" />
            <line x1="400" y1="120" x2="460" y2="190" />

            <line x1="820" y1="110" x2="890" y2="80" />
            <line x1="890" y1="80" x2="980" y2="130" />
            <line x1="980" y1="130" x2="1060" y2="100" />
          </g>

          {/* ========================================================= */}
          {/* TWINKLING DIAMOND STARS & CELESTIAL SPARKLES              */}
          {/* ========================================================= */}
          {[
            { x: 140, y: 130, s: 1.4 },
            { x: 230, y: 100, s: 1.1 },
            { x: 310, y: 150, s: 1.5 },
            { x: 400, y: 120, s: 1.2 },
            { x: 460, y: 190, s: 1.4 },
            { x: 730, y: 90, s: 1.6 },
            { x: 820, y: 110, s: 1.3 },
            { x: 890, y: 80, s: 1.1 },
            { x: 980, y: 130, s: 1.4 },
            { x: 1060, y: 100, s: 1.2 },
            { x: 180, y: 340, s: 1.3 },
            { x: 940, y: 310, s: 1.4 },
            { x: 600, y: 60, s: 1.5 },
            { x: 90, y: 480, s: 1.2 },
            { x: 1100, y: 460, s: 1.3 }
          ].map((st, i) => (
            <g key={`diamond-star-${i}`} transform={`translate(${st.x}, ${st.y}) scale(${st.s})`}>
              <circle cx="0" cy="0" r="8" fill="url(#starGlow)" opacity="0.8" />
              <polygon
                points="0,-10 2.8,-2.8 10,0 2.8,2.8 0,10 -2.8,2.8 -10,0 -2.8,-2.8"
                fill="#FFFDF5"
              />
              <circle cx="0" cy="0" r="1.8" fill="#FCE2A6" />
            </g>
          ))}

          {/* Multi-sized Twinkling Starlight Field */}
          {[
            { cx: 70, cy: 70, r: 1.8, delay: 0 },
            { cx: 120, cy: 200, r: 2.2, delay: 1.2 },
            { cx: 210, cy: 240, r: 1.5, delay: 0.8 },
            { cx: 290, cy: 60, r: 2.4, delay: 2.1 },
            { cx: 380, cy: 230, r: 1.7, delay: 1.5 },
            { cx: 460, cy: 80, r: 2.0, delay: 0.4 },
            { cx: 530, cy: 160, r: 1.8, delay: 2.5 },
            { cx: 640, cy: 50, r: 2.3, delay: 1.1 },
            { cx: 690, cy: 190, r: 1.6, delay: 0.7 },
            { cx: 770, cy: 140, r: 2.2, delay: 1.9 },
            { cx: 850, cy: 55, r: 1.8, delay: 2.3 },
            { cx: 930, cy: 180, r: 2.1, delay: 0.9 },
            { cx: 1010, cy: 70, r: 2.5, delay: 1.4 },
            { cx: 1110, cy: 160, r: 1.8, delay: 2.0 },
            { cx: 1150, cy: 90, r: 2.2, delay: 0.3 },
            { cx: 90, cy: 380, r: 2.0, delay: 1.7 },
            { cx: 280, cy: 430, r: 1.6, delay: 0.6 },
            { cx: 490, cy: 370, r: 2.1, delay: 2.4 },
            { cx: 720, cy: 420, r: 1.9, delay: 1.0 },
            { cx: 870, cy: 400, r: 2.3, delay: 1.8 },
            { cx: 1040, cy: 390, r: 1.7, delay: 0.5 },
            { cx: 1130, cy: 490, r: 2.1, delay: 2.2 }
          ].map((s, idx) => (
            <circle
              key={`twinkle-dot-${idx}`}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill={idx % 3 === 0 ? '#FDE68A' : '#FFFDF5'}
              className="animate-pulse"
              style={{
                animationDuration: `${2.0 + (idx % 4) * 0.7}s`,
                animationDelay: `${s.delay}s`
              }}
            />
          ))}

          {/* ========================================================= */}
          {/* RADIANT CRESCENT MOON (SHASHI / CHANDRA)                 */}
          {/* ========================================================= */}
          <g transform="translate(600, 140)">
            {/* Multi-layered Soft Moon Halo */}
            <circle cx="0" cy="0" r="70" fill="url(#celestialMoonAura)" opacity="0.65" />
            <circle cx="0" cy="0" r="45" fill="url(#celestialMoonAura)" opacity="0.85" />
            
            {/* Brilliant Moon Crescent */}
            <circle cx="0" cy="0" r="26" fill="#FFFDF5" />
            <circle cx="11" cy="-5" r="23" fill="#040F27" />

            {/* Auspicious Golden Sparkle Beside Crescent */}
            <polygon
              points="16,16 19,21 24,23 19,25 16,30 14,25 9,23 14,21"
              fill="#FDE68A"
              opacity="0.95"
            />
          </g>

          {/* ========================================================= */}
          {/* TRADITIONAL FLOATING SKY LANTERNS (FANUSH)               */}
          {/* ========================================================= */}
          {[
            { x: 220, y: 220, s: 1.1, dur: '5.5s', delay: '0s' },
            { x: 860, y: 190, s: 1.2, dur: '6.2s', delay: '1.2s' },
            { x: 520, y: 110, s: 0.9, dur: '7.0s', delay: '2.5s' },
            { x: 1020, y: 280, s: 0.85, dur: '5.8s', delay: '0.8s' }
          ].map((fan, i) => (
            <g
              key={`fanush-${i}`}
              transform={`translate(${fan.x}, ${fan.y}) scale(${fan.s})`}
              className="animate-bounce"
              style={{ animationDuration: fan.dur, animationDelay: fan.delay }}
            >
              {/* Lantern Glow */}
              <circle cx="6" cy="9" r="14" fill="#FF9800" opacity="0.25" />
              {/* Lantern Body */}
              <rect x="0" y="0" width="12" height="18" rx="4" fill="#FFA726" opacity="0.9" stroke="#FFD54F" strokeWidth="1" />
              <rect x="2" y="3" width="8" height="12" rx="2" fill="#FFCC80" opacity="0.9" />
              {/* Inner Flame Core */}
              <circle cx="6" cy="14" r="2.5" fill="#FFFDF5" />
            </g>
          ))}
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. LAYER 1: BILLOWING MOONLIT CIRRUS STREAMERS (High Altitude, Drifting R)*/}
      {/* ========================================================================= */}
      <motion.div
        className="absolute top-1 sm:top-2 left-0 w-[200%] h-16 xs:h-24 sm:h-48 md:h-64 pointer-events-none opacity-40 sm:opacity-75"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 2400 320" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cloudStreamerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.75" />
              <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#040E26" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="url(#cloudStreamerGrad)" stroke="#FEF08A" strokeWidth="1" strokeOpacity="0.5">
            {/* Repeated Seamless Pattern 1: 0-1200 */}
            <path d="M 0 130 C 90 90, 180 80, 270 110 C 370 60, 480 70, 580 115 C 680 65, 800 70, 910 110 C 1010 75, 1120 85, 1200 130 L 1200 280 L 0 280 Z" />
            {/* Repeated Seamless Pattern 2: 1200-2400 */}
            <path d="M 1200 130 C 1290 90, 1380 80, 1470 110 C 1570 60, 1680 70, 1780 115 C 1880 65, 2000 70, 2110 110 C 2210 75, 2320 85, 2400 130 L 2400 280 L 1200 280 Z" />
          </g>
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. LAYER 2: MAJESTIC BILLOWING GOLDEN CUMULUS CLOUDS (Mid Sky, Drifting L) */}
      {/* ========================================================================= */}
      <motion.div
        className="absolute top-12 sm:top-20 md:top-24 left-0 w-[200%] h-20 xs:h-28 sm:h-56 md:h-72 pointer-events-none opacity-45 sm:opacity-80"
        animate={{
          x: ['-50%', '0%']
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 2400 380" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cloudCumulusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="20%" stopColor="#FFFBEB" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#FDE68A" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#040E26" stopOpacity="0" />
            </linearGradient>
            <filter id="cloudLobeGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#FDE68A" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Group 1: 0 - 1200 */}
          <g fill="url(#cloudCumulusGrad)" stroke="#FDE68A" strokeWidth="1.4" strokeOpacity="0.6" filter="url(#cloudLobeGlow)">
            {/* Puffy multi-lobed cloud arches */}
            <path d="M 0 220 
                     C 30 170, 90 150, 140 185 
                     C 180 130, 270 120, 320 165 
                     C 360 100, 460 90, 520 150 
                     C 570 110, 660 115, 710 165 
                     C 760 125, 850 130, 890 180 
                     C 940 140, 1030 150, 1070 195 
                     C 1120 160, 1180 170, 1200 220 
                     L 1200 360 L 0 360 Z" />

            {/* Group 2: 1200 - 2400 (Exact seamless match) */}
            <path d="M 1200 220 
                     C 1230 170, 1290 150, 1340 185 
                     C 1380 130, 1470 120, 1520 165 
                     C 1560 100, 1660 90, 1720 150 
                     C 1770 110, 1860 115, 1910 165 
                     C 1960 125, 2050 130, 2090 180 
                     C 2140 140, 2230 150, 2270 195 
                     C 2320 160, 2380 170, 2400 220 
                     L 2400 360 L 1200 360 Z" />
          </g>
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. LAYER 3: LOWER ATMOSPHERIC ROLLING CLOUD FORMATIONS (Drifting R)       */}
      {/* ========================================================================= */}
      <motion.div
        className="absolute top-28 sm:top-52 md:top-64 left-0 w-[200%] h-24 xs:h-32 sm:h-60 md:h-76 pointer-events-none opacity-40 sm:opacity-75"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 2400 360" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cloudLowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#040E26" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="url(#cloudLowerGrad)" stroke="#FCE2A6" strokeWidth="1.2" strokeOpacity="0.6">
            {/* Pattern 1 */}
            <path d="M 0 230 
                     C 70 170, 160 170, 220 210 
                     C 280 155, 390 150, 460 200 
                     C 530 140, 650 145, 720 195 
                     C 800 150, 910 155, 970 210 
                     C 1040 170, 1140 180, 1200 230 
                     L 1200 350 L 0 350 Z" />
            {/* Pattern 2 */}
            <path d="M 1200 230 
                     C 1270 170, 1360 170, 1420 210 
                     C 1480 155, 1590 150, 1660 200 
                     C 1730 140, 1850 145, 1920 195 
                     C 2000 150, 2110 155, 2170 210 
                     C 2240 170, 2340 180, 2400 230 
                     L 2400 350 L 1200 350 Z" />
          </g>
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 5. GENTLE HORIZON BLEND (Fades naturally into the scene)                  */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020512] via-[#040E26]/85 to-transparent pointer-events-none" />
    </div>
  );
};
