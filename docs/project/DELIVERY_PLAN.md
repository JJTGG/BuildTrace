
# Delivery, Validation and Testing Plan

> **Status:** Settled planning roadmap; implementation has not started.
> **Target:** 80 development days at 12 hours per day (approximately 960 working hours).
> **Planning range:** 70–90 development days (840–1,080 working hours).
> **Scope:** Free/open-source V1 with first-class web, Android and iOS applications.

## 1. Delivery commitment and assumptions

The agreed planning target is **80 development days**. The 70–90 day range allows for technical uncertainty, native-device testing, synchronization defects and release preparation. The 80-day target is a plan, not a guarantee.

If 80 days proves insufficient, the schedule may extend toward 90 days. Work must not be rushed or quality requirements weakened to force the shorter milestone.

A development day represents up to 12 hours of focused project work. The estimate assumes a consistent individual build effort, access to the necessary development environments and test devices, and no major external account or vendor delays.

App-store review, account verification and external approvals are not guaranteed inside the development estimate.

The roadmap is deliberately not compressed. Offline synchronization, data integrity, security and three supported application modes are foundational requirements, not optional polish.

## 2. V1 outcome

At the end of V1, a user should be able to:

1. Create and maintain a project from web, Android or iOS, including projects with no repository.
2. Record dated decisions, milestones, blockers, lessons and structured experiments.
3. Link one or more repositories and relevant external evidence.
4. Pause, archive and restore projects without losing historical context.
5. Capture supported text records while offline and synchronize them safely after reconnecting.
6. Open a deterministic, evidence-linked Resume Brief that shows the last-known state and how current that information is.
7. Export project information in documented portable formats.
8. Use the product without a paid subscription, advertising or a mandatory paid AI service.

## 3. Settled development schedule

| Phase | Development days | Duration | Main outcome |
| --- | ---: | ---: | --- |
| 0. Product and technical validation | 1–6 | 6 days | Core workflow and critical platform assumptions proven |
| 1. Repository and engineering foundation | 7–11 | 5 days | Monorepo, app shells, shared packages and CI foundation |
| 2. Backend, authentication and data layer | 12–20 | 9 days | Secure API and canonical project data model |
| 3. Web application | 21–29 | 9 days | Usable Next.js web workspace |
| 4. Native Android and iOS applications | 30–39 | 10 days | Native mobile clients with core workflows |
| 5. Offline storage and synchronization | 40–51 | 12 days | Durable offline capture and reliable cross-client sync |
| 6. Project memory and lifecycle | 52–59 | 8 days | Experiments, timeline depth, snapshots and archive/restore |
| 7. Resume Brief and export | 60–65 | 6 days | Deterministic continuity reports and portable exports |
| 8. GitHub integration | 66–70 | 5 days | Narrow read-only repository connection |
| 9. Hardening and release preparation | 71–80 | 10 days | Security, testing, deployment and release candidate |
| **Total** | **1–80** | **80 days** | **V1 release candidate** |

At the agreed workload, the target is approximately 960 working hours. The 70–90 day range remains the contingency envelope; work should not be rushed to force the day-80 milestone.

## 4. Phase deliverables and exit criteria

### Phase 0 — Product and technical validation (6 days)

**Work:**

- Reconstruct sample histories for an active project, a paused/abandoned project and a repo-less experiment.
- Test the proposed capture-to-resume workflow against the existing README, Git history, issues and notes.
- Review the text-only screen map and test whether the proposed web and native navigation supports the core workflows without introducing task-management or social scope.
- Review the offline synchronization specification against concrete interruption, duplicate-submission and concurrent-edit scenarios; settle any blocking ambiguity before coding the sync engine.
- Verify that a dedicated Next.js web application and an Expo/React Native native application can coexist in the planned workspace.
- Prove Android and iOS native builds, including a physical Android test and an iOS simulator/device path where available.
- Verify the GitHub Actions plus Expo Build workflow with one end-to-end cloud build trigger; choose only one native build trigger path to avoid duplicate builds.
- Test Better Auth session handling on web and native before treating it as a chosen dependency.
- Test PostgreSQL/Drizzle schema access and local SQLite/IndexedDB persistence.
- Prototype one offline text record moving from a native client to the API and another client, including duplicate submission and conflict behaviour.
- Check license compatibility, especially the proposed AGPL-3.0-or-later license and native/web distribution dependencies.
- Verify the portable container build and the temporary Render staging path.
- Record the NEXVARIN production acceptance requirements without assuming unfinished capabilities exist.

**Exit criteria:** the main workflow still demonstrates value; the screen map is accepted for V1 implementation; the sync rules have no unresolved data-loss ambiguity; the chosen app separation is feasible; native cloud builds work; the GitHub/Expo trigger path is demonstrated; authentication and local persistence are demonstrated; no critical license or synchronization blocker is ignored.

