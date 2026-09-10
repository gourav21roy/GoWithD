import React, { useState } from 'react';
import { Sparkles, Compass, MapPin, Eye } from 'lucide-react';

interface HowrahBridgeFestiveProps {
  className?: string;
}

export const HowrahBridgeFestive: React.FC<HowrahBridgeFestiveProps> = ({ className = '' }) => {
  const [activeView, setActiveView] = useState<'illuminated' | 'panoramic'>('illuminated');
  const [isLoaded, setIsLoaded] = useState(false);

  const images = {
    illuminated: {
      src: '/assets/aistudio/howrah_bridge.jpg',
      title: 'Howrah Bridge Golden Night Illumination',
      caption: 'Rabindra Setu glowing across the sacred Hooghly River with night lights & reflections'
    },
    panoramic: {
      src: '/assets/aistudio/howrah_bridge_panoramic.jpg',
      title: 'Hooghly Ghats & Howrah Skyline',
      caption: 'Evening panoramic expanse of the iconic cantilever bridge connecting Kolkata'
    }
  };

  const currentImg = images[activeView];

  return (
    <div className={`relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 bg-[#0B1528] ${className}`}>
      
      {/* 1. REAL HIGH-RESOLUTION CRISP IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group">
        
        {/* Crisp Image */}
        <img
          src={currentImg.src}
          alt={currentImg.title}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#120104] via-[#2A080C] to-[#120104] animate-pulse flex items-center justify-center">
            <div className="flex items-center space-x-2 text-[#FCE2A6] text-xs font-serif">
              <Sparkles className="w-4 h-4 text-[#F7D070] animate-spin" />
              <span>Loading Howrah Bridge View...</span>
            </div>
          </div>
        )}

        {/* 2. FESTIVE WARM WEDDING GRADIENT VIGNETTE & RIVER GLOW */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100205] via-[#100205]/25 to-[#1A0308]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-[#100205]/60 pointer-events-none" />

        {/* 3. FESTIVE MARIGOLD GARLAND (GENDA PHOOL TORAN) ACROSS THE TOP */}
        <div className="absolute top-0 inset-x-0 h-14 pointer-events-none z-10">
          <svg className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" viewBox="0 0 1000 70" preserveAspectRatio="none">
            {/* Hanging Marigold Garland Swags */}
            <path
              d="M 0 0 Q 100 45 200 0 Q 300 45 400 0 Q 500 45 600 0 Q 700 45 800 0 Q 900 45 1000 0"
              fill="none"
              stroke="#FF8F00"
              strokeWidth="6"
              strokeDasharray="8,5"
            />
            <path
              d="M 0 0 Q 100 45 200 0 Q 300 45 400 0 Q 500 45 600 0 Q 700 45 800 0 Q 900 45 1000 0"
              fill="none"
              stroke="#FFC107"
              strokeWidth="4"
              strokeDasharray="6,8"
            />
            {/* Marigold Flower Heads at Peaks and Valleys */}
            {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950].map((x, i) => (
              <circle
                key={`flower-${i}`}
                cx={x}
                cy={12 + Math.sin(i * 0.6) * 14}
                r="4.5"
                fill={i % 2 === 0 ? "#FF5722" : "#FFC107"}
                stroke="#FFE082"
                strokeWidth="1.2"
              />
            ))}
          </svg>
        </div>

        {/* 4. GOLDEN CORNER FILIGREE ORNAMENTS */}
        <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none z-10">
          <svg viewBox="0 0 50 50" className="w-full h-full text-[#F7D070] drop-shadow-md">
            <path d="M 0 0 L 35 0 C 35 15 15 35 0 35 Z" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
            <circle cx="10" cy="10" r="3" fill="#FCE2A6" />
            <path d="M 0 15 Q 15 15 15 0" fill="none" stroke="#FCE2A6" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 w-12 h-12 pointer-events-none z-10 rotate-90">
          <svg viewBox="0 0 50 50" className="w-full h-full text-[#F7D070] drop-shadow-md">
            <path d="M 0 0 L 35 0 C 35 15 15 35 0 35 Z" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
            <circle cx="10" cy="10" r="3" fill="#FCE2A6" />
            <path d="M 0 15 Q 15 15 15 0" fill="none" stroke="#FCE2A6" strokeWidth="1.5" />
          </svg>
        </div>

        {/* 5. FLOATING GLOWING DIYAS ALONG HOOGHLY RIVER WATER */}
        <div className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-around pointer-events-none px-6 z-10">
          {[
            { delay: '0s', left: '12%' },
            { delay: '1.2s', left: '28%' },
            { delay: '0.6s', left: '50%' },
            { delay: '1.8s', left: '72%' },
            { delay: '0.9s', left: '88%' }
          ].map((diya, idx) => (
            <div
              key={`diya-${idx}`}
              className="relative flex flex-col items-center animate-pulse"
              style={{ animationDelay: diya.delay, animationDuration: '2.5s' }}
            >
              {/* Diya Flame */}
              <div className="w-2.5 h-3.5 bg-gradient-to-t from-[#FF6F00] via-[#FFD54F] to-[#FFFFFF] rounded-full blur-[0.6px] shadow-[0_0_12px_#FFA000]" />
              {/* Terracotta Clay Base */}
              <div className="w-5 h-2 bg-gradient-to-r from-[#8D3B1B] via-[#D84315] to-[#8D3B1B] rounded-b-full border-t border-[#FFB74D]" />
              {/* Water Golden Shimmer Reflection */}
              <div className="w-8 h-1 bg-[#FFA000]/40 blur-[1px] rounded-full mt-0.5" />
            </div>
          ))}
        </div>

        {/* 6. TOP FLOATING BADGE & VIEW SELECTOR CONTROLS */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-auto">
          {/* Bengali Marriage Heritage Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A0206]/85 backdrop-blur-md border border-[#D4AF37]/60 text-[#FCE2A6] text-xs font-serif font-semibold shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-[#F7D070]" />
            <span>Kolkata • City of Joy</span>
          </div>

          {/* Toggle Button Between Views */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#1A0206]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg">
            <button
              id="howrah-view-illuminated-btn"
              onClick={() => setActiveView('illuminated')}
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                activeView === 'illuminated'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F7D070] text-[#1A0206] font-bold shadow'
                  : 'text-[#FCE2A6]/80 hover:text-white'
              }`}
            >
              Golden Night
            </button>
            <button
              id="howrah-view-panoramic-btn"
              onClick={() => setActiveView('panoramic')}
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                activeView === 'panoramic'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F7D070] text-[#1A0206] font-bold shadow'
                  : 'text-[#FCE2A6]/80 hover:text-white'
              }`}
            >
              River Skyline
            </button>
          </div>
        </div>

        {/* 7. BOTTOM OVERLAY INFORMATION & CULTURAL INSCRIPTION */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-[#100205] via-[#100205]/90 to-transparent z-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-left">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[#F7D070] text-xs font-serif font-bold tracking-widest uppercase">
                  রবীন্দ্র সেতু • Rabindra Setu
                </span>
                <span className="text-[#D4AF37]/60 text-xs">•</span>
                <span className="text-[#FCE2A6]/75 text-xs font-sans">
                  The Historic Cantilever Wonder
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FFF8E7] drop-shadow-md">
                {currentImg.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FCE2A6]/90 font-sans mt-0.5 max-w-xl leading-relaxed">
                {currentImg.caption}
              </p>
            </div>

            <div className="shrink-0 flex items-center space-x-2 pt-1 sm:pt-0">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FCE2A6] text-[11px] font-medium backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-[#F7D070]" />
                <span>Wedding Gateway</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
