import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LETTER_CONTENT = `Okay so I was just sitting here thinking about you (like usual, no surprise there, at this point it's basically my full time job) and I decided you deserve a message that makes you smile instead of just another "how are you" text. You get enough of those. This one's different.

So here it is — an official notice that you are, scientifically speaking, one of the cutest, most amazing humans on this planet. I don't make the rules, the universe does. I just deliver the message. Somebody had to tell you, and honestly it might as well be me since I already think about it way too much.

I hope today you laugh so hard at something small and dumb that you can't even explain it to anyone later, the kind of laugh that just comes out of nowhere and surprises even you. I hope your favorite song plays at the perfect moment, like right when you need it. I hope someone lets you skip the line, your food comes out perfect, your drink isn't watered down for once, and your day just feels a little softer than usual, like everything's moving a bit slower and a bit kinder just for you today.

And hey, if nothing good happens today... well, I happened. So technically your day is already a win, no refunds, no complaints, you're stuck with that fact now.

I just really like knowing you exist. Like, out of everyone in the whole world, every single person on this entire planet, I get to know you, talk to you, annoy you a little, and make you smile sometimes. That's honestly one of my favorite parts of life right now, and I don't say that lightly. Some days that's the actual highlight, just texting you dumb stuff and seeing you reply.

So smile, okay? Even just a little one. I'll take it. I'll take a smirk. I'll take an eye roll with a hidden smile behind it, I know you do that thing lol... okay actually who am I kidding, I do that to you too, we're basically the same person at this point 😄 It's kind of unfair how well that works on both of us honestly.

You're doing great, even on the days it doesn't feel like it. You're loved, more than you probably realize, and definitely more than I say out loud enough. And you're stuck with me being cheesy like this, so get used to it, because I'm not planning on stopping anytime soon, not this year, not next year, not ever really.

Also, quick reminder in case nobody told you yet today you're funny, you're smart, you're way more capable than you give yourself credit for, and you make things better just by being in them. That's not me being extra, that's just facts.

Tomorrow's gonna be a good day. I just know it. And even if it's not perfect, I'll be here being annoying and sweet in equal amounts, same as always.`;