If a critical assumption fails, revise the stack or schedule before full implementation.

### Phase 1 — Repository and engineering foundation (5 days)

**Work:**

- Create a pnpm workspace with separate `apps/web`, `apps/mobile` and `apps/api` applications.
- Create shared packages for domain rules, contracts, API client, synchronization helpers and design tokens.
- Configure TypeScript, linting, formatting, environment handling and test commands.
- Establish CI checks for type safety, unit tests and web/native build validation.
- Create the initial responsive web shell and native application shell.
- Add development setup instructions and a minimal architecture decision log.

**Exit criteria:** a clean checkout can install dependencies, run the web app, launch native development builds, run the API and pass the baseline CI checks.

### Phase 2 — Backend, authentication and data layer (9 days)

**Work:**

- Implement the Hono API foundation and selected authentication/session approach.
- Create PostgreSQL schema and Drizzle migrations for users, projects, repositories, records, experiments, snapshots and sync metadata.
- Implement ownership and authorization checks on every user-owned resource.
- Add validated create/read/update/archive operations for project and record primitives.
- Add stable IDs, timestamps, version fields and server-side validation.
- Define the API error contract and request/correlation IDs.
- Establish secure secret handling and separate object-storage abstraction if needed by the selected hosting design.

**Exit criteria:** authenticated users can create and retrieve their own project data; cross-account access tests fail safely; schema migrations work from a fresh database; shared contracts validate API payloads.

### Phase 3 — Web application (9 days)

**Work:**

- Build the Next.js + React + TypeScript web application.
- Implement sign-in, account/session handling and the Project Vault.
- Implement project creation, editing, status, repository URL association and project detail views.
- Implement the first timeline experience for milestones, decisions, blockers and lessons.
- Build record capture and basic experiment entry flows.
- Add responsive layouts for desktop and mobile browsers, keyboard accessibility and visible loading/error states.
- Add IndexedDB/Dexie foundations for browser-local drafts and cached records.

**Exit criteria:** a user can complete the basic project creation and record-capture workflow in the browser; core pages are responsive; data is persisted by the API; browser-local drafts survive a reload where supported.

### Phase 4 — Native Android and iOS applications (10 days)

**Work:**

- Build the Expo + React Native + TypeScript application with Expo Router.
- Implement native authentication/session restoration using the validated auth approach.
- Use `expo-sqlite` for persistent local records and cached project context.
- Use `expo-secure-store` for sensitive local session material where appropriate.
- Implement native Project Vault, project detail, timeline and text-record capture screens.
- Add deep-link handling and native navigation, keyboard, accessibility and touch behaviour.
- Add file selection/sharing foundations only where the V1 workflow requires them.
- Produce Android and iOS development/release builds and test real platform behaviour.

**Exit criteria:** Android and iOS installable native builds open and authenticate; core project browsing and capture work without WebView embedding; local records survive app restarts; native navigation and accessibility are usable.

### Phase 5 — Offline storage and synchronization (12 days)

**Work:**

- Finalize the shared sync contract and durable outbox format.
- Queue local web changes in IndexedDB and native changes in SQLite.
- Implement idempotent push operations so retries do not create duplicate records.
- Implement pull cursors, server acknowledgement and safe retry.
- Add version checks and conflict detection for mutable project/snapshot data.
- Preserve local edits when a conflict occurs; provide a clear resolution workflow.
- Show offline, locally saved, pending, synchronized and failed states accurately.
- Test reconnect behaviour, interrupted requests, duplicate submissions, expired cursors and application restarts.

**Exit criteria:** a supported text record created offline on Android or iOS synchronizes to web after reconnection; web-created changes appear on mobile; retried operations do not duplicate; conflicting edits are visible and neither side is silently discarded.

This phase is intentionally substantial. Synchronization reliability is a release requirement, not a feature to approximate.

### Phase 6 — Project memory and lifecycle (8 days)

**Work:**

- Complete structured experiments with question, hypothesis, approach, result, evidence and conclusion.
- Support standalone experiments and project-associated experiments.
- Add dated project snapshots with last-known state, known limitations, blockers and next action.
- Implement archive, restore and lifecycle transitions without deleting historical records.
- Add multiple repository associations per project.
- Add basic global search and filters using PostgreSQL capabilities.
- Support URL/commit/document evidence references; defer rich binary attachments unless a validated V1 need requires them.

**Exit criteria:** users can preserve the full basic lifecycle of an experiment and project; archive/restore does not erase or rewrite historical records; search remains owner-scoped; a project can exist with zero repositories or multiple repositories.

