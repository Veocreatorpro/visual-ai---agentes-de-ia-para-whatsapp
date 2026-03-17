import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Zap } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-8 dark:bg-slate-950 dark:text-slate-500">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-xl font-bold text-white mb-4">
              <motion.img 
                src={robotLogo} 
                alt="Visual AI" 
                className="w-9 h-9 rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              Visual AI
            </div>
            <p className="text-sm leading-relaxed">
              Automação inteligente e autêntica para assistências técnicas. Agentes de IA que transformam o atendimento do seu WhatsApp.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-blue-400 transition-colors">Início</a></li>
              <li><a href="#solucao" className="hover:text-blue-400 transition-colors">Solução</a></li>
              <li><a href="#integracoes" className="hover:text-blue-400 transition-colors">Integrações</a></li>
              <li><a href="#como-funciona" className="hover:text-blue-400 transition-colors">Como funciona</a></li>
              <li><a href="#contato" className="hover:text-blue-400 transition-colors">Demonstração</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Segurança</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-green-400" /> 
                Dados protegidos via Azure
              </div>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-green-400" /> 
                Criptografia end-to-end
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-green-400" /> 
                LGPD Compliance
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs dark:border-slate-800">
          <span>&copy; {new Date().getFullYear()} Visual AI. Todos os direitos reservados.</span>
          <span className="text-slate-500 dark:text-slate-400">Powered by Azure OpenAI • N8N • Airtable</span>
        </div>
      </div>
    </footer>
  );
}
