import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 1. Recover State (Mute preference & Time position)
    const savedMuted = localStorage.getItem('audioMuted') === 'true';
    const savedTime = parseFloat(localStorage.getItem('audioTime') || '0');
    
    if (audioRef.current) {
      audioRef.current.currentTime = savedTime;
      // Set volume low so it isn't annoying
      audioRef.current.volume = 0.2;
    }

    // 2. Auto-play attempt (if not muted)
    if (!savedMuted && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Auto-play prevented:", error);
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
    <div className="fixed bottom-6 left-6 z-[50]">
      {/* Ensure this path matches where your MP3 file is located */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/audio/space.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleAudio}
        className="w-14 h-14 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:border-primary transition-all duration-300 group"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
};