
# BuildTrace

**Preserve the context behind the code.**

BuildTrace is an open-source, offline-first project memory and continuity platform for developers. It helps builders preserve project history, experiments, decisions, blockers, evidence and resume context so work can be understood and continued after interruptions.

> **Project status:** Pre-implementation. Phase 0 product and technical validation is the next milestone. BuildTrace is not yet a usable application.

## The problem

Project context is easy to lose. Developers return to old repositories and cannot remember why a design was chosen, which experiments failed, what remains unfinished or what should happen next. A repository captures code and some collaboration history, but it does not necessarily preserve the complete reasoning and working context behind a project.

BuildTrace is intended to keep that context in one portable, structured place.

## Product direction

The planned product includes:

- **Project Vault** — organize active, paused, completed and abandoned projects, including projects without a repository.
- **Development Timeline** — preserve milestones, decisions, blockers, lessons and other meaningful events.
- **Experiment Log** — record questions, hypotheses, approaches, results and conclusions.
- **Repository Connections** — associate one or more source repositories with a project without making Git hosting a requirement.
- **Snapshots and Archive** — preserve point-in-time project state and restore archived work without erasing history.
- **Resume Brief** — assemble a deterministic, evidence-linked explanation of a project's purpose, last-known state, decisions, blockers and possible next checks.
- **Offline Capture and Synchronization** — record context locally and synchronize safely when connectivity returns.

BuildTrace is a project-memory and continuity tool. It is not intended to be a build profiler, compiler trace viewer, task manager or social network.

## Planned platforms

BuildTrace is planned as three first-class experiences:

- Web application
- Native Android application
- Native iOS application

The mobile applications are intended to use native platform capabilities rather than wrap the web application in a WebView.

## Product commitments

The project direction is:

- Free and open source.
- No subscriptions or paid feature tiers.
- No advertisements.
- No sale of user data.
- No feature or permission advantage for donors.
- Voluntary donations may support development and the official hosted service.
- Core workflows must not depend on paid AI APIs.
- Self-hosting and portable data must remain viable.

The official hosted service is intended to be free to use, subject to honest capacity and funding limits. Self-hosters choose and pay for their own infrastructure.

## Technical direction

The following are candidates, not final implementation commitments. Phase 0 must prove compatibility before versions are pinned or production code depends on them.

| Area | Current candidate |
| --- | --- |
| Web | Next.js, React and TypeScript |
| Native apps | Expo, React Native and TypeScript |
| API | Hono and TypeScript |
| Data | PostgreSQL with Drizzle ORM |
| Authentication | Better Auth, subject to native-session validation |
| Web local persistence | IndexedDB, preferably through Dexie |
| Native local persistence | SQLite through Expo SQLite |
| Synchronization | Shared, durable offline outbox with idempotency and explicit conflict handling |
| Workspace | pnpm workspaces |

The hosting direction is Render for temporary staging and previews, with NEXVARIN as the intended long-term production platform after it passes a separate infrastructure acceptance check. This is a deployment target, not a claim that NEXVARIN is production-ready today.

## Development status

The immediate work is Phase 0:

1. Validate the core capture-to-resume workflow with realistic project histories.
2. Prove the web, native and API stack can coexist in the planned workspace.
3. Validate authentication and secure session handling across web, Android and iOS.
4. Demonstrate local persistence and a small offline synchronization spike.
5. Verify native build and device-testing paths.
6. Review dependencies, licensing and the deployment approach.

No application architecture should be treated as final until the relevant validation evidence exists. See [Phase 0 Validation](docs/PHASE_0_VALIDATION.md).

## License status

The intended license is **GNU AGPL-3.0-or-later**, subject to dependency compatibility, legal and distribution review. The license file has not yet been added. Until a license is published, do not assume this repository grants permission to use, modify or redistribute its contents beyond rights provided by applicable law.

## Contributing

The project is in pre-implementation validation. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes. For now, discuss substantial product or architecture changes before submitting implementation work.

## Security

Please do not disclose suspected vulnerabilities in public issues. See [SECURITY.md](SECURITY.md) for the reporting approach.

---

BuildTrace is being designed to help developers remember not only what they built, but why they built it and how to continue.
