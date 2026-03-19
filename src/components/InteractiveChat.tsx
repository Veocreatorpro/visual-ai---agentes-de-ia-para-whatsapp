import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, RotateCw } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

// Foolproof URL logic: if not localhost, we use the Azure Backend
const API_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
  ? 'http://localhost:3001'
  : 'https://visualai-whatsapp-api-1.azurewebsites.net';

export default function InteractiveChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([
    { role: 'agent', text: 'Olá! Sou o agente virtual da Visual AI. 🤖\n\nSimule um cliente: "Quanto custa trocar a tela do iPhone 13?"' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro ${response.status}`);
      }

      const data = await response.json();
      sessionIdRef.current = data.sessionId;
      setMessages(prev => [...prev, { role: 'agent', text: data.text }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'agent', 
        text: error.message || 'Erro de conexão. Tente novamente.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      if (sessionIdRef.current) {
        await fetch(`${API_URL}/api/chat/reset`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        });
      }
    } catch {}
    sessionIdRef.current = null;
    setMessages([
      { role: 'agent', text: 'Olá! Sou o agente virtual da Visual AI. 🤖\n\nSimule um cliente: "Quanto custa trocar a tela do iPhone 13?"' }
    ]);
  };

  return (
    <section id="contato" className="py-20 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-[2.5rem] monster-shadow border border-slate-100 overflow-hidden grid md:grid-cols-2 dark:bg-slate-900/40 dark:border-slate-800/50 glass"
      >
        {/* Left side — Info */}
        <div className="p-10 md:p-12 bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/10 dark:to-slate-900 flex flex-col justify-center gap-8 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white leading-tight">
              Experimente a <br /><span className="gradient-text">Potência da IA</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed dark:text-slate-400">
              Interaja com nosso agente configurado para assistências técnicas. Veja como ele tria problemas e prepara orçamentos automaticamente.
            </p>
          </div>

          {/* Security badges */}
          <div className="glass bg-white/50 border border-indigo-100/50 rounded-2xl p-6 space-y-4 dark:bg-slate-800/20 dark:border-indigo-900/20 relative z-10">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest dark:text-indigo-400">
              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]"></span>
              Infraestrutura Enterprise
            </div>
            <div className="space-y-3 text-[13px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-[10px]">🛡️</div>
                <span>Chaves de API isoladas no servidor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-[10px]">🔒</div>
                <span>Proteção avançada de Prompt</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-[10px]">⚡</div>
                <span>Processamento em tempo real</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-[10px]">🤖</div>
                <span>Powered by Azure OpenAI GPT-4o</span>
              </div>
            </div>
          </div>

          {/* Floating robot */}
          <motion.div 
            className="hidden md:flex justify-center pt-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
              <img src={robotLogo} alt="Visual AI Bot" className="w-24 h-24 opacity-80 relative z-10" />
            </div>
          </motion.div>
        </div>
        
        {/* Right side — Chat */}
        <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900/60 relative overflow-hidden">
          {/* Chat Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 gradient-bg text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none transform -rotate-2">
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm dark:text-white tracking-tight">Agente Visual AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-green-600 dark:text-green-400 font-bold uppercase tracking-widest">Disponível Agora</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
              title="Reiniciar Simulação"
            >
              <RotateCw size={16} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div ref={chatContainerRef} className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-slate-50/30 dark:bg-slate-950/20 scroll-smooth">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`max-w-[85%] p-4 rounded-[1.5rem] text-[14px] leading-relaxed shadow-sm whitespace-pre-line ${ 
                  msg.role === 'user' 
                    ? 'bg-white text-slate-800 rounded-tr-none border border-slate-200 self-end dark:bg-slate-800 dark:text-white dark:border-slate-700' 
                    : 'gradient-bg text-white rounded-tl-none self-start shadow-indigo-200 dark:shadow-none' 
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="bg-indigo-50 border border-indigo-100 p-4 rounded-3xl rounded-tl-none max-w-[85%] self-start shadow-sm flex items-center gap-1.5 dark:bg-indigo-900/30 dark:border-indigo-800"
              >
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mr-2">Agente pensando</div>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-5 bg-white border-t border-slate-100 flex gap-3 dark:bg-slate-900 dark:border-slate-800 sticky bottom-0">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte sobre um conserto..." 
                className="w-full pl-5 pr-12 py-3.5 bg-slate-100 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 transition-all font-medium"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1.5 w-10 h-10 gradient-bg text-white rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all shadow-md active:scale-95"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
