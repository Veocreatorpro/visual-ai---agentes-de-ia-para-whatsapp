import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import solutionImg from '../assets/images/solution.png';

export default function Solution() {
  return (
    <section id="solucao" className="py-20 max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-14 monster-shadow border border-slate-100 flex flex-col justify-center dark:bg-slate-900/40 dark:border-slate-800/50 glass relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 dark:text-white leading-tight">
            Inteligência focada em <br /><span className="gradient-text">Resultados Reais</span>
          </h2>
          <p className="text-slate-500 text-base mb-10 leading-relaxed dark:text-slate-400">
            Treinamos a IA com as regras da sua assistência. Ela atende como o seu melhor vendedor, 24 horas por dia, sem folgas.
          </p>
          
          <ul className="space-y-5">
            {[
              "Identifica o modelo do aparelho e o defeito",
              "Informa disponibilidade de peças",
              "Passa estimativas de orçamento",
              "Filtra curiosos e entrega leads quentes"
            ].map((text, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-[15px] font-bold text-slate-800 dark:text-slate-200"
              >
                <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white shadow-sm">
                  <CheckCircle2 size={14} />
                </div>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="rounded-[3rem] overflow-hidden monster-shadow relative min-h-[400px] border-4 border-white dark:border-slate-800"
        >
          <img src={solutionImg} alt="IA reparando eletrônicos" className="absolute inset-0 w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
