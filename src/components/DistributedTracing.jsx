import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  Clock, 
  Terminal, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  ListFilter,
  Copy,
  Check
} from 'lucide-react';
import { MOCK_TRACES_DATA } from '../services/mockEngine';

export default function DistributedTracing({ services }) {
  const [selectedTrace, setSelectedTrace] = useState(MOCK_TRACES_DATA[0]);
  const [logFilter, setLogFilter] = useState('ALL');
  const [copiedTrace, setCopiedTrace] = useState(false);

  // Generate live log streams
  const logs = [
    { timestamp: '10:42:15.120', level: 'INFO', service: 'api-gateway', msg: 'Incoming HTTP POST /api/v1/orders/checkout trace_id=tr-9f81a7b4e21d ip=192.168.1.104' },
    { timestamp: '10:42:15.122', level: 'INFO', service: 'auth-service', msg: 'JWT signature verified for sub=user_88493 scopes=["orders:write"] duration=14ms' },
    { timestamp: '10:42:15.138', level: 'INFO', service: 'order-service', msg: 'Order saga initiated order_id=ord_9901 items_count=2 total_amount=189.50' },
    { timestamp: '10:42:15.148', level: 'INFO', service: 'payment-gateway', msg: 'PCI authorization requested amount=189.50 currency=USD status=APPROVED' },
    { timestamp: '10:42:15.195', level: 'INFO', service: 'inventory-service', msg: 'Stock reserved item_sku="SKU-8820" quantity=2' },
    { timestamp: '10:42:15.226', level: 'WARN', service: 'notification-service', msg: 'Push notification queue delay 12ms above baseline topic="notification.dispatch"' },
    { timestamp: '10:42:15.262', level: 'INFO', service: 'api-gateway', msg: 'HTTP 201 Created sent to client total_duration=142ms spans_count=6' }
  ];

  const filteredLogs = logs.filter(l => logFilter === 'ALL' || l.level === logFilter);

  const handleCopyTrace = () => {
    navigator.clipboard.writeText(selectedTrace.traceId);
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="glass-panel rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Distributed Tracing & Jaeger Telemetry</h2>
            <span className="bg-cyan-950 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full font-mono border border-cyan-800">
              W3C TraceContext
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end request tracing across microservice boundaries with correlation IDs and span breakdown
          </p>
        </div>

        {/* Trace Selector Pills */}
        <div className="flex items-center space-x-2">
          {MOCK_TRACES_DATA.map((trace) => (
            <button
              key={trace.traceId}
              onClick={() => setSelectedTrace(trace)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedTrace.traceId === trace.traceId
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {trace.traceId} ({trace.totalDurationMs}ms)
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracing Waterfall Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Waterfall Timeline (2 Cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold text-cyan-300">{selectedTrace.operation}</span>
                <span className="px-2 py-0.5 text-xs font-mono bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
                  HTTP {selectedTrace.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Start Time: {selectedTrace.startTime} | Root: {selectedTrace.service}</p>
            </div>

            <button
              onClick={handleCopyTrace}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
            >
              {copiedTrace ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{selectedTrace.traceId}</span>
            </button>
          </div>

          {/* Span Timeline Breakdown Bars */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2 border-b border-slate-800/60">
              <span>Service Span Name</span>
              <span>Timeline (0ms — {selectedTrace.totalDurationMs}ms)</span>
            </div>

            {selectedTrace.spans.map((span) => {
              const widthPct = Math.max(8, (span.durationMs / selectedTrace.totalDurationMs) * 100);
              const leftPct = (span.startMs / selectedTrace.totalDurationMs) * 100;

              return (
                <div key={span.id} className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{span.service}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{span.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="text-slate-400">{span.startMs}ms</span>
                      <span className="text-cyan-400 font-semibold">{span.durationMs}ms</span>
                    </div>
                  </div>

                  {/* Horizontal Waterfall Bar */}
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden relative border border-slate-800">
                    <div
                      style={{
                        marginLeft: `${leftPct}%`,
                        width: `${widthPct}%`
                      }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-sm shadow-cyan-500/50"
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Real-Time Log Aggregator Stream (1 Col) */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white">Live Log Stream</h3>
              </div>
              
              {/* Log Level Filter */}
              <div className="flex items-center space-x-1">
                {['ALL', 'INFO', 'WARN'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLogFilter(lvl)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      logFilter === lvl ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Log Stream Output */}
            <div className="space-y-2.5 font-mono text-[11px] max-h-[420px] overflow-y-auto pr-1">
              {filteredLogs.map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 leading-relaxed">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-500">{log.timestamp}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      log.level === 'WARN' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-purple-400 font-semibold">[{log.service}]</span> {log.msg}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Feature PR #2: Distributed Tracing</span>
            <span className="text-emerald-400 font-mono font-semibold">100% Compliant</span>
          </div>

        </div>

      </div>

    </div>
  );
}
