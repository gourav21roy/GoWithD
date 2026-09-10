import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { KaliTempleIllustration } from './KaliTempleIllustration';

interface KaliTempleSectionProps {
  language: Language;
}

export const KaliTempleSection: React.FC<KaliTempleSectionProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the temple section for smooth parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.98]);

  // Trilingual titles and captions
  const badgeTitle = {
    en: 'Dakshineswar Kali Temple • Divine Blessings of Maa Bhavatarini',
    bn: 'দক্ষিণেশ্বর মা ভবতারিণী মন্দির • পুণ্য জাহ্নবী ও দেবীর কৃপা',
    hi: 'दक्षिणेश्वर काली मंदिर • माँ भवतारिणी का पावन आशीर्वाद'
  }[language];

  const subCaption = {
    en: 'Seeking divine grace on the sacred banks of the Hooghly river as two souls unite in holy matrimony',
    bn: 'পবিত্র ভাগীরথী গঙ্গার তীরে মা ভবতারিণীর চিরন্তন আশীর্বাদে একসূত্রে বাঁধা দুই প্রাণ',
    hi: 'पवित्र हुगली गंगा के पावन तट पर माँ के पावन आशीर्वाद से परिणय सूत्र में बंधते दो हृदय'
  }[language];

  return (
    <section
      id="temple-section"
      ref={containerRef}
      className="relative w-full py-8 sm:py-14 overflow-hidden select-none bg-gradient-to-b from-[#050E24] via-[#0D1934] to-[#0A1630]"
    >
      {/* Soft gradient masks at top & bottom so it integrates seamlessly into the page */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-b from-[#050E24] via-[#050E24]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-[#050E24] via-[#050E24]/80 to-transparent z-20 pointer-events-none" />

      {/* Main Parallax Animated Canvas Container */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="relative w-full max-w-5xl mx-auto px-3 sm:px-6"
      >
        {/* Cultural Header Badge */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#1A0206]/92 backdrop-blur-md border border-[#D4AF37]/55 shadow-xl text-[#FCE2A6] text-xs sm:text-sm font-serif">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7D070] animate-pulse shrink-0" />
            <span className="font-bold tracking-wider">{badgeTitle}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9800] animate-ping shrink-0" />
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#FFF8E7]/75 font-sans tracking-wide max-w-2xl mx-auto px-4">
            {subCaption}
          </p>
        </div>

        {/* The Full Architectural Kali Temple Illustration with Hooghly River & Boat */}
        <KaliTempleIllustration className="w-full" hideHeader={true} />
      </motion.div>
    </section>
  );
};
