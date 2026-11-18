
# Web and Native Experience

> **Status:** Proposed experience specification.
> **Platforms:** Web, Android and iOS are first-class modes.

## 1. Platform principle

BuildTrace should be one product with a shared account, domain model and synchronization system, but it should not force identical interfaces onto every screen size.

- Web is a full workspace, optimized for larger screens but responsive on mobile browsers.
- Android and iOS are native applications with platform-appropriate navigation, controls and device capabilities.
- Core product meaning and permissions must remain consistent across clients.
- The native apps must not be thin WebView wrappers.

## 2. Proposed application approach

Use separate application shells:

- Next.js + React + TypeScript for web.
- Expo + React Native + TypeScript for native Android and iOS.

Share domain rules, contracts, API clients and synchronization packages rather than forcing the same UI runtime onto every platform.

Share where it reduces duplication:

- Domain types and validation.
- API client and authentication contracts.
- Project and record business rules.
- Sync state and error semantics.
- Design tokens and selected presentational components.

Implement platform-specific UI where it improves usability:

- Navigation and layout.
- Keyboard and form behaviour.
- File selection and sharing.
- Responsive tables or dense timeline layouts.
- Native accessibility and gestures.

A shared codebase is a means to maintain consistency, not a target that overrides good platform UX.

## 3. Information architecture

Primary authenticated navigation:

1. **Vault** — projects, filters and recent activity.
2. **Experiments** — standalone experiments and experiments grouped by project.
3. **Search** — global search across authorized projects and records.
4. **Capture** — create a project record, experiment or snapshot.
5. **Settings** — account, connected providers, local storage, export and privacy.

Project-level navigation:

- Overview.
- Timeline.
- Experiments.
- Repositories and evidence.
- Snapshots.
- Resume Brief.

On mobile, use a compact native navigation model and a project detail navigation stack. Do not squeeze a desktop sidebar into a narrow screen.

## 4. Web experience

The web app should be a dedicated Next.js application using React, TypeScript and Tailwind CSS. Use IndexedDB, preferably through Dexie, for browser-local drafts, cached project data and queued changes.

It should provide the most complete management workspace:

- Project Vault with search, filters and useful status grouping.
- Detailed project overview.
- Readable chronological timelines with record-type filters.
- Full experiment editing and result inspection.
- Repository and evidence management.
- Snapshot and Resume Brief review.
- Data export and bulk organization.
- Responsive layouts for small browser widths.

Web does not need public marketing-site functionality inside the authenticated workspace. A public landing site can be designed separately from the product application.

## 5. Native Android and iOS experience

The Android and iOS applications should be built with Expo, React Native, TypeScript and Expo Router. They must be installable native applications, not WebView wrappers.

Proposed supporting modules:

- `expo-sqlite` for durable local records and the sync queue.
- `expo-secure-store` for sensitive local session material.
- `expo-file-system` for local file handling.
- `expo-sharing` for native share workflows where appropriate.
- TanStack Query for remote server-state coordination.
- Zustand for transient UI state only where needed.

### Required core capabilities

- Sign in and restore a session.
- Browse the vault and open project details.
- Read project timelines and experiments.
- Capture decisions, blockers, lessons and experiment results.
- Save drafts locally when offline.
- Display sync status and allow retry after failure.
- Open repository and evidence links using platform conventions.
- Deep-link to a project or record.
- Use native sharing and file selection where those features are included.

### Candidate later capabilities

- Push notifications for meaningful sync or user-requested reminders.
- Widgets or shortcuts for quick capture.
- Background synchronization within platform limits.
- Biometric re-authentication for sensitive actions.

Do not promise continuous background sync. Android and iOS control when background work can run.

## 6. Cross-platform feature matrix

