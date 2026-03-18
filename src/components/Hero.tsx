import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bolt, MessageCircle, Sparkles } from 'lucide-react';
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
    <section id="inicio" className="pt-24 md:pt-32 pb-8 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2.5rem] monster-shadow border border-slate-100 overflow-hidden dark:bg-slate-900/40 dark:border-slate-800/50 glass"
      >
        <div className="flex flex-col lg:flex-row min-h-[520px]">
          {/* Left — Text Content */}
          <div className="p-8 md:p-14 lg:p-16 flex-1 flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/50 text-indigo-600 rounded-full text-xs font-bold tracking-wide uppercase mb-8 border border-indigo-100/50 w-fit dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30"
            >
              <Sparkles size={14} className="animate-pulse" /> Inteligência Visual para o seu negócio
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
          
          {/* Right — Visual + Animated Chat */}
          <div className="flex-1 relative min-h-[380px] lg:min-h-full bg-slate-950 overflow-hidden">
            {/* Background Image with extra treatment */}
            <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-transparent to-slate-950"></div>
            
            {/* Ambient glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>

            {/* Floating Elements */}
            <motion.img
              src={robotLogo}
              alt="AI Agent"
              className="absolute top-8 left-8 w-16 h-16 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />

            {/* Animated Chat Simulation */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[340px]">
                <div className="glass rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden bg-white/5">
                  {/* Chat header */}
                  <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/5 backdrop-blur-xl">
                    <div className="w-10 h-10 gradient-bg text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">Agente Visual AI</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                        <span className="text-[11px] text-green-400 font-bold uppercase tracking-wider">Ativo Agora</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-4 space-y-3 min-h-[220px] max-h-[200px] overflow-hidden">
                    <AnimatePresence>
                      {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className={`text-xs leading-relaxed p-3 rounded-2xl max-w-[85%] font-medium ${ 
                            msg.role === 'user' 
                              ? 'bg-white/10 text-white rounded-tr-none ml-auto border border-white/5' 
                              : 'gradient-bg text-white rounded-tl-none shadow-md shadow-indigo-900/20' 
                          }`}
                        >
                          {msg.text}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {visibleMessages < chatMessages.length && visibleMessages > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex gap-1.5 p-3 bg-white/5 rounded-2xl w-fit border border-white/5"
                      >
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
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
