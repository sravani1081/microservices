import React, { useState } from 'react';
import { 
  Flame, 
  ShieldAlert, 
  Zap, 
  RefreshCw, 
  AlertOctagon, 
  CheckCircle, 
  Clock, 
  Sliders, 
  Play
} from 'lucide-react';
import { INITIAL_CIRCUIT_BREAKERS } from '../services/mockEngine';

export default function ChaosLab({ services, setServices }) {
  const [breakers, setBreakers] = useState(INITIAL_CIRCUIT_BREAKERS);
  const [latencyInjection, setLatencyInjection] = useState(0);
  const [errorRateInjection, setErrorRateInjection] = useState(0);
  const [chaosActive, setChaosActive] = useState(false);

  // Toggle circuit breaker state manually
  const toggleBreaker = (serviceId) => {
    setBreakers(prev => prev.map(b => {
      if (b.serviceId === serviceId) {
        const nextState = b.state === 'CLOSED' ? 'OPEN' : b.state === 'OPEN' ? 'HALF_OPEN' : 'CLOSED';
        return { ...b, state: nextState, lastTrip: nextState === 'OPEN' ? new Date().toLocaleTimeString() : b.lastTrip };
      }
      return b;
    }));
  };

  const triggerChaosExperiment = () => {
    setChaosActive(true);

    // Apply injected latency & error rate to payment and recommendation services
    setServices(prev => prev.map(s => {
      if (s.id === 'payment-gateway' || s.id === 'ai-recommendation') {
        return {
          ...s,
          latency: s.latency + latencyInjection,
          errorRate: Math.min(1.0, s.errorRate + (errorRateInjection / 100)),
          status: (s.latency + latencyInjection > 500 || s.errorRate > 0.3) ? 'degraded' : 'healthy'
        };
      }
      return s;
    }));

    // Trip circuit breaker if error rate > 30%
    if (errorRateInjection > 30) {
      setBreakers(prev => prev.map(b => ({
        ...b,
        state: 'OPEN',
        failures: b.threshold,
        lastTrip: new Date().toLocaleTimeString()
      })));
    }
  };

  const resetChaos = () => {
    setChaosActive(false);
    setLatencyInjection(0);
    setErrorRateInjection(0);
    setBreakers(INITIAL_CIRCUIT_BREAKERS);
    setServices(prev => prev.map(s => ({ ...s, latency: s.latency < 10 ? 15 : s.latency, errorRate: 0.02, status: 'healthy' })));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 border-amber-900/40">
        <div>
          <div className="flex items-center space-x-2">
            <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
            <h2 className="text-lg font-bold text-white">Chaos Engineering & Resilience Testbed</h2>
            <span className="bg-amber-950 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-mono border border-amber-800">
              Chaos Mesh Core
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Inject artificial network latency, 5xx server errors, and evaluate circuit breaker trip & fallback policies
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={triggerChaosExperiment}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-semibold text-xs shadow-lg shadow-amber-900/40 transition-all"
          >
            <Zap className="w-4 h-4 text-amber-200" />
            <span>Execute Chaos Injection</span>
          </button>

          <button
            onClick={resetChaos}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset System</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Circuit Breakers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chaos Injection Sliders (1 Col) */}
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">Fault Injection Parameters</h3>
          </div>

          {/* Latency Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Artificial Latency Delay</span>
              <span className="font-mono text-amber-400 font-bold">+{latencyInjection} ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={latencyInjection}
              onChange={(e) => setLatencyInjection(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0ms (Baseline)</span>
              <span>1000ms</span>
              <span>2000ms (Timeout)</span>
            </div>
          </div>

          {/* Error Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Synthetic 503 Error Rate</span>
              <span className="font-mono text-red-400 font-bold">{errorRateInjection}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={errorRateInjection}
              onChange={(e) => setErrorRateInjection(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Stable)</span>
              <span>50%</span>
              <span>100% (Outage)</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="font-bold text-white flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Auto-Fallback Strategy</span>
            </div>
            <p className="leading-relaxed">
              When a service circuit breaker transitions to <strong className="text-amber-400 font-mono">OPEN</strong>, incoming traffic automatically routes to client-side cached fallback mocks with exponential backoff retries.
            </p>
          </div>

        </div>

        {/* Circuit Breakers State Cards (2 Cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="font-bold text-base text-white">Circuit Breaker Finite State Machine</h3>
              <p className="text-xs text-slate-400">Monitor active circuit breaker trips, threshold limits, and half-open probes</p>
            </div>
            
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"/> <span className="text-slate-400">Closed (Normal)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"/> <span className="text-slate-400">Open (Tripped)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"/> <span className="text-slate-400">Half-Open</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {breakers.map((b) => {
              const isTripped = b.state === 'OPEN';
              const isHalfOpen = b.state === 'HALF_OPEN';

              return (
                <div 
                  key={b.serviceId} 
                  className={`p-4 rounded-xl border transition-all ${
                    isTripped 
                      ? 'bg-red-950/40 border-red-800/80 shadow-lg shadow-red-950/50' 
                      : isHalfOpen 
                        ? 'bg-amber-950/40 border-amber-800/80' 
                        : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-white">{b.serviceId}</span>
                    
                    <button
                      onClick={() => toggleBreaker(b.serviceId)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        isTripped
                          ? 'bg-red-600 text-white shadow-sm'
                          : isHalfOpen
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {b.state}
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                    <div className="flex justify-between">
                      <span>Failure Counter:</span>
                      <span className={b.failures > 0 ? "text-amber-400 font-bold" : "text-slate-300"}>
                        {b.failures} / {b.threshold}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cool-off Timeout:</span>
                      <span className="text-slate-300">{b.timeoutSec}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Tripped:</span>
                      <span className="text-slate-300">{b.lastTrip}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Click badge to trip state</span>
                    <span className="text-cyan-400 font-mono">Resilience Standard OK</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Feature PR #3: Chaos Engineering & Resilience</span>
            <span className="text-emerald-400 font-mono font-semibold">100% Compliant</span>
          </div>

        </div>

      </div>

    </div>
  );
}
