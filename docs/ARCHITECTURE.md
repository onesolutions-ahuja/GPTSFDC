# GPTSFDC architecture — initial foundation

This is a fresh implementation, not a migration from MetaDrive.

## Package boundaries
- `apps/web`: React UI, metadata-rendered builders and runtime (planned).
- `apps/api`: Node.js generic metadata/record/query/security services (planned).
- `apps/worker`: Temporal-backed durable execution (planned).
- `packages/contracts`: generic metadata contracts and validators (started).

## Invariants
1. No business-specific object names, field mappings or action branches in application code.
2. Every user-initiated business mutation is generic CRUD or a metadata-selected Flow.
3. Tenant scope and server-side RBAC apply to all reads, writes, reports, flows and exports.
4. Metadata publication requires versioning, validation and rollback.
5. UI configuration persists as metadata; editors and published renderers share definitions.
6. Production deployments require dependency, build, startup, migration, config, security and E2E checks.

## Current limitations
Contracts and tests are a foundation only. No API, authentication, database, UI or Temporal runtime has been implemented. Salesforce feature parity is not claimed.
