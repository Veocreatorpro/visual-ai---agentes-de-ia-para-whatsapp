import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import robotLogo from '../assets/images/robot-logo.svg';

export default function Header() {
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="fixed top-4 w-full z-50 flex justify-center px-4">
      <div className={`transition-all duration-300 rounded-full px-5 py-2.5 flex justify-between items-center w-full max-w-5xl${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-200/50 dark:border-slate-700/50' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-transparent shadow-sm'}`}>
        <a href="#" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <motion.img 
            src={robotLogo} 
            alt="Visual AI" 
            className="w-8 h-8"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <span className="text-xl md:text-2xl font-black tracking-tight">Visual AI</span>
        </a>
        
        <nav className="hidden lg:block">
          <ul className="flex gap-5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-slate-600 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors dark:text-slate-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Dark mode toggle — discrete */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-500"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a href="#contato" className="hidden sm:inline-flex px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors dark:bg-slate-950">
            Falar com especialista
          </a>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-6 lg:hidden z-50 dark:border-slate-700"
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
    </header>
  );
}