| Capability | Web | Android | iOS |
| --- | --- | --- | --- |
| Sign in and account | Required | Required | Required |
| Browse Project Vault | Required | Required | Required |
| Create/edit project | Required | Required | Required |
| Timeline and experiment views | Required | Required | Required |
| Record capture | Required | Required | Required |
| Offline text capture | Required capability | Required capability | Required capability |
| Cross-device sync | Required | Required | Required |
| Resume Brief view | Required | Required | Required |
| Export workflow | Full workflow | Initiate or retrieve export | Initiate or retrieve export |
| Bulk organization | Primary | Simplified | Simplified |
| Native share sheet | Browser share where supported | Native | Native |
| Push notifications | Browser support later | Optional later | Optional later |

“Required capability” means the architecture and initial supported workflow must accommodate it. The exact offline feature set should be tested and documented before public beta.

## 7. Offline UX

Offline must be visible, not hidden.

Each client should communicate:

- Whether it is online or offline.
- Whether a new record is saved locally.
- Whether an operation is pending, synchronized or failed.
- Whether the user needs to resolve a conflict.
- When the last successful sync occurred.

A locally saved record should not be presented as cloud-synchronized until the server acknowledges it.

Initial offline priority:

1. Create and save text records.
2. Read recently cached project data.
3. Queue changes safely.
4. Sync after reconnection.
5. Detect conflicts without losing the local draft.

See [Offline Synchronization and Conflict Resolution](../engineering/OFFLINE_SYNC.md).

## 8. Design system

Use shared design tokens for:

- Color roles and semantic status.
- Typography scale.
- Spacing.
- Corner radii.
- Elevation.
- Motion.
- Focus and disabled states.

Create a restrained developer-tool aesthetic: clear hierarchy, high information density where useful, readable timelines and minimal decoration. Avoid visual effects that reduce legibility.

A component should be shared only when its behaviour and layout genuinely match across platforms. Platform-specific components may consume shared tokens.

## 9. Accessibility

- Web controls must be keyboard accessible with visible focus.
- Native controls must expose correct accessibility labels, roles and state.
- Color must not be the only way to communicate lifecycle or sync status.
- Respect text scaling and reduced-motion preferences.
- Interactive targets must be usable on touchscreens.
- Timeline and table content must have a meaningful reading order.
- Forms must expose validation errors to screen readers.

## 10. Navigation and deep links

Define a stable internal route format for projects, experiments and records. The same logical destination should open the right web route or native screen.

Example logical destinations:

- `/projects/:projectId`
- `/projects/:projectId/timeline`
- `/experiments/:experimentId`
- `/records/:recordId`

Native universal/app links require domain association and platform configuration. Keep link access subject to normal authentication and authorization checks.

## 11. Platform test matrix

Every release candidate should be exercised on:

- Desktop browser at common wide and narrow widths.
- Mobile browser.
- Android emulator and at least one physical Android device.
- iOS simulator and at least one physical iPhone before a public iOS release.

Test login, record creation, project navigation, offline capture, synchronization, conflict resolution, deep links, keyboard/input behaviour, screen readers and attachment permissions.

## 12. Desktop-native decision

Do not commit to a separate desktop-native application in the first release. The web app should serve desktop users initially. Revisit desktop-native packaging only if users demonstrate needs that a browser application cannot satisfy adequately.

## 13. Native build and distribution requirements

- Maintain an Expo application configured for Android and iOS native builds.
- Validate the selected Expo SDK and native module versions together before locking dependencies.
- Test database migrations and local persistence across application upgrades, not only fresh installs.
- Keep credentials out of SQLite project records; use platform-secure storage for sensitive local session material.
- Test file access, sharing, deep links, keyboard behaviour, text scaling and accessibility on real devices.
- Background synchronization must respect Android and iOS scheduling limits; foreground retry and durable local queues remain the reliability baseline.
- The native apps are free to use. Do not add in-app purchases, subscription unlocks, advertisements or paid-feature gates.

The license and donation model are defined in the [Open Source, Licensing and Funding Policy](../policies/OPEN_SOURCE_FUNDING.md).

## 14. Related design specification

The screen inventory, web and native text wireframes, navigation structure, Resume Brief layout and universal system states are documented in [UX Screen Map and Low-Fidelity Wireframes](../design/UX_SCREEN_MAP.md).

Treat that document as the workflow baseline for Phase 0 review, not as final pixel-level visual design.
