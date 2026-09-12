import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { Language, GuestSide } from '../types';
import { translations } from '../data/translations';

interface CalendarCountdownSectionProps {
  language: Language;
  onSelectEventDate?: (eventId: 'wedding' | 'reception') => void;
  guestSide: GuestSide;
}

export const CalendarCountdownSection: React.FC<CalendarCountdownSectionProps> = ({
  language,
  onSelectEventDate,
  guestSide
}) => {
  const t = translations[language] || translations.en;

  // Live Countdown state to Nov 21, 2026 18:30 IST (Kolkata time UTC+5:30)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Nov 23, 2026 19:00:00 IST for groom side; Nov 21, 2026 18:30:00 IST for bride or all
    const targetIso = guestSide === 'groom'
      ? '2026-11-23T19:00:00+05:30'
      : '2026-11-21T18:30:00+05:30';
    const targetDate = new Date(targetIso).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [guestSide]);

  return (
    <section
      id="calendar-section"
      className="relative py-12 sm:py-16 px-4 bg-gradient-to-b from-[#1A0206] via-[#050E24] to-[#1A0206] text-[#FFF8E7]"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Interactive November 2026 Calendar Widget */}
        <div className="glass-card-maroon rounded-2xl sm:rounded-3xl p-3.5 xs:p-5 sm:p-8 border border-[#D4AF37]/50 shadow-2xl max-w-xl mx-auto backdrop-blur-xl">
          <div className="text-center mb-4 sm:mb-6 border-b border-[#D4AF37]/30 pb-3 sm:pb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FCE2A6] tracking-wider">
              {t['month-year']}
            </h3>
            <p className="text-xs text-[#F7D070]/80 mt-1 font-serif">Kolkata, West Bengal</p>
          </div>

          {/* Days Grid Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs font-bold text-[#F7D070] mb-2 sm:mb-3">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Dates Grid (November 1, 2026 was a Sunday) */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm font-medium">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((d) => (
              <div
                key={`cal-day-${d}`}
                className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/40 text-xs sm:text-sm"
              >
                {d}
              </div>
            ))}

            {/* Day 21 (Wedding Day if bride or all) */}
            {guestSide === 'groom' ? (
              <div className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/40 text-xs sm:text-sm">
                21
              </div>
            ) : (
              <button
                onClick={() => {
                  if (onSelectEventDate) onSelectEventDate('wedding');
                  const el = document.getElementById('events-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                title="Click to view Subho Bibaho Ceremony details"
                className="w-full aspect-square flex flex-col items-center justify-center p-0.5 rounded-lg sm:rounded-xl relative group cursor-pointer transform hover:scale-105 active:scale-95 transition-all text-center bg-gradient-to-br from-[#F7D070] via-[#D4AF37] to-[#AA820A] text-[#1A0206] font-bold shadow-lg ring-1 sm:ring-2 ring-[#FFF8E7]"
              >
                <span className="text-xs sm:text-base font-bold leading-none">21</span>
                <span className="text-[7px] sm:text-[9px] uppercase font-extrabold tracking-tighter leading-none mt-0.5 sm:mt-1">
                  Wedding
                </span>
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFF8E7] opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-amber-200 border border-[#D4AF37]" />
                </span>
              </button>
            )}

            {/* Day 22 */}
            <div className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/40 text-xs sm:text-sm">
              22
            </div>

            {/* Day 23 (Reception Day if groom or all) */}
            {guestSide === 'bride' ? (
              <div className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/40 text-xs sm:text-sm">
                23
              </div>
            ) : (
              <button
                onClick={() => {
                  if (onSelectEventDate) onSelectEventDate('reception');
                  const el = document.getElementById('events-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                title="Click to view Preeti Bhoj Reception details"
                className="w-full aspect-square flex flex-col items-center justify-center p-0.5 rounded-lg sm:rounded-xl relative group cursor-pointer transform hover:scale-105 active:scale-95 transition-all text-center bg-gradient-to-br from-rose-600 via-rose-700 to-[#4A0E17] text-[#FFF8E7] font-bold shadow-lg ring-1 sm:ring-2 ring-[#F7D070]"
              >
                <span className="text-xs sm:text-base font-bold leading-none">23</span>
                <span className="text-[7px] sm:text-[9px] uppercase font-extrabold tracking-tighter leading-none mt-0.5 sm:mt-1 text-[#FCE2A6]">
                  Dinner
                </span>
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-rose-300 border border-[#FCE2A6]" />
                </span>
              </button>
            )}

            {/* Days 24 to 30 */}
            {[24, 25, 26, 27, 28, 29, 30].map((d) => (
              <div
                key={`cal-day-${d}`}
                className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/40 text-xs sm:text-sm"
              >
                {d}
              </div>
            ))}

            {/* Remaining 5 days of calendar grid (Dec 1-5 light placeholders) */}
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={`cal-next-${d}`}
                className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/15 text-[10px] sm:text-xs"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Interactive Legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#D4AF37]/25 text-xs font-semibold">
            {guestSide !== 'groom' && (
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] inline-block shadow shrink-0" />
                <span className="text-[#FCE2A6]">{t['legend-wedding']}</span>
              </div>
            )}
            {guestSide !== 'bride' && (
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-600 inline-block shadow shrink-0" />
                <span className="text-[#FCE2A6]">{t['legend-reception']}</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-sm font-serif text-[#FCE2A6]">
            <Clock className="w-4 h-4 text-[#F7D070]" />
            <span className="font-semibold tracking-wide">
              {guestSide === 'bride'
                ? (language === 'bn' ? 'শুভ বিবাহ অনুষ্ঠানের ক্ষণ গণনা' : language === 'hi' ? 'शुभ विवाह संस्कार की उलटी गिनती' : 'Countdown to Subho Bibaho Wedding')
                : guestSide === 'groom'
                ? (language === 'bn' ? 'শুভ প্রীতিভোজের ক্ষণ গণনা' : language === 'hi' ? 'शुभ प्रीतिभোজ की उलटी गिनती' : 'Countdown to Preeti Bhoj Reception')
                : t['countdown-title']}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            {/* Days */}
            <div className="glass-card-maroon rounded-2xl p-3 sm:p-4 text-center border border-[#D4AF37]/45 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif gold-gradient-text">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#FCE2A6]/80 uppercase font-sans tracking-wider">
                {t['timer-days']}
              </span>
            </div>

            {/* Hours */}
            <div className="glass-card-maroon rounded-2xl p-3 sm:p-4 text-center border border-[#D4AF37]/45 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif gold-gradient-text">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#FCE2A6]/80 uppercase font-sans tracking-wider">
                {t['timer-hours']}
              </span>
            </div>

            {/* Minutes */}
            <div className="glass-card-maroon rounded-2xl p-3 sm:p-4 text-center border border-[#D4AF37]/45 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif gold-gradient-text">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#FCE2A6]/80 uppercase font-sans tracking-wider">
                {t['timer-mins']}
              </span>
            </div>

            {/* Seconds */}
            <div className="glass-card-maroon rounded-2xl p-3 sm:p-4 text-center border border-[#D4AF37]/45 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif gold-gradient-text">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#FCE2A6]/80 uppercase font-sans tracking-wider">
                {t['timer-secs']}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#FCE2A6]/60 font-sans max-w-sm mx-auto">
            {t['countdown-subtitle']}
          </p>
        </div>
      </div>
    </section>
  );
};
