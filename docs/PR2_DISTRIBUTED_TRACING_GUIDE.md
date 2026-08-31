# Pull Request #2: Jaeger Distributed Tracing & Telemetry Engine

## Overview
This PR implements end-to-end W3C TraceContext correlation and Jaeger/Zipkin waterfall timeline visualization.

## Implemented Features
- Jaeger waterfall timeline visualizer.
- Span breakdown with start & duration metrics across microservices.
- Live log stream aggregator with severity filter (`INFO`, `WARN`, `ERROR`) and correlation ID tracking.
