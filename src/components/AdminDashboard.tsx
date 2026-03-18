import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Settings, BarChart3, Rocket, Save, ChevronRight, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
  ? 'http://localhost:3001'
  : 'https://visualai-whatsapp-api-1.azurewebsites.net';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats');
  const [prompt, setPrompt] = useState('Você é um assistente de vendas da Visual AI. Seja curto e direto.');
  const [stats, setStats] = useState({ clicks: 0, chats: 0 });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isDeploying, setIsDeploying] = useState({ github: false, azure: false });

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'master2026') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Senha incorreta!');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    fetchStats();
  }, [isAuthenticated]);

  const fetchStats = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error('Error fetching stats:', e);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Configurações salvas com sucesso!' });
      }
    } catch (e) {
      setStatus({ type: 'error', message: 'Erro ao salvar configurações.' });
    }
    setTimeout(() => setStatus(null), 3000);
  };

  const handleDeploy = async (target: 'github' | 'azure') => {
    setIsDeploying(prev => ({ ...prev, [target]: true }));
    try {
      const res = await fetch(`${API_URL}/api/admin/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      if (res.ok) {
        setStatus({ type: 'success', message: `Deploy para ${target} disparado!` });
      }
    } catch (e) {
      setStatus({ type: 'error', message: 'Erro ao disparar deploy.' });
    }
    setIsDeploying(prev => ({ ...prev, [target]: false }));
    setTimeout(() => setStatus(null), 3000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-teal-500/10 rounded-full">
              <Lock className="w-10 h-10 text-teal-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Acesso Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Senha Master</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2"
            >
              Entrar no Dashboard <ChevronRight className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-slate-500 hover:text-slate-300 text-sm">Voltar para o site</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-teal-500 font-bold text-xl uppercase tracking-wider">
            Visual AI <span className="bg-teal-500 text-slate-950 text-[10px] px-1.5 py-0.5 rounded ml-1">ADMIN</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <BarChart3 className="w-5 h-5" /> Estatísticas
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Settings className="w-5 h-5" /> Configurações AI
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {activeTab === 'stats' ? 'Visão Geral de Acessos' : 'Gerenciamento do Agente AI'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">V2.0 — Máquina Monstro</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Servidor Azure Online
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
              >
                {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>

          {activeTab === 'stats' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Stat Card 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-teal-500/10 rounded-xl">
                    <BarChart3 className="w-8 h-8 text-teal-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Cliques WhatsApp</span>
                </div>
                <div className="text-5xl font-black mb-2">{stats.clicks}</div>
                <div className="text-green-500 text-sm flex items-center gap-1 font-bold">
                  +12% <span className="text-slate-500 font-normal">esta semana</span>
                </div>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Conversas Iniciadas</span>
                </div>
                <div className="text-5xl font-black mb-2">{stats.chats}</div>
                <div className="text-blue-500 text-sm flex items-center gap-1 font-bold">
                  +15% <span className="text-slate-500 font-normal">taxa de conversão</span>
                </div>
              </motion.div>

              {/* Deployment Area */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl mt-4">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-teal-500" /> Central de Deploy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    disabled={isDeploying.github}
                    onClick={() => handleDeploy('github')}
                    className="p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex flex-col gap-2 items-start disabled:opacity-50"
                  >
                    <div className="text-xs font-bold text-slate-500 uppercase">Frontend</div>
                    <div className="text-lg font-bold flex items-center gap-2">
                      {isDeploying.github ? 'Deploying...' : 'Subir para GitHub Pages'} 
                      {isDeploying.github && <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />}
                    </div>
                  </button>
                  <button 
                    disabled={isDeploying.azure}
                    onClick={() => handleDeploy('azure')}
                    className="p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex flex-col gap-2 items-start disabled:opacity-50"
                  >
                    <div className="text-xs font-bold text-slate-500 uppercase">Backend</div>
                    <div className="text-lg font-bold flex items-center gap-2">
                      {isDeploying.azure ? 'Deploying...' : 'Relançar Servidor Azure'}
                      {isDeploying.azure && <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Instruções do Agente AI</h3>
                  <button 
                    onClick={handleSaveSettings}
                    className="bg-teal-600 hover:bg-teal-500 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
                  >
                    <Save className="w-5 h-5" /> Salvar Alterações
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-widest">Prompt do Sistema (O que ele deve ser)</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={8}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-mono text-sm leading-relaxed"
                    placeholder="Ex: Você é um vendedor especializado..."
                  />
                  <div className="mt-4 p-4 bg-teal-500/5 border border-teal-500/10 rounded-xl">
                    <p className="text-xs text-slate-400 flex items-center gap-2 leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-teal-500 shrink-0" />
                      Dica: Mudanças no prompt entram em vigor imediatamente após salvar. Não é necessário dar deploy no código para testar novas conversas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
