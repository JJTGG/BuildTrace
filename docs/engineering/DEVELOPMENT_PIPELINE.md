
# Development Environment and CI/CD Pipeline

> **Status:** Proposed engineering workflow for Phase 0.
> **Source control:** GitHub.
> **Applications:** Next.js web, Expo/React Native native Android and iOS, Hono API.
> **Constraint:** The workflow must not require a local macOS/Xcode environment to produce iOS release builds.

## 1. Goals

The development pipeline should provide:

- One authoritative source repository.
- Reproducible dependency installation and builds.
- Automated checks on every pull request.
- Cloud-native Android/iOS compilation.
- Separate development, preview/staging and production environments.
- Protected production secrets and explicit release approval.
- Auditable release artifacts and database migrations.
- A workflow that works from a browser-based/GitHub-first environment.

## 2. Proposed repository layout

```text
BuildTrace/
├── apps/
│   ├── web/                   # Next.js web client
│   ├── mobile/                # Expo native Android/iOS client
│   └── api/                   # Hono API
├── packages/
│   ├── domain/                # Core entities and business rules
│   ├── contracts/             # Shared validation schemas
│   ├── api-client/            # Typed API client
│   ├── sync/                  # Sync protocol and shared helpers
│   ├── design-tokens/         # Shared visual foundations
│   └── config/                # Shared TypeScript/lint config
├── docs/
│   ├── product/
│   ├── design/
│   ├── architecture/
│   ├── engineering/
│   ├── project/
│   ├── policies/
│   └── decisions/
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── .eas/                      # Expo workflow configuration, if adopted
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── LICENSE                    # Add after licensing review
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

This is a target layout. Create packages only when they have a clear boundary and real consumer; avoid empty abstractions.

## 3. Branch and contribution model

Use short-lived branches and pull requests.

- `master` is the protected integration/default branch.
- Feature branches: `feat/<short-description>`.
- Fix branches: `fix/<short-description>`.
- Documentation branches: `docs/<short-description>`.
- Release tags use a consistent version convention such as `v0.1.0`.

Rules:

- Do not push unfinished work directly to `master`.
- Keep pull requests focused and reviewable.
- Require automated checks to pass before merge.
- Keep migration changes in the same pull request as the code that requires them.
- Never commit secrets, production data or signing credentials.
- Use draft pull requests for work that needs early review but is not merge-ready.

The maintainer may be the only initial reviewer. Branch protection should still require checks, even when one-person approval rules are not practical.

## 4. Local and cloud development

Developers may use a local editor and CLI where available, but the project must not assume every contributor has a Mac or local Xcode.

Required developer capabilities:

- GitHub repository and pull-request access.
- Supported Node.js LTS version pinned during Phase 0.
- pnpm version pinned via package metadata/Corepack.
- Environment variables documented in `.env.example`.
- A development database or isolated cloud database branch.
- Expo development builds for native-device testing.
- Clear commands for setup, web, API, mobile, tests and migrations.

### Cloud-first support

- GitHub Actions runs source checks and tests.
- Expo Build produces native Android and iOS binaries in the cloud.
- Internal distribution builds let testers install preview applications.
- iOS compilation does not require the developer to own or operate a Mac.
- Physical iOS testing still requires access to a real iPhone or an external tester.

## 5. Environment separation

| Environment | Purpose | Data | Access |
| --- | --- | --- | --- |
| Local/development | Individual feature work | Disposable or synthetic | Developer |
| CI/test | Automated tests | Ephemeral test database | Workflow only |
| Staging/preview | Integrated testing | Synthetic/test accounts | Maintainers and invited testers |
| Production | Official public service | Real user data | Restricted maintainers and services |

Never copy production user data into development or CI. Each environment has independent database credentials, authentication secrets, storage buckets and allowed callback URLs.

## 6. Pull-request checks

Every pull request should run the checks applicable to the changed packages:

1. **Install:** Frozen lockfile install; fail if package manifests and lockfile disagree.
2. **Formatting:** Verify formatting without silently rewriting the pull request.
3. **Lint:** Static checks for web, mobile and API.
4. **Type checking:** Strict TypeScript checks across changed packages and dependants.
5. **Unit tests:** Domain rules, validation, state transitions and synchronization helpers.
6. **API integration tests:** Authentication, authorization, database transactions and error contracts.
7. **Migration tests:** Apply migrations to a fresh temporary PostgreSQL database and test expected schema state.
8. **Web build:** Production build of the Next.js app.
9. **Mobile validation:** Expo configuration and supported platform bundle/export checks.
10. **Security checks:** Dependency vulnerability alerts/scanning, secret scanning and static analysis appropriate to the repository.
11. **License checks:** Ensure new dependencies and bundled assets do not introduce known license incompatibilities with the proposed AGPL distribution.

Tests must not depend on production secrets. Pull requests from untrusted forks must never receive privileged deployment credentials.

## 7. Native build profiles

Use separate native build profiles in the Expo project.

| Profile | Purpose | Distribution |
| --- | --- | --- |
| Development | Native development client with debugging support | Developer/test devices |
| Preview | Candidate builds for feature review and QA | Internal distribution |
| Production | Signed store-ready binary | Google Play and Apple App Store |

The build profile must pin app identifiers, runtime compatibility, environment selection and signing configuration. Final Android package name and iOS bundle identifier must be selected before first public/distributable builds.

Expo Build provides hosted compilation and distribution workflows for Android and iOS. The CLI still uses the `eas` command family.

See [Expo Build documentation](https://docs.expo.dev/build/).

## 8. Proposed CI/CD division of responsibility

### GitHub Actions — repository quality and general CI

Use GitHub Actions for:

- Pull-request checks.
- Unit and integration tests.
- PostgreSQL migration checks.
- Web production build validation.
- API validation and deployment automation.
- Dependency/security scanning.
- Release metadata and changelog validation.

### Expo Build — native compilation and distribution

Use Expo Build for:

- Android native development builds.
- iOS native development builds.
- Internal preview builds.
- Production-signed binaries.
- Optional store submission workflow after explicit release approval.

Expo Build integrates with GitHub and general CI systems. A GitHub Actions workflow can trigger cloud builds using the Expo CLI, or the GitHub integration/Expo Workflows can trigger builds from repository events. Select one trigger path during Phase 0 to avoid duplicate builds.

See:

- [Trigger builds from CI](https://docs.expo.dev/build/building-on-ci/)
- [Expo Workflows](https://docs.expo.dev/eas/workflows/introduction/)
- [Expo's GitHub build integration](https://docs.expo.dev/build/building-from-github/)

### Web deployment

Build the Next.js web application as a portable Node.js/Docker (OCI) deployment, not as a static export. BuildTrace requires authenticated server-side behaviour, and the container boundary keeps the application independent of a particular hosting vendor.

See [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying).

Approved hosting direction:

- **Interim staging and previews:** Render. Use it only for non-production environments while NEXVARIN is being completed.
- **Intended long-term production:** NEXVARIN, after the production-hosting acceptance checklist in the architecture specification has been demonstrated.

The NEXVARIN choice is a target, not a statement that its current implementation is production-ready. Do not move production traffic or real user data to NEXVARIN until container deployment, PostgreSQL connectivity, durable object storage, secret management, domains/TLS, health checks/restarts, logs/monitoring, backup/restore and protected deployment automation have all passed an end-to-end test.

Keep the web application, Hono API, environment configuration and deployment pipeline portable. Avoid dependencies on Render-specific or NEXVARIN-specific application APIs. Keep database and object-storage providers independently configurable so a host migration does not automatically imply a data migration.

## 9. Suggested trigger policy

| Event | Actions |
| --- | --- |
| Pull request opened/updated | Quality checks, tests, migration validation and web build |
| PR labelled `native-preview` | Build internal Android/iOS preview as needed |
| Merge to `master` | Re-run required checks; deploy the non-production staging environment on Render after successful tests |
| Manual staging release | Build/share native preview and run cross-platform smoke tests |
| Version tag | Prepare production artifacts and release notes |
| Protected production approval | Deploy web/API to NEXVARIN only after its acceptance gate passes; run safe production migrations and publish/submit mobile binaries |
| Security alert | Triage and patch workflow; no automatic unreviewed production deployment |

Native builds should not automatically run for every trivial documentation or backend-only change. Use path filters or explicit labels to control build cost while still testing native changes that can affect the app.

## 10. Secrets and workflow security

- Store `EXPO_TOKEN`, deployment credentials, database URLs and signing-related secrets in protected GitHub environments or the relevant provider's secret manager.
- Keep `.env` files out of Git; commit `.env.example` with names and descriptions only.
- Use separate credentials for development, staging and production.
- Apply least-privilege permissions to workflow tokens and third-party GitHub Actions.
- Pin high-trust GitHub Actions to reviewed versions/commit SHAs when practical.
- Require approval for production environment deployments.
- Do not expose secrets to fork pull requests.
- Rotate credentials if exposed and document an incident response process.
- Do not log tokens, authorization headers, private project content or raw repository credentials.

GitHub environments support branch restrictions, required reviewers/protection rules and environment-scoped secrets.

See [GitHub deployment environments](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments).

## 11. Database migration and deployment order

For each release:

1. Review migration SQL and test it against a clean database.
2. Back up staging/production according to the environment's backup policy.
3. Apply backward-compatible migrations before deploying code that depends on them.
4. Deploy API/web code.
5. Run smoke tests.
6. Monitor errors and synchronization behaviour.
7. Prefer forward-fix migrations; destructive schema changes require an explicit migration plan and verified backup.

Never run unreviewed schema-changing operations directly against production from a developer workstation.

## 12. Observability and operations

V1 operations should record:

- API error rate and latency.
- Authentication failures without sensitive payloads.
- Sync push/pull success and failure counts.
- Outbox age and retry counts where safely measurable.
- Conflict rates and unresolved conflicts.
- Database availability and connection saturation.
- Background job failures if jobs are later introduced.
- Deployment version and release identifier.

Use structured logs and correlation IDs. Do not log private project content or secrets. Select monitoring providers only after cost, privacy, self-hosting and retention requirements are reviewed.

## 13. Release process

1. Merge reviewed changes into `master` after required checks pass.
2. Deploy the combined web/API release to staging.
3. Run end-to-end journeys across web, Android and iOS.
4. Build internal native preview artifacts.
5. Verify migration status, backup state and release notes.
6. Create a version tag and release candidate.
7. Obtain explicit maintainer approval for production.
8. Deploy web/API and apply safe migrations.
9. Submit the signed Android/iOS binaries through the selected store workflows.
10. Publish source release notes and known limitations.
11. Monitor rollout and keep a forward-fix/rollback plan.

Store review/approval time is external and is not part of the development-day estimate.

## 14. Cost and free-software constraints

The development pipeline must not create a paid-user tier or product entitlement.

- Cloud builds and CI usage may have provider quotas or costs; set account alerts and a monthly spending ceiling.
- Prefer build-on-demand for native previews rather than compiling every PR.
- Make self-hosted release/build alternatives documented where practical.
- Do not expose paid cloud services as required end-user features.
- Donations support project maintenance and official infrastructure; they do not buy privileged CI access or application features.

The official hosted application is intended to be free and donation-supported. Do not launch it with an unlimited service promise that the available infrastructure cannot sustain.

## 15. Phase 0 setup checklist

- [ ] Confirm the BuildTrace GitHub repository and ownership.
- [ ] Confirm `master` as the default integration branch.
- [ ] Confirm branch protection and pull-request checks.
- [ ] Confirm the account that owns the Expo project.
- [ ] Connect the repository to Expo Build or choose GitHub Actions-triggered cloud builds.
- [ ] Prove Android development and preview builds.
- [ ] Prove iOS development and preview builds.
- [ ] Confirm physical Android and iOS test access.
- [ ] Pin Node.js and pnpm versions after the compatibility spike.
- [ ] Add isolated development/test/staging/production environments.
- [ ] Add protected secrets and least-privilege workflow permissions.
- [ ] Test PostgreSQL migrations in CI.
- [ ] Verify a Next.js web build and staging deployment.
- [ ] Verify one native preview build can be installed by a tester.
- [ ] Document recovery for a failed deployment or broken database migration.

This specification describes the pipeline to implement after Phase 0 validates the choices. It does not mean the proposed workflow or every listed service is already configured.
