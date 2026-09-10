import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020714] text-[#FFF8E7] pt-16 pb-28 px-4 border-t border-[#D4AF37]/30 text-center overflow-hidden">
      {/* Ornate Gold Border Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-75" />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Kolka & Shankha Motif */}
        <div className="flex items-center justify-center space-x-3 text-[#F7D070]">
          <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <Sparkles className="w-4 h-4 text-[#F7D070]" />
          <span className="font-serif text-xs uppercase tracking-widest text-[#FCE2A6]">
            Subho Bibaho
          </span>
          <Sparkles className="w-4 h-4 text-[#F7D070]" />
          <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Couple Signature & Hashtag */}
        <div className="space-y-2">
          <h3 className="text-3xl sm:text-4xl font-cursive gold-gradient-text tracking-wide">
            Gourav Roy & Debanjana Sarkar
          </h3>
          <p className="text-lg font-serif font-bold text-[#F7D070]">
            #GouravKiDebu
          </p>
          <p className="text-xs text-[#FFF8E7]/60 font-sans">
            Saturday, 21st Nov & Monday, 23rd Nov 2026 • Kolkata, West Bengal
          </p>
        </div>

        <p className="text-xs text-[#FCE2A6]/75 max-w-md mx-auto italic">
          "{t['blessings-quote']}"
        </p>

        {/* Back to Top */}
        <div className="pt-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card-maroon border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs text-[#FCE2A6] hover:text-white transition-all shadow-md"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#F7D070]" />
            <span>Return to Top</span>
          </button>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/20 flex items-center justify-center space-x-1 text-[11px] text-[#FFF8E7]/40">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>for the wedding of Gourav & Debanjana</span>
        </div>
      </div>
    </footer>
  );
};
