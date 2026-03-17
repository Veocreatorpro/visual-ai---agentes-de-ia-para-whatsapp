import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight, FileText, CheckCircle, BrainCircuit } from 'lucide-react';

export default function RealScenario() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:bg-slate-900 dark:shadow-none dark:border-slate-800"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white">Do "Oi" ao Orçamento em 2 minutos</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Veja como a Visual AI transforma um contato desestruturado em uma ordem de serviço pronta para sua equipe.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
          {/* Step 1 */}
          <div className="flex-1 bg-slate-50 border border-slate-200 p-6 rounded-3xl w-full relative z-10 dark:bg-slate-800/40 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">1. O Cliente</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700 mb-2 dark:bg-slate-900 dark:shadow-none dark:border-slate-800 dark:text-slate-300">
              "Meu celular caiu na água e não liga mais, quanto custa pra arrumar?"
            </div>
            <p className="text-xs text-slate-500 mt-4 dark:text-slate-400">Mensagem genérica, sem modelo ou detalhes.</p>
          </div>

          <ArrowRight className="hidden md:block text-slate-300 shrink-0" size={32} />
          <div className="md:hidden w-1 h-8 bg-slate-200 rounded-full"></div>

          {/* Step 2 */}
          <div className="flex-1 bg-blue-50 border border-blue-100 p-6 rounded-3xl w-full relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                <BrainCircuit size={20} />
              </div>
              <h3 className="font-bold text-blue-900">2. A IA atua</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-blue-100 text-sm text-slate-700 mb-2 dark:bg-slate-900 dark:shadow-none dark:text-slate-300">
              "Olá! Sinto muito pelo ocorrido. Para eu te passar uma estimativa, qual é a marca e o modelo exato do seu aparelho? (Ex: Samsung S22, iPhone 13)"
            </div>
            <p className="text-xs text-blue-600/70 mt-4">A IA identifica a falta de dados e conduz a triagem.</p>
          </div>

          <ArrowRight className="hidden md:block text-slate-300 shrink-0" size={32} />
          <div className="md:hidden w-1 h-8 bg-slate-200 rounded-full"></div>

          {/* Step 3 */}
          <div className="flex-1 bg-emerald-50 border border-emerald-100 p-6 rounded-3xl w-full relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-emerald-900">3. Sua Equipe</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 text-sm text-slate-700 dark:bg-slate-900 dark:shadow-none dark:text-slate-300">
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2 border-b border-emerald-50 pb-2">
                <CheckCircle size={16} /> Resumo Pronto
              </div>
              <strong>Aparelho:</strong> iPhone 13 Pro<br/>
              <strong>Problema:</strong> Oxidação (Caiu na água)<br/>
              <strong>Status:</strong> Aguardando técnico para banho químico.
            </div>
            <p className="text-xs text-emerald-600/70 mt-4">O técnico recebe tudo mastigado, pronto para agir.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
