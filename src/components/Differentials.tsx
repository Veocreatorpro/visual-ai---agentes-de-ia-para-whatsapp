import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, GitMerge, Zap, ShieldCheck } from 'lucide-react';

export default function Differentials() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-2xl text-white border border-slate-800"
      >
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-blue-500/20">
            <BrainCircuit size={14} /> Diferenciais
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Não é um robô de botões.<br/><span className="text-blue-500">É IA de verdade.</span></h2>
          <p className="text-slate-400 text-lg">Esqueça aqueles menus irritantes de "Digite 1 para X, 2 para Y". Nossa IA conversa naturalmente, entende áudios, gírias e o contexto do problema do cliente.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl flex flex-col h-full">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <GitMerge size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fluxo Dinâmico</h3>
            <p className="text-slate-400 text-sm leading-relaxed">A IA não segue um roteiro fixo. Se o cliente mudar de assunto ou fizer duas perguntas ao mesmo tempo, ela adapta a resposta sem quebrar a conversa.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl flex flex-col h-full">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Respostas em Segundos</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Conectada ao seu catálogo de peças e serviços, a IA consulta preços e disponibilidade instantaneamente, entregando orçamentos na hora.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl flex flex-col h-full">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Filtro de Curiosos</h3>
            <p className="text-slate-400 text-sm leading-relaxed">A IA qualifica o lead. Ela só aciona um técnico humano quando o cliente já forneceu o modelo do aparelho, o defeito e demonstrou real intenção de conserto.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
