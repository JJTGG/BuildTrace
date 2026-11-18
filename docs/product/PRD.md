
# BuildTrace — Product Requirements Document

> **Status:** Product direction approved; detailed requirements remain subject to validation.
> **Implementation status:** Not started.
> **Product name:** BuildTrace is the current project name.
> **Platforms:** Web, native Android and native iOS.
> **Funding:** Free and open source, supported by voluntary donations.

## 1. Product summary

BuildTrace is a project-memory and continuity platform for developers. It helps people preserve the context behind software projects and technical experiments so they can understand past work, retain useful lessons, archive unfinished efforts and resume development without reconstructing everything from scattered sources.

BuildTrace has three first-class application modes:

- Web application for desktop and mobile browsers.
- Native Android application.
- Native iOS application.

These are clients of one product and one account/data model. Native applications must use native application builds and platform capabilities; a website embedded in a WebView does not satisfy the native requirement.

## 2. Problem statement

Developers often retain source code but lose the reasoning around it. Project purpose, technical decisions, experiments, failures, blockers and last-known state become scattered across memory, chat histories, issue trackers, documents and repositories.

When returning to old work, developers may need to reconstruct:

- Why the project was started.
- What approaches were attempted and why.
- What worked, failed or remained inconclusive.
- What state the project was in when work stopped.
- What to inspect before making further changes.
- Where supporting evidence and related repositories are located.

Existing tools remain the systems of record for code, issues and conversations. BuildTrace's proposed job is to connect the useful context between them.

## 3. Product thesis

**The central value is durable project context across time, projects and changes of device.**

The Project Vault is the primary experience. A project may have no repository, one repository or multiple repositories. Standalone experiments must also be supported.

The strongest differentiation hypothesis is a human-first, repository-agnostic project lifecycle vault with structured experiment history and reliable, evidence-linked Resume Briefs. This is a hypothesis, not a validated market gap.

## 4. Initial audience hypothesis

Initial audiences to investigate:

- Independent developers and solo builders managing several projects.
- Open-source contributors working across repositories.
- Developers and students who run technical experiments and want to preserve what they learn.

Do not optimize the first release for enterprise teams, institutional accounts or general consumers. Those audiences can be reconsidered after the individual workflow is proven.

## 5. Product goals

1. Make it quick to create and maintain a useful record of a project.
2. Preserve decisions, experiments, lessons, milestones and pause points.
3. Make project history retrievable across web, Android and iOS.
4. Support projects with no repository and projects with multiple repositories.
5. Preserve archived projects and make them recoverable.
6. Help a developer resume work using dated, inspectable information.
7. Give users practical ownership and portability of their records.

## 6. Non-goals

BuildTrace is not intended to be:

- A general task manager or Kanban board.
- A replacement for GitHub, Git hosting or issue trackers.
- A source-code hosting service.
- A raw AI chat-transcript archive.
- An autonomous coding agent.
- A developer social network.
- A full team project-management suite.
- A replacement for project READMEs or technical design documents.

It may link to or exchange selected information with these tools without taking over their core responsibilities.

## 7. Core concepts

| Concept | Responsibility |
| --- | --- |
| Project Vault | Cross-project catalogue and discovery |
| Project | Purpose, lifecycle, current state and related resources |
| Timeline record | Decision, milestone, lesson, blocker or other dated event |
| Experiment | Hypothesis, approach, result, evidence and conclusion |
| Repository link | Association with one or more source repositories |
| Snapshot | Dated description of a project's known state |
| Resume Brief | Structured handover assembled from project records |
| Archive | Preserve a project without discarding its history |

## 8. Functional requirements

Priority definitions:

- **P0:** Required to prove the core product loop.
- **P1:** Useful but can follow the first usable release.
- **Later:** Explicitly outside the initial scope.

### 8.1 Accounts and data ownership — P0

- A user can register, authenticate, sign out and manage an account.
- Every private project and record is scoped to its owner.
- A user cannot retrieve or mutate another user's records by changing an identifier.
- Account deletion and data export behaviour must be documented before public release.

### 8.2 Project Vault — P0

- Create, view, edit and search projects.
- Store a project's name, purpose, description, type, status and last-known activity.
- Filter projects by lifecycle status and project type.
- Support projects with zero, one or multiple repository associations.
- Distinguish a project from a standalone experiment.
- Preserve archived projects in search and history.

