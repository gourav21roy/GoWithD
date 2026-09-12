import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { KolkataTramIllustration } from './KolkataTramIllustration';

interface KolkataTramSectionProps {
  language: Language;
}

export const KolkataTramSection: React.FC<KolkataTramSectionProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the Tram section for gentle fade & scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.98]);

  return (
    <section
      id="tram-section"
      ref={containerRef}
      className="relative w-full py-4 sm:py-8 overflow-hidden select-none bg-gradient-to-b from-[#050E24] via-[#0D1934] to-[#0A1630]"
    >
      {/* Soft gradient masks at top & bottom so it integrates seamlessly into the page */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-b from-[#050E24] via-[#050E24]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-[#050E24] via-[#050E24]/80 to-transparent z-20 pointer-events-none" />

      {/* Main Parallax Animated Canvas Container */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="relative w-full max-w-5xl mx-auto px-3 sm:px-6"
      >
        {/* Tram Illustration Stage with Stationary Lights & Background */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D4AF37]/45 shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
          <KolkataTramIllustration className="w-full" />

          {/* Floating Heritage Tag (Bottom Right) */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-6 z-20 pointer-events-none">
            <span className="px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-serif font-semibold bg-[#1A0206]/85 text-[#FCE2A6] border border-[#D4AF37]/50 backdrop-blur-md shadow-md">
              Kolkata Heritage • CTC Estd. 1873
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
export default KolkataTramSection;
