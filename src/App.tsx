import { useState, useEffect } from 'react';
import { Language, GuestSide } from './types';
import { PetalsCanvas } from './components/PetalsCanvas';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { KaliTempleSection } from './components/KaliTempleSection';
import { CalendarCountdownSection } from './components/CalendarCountdownSection';
import { EventsSection } from './components/EventsSection';
import { VictoriaMemorialSection } from './components/VictoriaMemorialSection';
import { BlessingsGuestbook } from './components/BlessingsGuestbook';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedEventId, setSelectedEventId] = useState<'wedding' | 'reception' | null>(null);

  // Guest side is strictly URL-controlled via query parameter (?side=bride / ?side=groom / ?side=all)
  const [guestSide, setGuestSide] = useState<GuestSide>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const sideParam = (params.get('side') || params.get('event') || params.get('view') || '').toLowerCase();
        if (sideParam === 'bride' || sideParam === 'girl' || sideParam === 'wedding') return 'bride';
        if (sideParam === 'groom' || sideParam === 'boy' || sideParam === 'reception') return 'groom';
      } catch {}
    }
    return 'all';
  });

  useEffect(() => {
    const onPopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sideParam = (params.get('side') || params.get('event') || params.get('view') || '').toLowerCase();
        if (sideParam === 'bride' || sideParam === 'girl' || sideParam === 'wedding') {
          setGuestSide('bride');
        } else if (sideParam === 'groom' || sideParam === 'boy' || sideParam === 'reception') {
          setGuestSide('groom');
        } else {
          setGuestSide('all');
        }
      } catch {}
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleOpenCalendar = () => {
    const el = document.getElementById('calendar-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectEventDate = (eventId: 'wedding' | 'reception') => {
    setSelectedEventId(eventId);
    const el = document.getElementById('events-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050E24] text-[#FFF8E7] selection:bg-[#D4AF37] selection:text-[#1A0206]">
      {/* Falling Marigold and Rose Petals Canvas */}
      <PetalsCanvas enabled={true} />

      {/* Fixed Top Bar & Floating Navigation Dock */}
      <HeaderNav
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section with Couple Details & Royal Invitation */}
        <HeroSection
          language={language}
          onOpenCalendar={handleOpenCalendar}
          guestSide={guestSide}
        />

        {/* Dakshineswar Kali Temple & Hooghly River Heritage Section */}
        <KaliTempleSection
          language={language}
        />

        {/* November 2026 Interactive Calendar & Live Countdown */}
        <CalendarCountdownSection
          language={language}
          onSelectEventDate={handleSelectEventDate}
          guestSide={guestSide}
        />

        {/* Auspicious Events & Venues with Google Maps Directions */}
        <EventsSection
          language={language}
          selectedEventId={selectedEventId}
          guestSide={guestSide}
        />

        {/* Victoria Memorial Parallax Illustration */}
        <VictoriaMemorialSection
          language={language}
        />

        {/* Blessings & Interactive Guestbook Wall */}
        <BlessingsGuestbook
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
