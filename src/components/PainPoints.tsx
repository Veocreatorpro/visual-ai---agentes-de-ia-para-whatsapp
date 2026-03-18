import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Layers } from 'lucide-react';

export default function PainPoints() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 rounded-[3rem] p-10 md:p-16 monster-shadow text-white dark:bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-2xl mb-14 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">O Gargalo Final do <span className="text-indigo-400">WhatsApp</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Sua equipe técnica perde horas com perguntas repetitivas. É hora de automatizar a triagem e focar no que traz lucro.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {[
            { icon: Clock, title: "Demora Fatal", desc: "Leads esfriam enquanto esperam o orçamento." },
            { icon: Users, title: "Caos Operacional", desc: "Técnicos parando o serviço para responder dúvidas." },
            { icon: Layers, title: "Triagem Falha", desc: "Perda de tempo com curiosos e pedidos de garantia." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[2rem] glass"
            >
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <item.icon size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
