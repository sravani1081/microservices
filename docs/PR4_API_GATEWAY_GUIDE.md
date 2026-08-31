# Pull Request #4: API Gateway Router & Async Messaging Stream

## Overview
This PR implements API Gateway HTTP route testing, stateless JWT token validation, token bucket rate limiting, and Kafka event streaming.

## Implemented Features
- API Gateway HTTP verb and route selector simulator.
- RS256 stateless JWT token validator.
- Token bucket rate limiter (1,000 capacity / 100 rps refill).
- Kafka / RabbitMQ topics inspector with consumer lag tracking.
