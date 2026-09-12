import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Landmark } from 'lucide-react';
import { Language } from '../types';

interface VictoriaMemorialSectionProps {
  language: Language;
}

export const VictoriaMemorialSection: React.FC<VictoriaMemorialSectionProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax transformations calibrated for smooth, cinematic scrolling
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.98]);

  // Distinct parallax layer depths
  const skyY = useTransform(scrollYProgress, [0, 1], [-12, 16]);
  const monumentY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [8, -10]);

  // Horse carriage (Ghoda Gari) moving across the promenade path driven smoothly by scroll
  const carriageX = useTransform(scrollYProgress, [0, 1], [-160, 240]);

  // Trilingual titles
  const badgeTitle = {
    en: 'Victoria Memorial • Kolkata',
    bn: 'ভিক্টোরিয়া মেমোরিয়াল • কলকাতা',
    hi: 'विक्टोरिया मेमोरियल • कोलकाता'
  }[language];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pointer-events-none my-6 sm:my-10 select-none"
    >
      {/* Soft gradient masks at top & bottom so it integrates seamlessly into the page */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-b from-[#050E24] via-[#050E24]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-[#050E24] via-[#050E24]/80 to-transparent z-20 pointer-events-none" />

      {/* Main Parallax Animated Canvas Container */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="relative w-full max-w-5xl mx-auto px-2 sm:px-4"
      >
        {/* Cultural Header Badge */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-[#1A0206]/92 backdrop-blur-md border border-[#D4AF37]/55 shadow-xl text-[#FCE2A6] text-xs sm:text-sm font-serif">
            <Landmark className="w-3.5 h-3.5 text-[#F7D070] shrink-0" />
            <span className="font-bold tracking-wider">
              {badgeTitle}
            </span>
            <Sparkles className="w-3 h-3 text-[#F7D070] animate-pulse shrink-0" />
          </div>
        </div>

        {/* Responsive Atmospheric Canvas Box */}
        <div className="relative w-full h-[230px] xs:h-[270px] sm:h-[330px] md:h-[380px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#060F26] via-[#0D1C3D] to-[#040914] border border-[#D4AF37]/45 shadow-[0_16px_40px_rgba(0,0,0,0.88)]">

          {/* ========================================================================= */}
          {/* LAYER 1: TWILIGHT SKY, GLOWING CRESCENT MOON & TWINKLING STARS             */}
          {/* ========================================================================= */}
          <motion.div style={{ y: skyY }} className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1000 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="vmMoonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="vmSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#040817" />
                  <stop offset="50%" stopColor="#0A1838" />
                  <stop offset="85%" stopColor="#152A56" />
                  <stop offset="100%" stopColor="#253E6B" />
                </linearGradient>
                <radialGradient id="vmDomeLightAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="1000" height="480" fill="url(#vmSkyGrad)" />

              {/* Luminous "VICTORIA" Inscription Across The Night Sky Behind The Memorial */}
              <text
                x="500"
                y="115"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="56"
                fontWeight="bold"
                letterSpacing="18"
                fill="#FFF8E7"
                fillOpacity="0.32"
                stroke="#D4AF37"
                strokeWidth="1"
                strokeOpacity="0.4"
              >
                VICTORIA
              </text>

              {/* Twinkling Night Stars */}
              {[
                { cx: 70, cy: 35, r: 1.2 },
                { cx: 130, cy: 75, r: 0.9 },
                { cx: 210, cy: 45, r: 1.4 },
                { cx: 290, cy: 80, r: 0.8 },
                { cx: 380, cy: 30, r: 1.3 },
                { cx: 460, cy: 65, r: 1.0 },
                { cx: 580, cy: 40, r: 1.1 },
                { cx: 660, cy: 75, r: 1.3 },
                { cx: 730, cy: 25, r: 0.9 },
                { cx: 820, cy: 55, r: 1.4 },
                { cx: 910, cy: 35, r: 1.1 },
                { cx: 950, cy: 85, r: 0.8 },
                { cx: 160, cy: 110, r: 1.0 },
                { cx: 860, cy: 105, r: 1.2 }
              ].map((st, i) => (
                <circle
                  key={`vm-star-${i}`}
                  cx={st.cx}
                  cy={st.cy}
                  r={st.r}
                  fill="#FFF8E7"
                  opacity={0.55 + (i % 3) * 0.2}
                />
              ))}

              {/* Glowing Crescent Moon */}
              <circle cx="870" cy="70" r="36" fill="url(#vmMoonGlow)" opacity="0.6" />
              <circle cx="870" cy="70" r="16" fill="#FFF8E7" />
              <circle cx="877" cy="67" r="14" fill="#09142E" />

              {/* Soft warm illumination aura directly behind Victoria Memorial central dome */}
              <circle cx="500" cy="180" r="140" fill="url(#vmDomeLightAura)" />
            </svg>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 2: VICTORIA MEMORIAL MONUMENT (WHITE MAKRANA MARBLE ILLUMINATED)    */}
          {/* ========================================================================= */}
          <motion.div style={{ y: monumentY }} className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1000 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                {/* Marble Shading Gradients */}
                <linearGradient id="marbleLit" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F3F4F6" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <linearGradient id="marbleGoldLit" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="60%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>
                <linearGradient id="marbleShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>

              {/* Background Silhouette of Distant Maidan Trees */}
              <g fill="#0B1A38" opacity="0.85">
                <path d="M 0 310 Q 50 285 110 310 Q 180 290 250 312 Q 330 288 400 310 L 400 330 L 0 330 Z" />
                <path d="M 600 310 Q 670 288 750 312 Q 820 290 890 310 Q 950 285 1000 310 L 1000 330 L 600 330 Z" />
              </g>

              {/* ------------------------------------------------------------- */}
              {/* MONUMENT STRUCTURE BASE PLINTH & STEPS                         */}
              {/* ------------------------------------------------------------- */}
              {/* Grand Foundation Terrace */}
              <rect x="170" y="295" width="660" height="15" rx="1" fill="url(#marbleLit)" stroke="#94A3B8" strokeWidth="0.8" />
              <rect x="200" y="286" width="600" height="9" fill="url(#marbleLit)" stroke="#94A3B8" strokeWidth="0.8" />
              {/* Base Balustrades and Corner Pedestals */}
              <rect x="165" y="280" width="30" height="16" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              <rect x="805" y="280" width="30" height="16" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />

              {/* ------------------------------------------------------------- */}
              {/* LEFT & RIGHT SIDE WINGS (COLONNADED GALLERIES)                 */}
              {/* ------------------------------------------------------------- */}
              {/* Left Wing Gallery Body */}
              <rect x="230" y="225" width="220" height="61" fill="url(#marbleGoldLit)" stroke="#64748B" strokeWidth="0.8" />
              {/* Left Wing Columns */}
              {[240, 260, 280, 300, 320, 340, 360, 380, 400, 420].map((colX, idx) => (
                <g key={`l-col-${idx}`}>
                  <rect x={colX} y="235" width="6.5" height="50" fill="url(#marbleLit)" stroke="#94A3B8" strokeWidth="0.5" />
                  {/* Arched window behind columns glowing with evening palace lights */}
                  {idx % 2 === 0 && (
                    <path
                      d={`M ${colX + 9} 248 Q ${colX + 13} 240 ${colX + 17} 248 L ${colX + 17} 278 L ${colX + 9} 278 Z`}
                      fill="url(#windowGlow)"
                      opacity="0.85"
                    />
                  )}
                </g>
              ))}
              {/* Left Wing Roof Balustrade & Cornice */}
              <rect x="225" y="220" width="230" height="6" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              <rect x="228" y="214" width="224" height="6" fill="#F8FAFC" opacity="0.9" />

              {/* Left Corner Subsidiary Dome (Chattri) */}
              <rect x="220" y="196" width="36" height="24" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              {/* Left Corner Mini Dome */}
              <path d="M 220 196 Q 238 168 256 196 Z" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              <rect x="236" y="162" width="4" height="6" fill="#D4AF37" />
              <circle cx="238" cy="160" r="2.5" fill="#D4AF37" />

              {/* Right Wing Gallery Body */}
              <rect x="550" y="225" width="220" height="61" fill="url(#marbleGoldLit)" stroke="#64748B" strokeWidth="0.8" />
              {/* Right Wing Columns */}
              {[560, 580, 600, 620, 640, 660, 680, 700, 720, 740].map((colX, idx) => (
                <g key={`r-col-${idx}`}>
                  <rect x={colX} y="235" width="6.5" height="50" fill="url(#marbleLit)" stroke="#94A3B8" strokeWidth="0.5" />
                  {/* Arched window behind columns glowing with evening palace lights */}
                  {idx % 2 === 0 && (
                    <path
                      d={`M ${colX + 9} 248 Q ${colX + 13} 240 ${colX + 17} 248 L ${colX + 17} 278 L ${colX + 9} 278 Z`}
                      fill="url(#windowGlow)"
                      opacity="0.85"
                    />
                  )}
                </g>
              ))}
              {/* Right Wing Roof Balustrade & Cornice */}
              <rect x="545" y="220" width="230" height="6" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              <rect x="548" y="214" width="224" height="6" fill="#F8FAFC" opacity="0.9" />

              {/* Right Corner Subsidiary Dome (Chattri) */}
              <rect x="744" y="196" width="36" height="24" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              {/* Right Corner Mini Dome */}
              <path d="M 744 196 Q 762 168 780 196 Z" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              <rect x="760" y="162" width="4" height="6" fill="#D4AF37" />
              <circle cx="762" cy="160" r="2.5" fill="#D4AF37" />

              {/* ------------------------------------------------------------- */}
              {/* CENTRAL GRAND PORTICO & CENTRAL COLONNADE                     */}
              {/* ------------------------------------------------------------- */}
              {/* Elevated Central Facade */}
              <rect x="420" y="200" width="160" height="86" fill="url(#marbleGoldLit)" stroke="#64748B" strokeWidth="1" />
              
              {/* Grand Classical Arched Entrance Archway */}
              <path
                d="M 465 286 L 465 235 Q 500 215 535 235 L 535 286 Z"
                fill="#152445"
                stroke="#D4AF37"
                strokeWidth="1.2"
              />
              {/* Warm Palace Chandelier Glow in Entrance Portal */}
              <path
                d="M 473 286 L 473 242 Q 500 225 527 242 L 527 286 Z"
                fill="url(#windowGlow)"
                opacity="0.9"
              />

              {/* Central Monument Columns (Corinthian Style Fluted Pillars) */}
              {[435, 450, 545, 560].map((cx, i) => (
                <rect
                  key={`cent-col-${i}`}
                  x={cx}
                  y="210"
                  width="7.5"
                  height="76"
                  fill="url(#marbleLit)"
                  stroke="#94A3B8"
                  strokeWidth="0.6"
                />
              ))}

              {/* Triangular Classical Pediment with Carvings */}
              <polygon points="415,200 500,168 585,200" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="1.2" />
              <polygon points="430,198 500,174 570,198" fill="#F8FAFC" opacity="0.8" stroke="#D4AF37" strokeWidth="0.6" />
              {/* Pediment Relief Motif */}
              <circle cx="500" cy="188" r="4.5" fill="#D4AF37" />

              {/* ------------------------------------------------------------- */}
              {/* THE ICONIC CENTRAL DRUM & GRAND WHITE MARBLE DOME             */}
              {/* ------------------------------------------------------------- */}
              {/* Central Octagonal Drum with Pilasters */}
              <rect x="440" y="145" width="120" height="26" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="1" />
              {/* Drum Arched Windows with Golden Illumination */}
              {[452, 472, 492, 512, 532].map((wx, i) => (
                <path
                  key={`drum-win-${i}`}
                  d={`M ${wx} 165 L ${wx} 153 Q ${wx + 6} 148 ${wx + 12} 153 L ${wx + 12} 165 Z`}
                  fill="url(#windowGlow)"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                />
              ))}

              {/* Upper Cornice Ring */}
              <rect x="432" y="140" width="136" height="6" rx="2" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />

              {/* The Grand Central Marble Dome of Victoria Memorial */}
              {/* Base Dome Curve */}
              <path
                d="M 436 140 C 436 90, 460 70, 500 70 C 540 70, 564 90, 564 140 Z"
                fill="url(#marbleLit)"
                stroke="#64748B"
                strokeWidth="1.2"
              />
              {/* Warm Golden Night Light Highlights on Dome Surface */}
              <path
                d="M 450 140 C 450 96, 470 78, 500 78 C 530 78, 550 96, 550 140 Z"
                fill="url(#marbleGoldLit)"
                opacity="0.75"
              />
              {/* Dome Rib Lines */}
              <path d="M 464 140 C 464 98, 480 84, 500 70" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
              <path d="M 536 140 C 536 98, 520 84, 500 70" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
              <path d="M 500 140 L 500 70" fill="none" stroke="#D4AF37" strokeWidth="0.8" />

              {/* Lantern Cupola on Top of the Central Dome */}
              <rect x="492" y="58" width="16" height="12" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.8" />
              <path d="M 490 58 Q 500 48 510 58 Z" fill="#D4AF37" stroke="#B45309" strokeWidth="0.8" />

              {/* ============================================================= */}
              {/* THE FAMOUS 16-FT BRONZE ANGEL OF VICTORY (পরীর মূর্তি)       */}
              {/* Revolving figure holding a trumpet with sparkling aura         */}
              {/* ============================================================= */}
              <g transform="translate(500, 42)">
                <motion.g
                  animate={{
                    rotate: [-3, 3, -3],
                    scale: [1, 1.04, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {/* Sparkling Starlight behind the Angel of Victory */}
                  <circle cx="0" cy="0" r="9" fill="#FDE68A" opacity="0.4" filter="blur(2px)" />
                  {/* Statue Base / Sphere */}
                  <circle cx="0" cy="5" r="2" fill="#D4AF37" />
                  {/* Angel Figure Body */}
                  <path d="M -1 5 L 1 5 L 0 -1 Z" fill="#F7D070" stroke="#AA820A" strokeWidth="0.5" />
                  {/* Angel Head */}
                  <circle cx="0" cy="-3" r="1.5" fill="#FDE68A" />
                  {/* Raised Angel Wings */}
                  <path d="M 0 0 C -4 -4, -6 -2, -4 3 Z" fill="#FDE68A" opacity="0.9" />
                  <path d="M 0 0 C 4 -4, 6 -2, 4 3 Z" fill="#FDE68A" opacity="0.9" />
                  {/* Trumpet Held High */}
                  <line x1="0.5" y1="-2" x2="6" y2="-6" stroke="#D4AF37" strokeWidth="0.8" />
                  <polygon points="5,-7 7,-5 6,-6" fill="#FDE68A" />
                </motion.g>
              </g>

              {/* Two Intermediate Decorative Domes flanking central structure */}
              <g>
                {/* Left intermediate dome */}
                <rect x="390" y="185" width="28" height="15" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.6" />
                <path d="M 390 185 Q 404 165 418 185 Z" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.6" />
                <line x1="404" y1="165" x2="404" y2="159" stroke="#D4AF37" strokeWidth="0.8" />
                {/* Right intermediate dome */}
                <rect x="582" y="185" width="28" height="15" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.6" />
                <path d="M 582 185 Q 596 165 610 185 Z" fill="url(#marbleLit)" stroke="#64748B" strokeWidth="0.6" />
                <line x1="596" y1="165" x2="596" y2="159" stroke="#D4AF37" strokeWidth="0.8" />
              </g>

              {/* Victorian Garden Lampposts on the Monument Terraces (Glowing Golden Warmth) */}
              {[200, 310, 410, 590, 690, 800].map((lx, idx) => (
                <g key={`vm-lamp-${idx}`}>
                  <line x1={lx} y1="280" x2={lx} y2="260" stroke="#1E293B" strokeWidth="1.8" />
                  <circle cx={lx} cy="258" r="6" fill="#FDE68A" opacity="0.35" filter="blur(1.5px)" />
                  <circle cx={lx} cy="258" r="2.2" fill="#FFFBEB" />
                  <path d={`M ${lx - 2} 260 L ${lx} 255 L ${lx + 2} 260 Z`} fill="#0F172A" />
                </g>
              ))}

              {/* Lush Palm Trees Framing the Monument on Left & Right */}
              {/* Left Palm Tree */}
              <g transform="translate(130, 240)">
                <path d="M 0 70 Q -10 35 0 0" fill="none" stroke="#3E2723" strokeWidth="3.5" />
                {[-50, -25, 0, 25, 45].map((angle, pi) => (
                  <path
                    key={`l-palm-${pi}`}
                    d={`M 0 0 Q ${angle * 0.7} -25 ${angle} -10`}
                    fill="none"
                    stroke="#14532D"
                    strokeWidth="2.2"
                  />
                ))}
              </g>
              {/* Right Palm Tree */}
              <g transform="translate(870, 240)">
                <path d="M 0 70 Q 10 35 0 0" fill="none" stroke="#3E2723" strokeWidth="3.5" />
                {[-45, -25, 0, 25, 50].map((angle, pi) => (
                  <path
                    key={`r-palm-${pi}`}
                    d={`M 0 0 Q ${angle * 0.7} -25 ${angle} -10`}
                    fill="none"
                    stroke="#14532D"
                    strokeWidth="2.2"
                  />
                ))}
              </g>
            </svg>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 3: VICTORIA MEMORIAL REFLECTING LAKE WITH SHIMMERING RIPPLES        */}
          {/* ========================================================================= */}
          <motion.div style={{ y: foregroundY }} className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1000 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lakeWater" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B1A38" />
                  <stop offset="40%" stopColor="#08142C" />
                  <stop offset="100%" stopColor="#030814" />
                </linearGradient>
                <radialGradient id="lakeReflectionGlow" cx="50%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.38" />
                  <stop offset="50%" stopColor="#D97706" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#08142C" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Lake Water Surface */}
              <rect x="0" y="325" width="1000" height="155" fill="url(#lakeWater)" />

              {/* Inverted Reflection of the Illuminated Monument & Central Dome in Lake Waters */}
              <g opacity="0.45" filter="blur(2px)">
                {/* Reflected Dome Shimmer */}
                <ellipse cx="500" cy="385" rx="65" ry="35" fill="url(#lakeReflectionGlow)" />
                <ellipse cx="500" cy="420" rx="45" ry="20" fill="#FDE68A" opacity="0.3" />
                {/* Reflected Gallery Lights */}
                <ellipse cx="320" cy="365" rx="70" ry="12" fill="#F59E0B" opacity="0.25" />
                <ellipse cx="680" cy="365" rx="70" ry="12" fill="#F59E0B" opacity="0.25" />
              </g>

              {/* Shimmering Horizontal Water Ripples */}
              {[
                { y: 340, x1: 220, x2: 780, w: 1.2, o: 0.35 },
                { y: 355, x1: 180, x2: 820, w: 1.4, o: 0.4 },
                { y: 370, x1: 120, x2: 880, w: 1.5, o: 0.5 },
                { y: 388, x1: 200, x2: 800, w: 1.6, o: 0.45 },
                { y: 405, x1: 160, x2: 840, w: 1.8, o: 0.55 },
                { y: 425, x1: 100, x2: 900, w: 2.0, o: 0.6 },
                { y: 445, x1: 140, x2: 860, w: 1.8, o: 0.45 },
                { y: 462, x1: 220, x2: 780, w: 1.4, o: 0.3 }
              ].map((rip, idx) => (
                <motion.line
                  key={`vm-rip-${idx}`}
                  x1={rip.x1}
                  y1={rip.y}
                  x2={rip.x2}
                  y2={rip.y}
                  stroke="#FDE68A"
                  strokeWidth={rip.w}
                  opacity={rip.o}
                  strokeDasharray="18 10 32 8"
                  animate={{
                    strokeDashoffset: [0, idx % 2 === 0 ? 60 : -60]
                  }}
                  transition={{
                    duration: 5 + (idx % 3),
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}

              {/* Lakeside Promenade Stone Balustrade */}
              <rect x="0" y="318" width="1000" height="9" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
              {/* Promenade Pathway */}
              <rect x="0" y="310" width="1000" height="8" fill="#334155" />
            </svg>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 4: TRADITIONAL KOLKATA DECORATED HORSE CARRIAGE (GHODA GARI)       */}
          {/* Trotting gracefully along the Maidan promenade, driven smoothly by scroll */}
          {/* ========================================================================= */}
          <motion.div
            style={{ x: carriageX }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Bobbing horse carriage movement */}
            <motion.div
              className="w-full h-full"
              animate={{
                y: [-1.5, 2, -1.5]
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <svg viewBox="0 0 1000 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(380, 280)">
                  {/* Carriage Cast Shadow on Promenade */}
                  <ellipse cx="50" cy="38" rx="85" ry="6" fill="#020617" opacity="0.6" />

                  {/* ------------------------------------------------------------- */}
                  {/* WHITE/GOLD ROYAL CARRIAGE (BUGGY)                             */}
                  {/* ------------------------------------------------------------- */}
                  {/* Carriage Body Shell */}
                  <path
                    d="M 10 18 Q 15 5 45 5 L 85 5 Q 105 5 110 22 L 105 32 Q 95 36 20 36 L 10 18 Z"
                    fill="#FFFBEB"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                  />
                  {/* Carriage Maroon Velvet Upholstery Trim */}
                  <path d="M 22 10 L 82 10 L 80 20 L 24 20 Z" fill="#7F1D1D" stroke="#D4AF37" strokeWidth="0.8" />
                  {/* Golden Carriage Roof Canopy */}
                  <path d="M 12 5 Q 45 -4 88 5 Z" fill="#D4AF37" />
                  {/* Curved Carriage Footrest & Steps */}
                  <path d="M 35 34 L 35 39 L 55 39" fill="none" stroke="#D4AF37" strokeWidth="1.2" />

                  {/* Coachman (Kochwan) Driving the Carriage */}
                  <g transform="translate(90, 8)">
                    <circle cx="0" cy="-6" r="3" fill="#D4AF37" />
                    {/* Turban */}
                    <ellipse cx="0" cy="-7.5" rx="3.5" ry="2" fill="#B91C1C" />
                    <path d="M -3 -3 L 3 -3 L 2 8 L -2 8 Z" fill="#1E293B" />
                    {/* Reins held in hand */}
                    <line x1="2" y1="2" x2="42" y2="4" stroke="#D4AF37" strokeWidth="0.9" />
                  </g>

                  {/* Glowing Carriage Lantern */}
                  <circle cx="8" cy="14" r="6" fill="#FDE68A" opacity="0.4" filter="blur(1px)" />
                  <rect x="6" y="11" width="4" height="6" fill="#FEF3C7" stroke="#92400E" strokeWidth="0.6" />

                  {/* Carriage Wheels (Rotating Motion) */}
                  {/* Rear Large Wheel */}
                  <g transform="translate(30, 32)">
                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <circle cx="0" cy="0" r="13" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
                      <circle cx="0" cy="0" r="2.5" fill="#92400E" />
                      {/* Spokes */}
                      {[0, 45, 90, 135].map((ang, si) => (
                        <line
                          key={`rw-sp-${si}`}
                          x1="-12"
                          y1="0"
                          x2="12"
                          y2="0"
                          stroke="#D4AF37"
                          strokeWidth="0.9"
                          transform={`rotate(${ang})`}
                        />
                      ))}
                    </motion.g>
                  </g>

                  {/* Front Smaller Wheel */}
                  <g transform="translate(85, 33)">
                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                    >
                      <circle cx="0" cy="0" r="10" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
                      <circle cx="0" cy="0" r="2" fill="#92400E" />
                      {/* Spokes */}
                      {[0, 45, 90, 135].map((ang, si) => (
                        <line
                          key={`fw-sp-${si}`}
                          x1="-9"
                          y1="0"
                          x2="9"
                          y2="0"
                          stroke="#D4AF37"
                          strokeWidth="0.9"
                          transform={`rotate(${ang})`}
                        />
                      ))}
                    </motion.g>
                  </g>

                  {/* ------------------------------------------------------------- */}
                  {/* TWO MAJESTIC WHITE ROYAL HORSES WITH FESTIVE PLUMES           */}
                  {/* ------------------------------------------------------------- */}
                  {/* Carriage Shafts / Pole Connecting Horses */}
                  <line x1="88" y1="28" x2="135" y2="24" stroke="#78350F" strokeWidth="1.6" />

                  {/* Horse (Leading Trotting Bengali Wedding Horse) */}
                  <g transform="translate(132, 2)">
                    {/* Horse Body */}
                    <ellipse cx="14" cy="18" rx="16" ry="9" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" />
                    {/* Horse Neck & Head */}
                    <path
                      d="M 24 16 L 32 4 Q 35 0 38 4 L 38 8 L 29 22 Z"
                      fill="#F8FAFC"
                      stroke="#94A3B8"
                      strokeWidth="0.8"
                    />
                    {/* Festive Red & Gold Head Plume */}
                    <ellipse cx="33" cy="-1" rx="2" ry="4" fill="#DC2626" />
                    <circle cx="33" cy="2" r="1.5" fill="#D4AF37" />

                    {/* Mane & Ears */}
                    <polygon points="32,0 34,-3 35,1" fill="#E2E8F0" />
                    {/* Gold Bridle & Harness */}
                    <line x1="30" y1="4" x2="38" y2="6" stroke="#D4AF37" strokeWidth="0.8" />
                    <line x1="14" y1="12" x2="14" y2="24" stroke="#DC2626" strokeWidth="1" />

                    {/* Legs in trotting gait */}
                    {/* Hind Legs */}
                    <line x1="2" y1="24" x2="-2" y2="38" stroke="#E2E8F0" strokeWidth="2" />
                    <line x1="6" y1="24" x2="4" y2="38" stroke="#CBD5E1" strokeWidth="2" />
                    {/* Front Legs */}
                    <line x1="22" y1="24" x2="26" y2="38" stroke="#E2E8F0" strokeWidth="2" />
                    <line x1="27" y1="24" x2="31" y2="36" stroke="#CBD5E1" strokeWidth="2" />

                    {/* Flowing Tail */}
                    <path d="M 0 16 Q -8 20 -6 30" fill="none" stroke="#E2E8F0" strokeWidth="2.2" />
                  </g>
                </g>
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
