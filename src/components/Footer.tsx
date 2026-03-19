import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Zap } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 mt-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-3xl font-black text-white">
              {/* Identical Floating Glowing Robot from Hero */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full"></div>
                <img src={robotLogo} alt="Visual AI" className="w-10 h-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] relative z-10" />
              </motion.div>
              <span className="gradient-text tracking-tighter">Visual AI</span>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-400">
              Automação inteligente para assistências técnicas. <br />
              <span className="text-slate-300 font-medium">O futuro do atendimento é Visual.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Navegação</h3>
            <ul className="space-y-4 text-[14px]">
              <li><a href="#inicio" className="hover:text-indigo-400 transition-all hover:translate-x-1 inline-block">Início</a></li>
              <li><a href="#solucao" className="hover:text-indigo-400 transition-all hover:translate-x-1 inline-block">Solução</a></li>
              <li><a href="#integracoes" className="hover:text-indigo-400 transition-all hover:translate-x-1 inline-block">Integrações</a></li>
              <li><a href="#como-funciona" className="hover:text-indigo-400 transition-all hover:translate-x-1 inline-block">Como funciona</a></li>
              <li><a href="#contato" className="hover:text-indigo-400 transition-all hover:translate-x-1 inline-block">Demonstração</a></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Tecnologia & Segurança</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 glass hover:bg-white/10 transition-colors">
                <Shield size={20} className="text-indigo-400" /> 
                <div className="text-xs">
                  <div className="text-white font-bold mb-0.5">Azure Cloud</div>
                  <div className="text-slate-500">Infraestrutura robusta</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 glass hover:bg-white/10 transition-colors">
                <Lock size={20} className="text-indigo-400" /> 
                <div className="text-xs">
                  <div className="text-white font-bold mb-0.5">GPT-4o</div>
                  <div className="text-slate-500">IA de última geração</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-600"
        >
          <span>&copy; {new Date().getFullYear()} Visual AI • Todos os direitos reservados</span>
          <div className="flex gap-4 items-center">
            {['AZURE', 'N8N', 'AIRTABLE'].map((tech, idx) => (
              <motion.span 
                key={tech}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, delay: idx * 0.5 }}
                className="text-indigo-500 font-black"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
