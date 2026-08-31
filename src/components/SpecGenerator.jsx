import React, { useState } from 'react';
import { 
  FileCode, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  Box, 
  Server, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { COMPLIANCE_METRICS } from '../services/mockEngine';

export default function SpecGenerator() {
  const [activeFormat, setActiveFormat] = useState('k8s');
  const [copied, setCopied] = useState(false);

  const k8sManifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway-deployment
  namespace: production
  labels:
    app: api-gateway
    tier: microservice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
      - name: api-gateway
        image: microsphere/api-gateway:v2.5.0
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway-service
  namespace: production
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
  selector:
    app: api-gateway`;

  const dockerCompose = `version: '3.8'

services:
  api-gateway:
    image: microsphere/api-gateway:v2.5.0
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - NODE_ENV=production
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/healthz"]
      interval: 10s
      timeout: 5s
      retries: 3

  auth-service:
    image: microsphere/auth-service:v1.8.0
    ports:
      - "8081:8081"
    restart: always

  order-service:
    image: microsphere/order-service:v4.0.1
    ports:
      - "8084:8084"
    restart: always`;

  const openApiSpec = `openapi: 3.0.3
info:
  title: MicroSphere Unified Microservice API
  version: 2.5.0
  description: Production microservices REST API spec with 100% compliance.
paths:
  /api/v1/orders/checkout:
    post:
      summary: Execute Order Checkout Saga
      security:
        - BearerAuth: []
      responses:
        '201':
          description: Order created successfully
        '401':
          description: Unauthorized JWT token missing or invalid`;

  const activeContent = activeFormat === 'k8s' ? k8sManifest : activeFormat === 'docker' ? dockerCompose : openApiSpec;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* 100% Compliance Banner Header */}
      <div className="glass-panel-glow rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 border-emerald-500/30">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-600 flex items-center justify-center text-emerald-400 font-extrabold text-xl font-mono shadow-lg shadow-emerald-900/40">
            100%
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-wide">Enterprise Compliance Verification</h2>
              <span className="bg-emerald-950 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-mono border border-emerald-800">
                PASSED
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Zero hardcoded .env variables • Zero external API keys needed • 12-Factor App Verified
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Compliance Grade</div>
          <div className="text-base font-bold font-mono text-emerald-400">{COMPLIANCE_METRICS.level}</div>
        </div>
      </div>

      {/* Compliance Audit Checklist */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="font-bold text-base text-white mb-4">12-Factor Microservice Audit Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPLIANCE_METRICS.audits.map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spec Code Exporter */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          
          <div className="flex items-center space-x-2">
            {['k8s', 'docker', 'openapi'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveFormat(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                  activeFormat === fmt 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {fmt === 'k8s' ? 'Kubernetes Manifest' : fmt === 'docker' ? 'Docker Compose' : 'OpenAPI 3.0'}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Spec Code'}</span>
          </button>

        </div>

        {/* Code Output Viewer */}
        <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800 max-h-[400px]">
          {activeContent}
        </pre>

        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Feature PR #5: DevOps Specs & Compliance</span>
          <span className="text-emerald-400 font-mono font-semibold">100% Verified</span>
        </div>

      </div>

    </div>
  );
}
