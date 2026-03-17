import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bolt, MessageCircle } from 'lucide-react';
import heroImg from '../assets/images/hero.png';
import robotLogo from '../assets/images/robot-logo.svg';

const chatMessages = [
  { role: 'user' as const, text: 'Oi, a tela do meu S22 Ultra quebrou 😔' },
  { role: 'agent' as const, text: 'Olá! Lamento 😕 Temos a peça original em estoque 📱' },
  { role: 'agent' as const, text: 'Valor: R$450-R$600. Deseja agendar troca para hoje?' },
  { role: 'user' as const, text: 'Sim! Consigo levar agora?' },
  { role: 'agent' as const, text: '✅ Horário às 14h disponível! Vou encaminhar pro técnico.' },
];

export default function Hero() {
  const [visibleMessages, setVisibleMessages] = useState(0);

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
    <section id="inicio" className="pt-24 md:pt-28 pb-4 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden dark:bg-slate-900 dark:shadow-none dark:border-slate-800"
      >
        <div className="flex flex-col lg:flex-row min-h-[480px]">
          {/* Left — Text Content */}
          <div className="p-8 md:p-12 lg:p-14 flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide uppercase mb-6 border border-blue-100 w-fit">
              <Bolt size={14} /> Inteligência para Assistências
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-5 dark:text-white">
              Seu WhatsApp no piloto automático.
            </h1>
            <p className="text-base md:text-lg text-slate-500 mb-8 max-w-lg leading-relaxed dark:text-slate-400">
              Agentes de IA que triam, orçam e organizam o atendimento da sua assistência técnica, 24 horas por dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contato" className="px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors text-center text-sm">
                Ver demonstração
              </a>
              <a href="#integracoes" className="px-7 py-3.5 bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors text-center text-sm dark:bg-slate-800/40 dark:text-white dark:border-slate-700">
                Como funciona
              </a>
            </div>
          </div>
          
          {/* Right — Visual + Animated Chat */}
          <div className="flex-1 relative min-h-[320px] lg:min-h-full bg-slate-900 overflow-hidden dark:bg-slate-950">
            {/* Background image */}
            <img src={heroImg} alt="Agente de IA para WhatsApp" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/60"></div>
            
            {/* Floating Robot Logo */}
            <motion.img
              src={robotLogo}
              alt="AI Agent"
              className="absolute top-6 left-6 w-14 h-14 drop-shadow-2xl"
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* Animated Chat Simulation — centered in the panel */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[320px]">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                  {/* Chat header */}
                  <div className="flex items-center gap-2.5 p-3 border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm dark:shadow-none">
                      <MessageCircle size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Agente Visual AI</h4>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-green-600 font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                  {/* Chat messages */}
                  <div className="p-3 space-y-2 min-h-[160px] max-h-[200px] overflow-hidden">
                    <AnimatePresence>
                      {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`text-[11px] leading-relaxed p-2 rounded-lg max-w-[88%] ${ msg.role === 'user' ? 'bg-slate-100 text-slate-800 rounded-tr-sm ml-auto' : 'bg-blue-50 border border-blue-100 text-blue-900 rounded-tl-sm' } dark:text-slate-100`}
                        >
                          {msg.text}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {visibleMessages < chatMessages.length && visibleMessages > 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 p-2">
                        <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
