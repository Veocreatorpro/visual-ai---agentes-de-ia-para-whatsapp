import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/5571992355913?text=Ol%C3%A1%20%F0%9F%A4%96%20Quero%20entender%20como%20um%20agente%20de%20IA%20no%20WhatsApp%20pode%20ajudar%20no%20atendimento%20da%20minha%20empresa.%20Tenho%20interesse%20em%20uma%20solu%C3%A7%C3%A3o%20personalizada%20e%20gostaria%20de%20iniciar%20uma%20an%C3%A1lise%20da%20minha%20necessidade.%20%F0%9F%9A%80";

  const [isPressing, setIsPressing] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [animPhase, setAnimPhase] = useState(0); // 0=hidden, 1=enter, 2=walk, 3=arrive, 4=press, 5=wave, 6=exit
  const isAnimating = useRef(false);

  const runAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setShowRobot(true);
    setAnimPhase(1); // Enter from left edge

    // Phase 2: Walking across (1s)
    setTimeout(() => setAnimPhase(2), 100);
    
    // Phase 3: Arrive near button (2.5s)
    setTimeout(() => setAnimPhase(3), 2500);
    
    // Phase 4: Press button (3s)
    setTimeout(() => {
      setAnimPhase(4);
      setIsPressing(true);
    }, 3000);
    
    // Phase 5: Release + wave (3.4s)
    setTimeout(() => {
      setIsPressing(false);
      setAnimPhase(5);
    }, 3400);
    
    // Phase 6: Exit (4.5s)
    setTimeout(() => setAnimPhase(6), 4500);
    
    // Hide (6s)
    setTimeout(() => {
      setShowRobot(false);
      setAnimPhase(0);
      isAnimating.current = false;
    }, 6000);
  };

  useEffect(() => {
    const initialTimer = setTimeout(runAnimation, 4000);
    const intervalId = setInterval(runAnimation, 30000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  // Calculate robot position based on phase
  const getRobotStyle = () => {
    switch (animPhase) {
      case 1: // Enter — appear at left edge of screen
        return { 
          left: '-60px', bottom: '24px', 
          opacity: 0, transform: 'translateX(0) rotate(0deg) scale(0.8)' 
        };
      case 2: // Walking across screen to the right
        return { 
          left: 'calc(100vw - 200px)', bottom: '24px', 
          opacity: 1, transform: 'translateX(0) rotate(0deg) scale(1)',
          transition: 'all 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
      case 3: // Arrive near button
        return { 
          left: 'calc(100vw - 200px)', bottom: '24px', 
          opacity: 1, transform: 'translateX(0) rotate(5deg) scale(1.05)',
          transition: 'all 0.4s ease-out'
        };
      case 4: // Press — lean forward
        return { 
          left: 'calc(100vw - 180px)', bottom: '24px', 
          opacity: 1, transform: 'translateX(0) rotate(-10deg) scale(1.15)',
          transition: 'all 0.15s ease-out'
        };
      case 5: // Wave — lean back
        return { 
          left: 'calc(100vw - 200px)', bottom: '28px', 
          opacity: 1, transform: 'translateX(0) rotate(8deg) scale(1.05)',
          transition: 'all 0.5s ease-in-out'
        };
      case 6: // Exit — walk off right edge
        return { 
          left: 'calc(100vw + 80px)', bottom: '24px', 
          opacity: 0, transform: 'translateX(0) rotate(0deg) scale(0.8)',
          transition: 'all 1.5s cubic-bezier(0.55, 0.09, 0.68, 0.53)'
        };
      default:
        return { left: '-60px', bottom: '24px', opacity: 0 };
    }
  };

  return (
    <>
      {/* Walking Robot — pure CSS transitions for smoothness */}
      {showRobot && (
        <div
          className="fixed z-[60] pointer-events-none"
          style={getRobotStyle()}
        >
          {/* Glow trail effect */}
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ 
              background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
              width: '60px', height: '60px', top: '-4px', left: '-4px'
            }} 
          />
          
          {/* Robot image with walking bounce */}
          <img
            src={robotLogo}
            alt="AI Robot"
            className="w-12 h-12 relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            style={{
              animation: animPhase === 2 ? 'robotWalk 0.6s ease-in-out infinite' : 
                         animPhase === 5 ? 'robotWave 0.4s ease-in-out' : 'none'
            }}
          />

          {/* Speech bubble */}
          <AnimatePresence>
            {(animPhase === 4 || animPhase === 5) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-white px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-slate-200 dark:border-slate-600"
              >
                {animPhase === 4 ? '👆 Clique aqui!' : '😊 Até logo!'}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-600 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* CSS Keyframes */}
      <style>{`
        @keyframes robotWalk {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          25% { transform: translateY(-8px) rotate(3deg); }
          50% { transform: translateY(0) rotate(-3deg); }
          75% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes robotWave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          50% { transform: rotate(-5deg); }
          75% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      {/* WhatsApp button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold text-sm rounded-full transition-all group"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isPressing ? 0.88 : 1, 
          y: isPressing ? 2 : 0,
          boxShadow: isPressing 
            ? '0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.3)' 
            : '0 8px 25px -5px rgba(34, 197, 94, 0.4)'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <MessageCircle size={20} />
        </motion.span>
        <span className="hidden sm:inline">Falar no WhatsApp</span>
      </motion.a>
    </>
  );
}
