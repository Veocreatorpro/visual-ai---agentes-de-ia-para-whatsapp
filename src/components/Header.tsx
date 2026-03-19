import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import robotLogo from '../assets/images/robot-logo.svg';
import Magnetic from './Magnetic';

export default function Header() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const [lastY, setLastY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);
      if (currentY < 40) { setScrollDir('up'); }
      else if (currentY < lastY) { setScrollDir('up'); }
      else if (currentY > lastY + 5) { setScrollDir('down'); }
      setLastY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#solucao', label: 'Solução' },
    { href: '#integracoes', label: 'Integrações' },
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#contato', label: 'Demonstração' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      animate={{ y: scrollDir === 'down' ? -100 : 0, opacity: scrollDir === 'down' ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`transition-all duration-500 rounded-3xl px-6 py-3 flex justify-between items-center w-full max-w-5xl glass ${isScrolled ? 'monster-shadow bg-white/80 dark:bg-slate-900/60' : 'bg-white/40 dark:bg-slate-900/20 border-transparent'}`}>
        <Magnetic strength={0.2}>
          <a href="#" className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-white group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover:bg-indigo-500/40 transition-all"></div>
              <motion.img 
                src={robotLogo} 
                alt="Visual AI" 
                className="w-9 h-9 relative z-10"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter gradient-text">Visual AI</span>
          </a>
        </Magnetic>
        
        <nav className="hidden lg:block">
          <ul className="flex gap-8 text-[13px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Magnetic strength={0.1}>
                  <a href={link.href} className="text-slate-600 font-bold uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-all dark:text-slate-400 px-2 py-1 block">
                    {link.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.4}>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all rounded-xl hover:bg-white dark:hover:bg-slate-800"
              aria-label="Alternar tema"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5571992355913" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:inline-flex px-6 py-2.5 gradient-bg text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
            >
              Especialista
            </motion.a>
          </Magnetic>
          <button 
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-6 lg:hidden z-50 dark:border-slate-700 dark:bg-slate-900/95"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-slate-700 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base block py-1 dark:text-slate-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
