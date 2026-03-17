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
    <section id="como-funciona" className="py-12 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:bg-slate-900 dark:shadow-none dark:border-slate-800"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 dark:text-white">Implementação em 4 passos</h2>
          <p className="text-slate-500 text-sm dark:text-slate-400">Do primeiro contato ao agente ativo em menos de 7 dias.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center dark:bg-slate-800/40 dark:border-slate-800${item.color}group-hover:shadow-md transition-shadow`}
              >
                <item.icon size={24} />
              </motion.div>
              <div className="text-3xl font-black text-slate-200 mb-1">{item.num}</div>
              <h3 className="text-base font-bold text-slate-900 mb-1 dark:text-white">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed dark:text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
