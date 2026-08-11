import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ReasonsProps {
  onNext: () => void;
}

const REASONS = [
  {
    title: "Your Dedication",
    description: "You keep showing up with so much strength and care, even when life feels tough."
  },
  {
    title: "Your Tenderness",
    description: "Every small gesture from you makes me feel safe, seen, and deeply loved."
  },
  {
    title: "Your Humor",
    description: "Your laugh brightens everything and makes ordinary moments feel magical."
  },
  {
    title: "Your Beauty",
    description: "Your warmth and kindness are the most beautiful things I’ve ever known."
  },
  {
    title: "Your Heart",
    description: "The way you care and love with honesty is everything I want."
  },
  {
    title: "Our Future",
    description: "I’m excited for every tomorrow I get to share with you."
  }
];

const Reasons = ({ onNext }: ReasonsProps) => {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReason = (index: number) => {
    if (!revealed.includes(index)) {
      setRevealed([...revealed, index]);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2 font-cursive">A few sweet reasons why you make every day brighter</h2>
          <p className="text-pink-400 text-sm">Tap each heart to discover one little love note.</p>
        </div>

        <div className="space-y-3 mb-8">
          {REASONS.map((reason, index) => (
            <motion.button
              key={index}
              onClick={() => toggleReason(index)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                revealed.includes(index) 
                  ? 'bg-pink-50 border-pink-200 shadow-sm' 
                  : 'bg-white border-pink-100 hover:bg-pink-50/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`mt-1 p-2 rounded-full transition-colors ${
                revealed.includes(index) ? 'bg-pink-200 text-pink-600' : 'bg-pink-100 text-pink-300'
              }`}>
                <Heart size={16} fill={revealed.includes(index) ? "currentColor" : "none"} />
              </div>
              <div>
                <h3 className={`font-semibold text-gray-800 ${!revealed.includes(index) && 'blur-sm select-none'}`}>
                  {revealed.includes(index) ? reason.title : "Tap to reveal"}
                </h3>
                {revealed.includes(index) && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-600 mt-1"
                  >
                    {reason.description}
                  </motion.p>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center space-y-3">
          <motion.button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Your Letter
          </motion.button>
          <p className="text-xs text-pink-300 italic">One final surprise awaits...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Reasons;
