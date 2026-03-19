import React from 'react';
import { motion } from 'motion/react';
import { GitMerge, Database, Cloud, MessageCircle, ArrowRight, Shield } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.svg';

const integrations = [
  {
    icon: MessageCircle,
    name: 'WhatsApp Business',
    color: 'bg-green-500',
    textColor: 'text-green-400',
    desc: 'Conexão direta com a API oficial do WhatsApp. Seu agente responde automaticamente 24/7 com linguagem natural.',
    features: ['Respostas em < 3 segundos', 'Áudios e imagens aceitos', 'Multi-atendimento simultâneo'],
  },
  {
    icon: GitMerge,
    name: 'N8N (Automação)',
    color: 'bg-orange-500',
    textColor: 'text-orange-400',
    desc: 'Motor de automação que conecta WhatsApp, IA e CRM. Fluxos inteligentes que decidem em tempo real.',
    features: ['Fluxos visuais drag & drop', 'Webhooks em tempo real', '+ 400 integrações nativas'],
  },
  {
    icon: Database,
    name: 'Airtable (CRM)',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-400',
    desc: 'CRM visual onde você acompanha cada lead, sessão de conversa e status de orçamento. Tudo organizado.',
    features: ['Catálogo de peças e preços', 'Histórico de conversas', 'Pipeline de vendas visual'],
  },
  {
    icon: Cloud,
    name: 'Azure OpenAI',
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    desc: 'IA de nível empresarial da Microsoft Azure. GPT-4o processa linguagem natural com segurança corporativa.',
    features: ['GPT-4o (última geração)', 'Dados criptografados', 'SLA 99.9% Microsoft'],
  },
];

export default function Integrations() {
  return (
    <section id="integracoes" className="py-20 max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/50 text-indigo-600 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6 border border-indigo-100/50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30"
          >
            <Shield size={14} className="text-indigo-500" /> Stack Tecnológica de Elite
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight dark:text-white">
            Infraestrutura de <br /><span className="gradient-text">Ponta a Ponta</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed dark:text-slate-400">
            Cada peça se encaixa para criar um atendimento autônomo e de alta conversão.
          </p>
        </div>

        {/* Icons Flow */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20 px-4">
          {[
            { name: 'WhatsApp', color: 'bg-green-500', shadow: 'shadow-green-200' },
            { name: 'N8N Workflow', color: 'bg-orange-500', shadow: 'shadow-orange-200' },
            { name: 'Azure OpenAI', color: 'bg-indigo-600', shadow: 'shadow-indigo-200' },
            { name: 'Airtable CRM', color: 'bg-yellow-500', shadow: 'shadow-yellow-200' },
          ].map((item, i) => (
            <React.Fragment key={item.name}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800 rounded-2xl px-6 py-4 monster-shadow glass flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-white`}
              >
                <div className={`w-3 h-3 rounded-full ${item.color} ${item.shadow} dark:shadow-none animate-pulse`}></div>
                <span>{item.name}</span>
              </motion.div>
              {i < 3 && <ArrowRight size={20} className="text-slate-300 dark:text-slate-700 hidden lg:block" />}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {integrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-10 monster-shadow dark:bg-slate-900/40 dark:border-slate-800/50 glass hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg transform group-hover:rotate-6 transition-all`}>
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 dark:text-white tracking-tight">{item.name}</h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3">
                {item.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-[13px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                    {feat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 bg-slate-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden monster-shadow"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] glass p-4 flex items-center justify-center shadow-2xl">
              <img src={robotLogo} alt="" className="w-12 h-12" />
            </div>
          </motion.div>
          
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Tudo conectado. <br /><span className="text-indigo-400">Tudo automático.</span></h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Elimine gargalos e transforme curiosos em orçamentos fechados com a potência da Inteligência Artificial.
          </p>
          
        </motion.div>

      </motion.div>
    </section>
  );
}
