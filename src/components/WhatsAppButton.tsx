import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/5571992355913?text=Ol%C3%A1%20%F0%9F%A4%96%20Quero%20entender%20como%20um%20agente%20de%20IA%20no%20WhatsApp%20pode%20ajudar%20no%20atendimento%20da%20minha%20empresa.%20Tenho%20interesse%20em%20uma%20solu%C3%A7%C3%A3o%20personalizada%20e%20gostaria%20de%20iniciar%20uma%20an%C3%A1lise%20da%20minha%20necessidade.%20%F0%9F%9A%80";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold text-sm rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all hover:scale-105 group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <MessageCircle size={20} />
      </motion.span>
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </motion.a>
  );
}
