import React from 'react';
import { motion } from 'motion/react';
import { GitMerge, Database, Cloud, MessageCircle, ArrowRight, Shield } from 'lucide-react';
import robotLogo from '../assets/images/robot-logo.png';

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
    <section id="integracoes" className="py-12 max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-blue-100">
            <Shield size={14} /> Stack de Integração
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Tecnologia de <span className="text-blue-600">ponta a ponta</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Cada peça se encaixa para criar um atendimento que funciona sozinho. Veja o que compõe a inteligência do seu agente.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-12">
          {['WhatsApp', 'N8N', 'Azure AI', 'Airtable'].map((name, i) => (
            <React.Fragment key={name}>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-orange-500' : i === 2 ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                {name}
              </motion.div>
              {i < 3 && <ArrowRight size={18} className="text-slate-300 hidden md:block" />}
              {i < 3 && <div className="w-0.5 h-4 bg-slate-200 rounded md:hidden"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {integrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-11 h-11 ${item.color} text-white rounded-xl flex items-center justify-center shrink-0 shadow-md`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="pl-15 space-y-2 ml-15">
                {item.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                    {feat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mt-10 bg-slate-900 rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <motion.img
            src={robotLogo}
            alt="Visual AI Agent"
            className="w-16 h-16 mx-auto mb-4 drop-shadow-2xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <h3 className="text-xl font-bold text-white mb-2">Tudo conectado. Tudo automático.</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
            Quando o cliente manda "oi" no WhatsApp, o N8N roteia para a IA do Azure. A IA consulta peças no Airtable e responde com orçamento em segundos.
          </p>
          <a href="#contato" className="inline-flex px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            Quero essa automação
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
