import React from 'react';
import { motion } from 'motion/react';

interface CelestialCloudSkyProps {
  className?: string;
  children?: React.ReactNode;
}

// Mobile-responsive star coordinates distributed across the celestial canvas
const BACKGROUND_STARS = [
  // Upper sky background stars (visible even during curtain opening)
  { id: 'bg-1', left: '10%', top: '4%', size: 2.0, delay: 0.2, type: 'dot', color: '#FFFDF5' },
  { id: 'bg-2', left: '22%', top: '8%', size: 2.8, delay: 1.1, type: 'diamond', color: '#FDE68A' },
  { id: 'bg-3', left: '48%', top: '5%', size: 1.8, delay: 2.3, type: 'dot', color: '#FFF8E7' },
  { id: 'bg-4', left: '72%', top: '7%', size: 2.6, delay: 0.8, type: 'diamond', color: '#FEF08A' },
  { id: 'bg-5', left: '88%', top: '10%', size: 2.0, delay: 1.7, type: 'dot', color: '#FFFDF5' },
  { id: 'bg-6', left: '35%', top: '12%', size: 1.6, delay: 0.5, type: 'dot', color: '#FDE68A' },
  { id: 'bg-7', left: '60%', top: '14%', size: 2.4, delay: 2.0, type: 'diamond', color: '#FFF8E7' },
];

const STAGE_STARS = [
  // Upper Sky Stars (around & above the crescent moon)
  { id: 1, left: '14%', top: '6%', size: 2.4, delay: 0.3, type: 'dot', color: '#FFFDF5' },
  { id: 2, left: '28%', top: '10%', size: 3.2, delay: 1.2, type: 'diamond', color: '#FDE68A' },
  { id: 3, left: '44%', top: '8%', size: 1.9, delay: 2.1, type: 'dot', color: '#FFF8E7' },
  { id: 4, left: '68%', top: '12%', size: 3.0, delay: 0.7, type: 'diamond', color: '#FEF08A' },
  { id: 5, left: '86%', top: '6%', size: 2.2, delay: 1.5, type: 'dot', color: '#FFFDF5' },
  { id: 6, left: '8%', top: '18%', size: 2.6, delay: 0.4, type: 'dot', color: '#FDE68A' },
  { id: 7, left: '34%', top: '16%', size: 1.8, delay: 2.5, type: 'dot', color: '#FFFDF5' },

  // Mid Sky Stars (framing the drifting clouds)
  { id: 8, left: '16%', top: '30%', size: 3.4, delay: 1.3, type: 'diamond', color: '#FFFDF5' },
  { id: 9, left: '82%', top: '26%', size: 2.4, delay: 0.5, type: 'dot', color: '#FDE68A' },
  { id: 10, left: '92%', top: '34%', size: 2.0, delay: 2.0, type: 'dot', color: '#FFF8E7' },
  { id: 11, left: '9%', top: '42%', size: 2.8, delay: 1.8, type: 'diamond', color: '#FEF08A' },
  { id: 12, left: '26%', top: '38%', size: 1.6, delay: 0.9, type: 'dot', color: '#FFFDF5' },
  { id: 13, left: '74%', top: '44%', size: 2.5, delay: 1.4, type: 'dot', color: '#FDE68A' },
  { id: 14, left: '50%', top: '32%', size: 2.0, delay: 2.7, type: 'dot', color: '#FFF8E7' },

  // Lower Sky Stars (twinkling above horizon mist)
  { id: 15, left: '15%', top: '56%', size: 2.2, delay: 2.3, type: 'dot', color: '#FFF8E7' },
  { id: 16, left: '84%', top: '60%', size: 3.0, delay: 0.8, type: 'diamond', color: '#FFFDF5' },
  { id: 17, left: '24%', top: '66%', size: 1.8, delay: 1.6, type: 'dot', color: '#FDE68A' },
  { id: 18, left: '68%', top: '70%', size: 2.2, delay: 1.9, type: 'dot', color: '#FFFDF5' },
  { id: 19, left: '38%', top: '74%', size: 1.7, delay: 0.4, type: 'dot', color: '#FEF08A' },
  { id: 20, left: '88%', top: '78%', size: 2.6, delay: 1.7, type: 'dot', color: '#FFF8E7' },
  { id: 21, left: '12%', top: '82%', size: 2.0, delay: 2.6, type: 'dot', color: '#FDE68A' },
  { id: 22, left: '56%', top: '84%', size: 1.8, delay: 1.1, type: 'dot', color: '#FFFDF5' },
];

