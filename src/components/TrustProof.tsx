import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Users } from 'lucide-react';

export default function TrustProof() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="gradient-bg rounded-[3.5rem] p-10 md:p-20 monster-shadow text-white border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Performance <span className="text-white/70">Incomparável</span></h2>
          <p className="text-lg text-indigo-100 font-medium">Números convertidos em lucro real para assistências técnicas de elite.</p>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          {[
            { icon: Clock, val: "0h", label: "Desperdício em Triagem", desc: "A IA absorve a carga braçal do atendimento." },
            { icon: TrendingUp, val: "3x", label: "Aumento em Conversão", desc: "Velocidade brutal que não deixa o lead esfriar." },
            { icon: Users, val: "24/7", label: "Poder de Atendimento", desc: "Sua assistência vendendo enquanto você dorme." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] text-center glass"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg">
                <item.icon size={32} className="text-white" />
              </div>
              <div className="text-6xl font-black mb-4 tracking-tighter">{item.val}</div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{item.label}</h3>
              <p className="text-sm text-indigo-100 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
