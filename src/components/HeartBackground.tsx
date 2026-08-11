import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeartBackground = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; scale: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 1.5,
      }));
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-br from-red-50 to-pink-100">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, scale: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            scale: heart.scale,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          className="absolute text-pink-400/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
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

export default HeartBackground;
