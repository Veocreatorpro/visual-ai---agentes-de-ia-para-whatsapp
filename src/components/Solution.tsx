import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import solutionImg from '../assets/images/solution.png';

export default function Solution() {
  return (
    <section id="solucao" className="py-8 max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col justify-center dark:bg-slate-900 dark:shadow-none dark:border-slate-800"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 dark:text-white">Inteligência focada em assistência técnica</h2>
          <p className="text-slate-600 text-sm mb-8 dark:text-slate-400">Treinamos a IA com o catálogo de serviços, peças e regras de negócio da sua loja. Ela atende como o seu melhor vendedor.</p>
          
          <ul className="space-y-4">
            {[
              "Identifica o modelo do aparelho e o defeito",
              "Informa disponibilidade de peças",
              "Passa estimativas de orçamento",
              "Filtra curiosos e entrega leads quentes"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-800 dark:text-slate-100">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" /> {text}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="rounded-[2rem] overflow-hidden shadow-xl relative min-h-[300px] dark:shadow-none"
        >
          <img src={solutionImg} alt="IA reparando eletrônicos" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/20"></div>
        </motion.div>
      </div>
    </section>
  );
}
