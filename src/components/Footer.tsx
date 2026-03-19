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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-2xl font-black text-white">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                <img src={robotLogo} alt="" className="w-7 h-7" />
              </div>
              <span className="gradient-text">Visual AI</span>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-400">
              Automação inteligente para assistências técnicas. <br />
              <span className="text-slate-300 font-medium">O futuro do atendimento é Visual.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Tecnologia & Segurança</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 glass">
                <Shield size={20} className="text-indigo-400" /> 
                <div className="text-xs">
                  <div className="text-white font-bold mb-0.5">Azure Cloud</div>
                  <div className="text-slate-500">Infraestrutura robusta</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 glass">
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
            <span className="text-indigo-500/50">AZURE</span>
            <span className="text-indigo-500/50">N8N</span>
            <span className="text-indigo-500/50">AIRTABLE</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
