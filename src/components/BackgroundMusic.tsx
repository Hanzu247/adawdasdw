import { useEffect, useRef, useState } from 'react';
import { Music, Music2 } from 'lucide-react';
import libuLibongBuwan from '../assets/libu-libong-buwan.mp3';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const audio = new Audio(libuLibongBuwan);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Expose a global pause function so the FLOWER page can stop this music
    (window as any).__pauseBackgroundMusic = () => {
      audio.pause();
      setIsPlaying(false);
    };

    // Try to autoplay immediately
    const tryAutoplay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked - show the play button as fallback
        setShowButton(true);
      });
    };

    // Attempt autoplay on load
    tryAutoplay();

    // Also show the button after a delay so the user can toggle if needed
    const timer = window.setTimeout(() => setShowButton(true), 2000);

    return () => {
      window.clearTimeout(timer);
      delete (window as any).__pauseBackgroundMusic;
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay blocked - user needs to tap again
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 ${
        isPlaying
          ? 'bg-pink-500/90 text-white hover:bg-pink-600/90'
          : 'bg-white/80 text-pink-600 border border-pink-200 hover:bg-pink-50'
      }`}
    >
      {isPlaying ? (
        <>
          <Music2 size={18} className="animate-pulse" />
          <span className="text-sm font-medium">Now Playing</span>
        </>
      ) : (
        <>
          <Music size={18} />
          <span className="text-sm font-medium">Play Music</span>
        </>
      )}
    </button>
  );
};

export default BackgroundMusic;