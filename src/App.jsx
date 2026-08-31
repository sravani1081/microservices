import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TopologyCanvas from './components/TopologyCanvas';
import DistributedTracing from './components/DistributedTracing';
import ChaosLab from './components/ChaosLab';
import ApiGatewaySim from './components/ApiGatewaySim';
import SpecGenerator from './components/SpecGenerator';
import PromptBlueprint from './components/PromptBlueprint';
import { INITIAL_SERVICES } from './services/mockEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('topology');
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState(INITIAL_SERVICES[0]);
  const [complianceScore, setComplianceScore] = useState(100);

  // Map tab to active PR branch
  const tabBranchMap = {
    topology: 'feature/1-service-mesh-core',
    tracing: 'feature/2-distributed-tracing-telemetry',
    chaos: 'feature/3-chaos-resilience-lab',
    gateway: 'feature/4-api-gateway-event-bus',
    specs: 'feature/5-devops-specs-compliance',
    blueprint: 'master'
  };

  // Calculate live total RPS across all microservices
  const totalRps = services.reduce((acc, s) => acc + s.rps, 0);

  // Periodic subtle metric ticker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev => prev.map(s => {
        const deltaRps = Math.floor((Math.random() - 0.48) * 12);
        const newRps = Math.max(50, s.rps + deltaRps);
        return { ...s, rps: newRps };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Top Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        totalRps={totalRps}
        complianceScore={complianceScore}
        activeBranch={tabBranchMap[activeTab]}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'topology' && (
          <TopologyCanvas 
            services={services} 
            setServices={setServices} 
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        )}

        {activeTab === 'tracing' && (
          <DistributedTracing services={services} />
        )}

        {activeTab === 'chaos' && (
          <ChaosLab services={services} setServices={setServices} />
        )}

        {activeTab === 'gateway' && (
          <ApiGatewaySim />
        )}

        {activeTab === 'specs' && (
          <SpecGenerator />
        )}

        {activeTab === 'blueprint' && (
          <PromptBlueprint />
        )}
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-mono">MicroSphere Engine Operational</span>
            <span className="text-slate-500">|</span>
            <span>Zero .env File Required</span>
            <span className="text-slate-500">|</span>
            <span>No API Keys Needed</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span className="text-purple-400">5 PR Branches Ready</span>
            <span className="text-emerald-400 font-bold">100% Compliance Score</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
