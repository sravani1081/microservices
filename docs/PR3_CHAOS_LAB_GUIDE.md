# Pull Request #3: Chaos Engineering & Resilience Testbed

## Overview
This PR adds fault injection controls and finite state machine circuit breakers (`CLOSED`, `OPEN`, `HALF_OPEN`).

## Implemented Features
- Artificial network delay (+2000ms) & synthetic 503 error rate sliders.
- Finite state machine circuit breaker trip thresholds and cooldown timers.
- Auto-failover strategy with client-side mock responses.
