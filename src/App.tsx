import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Solution from './components/Solution';
import TargetAudience from './components/TargetAudience';
import Differentials from './components/Differentials';
import Integrations from './components/Integrations';
import RealScenario from './components/RealScenario';
import HowItWorks from './components/HowItWorks';
import TrustProof from './components/TrustProof';
import InteractiveChat from './components/InteractiveChat';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdmin, setIsAdmin] = React.useState(window.location.hash === '#admin-master');

  React.useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin-master');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-[#fafafa] dark:bg-slate-950 dark:text-white transition-colors duration-500">
      <Header />
      <main className="flex flex-col gap-0">
        <Hero />
        <PainPoints />
        <Solution />
        <TargetAudience />
        <Differentials />
        <Integrations />
        <RealScenario />
        <HowItWorks />
        <TrustProof />
        <InteractiveChat />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

