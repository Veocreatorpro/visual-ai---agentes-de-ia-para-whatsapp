import React from 'react';
import { motion } from 'motion/react';
import { Search, Cpu, TestTube, Rocket } from 'lucide-react';

const steps = [
  { num: '01', icon: Search, title: 'Mapeamento', desc: 'Entendemos seus serviços, peças, preços e como sua equipe atende hoje.', color: 'text-blue-500' },
  { num: '02', icon: Cpu, title: 'Treinamento', desc: 'A IA aprende o catálogo da sua loja, gírias do setor e regras de negócio.', color: 'text-emerald-500' },
  { num: '03', icon: TestTube, title: 'Testes', desc: 'Simulamos dezenas de atendimentos reais e ajustamos as respostas.', color: 'text-purple-500' },
  { num: '04', icon: Rocket, title: 'Lançamento', desc: 'Sua IA assume a triagem no WhatsApp. Você acompanha tudo no CRM.', color: 'text-orange-500' },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1, margin: "-100px" }}
        className="bg-white rounded-[3rem] p-10 md:p-16 monster-shadow border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800/50 glass relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 dark:text-white tracking-tight">Implementação em <span className="gradient-text">Tempo Recorde</span></h2>
          <p className="text-slate-500 text-lg dark:text-slate-400 font-medium tracking-tight">Do mapeamento ao lucro em menos de 7 dias.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                  className={`w-20 h-20 mx-auto rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center dark:bg-slate-800 dark:border-slate-700 shadow-xl group-hover:scale-110 transition-transform relative z-10`}
                >
                  <item.icon size={32} className={item.color} />
                </motion.div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black text-slate-100/50 dark:text-slate-800/30 select-none">
                  {item.num}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 dark:text-white tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed dark:text-slate-400 font-bold">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
