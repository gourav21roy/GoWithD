import { useState } from 'react';
import { Language } from './types';
import { PetalsCanvas } from './components/PetalsCanvas';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { KaliTempleSection } from './components/KaliTempleSection';
import { CalendarCountdownSection } from './components/CalendarCountdownSection';
import { EventsSection } from './components/EventsSection';
import { VictoriaMemorialSection } from './components/VictoriaMemorialSection';
import { BlessingsGuestbook } from './components/BlessingsGuestbook';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<'wedding' | 'reception' | null>(null);

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
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section with Couple Details & Royal Invitation */}
        <HeroSection
          language={language}
          onOpenCalendar={handleOpenCalendar}
        />

        {/* Dakshineswar Kali Temple & Hooghly River Heritage Section */}
        <KaliTempleSection
          language={language}
        />

        {/* November 2026 Interactive Calendar & Live Countdown */}
        <CalendarCountdownSection
          language={language}
          onSelectEventDate={handleSelectEventDate}
        />

        {/* Auspicious Events & Venues with Google Maps Directions */}
        <EventsSection
          language={language}
          selectedEventId={selectedEventId}
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

      {/* Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        language={language}
      />
    </div>
  );
}
