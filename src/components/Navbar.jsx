import React from 'react';
import { 
  Network, 
  Activity, 
  Flame, 
  Globe, 
  FileCode, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  GitPullRequest
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalRps, complianceScore, activeBranch }) {
  const tabs = [
    { id: 'topology', label: 'Topology Mesh', icon: Network, pr: 'PR #1' },
    { id: 'tracing', label: 'Distributed Tracing', icon: Activity, pr: 'PR #2' },
    { id: 'chaos', label: 'Chaos & Resilience', icon: Flame, pr: 'PR #3' },
    { id: 'gateway', label: 'Gateway & Event Bus', icon: Globe, pr: 'PR #4' },
    { id: 'specs', label: 'DevOps & Compliance', icon: FileCode, pr: 'PR #5' },
    { id: 'blueprint', label: '50k Prompt Blueprint', icon: Terminal, pr: 'Guide' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                  MicroSphere
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  v2.5.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Enterprise Microservices Architecture Platform</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Total Throughput:</span>
              <span className="font-mono text-cyan-400 font-semibold">{totalRps.toLocaleString()} req/s</span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Compliance:</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                {complianceScore}% PASSED
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400">PR Branch:</span>
              <span className="font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                {activeBranch}
              </span>
            </div>
          </div>

          {/* Compliance Status Badge */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">No .env Required</span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/90 to-indigo-600/90 text-white shadow-md shadow-cyan-900/40 border border-cyan-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.pr}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
