import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HowrahBridgeParallaxProps {
  language?: Language;
}

export const HowrahBridgeParallax: React.FC<HowrahBridgeParallaxProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax transforms: responsive depth that won't clip on mobile screens
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.82, 1], [0, 1, 1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.96, 1, 1, 0.98]);

  // Gentle vertical shifts calibrated for both mobile and desktop viewports
  const skyY = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const bridgeY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const riverY = useTransform(scrollYProgress, [0, 1], [8, -12]);
  // Boat translation across the Hooghly river strictly driven by scroll, moving swiftly across the water
  const boatX = useTransform(scrollYProgress, [0, 1], [-140, 220]);
  const boatRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-3, 3, -2, 3, -3]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pointer-events-none my-4 sm:my-8 select-none"
    >
      {/* Feathered gradient masks at top & bottom so it integrates organically into the page */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-16 bg-gradient-to-b from-[#1A0206] via-[#1A0206]/85 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-16 bg-gradient-to-t from-[#1A0206] via-[#1A0206]/85 to-transparent z-20 pointer-events-none" />

      {/* Main Parallax Animated Canvas Container */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="relative w-full max-w-5xl mx-auto px-2 sm:px-4"
      >
        {/* Responsive Atmospheric Canvas Box: Comfortable height on all screen sizes */}
        <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[310px] md:h-[360px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#071329] via-[#122244] to-[#1A0812] border border-[#D4AF37]/45 shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
          
          {/* ========================================================================= */}
          {/* LAYER 1: TWILIGHT SKY, CRESCENT MOON, STARS & FLOATING SKY LANTERNS      */}
          {/* ========================================================================= */}
          <motion.div style={{ y: skyY }} className="absolute inset-0">
            <svg viewBox="0 0 1000 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Crescent Moon */}
              <g transform="translate(860, 35)">
                <circle cx="16" cy="16" r="15" fill="#FFF8E7" opacity="0.95" filter="drop-shadow(0 0 12px #FFD54F)" />
                <circle cx="22" cy="13" r="14" fill="#071329" />
              </g>

              {/* Twinkling Golden Stars */}
              {[
                { cx: 70, cy: 30, r: 1.6 },
                { cx: 140, cy: 60, r: 1.2 },
                { cx: 210, cy: 25, r: 1.8 },
                { cx: 310, cy: 45, r: 1.4 },
                { cx: 420, cy: 20, r: 2.0 },
                { cx: 500, cy: 50, r: 1.2 },
                { cx: 600, cy: 28, r: 1.9 },
                { cx: 700, cy: 55, r: 1.4 },
                { cx: 790, cy: 25, r: 2.1 },
                { cx: 930, cy: 60, r: 1.3 },
                { cx: 120, cy: 85, r: 1.3 },
                { cx: 550, cy: 75, r: 1.5 },
                { cx: 740, cy: 85, r: 1.2 }
              ].map((star, idx) => (
                <circle
                  key={`star-${idx}`}
                  cx={star.cx}
                  cy={star.cy}
                  r={star.r}
                  fill="#FFF3B0"
                  opacity={0.65 + (idx % 3) * 0.15}
                />
              ))}

              {/* Rising Sky Lanterns (Fanush) */}
              <g transform="translate(180, 50)" opacity="0.85">
                <rect x="0" y="0" width="8" height="12" rx="3" fill="#FF8F00" filter="drop-shadow(0 0 8px #FFA000)" />
                <circle cx="4" cy="10" r="1.5" fill="#FFF" />
              </g>
              <g transform="translate(480, 35)" opacity="0.8">
                <rect x="0" y="0" width="7" height="10" rx="2.5" fill="#FF8F00" filter="drop-shadow(0 0 7px #FFA000)" />
                <circle cx="3.5" cy="8" r="1.2" fill="#FFF" />
              </g>
              <g transform="translate(730, 42)" opacity="0.9">
                <rect x="0" y="0" width="9" height="13" rx="3" fill="#FF8F00" filter="drop-shadow(0 0 9px #FFA000)" />
                <circle cx="4.5" cy="11" r="1.5" fill="#FFF" />
              </g>
            </svg>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 2: HOWRAH BRIDGE SUPERSTRUCTURE, TRUSSES, FAIRY LIGHTS & MARIGOLDS */}
          {/* (Coordinates: Towers & Arch live between y: 55 and y: 285)                */}
          {/* ========================================================================= */}
          <motion.div style={{ y: bridgeY }} className="absolute inset-0">
            <svg
              viewBox="0 0 1000 450"
              className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Metallic Gold / Bronze Bridge Shading */}
                <linearGradient id="cantileverGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="35%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#A07810" />
                  <stop offset="100%" stopColor="#5E4305" />
                </linearGradient>

                <linearGradient id="roadDeckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6D3D1B" />
                  <stop offset="50%" stopColor="#4A250E" />
                  <stop offset="100%" stopColor="#2D1405" />
                </linearGradient>

                {/* Glowing Filter for Diwali Fairy Lights */}
                <filter id="fairyGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* --- 1. LEFT CANTILEVER TOWER (Kolkata side) --- */}
              <g id="tower-kolkata" fill="url(#cantileverGold)" stroke="#3E2703" strokeWidth="1.2">
                {/* Main Tapered Piers: base at y=285 (road level), top at y=75 */}
                <polygon points="175,285 195,75 225,75 245,285" />
                {/* Horizontal Cross Struts */}
                <rect x="187" y="115" width="46" height="6" rx="1.5" fill="#F5D77F" />
                <rect x="183" y="160" width="54" height="6" rx="1.5" fill="#F5D77F" />
                <rect x="179" y="215" width="62" height="7" rx="1.5" fill="#F5D77F" />
                {/* Diagonal Lattice X-Bracing */}
                <line x1="195" y1="80" x2="233" y2="115" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="233" y1="80" x2="195" y2="115" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="189" y1="120" x2="239" y2="160" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="239" y1="120" x2="189" y2="160" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="184" y1="166" x2="243" y2="215" stroke="#FFE082" strokeWidth="3" />
                <line x1="243" y1="166" x2="184" y2="215" stroke="#FFE082" strokeWidth="3" />
                {/* Tower Pinnacle Finial */}
                <polygon points="193,75 210,50 227,75" fill="#FFD54F" stroke="#B28704" strokeWidth="1.2" />
              </g>

              {/* --- 2. RIGHT CANTILEVER TOWER (Howrah side) --- */}
              <g id="tower-howrah" fill="url(#cantileverGold)" stroke="#3E2703" strokeWidth="1.2">
                {/* Main Tapered Piers: base at y=285 (road level), top at y=75 */}
                <polygon points="755,285 775,75 805,75 825,285" />
                {/* Horizontal Cross Struts */}
                <rect x="767" y="115" width="46" height="6" rx="1.5" fill="#F5D77F" />
                <rect x="763" y="160" width="54" height="6" rx="1.5" fill="#F5D77F" />
                <rect x="759" y="215" width="62" height="7" rx="1.5" fill="#F5D77F" />
                {/* Diagonal Lattice X-Bracing */}
                <line x1="775" y1="80" x2="813" y2="115" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="813" y1="80" x2="775" y2="115" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="769" y1="120" x2="819" y2="160" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="819" y1="120" x2="769" y2="160" stroke="#FFE082" strokeWidth="2.5" />
                <line x1="764" y1="166" x2="823" y2="215" stroke="#FFE082" strokeWidth="3" />
                <line x1="823" y1="166" x2="764" y2="215" stroke="#FFE082" strokeWidth="3" />
                {/* Tower Pinnacle Finial */}
                <polygon points="773,75 790,50 807,75" fill="#FFD54F" stroke="#B28704" strokeWidth="1.2" />
              </g>

              {/* --- 3. PARABOLIC CANTILEVER UPPER CHORDS --- */}
              {/* Central Suspended Arch: curves down from towers (y:75) to center (y:165) */}
              <path
                d="M 225 75 Q 500 165 775 75"
                fill="none"
                stroke="url(#cantileverGold)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 225 75 Q 500 165 775 75"
                fill="none"
                stroke="#FFF3B0"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Left Anchor Span: sweeps down to Kolkata riverbank */}
              <path
                d="M 195 75 Q 100 155 20 250"
                fill="none"
                stroke="url(#cantileverGold)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 195 75 Q 100 155 20 250"
                fill="none"
                stroke="#FFF3B0"
                strokeWidth="2.2"
              />

              {/* Right Anchor Span: sweeps down to Howrah riverbank */}
              <path
                d="M 805 75 Q 900 155 980 250"
                fill="none"
                stroke="url(#cantileverGold)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 805 75 Q 900 155 980 250"
                fill="none"
                stroke="#FFF3B0"
                strokeWidth="2.2"
              />

              {/* --- 4. WARREN TRUSSES & VERTICAL HANGERS --- */}
              <g stroke="#E6BF48" strokeWidth="3" strokeLinecap="round">
                {/* Center Span Trusses */}
                <line x1="265" y1="90" x2="295" y2="285" />
                <line x1="295" y1="285" x2="340" y2="110" />
                <line x1="340" y1="110" x2="380" y2="285" />
                <line x1="380" y1="285" x2="430" y2="135" />
                <line x1="430" y1="135" x2="470" y2="285" />
                <line x1="470" y1="285" x2="500" y2="148" />
                <line x1="500" y1="148" x2="530" y2="285" />
                <line x1="530" y1="285" x2="570" y2="135" />
                <line x1="570" y1="135" x2="620" y2="285" />
                <line x1="620" y1="285" x2="660" y2="110" />
                <line x1="660" y1="110" x2="705" y2="285" />
                <line x1="705" y1="285" x2="735" y2="90" />

                {/* Left Span Trusses */}
                <line x1="170" y1="95" x2="145" y2="285" />
                <line x1="145" y1="285" x2="110" y2="135" />
                <line x1="110" y1="135" x2="80" y2="285" />
                <line x1="80" y1="135" x2="45" y2="285" />

                {/* Right Span Trusses */}
                <line x1="830" y1="95" x2="855" y2="285" />
                <line x1="855" y1="285" x2="890" y2="135" />
                <line x1="890" y1="135" x2="920" y2="285" />
                <line x1="920" y1="135" x2="955" y2="285" />
              </g>

              {/* --- 5. HORIZONTAL ROAD DECK --- */}
              <rect x="0" y="280" width="1000" height="15" fill="url(#roadDeckGrad)" stroke="#4A250E" strokeWidth="1.5" />
              <rect x="0" y="282" width="1000" height="2.5" fill="#FFD54F" opacity="0.9" />
              <line x1="0" y1="277" x2="1000" y2="277" stroke="#FFCA28" strokeWidth="1.8" />

              {/* --- 6. FESTIVE MARIGOLD GARLANDS (GENDA PHOOL) SWAGGED ALONG DECK --- */}
              {/* Outer Vibrant Orange Garland Ribbon */}
              <path
                d="M 10 278 Q 90 300 170 278 Q 255 302 340 278 Q 420 304 500 278 Q 580 304 660 278 Q 745 302 830 278 Q 910 300 990 278"
                fill="none"
                stroke="#FF6D00"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="5,4"
              />
              {/* Inner Radiant Yellow Marigold Garland Ribbon */}
              <path
                d="M 10 278 Q 90 300 170 278 Q 255 302 340 278 Q 420 304 500 278 Q 580 304 660 278 Q 745 302 830 278 Q 910 300 990 278"
                fill="none"
                stroke="#FFD600"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="4,5"
              />

              {/* Stylized Marigold Flower Blossom Heads */}
              {[
                40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760, 800, 840, 880, 920, 960
              ].map((xPos, i) => {
                const flowerY = 284 + Math.sin(i * 0.75) * 8;
                return (
                  <g key={`marigold-${i}`}>
                    <circle
                      cx={xPos}
                      cy={flowerY}
                      r="4"
                      fill={i % 2 === 0 ? '#FF6D00' : '#FFD600'}
                      stroke="#FFE082"
                      strokeWidth="1.2"
                    />
                    <circle cx={xPos} cy={flowerY} r="1.8" fill="#FFF9C4" />
                  </g>
                );
              })}

              {/* --- 7. TWINKLING DIWALI / WEDDING FAIRY BULBS STRUNG ACROSS THE ARCH --- */}
              {[
                { cx: 225, cy: 75 },
                { cx: 270, cy: 90 },
                { cx: 315, cy: 108 },
                { cx: 360, cy: 124 },
                { cx: 405, cy: 138 },
                { cx: 450, cy: 150 },
                { cx: 500, cy: 156 },
                { cx: 550, cy: 150 },
                { cx: 595, cy: 138 },
                { cx: 640, cy: 124 },
                { cx: 685, cy: 108 },
                { cx: 730, cy: 90 },
                { cx: 775, cy: 75 },
                // Left & Right Outer Spans
                { cx: 150, cy: 110 },
                { cx: 105, cy: 150 },
                { cx: 60, cy: 195 },
                { cx: 850, cy: 110 },
                { cx: 895, cy: 150 },
                { cx: 940, cy: 195 }
              ].map((bulb, idx) => (
                <g key={`bulb-${idx}`} filter="url(#fairyGlow)">
                  <circle cx={bulb.cx} cy={bulb.cy} r="3" fill="#FFFDE7" />
                  <circle cx={bulb.cx} cy={bulb.cy} r="6" fill="#FFD54F" opacity="0.65" />
                </g>
              ))}
            </svg>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 3: TRANQUIL HOOGHLY RIVER (Starts strictly at water level y: 290)   */}
          {/* Cannot ever cover the bridge because its geometry lives below the road!  */}
          {/* ========================================================================= */}
          <motion.div style={{ y: riverY }} className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1000 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#102345" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#0B172E" stopOpacity="0.95" />
                  <stop offset="80%" stopColor="#1B0610" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#0F0206" />
                </linearGradient>
              </defs>

              {/* Water Body: strictly spans from y=290 to y=450 */}
              <rect x="0" y="290" width="1000" height="160" fill="url(#riverGrad)" />

              {/* Golden Tower Reflections in Hooghly Waters */}
              <polygon points="180,290 195,450 245,450 240,290" fill="#FFD54F" opacity="0.14" filter="blur(6px)" />
              <polygon points="760,290 775,450 825,450 820,290" fill="#FFD54F" opacity="0.14" filter="blur(6px)" />

              {/* Water Surface Wave Highlights */}
              <path
                d="M 0 315 Q 125 305 250 315 T 500 315 T 750 315 T 1000 315 L 1000 450 L 0 450 Z"
                fill="#152C55"
                opacity="0.6"
              />
              <path
                d="M 0 345 Q 125 335 250 345 T 500 345 T 750 345 T 1000 345 L 1000 450 L 0 450 Z"
                fill="#0F1C36"
                opacity="0.8"
              />
              <path
                d="M 0 380 Q 125 370 250 380 T 500 380 T 750 380 T 1000 380 L 1000 450 L 0 450 Z"
                fill="#16040C"
                opacity="0.9"
              />

              {/* Golden Shimmer Ripples */}
              <g stroke="#FFD54F" strokeWidth="1.6" strokeLinecap="round" opacity="0.6">
                <line x1="160" y1="322" x2="230" y2="322" />
                <line x1="200" y1="335" x2="280" y2="335" />
                <line x1="440" y1="326" x2="530" y2="326" />
                <line x1="480" y1="340" x2="570" y2="340" />
                <line x1="740" y1="324" x2="810" y2="324" />
                <line x1="770" y1="337" x2="850" y2="337" />
                <line x1="310" y1="365" x2="400" y2="365" />
                <line x1="620" y1="368" x2="710" y2="368" />
              </g>

              {/* Floating Clay Diyas on the Hooghly Waters */}
              {[
                { cx: 140, cy: 335 },
                { cx: 310, cy: 360 },
                { cx: 680, cy: 350 },
                { cx: 870, cy: 330 }
              ].map((diya, i) => (
                <g key={`water-diya-${i}`} transform={`translate(${diya.cx}, ${diya.cy})`}>
                  {/* Water Shimmer Halo */}
                  <ellipse cx="0" cy="5" rx="10" ry="2.5" fill="#FFD54F" opacity="0.3" filter="blur(1px)" />
                  {/* Terracotta Base */}
                  <path d="M -7 2 Q 0 7 7 2 Z" fill="#D84315" stroke="#BF360C" strokeWidth="0.8" />
                  {/* Diya Flame */}
                  <circle cx="0" cy="-2" r="3" fill="#FFA000" opacity="0.7" filter="blur(1.5px)" />
                  <ellipse cx="0" cy="-2" rx="1.8" ry="3" fill="#FFF8E7" />
                </g>
              ))}
            </svg>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 4: TRADITIONAL BENGALI DINGI BOAT FLOATING WITH LANTERN             */}
          {/* (Scaled cleanly to sit at water level, moving faster with swift sailing)  */}
          {/* ========================================================================= */}
          <motion.div
            style={{ x: boatX, rotate: boatRotate }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Gentle natural river wave bobbing (horizontal travel strictly driven by scroll) */}
            <motion.div
              className="w-full h-full"
              animate={{
                y: [-2.5, 3, -2.5],
                rotate: [-1.5, 2, -1.5]
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <svg viewBox="0 0 1000 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Boat Group: positioned at x: 340, y: 315 */}
                <g transform="translate(340, 315)">
                  {/* Trailing Water Wake Ripples */}
                  <ellipse cx="65" cy="42" rx="55" ry="3.5" fill="#FFD54F" opacity="0.35" filter="blur(1px)" />
                  <path d="M 5 36 Q -15 38 -35 41" stroke="#FFD54F" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.5" />
                  <path d="M 12 39 Q -5 42 -20 44" stroke="#FFD54F" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />

                  {/* Wooden Boat Hull */}
                  <path
                    d="M 5 30 Q 20 44 65 44 Q 110 44 125 30 Q 95 36 65 36 Q 35 36 5 30 Z"
                    fill="#3E1F0B"
                    stroke="#6D3D1B"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 12 32 Q 35 38 65 38 Q 95 38 118 32"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                  />

                  {/* Bengali Boatman with Oar (Majhi) */}
                  <g transform="translate(22, 14)">
                    {/* Torso / Kurta */}
                    <path d="M 4 13 Q 8 8 12 13 L 13 22 L 3 22 Z" fill="#D35400" />
                    {/* Bengali Gamcha / Turban & Head */}
                    <circle cx="8" cy="6" r="3.2" fill="#795548" />
                    <path d="M 4 5 Q 8 2 12 5 Z" fill="#C0392B" />
                    {/* Arm holding oar */}
                    <line x1="10" y1="13" x2="16" y2="20" stroke="#795548" strokeWidth="1.4" />
                    {/* Rowing Oar (Baitha) dipping into Hooghly water */}
                    <line x1="16" y1="16" x2="25" y2="36" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                    <polygon points="23,32 28,36 24,40 20,36" fill="#AA820A" />
                  </g>

                  {/* Woven Bamboo Canopy (Golui / Chhoi) */}
                  <path
                    d="M 42 31 C 42 12 90 12 90 31 Z"
                    fill="#795548"
                    stroke="#4E342E"
                    strokeWidth="1.2"
                  />
                  <line x1="52" y1="17" x2="52" y2="31" stroke="#A1887F" strokeWidth="1.2" />
                  <line x1="66" y1="14" x2="66" y2="31" stroke="#A1887F" strokeWidth="1.2" />
                  <line x1="80" y1="17" x2="80" y2="31" stroke="#A1887F" strokeWidth="1.2" />

                  {/* Hanging Brass Lantern at Prow */}
                  <line x1="108" y1="23" x2="108" y2="28" stroke="#D4AF37" strokeWidth="1" />
                  <g transform="translate(105, 28)">
                    <circle cx="3" cy="3" r="4" fill="#FFA000" opacity="0.7" filter="blur(1.5px)" />
                    <rect x="0.5" y="0.5" width="5" height="6.5" rx="1.5" fill="#FFD54F" />
                    <circle cx="3" cy="3.5" r="1.6" fill="#FFF" />
                  </g>
                </g>
              </svg>
            </motion.div>
          </motion.div>

          {/* ========================================================================= */}
          {/* LAYER 5: FOREGROUND PRINSEP GHAT AUSPICIOUS RITUAL CORNERS                */}
          {/* ========================================================================= */}
          <div className="absolute bottom-0 inset-x-0 h-8 sm:h-10 pointer-events-none flex items-end justify-between px-3 sm:px-6 z-10">
            {/* Left Corner: Traditional Lamp */}
            <div className="flex items-end space-x-1.5 sm:space-x-2">
              <div className="w-6 sm:w-7 h-4 sm:h-5 rounded-t-lg bg-gradient-to-t from-[#2C1005] to-[#5D2B0D] border border-[#D4AF37]/50 flex items-center justify-center shadow">
                <span className="text-[8px] sm:text-[9px] text-[#F7D070]">🪔</span>
              </div>
            </div>

            {/* Right Corner: Sacred Hooghly Lamp */}
            <div className="flex items-end space-x-1.5 sm:space-x-2">
              <div className="w-6 sm:w-7 h-4 sm:h-5 rounded-t-lg bg-gradient-to-t from-[#2C1005] to-[#5D2B0D] border border-[#D4AF37]/50 flex items-center justify-center shadow">
                <span className="text-[8px] sm:text-[9px] text-[#F7D070]">🪔</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
