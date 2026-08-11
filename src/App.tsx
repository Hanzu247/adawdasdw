import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartBackground from './components/HeartBackground';
import LockScreen from './components/LockScreen';
import Reasons from './components/Reasons';
import Letter from './components/Letter';
import BackgroundMusic from './components/BackgroundMusic';

function App() {
  const [step, setStep] = useState<'lock' | 'reasons' | 'letter'>('lock');

  return (
    <div className="min-h-screen w-full bg-pink-50 overflow-hidden relative font-sans">
      <HeartBackground />
      <BackgroundMusic />
      
      <AnimatePresence mode="wait">
        {step === 'lock' && (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LockScreen onUnlock={() => setStep('reasons')} />
          </motion.div>
        )}

        {step === 'reasons' && (
          <motion.div
            key="reasons"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 overflow-y-auto"
          >
            <Reasons onNext={() => setStep('letter')} />
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 overflow-y-auto"
          >
            <Letter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
