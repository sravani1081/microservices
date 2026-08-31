import React, { useState } from 'react';
import { 
  Terminal, 
  GitPullRequest, 
  ShieldCheck, 
  Copy, 
  Check, 
  Code2, 
  FileText, 
  GitBranch,
  Layers,
  Sparkles
} from 'lucide-react';

export default function PromptBlueprint() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const promptText = `CREATE ENTERPRISE MICROSERVICES PLATFORM (50,000 LOC ARCHITECTURE COMPLIANT):

REQUIREMENTS & SPECIFICATIONS:
1. Zero .env file dependency & Zero external API key reliance. All data, telemetry, event buses, JWT verification, and service mesh proxies MUST be simulated client-side.
2. Architecture composed of 10 Microservices: API Gateway (8080), Auth & Identity (8081), User Profile (8082), Payment Gateway (8083), Order Lifecycle (8084), Inventory Engine (8085), Notification Dispatcher (8086), Search Catalog (8087), AI Rec Engine (8088), Service Mesh Control Plane (8089).
3. 5 Modular Feature Branches & Pull Requests for GitHub:
   - PR #1: feature/1-service-mesh-core (Interactive Canvas Graph, SVG particle flows, Node state)
   - PR #2: feature/2-distributed-tracing-telemetry (Jaeger/Zipkin trace timeline, W3C TraceContext)
   - PR #3: feature/3-chaos-resilience-lab (Latency fault injection, Circuit breaker FSM, Fallback strategies)
   - PR #4: feature/4-api-gateway-event-bus (Token bucket rate limiter, Kafka event stream, JWT mock validator)
   - PR #5: feature/5-devops-specs-compliance (Kubernetes manifests, Docker Compose, 100% Compliance Auditor)
4. Achieving 100% Compliance Score on 12-Factor App & Zero-Trust security rules.`;

  const prBranches = [
    { name: 'feature/1-service-mesh-core', title: 'PR #1: Service Mesh Architecture & Topology Visualizer', desc: 'Core 10 microservices state engine, interactive node graph visualizer, SVG request flow animations.', status: 'Ready for GitHub PR' },
    { name: 'feature/2-distributed-tracing-telemetry', title: 'PR #2: Distributed Tracing & Telemetry Engine', desc: 'Jaeger/Zipkin waterfall timeline visualizer, span metrics, live log aggregator with correlation IDs.', status: 'Ready for GitHub PR' },
    { name: 'feature/3-chaos-resilience-lab', title: 'PR #3: Chaos Engineering & Resilience Testbed', desc: 'Circuit breaker state machine (Closed, Open, Half-Open), synthetic fault injection, rate limiters.', status: 'Ready for GitHub PR' },
    { name: 'feature/4-api-gateway-event-bus', title: 'PR #4: API Gateway Router & Async Messaging Stream', desc: 'Token bucket rate limiter, JWT mock validator, Kafka/RabbitMQ topics inspector.', status: 'Ready for GitHub PR' },
    { name: 'feature/5-devops-specs-compliance', title: 'PR #5: DevOps Specs Exporter & 100% Compliance Suite', desc: 'Kubernetes YAML generator, Docker Compose generator, 100% Compliance Score auditor card.', status: 'Ready for GitHub PR' }
  ];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Blueprint Header */}
      <div className="glass-panel rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">50,000 Lines Prompt Blueprint & GitHub PR Guide</h2>
            <span className="bg-purple-950 text-purple-300 text-xs px-2.5 py-0.5 rounded-full font-mono border border-purple-800">
              100% Compliant Blueprint
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete prompt specification and GitHub Pull Request workflow setup without requiring .env files or API keys.
          </p>
        </div>

        <button
          onClick={handleCopyPrompt}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all"
        >
          {copiedPrompt ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy 50k Prompt'}</span>
        </button>
      </div>

      {/* 5 Pull Requests Breakdown Card */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
          <GitPullRequest className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-base text-white">5 GitHub Pull Requests Structure</h3>
        </div>

        <div className="space-y-3">
          {prBranches.map((pr, idx) => (
            <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-cyan-300">{pr.name}</span>
                </div>
                <h4 className="font-semibold text-sm text-white mt-1">{pr.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{pr.desc}</p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                {pr.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Text Viewer */}
      <div className="glass-panel rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-base text-white">Prompt Specification</h3>
        <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto border border-slate-800 leading-relaxed whitespace-pre-wrap">
          {promptText}
        </pre>
      </div>

    </div>
  );
}
