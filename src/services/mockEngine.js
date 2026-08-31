// MicroSphere Enterprise Mock Engine - 100% Offline Simulation
// Zero external API keys, zero .env configuration required

export const INITIAL_SERVICES = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    type: 'gateway',
    port: 8080,
    version: 'v2.4.1',
    status: 'healthy',
    rps: 1240,
    latency: 12,
    errorRate: 0.05,
    cpu: 34,
    mem: 210,
    connections: ['auth-service', 'user-service', 'payment-gateway', 'order-service', 'search-catalog'],
    x: 120,
    y: 250,
    desc: 'Central entrypoint handling TLS termination, JWT validation, rate limiting, and dynamic upstream routing.'
  },
  {
    id: 'auth-service',
    name: 'Auth & Identity Service',
    type: 'security',
    port: 8081,
    version: 'v1.8.0',
    status: 'healthy',
    rps: 420,
    latency: 18,
    errorRate: 0.01,
    cpu: 28,
    mem: 180,
    connections: ['user-service'],
    x: 320,
    y: 120,
    desc: 'OAuth2 / OpenID Connect provider emitting stateless signed JWTs and validating mTLS certificates.'
  },
  {
    id: 'user-service',
    name: 'User Profile Engine',
    type: 'core',
    port: 8082,
    version: 'v3.1.2',
    status: 'healthy',
    rps: 530,
    latency: 22,
    errorRate: 0.02,
    cpu: 42,
    mem: 310,
    connections: ['ai-recommendation'],
    x: 480,
    y: 160,
    desc: 'Manages user accounts, preferences, access permissions, and session metadata.'
  },
  {
    id: 'payment-gateway',
    name: 'Payment Processing Hub',
    type: 'financial',
    port: 8083,
    version: 'v2.0.4',
    status: 'healthy',
    rps: 180,
    latency: 45,
    errorRate: 0.12,
    cpu: 58,
    mem: 420,
    connections: ['notification-service', 'order-service'],
    x: 340,
    y: 400,
    desc: 'PCI-DSS compliant payment processing engine interfacing with banking networks and ledger stores.'
  },
  {
    id: 'order-service',
    name: 'Order Lifecycle Service',
    type: 'core',
    port: 8084,
    version: 'v4.0.1',
    status: 'healthy',
    rps: 310,
    latency: 35,
    errorRate: 0.08,
    cpu: 51,
    mem: 390,
    connections: ['inventory-service', 'payment-gateway', 'notification-service'],
    x: 580,
    y: 350,
    desc: 'Orchestrates order state machine, checkout sagas, transactional rollbacks, and fulfillment dispatch.'
  },
  {
    id: 'inventory-service',
    name: 'Inventory & Stock Engine',
    type: 'core',
    port: 8085,
    version: 'v1.5.9',
    status: 'healthy',
    rps: 290,
    latency: 19,
    errorRate: 0.04,
    cpu: 31,
    mem: 260,
    connections: [],
    x: 780,
    y: 380,
    desc: 'Real-time stock reservation, multi-warehouse tracking, and automated reorder queue triggers.'
  },
  {
    id: 'notification-service',
    name: 'Notification Dispatcher',
    type: 'utility',
    port: 8086,
    version: 'v2.2.0',
    status: 'healthy',
    rps: 640,
    latency: 14,
    errorRate: 0.03,
    cpu: 22,
    mem: 190,
    connections: [],
    x: 620,
    y: 520,
    desc: 'Asynchronous event consumer delivering email, SMS, and mobile push notifications via message queues.'
  },
  {
    id: 'search-catalog',
    name: 'Search & Catalog Index',
    type: 'search',
    port: 8087,
    version: 'v3.5.0',
    status: 'healthy',
    rps: 890,
    latency: 15,
    errorRate: 0.01,
    cpu: 48,
    mem: 680,
    connections: ['ai-recommendation'],
    x: 360,
    y: 260,
    desc: 'Distributed inverted index search service providing sub-15ms vector & keyword query responses.'
  },
  {
    id: 'ai-recommendation',
    name: 'AI Neural Rec Engine',
    type: 'ai',
    port: 8088,
    version: 'v1.0.3-gpu',
    status: 'healthy',
    rps: 210,
    latency: 85,
    errorRate: 0.15,
    cpu: 76,
    mem: 1280,
    connections: [],
    x: 680,
    y: 200,
    desc: 'Real-time machine learning inference service serving personalized recommendations and dynamic pricing.'
  },
  {
    id: 'service-mesh-control',
    name: 'Service Mesh Controller',
    type: 'infrastructure',
    port: 8089,
    version: 'v1.20.2',
    status: 'healthy',
    rps: 2100,
    latency: 4,
    errorRate: 0.001,
    cpu: 19,
    mem: 230,
    connections: ['api-gateway', 'auth-service', 'user-service', 'payment-gateway', 'order-service', 'inventory-service', 'notification-service', 'search-catalog', 'ai-recommendation'],
    x: 480,
    y: 300,
    desc: 'Envoy proxy sidecar control plane managing mutual TLS encryption, telemetry, and traffic routing.'
  }
];

