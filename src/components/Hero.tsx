import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

const chatMessages = [
  { role: 'user' as const, text: 'Oi, a tela do meu S22 Ultra quebrou 😔', time: '14:02' },
  { role: 'agent' as const, text: 'Olá! Lamento 😕 Temos a peça original em estoque 📱', time: '14:02' },
  { role: 'agent' as const, text: 'Troca: R$450–R$600. Deseja agendar para hoje?', time: '14:02' },
  { role: 'user' as const, text: 'Sim! Consigo levar agora?', time: '14:03' },
  { role: 'agent' as const, text: '✅ Horário às 14h disponível! Vou encaminhar pro técnico.', time: '14:03' },
];

export default function Hero() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const containerRef = React.useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const chatY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  useEffect(() => {
    if (visibleMessages < chatMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, visibleMessages === 0 ? 1200 : 1800);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => setVisibleMessages(0), 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleMessages]);

  return (
    <section id="inicio" ref={containerRef} className="pt-24 md:pt-32 pb-8 max-w-7xl mx-auto px-4 overflow-hidden relative">
      <motion.div 
        style={{ y: textY, opacity }}
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2.5rem] monster-shadow border border-slate-100 overflow-hidden dark:bg-slate-900/40 dark:border-slate-800/50 glass relative will-change-transform"
      >
        <div className="flex flex-col lg:flex-row min-h-[520px]">
          {/* Left — Text Content */}
          <div className="p-8 md:p-14 lg:p-16 flex-1 flex flex-col justify-center relative z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}

              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/50 text-indigo-600 rounded-full text-xs font-bold tracking-wide uppercase mb-8 border border-indigo-100/50 w-fit dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30"
            >
              ✨ Inteligência Visual para o seu negócio
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 leading-[1] mb-6 dark:text-white">
              Seu WhatsApp no <br />
              <span className="gradient-text">piloto automático.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-lg leading-relaxed dark:text-slate-400">
              Agentes de IA que triam, orçam e organizam o atendimento da sua assistência técnica, 24 horas por dia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contato" 
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all text-center"
              >
                Ver demonstração
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#integracoes" 
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-center dark:bg-slate-800/40 dark:text-white dark:border-slate-700 glass"
              >
                Como funciona
              </motion.a>
            </div>
          </div>
          
          {/* Right — Real WhatsApp-style Chat */}
          <div className="flex-1 relative min-h-[420px] lg:min-h-[580px] bg-slate-950 overflow-hidden flex items-center justify-center p-6 w-full">
            {/* Background blur glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>

            {/* Floating robot icon */}
            <motion.img
              src={robotLogo}
              alt="AI Agent"
              className="absolute top-6 right-6 w-10 h-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* WhatsApp UI Shell */}
            <div className="w-full max-w-[300px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10" style={{ background: '#0d1117' }}>
              {/* WhatsApp Top Bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5" style={{ background: '#1a2332' }}>
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">VA</div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1a2332]"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold leading-tight truncate">Agente Visual AI</p>
                  <p className="text-green-400 text-[10px] font-semibold tracking-wide">Online agora</p>
                </div>
                <div className="flex items-center gap-3 text-[#adb5bd]">
                  <Video size={16} />
                  <Phone size={16} />
                  <MoreVertical size={16} />
                </div>
              </div>

              {/* WhatsApp Wallpaper */}
              <div className="px-3 py-4 flex flex-col justify-end space-y-2 h-[340px] overflow-hidden" style={{ background: '#0a1628', backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}>
                <div className="w-full flex flex-col justify-end gap-2">
                {/* Day separator */}
                <div className="flex justify-center mb-1">
                  <span className="text-[10px] rounded-full px-3 py-0.5 font-medium" style={{ background: 'rgba(255,255,255,0.07)', color: '#8899aa' }}>HOJE</span>
                </div>

                <AnimatePresence mode="popLayout">
                  {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                    <motion.div
                      layout
                      key={i}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full shrink-0`}
                    >
                      <div
                        className={`max-w-[85%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed relative shadow-md ${
                          msg.role === 'user'
                            ? 'text-white rounded-tr-sm'
                            : 'text-white rounded-tl-sm'
                        }`}
                        style={{
                          background: msg.role === 'user'
                            ? 'linear-gradient(135deg, #5b6ef5 0%, #3b4fd8 100%)'
                            : '#1e2d42',
                        }}
                      >
                        {msg.text}
                        <div className={`flex items-center gap-1 mt-1 ${msg.role === 'user' ? 'justify-end' : 'justify-end'}`}>
                          <span className="text-[9px] opacity-60">{msg.time}</span>
                          {msg.role === 'user' && <CheckCheck size={11} className="opacity-70 text-blue-300" />}
                          {msg.role === 'agent' && <Check size={11} className="opacity-50" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                </div>

                {/* Typing indicator */}
                {visibleMessages < chatMessages.length && visibleMessages > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center" style={{ background: '#1e2d42' }}>
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay }}
                          className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-t border-white/5" style={{ background: '#1a2332' }}>
                <div className="flex-1 rounded-full px-4 py-2 text-[11px] text-[#5a6a7a]" style={{ background: '#0d1117' }}>
                  Mensagem...
                </div>
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
