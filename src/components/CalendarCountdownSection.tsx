import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Download, ExternalLink, Sparkles, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CalendarCountdownSectionProps {
  language: Language;
  onSelectEventDate?: (eventId: 'wedding' | 'reception') => void;
}

export const CalendarCountdownSection: React.FC<CalendarCountdownSectionProps> = ({
  language,
  onSelectEventDate
}) => {
  const t = translations[language] || translations.en;

  // Live Countdown state to Nov 21, 2026 18:30 IST (Kolkata time UTC+5:30)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Nov 21, 2026 18:30:00 IST
    const targetDate = new Date('2026-11-21T18:30:00+05:30').getTime();

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
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = (type: 'wedding' | 'reception') => {
    if (type === 'wedding') {
      const title = encodeURIComponent("Gourav & Debanjana's Wedding Ceremony (Subho Bibaho)");
      const details = encodeURIComponent("Join us in celebrating the holy wedding ceremony of Gourav Roy & Debanjana Sarkar (#GouravKiDebu)!");
      const location = encodeURIComponent("Navnir Farms and Banquets, Diamond Harbour Road, Kolkata, West Bengal 700104");
      // 2026-11-21 18:30 to 23:59 IST (UTC 13:00 to 18:29)
      const dates = "20261121T130000Z/20261121T183000Z";
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    } else {
      const title = encodeURIComponent("Gourav & Debanjana's Wedding Reception (Preeti Bhoj)");
      const details = encodeURIComponent("Celebrate the wedding reception dinner of Gourav Roy & Debanjana Sarkar (#GouravKiDebu)!");
      const location = encodeURIComponent("DTC Southern Heights, Joka, Diamond Harbour Road, Kolkata, West Bengal 700104");
      // 2026-11-23 19:00 to 23:59 IST (UTC 13:30 to 18:30)
      const dates = "20261123T133000Z/20261123T183000Z";
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    }
  };

  // Apple / Outlook .ics file generator
  const downloadIcs = (type: 'wedding' | 'reception' | 'both') => {
    let icsContent = '';

    if (type === 'wedding' || type === 'both') {
      icsContent += `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//Gourav and Debanjana Wedding//EN\r
CALSCALE:GREGORIAN\r
BEGIN:VEVENT\r
SUMMARY:Gourav & Debanjana Wedding Ceremony (Subho Bibaho)\r
DESCRIPTION:Celebrate the wedding ceremony of Gourav Roy & Debanjana Sarkar (#GouravKiDebu)!\r
LOCATION:Navnir Farms and Banquets, Diamond Harbour Road, Kolkata, West Bengal\r
DTSTART:20261121T130000Z\r
DTEND:20261121T183000Z\r
STATUS:CONFIRMED\r
END:VEVENT\r
`;
    }

    if (type === 'reception' || type === 'both') {
      if (type !== 'both') {
        icsContent += `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//Gourav and Debanjana Wedding//EN\r
CALSCALE:GREGORIAN\r
`;
      }
      icsContent += `BEGIN:VEVENT\r
SUMMARY:Gourav & Debanjana Wedding Reception (Preeti Bhoj)\r
DESCRIPTION:Celebrate the wedding reception dinner of Gourav Roy & Debanjana Sarkar (#GouravKiDebu)!\r
LOCATION:DTC Southern Heights, Joka, Diamond Harbour Road, Kolkata, West Bengal\r
DTSTART:20261123T133000Z\r
DTEND:20261123T183000Z\r
STATUS:CONFIRMED\r
END:VEVENT\r
`;
    }

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Gourav_Debanjana_Wedding_2026.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(t['cal-success-toast']);
  };

  return (
    <section
      id="calendar-section"
      className="relative py-20 px-4 bg-gradient-to-b from-[#1A0206] via-[#050E24] to-[#1A0206] text-[#FFF8E7]"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#1A0206] font-bold text-xs sm:text-sm shadow-2xl flex items-center space-x-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FCE2A6] text-xs font-semibold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5 text-[#F7D070]" />
            <span>November 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text font-bold">
            {t['calendar-title']}
          </h2>
          <p className="text-[#FCE2A6]/80 text-sm font-sans max-w-lg mx-auto">
            {t['calendar-subtitle']}
          </p>
        </div>

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

            {/* Highlighted Wedding Day 21st */}
            <button
              onClick={() => {
                if (onSelectEventDate) onSelectEventDate('wedding');
                const el = document.getElementById('events-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Click to view Subho Bibaho Ceremony details"
              className="w-full aspect-square flex flex-col items-center justify-center p-0.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F7D070] via-[#D4AF37] to-[#AA820A] text-[#1A0206] font-bold shadow-lg ring-1 sm:ring-2 ring-[#FFF8E7] relative group cursor-pointer transform hover:scale-105 active:scale-95 transition-all text-center"
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

            {/* Day 22 */}
            <div className="w-full aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-amber-100/40 text-xs sm:text-sm">
              22
            </div>

            {/* Highlighted Reception Day 23rd */}
            <button
              onClick={() => {
                if (onSelectEventDate) onSelectEventDate('reception');
                const el = document.getElementById('events-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Click to view Preeti Bhoj Reception details"
              className="w-full aspect-square flex flex-col items-center justify-center p-0.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-600 via-rose-700 to-[#4A0E17] text-[#FFF8E7] font-bold shadow-lg ring-1 sm:ring-2 ring-[#F7D070] relative group cursor-pointer transform hover:scale-105 active:scale-95 transition-all text-center"
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

          {/* Interactive Legend & Add to Calendar Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#D4AF37]/25 text-xs font-semibold">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-[#D4AF37] inline-block shadow shrink-0" />
                <span className="text-[#FCE2A6]">{t['legend-wedding']}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block shadow shrink-0" />
                <span className="text-[#FCE2A6]">{t['legend-reception']}</span>
              </div>
            </div>

            {/* Quick Add To Calendar Buttons */}
            <div className="flex items-center justify-center space-x-2 w-full sm:w-auto">
              <a
                href={getGoogleCalendarUrl('wedding')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-3 py-1.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-[#FCE2A6] flex items-center justify-center space-x-1 transition-all text-xs"
                title="Add Wedding to Google Calendar"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Google</span>
              </a>

              <button
                onClick={() => downloadIcs('both')}
                className="flex-1 sm:flex-initial px-3 py-1.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-[#FCE2A6] flex items-center justify-center space-x-1 transition-all text-xs"
                title="Download .ics for Apple / Outlook"
              >
                <Download className="w-3 h-3" />
                <span>.ICS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-sm font-serif text-[#FCE2A6]">
            <Clock className="w-4 h-4 text-[#F7D070]" />
            <span className="font-semibold tracking-wide">{t['countdown-title']}</span>
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
