import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Laptop, Cpu, Headphones } from 'lucide-react';
import phoneRepairImg from '../assets/images/phone-repair.png';
import laptopRepairImg from '../assets/images/laptop-repair.png';
import partsStoreImg from '../assets/images/parts-store.png';
import accessoriesImg from '../assets/images/accessories.png';

export default function TargetAudience() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-2xl text-white border border-slate-800 dark:bg-slate-950 dark:border-slate-800"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Feito para quem vive de <span className="text-blue-500">tecnologia</span></h2>
          <p className="text-lg text-slate-400 dark:text-slate-500">A Visual AI foi desenhada especificamente para as dores do mercado de reparo e venda de eletrônicos.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Smartphone, 
              title: "Assistência de Celulares", 
              desc: "Triagem de telas quebradas, baterias viciadas e banhos químicos.",
              img: phoneRepairImg
            },
            { 
              icon: Laptop, 
              title: "Reparo de Notebooks", 
              desc: "Orçamentos de formatação, troca de HD/SSD e reparo em placa.",
              img: laptopRepairImg
            },
            { 
              icon: Cpu, 
              title: "Lojas de Peças (CI)", 
              desc: "Atendimento a técnicos buscando componentes específicos e telas.",
              img: partsStoreImg
            },
            { 
              icon: Headphones, 
              title: "Acessórios Tech", 
              desc: "Venda de cabos, carregadores, películas e fones de ouvido.",
              img: accessoriesImg
            }
          ].map((item, i) => (
            <div key={i} className="relative rounded-3xl overflow-hidden group h-64 border border-slate-700/50">
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-blue-500/30">
                  <item.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