export const CelestialCloudSky: React.FC<CelestialCloudSkyProps> = ({ className = '', children }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* ========================================================================= */}
      {/* 1. LAYER 0: Deep Midnight Royal Sky Gradient (Full section backdrop)      */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020512] via-[#040E26] to-[#0A1630]" />

      {/* ========================================================================= */}
      {/* 2. LAYER 1: Deep Background Stars (Visible throughout opening sequence)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {BACKGROUND_STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 6px ${star.color}99`,
              animationDuration: `${2 + (Number(star.id.slice(-1)) % 3) * 0.8}s`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. REVEALED CELESTIAL STAGE: Offset for Curtain Scroll Threshold (240px)   */}
      {/*    Begins at top: 260px on mobile, 240px on desktop so all celestial       */}
      {/*    elements are framed right in the viewport once curtains are parted.     */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 top-[260px] sm:top-[240px] bottom-0 overflow-hidden pointer-events-none">

        {/* ----------------------------------------------------------------------- */}
        {/* A. Soft Ambient Cosmic Nebula Glow behind Moon (z-[2])                  */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute -top-6 sm:top-2 right-1 sm:right-10 md:right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(circle, rgba(253, 230, 138, 0.16) 0%, rgba(245, 158, 11, 0.08) 45%, rgba(4, 14, 38, 0) 70%)',
            filter: 'blur(32px)'
          }}
        />

        {/* ----------------------------------------------------------------------- */}
        {/* B. Auspicious Nakshatra Constellations with responsive scaling (z-[3])  */}
        {/* ----------------------------------------------------------------------- */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 sm:opacity-50 pointer-events-none z-[3]"
          viewBox="0 0 850 650"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Saptarshi / Sacred Seven Rishis (Ursa Major) in Upper-Left Sky */}
          <g>
            <polyline
              points="70,95 125,70 185,105 245,80 295,120 300,175 240,170 245,80"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="0.9"
              strokeDasharray="3 4"
            />
            {/* Glowing Constellation Star Nodes */}
            {[
              [70, 95], [125, 70], [185, 105], [245, 80],
              [295, 120], [300, 175], [240, 170]
            ].map(([cx, cy], i) => (
              <g key={`saptarshi-node-${i}`}>
                <circle cx={cx} cy={cy} r="5" fill="#FDE68A" fillOpacity="0.25" />
                <circle cx={cx} cy={cy} r="2.2" fill="#FFFDF5" />
              </g>
            ))}
          </g>

          {/* Rohini / Sacred Wedding Nakshatra in Upper-Mid / Right Sky */}
          <g>
            <polyline
              points="540,220 590,185 650,225 700,195 675,265"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            {[
              [540, 220], [590, 185], [650, 225], [700, 195], [675, 265]
            ].map(([cx, cy], i) => (
              <g key={`rohini-node-${i}`}>
                <circle cx={cx} cy={cy} r="4" fill="#FDE68A" fillOpacity="0.2" />
                <circle cx={cx} cy={cy} r="2" fill="#FFFDF5" />
              </g>
            ))}
          </g>
        </svg>

        {/* ----------------------------------------------------------------------- */}
        {/* C. Twinkling Stars in the Celestial Stage (z-[4])                       */}
        {/* ----------------------------------------------------------------------- */}
        <div className="absolute inset-0 pointer-events-none z-[4]">
          {STAGE_STARS.map((star) => (
            <div
              key={`stage-star-${star.id}`}
              className="absolute"
              style={{
                left: star.left,
                top: star.top,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {star.type === 'diamond' ? (
                // 4-Pointed Diamond Twinkle Star
                <div
                  className="relative flex items-center justify-center animate-pulse"
                  style={{
                    animationDuration: `${2.2 + (star.id % 3) * 0.8}s`,
                    animationDelay: `${star.delay}s`
                  }}
                >
                  <div
                    className="absolute w-6 h-6 rounded-full blur-[3px]"
                    style={{ backgroundColor: `${star.color}40` }}
                  />
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <polygon
                      points="7,0 8.5,5.5 14,7 8.5,8.5 7,14 5.5,8.5 0,7 5.5,5.5"
                      fill={star.color}
                    />
                    <circle cx="7" cy="7" r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>
              ) : (
                // Radiant Soft Twinkling Dot
                <div
                  className="rounded-full animate-pulse"
                  style={{
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    backgroundColor: star.color,
                    boxShadow: `0 0 8px ${star.color}aa`,
                    animationDuration: `${1.8 + (star.id % 4) * 0.6}s`,
                    animationDelay: `${star.delay}s`
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* D. RADIANT CRESCENT MOON & EVENING STAR (z-[10])                        */}
        {/*    Placed near the top of the revealed viewport on mobile & desktop     */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute top-4 sm:top-8 right-5 sm:right-14 md:right-20 z-[10] pointer-events-none flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
        >
          {/* Outer Lunar Corona Halos */}
          <div
            className="absolute -inset-8 sm:-inset-12 rounded-full pointer-events-none animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(245, 158, 11, 0.2) 42%, rgba(217, 119, 6, 0.05) 68%, transparent 80%)',
              animationDuration: '3.5s'
            }}
          />
          <div
            className="absolute -inset-2 sm:-inset-4 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 253, 245, 0.75) 0%, rgba(253, 230, 138, 0.35) 50%, transparent 80%)'
            }}
          />

          {/* Vector Crescent Moon with Defs and Auspicious Shukra Star */}
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_0_18px_rgba(254,240,138,0.9)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="crescentGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFFDF5" />
                <stop offset="55%" stopColor="#FEF08A" />
                <stop offset="85%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <radialGradient id="moonGlowAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Golden Ambient Aura Behind Moon */}
            <circle cx="50" cy="50" r="46" fill="url(#moonGlowAura)" opacity="0.8" />

            {/* Subtle Dark Silhouette of Moon Sphere */}
            <circle cx="50" cy="50" r="34" fill="#040E26" fillOpacity="0.5" />

            {/* Crescent Path with Radiant Ivory & Warm Gold Fill */}
            <path
              d="M 50 14 
                 C 69.8 14, 86 30.2, 86 50 
                 C 86 69.8, 69.8 86, 50 86 
                 C 42 86, 34.6 83.4, 28.5 79 
                 C 45 76, 57.5 61.5, 57.5 44 
                 C 57.5 31.2, 50 20.2, 39 15.2 
                 C 42.5 14.4, 46.2 14, 50 14 Z"
              fill="url(#crescentGoldGrad)"
              stroke="#FFFDF5"
              strokeWidth="0.8"
            />

            {/* Auspicious Evening Star (Venus / Shukra) nestled beside Crescent */}
            <g transform="translate(23, 41)">
              <polygon
                points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
                fill="#FFFFFF"
              />
              <circle cx="0" cy="0" r="1.6" fill="#FDE68A" />
            </g>
          </svg>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* E. CLOUD LAYER 1: HIGH-ALTITUDE MOONLIT CIRRUS VEIL (z-[15])            */}
        {/*    Wispy, semi-transparent veil drifting across the upper sky           */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          className="absolute top-[10%] sm:top-[8%] left-0 w-[200%] h-36 sm:h-48 md:h-56 pointer-events-none z-[15]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
            opacity: 0.45
          }}
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 1600 240" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cirrusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.45" />
                <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#040E26" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 140 
                 C 80 80, 160 70, 240 100 
                 C 340 50, 460 60, 540 95 
                 C 620 60, 720 70, 800 110 
                 C 880 80, 960 70, 1040 100 
                 C 1140 50, 1260 60, 1340 95 
                 C 1420 60, 1520 70, 1600 110 
                 L 1600 240 L 0 240 Z"
              fill="url(#cirrusGrad)"
            />
          </svg>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* F. FLOATING LANTERNS SLOT (z-[20])                                      */}
        {/*    Drifts upwards between the cirrus veil and mid-cumulus clouds        */}
        {/* ----------------------------------------------------------------------- */}
        {children && (
          <div className="absolute inset-0 pointer-events-none z-[20]">
            {children}
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* G. CLOUD LAYER 2: MID-SKY MOONLIT CUMULUS (z-[25])                      */}
        {/*    Billowing voluminous clouds with warm gold and silver rim highlights */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          className="absolute top-[42%] sm:top-[38%] left-0 w-[200%] h-56 sm:h-72 md:h-84 pointer-events-none z-[25]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            opacity: 0.65
          }}
          animate={{
            x: ['-50%', '0%']
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 1600 320" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cumulusMoonlitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="18%" stopColor="#FFFBEB" stopOpacity="0.75" />
                <stop offset="42%" stopColor="#FDE68A" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#D97706" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#040E26" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main billowing cloud shape (Repeats seamlessly at x=800) */}
            <path
              d="M 0 200 
                 C 50 130, 110 110, 170 145 
                 C 220 90, 310 75, 380 125 
                 C 430 65, 530 60, 600 115 
                 C 660 75, 740 85, 800 150 
                 C 850 130, 910 110, 970 145 
                 C 1020 90, 1110 75, 1180 125 
                 C 1230 65, 1330 60, 1400 115 
                 C 1460 75, 1540 85, 1600 150 
                 L 1600 320 L 0 320 Z"
              fill="url(#cumulusMoonlitGrad)"
            />

            {/* Soft secondary depth puff */}
            <path
              d="M 0 230 
                 C 80 170, 160 160, 230 195 
                 C 300 140, 420 135, 490 180 
                 C 570 130, 690 140, 760 190 
                 C 800 165, 840 170, 880 195 
                 C 950 140, 1070 135, 1140 180 
                 C 1220 130, 1340 140, 1410 190 
                 C 1480 160, 1560 165, 1600 200 
                 L 1600 320 L 0 320 Z"
              fill="url(#cirrusGrad)"
              opacity="0.55"
            />
          </svg>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* H. CLOUD LAYER 3: LOWER HORIZON MIST & WARM AMBER HAZE (z-[30])         */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          className="absolute bottom-0 left-0 w-[200%] h-40 sm:h-52 md:h-60 pointer-events-none z-[30]"
          style={{
            maskImage: 'linear-gradient(to top, black 25%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 25%, transparent 100%)',
            opacity: 0.55
          }}
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 1600 260" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="horizonMistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.75" />
                <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#040E26" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 160 
                 C 90 100, 190 90, 270 130 
                 C 360 80, 480 75, 570 120 
                 C 660 85, 750 95, 800 150 
                 C 890 100, 990 90, 1070 130 
                 C 1160 80, 1280 75, 1370 120 
                 C 1460 85, 1550 95, 1600 150 
                 L 1600 260 L 0 260 Z"
              fill="url(#horizonMistGrad)"
            />
          </svg>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SECTION BOTTOM TRANSITION VIGNETTE (z-[35])                            */}
      {/*    Melts smoothly into the deep navy royal wedding invitation section      */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#020512] via-[#020512]/65 to-transparent pointer-events-none z-[35]" />
    </div>
  );
};
