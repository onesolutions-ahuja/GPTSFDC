# GPTSFDC

Fresh Salesforce-inspired metadata-driven application platform.

## Planned architecture
- React + TypeScript + Vite frontend
- Node.js + TypeScript API
- PostgreSQL metadata and record storage
- Temporal workflow worker
- Shared metadata contracts

All business objects, fields, UI bindings, permissions, reports, dashboards and flows must be metadata-defined. Business actions execute generic platform primitives or metadata-selected flows. No Salesforce proprietary code or assets are included.

## Status
Repository initialized. Application implementation and end-to-end verification are not yet complete.

## Delivery gates
Before production deployment, verify dependencies, builds, startup, migrations, configuration, authentication, RBAC, tenant isolation, integration tests and real user journeys.
