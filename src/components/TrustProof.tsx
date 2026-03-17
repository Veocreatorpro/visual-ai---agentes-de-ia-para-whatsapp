import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Users } from 'lucide-react';

export default function TrustProof() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-blue-600 rounded-[2rem] p-8 md:p-12 shadow-2xl text-white border border-blue-500 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Números que mudam o jogo</h2>
          <p className="text-lg text-blue-100">Nossa IA não é apenas um "atendente virtual". É uma ferramenta de conversão e produtividade para a sua assistência.</p>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-white" />
            </div>
            <div className="text-5xl font-black mb-2">0h</div>
            <h3 className="text-lg font-bold text-blue-100 mb-2">Perdidas em Triagem</h3>
            <p className="text-sm text-blue-200">Sua equipe técnica foca 100% no reparo. A IA faz as perguntas chatas.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={32} className="text-white" />
            </div>
            <div className="text-5xl font-black mb-2">3x</div>
            <h3 className="text-lg font-bold text-blue-100 mb-2">Mais Conversão</h3>
            <p className="text-sm text-blue-200">Respostas em segundos evitam que o cliente procure a concorrência.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-white" />
            </div>
            <div className="text-5xl font-black mb-2">24/7</div>
            <h3 className="text-lg font-bold text-blue-100 mb-2">Atendimento Contínuo</h3>
            <p className="text-sm text-blue-200">Sua loja nunca fecha. Orçamentos e agendamentos de madrugada e finais de semana.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
