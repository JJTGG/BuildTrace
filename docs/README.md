
# BuildTrace Documentation

This directory contains the product, architecture, design, engineering, delivery, policy and decision specifications for BuildTrace.

BuildTrace is currently in pre-implementation development. These documents describe the approved product direction and proposed implementation. Technical proposals remain subject to Phase 0 validation unless explicitly marked as approved.

## Product

| Document | Purpose | Status |
| --- | --- | --- |
| [Product Requirements Document](product/PRD.md) | Problem, users, goals, functional requirements, V1 scope and exclusions | Product direction approved; requirements subject to validation |
| [Web and Native Experience](product/PLATFORM_EXPERIENCE.md) | Platform responsibilities and cross-platform experience | Proposed |

## Architecture

| Document | Purpose | Status |
| --- | --- | --- |
| [System Architecture](architecture/SYSTEM_ARCHITECTURE.md) | Technology candidates, system topology, application boundaries and hosting requirements | Proposed; validate in Phase 0 |
| [Data Model and API Contract](architecture/DATA_MODEL_API.md) | Domain entities, relationships, API routes and data-integrity requirements | Conceptual; not a frozen schema |

## Design

| Document | Purpose | Status |
| --- | --- | --- |
| [UX Screen Map](design/UX_SCREEN_MAP.md) | Navigation, screen inventory and text-only wireframes | Proposed; validate in Phase 0 |

## Engineering

| Document | Purpose | Status |
| --- | --- | --- |
| [Offline Synchronization](engineering/OFFLINE_SYNC.md) | Local persistence, operation envelope, push/pull, retries and conflicts | Proposed; validate before implementation |
| [Development Pipeline](engineering/DEVELOPMENT_PIPELINE.md) | GitHub workflow, CI/CD, native builds, deployment and release process | Proposed; implement after validation |

## Project planning

| Document | Purpose | Status |
| --- | --- | --- |
| [Phase 0 Validation](PHASE_0_VALIDATION.md) | Product and technical proof checklist | Planned validation work |
| [Delivery Plan](project/DELIVERY_PLAN.md) | 70–90 development-day schedule, V1 phases, exit criteria and testing | Planning range settled; 80-day working target |

## Policies

| Document | Purpose | Status |
| --- | --- | --- |
| [Open Source and Funding Policy](policies/OPEN_SOURCE_FUNDING.md) | Free/open-source commitments, donations, privacy and proposed license | Product direction approved; final license review required |

## Architecture Decision Records

| ADR | Decision | Status |
| --- | --- | --- |
| [ADR 0001 — Hosting Strategy](decisions/0001-hosting-strategy.md) | Render for temporary staging/previews; NEXVARIN as intended production destination after acceptance | Accepted, conditional on production readiness |

## Document authority and change control

- Product direction and funding commitments are approved unless a later decision explicitly supersedes them.
- Proposed technologies, API shapes, schemas and implementation details must be validated before they become implementation requirements.
- The Phase 0 exit criteria determine when the project can proceed to full implementation.
- Material architecture decisions must be recorded in `decisions/` with their context, consequences and revisit conditions.
- When a decision changes, update the affected specification and add or supersede an ADR. Do not leave contradictory copies in the repository.
- Keep these documents aligned with the private BuildTrace planning workspace. GitHub is the version-controlled project specification source for contributors.

## Current next milestone

Complete Phase 0 product and technical validation. Do not treat a proposed dependency, integration or deployment capability as approved merely because it appears in an architecture diagram.
