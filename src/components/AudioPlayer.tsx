import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 1. Recover State
    const savedMuted = localStorage.getItem('audioMuted') === 'true';
    const savedTime = parseFloat(localStorage.getItem('audioTime') || '0');

    if (audioRef.current) {
      audioRef.current.currentTime = savedTime;
      audioRef.current.volume = 0.2;
    }

    // 2. Auto-play attempt if not muted
    if (!savedMuted && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }

    // 3. Save timestamp before leaving page
    const handleUnload = () => {
      if (audioRef.current) {
        localStorage.setItem('audioTime', audioRef.current.currentTime.toString());
      }
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('audioMuted', 'true');
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem('audioMuted', 'false');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[50]">
      <audio ref={audioRef} loop preload="none">
        <source src="/assets/audio/space.mp3" type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={toggleAudio}
        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#0b1121]/90 backdrop-blur-md border border-white/[0.14] text-white flex items-center justify-center shadow-lg shadow-black/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:border-primary/60 transition-all duration-200 active:scale-95 cursor-pointer group focus-visible:ring-2 focus-visible:ring-primary"
        style={{ touchAction: 'manipulation' }}
        aria-label={isPlaying ? 'Mute space ambient sound' : 'Play space ambient sound'}
        title={isPlaying ? 'Couper le son' : 'Activer l’ambiance spatiale'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>
    </div>
  );
};