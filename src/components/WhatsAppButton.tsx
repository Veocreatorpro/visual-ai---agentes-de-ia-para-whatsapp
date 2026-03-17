import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/5571992355913?text=Ol%C3%A1%20%F0%9F%A4%96%20Quero%20entender%20como%20um%20agente%20de%20IA%20no%20WhatsApp%20pode%20ajudar%20no%20atendimento%20da%20minha%20empresa.%20Tenho%20interesse%20em%20uma%20solu%C3%A7%C3%A3o%20personalizada%20e%20gostaria%20de%20iniciar%20uma%20an%C3%A1lise%20da%20minha%20necessidade.%20%F0%9F%9A%80";

  const [isPressing, setIsPressing] = useState(false);
  const [robotVisible, setRobotVisible] = useState(false);

  useEffect(() => {
    const triggerAnimation = () => {
      setRobotVisible(true);
      
      // T=2.0s: Robot reaches the button, trigger button press
      setTimeout(() => {
        setIsPressing(true);
        // T=2.2s: Release button press
        setTimeout(() => setIsPressing(false), 200);
      }, 2000);

      // T=4.0s: Robot animation ends, hide robot
      setTimeout(() => {
        setRobotVisible(false);
      }, 4000);
    };

    // Trigger initial animation shortly after page load so user sees it
    const initialTimer = setTimeout(() => {
      triggerAnimation();
    }, 5000);

    // Runs the animation every 30 seconds
    const intervalId = setInterval(() => {
      triggerAnimation();
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {robotVisible && (
          <motion.img
            src={robotLogo}
            alt="AI Robot"
            className="fixed bottom-7 right-6 z-40 drop-shadow-xl pointer-events-none w-14 h-14"
            initial={{ x: 150, opacity: 0 }}
            animate={{
              x: [150, 40, 40, 150], // Robot walks left towards the button (offset relative to right-6), stays, walks right
              opacity: [0, 1, 1, 0], // fades in, stays, fades out
              y: [0, -15, 0, -10, 0, -15, 0], // bouncy walk effect
              rotate: [0, 5, -5, 10, -10, 0] // waddle effect
            }}
            transition={{
              duration: 4,
              times: [0, 0.5, 0.55, 1], // arrives at 0.5 (2s), stays until 0.55 (2.2s), leaves at 1 (4s)
              ease: "easeInOut"
            }}
            exit={{ opacity: 0, scale: 0.5 }}
          />
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 text-white font-bold text-sm rounded-full shadow-lg shadow-green-500/30 transition-all group pointer-events-auto"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isPressing ? 0.9 : 1, 
          y: 0,
          backgroundColor: isPressing ? '#16a34a' : '#22c55e', // Darker green when pressed
          boxShadow: isPressing ? '0 0 15px rgba(34, 197, 94, 0.8)' : '0 10px 15px -3px rgba(34, 197, 94, 0.3)'
        }}
        whileHover={{ scale: 1.05, backgroundColor: '#16a34a' }}
        transition={{ duration: 0.2 }}
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
