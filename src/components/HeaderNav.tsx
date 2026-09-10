import React from 'react';
import { Share2, Calendar, MapPin, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { AudioEngine } from './AudioEngine';

interface HeaderNavProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenShare: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  language,
  onLanguageChange,
  onOpenShare
}) => {
  const t = translations[language] || translations.en;

  return (
    <>
      {/* Top Floating Utility Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 p-2.5 sm:p-4 flex justify-between items-center pointer-events-none flex-nowrap">
        <div className="flex items-center space-x-1.5 sm:space-x-2 pointer-events-auto shrink-0 flex-nowrap">
          <AudioEngine language={language} />

          <button
            id="share-invite-btn"
            onClick={onOpenShare}
            className="shrink-0 h-8 sm:h-9 flex items-center space-x-1.5 px-2.5 sm:px-3 rounded-full glass-card-maroon border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#FCE2A6] hover:text-white transition-all shadow-lg text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap"
            title={t['share-invite']}
          >
            <Share2 className="w-3.5 h-3.5 text-[#F7D070] shrink-0" />
            <span className="hidden md:inline">{t['share-invite']}</span>
          </button>
        </div>

        {/* Trilingual Language Selector */}
        <div className="pointer-events-auto shrink-0 flex items-center h-8 sm:h-9 bg-[#1A0206]/92 border border-[#D4AF37]/60 rounded-full px-1 shadow-2xl backdrop-blur-md">
          <button
            id="lang-btn-en"
            onClick={() => onLanguageChange('en')}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
              language === 'en'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1A0206] shadow-md scale-105'
                : 'text-[#FCE2A6] hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            id="lang-btn-bn"
            onClick={() => onLanguageChange('bn')}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold rounded-full transition-all duration-300 font-bengali whitespace-nowrap ${
              language === 'bn'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1A0206] shadow-md scale-105'
                : 'text-[#FCE2A6] hover:text-white'
            }`}
          >
            বাংলা
          </button>
          <button
            id="lang-btn-hi"
            onClick={() => onLanguageChange('hi')}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold rounded-full transition-all duration-300 font-hindi whitespace-nowrap ${
              language === 'hi'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1A0206] shadow-md scale-105'
                : 'text-[#FCE2A6] hover:text-white'
            }`}
          >
            हिंदी
          </button>
        </div>
      </header>

      {/* Floating Bottom Navigation Dock */}
      <nav
        aria-label="Main Navigation"
        className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 bg-[#1A0206]/92 border border-[#D4AF37]/55 rounded-full px-3 sm:px-5 py-2 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center space-x-2 sm:space-x-4 text-[11px] sm:text-xs font-medium max-w-[95vw] overflow-x-auto scrollbar-none"
      >
        <a
          href="#hero-section"
          className="flex items-center space-x-1 text-[#FCE2A6] hover:text-white transition-colors whitespace-nowrap px-1.5 py-1 rounded-md hover:bg-[#D4AF37]/15"
        >
          <Heart className="w-3.5 h-3.5 text-[#F7D070]" />
          <span>{t['nav-welcome']}</span>
        </a>
        <span className="text-[#856404] select-none">•</span>

        <a
          href="#calendar-section"
          className="flex items-center space-x-1 text-[#FCE2A6] hover:text-white transition-colors whitespace-nowrap px-1.5 py-1 rounded-md hover:bg-[#D4AF37]/15"
        >
          <Calendar className="w-3.5 h-3.5 text-[#F7D070]" />
          <span>{t['nav-calendar']}</span>
        </a>
        <span className="text-[#856404] select-none">•</span>

        <a
          href="#events-section"
          className="flex items-center space-x-1 text-[#FCE2A6] hover:text-white transition-colors whitespace-nowrap px-1.5 py-1 rounded-md hover:bg-[#D4AF37]/15"
        >
          <MapPin className="w-3.5 h-3.5 text-[#F7D070]" />
          <span>{t['nav-events']}</span>
        </a>
        <span className="text-[#856404] select-none">•</span>

        <a
          href="#blessings-section"
          className="flex items-center space-x-1 text-[#FCE2A6] hover:text-white transition-colors whitespace-nowrap px-1.5 py-1 rounded-md hover:bg-[#D4AF37]/15"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>{t['nav-blessings']}</span>
        </a>
      </nav>
    </>
  );
};
