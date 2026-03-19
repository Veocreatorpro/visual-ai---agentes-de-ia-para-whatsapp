import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, GitMerge, Zap, ShieldCheck } from 'lucide-react';

const features = [
  { icon: GitMerge, title: "Fluxo Dinâmico", desc: "A IA adapta a conversa em tempo real, sem quebras.", gradient: "from-blue-600 to-indigo-600" },
  { icon: Zap, title: "Velocidade Brutal", desc: "Consultas instantâneas ao seu catálogo de peças.", gradient: "from-amber-500 to-orange-600" },
  { icon: ShieldCheck, title: "Filtro de Elite", desc: "Qualificação automática: só atende leads quentes.", gradient: "from-emerald-500 to-teal-600" },
];

export default function Differentials() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 rounded-[3rem] p-10 md:p-20 monster-shadow border border-white/5 dark:bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
            <BrainCircuit size={14} /> O Diferencial Visual
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-white">Não é um Robô de Botões.<br/><span className="text-indigo-400">É Inteligência Pura.</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">Esqueça menus irritantes. Nossa IA entende áudios, gírias e resolve problemas complexos na hora.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                <item.icon size={26} className="text-white" />
              </div>
              <h3 className={`text-2xl font-black mb-4 tracking-tight bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.title}</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
