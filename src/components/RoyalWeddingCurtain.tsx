import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { triggerRosePetalsShower } from '../utils/firecrackers';

interface RoyalWeddingCurtainProps {
  language: Language;
}

export const RoyalWeddingCurtain: React.FC<RoyalWeddingCurtainProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Distance in px of scroll needed to fully open curtains
  const SCROLL_THRESHOLD = 240;

  const handleScroll = useCallback(() => {
    const y = window.scrollY || window.pageYOffset;
    setScrollY(y);
    const progress = Math.min(1, Math.max(0, y / SCROLL_THRESHOLD));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smoothly trigger opening when user taps the curtain or seal
  const handleUnveilClick = (e?: React.MouseEvent) => {
    let originX = 0.5;
    let originY = 0.55;
    if (e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      originX = (rect.left + rect.width / 2) / (window.innerWidth || 1);
      originY = (rect.top + rect.height / 2) / (window.innerHeight || 1);
    }
    triggerRosePetalsShower(originX, originY);

    const heroEl = document.getElementById('hero-invitation-container') || document.getElementById('hero-section');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: SCROLL_THRESHOLD + 400,
        behavior: 'smooth'
      });
    }
  };

  // If user has scrolled way past the hero section, avoid rendering overhead
  if (typeof window !== 'undefined' && scrollY > (window.innerHeight || 900) * 1.5) {
    return null;
  }

  // Curtain offset when scrolling past threshold so it scrolls up with the hero section
  const containerTranslateY = scrollY > SCROLL_THRESHOLD ? -(scrollY - SCROLL_THRESHOLD) : 0;
  const isFullyOpen = scrollProgress >= 0.98;

  return (
    <div
      id="royal-wedding-curtain"
      className="fixed inset-0 z-40 overflow-hidden select-none transition-opacity duration-300"
      style={{
        transform: `translate3d(0, ${containerTranslateY}px, 0)`,
        pointerEvents: isFullyOpen ? 'none' : 'auto'
      }}
      onClick={!isFullyOpen ? handleUnveilClick : undefined}
    >
      {/* SVG Pattern Definitions for Velvet & Gold Borders */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Deep Velvet Gradient */}
          <linearGradient id="velvetGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#120104" />
            <stop offset="18%" stopColor="#32060C" />
            <stop offset="35%" stopColor="#550A14" />
            <stop offset="52%" stopColor="#280307" />
            <stop offset="70%" stopColor="#4A0811" />
            <stop offset="88%" stopColor="#200206" />
            <stop offset="100%" stopColor="#3E070F" />
          </linearGradient>

          <linearGradient id="velvetGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#120104" />
            <stop offset="18%" stopColor="#32060C" />
            <stop offset="35%" stopColor="#550A14" />
            <stop offset="52%" stopColor="#280307" />
            <stop offset="70%" stopColor="#4A0811" />
            <stop offset="88%" stopColor="#200206" />
            <stop offset="100%" stopColor="#3E070F" />
          </linearGradient>

          {/* Gold Zari Embroidery Gradient */}
          <linearGradient id="goldZariGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCE2A6" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="60%" stopColor="#AA820A" />
            <stop offset="85%" stopColor="#F7D070" />
            <stop offset="100%" stopColor="#876505" />
          </linearGradient>

          {/* Golden Silk Ribbon Shading */}
          <linearGradient id="silkGoldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#876505" />
            <stop offset="25%" stopColor="#FCE2A6" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#FFF8E7" />
            <stop offset="100%" stopColor="#AA820A" />
          </linearGradient>

          {/* Soft Velvet Shadow for Pleats */}
          <linearGradient id="foldShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.75)" />
          </linearGradient>
        </defs>
      </svg>

      {/* LEFT VELVET CURTAIN PANEL */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[53%] z-10 will-change-transform transition-transform ease-out"
        style={{
          transform: `translate3d(-${scrollProgress * 102}%, 0, 0) skewY(${scrollProgress * -2}deg)`,
          transformOrigin: 'top left',
          boxShadow: isFullyOpen ? 'none' : '15px 0 45px rgba(0,0,0,0.85)'
        }}
      >
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 530 1000"
          preserveAspectRatio="none"
        >
          {/* Base Deep Velvet Fabric */}
          <rect x="0" y="0" width="530" height="1000" fill="url(#velvetGradientLeft)" />

          {/* Deep Vertical Velvet Folds (Pleats) */}
          <path d="M 0 0 C 40 200, 30 700, 0 1000 L 90 1000 C 65 700, 75 200, 90 0 Z" fill="rgba(0,0,0,0.4)" />
          <path d="M 90 0 C 130 250, 110 750, 90 1000 L 180 1000 C 150 750, 170 250, 180 0 Z" fill="rgba(255,255,255,0.06)" />
          <path d="M 180 0 C 220 300, 200 700, 180 1000 L 270 1000 C 240 700, 260 300, 270 0 Z" fill="rgba(0,0,0,0.42)" />
          <path d="M 270 0 C 315 250, 290 750, 270 1000 L 360 1000 C 330 750, 355 250, 360 0 Z" fill="rgba(255,255,255,0.05)" />
          <path d="M 360 0 C 400 300, 380 700, 360 1000 L 450 1000 C 425 700, 440 300, 450 0 Z" fill="rgba(0,0,0,0.45)" />
          <path d="M 450 0 C 490 250, 470 750, 450 1000 L 515 1000 C 495 750, 510 250, 515 0 Z" fill="rgba(255,255,255,0.08)" />

          {/* Scalloped Bottom Edge Drapery Curves */}
          <path
            d="M 0 970 Q 45 995 90 970 Q 135 995 180 970 Q 225 995 270 970 Q 315 995 360 970 Q 405 995 450 970 Q 490 995 530 970 L 530 1000 L 0 1000 Z"
            fill="#120104"
          />

          {/* Gold Bullion Fringe at Bottom Hem */}
          <path
            d="M 0 970 Q 45 995 90 970 Q 135 995 180 970 Q 225 995 270 970 Q 315 995 360 970 Q 405 995 450 970 Q 490 995 530 970"
            fill="none"
            stroke="url(#goldZariGrad)"
            strokeWidth="5"
          />
          {/* Hanging Tassels along bottom hem */}
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={`left-tassel-${i}`}>
              <line
                x1={15 + i * 29}
                y1={975 + Math.sin(i * 1.1) * 8}
                x2={15 + i * 29}
                y2={996 + Math.sin(i * 1.1) * 8}
                stroke="#D4AF37"
                strokeWidth="2.5"
              />
              <circle
                cx={15 + i * 29}
                cy={997 + Math.sin(i * 1.1) * 8}
                r="3"
                fill="#FCE2A6"
              />
            </g>
          ))}

          {/* Regal Gold Zari Embroidered Vertical Border along the Meeting Seam */}
          <rect x="506" y="0" width="24" height="1000" fill="url(#goldZariGrad)" />
          <line x1="507" y1="0" x2="507" y2="1000" stroke="#FFF8E7" strokeWidth="1.5" />
          <line x1="529" y1="0" x2="529" y2="1000" stroke="#684D02" strokeWidth="2" />
          
          {/* Paisley / Floral Motifs down the Gold Border */}
          {Array.from({ length: 25 }).map((_, i) => (
            <g key={`left-border-motif-${i}`} transform={`translate(509, ${20 + i * 40})`}>
              <circle cx="9" cy="9" r="4" fill="#68101C" />
              <polygon points="9,2 14,9 9,16 4,9" fill="#FFF8E7" />
              <circle cx="9" cy="9" r="2" fill="#D4AF37" />
            </g>
          ))}

          {/* Left Curtain Swag Tieback Rope & Big Ornamental Tassel */}
          <g transform="translate(40, 520)">
            <path
              d="M -50 0 C 10 30, 80 40, 160 10"
              fill="none"
              stroke="url(#silkGoldRibbon)"
              strokeWidth="10"
              strokeLinecap="round"
              filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
            />
            {/* Tassel Cap and Skirt */}
            <circle cx="150" cy="18" r="12" fill="#FCE2A6" stroke="#AA820A" strokeWidth="3" />
            <path d="M 140 26 L 160 26 L 168 70 L 132 70 Z" fill="url(#goldZariGrad)" />
            <line x1="132" y1="70" x2="168" y2="70" stroke="#AA820A" strokeWidth="3" />
            {Array.from({ length: 6 }).map((_, ti) => (
              <line
                key={`tassel-fringe-l-${ti}`}
                x1={135 + ti * 6}
                y1="70"
                x2={135 + ti * 6}
                y2="90"
                stroke="#FCE2A6"
                strokeWidth="1.8"
              />
            ))}
          </g>

          {/* Grand Golden Silk Ceremonial Ribbon Sash across Left Curtain */}
          <g id="left-ceremonial-ribbon">
            {/* Ribbon Drop Shadow */}
            <path
              d="M 0 497 C 160 522, 350 500, 530 505"
              fill="none"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Broad Rich Golden Satin Ribbon */}
            <path
              d="M 0 493 C 160 518, 350 496, 530 501"
              fill="none"
              stroke="url(#silkGoldRibbon)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Golden Zari Embroidery Edges */}
            <path
              d="M 0 484 C 160 509, 350 487, 530 492"
              fill="none"
              stroke="url(#goldZariGrad)"
              strokeWidth="2.5"
            />
            <path
              d="M 0 502 C 160 527, 350 505, 530 510"
              fill="none"
              stroke="url(#goldZariGrad)"
              strokeWidth="2.5"
            />
            {/* Golden Ribbon Bow & Flowing Ribbon Tails near Center */}
            <g transform="translate(470, 492)">
              <path
                d="M 0 5 C -25 -18, -55 10, -5 18 Z"
                fill="url(#silkGoldRibbon)"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <path
                d="M -8 18 C -22 45, -35 80, -25 110 L -14 110 C -22 80, -12 45, 0 18 Z"
                fill="url(#silkGoldRibbon)"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <line x1="-25" y1="110" x2="-14" y2="110" stroke="#FCE2A6" strokeWidth="4" />
            </g>
          </g>
        </svg>
      </div>

      {/* RIGHT VELVET CURTAIN PANEL */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[53%] z-10 will-change-transform transition-transform ease-out"
        style={{
          transform: `translate3d(${scrollProgress * 102}%, 0, 0) skewY(${scrollProgress * 2}deg)`,
          transformOrigin: 'top right',
          boxShadow: isFullyOpen ? 'none' : '-15px 0 45px rgba(0,0,0,0.85)'
        }}
      >
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 530 1000"
          preserveAspectRatio="none"
        >
          {/* Base Deep Velvet Fabric */}
          <rect x="0" y="0" width="530" height="1000" fill="url(#velvetGradientRight)" />

          {/* Deep Vertical Velvet Folds (Pleats) */}
          <path d="M 530 0 C 490 200, 500 700, 530 1000 L 440 1000 C 465 700, 455 200, 440 0 Z" fill="rgba(0,0,0,0.4)" />
          <path d="M 440 0 C 400 250, 420 750, 440 1000 L 350 1000 C 380 750, 360 250, 350 0 Z" fill="rgba(255,255,255,0.06)" />
          <path d="M 350 0 C 310 300, 330 700, 350 1000 L 260 1000 C 290 700, 270 300, 260 0 Z" fill="rgba(0,0,0,0.42)" />
          <path d="M 260 0 C 215 250, 240 750, 260 1000 L 170 1000 C 200 750, 175 250, 170 0 Z" fill="rgba(255,255,255,0.05)" />
          <path d="M 170 0 C 130 300, 150 700, 170 1000 L 80 1000 C 105 700, 90 300, 80 0 Z" fill="rgba(0,0,0,0.45)" />
          <path d="M 80 0 C 40 250, 60 750, 80 1000 L 15 1000 C 35 750, 20 250, 15 0 Z" fill="rgba(255,255,255,0.08)" />

          {/* Scalloped Bottom Edge Drapery Curves */}
          <path
            d="M 530 970 Q 485 995 440 970 Q 395 995 350 970 Q 305 995 260 970 Q 215 995 170 970 Q 125 995 80 970 Q 40 995 0 970 L 0 1000 L 530 1000 Z"
            fill="#120104"
          />

          {/* Gold Bullion Fringe at Bottom Hem */}
          <path
            d="M 530 970 Q 485 995 440 970 Q 395 995 350 970 Q 305 995 260 970 Q 215 995 170 970 Q 125 995 80 970 Q 40 995 0 970"
            fill="none"
            stroke="url(#goldZariGrad)"
            strokeWidth="5"
          />
          {/* Hanging Tassels along bottom hem */}
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={`right-tassel-${i}`}>
              <line
                x1={515 - i * 29}
                y1={975 + Math.sin(i * 1.1) * 8}
                x2={515 - i * 29}
                y2={996 + Math.sin(i * 1.1) * 8}
                stroke="#D4AF37"
                strokeWidth="2.5"
              />
              <circle
                cx={515 - i * 29}
                cy={997 + Math.sin(i * 1.1) * 8}
                r="3"
                fill="#FCE2A6"
              />
            </g>
          ))}

          {/* Regal Gold Zari Embroidered Vertical Border along the Meeting Seam */}
          <rect x="0" y="0" width="24" height="1000" fill="url(#goldZariGrad)" />
          <line x1="23" y1="0" x2="23" y2="1000" stroke="#FFF8E7" strokeWidth="1.5" />
          <line x1="1" y1="0" x2="1" y2="1000" stroke="#684D02" strokeWidth="2" />

          {/* Paisley / Floral Motifs down the Gold Border */}
          {Array.from({ length: 25 }).map((_, i) => (
            <g key={`right-border-motif-${i}`} transform={`translate(3, ${20 + i * 40})`}>
              <circle cx="9" cy="9" r="4" fill="#68101C" />
              <polygon points="9,2 14,9 9,16 4,9" fill="#FFF8E7" />
              <circle cx="9" cy="9" r="2" fill="#D4AF37" />
            </g>
          ))}

          {/* Right Curtain Swag Tieback Rope & Big Ornamental Tassel */}
          <g transform="translate(370, 520)">
            <path
              d="M 210 0 C 150 30, 80 40, 0 10"
              fill="none"
              stroke="url(#silkGoldRibbon)"
              strokeWidth="10"
              strokeLinecap="round"
              filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
            />
            {/* Tassel Cap and Skirt */}
            <circle cx="10" cy="18" r="12" fill="#FCE2A6" stroke="#AA820A" strokeWidth="3" />
            <path d="M 0 26 L 20 26 L 28 70 L -8 70 Z" fill="url(#goldZariGrad)" />
            <line x1="-8" y1="70" x2="28" y2="70" stroke="#AA820A" strokeWidth="3" />
            {Array.from({ length: 6 }).map((_, ti) => (
              <line
                key={`tassel-fringe-r-${ti}`}
                x1={-5 + ti * 6}
                y1="70"
                x2={-5 + ti * 6}
                y2="90"
                stroke="#FCE2A6"
                strokeWidth="1.8"
              />
            ))}
          </g>

          {/* Grand Golden Silk Ceremonial Ribbon Sash across Right Curtain */}
          <g id="right-ceremonial-ribbon">
            {/* Ribbon Drop Shadow */}
            <path
              d="M 0 505 C 180 500, 370 522, 530 497"
              fill="none"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Broad Rich Golden Satin Ribbon */}
            <path
              d="M 0 501 C 180 496, 370 518, 530 493"
              fill="none"
              stroke="url(#silkGoldRibbon)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Golden Zari Embroidery Edges */}
            <path
              d="M 0 492 C 180 487, 370 509, 530 484"
              fill="none"
              stroke="url(#goldZariGrad)"
              strokeWidth="2.5"
            />
            <path
              d="M 0 510 C 180 505, 370 527, 530 502"
              fill="none"
              stroke="url(#goldZariGrad)"
              strokeWidth="2.5"
            />
            {/* Golden Ribbon Bow & Flowing Ribbon Tails near Center */}
            <g transform="translate(60, 492)">
              <path
                d="M 0 5 C 25 -18, 55 10, 5 18 Z"
                fill="url(#silkGoldRibbon)"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <path
                d="M 8 18 C 22 45, 35 80, 25 110 L 14 110 C 22 80, 12 45, 0 18 Z"
                fill="url(#silkGoldRibbon)"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <line x1="14" y1="110" x2="25" y2="110" stroke="#FCE2A6" strokeWidth="4" />
            </g>
          </g>
        </svg>
      </div>

      {/* TOP REGAL SCALLOPED PELMET / VALANCE (TORAN) */}
      <div
        className="absolute top-0 inset-x-0 h-28 sm:h-36 pointer-events-none z-30 transition-transform ease-out will-change-transform"
        style={{
          transform: `translate3d(0, -${scrollProgress * 40}%, 0)`,
          opacity: Math.max(0.2, 1 - scrollProgress * 0.4)
        }}
      >
        <svg
          className="w-full h-full drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)]"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
        >
          {/* Top Straight Hanging Rail */}
          <rect x="0" y="0" width="1200" height="24" fill="#2A050B" stroke="#D4AF37" strokeWidth="2.5" />
          <rect x="0" y="2" width="1200" height="6" fill="#FCE2A6" opacity="0.6" />

          {/* Scalloped Maroon Swag Pelmet */}
          <path
            d="M 0 24 
               Q 100 135 200 24 
               Q 300 135 400 24 
               Q 500 135 600 24 
               Q 700 135 800 24 
               Q 900 135 1000 24 
               Q 1100 135 1200 24 
               L 1200 0 L 0 0 Z"
            fill="#3B0711"
          />

          {/* Inner Shadow & Highlighting Swags */}
          <path
            d="M 15 24 
               Q 100 115 185 24 
               M 215 24 
               Q 300 115 385 24 
               M 415 24 
               Q 500 115 585 24 
               M 615 24 
               Q 700 115 785 24 
               M 815 24 
               Q 900 115 985 24 
               M 1015 24 
               Q 1100 115 1185 24"
            fill="none"
            stroke="#120104"
            strokeWidth="14"
            opacity="0.65"
          />

          {/* Golden Scallop Embroidery Edging */}
          <path
            d="M 0 24 
               Q 100 135 200 24 
               Q 300 135 400 24 
               Q 500 135 600 24 
               Q 700 135 800 24 
               Q 900 135 1000 24 
               Q 1100 135 1200 24"
            fill="none"
            stroke="url(#goldZariGrad)"
            strokeWidth="4.5"
          />

          {/* Hanging Golden Marigold Drops between Swags */}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((cx, idx) => (
            <g key={`swag-drop-${idx}`}>
              <line x1={cx} y1="24" x2={cx} y2={idx % 2 === 0 ? "110" : "50"} stroke="#D4AF37" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx={cx} cy={idx % 2 === 0 ? "115" : "55"} r="5.5" fill="#E2583E" stroke="#FCE2A6" strokeWidth="1.5" />
              <circle cx={cx} cy={idx % 2 === 0 ? "124" : "64"} r="3" fill="#D4AF37" />
            </g>
          ))}
        </svg>
      </div>

      {/* CENTER GOLDEN MEDALLION / MINIMALIST AUSPICIOUS SEAL */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300 pointer-events-none z-50"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 1.8),
          transform: `scale(${1 - scrollProgress * 0.2}) translateY(-${scrollProgress * 30}px)`
        }}
      >
        <div
          className="relative w-32 h-32 xs:w-34 xs:h-34 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#6A0617] via-[#480410] to-[#250208] border-2 border-[#D4AF37] p-2 flex flex-col items-center justify-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_2px_8px_rgba(247,208,112,0.35),inset_0_-4px_12px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer pointer-events-auto transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          onClick={handleUnveilClick}
        >
          {/* Concentric Stamped Wax Rim with Gold Beaded Dash */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#F7D070]/50 pointer-events-none" />

          {/* Sacred Crest: Swastik Flanked by Groom & Bride Emblems (Topor & Mukut) */}
          <div className="relative flex items-center justify-center space-x-1.5 mb-1.5">
            {/* Topor (Groom Emblem) */}
            <svg className="w-3.5 h-3.5 text-[#F7D070] drop-shadow-[0_1px_3px_rgba(212,175,55,0.6)] shrink-0" viewBox="0 0 100 100" fill="currentColor">
              <polygon points="50,10 75,80 25,80" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="3" />
              <circle cx="50" cy="8" r="5" fill="#E2583E" />
              <line x1="35" y1="40" x2="65" y2="40" stroke="#E2583E" strokeWidth="2" />
              <line x1="30" y1="60" x2="70" y2="60" stroke="#D4AF37" strokeWidth="2" />
              <rect x="20" y="80" width="60" height="10" rx="3" fill="#D4AF37" />
            </svg>

            {/* Sacred Swastik */}
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F7D070] via-[#D4AF37] to-[#876505] flex items-center justify-center text-[#1A0206] font-bold text-[10px] shadow-sm border border-[#FFF8E7] drop-shadow-[0_1px_4px_rgba(212,175,55,0.7)]">
              卐
            </div>

            {/* Mukut (Bride Emblem) */}
            <svg className="w-3.5 h-3.5 text-[#F7D070] drop-shadow-[0_1px_3px_rgba(212,175,55,0.6)] shrink-0" viewBox="0 0 100 100" fill="currentColor">
              <path d="M 20 75 Q 50 15 80 75 Q 50 55 20 75 Z" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="3" />
              <circle cx="50" cy="18" r="5" fill="#E2583E" />
              <circle cx="35" cy="50" r="3" fill="#D4AF37" />
              <circle cx="65" cy="50" r="3" fill="#D4AF37" />
              <rect x="15" y="75" width="70" height="8" rx="2" fill="#D4AF37" />
            </svg>
          </div>

          {/* Centered Multi-line Scroll to Open Button */}
          <button
            id="curtain-unveil-btn"
            onClick={handleUnveilClick}
            className="inline-flex flex-col items-center justify-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#FCE2A6] to-[#D4AF37] text-[#1A0206] font-serif font-bold shadow-[0_3px_10px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-95 transition-all group cursor-pointer z-10 border border-[#FFF8E7]/60"
          >
            <span className="tracking-widest uppercase font-black text-[8px] sm:text-[9px] text-[#1A0206] drop-shadow-sm leading-none whitespace-nowrap">
              {t['curtain-unveil-line1'] || 'Scroll'}
            </span>
            <span className="tracking-widest uppercase font-bold text-[7.5px] sm:text-[8.5px] text-[#1A0206] drop-shadow-sm leading-tight whitespace-nowrap mt-0.5">
              {t['curtain-unveil-line2'] || 'To Open'}
            </span>
          </button>

          {/* Animated Chevron Outside the Button */}
          <div className="flex items-center justify-center mt-[5px] pointer-events-none">
            <ChevronDown className="w-3.5 h-3.5 text-[#FCE2A6] animate-bounce shrink-0 stroke-[2.5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};
