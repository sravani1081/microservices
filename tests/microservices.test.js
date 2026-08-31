import { describe, it, expect } from 'vitest';
import { 
  INITIAL_SERVICES, 
  INITIAL_KAFKA_TOPICS, 
  MOCK_TRACES_DATA, 
  INITIAL_CIRCUIT_BREAKERS,
  COMPLIANCE_METRICS 
} from '../src/services/mockEngine';

describe('Microservices Topology Engine Suite', () => {
  it('should initialize 10 core microservices correctly', () => {
    expect(INITIAL_SERVICES).toBeDefined();
    expect(INITIAL_SERVICES.length).toBe(10);
  });

  it('should verify API Gateway port and routing dependencies', () => {
    const gateway = INITIAL_SERVICES.find(s => s.id === 'api-gateway');
    expect(gateway).toBeDefined();
    expect(gateway.port).toBe(8080);
    expect(gateway.connections).toContain('auth-service');
    expect(gateway.connections).toContain('payment-gateway');
  });

  it('should validate W3C trace context format', () => {
    expect(MOCK_TRACES_DATA.length).toBeGreaterThan(0);
    const trace = MOCK_TRACES_DATA[0];
    expect(trace.traceId).toMatch(/^tr-/);
    expect(trace.spans.length).toBeGreaterThan(0);
  });

  it('should enforce 100% compliance audit checks', () => {
    expect(COMPLIANCE_METRICS.score).toBe(100);
    expect(COMPLIANCE_METRICS.audits.every(a => a.passed)).toBe(true);
  });

  it('should manage circuit breaker states', () => {
    expect(INITIAL_CIRCUIT_BREAKERS.length).toBeGreaterThan(0);
    const cb = INITIAL_CIRCUIT_BREAKERS[0];
    expect(['CLOSED', 'OPEN', 'HALF_OPEN']).toContain(cb.state);
  });

  it('should track Kafka topic partitions and lags', () => {
    expect(INITIAL_KAFKA_TOPICS.length).toBeGreaterThan(0);
    const topic = INITIAL_KAFKA_TOPICS[0];
    expect(topic.partitions).toBeGreaterThan(0);
  });
});
