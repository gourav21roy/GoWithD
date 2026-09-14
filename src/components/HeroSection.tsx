import React from 'react';
import { Calendar, ChevronDown, Sparkles, MapPin, Heart } from 'lucide-react';
import { Language, GuestSide } from '../types';
import { translations } from '../data/translations';
import { RoyalWeddingCurtain } from './RoyalWeddingCurtain';
import { GaneshGraphic } from './GaneshGraphic';
import { FloatingLanterns } from './FloatingLanterns';
import { CelestialCloudSky } from './CelestialCloudSky';
import { triggerRosePetalsShower } from '../utils/firecrackers';

interface HeroSectionProps {
  language: Language;
  onOpenCalendar: () => void;
  guestSide: GuestSide;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenCalendar,
  guestSide
}) => {
  const t = translations[language] || translations.en;

  const isBrideFirst = guestSide === 'bride';

  const heroDateText =
    guestSide === 'bride'
      ? t['hero-date-bride'] || 'Saturday 21st November 2026 • Wedding • Kolkata'
      : guestSide === 'groom'
      ? t['hero-date-groom'] || 'Monday 23rd November 2026 • Reception • Kolkata'
      : t['hero-date-header'] || 'Saturday 21st & Monday 23rd November 2026 • Kolkata';

  const heroSubtext =
    guestSide === 'bride'
      ? t['hero-subtext-bride'] || t['hero-subtext']
      : guestSide === 'groom'
      ? t['hero-subtext-groom'] || t['hero-subtext']
      : t['hero-subtext'];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Royal Wedding Theatrical Velvet Curtain (Opens on initial scroll or tap) */}
      <RoyalWeddingCurtain language={language} />

      {/* 1. CELESTIAL CLOUDS & STARRY NIGHT WITH FLOATING LANTERNS FILLER SCREEN
             (Pure moving clouds, starry sky, and floating lanterns revealed when curtains open) */}
      <section
        id="celestial-sky-filler"
        className="relative h-[75vh] sm:h-[82vh] min-h-[530px] max-h-[720px] w-full flex flex-col justify-end items-center overflow-hidden select-none"
      >
        {/* Animated Moving Clouds, Twinkling Stars, Moon, Constellations with integrated Floating Lanterns */}
        <CelestialCloudSky>
          <FloatingLanterns />
        </CelestialCloudSky>

        {/* Blinking Scroll Down Arrow & Cue (Lets users know to scroll further to the invitation) */}
        <div className="relative z-30 pb-7 sm:pb-9 flex flex-col items-center pointer-events-auto">
          <button
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const x = (rect.left + rect.width / 2) / (window.innerWidth || 1);
              const y = (rect.top + rect.height / 2) / (window.innerHeight || 1);
              triggerRosePetalsShower(x, Math.max(0.2, y - 0.05));
              const el = document.getElementById('hero-invitation-container') || document.getElementById('hero-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Scroll to wedding invitation"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#1A0206]/90 to-[#32060C]/90 border border-[#F7D070]/80 text-[#FCE2A6] shadow-[0_0_20px_rgba(212,175,55,0.6)] backdrop-blur-sm">
              <ChevronDown className="w-5 h-5 text-[#F7D070] animate-bounce stroke-[2.5]" />
              {/* Blinking outer pulse ring */}
              <span className="absolute -inset-1 rounded-full border border-[#FFF8E7] animate-ping opacity-75 pointer-events-none" />
            </div>
          </button>
        </div>
      </section>

      {/* 2. HERO SECTION: Royal Wedding Invitation Card
             (Revealed when user scrolls past the celestial sky) */}
      <section
        id="hero-section"
        className="relative z-20 min-h-screen w-full flex flex-col justify-center items-center px-3 sm:px-4 pt-16 sm:pt-28 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#020512] via-[#0D1934] to-[#0A1630]"
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
        <div id="hero-invitation-container" className="w-full max-w-4xl mx-auto flex flex-col items-center my-auto transition-all duration-700 ease-out">
          {/* Main Invitation Card Content */}
          <div className="relative z-30 max-w-2xl w-full mx-auto text-center px-2">
            <div className="glass-card-maroon rounded-3xl p-5 sm:p-9 border-2 border-[#D4AF37]/65 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 sm:space-y-6 transform transition-all duration-300">
              
              {/* LORD GANESHA CENTERPIECE (Mukut and Topor removed as requested) */}
              <div className="flex items-center justify-center mb-1">
                <GaneshGraphic className="w-20 h-20 sm:w-24 sm:h-24" />
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
                    {heroDateText}
                  </span>
                </div>
              </div>

              {/* Invitation Intro Sentence */}
              <p className="text-xs sm:text-sm text-[#FFF8E7]/85 font-light tracking-widest max-w-lg mx-auto leading-relaxed">
                {heroSubtext}
              </p>

              {/* COUPLE NAMES (Bride first on Bride section; Groom first on Groom section & default) */}
              <div className="py-2 sm:py-3 space-y-3 sm:space-y-4">
                {isBrideFirst ? (
                  <>
                    {/* Bride Name First */}
                    <div id="bride-details">
                      <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive gold-gradient-text tracking-wide drop-shadow-lg px-2 leading-tight">
                        {t['bride-name']}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#FCE2A6]/90 font-serif mt-1 tracking-wide">
                        {t['bride-parents']}
                      </p>
                    </div>

                    {/* Ampersand Filigree Divider */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 py-0.5">
                      <span className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#FCE2A6]" />
                      <span className="font-cursive text-2xl sm:text-4xl text-[#F7D070] drop-shadow">&</span>
                      <span className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#FCE2A6]" />
                    </div>

                    {/* Groom Name Second */}
                    <div id="groom-details">
                      <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive gold-gradient-text tracking-wide drop-shadow-lg px-2 leading-tight">
                        {t['groom-name']}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#FCE2A6]/90 font-serif mt-1 tracking-wide">
                        {t['groom-parents']}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Groom Name First */}
                    <div id="groom-details">
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

                    {/* Bride Name Second */}
                    <div id="bride-details">
                      <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive gold-gradient-text tracking-wide drop-shadow-lg px-2 leading-tight">
                        {t['bride-name']}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#FCE2A6]/90 font-serif mt-1 tracking-wide">
                        {t['bride-parents']}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Quick Action CTA Button */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <a
                  id="hero-events-cta-btn"
                  href="#events-section"
                  className="inline-flex items-center space-x-2 px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#F7D070] hover:to-[#D4AF37] text-[#1A0206] font-bold text-xs sm:text-sm tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#1A0206] shrink-0" />
                  <span>{t['view-events-btn']}</span>
                </a>
              </div>

            </div>

            {/* Bouncing Scroll Down Indicator */}
            <div className="pt-6 flex justify-center">
              <a
                href="#calendar-section"
                onClick={(e) => {
                  e.preventDefault();
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const x = (rect.left + rect.width / 2) / (window.innerWidth || 1);
                  const y = (rect.top + rect.height / 2) / (window.innerHeight || 1);
                  triggerRosePetalsShower(x, Math.max(0.3, y));
                  const el = document.getElementById('calendar-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to Calendar"
                className="p-2 text-[#FCE2A6]/60 hover:text-[#FCE2A6] transition-colors animate-bounce cursor-pointer"
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