const TOTAL_SECONDS = 10;
const RING_RADIUS = 120;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; scale: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100%', x: `${heart.x}%`, opacity: 0 }}
          animate={{
            y: '-10%',
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          className="absolute text-pink-300/40"
          style={{ left: `${heart.x}%` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24 * heart.scale}
            height={24 * heart.scale}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

interface PhoneCountdownProps {
  countdown: number;
  ready: boolean;
  onOpen: () => void;
}

const PhoneCountdown = ({ countdown, ready, onOpen }: PhoneCountdownProps) => {
  const [currentTime, setCurrentTime] = useState(() => {
    return new Date().toLocaleTimeString('en-PH', {
      timeZone: 'Asia/Manila',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  });

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-PH', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }));
    };
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const progress = Math.max(0, Math.min(1, countdown / TOTAL_SECONDS));
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  const display = ready ? '0:00' : formatTime(countdown);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex items-center justify-center w-full min-h-screen p-4"
    >
      <motion.div
        onClick={ready ? onOpen : undefined}
        whileTap={ready ? { scale: 0.97 } : undefined}
        className={`w-[320px] rounded-[2.5rem] p-7 select-none ${ready ? 'cursor-pointer' : ''}`}
        style={{
          background: 'rgba(18, 18, 24, 0.92)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* iOS Status Bar */}
        <div className="flex items-center justify-between px-1 mb-6">
          <span className="text-white/90 text-sm font-semibold tracking-wide tabular-nums">{currentTime}</span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-white/90">
              <rect x="0" y="7" width="3" height="5" rx="0.8" />
              <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
              <rect x="9" y="3" width="3" height="9" rx="0.8" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.8" opacity="0.35" />
            </svg>
            {/* Wifi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="text-white/90">
              <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              <path d="M8 5.5c1.6 0 3.05.64 4.12 1.68l-1.42 1.42A4.35 4.35 0 008 7.5c-1.2 0-2.3.49-3.1 1.28L3.48 7.36A5.85 5.85 0 018 5.5z" />
              <path d="M8 1.5c2.9 0 5.55 1.17 7.45 3.07l-1.42 1.42A8.35 8.35 0 008 3.5c-2.3 0-4.4.94-5.9 2.45L.68 4.53A10.35 10.35 0 018 1.5z" />
            </svg>
            {/* Battery */}
            <div className="flex items-center">
              <div className="w-[25px] h-[12px] rounded-[3px] border border-white/60 relative">
                <div className="absolute inset-[2px] right-[35%] rounded-[1px] bg-white/90" />
              </div>
              <div className="w-[2px] h-[5px] rounded-r bg-white/60 -ml-[1px]" />
            </div>
          </div>
        </div>

        {/* Timer Card */}
        <div className="rounded-[1.8rem] bg-white/[0.06] border border-white/10 p-6">
          <div className="text-center text-xs uppercase tracking-[0.25em] text-pink-300/90 font-medium mb-4">
            {ready ? 'Surprise Ready' : 'Countdown'}
          </div>

          <div className="relative w-56 h-56 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
              />
              <motion.circle
                cx="140"
                cy="140"
                r={RING_RADIUS}
                fill="none"
                stroke={ready ? '#34d399' : '#f472b6'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: 'linear' }}
                style={{ filter: `drop-shadow(0 0 8px ${ready ? 'rgba(52,211,153,0.6)' : 'rgba(244,114,182,0.6)'})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                key={display}
                initial={{ opacity: 0.4, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-6xl font-light tabular-nums ${ready ? 'text-emerald-300' : 'text-white'}`}
              >
                {display}
              </motion.div>
              <div className="text-slate-400 text-xs tracking-[0.3em] uppercase mt-2">
                {ready ? 'Open' : 'Seconds'}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            {ready ? (
              <div className="text-emerald-300 font-medium text-sm">
                Tap anywhere to open 💝
              </div>
            ) : (
              <div className="text-slate-300 text-sm">
                Hold on, almost there...
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(TOTAL_SECONDS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!counting) return;

    if (count <= 0) {
      setCounting(false);
      setReady(true);
      return;
    }

    const timeout = window.setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [counting, count]);

  const closeLetterAndStartCountdown = () => {
    setIsOpen(false);
    setCount(TOTAL_SECONDS);
    setCounting(true);
    setReady(false);
  };

  const openSurprise = () => {
    window.open('FLOWER/index.html', '_blank');
  };

  const handleEnvelopeClick = () => {
    if (ready) openSurprise();
    else if (!counting) setIsOpen(true);
  };

  // Countdown screen (after closing the letter)
  if (counting || ready) {
    return (
      <PhoneCountdown countdown={count} ready={ready} onOpen={openSurprise} />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 z-10 relative">
      {!isOpen ? (
        <motion.div
          className="relative w-64 h-48 bg-red-600 rounded-lg shadow-xl cursor-pointer flex items-center justify-center"
          onClick={handleEnvelopeClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Envelope Flap */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[96px] border-t-red-700 rounded-t-lg z-20 origin-top transition-transform duration-500" />

          {/* Heart Seal */}
          <div className="z-30 bg-white rounded-full p-2 shadow-md mt-[-20px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="absolute bottom-4 text-white font-handwriting text-xl opacity-80">
            {ready ? 'Tap to open surprise' : 'Click to Open'}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white max-w-3xl w-full p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden min-h-[60vh] flex flex-col justify-center border border-slate-200"
        >
          <button
            type="button"
            onClick={closeLetterAndStartCountdown}
            className="absolute top-4 right-4 z-30 h-9 w-20 rounded-full bg-pink-100 text-pink-700 shadow-sm transition hover:bg-pink-200"
            aria-label="Close and start countdown"
          >
            Close
          </button>
          {/* Floating Hearts inside Letter */}
          <FloatingHearts />

          <div className="relative z-10">
            <div className="font-serif text-lg md:text-xl text-slate-900 leading-relaxed whitespace-pre-wrap text-justify select-none" style={{ fontFamily: '"Times New Roman", Times, serif', userSelect: 'none' }}>
              {LETTER_CONTENT}
            </div>

            {/* Extra hearts at the bottom */}
            <div className="mt-8 flex justify-center gap-4 opacity-70">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Letter;