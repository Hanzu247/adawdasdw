import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const PASSCODE = '081212';

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (input.length === 6) {
      if (input === PASSCODE) {
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setInput('');
          setError(false);
        }, 500);
      }
    }
  }, [input, onUnlock]);

  const handlePress = (num: string) => {
    if (input.length < 6) {
      setInput((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full z-10 relative text-gray-800">
      <div className="mb-8 flex flex-col items-center">
        <div className="text-sm font-medium tracking-widest uppercase mb-4 text-pink-600">
          Enter Passcode
        </div>
        <motion.div 
          className="flex gap-4"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border border-pink-400 transition-all duration-200 ${
                i < input.length ? 'bg-pink-500' : 'bg-transparent'
              }`}
            />
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-x-8 gap-y-6 max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num.toString())}
            className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm border border-pink-200 flex items-center justify-center text-2xl font-light text-pink-600 active:bg-pink-100 transition-colors shadow-sm"
          >
            {num}
          </button>
        ))}
        <div className="w-16 h-16" /> {/* Empty slot */}
        <button
          onClick={() => handlePress('0')}
          className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm border border-pink-200 flex items-center justify-center text-2xl font-light text-pink-600 active:bg-pink-100 transition-colors shadow-sm"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="w-16 h-16 rounded-full flex items-center justify-center text-pink-600 active:bg-pink-100 transition-colors"
        >
          <Delete size={24} />
        </button>
      </div>
      
      <div className="mt-8 text-xs text-pink-400 font-medium">
        Ask me HAHAHHA
      </div>
    </div>
  );
};

export default LockScreen;
