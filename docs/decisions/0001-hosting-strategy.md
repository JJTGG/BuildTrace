
# ADR 0001: BuildTrace Hosting Strategy

- **Status:** Accepted, subject to the production acceptance gate
- **Decision date:** 2026-11-18
- **Scope:** Web application and Hono API hosting
- **Related documents:** [System Architecture](../architecture/SYSTEM_ARCHITECTURE.md), [Development Pipeline](../engineering/DEVELOPMENT_PIPELINE.md), [Delivery Plan](../project/DELIVERY_PLAN.md)

## Context

BuildTrace requires a deployable web application and API. Its intended long-term infrastructure direction is self-managed through NEXVARIN, but NEXVARIN is still under development and has not yet demonstrated all the capabilities BuildTrace requires for production hosting.

BuildTrace needs a temporary staging and preview environment without making that interim provider a permanent architectural dependency.

The application must remain portable so that changing the host does not require rewriting the web application, API, database model or synchronization protocol.

## Decision

Adopt the following hosting direction:

- **Render:** temporary staging and preview deployments only.
- **NEXVARIN:** intended long-term production platform, after it passes the infrastructure acceptance criteria in this ADR.

The application and API should be packaged as portable Node.js/Docker (OCI) services.

Database and object storage should be independently configurable and must not be coupled to the application host.

## Production acceptance criteria

Production traffic and real user data must not move to NEXVARIN until all of the following have been demonstrated end to end:

1. OCI/Docker container deployment and reproducible releases.
2. Reliable PostgreSQL connectivity and secure network access.
3. Durable object storage for user files and exports, with a documented migration path.
4. Secure environment-variable and secret injection, separated by environment.
5. Custom domains and managed TLS.
6. Health checks, process restarts and controlled deployment/rollback behaviour.
7. Application logs, operational metrics and actionable service-health visibility.
8. Automated database backups and a tested restore procedure.
9. An object-storage backup or versioning policy.
10. GitHub-based deployment automation with protected production approval.
11. Sufficient resource limits and operational capacity for the expected initial workload.

A checklist or design document alone is insufficient. The relevant capabilities must work in an end-to-end acceptance test.

## Alternatives considered

### Deploy to NEXVARIN immediately

Rejected for now because the platform is unfinished and its production capabilities have not yet been demonstrated.

### Use Render as the permanent production platform

Rejected as the intended long-term direction because NEXVARIN is the preferred infrastructure destination. Render is retained as a temporary staging/preview environment.

### Make the application depend on a host-specific framework or API

Rejected because it would make migration harder and increase the risk of tying application availability and user data to one deployment vendor.

## Consequences

### Positive

- BuildTrace can validate deployments before NEXVARIN is production-ready.
- The application remains portable between the interim and intended production hosts.
- Database and object-storage decisions remain independently replaceable.
- Production cutover has explicit operational evidence requirements.
- NEXVARIN readiness is treated as an engineering acceptance question, not an assumption.

### Trade-offs

- The team must maintain environment separation and deployment configuration.
- Moving production later requires migration planning and data-integrity testing.
- Render may introduce temporary hosting costs or service limitations.
- NEXVARIN's completion timeline may affect the production launch schedule.

## Migration requirements

Before production cutover:

- Verify the target NEXVARIN environment.
- Confirm database and object-storage migration procedures.
- Take and verify backups.
- Test data migration and application compatibility.
- Test DNS/TLS and deployment rollback.
- Perform smoke tests and synchronization checks.
- Obtain explicit maintainer approval before routing production traffic.
- Preserve a recovery path to the validated previous environment until cutover is accepted.

Do not move production data simply because NEXVARIN becomes technically capable of starting the application.

## Revisit conditions

Revisit this decision if:

- NEXVARIN cannot meet the production acceptance criteria.
- Operational capacity or funding is insufficient.
- A major portability or security issue is discovered.
- A materially better self-managed deployment path becomes available.

Any change must be documented in a superseding ADR rather than silently changing the hosting arrangement.

## Final decision

Render is the interim staging/preview host. NEXVARIN is the intended production destination, conditional on demonstrated production readiness.