export const INITIAL_KAFKA_TOPICS = [
  { topic: 'user.signup', partitions: 3, retention: '7d', messagesCount: 142850, lag: 0 },
  { topic: 'order.created', partitions: 6, retention: '30d', messagesCount: 892100, lag: 2 },
  { topic: 'payment.processed', partitions: 6, retention: '90d', messagesCount: 891950, lag: 0 },
  { topic: 'inventory.reserved', partitions: 4, retention: '14d', messagesCount: 889410, lag: 5 },
  { topic: 'notification.dispatch', partitions: 8, retention: '3d', messagesCount: 1240900, lag: 12 }
];

export const MOCK_TRACES_DATA = [
  {
    traceId: 'tr-9f81a7b4e21d',
    operation: 'POST /api/v1/orders/checkout',
    startTime: '10:42:15.120',
    totalDurationMs: 142,
    status: 201,
    service: 'api-gateway',
    spans: [
      { id: 'sp-1', service: 'api-gateway', name: 'HTTP POST /orders', durationMs: 142, startMs: 0, status: 201 },
      { id: 'sp-2', service: 'auth-service', name: 'Verify JWT Token', durationMs: 14, startMs: 2, status: 200 },
      { id: 'sp-3', service: 'order-service', name: 'Process Order Saga', durationMs: 110, startMs: 20, status: 201 },
      { id: 'sp-4', service: 'payment-gateway', name: 'Authorize Credit Card', durationMs: 48, startMs: 30, status: 200 },
      { id: 'sp-5', service: 'inventory-service', name: 'Deduct Stock', durationMs: 22, startMs: 82, status: 200 },
      { id: 'sp-6', service: 'notification-service', name: 'Emit Kafka Event', durationMs: 12, startMs: 106, status: 202 }
    ]
  },
  {
    traceId: 'tr-3e42b8c1d900',
    operation: 'GET /api/v1/search/query?q=wireless+headphones',
    startTime: '10:42:14.890',
    totalDurationMs: 48,
    status: 200,
    service: 'api-gateway',
    spans: [
      { id: 'sp-10', service: 'api-gateway', name: 'HTTP GET /search', durationMs: 48, startMs: 0, status: 200 },
      { id: 'sp-11', service: 'search-catalog', name: 'Query Elastic Index', durationMs: 18, startMs: 4, status: 200 },
      { id: 'sp-12', service: 'ai-recommendation', name: 'Enrich Rank Scores', durationMs: 22, startMs: 24, status: 200 }
    ]
  },
  {
    traceId: 'tr-7c11d09e45bf',
    operation: 'POST /api/v1/auth/login',
    startTime: '10:42:13.410',
    totalDurationMs: 34,
    status: 200,
    service: 'api-gateway',
    spans: [
      { id: 'sp-20', service: 'api-gateway', name: 'HTTP POST /auth/login', durationMs: 34, startMs: 0, status: 200 },
      { id: 'sp-21', service: 'auth-service', name: 'Validate Credentials & Issue JWT', durationMs: 20, startMs: 2, status: 200 },
      { id: 'sp-22', service: 'user-service', name: 'Fetch User Metadata', durationMs: 10, startMs: 22, status: 200 }
    ]
  }
];

export const INITIAL_CIRCUIT_BREAKERS = [
  { serviceId: 'payment-gateway', state: 'CLOSED', failures: 0, threshold: 5, timeoutSec: 10, lastTrip: 'Never' },
  { serviceId: 'ai-recommendation', state: 'CLOSED', failures: 1, threshold: 4, timeoutSec: 15, lastTrip: 'Never' },
  { serviceId: 'order-service', state: 'CLOSED', failures: 0, threshold: 5, timeoutSec: 10, lastTrip: 'Never' },
  { serviceId: 'inventory-service', state: 'CLOSED', failures: 0, threshold: 5, timeoutSec: 10, lastTrip: 'Never' }
];

export const COMPLIANCE_METRICS = {
  score: 100,
  level: 'GRADE A+ EXCELLENT',
  audits: [
    { title: 'Zero Hardcoded Secrets / No .env Dependency', passed: true, details: '100% client-side dynamic state engine with mock environment bindings.' },
    { title: '12-Factor App Microservice Isolation', passed: true, details: 'Strict service boundary isolation; state decoupled into isolated mock stores.' },
    { title: 'Mutual TLS (mTLS) Encryption & Zero-Trust', passed: true, details: 'Service mesh proxy automatically enforces TLS 1.3 inter-service channels.' },
    { title: 'Distributed Circuit Breakers & Resilience', passed: true, details: 'Automated fallback policies, exponential backoff, and bulkhead queue limits.' },
    { title: 'Distributed Observability & Trace Correlation', passed: true, details: 'W3C Trace Context headers (traceparent) injected across all mock requests.' },
    { title: 'Container & Kubernetes Ready Specifications', passed: true, details: 'Non-root Docker containers, readiness/liveness probes defined for all services.' }
  ]
};
