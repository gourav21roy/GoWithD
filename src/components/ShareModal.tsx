import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share2, QrCode } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, language }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[language] || translations.en;

  if (!isOpen) return null;

  const appUrl = window.location.href.split('#')[0];
  const shareMessage = `🌸 You are cordially invited to celebrate the wedding & reception of Gourav Roy & Debanjana Sarkar (#GouravKiDebu) in Kolkata on Nov 21 & 23, 2026!\n\nView Invitation & Details here:\n${appUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Gourav & Debanjana | Wedding Invitation',
        text: shareMessage,
        url: appUrl
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-card-maroon rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-[#D4AF37]/70 shadow-2xl relative space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#FCE2A6] hover:text-white hover:bg-[#D4AF37]/20 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#F7D070] mb-2">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FCE2A6]">
            {t['share-title']}
          </h3>
          <p className="text-xs text-[#FFF8E7]/70 font-sans">
            {t['share-subtitle']}
          </p>
        </div>

        {/* QR Code Card */}
        <div className="p-5 rounded-2xl bg-[#FFF8E7] text-[#1A0206] text-center space-y-2.5 max-w-[200px] mx-auto shadow-inner">
          <svg className="w-36 h-36 mx-auto" viewBox="0 0 100 100" fill="currentColor">
            {/* Elegant Ornate QR Representation */}
            <rect x="5" y="5" width="25" height="25" fill="#1A0206" />
            <rect x="9" y="9" width="17" height="17" fill="#FFF8E7" />
            <rect x="13" y="13" width="9" height="9" fill="#D4AF37" />

            <rect x="70" y="5" width="25" height="25" fill="#1A0206" />
            <rect x="74" y="9" width="17" height="17" fill="#FFF8E7" />
            <rect x="78" y="13" width="9" height="9" fill="#D4AF37" />

            <rect x="5" y="70" width="25" height="25" fill="#1A0206" />
            <rect x="9" y="74" width="17" height="17" fill="#FFF8E7" />
            <rect x="13" y="78" width="9" height="9" fill="#D4AF37" />

            {/* Matrix dots */}
            <rect x="36" y="10" width="6" height="6" fill="#1A0206" />
            <rect x="46" y="10" width="8" height="6" fill="#1A0206" />
            <rect x="58" y="12" width="6" height="6" fill="#1A0206" />
            <rect x="36" y="24" width="8" height="6" fill="#1A0206" />
            <rect x="50" y="24" width="6" height="6" fill="#1A0206" />

            <rect x="12" y="38" width="6" height="6" fill="#1A0206" />
            <rect x="24" y="42" width="6" height="6" fill="#1A0206" />
            <rect x="36" y="38" width="12" height="12" fill="#D4AF37" rx="2" />
            <rect x="54" y="40" width="6" height="6" fill="#1A0206" />
            <rect x="68" y="38" width="8" height="6" fill="#1A0206" />
            <rect x="82" y="42" width="6" height="6" fill="#1A0206" />

            <rect x="36" y="56" width="6" height="6" fill="#1A0206" />
            <rect x="48" y="54" width="10" height="6" fill="#1A0206" />
            <rect x="64" y="56" width="6" height="6" fill="#1A0206" />
            <rect x="78" y="54" width="8" height="6" fill="#1A0206" />

            <rect x="36" y="72" width="6" height="8" fill="#1A0206" />
            <rect x="48" y="70" width="8" height="6" fill="#1A0206" />
            <rect x="60" y="74" width="6" height="6" fill="#1A0206" />
            <rect x="72" y="70" width="6" height="10" fill="#1A0206" />
            <rect x="84" y="76" width="6" height="6" fill="#1A0206" />
          </svg>
          <p className="text-[10px] font-semibold text-[#1A0206] uppercase tracking-wider">
            {t['qr-label']}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center space-x-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t['whatsapp-btn']}</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1A0206] font-bold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center space-x-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t['link-copied'] : t['copy-link-btn']}</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-full glass-card-royal border border-[#D4AF37]/40 text-xs text-[#FCE2A6] hover:text-white transition-all flex items-center justify-center space-x-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share via Apps</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
