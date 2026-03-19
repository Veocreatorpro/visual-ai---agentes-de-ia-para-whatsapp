import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Laptop, Cpu, Headphones } from 'lucide-react';
import phoneRepairImg from '../assets/images/phone-repair.png';
import laptopRepairImg from '../assets/images/laptop-repair.png';
import partsStoreImg from '../assets/images/parts-store.png';
import accessoriesImg from '../assets/images/accessories.png';

export default function TargetAudience() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-slate-950 rounded-[3.5rem] p-10 md:p-20 monster-shadow text-white border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
            Domine o Mercado de <br /><span className="text-indigo-500">Tecnologia</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-medium">
            A Visual AI foi forjada para as necessidades brutas do reparo e venda de eletrônicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Smartphone, title: "Smartphones", desc: "Triagem de telas, baterias e reparos avançados.", img: phoneRepairImg },
            { icon: Laptop, title: "Notebooks", desc: "Orçamentos de hardware, software e microsoldagem.", img: laptopRepairImg },
            { icon: Cpu, title: "Lojas de Componentes", desc: "Consulta rápida de estoque e compatibilidade.", img: partsStoreImg },
            { icon: Headphones, title: "Acessórios Elite", desc: "Venda automática de periféricos de alto valor.", img: accessoriesImg }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8 }}
              className="relative rounded-[2.5rem] overflow-hidden group h-80 border border-white/5 monster-shadow"
            >
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-5 glass border border-white/10">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
