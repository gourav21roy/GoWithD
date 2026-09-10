import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Copy, Check, ExternalLink, Sparkles, PartyPopper } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { weddingEvents } from '../data/weddingData';
import { HowrahBridgeParallax } from './HowrahBridgeParallax';

interface EventsSectionProps {
  language: Language;
  selectedEventId?: 'wedding' | 'reception' | null;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ language, selectedEventId }) => {
  const t = translations[language] || translations.en;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  return (
    <section
      id="events-section"
      className="relative py-24 px-4 bg-gradient-to-b from-[#1A0206] via-[#0B1B3D] to-[#1A0206] text-[#FFF8E7] overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FCE2A6] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F7D070]" />
            <span>Kolkata Celebrations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif gold-gradient-text font-bold">
            {t['events-heading']}
          </h2>
          <p className="text-[#FCE2A6]/80 text-sm sm:text-base font-sans max-w-xl mx-auto">
            {t['events-subheading']}
          </p>
        </div>

        {/* Seamless Animated Howrah Bridge Parallax Panorama */}
        <HowrahBridgeParallax language={language} />

        {/* 2 Main Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weddingEvents.map(event => {
            const isWedding = event.id === 'wedding';
            const isSelected = selectedEventId === event.id;

            return (
              <div
                key={event.id}
                id={`event-card-${event.id}`}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 shadow-2xl ${
                  isWedding ? 'glass-card-maroon' : 'glass-card-royal'
                } ${
                  isSelected
                    ? 'ring-4 ring-[#F7D070] scale-[1.02]'
                    : 'border-2 border-[#D4AF37]/50 hover:border-[#D4AF37]'
                }`}
              >
                <div className="space-y-5">
                  {/* Badge & Ritual Symbol */}
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#FCE2A6] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 flex items-center space-x-1.5">
                      {isWedding ? <Sparkles className="w-3 h-3 text-[#F7D070]" /> : <PartyPopper className="w-3 h-3 text-[#F7D070]" />}
                      <span>{t[event.badgeKey]}</span>
                    </span>

                    <span className="text-xs font-serif text-[#F7D070]/90 font-semibold tracking-wider">
                      {isWedding ? 'Subho Bibaho' : 'Preeti Bhoj'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FCE2A6]">
                    {t[event.titleKey]}
                  </h3>

                  {/* Details List */}
                  <div className="space-y-3 text-sm sm:text-base text-[#FFF8E7]/90">
                    {/* Date */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 mt-0.5 text-[#F7D070]">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-semibold text-[#FFF8E7]">
                          {t[event.dateKey]}
                        </span>
                      </div>
                    </div>

                    {/* Time & Program */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 mt-0.5 text-[#F7D070]">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm text-[#FCE2A6]">
                          {t[event.timeKey]}
                        </span>
                      </div>
                    </div>

                    {/* Venue & Address */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 mt-0.5 text-[#F7D070]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-[#FCE2A6] font-serif text-base">
                          {t[event.venueNameKey]}
                        </strong>
                        <span className="text-xs text-[#FFF8E7]/75 block mt-0.5">
                          {event.addressText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action CTAs */}
                <div className="pt-6 space-y-2.5">
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F7D070] to-[#AA820A] hover:from-[#FCE2A6] hover:to-[#D4AF37] text-[#1A0206] font-bold text-xs sm:text-sm tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>
                      {isWedding ? t['btn-wedding-directions'] : t['btn-reception-directions']}
                    </span>
                  </a>

                  <button
                    onClick={() => copyAddress(event.id, event.addressText)}
                    className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full glass-card-maroon border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#FCE2A6] hover:text-white text-xs font-medium transition-all"
                  >
                    {copiedId === event.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">{t['address-copied']}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5 text-[#F7D070]" />
                        <span>{t['copy-address']}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
