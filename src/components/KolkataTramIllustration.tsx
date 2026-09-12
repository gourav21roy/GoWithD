import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface KolkataTramIllustrationProps {
  className?: string;
}

export const KolkataTramIllustration: React.FC<KolkataTramIllustrationProps> = ({
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the tram illustration to drive subtle gliding motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Tram glides swiftly along the rails as user scrolls (accelerated responsive motion)
  const tramX = useTransform(scrollYProgress, [0, 1], [-175, 175]);
  const lightFlicker = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#050F22] via-[#0E1B38] to-[#120610] border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${className}`}
    >
      {/* Golden Inner Vignette Frame */}
      <div className="absolute inset-0 pointer-events-none border border-[#FCE2A6]/20 rounded-2xl sm:rounded-3xl z-20" />

      {/* Main Vector SVG Stage */}
      <svg
        viewBox="0 0 1000 480"
        className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] select-none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Night Sky Gradient */}
          <linearGradient id="tramSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#040B1A" />
            <stop offset="45%" stopColor="#0E1E3D" />
            <stop offset="85%" stopColor="#221424" />
            <stop offset="100%" stopColor="#140409" />
          </linearGradient>

          {/* Warm Street Lamp Radial Glow */}
          <radialGradient id="tramStreetLampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#F7D070" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          {/* Headlight Forward Cone Gradient */}
          <linearGradient id="tramHeadlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#FCE2A6" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>

          {/* Heritage Kolkata Green Body */}
          <linearGradient id="tramGreenBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C5243" />
            <stop offset="50%" stopColor="#133C31" />
            <stop offset="100%" stopColor="#0B241D" />
          </linearGradient>

          {/* Cream / Ivory Upper Carriage */}
          <linearGradient id="tramIvoryBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9EB" />
            <stop offset="100%" stopColor="#E5D6B8" />
          </linearGradient>

          {/* Maroon CTC Trim Stripe */}
          <linearGradient id="tramMaroonTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78101E" />
            <stop offset="50%" stopColor="#A82030" />
            <stop offset="100%" stopColor="#78101E" />
          </linearGradient>

          {/* Window Warm Light Glow */}
          <linearGradient id="tramWindowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          <filter id="tramGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. SKY BACKDROP */}
        <rect x="0" y="0" width="1000" height="480" fill="url(#tramSkyGradient)" />

        {/* 2. DISTANT TWINKLING STARS IN SKY */}
        <g opacity="0.6">
          <circle cx="80" cy="50" r="1.5" fill="#FFF8E7" />
          <circle cx="160" cy="80" r="1.2" fill="#FCE2A6" />
          <circle cx="280" cy="40" r="1.8" fill="#FFF" />
          <circle cx="420" cy="65" r="1.2" fill="#F7D070" />
          <circle cx="560" cy="35" r="1.5" fill="#FFF8E7" />
          <circle cx="720" cy="60" r="1.7" fill="#FCE2A6" />
          <circle cx="850" cy="45" r="1.3" fill="#FFF" />
          <circle cx="940" cy="75" r="1.6" fill="#F7D070" />
        </g>

        {/* 3. COLONIAL CALCUTTA SILHOUETTES (College Street / Esplanade Arches) */}
        <g opacity="0.38" fill="#0A162B">
          {/* Colonial Building Left */}
          <rect x="15" y="150" width="105" height="190" />
          <polygon points="15,150 67,120 120,150" />
          <path d="M 30 180 Q 45 165 60 180 Z" fill="#FDE68A" opacity="0.3" />
          <path d="M 75 180 Q 90 165 105 180 Z" fill="#FDE68A" opacity="0.3" />

          {/* Clock Tower & Balustrades */}
          <rect x="150" y="115" width="85" height="225" />
          <polygon points="150,115 192,65 235,115" />
          <circle cx="192" cy="138" r="11" fill="#FCE2A6" opacity="0.5" />

          {/* Colonial Library Pillars & Cornice */}
          <rect x="260" y="165" width="160" height="175" />
          <path d="M 260 165 Q 340 140 420 165 Z" />

          {/* Heritage Buildings Center & Right */}
          <rect x="450" y="180" width="110" height="160" />
          <rect x="590" y="145" width="130" height="195" />
          <polygon points="590,145 655,110 720,145" />
          <rect x="750" y="170" width="125" height="170" />
          <rect x="900" y="130" width="90" height="210" />
          <polygon points="900,130 945,85 990,130" />
        </g>

        {/* 4. OVERHEAD CATENARY TRAM ELECTRIC WIRES */}
        <g stroke="#9BB0C7" strokeWidth="1.2" opacity="0.6">
          <line x1="0" y1="70" x2="1000" y2="82" />
          <line x1="0" y1="102" x2="1000" y2="114" />
          <line x1="0" y1="128" x2="1000" y2="138" strokeDasharray="9 7" />

          {/* Vertical Catenary Dropper Wires */}
          <line x1="140" y1="72" x2="140" y2="104" />
          <line x1="310" y1="74" x2="310" y2="106" />
          <line x1="500" y1="76" x2="500" y2="108" />
          <line x1="680" y1="78" x2="680" y2="110" />
          <line x1="860" y1="80" x2="860" y2="112" />
        </g>

        {/* 5. VINTAGE CAST-IRON STREET LAMPS (Left & Right) */}
        {/* Left Street Lamp */}
        <g>
          <circle cx="95" cy="175" r="60" fill="url(#tramStreetLampGlow)" />
          <rect x="92" y="175" width="6" height="165" fill="#0C1420" />
          <rect x="86" y="335" width="18" height="6" fill="#0C1420" />
          <path d="M 92 180 Q 72 168 72 152 Q 72 140 95 140 Q 118 140 118 152 Q 118 168 98 180 Z" fill="#0C1420" />
          <polygon points="85,170 105,170 102,150 88,150" fill="#FFF9C4" opacity="0.9" filter="url(#tramGlowEffect)" />
          <circle cx="95" cy="160" r="3.5" fill="#FFA726" />
        </g>

        {/* Right Street Lamp */}
        <g>
          <circle cx="890" cy="170" r="60" fill="url(#tramStreetLampGlow)" />
          <rect x="887" y="170" width="6" height="170" fill="#0C1420" />
          <rect x="881" y="335" width="18" height="6" fill="#0C1420" />
          <path d="M 887 175 Q 867 163 867 147 Q 867 135 890 135 Q 913 135 913 147 Q 913 163 893 175 Z" fill="#0C1420" />
          <polygon points="880,165 900,165 897,145 883,145" fill="#FFF9C4" opacity="0.9" filter="url(#tramGlowEffect)" />
          <circle cx="890" cy="155" r="3.5" fill="#FFA726" />
        </g>

        {/* 6. COBBLESTONE ROAD & TRAMWAY TRACKS */}
        <rect x="0" y="340" width="1000" height="140" fill="#130B14" />
        <rect x="0" y="340" width="1000" height="4" fill="#3D1C24" />

        {/* Running Rails Embedded in Pavement */}
        <line x1="0" y1="368" x2="1000" y2="368" stroke="#5A6472" strokeWidth="3.5" />
        <line x1="0" y1="370" x2="1000" y2="370" stroke="#A8B4C4" strokeWidth="1.2" />
        <line x1="0" y1="400" x2="1000" y2="400" stroke="#5A6472" strokeWidth="3.5" />
        <line x1="0" y1="402" x2="1000" y2="402" stroke="#A8B4C4" strokeWidth="1.2" />

        {/* Cobblestone Sleepers */}
        <g fill="#1D1520" opacity="0.65">
          <rect x="20" y="371" width="18" height="27" />
          <rect x="60" y="371" width="18" height="27" />
          <rect x="100" y="371" width="18" height="27" />
          <rect x="140" y="371" width="18" height="27" />
          <rect x="180" y="371" width="18" height="27" />
          <rect x="220" y="371" width="18" height="27" />
          <rect x="260" y="371" width="18" height="27" />
          <rect x="300" y="371" width="18" height="27" />
          <rect x="340" y="371" width="18" height="27" />
          <rect x="380" y="371" width="18" height="27" />
          <rect x="420" y="371" width="18" height="27" />
          <rect x="460" y="371" width="18" height="27" />
          <rect x="500" y="371" width="18" height="27" />
          <rect x="540" y="371" width="18" height="27" />
          <rect x="580" y="371" width="18" height="27" />
          <rect x="620" y="371" width="18" height="27" />
          <rect x="660" y="371" width="18" height="27" />
          <rect x="700" y="371" width="18" height="27" />
          <rect x="740" y="371" width="18" height="27" />
          <rect x="780" y="371" width="18" height="27" />
          <rect x="820" y="371" width="18" height="27" />
          <rect x="860" y="371" width="18" height="27" />
          <rect x="900" y="371" width="18" height="27" />
          <rect x="940" y="371" width="18" height="27" />
          <rect x="980" y="371" width="18" height="27" />
        </g>

        {/* 7. STATIONARY HEADLIGHT BEAM & ILLUMINATION (KEPT STRICTLY STATIONARY) */}
        <polygon points="658,327 1000,270 1000,400 658,340" fill="url(#tramHeadlightBeam)" opacity="0.8" />

        {/* 8. MOVING TRAM ASSEMBLY (REDUCED ANOTHER 20% TO SCALE 0.68) */}
        <motion.g
          id="ctc-tram-moving-unit"
          style={{ x: tramX }}
          animate={{ y: [0, -1, 0, 0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* ICONIC CALCUTTA TRAMWAYS COMPANY (CTC) TWIN-BOGIE TRAM - 0.68 SCALE */}
          <g id="ctc-tram-assembly" transform="translate(160, 120) scale(0.68)">
            {/* TROLLEY POLE & PANTOGRAPH TOUCHING OVERHEAD WIRE */}
            <g stroke="#C5A059" strokeWidth="3.4" strokeLinecap="round">
              <line x1="435" y1="188" x2="475" y2="-12" />
              <line x1="475" y1="-12" x2="512" y2="-18" strokeWidth="4.2" stroke="#FFF8E7" />
              {/* Spark Contact Point */}
              <circle cx="512" cy="-18" r="3.5" fill="#64B5F6" filter="url(#tramGlowEffect)" />
              <path d="M 420 190 L 450 190 L 435 182 Z" fill="#3E3E3E" stroke="none" />
            </g>

            {/* ================= REAR COACH (COACH 2) ================= */}
            <g id="tram-coach-rear">
              {/* Shadow */}
              <ellipse cx="230" cy="365" rx="145" ry="9" fill="#000" opacity="0.65" />

              {/* Steel Wheel Sets */}
              <g fill="#1A1A1A" stroke="#4A4A4A" strokeWidth="2">
                <circle cx="145" cy="362" r="14" />
                <circle cx="145" cy="362" r="7" fill="#888" stroke="none" />
                <circle cx="190" cy="362" r="14" />
                <circle cx="190" cy="362" r="7" fill="#888" stroke="none" />
                <rect x="130" y="352" width="75" height="6" fill="#333" stroke="none" />

                <circle cx="285" cy="362" r="14" />
                <circle cx="285" cy="362" r="7" fill="#888" stroke="none" />
                <circle cx="330" cy="362" r="14" />
                <circle cx="330" cy="362" r="7" fill="#888" stroke="none" />
                <rect x="270" y="352" width="75" height="6" fill="#333" stroke="none" />
              </g>

              {/* Coach 2 Lower Body (Heritage Green) */}
              <path d="M 95 350 Q 82 341 82 312 Q 82 284 95 273 L 360 273 L 360 350 Z" fill="url(#tramGreenBody)" stroke="#D4AF37" strokeWidth="1.5" />

              {/* Maroon & Gold Royal Stripes */}
              <rect x="92" y="312" width="268" height="8" fill="url(#tramMaroonTrim)" stroke="#D4AF37" strokeWidth="0.8" />
              <line x1="92" y1="311" x2="360" y2="311" stroke="#FFF8E7" strokeWidth="1" />
              <line x1="92" y1="321" x2="360" y2="321" stroke="#D4AF37" strokeWidth="1" />

              {/* Coach 2 Upper Ivory Body */}
              <path d="M 95 273 Q 82 232 95 210 L 360 210 L 360 273 Z" fill="url(#tramIvoryBody)" stroke="#D4AF37" strokeWidth="1.2" />

              {/* Curved Roof Canopy */}
              <path d="M 88 210 Q 225 195 365 210 L 360 203 Q 225 188 93 203 Z" fill="#D2C09C" stroke="#7A6845" strokeWidth="1.5" />
              <rect x="98" y="203" width="260" height="3.5" fill="#8C7A58" />

              {/* Coach 2 Roof Sign Board: #GouravKiDebu */}
              <rect x="155" y="188" width="150" height="17" rx="3" fill="#150205" stroke="#D4AF37" strokeWidth="1.2" />
              <text x="230" y="200.5" fontFamily="serif" fontSize="9.5" fontWeight="bold" fill="#FCE2A6" textAnchor="middle" letterSpacing="1">
                #GouravKiDebu
              </text>

              {/* Coach 2 Passenger Windows with Glowing Warm Light */}
              <path d="M 115 220 L 96 220 Q 89 235 90 262 L 115 262 Z" fill="url(#tramWindowGlow)" opacity="0.92" stroke="#5D4037" strokeWidth="2" filter="url(#tramGlowEffect)" />

              <g fill="url(#tramWindowGlow)" opacity="0.9" stroke="#4E342E" strokeWidth="2">
                <rect x="126" y="220" width="34" height="42" rx="3" />
                <rect x="170" y="220" width="34" height="42" rx="3" />
                <rect x="214" y="220" width="34" height="42" rx="3" />
                <rect x="258" y="220" width="34" height="42" rx="3" />
                <rect x="306" y="220" width="40" height="42" rx="3" />
              </g>

              {/* Window Slats & Passenger Silhouettes */}
              <line x1="126" y1="248" x2="160" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="170" y1="248" x2="204" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="214" y1="248" x2="248" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="258" y1="248" x2="292" y2="248" stroke="#795548" strokeWidth="1.5" />
              <circle cx="187" cy="238" r="5" fill="#422517" opacity="0.5" />
              <circle cx="275" cy="238" r="5" fill="#422517" opacity="0.5" />

              {/* Side Plate on Coach 2 */}
              <rect x="190" y="328" width="82" height="13" rx="2" fill="#150205" stroke="#D4AF37" strokeWidth="1" />
              <text x="231" y="337.5" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#FCE2A6" textAnchor="middle" letterSpacing="0.8">
                #GouravKiDebu
              </text>
            </g>

            {/* VESTIBULE COUPLER (Connecting the Two Coaches) */}
            <g fill="#252020" stroke="#111" strokeWidth="1">
              <polygon points="360,218 376,214 376,346 360,342" />
              <line x1="364" y1="216" x2="364" y2="344" stroke="#444" strokeWidth="1.5" />
              <line x1="368" y1="215" x2="368" y2="345" stroke="#111" strokeWidth="1.5" />
              <line x1="372" y1="214" x2="372" y2="346" stroke="#444" strokeWidth="1.5" />
              <rect x="356" y="346" width="24" height="8" fill="#111" />
            </g>

            {/* ================= FRONT COACH (COACH 1) ================= */}
            <g id="tram-coach-front">
              {/* Shadow */}
              <ellipse cx="550" cy="365" rx="185" ry="9" fill="#000" opacity="0.75" />

              {/* Wheels */}
              <g fill="#1A1A1A" stroke="#4A4A4A" strokeWidth="2">
                <circle cx="445" cy="362" r="14" />
                <circle cx="445" cy="362" r="7" fill="#888" stroke="none" />
                <circle cx="490" cy="362" r="14" />
                <circle cx="490" cy="362" r="7" fill="#888" stroke="none" />
                <rect x="430" y="352" width="75" height="6" fill="#333" stroke="none" />

                <circle cx="625" cy="362" r="14" />
                <circle cx="625" cy="362" r="7" fill="#888" stroke="none" />
                <circle cx="670" cy="362" r="14" />
                <circle cx="670" cy="362" r="7" fill="#888" stroke="none" />
                <rect x="610" y="352" width="75" height="6" fill="#333" stroke="none" />

                {/* Cow Catcher / Lifeguard Grill at Front */}
                <polygon points="725,350 740,350 730,363 712,363" fill="#A51D2D" stroke="#D4AF37" strokeWidth="1" />
              </g>

              {/* Coach 1 Lower Body */}
              <rect x="376" y="273" width="345" height="77" rx="4" fill="url(#tramGreenBody)" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M 721 273 Q 736 283 736 312 Q 736 341 721 350 L 721 273 Z" fill="url(#tramGreenBody)" stroke="#D4AF37" strokeWidth="1.5" />

              {/* Maroon & Gold Trim Stripes */}
              <rect x="376" y="312" width="355" height="8" fill="url(#tramMaroonTrim)" stroke="#D4AF37" strokeWidth="0.8" />
              <line x1="376" y1="311" x2="731" y2="311" stroke="#FFF8E7" strokeWidth="1" />
              <line x1="376" y1="321" x2="731" y2="321" stroke="#D4AF37" strokeWidth="1" />

              {/* Coach 1 Upper Ivory Body */}
              <rect x="376" y="210" width="345" height="63" fill="url(#tramIvoryBody)" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M 721 210 Q 736 226 736 273 L 721 273 Z" fill="url(#tramIvoryBody)" stroke="#D4AF37" strokeWidth="1.2" />

              {/* Curved Roof */}
              <path d="M 370 210 Q 550 195 730 210 L 725 203 Q 550 188 376 203 Z" fill="#D2C09C" stroke="#7A6845" strokeWidth="1.5" />
              <rect x="382" y="203" width="340" height="3.5" fill="#8C7A58" />

              {/* DESTINATION SIGN BOARD: #GouravKiDebu */}
              <rect x="450" y="188" width="215" height="19" rx="3" fill="#150205" stroke="#D4AF37" strokeWidth="1.5" />
              <text x="557.5" y="202" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#FCE2A6" textAnchor="middle" letterSpacing="1.5">
                #GouravKiDebu
              </text>

              {/* Front Driver Windshield */}
              <path d="M 696 220 L 720 220 Q 728 236 726 264 L 696 264 Z" fill="url(#tramWindowGlow)" opacity="0.95" stroke="#5D4037" strokeWidth="2" filter="url(#tramGlowEffect)" />

              {/* Coach 1 Passenger Windows */}
              <g fill="url(#tramWindowGlow)" opacity="0.9" stroke="#4E342E" strokeWidth="2">
                <rect x="388" y="220" width="32" height="42" rx="3" />
                <rect x="428" y="220" width="32" height="42" rx="3" />
                <rect x="468" y="220" width="32" height="42" rx="3" />
                <rect x="508" y="220" width="32" height="42" rx="3" />
                <rect x="548" y="220" width="32" height="42" rx="3" />
                <rect x="588" y="220" width="32" height="42" rx="3" />
                <rect x="638" y="220" width="38" height="42" rx="3" />
              </g>

              {/* Window Slats & Silhouettes */}
              <line x1="388" y1="248" x2="420" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="428" y1="248" x2="460" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="468" y1="248" x2="500" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="508" y1="248" x2="540" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="548" y1="248" x2="580" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="588" y1="248" x2="620" y2="248" stroke="#795548" strokeWidth="1.5" />
              <line x1="638" y1="248" x2="676" y2="248" stroke="#795548" strokeWidth="1.5" />
              <circle cx="444" cy="238" r="5" fill="#422517" opacity="0.5" />
              <circle cx="524" cy="238" r="5" fill="#422517" opacity="0.5" />
              <circle cx="604" cy="238" r="5" fill="#422517" opacity="0.5" />

              {/* Wedding Livery Emblem & Hashtag */}
              <g transform="translate(545, 333)">
                <rect x="-75" y="-11" width="150" height="22" rx="4" fill="#150205" stroke="#D4AF37" strokeWidth="1.2" />
                <text x="0" y="3.5" fontFamily="serif" fontSize="9.5" fontWeight="bold" fill="#FCE2A6" textAnchor="middle" letterSpacing="1">
                  #GouravKiDebu
                </text>
              </g>

              {/* Tram Number Badge */}
              <rect x="668" y="328" width="36" height="12" rx="2" fill="#150205" stroke="#D4AF37" strokeWidth="1" />
              <text x="686" y="337.5" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#FCE2A6" textAnchor="middle">
                NO. 586
              </text>

              {/* Vintage Round Brass Front Headlight */}
              <circle cx="732" cy="305" r="10" fill="#D4AF37" stroke="#222" strokeWidth="1.5" />
              <circle cx="732" cy="305" r="8" fill="#FFF9C4" filter="url(#tramGlowEffect)" />
              <circle cx="732" cy="305" r="3.5" fill="#FFF" />
            </g>
          </g>
        </motion.g>

        {/* 9. FOREGROUND COLONIAL LETTERBOX */}
        <g transform="translate(45, 345)">
          <rect x="0" y="10" width="18" height="42" rx="9" fill="#B71C1C" stroke="#D4AF37" strokeWidth="1.2" />
          <rect x="4" y="20" width="10" height="2.5" fill="#000" />
          <circle cx="9" cy="8" r="2.5" fill="#D4AF37" />
          <rect x="2" y="52" width="14" height="4" fill="#222" />
        </g>
      </svg>
    </div>
  );
};
export default KolkataTramIllustration;
