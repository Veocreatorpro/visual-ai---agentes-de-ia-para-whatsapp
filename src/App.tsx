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

export default function App() {
  return (
    <div className="min-h-screen font-sans text-slate-900 pb-8">
      <Header />
      <main className="flex flex-col gap-2">
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
