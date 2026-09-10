import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, MessageCircle, ThumbsUp } from 'lucide-react';
import { Language, BlessingItem } from '../types';
import { translations } from '../data/translations';
import { initialBlessings } from '../data/weddingData';
import { KolkataTramSection } from './KolkataTramSection';

interface BlessingsGuestbookProps {
  language: Language;
}

export const BlessingsGuestbook: React.FC<BlessingsGuestbookProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  const [blessings, setBlessings] = useState<BlessingItem[]>(initialBlessings);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRelation, setFormRelation] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formTag, setFormTag] = useState(t['tag-sukh']);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Load custom blessings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gourav_debanjana_blessings');
      if (stored) {
        const parsed: BlessingItem[] = JSON.parse(stored);
        setBlessings(parsed);
      } else {
        setBlessings([]);
      }
    } catch {}
  }, []);

  const handleLike = (id: string) => {
    setBlessings(prev =>
      prev.map(b => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    const newBlessing: BlessingItem = {
      id: 'custom-b-' + Date.now(),
      name: formName.trim(),
      relationship: formRelation.trim() || 'Guest & Well-Wisher',
      message: formMessage.trim(),
      tag: formTag,
      timestamp: 'Just now',
      likes: 1,
      isCustom: true
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);

    // Save custom blessings
    try {
      const customOnes = updated.filter(b => b.isCustom);
      localStorage.setItem('gourav_debanjana_blessings', JSON.stringify(customOnes));
    } catch {}

    setFormName('');
    setFormRelation('');
    setFormMessage('');
    setShowForm(false);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#FCE2A6', '#E2583E']
      });
    } catch {}

    setToastMsg(t['wish-posted-toast']);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <section
      id="blessings-section"
      className="relative py-24 px-4 bg-gradient-to-b from-[#1A0206] via-[#0B1B3D] to-[#020714] text-[#FFF8E7]"
    >
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#1A0206] font-bold text-xs sm:text-sm shadow-2xl animate-fade-in flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Family Compliments Main Card */}
        <div className="glass-card-maroon rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/55 shadow-2xl text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F7D070]">
              <Heart className="w-7 h-7 fill-rose-500 text-rose-500" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text font-bold">
            {t['blessings-heading']}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#FFF8E7]/90 leading-relaxed font-sans max-w-2xl mx-auto">
            "{t['blessings-quote']}"
          </p>

          <div className="pt-4 border-t border-[#D4AF37]/30 space-y-1">
            <p className="text-xs text-[#FCE2A6] font-serif uppercase tracking-widest">
              {t['blessings-from']}
            </p>
            <p className="text-lg sm:text-2xl font-serif font-bold text-[#F7D070] tracking-wide">
              {t['family-names']}
            </p>
          </div>
        </div>

        {/* Vintage Kolkata Tramway Heritage Section */}
        <KolkataTramSection language={language} />

        {/* Guestbook Section Header & Write Wish CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/25">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FCE2A6] flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-[#F7D070]" />
              <span>Wall of Blessings</span>
            </h3>
            <p className="text-xs text-[#FFF8E7]/70">
              Heartfelt messages from friends and loved ones
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#F7D070] hover:to-[#D4AF37] text-[#1A0206] font-bold text-xs sm:text-sm tracking-wider shadow-lg transition-all transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>{showForm ? 'Close Form' : t['write-wish-btn']}</span>
          </button>
        </div>

        {/* Blessing Form Modal/Collapsible */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-card-royal rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/60 shadow-2xl space-y-4 max-w-xl mx-auto animate-fade-in"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder={t['wish-name-placeholder']}
                className="w-full px-4 py-2.5 rounded-xl bg-[#050E24]/90 border border-[#D4AF37]/40 text-xs sm:text-sm text-[#FFF8E7] placeholder-amber-100/40 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={formRelation}
                onChange={e => setFormRelation(e.target.value)}
                placeholder={t['wish-relation-placeholder']}
                className="w-full px-4 py-2.5 rounded-xl bg-[#050E24]/90 border border-[#D4AF37]/40 text-xs sm:text-sm text-[#FFF8E7] placeholder-amber-100/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <select
              value={formTag}
              onChange={e => setFormTag(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#050E24]/90 border border-[#D4AF37]/40 text-xs sm:text-sm text-[#FCE2A6] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value={t['tag-sukh']}>{t['tag-sukh']}</option>
              <option value={t['tag-jodi']}>{t['tag-jodi']}</option>
              <option value={t['tag-forever']}>{t['tag-forever']}</option>
              <option value={t['tag-joy']}>{t['tag-joy']}</option>
            </select>

            <textarea
              rows={3}
              required
              value={formMessage}
              onChange={e => setFormMessage(e.target.value)}
              placeholder={t['wish-text-placeholder']}
              className="w-full px-4 py-2.5 rounded-xl bg-[#050E24]/90 border border-[#D4AF37]/40 text-xs sm:text-sm text-[#FFF8E7] placeholder-amber-100/40 focus:outline-none focus:border-[#D4AF37]"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1A0206] font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t['submit-wish-btn']}</span>
            </button>
          </form>
        )}

        {/* Wall of Blessings Grid */}
        {blessings.length === 0 ? (
          <div className="glass-card-maroon rounded-2xl p-8 sm:p-10 border border-[#D4AF37]/35 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center mx-auto text-[#F7D070]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif font-bold text-lg text-[#FCE2A6]">
                Be the First to Send Blessings
              </h4>
              <p className="text-xs text-[#FFF8E7]/70 font-sans max-w-xs mx-auto leading-relaxed">
                Leave your heartfelt wishes, prayers, and blessings for Gourav & Debanjana.
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#D4AF37]/25 hover:bg-[#D4AF37]/40 border border-[#D4AF37]/60 text-[#FCE2A6] text-xs font-semibold tracking-wide transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t['write-wish-btn']}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {blessings.map(b => (
              <div
                key={b.id}
                className="glass-card-maroon rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/35 flex flex-col justify-between hover:border-[#D4AF37]/70 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#FCE2A6]">
                      {b.tag}
                    </span>
                    <span className="text-[11px] text-[#FFF8E7]/50">{b.timestamp}</span>
                  </div>

                  <p className="text-sm text-[#FFF8E7]/90 leading-relaxed font-sans italic">
                    "{b.message}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#FCE2A6]">{b.name}</h4>
                    <p className="text-[11px] text-[#FFF8E7]/60">{b.relationship}</p>
                  </div>

                  <button
                    onClick={() => handleLike(b.id)}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#050E24]/60 hover:bg-[#D4AF37]/20 text-[#FCE2A6] text-xs transition-colors border border-[#D4AF37]/30"
                    title="Send heart / love"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#F7D070]" />
                    <span>{b.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
