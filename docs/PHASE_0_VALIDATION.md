
# Phase 0 — Product and Technical Validation

**Purpose:** prove the assumptions that could cause expensive rework before full implementation begins.

**Status:** Planned; evidence has not yet been recorded.

Phase 0 is the first six development days in the current 70–90 day delivery window. The working estimate is 80 development days. If 80 days proves insufficient, the schedule may extend toward 90; validation, data integrity, security and native-platform support must not be weakened to preserve the shorter estimate.

## 1. Product workflow validation

- [ ] Reconstruct the history of an active project using its README, repository history, issues and personal notes.
- [ ] Reconstruct a paused or abandoned project.
- [ ] Reconstruct an experiment that has no associated repository.
- [ ] Test whether the Project Vault, Timeline, Experiment Log and Resume Brief capture enough context to continue work.
- [ ] Identify unnecessary fields or capture friction.
- [ ] Confirm that BuildTrace remains a project-memory tool, not a general task manager.

**Evidence to retain:** sample project histories, workflow findings, unresolved product questions and any changes required to the V1 scope.

## 2. Workspace and framework compatibility

- [ ] Verify a workspace containing separate web, native and API applications.
- [ ] Verify the selected package manager and supported runtime versions at the time of the spike.
- [ ] Prove shared TypeScript domain rules and contracts can be consumed by all intended applications.
- [ ] Confirm platform-specific dependencies do not break web or native bundling.
- [ ] Verify clean installation, development commands and production builds from a fresh checkout.

**Current candidates:** Next.js/React for web, Expo/React Native for native, Hono for the API and pnpm workspaces. These remain candidates until the spike passes.

**Evidence to retain:** lockfile, exact runtime and dependency versions, tested commands, build results and known limitations.

## 3. Authentication and session handling

- [ ] Test sign-in and sign-out on web.
- [ ] Test sign-in and sign-out on Android.
- [ ] Test sign-in and sign-out on iOS.
- [ ] Verify session restoration after browser/app restart.
- [ ] Verify secure native session storage.
- [ ] Verify the API's cookie or bearer-token behaviour for the selected topology.
- [ ] Test expiry and revocation.
- [ ] Verify ownership checks are enforced by the API rather than trusted from client-supplied identifiers.

**Current candidate:** Better Auth. It is not approved until web and native flows have been demonstrated.

**Evidence to retain:** a small authentication proof of concept, test results for each platform and a decision record.

## 4. Local persistence and offline synchronization spike

- [ ] Persist a text record in browser storage.
- [ ] Persist a text record in native SQLite.
- [ ] Verify records survive browser/app restarts.
- [ ] Queue a mutation while offline.
- [ ] Reconnect and submit the queued operation.
- [ ] Retry the same operation and verify that it does not create a duplicate.
- [ ] Simulate interrupted requests and application restarts.
- [ ] Simulate two clients editing the same mutable record and verify that a conflict is visible.
- [ ] Confirm that local edits are not silently discarded.
- [ ] Verify that a synchronization cursor advances only after local changes are successfully applied.

**Acceptance principle:** synchronization must be loss-aware, idempotent and explicit about conflicts. Do not substitute blind last-write-wins behaviour for the agreed conflict requirements.

**Evidence to retain:** test scenarios, operation/cursor examples, observed failures and a documented decision on any required protocol changes.

## 5. Data layer

- [ ] Connect the API to a PostgreSQL test database.
- [ ] Verify the candidate ORM can generate and apply migrations from a clean database.
- [ ] Verify ownership constraints and transaction behaviour.
- [ ] Verify local SQLite persistence independently from server PostgreSQL.
- [ ] Document connection pooling, migration and environment-separation requirements.

**Current candidates:** PostgreSQL and Drizzle ORM; Neon is a proposed hosted database provider, not a final hosting requirement.

**Evidence to retain:** initial schema spike, migration output and isolation tests.

## 6. Native build and device testing

- [ ] Produce an Android development/test build.
- [ ] Install and exercise the build on a physical Android device.
- [ ] Verify the available iOS simulator or physical-device testing path.
- [ ] Verify native navigation, persistence and authentication are not dependent on a WebView.
- [ ] Confirm the intended cloud build workflow can be triggered reproducibly.
- [ ] Document any store account, signing or device-access blocker.

**Evidence to retain:** build profiles, successful build links, device test notes and release-workflow instructions.

## 7. Deployment and infrastructure

- [ ] Prove the web and API can be packaged as portable Node.js/Docker services.
- [ ] Verify the proposed Render staging path without placing real user data in preview environments.
- [ ] Keep database and object storage configuration independent of the application host.
- [ ] Document environment variables, secret handling, health checks and migration order.
- [ ] Record the NEXVARIN production-host requirements separately; do not assume unfinished NEXVARIN capabilities exist.
- [ ] Define the acceptance tests required before production can move to NEXVARIN.

NEXVARIN is the intended long-term production target. Render is the temporary staging/preview host. Production cutover is gated on demonstrated infrastructure readiness.

**Evidence to retain:** reproducible container build, staging deployment result, environment configuration and an explicit list of any unproven NEXVARIN requirements.

## 8. Licensing and dependency review

- [ ] Review the proposed GNU AGPL-3.0-or-later license.
- [ ] Review direct and transitive dependency licenses.
- [ ] Review native app distribution and bundled asset implications.
- [ ] Review third-party service terms and any optional integrations.
- [ ] Confirm that all core workflows can operate without paid APIs.
- [ ] Prepare license, third-party notices and contribution terms before accepting substantive code contributions.

**Important:** do not add a LICENSE file or present the proposed license as finalized until this review is complete.

## Phase 0 exit gate

Phase 0 is complete only when:

- [ ] The capture-to-resume workflow has been validated against realistic project histories.
- [ ] The separate web/native/API workspace builds successfully.
- [ ] Authentication has been demonstrated on web and native platforms, or the stack has been revised.
- [ ] Local persistence and the basic offline synchronization spike pass the agreed data-integrity tests.
- [ ] Android and iOS build/test paths are understood.
- [ ] Database and migration assumptions have been tested.
- [ ] Hosting and infrastructure requirements are documented without treating NEXVARIN as production-ready prematurely.
- [ ] Licensing and dependency risks have been reviewed.
- [ ] All material blockers have an explicit resolution or a revised plan.

If a critical assumption fails, revise the architecture or schedule before proceeding. Do not hide a blocker by weakening the acceptance criteria.

## Phase 0 is not

Phase 0 is not the full implementation of the sync engine, the complete authentication system, the entire database schema, the finished native apps or a production launch. It is the evidence-gathering stage that determines which implementation choices are safe to commit to.
