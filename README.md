# MicroSphere - Enterprise Microservices Architecture Platform

> **100% Compliance Score • Zero `.env` File Dependency • Zero External API Keys Needed**

MicroSphere is a production-grade microservices architecture simulator, telemetry mesh visualizer, chaos lab, and DevOps spec generator built to run entirely offline with zero external cloud dependencies or API keys.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🔀 5 GitHub Pull Requests Setup

This repository comes pre-configured with **5 Git feature branches** ready to push to your GitHub repository to create 5 visible PRs:

| PR Branch | Title | Key Features |
| :--- | :--- | :--- |
| `feature/1-service-mesh-core` | **PR #1: Service Mesh Architecture & Topology Visualizer** | 10 Microservices topology, interactive SVG node graph, request particle flows |
| `feature/2-distributed-tracing-telemetry` | **PR #2: Distributed Tracing & Telemetry Engine** | Jaeger/Zipkin waterfall trace timeline, W3C trace context, real-time log aggregator |
| `feature/3-chaos-resilience-lab` | **PR #3: Chaos Engineering & Resilience Testbed** | Circuit Breaker FSM (`CLOSED`/`OPEN`/`HALF_OPEN`), fault latency injection, rate limiters |
| `feature/4-api-gateway-event-bus` | **PR #4: API Gateway Router & Async Messaging Stream** | Token bucket rate limiter, stateless RS256 JWT mock validator, Kafka topic streams |
| `feature/5-devops-specs-compliance` | **PR #5: DevOps Spec Exporter & 100% Compliance Suite** | Kubernetes YAML exporter, Docker Compose spec generator, 100% compliance audit engine |

### How to Push to Your GitHub Repository & Open 5 PRs

1. Set your remote GitHub repository URL:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/microservices.git
   ```

2. Push all branches to GitHub:
   ```bash
   git push -u origin main
   git push -u origin feature/1-service-mesh-core
   git push -u origin feature/2-distributed-tracing-telemetry
   git push -u origin feature/3-chaos-resilience-lab
   git push -u origin feature/4-api-gateway-event-bus
   git push -u origin feature/5-devops-specs-compliance
   ```

3. Open 5 Pull Requests on GitHub against `main` using GitHub CLI or GitHub Web UI:
   ```bash
   gh pr create --head feature/1-service-mesh-core --title "PR #1: Service Mesh Architecture & Topology Visualizer" --body "Initial service mesh topology setup."
   gh pr create --head feature/2-distributed-tracing-telemetry --title "PR #2: Distributed Tracing & Telemetry Engine" --body "Jaeger distributed tracing visualizer."
   gh pr create --head feature/3-chaos-resilience-lab --title "PR #3: Chaos Engineering & Resilience Testbed" --body "Circuit breaker FSM and fault injection."
   gh pr create --head feature/4-api-gateway-event-bus --title "PR #4: API Gateway Router & Async Messaging Stream" --body "Token bucket rate limiter and Kafka topic stream."
   gh pr create --head feature/5-devops-specs-compliance --title "PR #5: DevOps Spec Exporter & 100% Compliance Suite" --body "Kubernetes manifests and 100% compliance auditor."
   ```

---

## 🛡️ 100% Compliance Audit

MicroSphere enforces the **12-Factor Microservice Standard**:
- ✅ **Zero Hardcoded Secrets**: Client-side mock state engine replaces hardcoded credentials.
- ✅ **No `.env` File Required**: Self-contained runtime setup.
- ✅ **Zero-Trust mTLS**: envoy proxy TLS 1.3 inter-service simulation.
- ✅ **Circuit Breaker Resilience**: Automatic trip thresholds & fallback queues.
- ✅ **Distributed Trace Correlation**: W3C `traceparent` headers injected across all spans.
