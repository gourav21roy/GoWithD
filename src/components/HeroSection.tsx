import React from 'react';
import { Calendar, ChevronDown, Sparkles, MapPin, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { RoyalWeddingCurtain } from './RoyalWeddingCurtain';
import { GaneshGraphic } from './GaneshGraphic';
import { FloatingLanterns } from './FloatingLanterns';
import { CelestialCloudSky } from './CelestialCloudSky';

interface HeroSectionProps {
  language: Language;
  onOpenCalendar: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language, onOpenCalendar }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Royal Wedding Theatrical Velvet Curtain (Opens on initial scroll or tap) */}
      <RoyalWeddingCurtain language={language} />

      {/* 1. CELESTIAL CLOUDS & STARRY NIGHT WITH FLOATING LANTERNS FILLER SCREEN
             (Pure moving clouds, starry sky, and floating lanterns revealed when curtains open) */}
      <section
        id="celestial-sky-filler"
        className="relative min-h-[105vh] sm:min-h-screen w-full flex flex-col justify-center items-center overflow-hidden select-none pointer-events-none"
      >
        {/* Animated Moving Clouds, Twinkling Stars, Moon & Constellations */}
        <CelestialCloudSky />

        {/* Slowly drifting golden lanterns */}
        <FloatingLanterns />

        {/* Subtle gradient blend transitioning smoothly into the Hero section */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-[#020512]/60 to-[#020512] pointer-events-none" />
      </section>

      {/* 2. HERO SECTION: Royal Wedding Invitation Card
             (Revealed when user scrolls past the celestial sky) */}
      <section
        id="hero-section"
        className="relative z-20 min-h-0 sm:min-h-screen w-full flex flex-col justify-center items-center px-3 sm:px-4 pt-8 sm:pt-40 pb-12 sm:pb-24 -mt-12 sm:mt-0 overflow-hidden bg-gradient-to-b from-[#020512] via-[#0D1934] to-[#0A1630]"
      >
        {/* Floating Lanterns Background Effect slowly drifting upwards */}
        <FloatingLanterns />

        {/* Subtle Starry Night Sky ambient points */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[
              { cx: '10%', cy: '15%', r: 1.2 },
              { cx: '25%', cy: '28%', r: 1.5 },
              { cx: '40%', cy: '12%', r: 1 },
              { cx: '60%', cy: '22%', r: 1.4 },
              { cx: '75%', cy: '14%', r: 1.2 },
              { cx: '88%', cy: '30%', r: 1.6 },
              { cx: '15%', cy: '65%', r: 1.3 },
              { cx: '85%', cy: '70%', r: 1.1 },
              { cx: '50%', cy: '8%', r: 1.5 },
              { cx: '70%', cy: '80%', r: 1.2 },
            ].map((s, idx) => (
              <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill="#FFF8E7" opacity="0.8" />
            ))}
          </svg>
        </div>

        {/* Scroll anchor target for smooth navigation */}
        <div id="hero-invitation-container" className="w-full max-w-4xl mx-auto flex flex-col items-center mt-2 mb-auto sm:my-auto transition-all duration-700 ease-out">
          {/* Main Invitation Card Content */}
          <div className="relative z-30 max-w-2xl w-full mx-auto text-center px-2">
            <div className="glass-card-maroon rounded-3xl p-5 sm:p-9 border-2 border-[#D4AF37]/65 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 sm:space-y-6 transform transition-all duration-300">
              
              {/* Bengali Marriage Auspicious Emblems (Groom Topor + Crisp Lord Ganesha + Bride Mukut) */}
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-1">
                {/* Groom's Topor Motif */}
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#F7D070] drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" viewBox="0 0 100 100" fill="currentColor">
                  <polygon points="50,10 75,80 25,80" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="3" />
                  <circle cx="50" cy="8" r="5" fill="#E2583E" />
                  <line x1="35" y1="40" x2="65" y2="40" stroke="#E2583E" strokeWidth="2" />
                  <line x1="30" y1="60" x2="70" y2="60" stroke="#D4AF37" strokeWidth="2" />
                  <rect x="20" y="80" width="60" height="10" rx="3" fill="#D4AF37" />
                </svg>

                {/* CRISP HIGH-DEFINITION LORD GANESHA CENTERPIECE */}
                <GaneshGraphic className="w-16 h-16 sm:w-20 sm:h-20" />

                {/* Bride's Mukut Motif */}
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#F7D070] drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M15,75 Q50,20 85,75 Q68,60 50,70 Q32,60 15,75 Z" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="3" />
                  <circle cx="50" cy="35" r="4" fill="#E2583E" />
                  <circle cx="35" cy="50" r="3" fill="#D4AF37" />
                  <circle cx="65" cy="50" r="3" fill="#D4AF37" />
                  <rect x="15" y="75" width="70" height="8" rx="2" fill="#D4AF37" />
                </svg>
              </div>

              {/* Invocation Mantras */}
              <div className="space-y-1 sm:space-y-1.5">
                <p className="text-[#FCE2A6] text-sm sm:text-base font-serif font-bold tracking-[0.25em]">
                  {t['shree-ganesh']}
                </p>
                <p className="text-[#F7D070]/90 text-xs sm:text-sm font-serif tracking-wider font-medium">
                  {t['shree-prajapataye']}
                </p>
              </div>

              {/* Auspicious Wedding Dates Header Pill */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center justify-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/30 to-[#D4AF37]/20 border border-[#D4AF37]/60 shadow-[0_4px_15px_rgba(212,175,55,0.15)] text-[#FCE2A6] text-center max-w-full">
                  <Calendar className="w-3.5 h-3.5 text-[#F7D070] shrink-0" />
                  <span className="text-[11px] sm:text-sm font-serif font-semibold tracking-wider">
                    {t['hero-date-header'] || 'Saturday 21st & Monday 23rd November 2026 • Kolkata'}
                  </span>
                </div>
              </div>

              {/* Invitation Intro Sentence */}
              <p className="text-xs sm:text-sm text-[#FFF8E7]/85 font-light tracking-widest max-w-lg mx-auto leading-relaxed">
                {t['hero-subtext']}
              </p>

              {/* COUPLE NAMES */}
              <div className="py-2 sm:py-3 space-y-3 sm:space-y-4">
                {/* Groom Name */}
                <div>
                  <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive gold-gradient-text tracking-wide drop-shadow-lg px-2 leading-tight">
                    {t['groom-name']}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#FCE2A6]/90 font-serif mt-1 tracking-wide">
                    {t['groom-parents']}
                  </p>
                </div>

                {/* Ampersand Filigree Divider */}
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 py-0.5">
                  <span className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#FCE2A6]" />
                  <span className="font-cursive text-2xl sm:text-4xl text-[#F7D070] drop-shadow">&</span>
                  <span className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#FCE2A6]" />
                </div>

                {/* Bride Name */}
                <div>
                  <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive gold-gradient-text tracking-wide drop-shadow-lg px-2 leading-tight">
                    {t['bride-name']}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#FCE2A6]/90 font-serif mt-1 tracking-wide">
                    {t['bride-parents']}
                  </p>
                </div>
              </div>

              {/* Wedding Hashtag Badge */}
              <div className="pt-1">
                <span className="inline-flex items-center space-x-1.5 px-5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/70 text-[#FCE2A6] font-serif font-bold text-sm sm:text-base tracking-wider shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F7D070]" />
                  <span className="lowercase font-semibold">#GouravKiDebu</span>
                </span>
              </div>

              {/* Quick Action CTA Buttons */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <button
                  id="hero-calendar-cta-btn"
                  onClick={onOpenCalendar}
                  className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#F7D070] hover:to-[#D4AF37] text-[#1A0206] font-bold text-xs sm:text-sm tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#1A0206] shrink-0" />
                  <span>{t['save-date-btn']}</span>
                </button>

                <a
                  href="#events-section"
                  className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-card-royal border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#FCE2A6] hover:text-white font-semibold text-xs sm:text-sm tracking-wider shadow-md transition-all hover:bg-[#D4AF37]/15"
                >
                  <MapPin className="w-4 h-4 text-[#F7D070] shrink-0" />
                  <span>{t['view-events-btn']}</span>
                </a>

                <a
                  href="#blessings-section"
                  className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs text-[#FCE2A6]/90 hover:text-white hover:underline transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{t['nav-blessings']}</span>
                </a>
              </div>

            </div>

            {/* Bouncing Scroll Down Indicator */}
            <div className="pt-6 flex justify-center">
              <a
                href="#calendar-section"
                aria-label="Scroll to Calendar"
                className="p-2 text-[#FCE2A6]/60 hover:text-[#FCE2A6] transition-colors animate-bounce"
              >
                <ChevronDown className="w-6 h-6" />
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

