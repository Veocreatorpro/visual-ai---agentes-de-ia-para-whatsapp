import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Layers } from 'lucide-react';

export default function PainPoints() {
  return (
    <section className="py-8 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl text-white"
      >
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">O gargalo do WhatsApp</h2>
          <p className="text-slate-400 text-sm">Sua equipe técnica perde horas respondendo perguntas repetitivas em vez de focar no que importa: consertar aparelhos e fechar vendas.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Clock, title: "Demora na resposta", desc: "Leads esfriam enquanto esperam o orçamento." },
            { icon: Users, title: "Equipe sobrecarregada", desc: "Técnicos parando o serviço para responder mensagens." },
            { icon: Layers, title: "Triagem confusa", desc: "Mistura de quem quer comprar, orçar ou pedir garantia." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl">
              <item.icon size={24} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
