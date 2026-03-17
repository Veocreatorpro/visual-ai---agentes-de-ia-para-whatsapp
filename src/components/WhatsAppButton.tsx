import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/5571992355913?text=Ol%C3%A1%20%F0%9F%A4%96%20Quero%20entender%20como%20um%20agente%20de%20IA%20no%20WhatsApp%20pode%20ajudar%20no%20atendimento%20da%20minha%20empresa.%20Tenho%20interesse%20em%20uma%20solu%C3%A7%C3%A3o%20personalizada%20e%20gostaria%20de%20iniciar%20uma%20an%C3%A1lise%20da%20minha%20necessidade.%20%F0%9F%9A%80";

  const [isPressing, setIsPressing] = useState(false);
  const [robotPhase, setRobotPhase] = useState<'hidden' | 'walking-in' | 'pressing' | 'walking-out'>('hidden');

  const triggerAnimation = useCallback(() => {
    if (robotPhase !== 'hidden') return; // Don't trigger if already animating
    
    // Phase 1: Robot walks in from the right
    setRobotPhase('walking-in');
    
    // Phase 2: Robot presses the button at 2.5s
    setTimeout(() => {
      setRobotPhase('pressing');
      setIsPressing(true);
      // Release press after 300ms
      setTimeout(() => {
        setIsPressing(false);
        setRobotPhase('walking-out');
      }, 300);
    }, 2500);

    // Phase 3: Hide robot at 5s
    setTimeout(() => {
      setRobotPhase('hidden');
    }, 5000);
  }, [robotPhase]);

  useEffect(() => {
    // Initial trigger after 5 seconds
    const initialTimer = setTimeout(triggerAnimation, 5000);
    // Repeat every 30 seconds
    const intervalId = setInterval(triggerAnimation, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [triggerAnimation]);

  return (
    <>
      {/* Robot animation — completely independent positioning */}
      <AnimatePresence>
        {robotPhase !== 'hidden' && (
          <motion.div
            key="walking-robot"
            className="fixed z-[60] pointer-events-none"
            style={{ bottom: '28px', right: '24px' }}
            initial={{ opacity: 0, x: 120, y: 0 }}
            animate={
              robotPhase === 'walking-in'
                ? { opacity: 1, x: 60, y: [-5, -20, -5, -15, -5], rotate: [0, 8, -8, 5, 0] }
                : robotPhase === 'pressing'
                ? { opacity: 1, x: 30, y: -8, rotate: -5, scale: 1.1 }
                : { opacity: 0, x: 120, y: [-5, -20, -5], rotate: [0, -8, 0] }
            }
            transition={
              robotPhase === 'walking-in'
                ? { duration: 2.5, ease: 'easeInOut' }
                : robotPhase === 'pressing'
                ? { duration: 0.2, ease: 'easeOut' }
                : { duration: 2, ease: 'easeInOut' }
            }
            exit={{ opacity: 0, x: 120, transition: { duration: 0.5 } }}
          >
            <img
              src={robotLogo}
              alt="AI Robot"
              className="w-12 h-12 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
            {/* Speech bubble when pressing */}
            {robotPhase === 'pressing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: -5 }}
                className="absolute -top-8 -left-4 bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-white px-2 py-1 rounded-lg shadow-lg whitespace-nowrap"
              >
                Clique aqui! 👆
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 text-white font-bold text-sm rounded-full transition-all group"
        style={{ backgroundColor: '#22c55e' }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isPressing ? 0.88 : 1, 
          y: isPressing ? 2 : 0,
          boxShadow: isPressing 
            ? '0 0 25px rgba(34, 197, 94, 0.9), 0 0 50px rgba(34, 197, 94, 0.4)' 
            : '0 10px 25px -5px rgba(34, 197, 94, 0.4)'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <MessageCircle size={20} />
        </motion.span>
        <span className="hidden sm:inline">Falar no WhatsApp</span>
      </motion.a>
    </>
  );
}
