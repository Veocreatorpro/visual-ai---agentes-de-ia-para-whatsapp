import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '5511999999999'; // Replace with real number
  const message = encodeURIComponent('Olá! Vim pelo site da Visual AI e gostaria de saber mais sobre os agentes de IA para WhatsApp.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-all group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={26} />
      
      {/* Tooltip */}
      <div className="absolute right-16 bg-white text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale conosco no WhatsApp
      </div>
      
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
    </motion.a>
  );
}
