import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, RotateCw } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

// Use relative URL so Vite proxy handles it in dev
const API_URL = '';

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
    <section id="contato" className="py-12 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden grid md:grid-cols-2 dark:bg-slate-900 dark:shadow-none dark:border-slate-800"
      >
        {/* Left side — Info */}
        <div className="p-8 md:p-10 bg-gradient-to-b from-slate-50 to-white flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 dark:text-white">Teste na prática</h2>
            <p className="text-slate-500 text-sm leading-relaxed dark:text-slate-400">
              Interaja com nossa IA configurada para uma assistência técnica. Veja como ela conduz a conversa e prepara o fechamento.
            </p>
          </div>

          {/* Security badges */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 dark:bg-slate-900 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider dark:text-white">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Segurança ativa
            </div>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">🛡️ Chaves de API protegidas no servidor</div>
              <div className="flex items-center gap-2.5">🔒 Proteção contra injeção de prompt</div>
              <div className="flex items-center gap-2.5">⚡ Rate limiting (15 req/min)</div>
              <div className="flex items-center gap-2.5">🌐 CORS + Helmet security headers</div>
              <div className="flex items-center gap-2.5">🤖 Azure OpenAI (GPT-4o)</div>
            </div>
          </div>

          {/* Floating robot */}
          <motion.div 
            className="hidden md:flex justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <img src={robotLogo} alt="Visual AI Bot" className="w-20 h-20 opacity-60" />
          </motion.div>
        </div>
        
        {/* Right side — Chat */}
        <div className="flex flex-col h-[500px] bg-white border-l border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md">
                <MessageCircle size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm dark:text-white">Agente Visual AI</h4>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online • Azure GPT-4o</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all dark:text-slate-500"
              title="Reiniciar conversa"
            >
              <RotateCw size={14} />
            </button>
          </div>
          
          <div ref={chatContainerRef} className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 bg-slate-50/50 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] p-2.5 rounded-2xl text-sm shadow-sm whitespace-pre-line ${ msg.role === 'user' ? 'bg-white text-slate-800 rounded-tr-sm border border-slate-200 self-end' : 'bg-blue-50 border border-blue-100 text-blue-900 rounded-tl-sm self-start' } dark:shadow-none dark:text-slate-100 dark:border-slate-700`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl rounded-tl-sm max-w-[85%] self-start shadow-sm flex items-center gap-1 dark:shadow-none">
                <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2 dark:bg-slate-900 dark:border-slate-800">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..." 
              className="flex-1 px-4 py-2 bg-slate-100 border-transparent rounded-full text-sm outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all text-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:bg-slate-800 dark:text-white"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shrink-0"
            >
              <Send size={14} className="ml-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