### 8.3 Project history — P0

- Create dated records for decisions, milestones, lessons, blockers, status changes and handovers.
- Record title, body, type, occurrence time, creation time and source/evidence references where available.
- Display project records chronologically.
- Permit corrections without silently erasing the original historical meaning. Prefer a superseding or correction record for material historical changes.

### 8.4 Experiments — P0

- Create an experiment independently or associate it with a project.
- Capture the question, hypothesis, technology or approach, environment, procedure, result, conclusion, lesson and follow-up decision.
- Represent failed and inconclusive experiments as valid outcomes.
- Link supporting repositories, commits, documents or other evidence.

### 8.5 Project lifecycle and archive — P0

- Support an initial lifecycle vocabulary such as Idea, Active, Paused, Archived and Completed.
- Allow an archived project to be restored.
- Preserve records, experiments, repository links and snapshots through archive/restore.
- Record status transitions in project history.
- Final status names and transition rules remain subject to validation.

### 8.6 Snapshots and Resume Briefs — P0/P1

- Allow a user to save a dated snapshot containing working state, non-working areas, current focus, limitations, blockers, open questions and next action.
- Provide a structured Resume Brief using available project records and the latest snapshot.
- Identify the date of the underlying information and indicate when it may be stale.
- Link material statements to supporting records.
- Separate recorded facts from suggestions or inferences.
- The first implementation may use deterministic templates and user-entered snapshots. AI generation is optional and must not be required.

### 8.7 Repository associations — P0/P1

- Allow a user to link a repository URL to a project without granting provider access.
- Support multiple repositories per project.
- Later, offer a narrow, explicitly authorized, read-only GitHub connection.
- Do not infer the reason for a code change solely from commit metadata.

### 8.8 Search and export — P0/P1

- Search project names, descriptions and record text.
- Filter by status, record type and date.
- Export a project and its related records in a documented portable format.
- Export must preserve IDs, timestamps, record relationships and evidence references where possible.

## 9. Cross-platform requirements

Web, Android and iOS are first-class product modes.

- A project created on one client must become available on the other clients after synchronization.
- Each client must use the same authorization rules and domain validation.
- Web must support responsive layouts for desktop and mobile browsers.
- Android and iOS must be native builds with platform-appropriate navigation and controls.
- Core project browsing and record capture must be usable on native mobile.
- Offline capture must be supported by the architecture; the first release should prioritize offline creation of text records and later synchronization.
- Platform differences in layout are acceptable; inconsistent product semantics are not.

## 10. Quality requirements

- **Reliability:** Retries must not create duplicate records; sync failures must be visible and recoverable.
- **Privacy:** Private by default, least-privilege integrations and no public sharing by default.
- **Data integrity:** Historical records and evidence associations must not disappear through ordinary edits.
- **Portability:** Users can export their data without depending on AI or a proprietary viewer.
- **Accessibility:** Keyboard operation on web, screen-reader labels and adequate contrast on every platform.
- **Performance:** Common vault and project views should remain responsive as history grows; performance targets will be set after representative data tests.
- **Observability:** Sync, API and integration failures must be diagnosable without logging sensitive project content.

## 11. Core user journeys

### Journey A — Create and maintain a project

1. Create a project with a name and purpose.
2. Add optional repository links.
3. Record a decision, milestone or blocker.
4. Return later and inspect the chronological history.
5. Update the current snapshot as the project changes.

### Journey B — Preserve an experiment

1. Create a standalone experiment or attach it to a project.
2. State the question and hypothesis.
3. Record the approach and environment.
4. Capture the result and conclusion.
5. Decide whether to continue, abandon or revisit the approach.

### Journey C — Pause and resume

1. Record the last-known project state.
2. Identify blockers and open questions.
3. Archive or pause the project.
4. Later, open its Resume Brief and inspect linked source records.
5. Verify the current repository state before acting on old recommendations.

## 12. Success measures to validate

These are proposed measures, not proven targets:

- Time required to capture a useful decision or experiment.
- Percentage of created projects with at least one meaningful history record.
- Percentage of paused projects with a useful snapshot.
- Time required to resume a project using BuildTrace versus the developer's existing workflow.
- Percentage of Resume Brief claims that link to valid source records.
- Successful cross-device synchronization rate and unresolved conflict rate.
- User-reported frequency of returning to old projects and usefulness of preserved history.

## 13. V1 release boundary

