import React, { useState } from 'react';
import { 
  Globe, 
  Key, 
  Layers, 
  Send, 
  Lock, 
  Unlock, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Sliders,
  Copy,
  Check
} from 'lucide-react';
import { INITIAL_KAFKA_TOPICS } from '../services/mockEngine';

export default function ApiGatewaySim() {
  const [activeTab, setActiveTab] = useState('gateway');
  const [requestUrl, setRequestUrl] = useState('/api/v1/orders/checkout');
  const [httpMethod, setHttpMethod] = useState('POST');
  const [tokenValid, setTokenValid] = useState(true);
  const [responseOutput, setResponseOutput] = useState(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Topics state
  const [topics, setTopics] = useState(INITIAL_KAFKA_TOPICS);
  const [publishedMsg, setPublishedMsg] = useState('');

  // Generate Mock JWT
  const mockJwtHeader = '{"alg":"RS256","typ":"JWT","kid":"ms-key-2026"}';
  const mockJwtPayload = '{"sub":"usr_99214","name":"Developer User","role":"admin","iat":1772435400,"exp":1772439000}';
  const mockJwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfOTkyMTQiLCJuYW1lIjoiRGV2ZWxvcGVyIFVzZXIiLCJyb2xlIjoiYWRtaW4ifQ.SigMock_Offline100PercentCompliance';

  const handleTestRequest = () => {
    if (!tokenValid) {
      setResponseOutput({
        status: 401,
        statusText: 'Unauthorized',
        durationMs: 4,
        body: { error: 'invalid_token', message: 'JWT signature verification failed or token expired.' }
      });
      return;
    }

    setResponseOutput({
      status: 200,
      statusText: 'OK',
      durationMs: 16,
      headers: {
        'x-gateway-route': 'order-service-v4',
        'x-ratelimit-remaining': '984/1000',
        'x-trace-id': 'tr-gateway-' + Math.random().toString(36).substring(2, 10)
      },
      body: {
        success: true,
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        status: 'PROCESSING',
        timestamp: new Date().toISOString()
      }
    });
  };

  const handlePublishEvent = (topicName) => {
    setTopics(prev => prev.map(t => {
      if (t.topic === topicName) {
        return { ...t, messagesCount: t.messagesCount + 1 };
      }
      return t;
    }));
    setPublishedMsg(`Event published to topic "${topicName}" successfully at ${new Date().toLocaleTimeString()}`);
    setTimeout(() => setPublishedMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher: API Gateway vs Event Bus */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('gateway')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'gateway'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>API Gateway & Token Bucket</span>
          </button>

          <button
            onClick={() => setActiveTab('eventbus')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'eventbus'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Kafka / RabbitMQ Event Bus</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono hidden sm:block">
          PR #4: Gateway Router & Async Messaging
        </div>
      </div>

      {activeTab === 'gateway' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Request Test Box (2 Cols) */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">API Gateway Route Execution Simulator</h3>
              </div>

              {/* JWT Token Status Toggle */}
              <button
                onClick={() => setTokenValid(!tokenValid)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  tokenValid ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                }`}
              >
                {tokenValid ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span>{tokenValid ? 'JWT Valid' : 'JWT Revoked'}</span>
              </button>
            </div>

            {/* URL bar */}
            <div className="flex items-center space-x-2">
              <select
                value={httpMethod}
                onChange={(e) => setHttpMethod(e.target.value)}
                className="bg-slate-900 text-cyan-400 font-mono font-bold text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>

              <input
                type="text"
                value={requestUrl}
                onChange={(e) => setRequestUrl(e.target.value)}
                className="flex-1 bg-slate-900 text-white font-mono text-xs px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
              />

              <button
                onClick={handleTestRequest}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>

            {/* Mock JWT Inspector */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center space-x-1.5">
                  <Key className="w-4 h-4 text-purple-400" />
                  <span>Stateless Bearer JWT Token</span>
                </span>
                <span className="font-mono text-slate-500 text-[11px]">RS256 Key Exchange</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg font-mono text-[11px] text-purple-300 break-all border border-slate-800">
                {mockJwtToken}
              </div>
            </div>

            {/* Response Output Panel */}
            {responseOutput && (
              <div className="space-y-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                  <span className="flex items-center space-x-2">
                    <span className={`font-bold ${responseOutput.status === 200 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {responseOutput.status} {responseOutput.statusText}
                    </span>
                  </span>
                  <span className="text-slate-400">Response Latency: {responseOutput.durationMs}ms</span>
                </div>

                <pre className="text-xs font-mono text-slate-200 bg-slate-900 p-3 rounded-lg overflow-x-auto border border-slate-800">
                  {JSON.stringify(responseOutput.body, null, 2)}
                </pre>
              </div>
            )}

          </div>

          {/* Rate Limiter Policy Card (1 Col) */}
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-base text-white">Token Bucket Rate Limiter</h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Max Bucket Capacity</div>
                <div className="text-lg font-bold text-indigo-300">1,000 requests</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Refill Rate</div>
                <div className="text-lg font-bold text-indigo-300">100 req / sec</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Current Token Balance</div>
                <div className="text-lg font-bold text-emerald-400">984 tokens</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Feature PR #4: Gateway Router</span>
              <span className="text-emerald-400 font-mono font-semibold">100% Compliant</span>
            </div>
          </div>

        </div>
      ) : (
        /* Event Bus Tab Content */
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-base text-white">Kafka / RabbitMQ Event Messaging Stream</h3>
              <p className="text-xs text-slate-400">Inspect active topics, message counts, partition counts, and consumer lag</p>
            </div>
            {publishedMsg && (
              <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800 animate-pulse">
                {publishedMsg}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => (
              <div key={t.topic} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-sm font-mono text-white">{t.topic}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 mt-2">
                    <span>{t.partitions} Partitions</span>
                    <span>{t.messagesCount.toLocaleString()} Msgs</span>
                    <span className={t.lag > 0 ? "text-amber-400 font-bold" : "text-emerald-400"}>Lag: {t.lag}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePublishEvent(t.topic)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/90 hover:bg-purple-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Publish Msg
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Feature PR #4: Event Bus Broker</span>
            <span className="text-emerald-400 font-mono font-semibold">100% Compliant</span>
          </div>

        </div>
      )}

    </div>
  );
}
