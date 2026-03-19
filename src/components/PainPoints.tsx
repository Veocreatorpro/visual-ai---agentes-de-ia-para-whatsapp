import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Layers } from 'lucide-react';
import Magnetic from './Magnetic';

const items = [
  { icon: Clock, title: "Demora Fatal", desc: "Leads esfriam enquanto esperam o orçamento.", gradient: "from-blue-600 to-indigo-600" },
  { icon: Users, title: "Caos Operacional", desc: "Técnicos parando o serviço para responder dúvidas.", gradient: "from-violet-600 to-purple-600" },
  { icon: Layers, title: "Triagem Falha", desc: "Perda de tempo com curiosos e pedidos de garantia.", gradient: "from-indigo-500 to-blue-700" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function PainPoints() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
        className="bg-slate-900 rounded-[3rem] p-10 md:p-16 monster-shadow dark:bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
          className="max-w-2xl mb-14 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">O Gargalo Final do <span className="text-indigo-400">WhatsApp</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Sua equipe técnica perde horas com perguntas repetitivas. É hora de automatizar a triagem e focar no que traz lucro.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-6 relative z-10"
        >
          {items.map((item, i) => (
            <Magnetic key={i} strength={0.15}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[2rem] p-8 shadow-xl h-full"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon size={22} className="text-white" />
                </div>
                <h3 className={`text-xl font-black mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