### Phase 7 — Resume Brief and export (6 days)

**Work:**

- Generate a deterministic Resume Brief from project data, snapshots and dated events.
- Include purpose, last-known state/date, decisions, milestones, experiments, blockers, open questions and candidate next checks.
- Link material statements to their source records.
- Distinguish stored facts from suggested next actions.
- Display stale/last-updated information so an old brief is not mistaken for current state.
- Add portable project export in documented JSON and Markdown forms, preserving stable IDs and relationships.
- Add account-level export and verify record completeness.

**Exit criteria:** a developer can understand a sample project from its brief and follow evidence links; the export contains the expected records and relationships; no AI service is required to generate or use the brief.

### Phase 8 — GitHub integration (5 days)

**Work:**

- Implement the narrowest practical read-only GitHub authorization approach.
- Let a user explicitly connect an account and select repositories they want associated with a BuildTrace project.
- Store credentials using dedicated secure handling, not ordinary project records.
- Retrieve only selected repository metadata required for identification and display.
- Support disconnect/revocation and manual repository URL entry as a fallback.

**Explicit exclusions:** write permissions, issue/PR management, automated commit-reason inference, broad activity ingestion and multi-provider integrations.

**Exit criteria:** a user can explicitly authorize read-only access, select a repository, link/unlink it and revoke access; manual URL association remains usable if external authorization is delayed.

### Phase 9 — Hardening and release preparation (10 days)

**Work:**

- Complete unit, API, integration, browser, native and end-to-end test coverage for V1 journeys.
- Run cross-account authorization and sensitive-data handling reviews.
- Test backup and restore, account deletion, data export and attachment/evidence access rules.
- Test synchronization under interrupted network conditions and repeated retries.
- Fix accessibility, responsive layout, performance and device-specific defects.
- Prepare reproducible self-hosting configuration and deployment documentation.
- Maintain Render as a non-production staging/preview host while NEXVARIN is being completed; keep application deployments containerized and provider-neutral.
- Validate NEXVARIN against the production-hosting acceptance checklist: container runtime, PostgreSQL connectivity, durable object storage, secret handling, domains/TLS, health checks/restarts, logs/monitoring, backup/restore and protected deployment automation.
- Move the official production environment to NEXVARIN only after that acceptance gate passes and capacity is sufficient. If it does not pass, do not force the cutover.
- Prepare the official hosted environment only when hosting capacity and funding are available.
- Complete the AGPL-3.0-or-later license and dependency audit, third-party notices and contribution/security-reporting documents.
- Verify that no subscription, advertising, data-sale or paid-feature infrastructure has entered the product.
- Produce web, Android and iOS release candidates and complete device testing.

**Exit criteria:** V1 acceptance tests pass; security and backup/deletion checks are complete; web and native artifacts build; self-hosting instructions are reproducible; license and privacy materials are ready; known limitations are documented.

App-store review, account verification and other external distribution delays are outside the development-day estimate.

## 5. Release gates

| Gate | Required evidence |
| --- | --- |
| Technical foundation | All three clients/build targets and backend run; auth and persistence compatibility proven |
| Core product alpha | Create a project, capture a record and view the same history on another client |
| Synchronization alpha | Offline capture, retry, idempotency and conflict handling pass |
| Feature-complete beta | Experiments, snapshots, archive/restore, Resume Brief and export work |
| Integration beta | Read-only GitHub linking works and can be revoked; manual link fallback remains |
| Release candidate | Security, backups, deletion, cross-platform tests, license audit and deployment documentation pass |

A phase is not complete merely because its screens exist. Its exit criteria must pass before the next phase is treated as accepted.

## 6. V1 scope lock

### Included

- Web application: Next.js, React, TypeScript, Tailwind CSS and IndexedDB/Dexie.
- Native Android and iOS applications: Expo, React Native, TypeScript, Expo Router, SQLite and native secure storage.
- Backend: Hono, Better Auth candidate, Drizzle and PostgreSQL; Neon remains a proposed hosted database provider.
- Project Vault, project records, timeline, structured experiments, repository associations, snapshots, archive/restore, search, deterministic Resume Brief and portable export.
- Offline text capture, cached project context, durable outbox, cross-client synchronization, retry and conflict visibility.
- Basic read-only GitHub connection with minimum permissions and manual URL fallback.
- Private-by-default data, ownership checks, export, deletion, backups and self-hosting path.

### Deferred beyond V1

- AI-generated summaries and model-provider integrations.
- Autonomous coding agents and agent orchestration.
- Team workspaces, organization billing and enterprise permission systems.
- Push notifications, widgets and advanced background automation.
- Rich file attachments and automated commit/activity ingestion.
- Additional Git providers, issue trackers and broad integration marketplace.
- Dedicated desktop-native application.
- Public project profiles or social features.

