import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface AudioEngineProps {
  language: Language;
}

const YOUTUBE_VIDEO_ID = 'ZKtZwkZSRhU';

export const AudioEngine: React.FC<AudioEngineProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const ytPlayerRef = useRef<any>(null);
  const pendingPlayRef = useRef<boolean>(true); // By default request play

  const t = translations[language] || translations.en;

  // Initialize YouTube Iframe API with default autoplay attempt
  useEffect(() => {
    let checkInterval: any;

    const setupPlayer = () => {
      if (window.YT && window.YT.Player && !ytPlayerRef.current) {
        try {
          const container = document.getElementById('youtube-player-element');
          if (!container) return;

          ytPlayerRef.current = new window.YT.Player('youtube-player-element', {
            height: '1',
            width: '1',
            videoId: YOUTUBE_VIDEO_ID,
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              playlist: YOUTUBE_VIDEO_ID,
              playsinline: 1,
              rel: 0
            },
            events: {
              onReady: (event: any) => {
                setIsReady(true);
                try {
                  event.target.playVideo();
                  setIsPlaying(true);
                  pendingPlayRef.current = false;
                } catch {
                  // If browser blocked unmuted autoplay, queue for first user gesture
                  pendingPlayRef.current = true;
                }
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  setIsBuffering(false);
                } else if (event.data === window.YT.PlayerState.BUFFERING) {
                  setIsBuffering(true);
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  setIsPlaying(false);
                  setIsBuffering(false);
                }
              },
              onError: (err: any) => {
                console.warn('YouTube playback notice:', err);
                setIsBuffering(false);
              }
            }
          });
        } catch (err) {
          console.warn('YouTube Player initialization notice:', err);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          setupPlayer();
        }
      }, 300);

      const existingOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof existingOnReady === 'function') {
          existingOnReady();
        }
        setupPlayer();
      };
    }

    // Modern browsers require a user interaction (tap/click/scroll) if unprompted autoplay policy engages
    const triggerAudioOnFirstInteraction = () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          const state = ytPlayerRef.current.getPlayerState();
          if (state !== window.YT?.PlayerState?.PLAYING) {
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
          }
        } catch {}
      }
      window.removeEventListener('click', triggerAudioOnFirstInteraction);
      window.removeEventListener('touchstart', triggerAudioOnFirstInteraction);
      window.removeEventListener('scroll', triggerAudioOnFirstInteraction);
    };

    window.addEventListener('click', triggerAudioOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', triggerAudioOnFirstInteraction, { once: true });
    window.addEventListener('scroll', triggerAudioOnFirstInteraction, { once: true });

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      window.removeEventListener('click', triggerAudioOnFirstInteraction);
      window.removeEventListener('touchstart', triggerAudioOnFirstInteraction);
      window.removeEventListener('scroll', triggerAudioOnFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      // Pause playback
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch (e) {
          console.warn(e);
        }
      }
      setIsPlaying(false);
      setIsBuffering(false);
    } else {
      // Play playback
      if (isReady && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Error initiating YouTube playback:', err);
        }
      } else {
        // Player not ready yet - queue for onReady
        pendingPlayRef.current = true;
        setIsBuffering(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ytPlayerRef.current) {
      try {
        if (isMuted) {
          ytPlayerRef.current.unMute();
          setIsMuted(false);
        } else {
          ytPlayerRef.current.mute();
          setIsMuted(true);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube audio element */}
      <div
        id="youtube-player-wrapper"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <div id="youtube-player-element" />
      </div>

      {/* Top Bar Floating Shehnai Control Pill */}
      <div
        id="music-control-pill"
        className="pointer-events-auto shrink-0 inline-flex items-center h-8 sm:h-9 rounded-full glass-card-maroon border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#FCE2A6] transition-all shadow-lg backdrop-blur-md px-1"
      >
        <button
          id="music-control-btn"
          onClick={toggleMusic}
          title={t['music-tooltip']}
          aria-label={isPlaying ? t['music-pause'] : t['music-play']}
          className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-2.5 h-full text-[#FCE2A6] hover:text-white transition-colors group cursor-pointer whitespace-nowrap select-none"
        >
          <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7D070] shrink-0 ${isPlaying ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'}`} />

          <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
            {isBuffering
              ? 'Loading...'
              : isPlaying
              ? (
                <>
                  <span className="hidden xs:inline">{language === 'bn' ? 'মিউজিক ' : language === 'hi' ? 'संगीत ' : 'Pause '}</span>
                  <span>{language === 'bn' ? 'থামান' : language === 'hi' ? 'रोकें' : 'Shehnai'}</span>
                </>
              )
              : (
                <>
                  <span className="hidden xs:inline">{language === 'bn' ? 'বাজান ' : language === 'hi' ? 'बजाएं ' : 'Play '}</span>
                  <span>{language === 'bn' ? 'সানাই' : language === 'hi' ? 'शहनाई' : 'Shehnai'}</span>
                </>
              )}
          </span>
        </button>

        {isPlaying && (
          <button
            id="music-mute-btn"
            onClick={toggleMute}
            className="p-1 sm:p-1.5 rounded-full hover:bg-[#D4AF37]/25 text-[#FCE2A6] transition-colors border-l border-[#D4AF37]/30 mr-0.5 cursor-pointer shrink-0"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />}
          </button>
        )}
      </div>
    </>
  );
};
