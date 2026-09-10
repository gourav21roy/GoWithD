import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Bell, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types';

interface KolkataTramSectionProps {
  language: Language;
}

export const KolkataTramSection: React.FC<KolkataTramSectionProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bellRinging, setBellRinging] = useState(false);

  // Track scroll through this section to animate the tram gliding smoothly across
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax transformations calibrated for smooth, cinematic scrolling
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.3, 1, 1, 0.3]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);

  // Tram moving across Kolkata's streetcar rails driven smoothly by scroll
  const tramX = useTransform(scrollYProgress, [0, 1], [-190, 250]);
  const tramSway = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -1, 0.8, -0.8, 0]);

  // Authentic Kolkata Tram Conductor's Foot Gong / Brass Bell Chime synthesized cleanly via Web Audio API
  const handleRingBell = () => {
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 900);

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Strike 1: Clear crisp brass bell (~1568 Hz / High G)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1568, now);
      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);

      // Strike 2: Second chime 140ms later (~1760 Hz / High A) creating the nostalgic "Ding-Ding!"
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1760, now + 0.14);
      gain2.gain.setValueAtTime(0.28, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.14);
      osc2.stop(now + 0.7);
    } catch {
      // Graceful fallback if AudioContext is restricted
    }
  };

  // Trilingual titles and captions
  const badgeTitle = {
    en: 'Historic Kolkata Tramway • The Timeless Rhythm of Love',
    bn: 'কলকাতার ঐতিহ্যবাহী ট্রাম • স্মৃতির সরণি বেয়ে চিরন্তন প্রেম',
    hi: 'कोलकाता की ऐतिहासिक ट्राम • प्रेम और स्मृतियों का सुहाना सफर'
  }[language];

  const subCaption = {
    en: 'Gliding along the leafy boulevards of Maidan & College Street, echoing over a century of romance in the City of Joy',
    bn: 'ময়দানের শ্যামল ছায়া ও কলেজ স্ট্রিট পেরিয়ে—ভালোবাসার নতুন সরণিতে যুগলের অবিস্মরণীয় যাত্রা',
    hi: 'मैदान की हरी-भरी गलियों से होकर गुजरती, सिटी ऑफ जॉय में प्रेम और साथ का अमर प्रतीक'
  }[language];

  const bellLabel = {
    en: 'Ring the Tram Bell',
    bn: 'ট্রামের ঘণ্টা বাজান (টিং টিং)',
    hi: 'ट्राम की घंटी बजाएं'
  }[language];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none my-8 sm:my-12"
    >
      {/* Soft gradient masks at top & bottom so it integrates seamlessly into the page */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-b from-[#0B1B3D] via-[#0B1B3D]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/80 to-transparent z-20 pointer-events-none" />

      {/* Main Parallax Animated Canvas Container */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="relative w-full max-w-5xl mx-auto px-2 sm:px-4"
      >
        {/* Cultural Header Badge & Interactive Bell CTA */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-5 py-1.5 rounded-full bg-[#1A0206]/92 backdrop-blur-md border border-[#D4AF37]/55 shadow-xl text-[#FCE2A6] text-xs sm:text-sm font-serif">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7D070] animate-pulse shrink-0" />
            <span className="font-bold tracking-wider">{badgeTitle}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
          </div>

          <p className="mt-2 text-xs sm:text-sm text-[#FFF8E7]/75 font-sans tracking-wide max-w-2xl mx-auto px-4">
            {subCaption}
          </p>

          {/* Interactive Conductor Foot Gong Bell Button */}
          <div className="mt-3 flex justify-center">
            <button
              onClick={handleRingBell}
              className={`relative inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-serif font-semibold border transition-all duration-300 active:scale-95 shadow-lg ${
                bellRinging
                  ? 'bg-[#D4AF37] text-[#1A0206] border-[#FFF8E7] scale-105'
                  : 'bg-[#1A0206]/80 text-[#FCE2A6] border-[#D4AF37]/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20'
              }`}
            >
              <Bell className={`w-3.5 h-3.5 text-[#F7D070] ${bellRinging ? 'animate-bounce' : ''}`} />
              <span>{bellLabel}</span>
              {bellRinging && (
                <span className="text-[10px] font-bold text-rose-800 bg-[#FFF8E7] px-1.5 py-0.5 rounded-full animate-ping">
                  টিং টিং!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Scenic Canvas: Twilight Kolkata Street, Victorian Streetlamps, Overhead Wires & The Vintage CTC Tram */}
        <div className="relative w-full h-[240px] xs:h-[280px] sm:h-[340px] md:h-[390px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#091122] via-[#141E38] to-[#1C0E14] border border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <svg
            viewBox="0 0 1000 450"
            className="w-full h-full drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Twilight Kolkata Sky Gradient */}
              <linearGradient id="tramSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#060C1B" />
                <stop offset="45%" stopColor="#101D3B" />
                <stop offset="75%" stopColor="#2A162B" />
                <stop offset="100%" stopColor="#3D1822" />
              </linearGradient>

              {/* Tram Headlamp Golden Light Beam Cone */}
              <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>

              {/* Vintage Victorian Streetlamp Light Glow */}
              <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>

              {/* Kolkata Heritage CTC Tram Classic Livery (Sky Blue & Cream Body) */}
              <linearGradient id="tramCreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>

              <linearGradient id="tramBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="50%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>

              <linearGradient id="tramTrimMaroon" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#831843" />
                <stop offset="100%" stopColor="#500724" />
              </linearGradient>

              {/* Steel Rails Shiny Reflection */}
              <linearGradient id="steelRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="40%" stopColor="#94A3B8" />
                <stop offset="70%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Road Cobblestone Gradient */}
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="40%" stopColor="#182234" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Window Golden Interior Glow */}
              <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="40%" stopColor="#FDE68A" />
                <stop offset="85%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. SKY BACKGROUND */}
            <rect x="0" y="0" width="1000" height="450" fill="url(#tramSkyGrad)" />

            {/* Subtle Stars in Twilight Sky */}
            {[
              { cx: 80, cy: 40, r: 1.2 },
              { cx: 160, cy: 65, r: 1.5 },
              { cx: 280, cy: 30, r: 1.1 },
              { cx: 410, cy: 50, r: 1.6 },
              { cx: 560, cy: 35, r: 1.2 },
              { cx: 720, cy: 55, r: 1.4 },
              { cx: 860, cy: 45, r: 1.7 },
              { cx: 940, cy: 70, r: 1.3 },
              { cx: 340, cy: 80, r: 1.0 },
              { cx: 640, cy: 75, r: 1.2 }
            ].map((star, i) => (
              <circle key={`star-${i}`} cx={star.cx} cy={star.cy} r={star.r} fill="#FFF8E7" opacity="0.75" />
            ))}

            {/* Romantic Crescent Moon */}
            <g transform="translate(870, 45)">
              <circle cx="0" cy="0" r="28" fill="#FDE68A" opacity="0.15" />
              <path d="M 12,-16 A 20 20 0 0 0 12,16 A 16 16 0 0 1 12,-16 Z" fill="#FFFBEB" />
            </g>

            {/* 2. DISTANT KOLKATA HERITAGE COLONIAL BUILDINGS SILHOUETTE */}
            <g fill="#0B1325" opacity="0.75">
              {/* College Street / Esplanade Arched Colonial Facades */}
              <rect x="0" y="190" width="1000" height="150" />
              
              {/* Left Heritage Building */}
              <rect x="30" y="130" width="170" height="90" rx="3" />
              <polygon points="20,130 115,85 210,130" />
              <circle cx="115" cy="112" r="8" fill="#182236" />
              {/* Arched windows */}
              {[48, 85, 122, 160].map((wx, i) => (
                <rect key={`hw1-${i}`} x={wx} y="145" width="18" height="30" rx="9" fill="#182236" />
              ))}

              {/* Center Heritage Tower & Cornice */}
              <rect x="230" y="110" width="220" height="100" />
              <rect x="220" y="105" width="240" height="8" rx="2" />
              {/* Classical Balustrade & Pediment */}
              <polygon points="300,105 340,75 380,105" />
              {[250, 290, 330, 370, 410].map((wx, i) => (
                <g key={`hw2-${i}`}>
                  <rect x={wx} y="125" width="20" height="32" rx="10" fill="#F59E0B" opacity="0.3" />
                  <rect x={wx + 2} y="127" width="16" height="28" rx="8" fill="#182236" />
                </g>
              ))}

              {/* Right Colonial Mansion with Arches */}
              <rect x="520" y="140" width="190" height="80" rx="2" />
              <polygon points="505,140 615,100 725,140" />
              {[545, 595, 645, 685].map((wx, i) => (
                <rect key={`hw3-${i}`} x={wx} y="152" width="16" height="28" rx="8" fill="#182236" />
              ))}

              {/* Far Right Clock Tower / Landmark */}
              <rect x="760" y="100" width="130" height="120" />
              <polygon points="750,100 825,60 900,100" />
              <circle cx="825" cy="85" r="12" fill="#FDE68A" opacity="0.6" />
              <circle cx="825" cy="85" r="10" fill="#0B1325" />
              <line x1="825" y1="85" x2="825" y2="78" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="825" y1="85" x2="831" y2="85" stroke="#FDE68A" strokeWidth="1.5" />
            </g>

            {/* 3. MAIDAN TROPICAL BANYAN & RAIN TREES (Lush Greenery Canopy) */}
            <g fill="#06121E" opacity="0.9">
              {/* Left Foliage */}
              <circle cx="20" cy="180" r="65" />
              <circle cx="80" cy="160" r="55" />
              <circle cx="140" cy="180" r="45" />

              {/* Center Foliage */}
              <circle cx="490" cy="175" r="55" />
              <circle cx="535" cy="160" r="45" />

              {/* Right Foliage */}
              <circle cx="930" cy="170" r="70" />
              <circle cx="985" cy="155" r="60" />
            </g>

            {/* 4. OVERHEAD CATENARY ELECTRIC WIRES & TRAMWAY POSTS */}
            {/* Main high tension contact wire running across the entire city street */}
            <line x1="0" y1="120" x2="1000" y2="120" stroke="#475569" strokeWidth="2.5" />
            <line x1="0" y1="105" x2="1000" y2="105" stroke="#334155" strokeWidth="1.5" />
            {/* Dropper suspension wires */}
            {[70, 150, 230, 310, 390, 470, 550, 630, 710, 790, 870, 950].map((dx, i) => (
              <line key={`dropper-${i}`} x1={dx} y1="105" x2={dx} y2="120" stroke="#475569" strokeWidth="1" />
            ))}

            {/* Cast Iron Tramway Wire Poles */}
            {[180, 820].map((px, i) => (
              <g key={`tram-pole-${i}`}>
                <rect x={px - 4} y="95" width="8" height="230" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
                {/* Cross-arm brackets */}
                <line x1={px - 35} y1="105" x2={px + 35} y2="105" stroke="#334155" strokeWidth="3" />
                <line x1={px - 25} y1="120" x2={px + 25} y2="120" stroke="#475569" strokeWidth="2.5" />
                <path d={`M ${px - 25} 120 Q ${px} 105 ${px + 25} 120`} fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
              </g>
            ))}

            {/* 5. VINTAGE VICTORIAN STREETLAMPS (GLOWING WARM AMBER) */}
            {[
              { x: 110, y: 190 },
              { x: 890, y: 190 }
            ].map((lamp, i) => (
              <g key={`lamp-${i}`}>
                {/* Glowing Light Aura */}
                <circle cx={lamp.x} cy={lamp.y + 20} r="70" fill="url(#lampGlow)" />

                {/* Cast Iron Post */}
                <rect x={lamp.x - 3} y={lamp.y + 25} width="6" height="150" fill="#0F172A" />
                <rect x={lamp.x - 8} y={lamp.y + 165} width="16" height="12" rx="3" fill="#1E293B" />
                <rect x={lamp.x - 6} y={lamp.y + 60} width="12" height="6" rx="2" fill="#D4AF37" />

                {/* Ornate Curved Lantern Bracket */}
                <path d={`M ${lamp.x - 18} ${lamp.y + 20} Q ${lamp.x} ${lamp.y} ${lamp.x + 18} ${lamp.y + 20}`} fill="none" stroke="#0F172A" strokeWidth="3" />
                {/* Lantern Body */}
                <polygon points={`${lamp.x - 14},${lamp.y + 15} ${lamp.x + 14},${lamp.y + 15} ${lamp.x + 10},${lamp.y + 40} ${lamp.x - 10},${lamp.y + 40}`} fill="#FFFBEB" stroke="#D4AF37" strokeWidth="2" />
                <polygon points={`${lamp.x - 18},${lamp.y + 15} ${lamp.x + 18},${lamp.y + 15} ${lamp.x},${lamp.y + 5}`} fill="#0F172A" />
                {/* Warm Bulb Core */}
                <circle cx={lamp.x} cy={lamp.y + 27} r="5" fill="#FF9800" />
              </g>
            ))}

            {/* 6. COBBLESTONE ROADWAY & DUAL EMBEDDED STEEL TRAM TRACKS */}
            <rect x="0" y="315" width="1000" height="135" fill="url(#roadGrad)" />

            {/* Perspective Cobblestone Grooves */}
            {[335, 360, 390, 420].map((ry, i) => (
              <line key={`cobb-h-${i}`} x1="0" y1={ry} x2="1000" y2={ry} stroke="#334155" strokeWidth="1" strokeDasharray="14 10" opacity="0.3" />
            ))}

            {/* Gleaming Steel Rails 1 (Far Rail) */}
            <rect x="0" y="340" width="1000" height="4" fill="url(#steelRailGrad)" />
            <line x1="0" y1="340" x2="1000" y2="340" stroke="#F1F5F9" strokeWidth="1" opacity="0.8" />

            {/* Gleaming Steel Rails 2 (Near Rail) */}
            <rect x="0" y="375" width="1000" height="5" fill="url(#steelRailGrad)" />
            <line x1="0" y1="375" x2="1000" y2="375" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />

            {/* Track Grooves & Sleepers */}
            {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((tx, i) => (
              <rect key={`tie-${i}`} x={tx + 30} y="342" width="6" height="34" fill="#0B1325" opacity="0.6" />
            ))}

            {/* 7. SCROLL-ANIMATED VINTAGE KOLKATA CTC TRAM (HERITAGE STREETCAR) */}
            <motion.g
              style={{ x: tramX, y: tramSway }}
              className="drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
            >
              {/* HEADLIGHT BEAM CAST FORWARD ONTO TRACKS & ROAD */}
              <polygon
                points="425,325 900,290 950,420 425,340"
                fill="url(#headlightBeam)"
                className="pointer-events-none"
              />

              {/* PANTOGRAPH (DIAMOND TROLLEY POLE) CONNECTING TO OVERHEAD WIRE */}
              <g id="tram-pantograph">
                {/* Contact shoe sliding on wire */}
                <rect x="335" y="117" width="26" height="4" rx="2" fill="#E2E8F0" stroke="#D4AF37" strokeWidth="1" />
                
                {/* Electric Contact Spark Point */}
                <circle cx="348" cy="119" r="3" fill="#38BDF8" className="animate-ping" opacity="0.75" />
                <polygon points="348,113 350,118 355,119 350,121 348,126 346,121 341,119 346,118" fill="#FFFDF5" />

                {/* Upper Diamond Arms */}
                <line x1="348" y1="120" x2="330" y2="165" stroke="#64748B" strokeWidth="3" />
                <line x1="348" y1="120" x2="366" y2="165" stroke="#64748B" strokeWidth="3" />
                <line x1="330" y1="165" x2="366" y2="165" stroke="#475569" strokeWidth="2.5" />

                {/* Lower Springs and Mount Arms */}
                <line x1="330" y1="165" x2="340" y2="210" stroke="#64748B" strokeWidth="3.5" />
                <line x1="366" y1="165" x2="356" y2="210" stroke="#64748B" strokeWidth="3.5" />
                
                {/* Roof Mount Base */}
                <rect x="330" y="210" width="36" height="6" rx="2" fill="#1E293B" stroke="#D4AF37" strokeWidth="1" />
              </g>

              {/* TRAM BODY COACH (HERITAGE 2-BAY STREETCAR WITH CURVED FRONT) */}
              <g id="tram-body">
                {/* ROOF STRUCTURE */}
                {/* Rounded Clerestory Monitor Roof */}
                <path
                  d="M 50 216 Q 240 208 420 216 L 428 225 L 45 225 Z"
                  fill="url(#tramCreamGrad)"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <rect x="52" y="222" width="370" height="4" fill="#831843" />

                {/* MAIN CAR BODY (Upper Cream, Lower Kolkata Sky-Blue) */}
                {/* Upper Cream Window Band */}
                <path
                  d="M 45 225 L 428 225 C 435 240 435 270 432 285 L 40 285 C 38 270 38 240 45 225 Z"
                  fill="url(#tramCreamGrad)"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />

                {/* Maroon Accent Stripe */}
                <rect x="38" y="283" width="395" height="6" fill="url(#tramTrimMaroon)" />

                {/* Lower Heritage Blue Body */}
                <path
                  d="M 38 288 L 433 288 C 433 310 430 330 422 342 L 48 342 C 40 330 38 310 38 288 Z"
                  fill="url(#tramBlueGrad)"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />

                {/* Golden Body Filigree Line */}
                <line x1="45" y1="322" x2="425" y2="322" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="18 4" />

                {/* FRONT CAB DRIVER COCKPIT & DESTINATION BOARD */}
                {/* Front Arched Windshield */}
                <path
                  d="M 390 232 L 424 232 C 427 245 427 270 424 280 L 390 280 Z"
                  fill="url(#windowGlow)"
                  stroke="#475569"
                  strokeWidth="2"
                />
                {/* Driver silhouette */}
                <circle cx="406" cy="254" r="7" fill="#1E293B" />
                <path d="M 398 280 L 416 280 L 414 263 L 399 263 Z" fill="#1E293B" />

                {/* Route Header Board: ROUTE 24 • SHUBHO BIBAHO SPECIAL */}
                <g transform="translate(365, 218)">
                  <rect x="0" y="0" width="62" height="12" rx="3" fill="#1E0308" stroke="#D4AF37" strokeWidth="1.2" />
                  <text x="31" y="9" fill="#FFF8E7" fontSize="6.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                    ROUTE 24 • বিবাহ
                  </text>
                </g>

                {/* Large Vintage Cyclops Headlamp */}
                <circle cx="428" cy="312" r="10" fill="#D4AF37" stroke="#FFF8E7" strokeWidth="2" />
                <circle cx="428" cy="312" r="7" fill="#FFFDF5" />
                <circle cx="429" cy="312" r="4" fill="#FEF08A" />

                {/* Traditional Marigold Flower Garland on the Tram Front */}
                <g transform="translate(415, 305)">
                  {[0, 8, 16, 24].map((gy, i) => (
                    <circle key={`garl-${i}`} cx={Math.sin(i) * 3} cy={gy} r="3.2" fill="#F97316" stroke="#FEF08A" strokeWidth="1" />
                  ))}
                </g>

                {/* CTC Kolkata Tramways Vintage Crest Emblem */}
                <circle cx="395" cy="308" r="9" fill="#1E293B" stroke="#D4AF37" strokeWidth="1.5" />
                <text x="395" y="311.5" fill="#D4AF37" fontSize="6" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                  CTC
                </text>

                {/* SIDE PANORAMIC WOODEN SHUTTER WINDOWS (GLOWING WARM GOLDEN) */}
                {/* 6 Passenger Window Bays */}
                {[60, 105, 150, 205, 255, 305, 350].map((wx, idx) => (
                  <g key={`tram-win-${idx}`}>
                    {/* Outer Window Frame */}
                    <rect x={wx} y="232" width="36" height="48" rx="5" fill="url(#windowGlow)" stroke="#334155" strokeWidth="2" />
                    {/* Wooden Vent Louvers */}
                    <line x1={wx} y1="240" x2={wx + 36} y2="240" stroke="#78350F" strokeWidth="1.5" />
                    <line x1={wx} y1="248" x2={wx + 36} y2="248" stroke="#78350F" strokeWidth="1" />
                    
                    {/* Glass Glare Reflection */}
                    <line x1={wx + 6} y1="234" x2={wx + 20} y2="278" stroke="#FFFDF5" strokeWidth="1.2" opacity="0.5" />
                  </g>
                ))}

                {/* HAPPY COUPLE SILHOUETTES INSIDE WINDOW 3 & 4 (Groom Topor & Bride Mukut) */}
                <g id="couple-in-tram">
                  {/* Window at x=205: Groom with Topor */}
                  <g transform="translate(216, 246)">
                    {/* Groom Topor Motif */}
                    <polygon points="12,0 17,14 7,14" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="1" />
                    <circle cx="12" cy="19" r="5" fill="#1E293B" />
                    <path d="M 6 34 L 18 34 L 18 24 L 6 24 Z" fill="#1E293B" />
                  </g>

                  {/* Window at x=255: Bride with Mukut & Veil */}
                  <g transform="translate(266, 248)">
                    {/* Bride Mukut Motif */}
                    <path d="M 6,10 Q 12,2 18,10 Q 15,7 12,8 Q 9,7 6,10 Z" fill="#D4AF37" />
                    <circle cx="12" cy="17" r="4.5" fill="#1E293B" />
                    <path d="M 6 32 L 18 32 L 18 22 L 6 22 Z" fill="#881337" />
                    {/* Red bridal veil touch */}
                    <path d="M 8,15 Q 4,22 5,30" fill="none" stroke="#BE123C" strokeWidth="2" />
                  </g>

                  {/* Floating Love Heart Between Them */}
                  <g transform="translate(245, 242)" className="animate-pulse">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </g>
                </g>

                {/* SIDE WEDDING CELEBRATION COMMEMORATIVE BANNER */}
                <g transform="translate(75, 296)">
                  <rect x="0" y="0" width="220" height="20" rx="4" fill="#FFFDF5" stroke="#D4AF37" strokeWidth="1.5" />
                  <text x="110" y="14" fill="#831843" fontSize="9.5" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
                    Gourav & Debalina • শুভ বিবাহ স্পেশাল
                  </text>
                  <circle cx="10" cy="10" r="3" fill="#D4AF37" />
                  <circle cx="210" cy="10" r="3" fill="#D4AF37" />
                </g>

                {/* PASSENGER BOARDING DOOR & BRASS HANDRAIL */}
                <g transform="translate(192, 230)">
                  <rect x="0" y="0" width="10" height="110" fill="#0B1325" stroke="#1E293B" strokeWidth="1" />
                  {/* Polished Brass Handrail */}
                  <line x1="5" y1="20" x2="5" y2="90" stroke="#D4AF37" strokeWidth="2" />
                </g>

                {/* FRONT HEAVY-DUTY CHROME BUMPER & LIFEMAP COWCATCHER */}
                <rect x="420" y="340" width="20" height="7" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                <line x1="418" y1="347" x2="438" y2="347" stroke="#D4AF37" strokeWidth="2" />

                {/* UNDERCARRIAGE BOGIE WHEELS SITUATED DIRECTLY ON STEEL RAILS */}
                {/* Front Bogie */}
                <g transform="translate(340, 342)">
                  <rect x="-10" y="0" width="70" height="10" rx="2" fill="#0F172A" />
                  {/* Wheel 1 */}
                  <circle cx="8" cy="18" r="14" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="8" cy="18" r="7" fill="#0F172A" />
                  <circle cx="8" cy="18" r="2.5" fill="#D4AF37" />
                  {/* Wheel 2 */}
                  <circle cx="46" cy="18" r="14" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="46" cy="18" r="7" fill="#0F172A" />
                  <circle cx="46" cy="18" r="2.5" fill="#D4AF37" />
                  {/* Brake Shoe */}
                  <rect x="22" y="14" width="10" height="5" rx="1" fill="#475569" />
                </g>

                {/* Rear Bogie */}
                <g transform="translate(90, 342)">
                  <rect x="-10" y="0" width="70" height="10" rx="2" fill="#0F172A" />
                  {/* Wheel 1 */}
                  <circle cx="8" cy="18" r="14" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="8" cy="18" r="7" fill="#0F172A" />
                  <circle cx="8" cy="18" r="2.5" fill="#D4AF37" />
                  {/* Wheel 2 */}
                  <circle cx="46" cy="18" r="14" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="46" cy="18" r="7" fill="#0F172A" />
                  <circle cx="46" cy="18" r="2.5" fill="#D4AF37" />
                  {/* Brake Shoe */}
                  <rect x="22" y="14" width="10" height="5" rx="1" fill="#475569" />
                </g>
              </g>
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