The open-source and funding commitment is not deferred: V1 remains free to use and open source, with voluntary donations only. No subscriptions, paid feature tiers, advertisements or sale of user data.

## 7. Testing strategy

### Unit tests

- Project lifecycle transition rules.
- Project, record and experiment validation.
- Resume Brief assembly and staleness calculation.
- Export serialization and relationship preservation.
- Sync idempotency, version and conflict logic.

### API and integration tests

- Authentication and authorization.
- Cross-account access denial.
- Database transactions and migrations.
- Pagination and search scoping.
- Sync push/pull, duplicate submissions and expired cursors.
- Account export/deletion and backup/restore.
- GitHub token handling, revocation and least privilege.

### Client tests

- Web responsive layout, keyboard navigation and browser persistence.
- Native navigation, deep links and physical device behaviour.
- Local persistence after browser/app restart.
- Offline capture, pending-sync states, retry and conflict resolution.
- Accessibility, text scaling, screen-reader labels and file/share access.

### End-to-end acceptance journeys

1. Create a project on web and open it on Android and iOS.
2. Create a text record offline on native, reconnect and confirm it appears on web.
3. Create an experiment on one client and inspect it on another.
4. Submit the same sync operation twice and confirm no duplicate.
5. Edit the same mutable record on two clients and confirm a visible conflict without silent data loss.
6. Archive and restore a project without losing its timeline or experiments.
7. Generate a Resume Brief and follow its source links.
8. Export a project and validate its records and relationships.
9. Disconnect GitHub authorization and confirm manual repository links still work.

## 8. Success measures

- Time required to capture a useful decision or experiment.
- Time required to regain context after a project interruption.
- Percentage of Resume Brief claims with valid source references.
- Number of projects successfully resumed after a pause.
- Cross-client synchronization success rate.
- Duplicate operation rate and unresolved conflict rate.
- Export success and data-integrity rate.
- User confidence in the accuracy and freshness of Resume Briefs.

Avoid vanity measures such as raw note count or total summaries generated.

## 9. Risk register

| Risk | Consequence | Mitigation |
| --- | --- | --- |
| Native/auth stack incompatibility | Rework across Android/iOS | Prove native authentication in Phase 0 before implementation expands |
| Sync loses or duplicates records | Loss of trust and data | Durable outbox, idempotency, versioning and conflict tests |
| Capture friction | Users stop recording context | Fast text capture and minimal required fields |
| Stale Resume Brief | Incorrect resumption decisions | Timestamps, evidence links and staleness indicators |
| AI hallucination | False project history | Keep AI out of V1; deterministic briefs first |
| Existing tools solve the same problem | Weak differentiation | Validate real resume workflow in Phase 0 |
| External GitHub review/permission delay | Integration slips | Read-only narrow scope and manual URL fallback |
| Licensing incompatibility | Release/legal risk | Audit dependencies, bundled assets and distribution channels before release |
| Hosted infrastructure exceeds funding | Unreliable service | Free self-hostable software, explicit hosted limits and donation-supported capacity |

## 10. What the development estimate does not include

- External app-store review/approval time or account verification.
- Unplanned policy, legal or licensing disputes.
- Large changes to the product concept after V1 scope lock.
- Team/enterprise features or advanced AI capabilities.
- Running a public hosted service indefinitely without sufficient operating support.

If technical validation discovers a major blocker, revise the schedule transparently instead of hiding the work or reducing data-integrity standards.

## 11. Final planning decision

**Working target: 80 development days at 12 hours per day.**

**Settled planning range: 70–90 development days.**

If 80 days proves insufficient, extend toward 90 days rather than cut corners on security, synchronization, data integrity or first-class native-platform support.

The roadmap protects the difficult engineering work and aims for a reliable V1 release candidate, not the largest possible feature list.

## 12. Related specifications

- [Product Requirements Document](../product/PRD.md)
- [Technology Stack and System Architecture](../architecture/SYSTEM_ARCHITECTURE.md)
- [Data Model and API Contract](../architecture/DATA_MODEL_API.md)
- [Web and Native Experience](../product/PLATFORM_EXPERIENCE.md)
- [UX Screen Map and Low-Fidelity Wireframes](../design/UX_SCREEN_MAP.md)
- [Offline Synchronization and Conflict Resolution](../engineering/OFFLINE_SYNC.md)
- [Development Environment and CI/CD Pipeline](../engineering/DEVELOPMENT_PIPELINE.md)
- [Open Source, Licensing and Funding Policy](../policies/OPEN_SOURCE_FUNDING.md)
