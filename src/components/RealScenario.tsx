import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight, FileText, CheckCircle, BrainCircuit } from 'lucide-react';

export default function RealScenario() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-[3rem] p-10 md:p-20 monster-shadow border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800/50 glass relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 dark:text-white tracking-tight">Do "Oi" ao Orçamento em <span className="gradient-text">Segundos</span></h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Veja como a Visual AI transforma um contato frio em uma ordem de serviço pronta.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 relative z-10">
          {/* Step 1 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex-1 bg-slate-50/50 border border-slate-200 p-8 rounded-[2.5rem] w-full dark:bg-slate-800/40 dark:border-slate-700 glass"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">1. O Lead</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-xl border border-slate-100 text-[15px] font-bold text-slate-700 mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
              "Meu celular caiu na água e não liga mais, quanto custa pra arrumar?"
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Mensagem Genérica • Sem Detalhes</p>
          </motion.div>

          <div className="flex flex-col items-center gap-2 text-indigo-500/30">
            <ArrowRight className="hidden lg:block text-slate-300 shrink-0" size={40} />
            <div className="lg:hidden w-1 h-10 bg-indigo-500/10 rounded-full"></div>
          </div>

          {/* Step 2 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex-1 bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] w-full dark:bg-indigo-900/20 dark:border-indigo-800 glass"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-wider">2. A IA</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl rounded-tr-none shadow-xl border border-indigo-100 text-[15px] font-bold text-slate-700 mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
              "Olá! Sinto muito. Para eu te passar uma estimativa exata, qual é a marca e o modelo exato do seu aparelho?"
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-indigo-500">Triagem Ativa • Extração de Dados</p>
          </motion.div>

          <div className="flex flex-col items-center gap-2 text-indigo-500/30">
            <ArrowRight className="hidden lg:block text-slate-300 shrink-0" size={40} />
            <div className="lg:hidden w-1 h-10 bg-indigo-500/10 rounded-full"></div>
          </div>

          {/* Step 3 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex-1 bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] w-full dark:bg-emerald-900/20 dark:border-emerald-800 glass"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-black text-emerald-900 dark:text-emerald-400 uppercase tracking-wider">3. O Resultado</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 text-[14px] text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
              <div className="flex items-center gap-2 text-emerald-600 font-black mb-3 border-b border-emerald-50 dark:border-emerald-900/50 pb-3 uppercase tracking-tighter">
                <CheckCircle size={18} /> OS Pronta para Lucrar
              </div>
              <div className="space-y-1 font-bold">
                <div>Aparelho: <span className="text-slate-900 dark:text-white">iPhone 13 Pro</span></div>
                <div>Problema: <span className="text-slate-900 dark:text-white">Oxidação Crítica</span></div>
                <div>Status: <span className="text-emerald-500">Lead Quente Filtro OK</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
