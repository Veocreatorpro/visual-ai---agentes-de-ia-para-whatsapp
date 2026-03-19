import React from 'react';
import { Shield, Lock } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 mt-12 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-3xl font-black text-white">
              <div className="relative">
                <img src={robotLogo} alt="Visual AI" className="w-10 h-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] relative z-10" />
              </div>
              <span className="gradient-text tracking-tighter">Visual AI</span>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-400">
              Automação inteligente para assistências técnicas. <br />
              <span className="text-slate-300 font-medium">O futuro do atendimento é Visual.</span>
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Navegação</h3>
            <ul className="space-y-4 text-[14px]">
              {['Início', 'Solução', 'Integrações', 'Como funciona', 'Demonstração'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Tecnologia & Segurança</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <Shield size={20} className="text-indigo-400" /> 
                <div className="text-xs">
                  <div className="text-white font-bold mb-0.5">Azure Cloud</div>
                  <div className="text-slate-500">Infraestrutura robusta</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <Lock size={20} className="text-indigo-400" /> 
                <div className="text-xs">
                  <div className="text-white font-bold mb-0.5">GPT-4o</div>
                  <div className="text-slate-500">IA de última geração</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-600">
          <span>&copy; {new Date().getFullYear()} Visual AI • Todos os direitos reservados</span>
          <div className="flex gap-4 items-center">
            {['AZURE', 'N8N', 'AIRTABLE'].map((tech) => (
              <span key={tech} className="text-indigo-500 font-black">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