The first release must prove this complete loop:

**Create a project → record context → inspect history → preserve experiments and decisions → pause/archive → return → understand the last-known state → continue work.**

V1 must include:

- First-class web application using the separately proposed Next.js web stack.
- First-class native Android and iOS applications using the separately proposed Expo/React Native stack. They must be installable native builds, not WebView wrappers.
- Accounts, authentication, private-by-default project ownership and authorization.
- Project Vault supporting projects with no repository and projects linked to multiple repositories.
- Project timeline with dated milestones, decisions, lessons and blockers.
- Structured experiments, both standalone and attached to projects.
- Project snapshots and archive/restore without losing history.
- Deterministic Resume Briefs grounded in dated records, with evidence links and staleness information.
- Portable project and account export in documented formats.
- Basic read-only GitHub connection/repository selection, with manual repository URL entry as a fallback.
- Offline text-record capture, durable local queues, visible synchronization state, retry and conflict handling across supported clients.
- Account deletion, backup/recovery procedures, privacy controls and a self-hostable deployment path.

Offline scope must be explicit: V1 guarantees offline capture for supported text records and access to recently cached project context. It does not promise that every screen, attachment or bulk operation works offline. A local write must never be shown as cloud-synchronized before server acknowledgement.

Evidence in V1 may use stable URLs, repository/commit references and links to external documentation. Rich file attachments and automated repository activity ingestion are not required for the initial release.

Resume Briefs in V1 are deterministic and based on recorded data. AI-generated summaries are deferred so that core continuity does not depend on a paid model provider or unvalidated AI output.

### V1 exclusions

- Team workspaces and complex permission roles.
- AI chat, AI-generated summaries and autonomous coding-agent workflows.
- Automated commit/repository activity ingestion beyond selected read-only metadata.
- Broad integrations with other Git providers, issue trackers or coding agents.
- Push notification systems, widgets and background automation beyond platform-safe sync opportunities.
- Separate desktop-native applications.
- Public project profiles, social features or project-management boards.
- Subscription, paid feature, advertising, data-sale or in-app purchase infrastructure.

The project is free and open source, with voluntary donations as the proposed funding model. See [Open Source, Licensing and Funding Policy](../policies/OPEN_SOURCE_FUNDING.md).

## 14. Open product decisions

- Which initial user segment—independent developers, students or open-source contributors—is most likely to adopt the product?
- Which lifecycle states are genuinely necessary?
- Should a standalone experiment become a project when it grows?
- What is the minimum useful Resume Brief?
- How much content should be captured manually versus imported?
- Which export format should be guaranteed?

These questions are part of Phase 0 validation, not permission to expand V1 scope without review.

## 15. Related specifications

- [Technology Stack and System Architecture](../architecture/SYSTEM_ARCHITECTURE.md)
- [Data Model and API Contract](../architecture/DATA_MODEL_API.md)
- [Web and Native Experience](./PLATFORM_EXPERIENCE.md)
- [UX Screen Map and Low-Fidelity Wireframes](../design/UX_SCREEN_MAP.md)
- [Offline Synchronization and Conflict Resolution](../engineering/OFFLINE_SYNC.md)
- [Delivery, Validation and Testing Plan](../project/DELIVERY_PLAN.md)
- [Open Source, Licensing and Funding Policy](../policies/OPEN_SOURCE_FUNDING.md)

## 16. Open-source, licensing and funding requirements

These are approved product-direction constraints, not optional monetization experiments:

- BuildTrace must be free to use, with its source code publicly available under the proposed AGPL-3.0-or-later license.
- The license remains subject to legal review, dependency-license compatibility checks and review of web, Android and iOS distribution requirements before release.
- Core project capture, browsing, history, archiving, export and resumption must not require a subscription, paid feature tier or paid AI provider.
- No advertisements, ad-targeting infrastructure or sale of user data.
- Donations are voluntary and must not unlock features, increase privileges or influence product access.
- The intended official hosted service is free to use and donation-supported. Capacity and availability must be communicated honestly and may depend on available funding.
- Self-hosting must remain possible. Operators are responsible for their own infrastructure and provider costs.
- Optional external AI providers must never be required for the core product; any third-party provider charges are separate from BuildTrace and must be clearly disclosed before use.

See the [Open Source, Licensing and Funding Policy](../policies/OPEN_SOURCE_FUNDING.md) for the full policy.
