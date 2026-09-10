import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface KaliTempleIllustrationProps {
  className?: string;
  mousePos?: { x: number; y: number };
  hideHeader?: boolean;
}

export const KaliTempleIllustration: React.FC<KaliTempleIllustrationProps> = ({
  className = '',
  mousePos = { x: 0, y: 0 },
  hideHeader = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position through the temple section to drive boat movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Boat movement across the Hooghly river waters driven dynamically by scroll
  const boatX = useTransform(scrollYProgress, [0, 1], [-140, 220]);
  const boatRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-2.5, 2.5, -1.5, 2.5, -2.5]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto select-none pointer-events-none ${className}`}
    >
      {/* Cultural Heritage Header Badge */}
      {!hideHeader && (
        <div className="text-center mb-2 sm:mb-3 pointer-events-auto">
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#1A0206]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-lg text-[#FCE2A6] text-[10px] sm:text-xs font-serif">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F7D070] animate-pulse shrink-0" />
            <span className="font-bold tracking-wider uppercase">
              মা ভবতারিণী • Dakshineswar Kali Temple Heritage
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9800] animate-ping shrink-0" />
          </div>
        </div>
      )}

      {/* Atmospheric Scenic Canvas: 
          Responsive height matching Howrah Bridge aesthetic with twilight glow and terracotta spires */}
      <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[370px] lg:h-[410px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#06132A] via-[#152342] to-[#1A050B] border border-[#D4AF37]/45 shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
        
        {/* Parallax response container to gentle mouse motion */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px, 0)`
          }}
        >
          <svg
            viewBox="0 0 1000 480"
            className="w-full h-full drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Terracotta Brick Gradient for Sanctuaries and Spires */}
              <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E65100" />
                <stop offset="35%" stopColor="#C0392B" />
                <stop offset="70%" stopColor="#962D1D" />
                <stop offset="100%" stopColor="#5B160C" />
              </linearGradient>

              {/* Temple Golden Cornices & Kalash */}
              <linearGradient id="templeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="40%" stopColor="#FFD54F" />
                <stop offset="75%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#876505" />
              </linearGradient>

              {/* Sanctum Glow Gradient */}
              <radialGradient id="innerSanctumGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF176" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#FF9800" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3E070F" stopOpacity="0" />
              </radialGradient>

              {/* Hooghly Waters Gradient at Ghat */}
              <linearGradient id="templeRiverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#122547" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0B162C" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#120106" />
              </linearGradient>

              {/* Lamp Glow Filter */}
              <filter id="templeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ========================================================= */}
            {/* 1. TWILIGHT SKY, STARS & CRESCENT MOON                    */}
            {/* ========================================================= */}
            {/* Twinkling Golden Stars */}
            {[
              { cx: 80, cy: 35, r: 1.8 },
              { cx: 160, cy: 65, r: 1.3 },
              { cx: 240, cy: 25, r: 2.0 },
              { cx: 340, cy: 50, r: 1.4 },
              { cx: 660, cy: 40, r: 1.6 },
              { cx: 760, cy: 25, r: 2.1 },
              { cx: 850, cy: 60, r: 1.3 },
              { cx: 930, cy: 30, r: 1.9 },
              { cx: 120, cy: 95, r: 1.2 },
              { cx: 890, cy: 90, r: 1.5 }
            ].map((star, idx) => (
              <circle
                key={`temple-star-${idx}`}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill="#FFF8E7"
                opacity={0.7 + (idx % 3) * 0.12}
              />
            ))}

            {/* Auspicious Golden Crescent Moon */}
            <g transform="translate(870, 30)">
              <circle cx="16" cy="16" r="16" fill="#FFF8E7" opacity="0.95" filter="drop-shadow(0 0 12px #FFD54F)" />
              <circle cx="22" cy="13" r="15" fill="#06132A" />
            </g>

            {/* Rising Sky Lanterns (Fanush) */}
            <motion.g
              transform="translate(190, 45)"
              opacity="0.85"
              animate={{ y: [-4, 5, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect x="0" y="0" width="8" height="12" rx="3" fill="#FF8F00" filter="drop-shadow(0 0 8px #FFA000)" />
              <circle cx="4" cy="10" r="1.5" fill="#FFF" />
            </motion.g>
            <motion.g
              transform="translate(790, 50)"
              opacity="0.85"
              animate={{ y: [4, -5, 4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect x="0" y="0" width="8" height="12" rx="3" fill="#FF8F00" filter="drop-shadow(0 0 8px #FFA000)" />
              <circle cx="4" cy="10" r="1.5" fill="#FFF" />
            </motion.g>

            {/* ========================================================= */}
            {/* 2. DAKSHINESWAR TEMPLE NAVARATNA ARCHITECTURE             */}
            {/* (Center Base at y: 340, Upper Tier at y: 220, Top Spire)  */}
            {/* ========================================================= */}

            {/* --- Lower Plinth Platform (Pithasthana) --- */}
            <rect x="180" y="325" width="640" height="25" rx="3" fill="#3D120B" stroke="#D4AF37" strokeWidth="2" />
            <rect x="190" y="327" width="620" height="4" fill="url(#templeGoldGrad)" opacity="0.8" />

            {/* --- Lower Tier Main Sanctuary Hall (Terracotta facade) --- */}
            <rect
              x="220"
              y="215"
              width="560"
              height="110"
              rx="4"
              fill="url(#terracottaGrad)"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Terracotta Jali Brick Texture Lines */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`brick-line-${i}`}
                x1="220"
                y1={225 + i * 11}
                x2="780"
                y2={225 + i * 11}
                stroke="#6B1D11"
                strokeWidth="1"
                strokeDasharray="18 4"
              />
            ))}

            {/* Lower Tier Ornate Pillars */}
            {[235, 305, 375, 445, 515, 585, 655, 725].map((px, idx) => (
              <g key={`lower-pillar-${idx}`}>
                <rect x={px} y="215" width="8" height="110" fill="url(#templeGoldGrad)" stroke="#5B3E03" strokeWidth="0.8" />
                <circle cx={px + 4} cy="218" r="3" fill="#FFE082" />
              </g>
            ))}

            {/* Lower Tier Arched Sanctuaries (Traditional Bengali Chala Arches) */}
            {[
              { x: 260, w: 90, label: 'Shiva' },
              { x: 380, w: 90, label: 'RadhaKanta' },
              { x: 500, w: 90, label: 'Bhabatarini' },
              { x: 620, w: 90, label: 'Shiva' }
            ].map((arch, idx) => (
              <g key={`arch-${idx}`}>
                {/* Arch Surround */}
                <path
                  d={`M ${arch.x} 325 L ${arch.x} 260 Q ${arch.x + arch.w / 2} 230 ${arch.x + arch.w} 260 L ${arch.x + arch.w} 325 Z`}
                  fill="#1A0206"
                  stroke="url(#templeGoldGrad)"
                  strokeWidth="2"
                />
                {/* Divine Ethereal Glow pulsing from inside the sanctum */}
                <motion.ellipse
                  cx={arch.x + arch.w / 2}
                  cy={285}
                  rx={32}
                  ry={25}
                  fill="url(#innerSanctumGlow)"
                  animate={{ opacity: [0.72, 1, 0.72], scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: 3 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Golden Hanging Brass Bell (Ghanta) - gently swaying */}
                <motion.g
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2.7 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: `${arch.x + arch.w / 2}px 240px` }}
                >
                  <line x1={arch.x + arch.w / 2} y1="240" x2={arch.x + arch.w / 2} y2="260" stroke="#FFD54F" strokeWidth="1.5" />
                  <polygon
                    points={`${arch.x + arch.w / 2 - 5},266 ${arch.x + arch.w / 2 + 5},266 ${arch.x + arch.w / 2 + 3},260 ${arch.x + arch.w / 2 - 3},260`}
                    fill="#FFD54F"
                    stroke="#AA820A"
                    strokeWidth="0.8"
                  />
                  <circle cx={arch.x + arch.w / 2} cy="268" r="1.5" fill="#FFE082" />
                </motion.g>
                {/* Sacred Diya flame in sanctum doorway - flickering */}
                <motion.circle
                  cx={arch.x + arch.w / 2}
                  cy={318}
                  r={3.5}
                  fill="#FFB300"
                  filter="url(#templeGlow)"
                  animate={{ scale: [0.88, 1.15, 0.88], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 1.6 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <ellipse cx={arch.x + arch.w / 2} cy="317" rx="1.8" ry="3" fill="#FFFDE7" />
              </g>
            ))}

            {/* --- Lower Tier 4 Corner Spires (Chura) --- */}
            {/* Far Left Spire */}
            <g transform="translate(205, 130)">
              <path d="M 5 85 C 5 25, 20 0, 20 0 C 20 0, 35 25, 35 85 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="20" cy="0" r="3.5" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              {/* Fluttering Red Pataka Flag */}
              <motion.g
                animate={{ scaleX: [1, 1.25, 0.9, 1], skewY: [-4, 5, -4] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '20px 0px' }}
              >
                <polygon points="20,-1 34,4 20,8" fill="#D32F2F" />
              </motion.g>
            </g>
            {/* Mid Left Spire */}
            <g transform="translate(325, 130)">
              <path d="M 5 85 C 5 25, 20 0, 20 0 C 20 0, 35 25, 35 85 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="20" cy="0" r="3.5" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.22, 0.92, 1], skewY: [-3, 5, -3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '20px 0px' }}
              >
                <polygon points="20,-1 34,4 20,8" fill="#D32F2F" />
              </motion.g>
            </g>
            {/* Mid Right Spire */}
            <g transform="translate(635, 130)">
              <path d="M 5 85 C 5 25, 20 0, 20 0 C 20 0, 35 25, 35 85 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="20" cy="0" r="3.5" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.24, 0.89, 1], skewY: [-4, 6, -4] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '20px 0px' }}
              >
                <polygon points="20,-1 34,4 20,8" fill="#D32F2F" />
              </motion.g>
            </g>
            {/* Far Right Spire */}
            <g transform="translate(755, 130)">
              <path d="M 5 85 C 5 25, 20 0, 20 0 C 20 0, 35 25, 35 85 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="20" cy="0" r="3.5" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.26, 0.9, 1], skewY: [-3, 5, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '20px 0px' }}
              >
                <polygon points="20,-1 34,4 20,8" fill="#D32F2F" />
              </motion.g>
            </g>

            {/* --- Upper Tier Sanctuary Structure --- */}
            <rect
              x="360"
              y="130"
              width="280"
              height="85"
              rx="4"
              fill="url(#terracottaGrad)"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Upper Cornice Gold Molding */}
            <rect x="350" y="210" width="300" height="7" fill="url(#templeGoldGrad)" stroke="#5B3E03" strokeWidth="1" />
            <rect x="355" y="130" width="290" height="6" fill="url(#templeGoldGrad)" stroke="#5B3E03" strokeWidth="1" />

            {/* Upper Arches */}
            {[390, 470, 550].map((ux, uidx) => (
              <g key={`upper-arch-${uidx}`}>
                <path
                  d={`M ${ux} 210 L ${ux} 165 Q ${ux + 30} 145 ${ux + 60} 165 L ${ux + 60} 210 Z`}
                  fill="#1A0206"
                  stroke="url(#templeGoldGrad)"
                  strokeWidth="1.5"
                />
                <motion.circle
                  cx={ux + 30}
                  cy={180}
                  r={18}
                  fill="url(#innerSanctumGlow)"
                  animate={{ opacity: [0.75, 1, 0.75], scale: [0.94, 1.06, 0.94] }}
                  transition={{ duration: 2.8 + uidx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Diya */}
                <motion.circle
                  cx={ux + 30}
                  cy={204}
                  r={2.8}
                  fill="#FFB300"
                  filter="url(#templeGlow)"
                  animate={{ scale: [0.85, 1.15, 0.85] }}
                  transition={{ duration: 1.5 + uidx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <ellipse cx={ux + 30} cy="203" rx="1.4" ry="2.2" fill="#FFFDE7" />
              </g>
            ))}

            {/* --- Upper Tier 4 Corner Spires --- */}
            {/* Upper Spire 1 */}
            <g transform="translate(365, 55)">
              <path d="M 4 75 C 4 20, 16 0, 16 0 C 16 0, 28 20, 28 75 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="16" cy="0" r="3" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.25, 0.9, 1], skewY: [-4, 5, -4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '16px 0px' }}
              >
                <polygon points="16,-1 28,3 16,7" fill="#D32F2F" />
              </motion.g>
            </g>
            {/* Upper Spire 2 */}
            <g transform="translate(425, 55)">
              <path d="M 4 75 C 4 20, 16 0, 16 0 C 16 0, 28 20, 28 75 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="16" cy="0" r="3" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.22, 0.92, 1], skewY: [-3, 6, -3] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '16px 0px' }}
              >
                <polygon points="16,-1 28,3 16,7" fill="#D32F2F" />
              </motion.g>
            </g>
            {/* Upper Spire 3 */}
            <g transform="translate(545, 55)">
              <path d="M 4 75 C 4 20, 16 0, 16 0 C 16 0, 28 20, 28 75 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="16" cy="0" r="3" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.24, 0.9, 1], skewY: [-4, 5, -4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '16px 0px' }}
              >
                <polygon points="16,-1 28,3 16,7" fill="#D32F2F" />
              </motion.g>
            </g>
            {/* Upper Spire 4 */}
            <g transform="translate(605, 55)">
              <path d="M 4 75 C 4 20, 16 0, 16 0 C 16 0, 28 20, 28 75 Z" fill="url(#terracottaGrad)" stroke="#D4AF37" strokeWidth="1.8" />
              <circle cx="16" cy="0" r="3" fill="#FFD54F" stroke="#B28704" strokeWidth="0.8" />
              <motion.g
                animate={{ scaleX: [1, 1.25, 0.88, 1], skewY: [-3, 5, -3] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '16px 0px' }}
              >
                <polygon points="16,-1 28,3 16,7" fill="#D32F2F" />
              </motion.g>
            </g>

            {/* --- 9TH CENTRAL MAJESTIC SPIRE (Highest Pinnacle of Dakshineswar) --- */}
            <g transform="translate(475, 10)">
              {/* Grand Curved Chala Spire */}
              <path
                d="M 6 120 C 6 40, 25 0, 25 0 C 25 0, 44 40, 44 120 Z"
                fill="url(#terracottaGrad)"
                stroke="#D4AF37"
                strokeWidth="2.5"
              />
              <path
                d="M 12 120 C 12 50, 25 15, 25 15 C 25 15, 38 50, 38 120 Z"
                fill="#FF7043"
                opacity="0.4"
              />
              {/* Sacred Golden Kalash & Trishul Finial */}
              <ellipse cx="25" cy="0" rx="6" ry="4" fill="url(#templeGoldGrad)" stroke="#876505" strokeWidth="1" />
              <circle cx="25" cy="-5" r="4.5" fill="url(#templeGoldGrad)" stroke="#876505" strokeWidth="1" />
              <line x1="25" y1="-18" x2="25" y2="-5" stroke="#FFE082" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="25" cy="-18" r="2.5" fill="#FFD54F" />
              
              {/* Fluttering Sacred Red Pataka Flag of Maa Bhavatarini */}
              <motion.g
                animate={{ scaleX: [1, 1.3, 0.88, 1], skewY: [-5, 6, -5] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '25px -10px' }}
              >
                <polygon points="25,-16 46,-10 25,-4" fill="#E53935" stroke="#B71C1C" strokeWidth="0.8" />
                <polygon points="25,-15 36,-10 25,-5" fill="#FF8A80" opacity="0.6" />
              </motion.g>
            </g>

            {/* --- FESTIVE MARIGOLD GARLANDS (GENDA PHOOL) SWAGGED ACROSS TEMPLE --- */}
            {/* Lower Cornice Swags */}
            <path
              d="M 220 215 Q 260 232 300 215 Q 340 232 380 215 Q 420 232 460 215 Q 500 232 540 215 Q 580 232 620 215 Q 660 232 700 215 Q 740 232 780 215"
              fill="none"
              stroke="#FF6D00"
              strokeWidth="5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            <path
              d="M 220 215 Q 260 232 300 215 Q 340 232 380 215 Q 420 232 460 215 Q 500 232 540 215 Q 580 232 620 215 Q 660 232 700 215 Q 740 232 780 215"
              fill="none"
              stroke="#FFD600"
              strokeWidth="3"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />

            {/* Marigold Blossom Beads along the temple roofline */}
            {[240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760].map((mx, idx) => (
              <g key={`temple-marigold-${idx}`}>
                <circle cx={mx} cy={221} r="3.5" fill={idx % 2 === 0 ? '#FF6D00' : '#FFD600'} stroke="#FFE082" strokeWidth="1" />
                <circle cx={mx} cy={221} r="1.4" fill="#FFF9C4" />
              </g>
            ))}

            {/* Sacred Red Hibiscus Offerings (Jaba Phool) at Base of Pillars */}
            {[235, 305, 375, 445, 515, 585, 655, 725].map((hx, idx) => (
              <g key={`hibiscus-${idx}`} transform={`translate(${hx - 2}, 320)`}>
                <circle cx="6" cy="4" r="3.5" fill="#D32F2F" />
                <circle cx="3" cy="2" r="2.5" fill="#E53935" />
                <circle cx="9" cy="2" r="2.5" fill="#E53935" />
                <circle cx="6" cy="1" r="1.2" fill="#FFEB3B" />
              </g>
            ))}

            {/* ========================================================= */}
            {/* 3. DAKSHINESWAR GHAT STEPS LEADING DOWN TO HOOGHLY RIVER  */}
            {/* (Steps span from y: 350 to y: 400)                        */}
            {/* ========================================================= */}
            <rect x="140" y="350" width="720" height="10" fill="#4E170E" stroke="#D4AF37" strokeWidth="1.2" />
            <rect x="110" y="360" width="780" height="10" fill="#3D1109" stroke="#8C2B1A" strokeWidth="1.2" />
            <rect x="80" y="370" width="840" height="10" fill="#2E0A05" stroke="#D4AF37" strokeWidth="1.2" />
            <rect x="50" y="380" width="900" height="10" fill="#200603" stroke="#8C2B1A" strokeWidth="1.2" />
            <rect x="20" y="390" width="960" height="10" fill="#140201" stroke="#D4AF37" strokeWidth="1.2" />

            {/* ========================================================= */}
            {/* 4. TRANQUIL HOOGHLY RIVER WATERS & FLOATING DIYAS         */}
            {/* (Water flows from y: 400 to y: 480)                       */}
            {/* ========================================================= */}
            <rect x="0" y="400" width="1000" height="80" fill="url(#templeRiverGrad)" />

            {/* Golden Temple Spires Reflection in Water */}
            <polygon points="450,400 480,480 520,480 550,400" fill="#FFD54F" opacity="0.15" filter="blur(6px)" />
            <polygon points="240,400 260,480 300,480 320,400" fill="#FFD54F" opacity="0.1" filter="blur(5px)" />
            <polygon points="680,400 700,480 740,480 760,400" fill="#FFD54F" opacity="0.1" filter="blur(5px)" />

            {/* River Ripples with gentle animated wave drift */}
            <motion.path
              d="M -50 420 Q 125 412 250 420 T 500 420 T 750 420 T 1050 420"
              fill="none"
              stroke="#1C386E"
              strokeWidth="2"
              opacity="0.7"
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M -50 445 Q 125 437 250 445 T 500 445 T 750 445 T 1050 445"
              fill="none"
              stroke="#FFD54F"
              strokeWidth="1.4"
              opacity="0.4"
              strokeDasharray="12 18"
              animate={{ x: [15, -15, 15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path
              d="M 0 465 Q 125 457 250 465 T 500 465 T 750 465 T 1000 465"
              fill="none"
              stroke="#122547"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Sacred Clay Diyas Floating on the Ganga at the Temple Ghat with gentle water bobbing */}
            {[
              { cx: 160, cy: 425 },
              { cx: 340, cy: 445 },
              { cx: 520, cy: 435 },
              { cx: 700, cy: 450 },
              { cx: 860, cy: 430 }
            ].map((diya, i) => (
              <motion.g
                key={`ghat-diya-${i}`}
                transform={`translate(${diya.cx}, ${diya.cy})`}
                animate={{
                  y: [-2, 2.5, -2],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 2.2 + (i % 3) * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <ellipse cx="0" cy="4" rx="9" ry="2.5" fill="#FFD54F" opacity="0.3" filter="blur(1px)" />
                <path d="M -7 2 Q 0 7 7 2 Z" fill="#D84315" stroke="#BF360C" strokeWidth="0.8" />
                <circle cx="0" cy="-2" r="3" fill="#FFA000" opacity="0.7" filter="blur(1.5px)" />
                <ellipse cx="0" cy="-2" rx="1.8" ry="3" fill="#FFF8E7" />
              </motion.g>
            ))}

            {/* ========================================================= */}
            {/* 5. TRADITIONAL BENGALI DINGI BOAT SAILING ALONG DAKSHINESWAR GHAT */}
            {/* Moving gracefully across the Hooghly River waters driven by scroll */}
            {/* ========================================================= */}
            <motion.g
              style={{
                x: boatX,
                rotate: boatRotate
              }}
              animate={{
                y: [-2.5, 3, -2.5]
              }}
              transition={{
                y: { duration: 1.9, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <g transform="translate(370, 408)">
                {/* Water contact ripple & glow reflection */}
                <ellipse cx="55" cy="38" rx="52" ry="3.2" fill="#FFD54F" opacity="0.35" filter="blur(1px)" />
                <path d="M 0 34 Q -18 37 -35 39" stroke="#FFD54F" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
                <path d="M 8 36 Q -8 39 -22 41" stroke="#FFD54F" strokeWidth="0.9" strokeDasharray="2 3" opacity="0.35" />

                {/* Wooden Boat Hull */}
                <path
                  d="M 5 28 Q 20 40 55 40 Q 92 40 108 28 Q 82 33 55 33 Q 28 33 5 28 Z"
                  fill="#3E1F0B"
                  stroke="#6D3D1B"
                  strokeWidth="1.2"
                />
                <path
                  d="M 12 30 Q 30 35 55 35 Q 80 35 100 30"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.9"
                />

                {/* Bengali Boatman (Majhi) with Oar */}
                <g transform="translate(18, 14)">
                  {/* Torso / Kurta */}
                  <path d="M 4 11 Q 7 7 11 11 L 11 19 L 3 19 Z" fill="#D35400" />
                  {/* Head & Gamcha / Turban */}
                  <circle cx="7" cy="5" r="2.8" fill="#795548" />
                  <path d="M 4 4 Q 7 2 10 4 Z" fill="#C0392B" />
                  <line x1="9" y1="11" x2="14" y2="17" stroke="#795548" strokeWidth="1.2" />
                  {/* Rowing Oar (Baitha) dipping into Hooghly water */}
                  <line x1="14" y1="14" x2="22" y2="33" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
                  <polygon points="20,29 25,33 22,36 18,33" fill="#AA820A" />
                </g>

                {/* Woven Bamboo Canopy (Chhoi) */}
                <path
                  d="M 36 29 C 36 12 78 12 78 29 Z"
                  fill="#795548"
                  stroke="#4E342E"
                  strokeWidth="1.1"
                />
                <line x1="46" y1="17" x2="46" y2="29" stroke="#A1887F" strokeWidth="1" />
                <line x1="57" y1="14" x2="57" y2="29" stroke="#A1887F" strokeWidth="1" />
                <line x1="68" y1="17" x2="68" y2="29" stroke="#A1887F" strokeWidth="1" />

                {/* Hanging Brass Diya/Lantern at Prow */}
                <line x1="94" y1="22" x2="94" y2="26" stroke="#D4AF37" strokeWidth="0.9" />
                <g transform="translate(91, 26)">
                  <circle cx="3" cy="3" r="3.5" fill="#FFA000" opacity="0.75" filter="blur(1.5px)" />
                  <rect x="0.5" y="0.5" width="4.5" height="5.5" rx="1.2" fill="#FFD54F" />
                  <circle cx="2.7" cy="3" r="1.3" fill="#FFF" />
                </g>
              </g>
            </motion.g>
          </svg>
        </div>

        {/* Foreground Ghat Lamps Left & Right */}
        <div className="absolute bottom-0 inset-x-0 h-7 sm:h-8 pointer-events-none flex items-end justify-between px-3 sm:px-6 z-10">
          <div className="flex items-end space-x-1.5 sm:space-x-2">
            <span className="text-[9px] sm:text-[10px] font-serif text-[#FCE2A6]/85 bg-[#1A0206]/80 px-2 py-0.5 rounded backdrop-blur-sm border border-[#D4AF37]/30">
              দক্ষিণেশ্বর ঘাট • Dakshineswar Ghat
            </span>
          </div>
          <div className="flex items-end space-x-1.5 sm:space-x-2">
            <span className="text-[9px] sm:text-[10px] font-serif text-[#FCE2A6]/85 bg-[#1A0206]/80 px-2 py-0.5 rounded backdrop-blur-sm border border-[#D4AF37]/30">
              মা ভবতারিণী মন্দির • Maa Bhavatarini
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
