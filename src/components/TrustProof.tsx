import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Users } from 'lucide-react';
import Magnetic from './Magnetic';

const stats = [
  { icon: Clock, val: "0h", label: "Desperdício em Triagem", desc: "A IA absorve a carga braçal do atendimento.", gradient: "from-blue-600 to-indigo-600" },
  { icon: TrendingUp, val: "3x", label: "Aumento em Conversão", desc: "Velocidade brutal que não deixa o lead esfriar.", gradient: "from-violet-600 to-purple-600" },
  { icon: Users, val: "24/7", label: "Poder de Atendimento", desc: "Sua assistência vendendo enquanto você dorme.", gradient: "from-indigo-500 to-blue-700" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
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

export default function TrustProof() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
        className="gradient-bg rounded-[3.5rem] p-10 md:p-20 monster-shadow text-white border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
          className="relative z-10 text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Performance <span className="text-white/70">Incomparável</span></h2>
          <p className="text-lg text-indigo-100 font-medium">Números convertidos em lucro real para assistências técnicas de elite.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="relative z-10 grid md:grid-cols-3 gap-8"
        >
          {stats.map((item, i) => (
            <Magnetic key={i} strength={0.2}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[2.5rem] p-10 text-center shadow-xl h-full"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                  <item.icon size={32} className="text-white" />
                </div>
                <div className={`text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.val}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">{item.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
