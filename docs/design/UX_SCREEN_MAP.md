
# UX Screen Map and Low-Fidelity Wireframes

> **Status:** Proposed design specification for V1 review.
> **Format:** Text-only wireframes; no visual assets or polished UI mockups.
> **Platforms:** Web, Android and iOS.

## 1. UX objective

BuildTrace should make it quick to capture useful project context and equally quick to recover it later. The interface should favour clarity, predictable navigation and trustworthy history over dashboards filled with decorative metrics.

The primary user is an individual developer managing several projects and experiments. V1 is private-by-default and single-user oriented.

### Design principles

1. **Capture before configuration.** A useful record should take seconds to start; optional details can be added later.
2. **History is not a task board.** The interface organizes what happened, why it happened and what was learned. It should not become a Kanban or sprint-management product.
3. **No repository required.** Ideas and experiments without Git repositories must feel like normal first-class items.
4. **State must be honest.** Local-only, pending, synchronized, stale and failed data must be distinguishable.
5. **Evidence stays close.** Important decisions and Resume Brief statements should lead back to their source records.
6. **Platform-appropriate navigation.** Web can use persistent navigation and dense layouts; mobile uses native navigation stacks and touch-sized controls.
7. **Quiet visual language.** Use restrained surfaces, readable typography and clear hierarchy. Avoid neon, gaming HUD patterns, excessive gradients and motion that competes with content.

## 2. Application information architecture

### Public and account screens

- Public landing page: concise product explanation, free/open-source commitment, privacy summary, documentation and self-hosting links.
- Sign in.
- Create account.
- Password reset and account recovery.
- Legal and trust pages: privacy, license, security reporting and data handling.

The public landing page is separate from the authenticated workspace. Do not place social feeds, public project profiles or marketing dashboards inside the application.

### Authenticated workspace

```text
BuildTrace
├── Vault
│   ├── All projects
│   ├── Active
│   ├── Paused
│   ├── Archived
│   └── Completed
├── Experiments
│   ├── All experiments
│   ├── Standalone experiments
│   └── Project-linked experiments
├── Search
│   └── Results across projects, records and experiments
├── Quick Capture
│   ├── Decision
│   ├── Milestone
│   ├── Lesson
│   ├── Blocker
│   ├── Note
│   └── Experiment
├── Project workspace
│   ├── Overview
│   ├── Timeline
│   ├── Experiments
│   ├── Repositories and evidence
│   ├── Snapshots
│   └── Resume Brief
└── Settings
    ├── Profile and account
    ├── Security and sessions
    ├── Connected services
    ├── Local data and synchronization
    ├── Export and deletion
    └── About, license and privacy
```

Archived projects remain accessible through Vault filters. They are not moved into a separate product area that makes recovery difficult.

## 3. Global navigation

### Web

Proposed desktop shell:

- Left sidebar: Vault, Experiments, Search; Settings anchored at the bottom.
- Top application bar: global search, current sync state and primary Capture action.
- Main content: page title, contextual actions and the selected workspace.
- Project pages retain a clear breadcrumb back to Vault.

On narrow browser widths, collapse the sidebar into a menu and keep search/capture accessible. Do not make desktop-only tables the sole way to reach project data.

### Native Android and iOS

Proposed primary bottom navigation:

1. Vault.
2. Experiments.
3. Search.

A persistent, easily reachable Capture action is available from the main app shell. Settings and account actions live behind the account/avatar control rather than consuming a primary tab.

Project detail uses a native navigation stack. The project overview exposes Timeline, Experiments, Repositories, Snapshots and Resume Brief as clear destinations. Do not compress the entire desktop sidebar into a narrow mobile screen.

## 4. Screen inventory and responsibilities

| Screen | Primary responsibility | Main actions |
| --- | --- | --- |
| Vault | See and organize the project portfolio | Create project, filter, search, open, archive |
| Project overview | Understand the current project at a glance | Edit metadata, capture record, inspect latest snapshot |
| Timeline | Understand what happened and when | Filter, open source record, add event |
| Experiments | Manage technical investigations | Create, edit, complete, link to project |
| Experiment detail | Preserve hypothesis through conclusion | Update method/result, add evidence references |
| Repositories and evidence | See supporting external context | Add/remove repository URL, add evidence link |
| Snapshots | Review dated project states | Create snapshot, compare with current state |
| Resume Brief | Regain context before continuing | Review facts, open evidence, export brief |
| Quick Capture | Record an event with minimal friction | Select type, project, title and details; save locally |
| Search | Find records across the vault | Query, filter by type/status/project |
| Settings | Control identity, privacy and local data | Manage account, integrations, sync and export |

## 5. Low-fidelity web wireframes

### 5.1 Project Vault — desktop

```text
┌──────────────────────┬──────────────────────────────────────────────────────┐
│ BuildTrace           │ Search projects and records...      Sync  + Capture  │
│                      ├──────────────────────────────────────────────────────┤
│  Vault               │ Your projects                         New project   │
│  Experiments         │                                                      │
│  Search              │ [All] [Active] [Paused] [Archived] [Completed]      │
│                      │                                                      │
│                      │ Recently active                                     │
│                      │ ┌─────────────────────┐ ┌─────────────────────┐      │
│                      │ │ Project name        │ │ Project name        │      │
│                      │ │ Purpose, one line   │ │ Purpose, one line   │      │
│                      │ │ Active · Updated    │ │ Paused · Updated    │      │
│                      │ │ 3 repositories      │ │ No repository       │      │
│                      │ └─────────────────────┘ └─────────────────────┘      │
│                      │                                                      │
│                      │ All projects                                        │
│                      │ Name          Status       Last activity   Repos    │
│                      │ Project A     Active       Today           2        │
│                      │ Project B     Archived     12 Oct          1        │
│                      │ Project C     Idea         03 Oct           —       │
│                      │                                                      │
│  Settings            │                                                      │
└──────────────────────┴──────────────────────────────────────────────────────┘
```

Notes:

- The Vault is the default authenticated screen.
- Summary cards are optional shortcuts, not an analytics dashboard.
- Project status and last activity must be visible without opening each project.
- Empty states should explain how to create a first project or standalone experiment.

### 5.2 Project overview — desktop

```text
┌──────────────────────┬──────────────────────────────────────────────────────┐
│ BuildTrace           │ Vault / Project A                 Sync  + Capture   │
│                      ├──────────────────────────────────────────────────────┤
│  Vault               │ Project A                 [Active]     [More ...]   │
│  Experiments         │ One-sentence purpose                                  │
│  Search              │ [Edit project] [Add record] [Create snapshot]        │
│                      │                                                      │
│                      │ Overview | Timeline | Experiments | Repositories     │
│                      │ Snapshots | Resume Brief                             │
│                      │                                                      │
│                      │ Current snapshot                  Project details    │
│                      │ Last recorded: date              Created: date      │
│                      │ What works                       Type: product      │
│                      │ Known limitations                Repositories: 2    │
│                      │ Current focus                    Status: active     │
│                      │ Next intended action                                  │
│                      │                                                      │
│                      │ Recent history                                      │
│                      │ [Decision] Chose approach X            [Open]        │
│                      │ [Experiment] Tested library Y           [Open]        │
│                      │ [Milestone] First flow completed        [Open]        │
│                      │                                                      │
│  Settings            │                                                      │
└──────────────────────┴──────────────────────────────────────────────────────┘
```

The overview prioritizes the latest trustworthy snapshot and recent history. It must show when the snapshot was recorded; do not imply that an old snapshot is current.

### 5.3 Timeline — desktop

```text
Project A / Timeline                              [+ Add record]
[All types v] [Date range v] [Search this timeline...]

TODAY
  [Decision]     Selected the local-first capture flow
                 Rationale and source references...
                 10:42 · Open record

YESTERDAY
  [Experiment]   Tested SQLite persistence
                 Result: survived application restart
                 16:10 · Open experiment

12 OCTOBER
  [Blocker]      Native session restoration needs validation
                 09:25 · Open record
```

Timeline filters must not hide records without a visible indication that filters are active. Sorting defaults to newest first, with an option to reverse chronology.

### 5.4 Quick Capture — web dialog

```text
┌──────────────────────── Capture a project record ────────────────────┐
│ Type       [Decision v]                                               │
│ Project    [Project A v]      (required for project events)           │
│ Title      [                                                ]         │
│ Details    [                                                ]         │
│            [                                                ]         │
│ Evidence   [Add URL]                                                  │
│                                                                      │
│ Saved locally / Pending sync / Synchronized                          │
│                                      [Cancel] [Save record]           │
└──────────────────────────────────────────────────────────────────────┘
```

The record type determines optional fields or prompts. Timeline records are attached to a project; an Experiment may be created without a project. The form should not force a developer to fill every field before saving a useful short note.

## 6. Low-fidelity native wireframes

### 6.1 Vault — phone

```text
┌────────────────────────────────┐
│ BuildTrace     [+ Capture] [User] │
│ Search projects...             │
│                                │
│ Your projects          [+ New] │
│ [All] [Active] [Paused] [More] │
│                                │
│ Project A                 >    │
│ Purpose in one line            │
│ Active · Updated today         │
│                                │
│ Project B                 >    │
│ Purpose in one line            │
│ Paused · Updated 12 Oct        │
│                                │
│ Project C                 >    │
│ Repo-less experiment           │
│ Idea · Updated 03 Oct          │
│                                │
│                                │
│ [Vault] [Experiments] [+ Capture] [Search] │
└────────────────────────────────┘
```

### 6.2 Project overview — phone

```text
┌────────────────────────────────┐
│ ‹ Vault                 [More] │
│ Project A                      │
│ Active                         │
│ One-sentence purpose           │
│                                │
│ [Add record] [Snapshot]        │
│                                │
│ CURRENT STATE                  │
│ Last recorded: date            │
│ What works                     │
│ Known limitations              │
│ Next intended action           │
│                                │
│ PROJECT SECTIONS               │
│ Timeline                    >  │
│ Experiments                 >  │
│ Repositories and evidence   >  │
│ Snapshots                   >  │
│ Resume Brief                >  │
│                                │
│ RECENT ACTIVITY                │
│ Decision · Today            >  │
│ Experiment · Yesterday     >  │
│                                │
│ [Vault] [Experiments] [+ Capture] [Search] │
└────────────────────────────────┘
```

### 6.3 Quick Capture — phone

```text
┌────────────────────────────────┐
│ Cancel             New record  │
│                                │
│ What are you recording?        │
│ [Decision] [Milestone]         │
│ [Lesson]   [Blocker]           │
│ [Note]     [Experiment]        │
│                                │
│ Project (for project records) │
│ [Choose a project          v]  │
│                                │
│ Title                          │
│ [                             ]│
│                                │
│ Details                        │
│ [                             ]│
│ [                             ]│
│                                │
│ Evidence URL (optional)        │
│ [                             ]│
│                                │
│ Saved on this device           │
│ [Save record]                  │
└────────────────────────────────┘
```

The native form should save supported text records locally before attempting network synchronization. It must state that the record is local/pending until acknowledged by the server.

## 7. Experiment screens

An experiment form should guide the user through:

1. Question or problem.
2. Hypothesis (optional for exploratory tests).
3. Technology or approach.
4. Environment and constraints.
5. Method or procedure.
6. Result.
7. Evidence references.
8. Conclusion and lesson.
9. Follow-up or revisit decision.
10. Optional linked project.

Allow an experiment to be saved as a draft before all fields are complete. A standalone experiment must not require project creation. For non-experiment timeline records, selecting a project is required so the event has a clear historical home.

Experiment detail should distinguish draft, in-progress and completed states. Completing an experiment should preserve its result and conclusion as part of the project history.

## 8. Resume Brief screen

```text
Project A / Resume Brief
Last assembled: date
Source records through: date
[Current] or [May be stale — review latest project activity]

PURPOSE
Why this project exists...

LAST KNOWN STATE
What was working and what was not...

IMPORTANT DECISIONS
- Decision A [source]
- Decision B [source]

RECENT EXPERIMENTS
- Experiment X — result [source]

LIMITATIONS AND BLOCKERS
- Known issue [source]

OPEN QUESTIONS
- Question A

FIRST CHECKS BEFORE CONTINUING
- Verify the current branch and environment
- Confirm whether the known blocker remains

POSSIBLE NEXT ACTIONS
- Suggested actions, clearly marked as suggestions

[View timeline] [Export brief]
```

The brief must distinguish stored facts from suggestions. Each material claim should link to its source record where available. The last assembled date and source cutoff must be explicit.

## 9. Universal system states

Every major screen needs designed states beyond the happy path.

| State | Required behaviour |
| --- | --- |
| Empty | Explain what belongs here and provide one relevant action |
| Loading | Preserve layout; avoid misleading empty-state flashes |
| Offline | Show offline status and available local data |
| Saved locally | Confirm local persistence, not cloud synchronization |
| Pending sync | Show queued changes and last successful sync |
| Synchronized | Show acknowledgement/last sync time where helpful |
| Sync failed | Preserve the record, explain retry or required action |
| Conflict | Show both versions and an explicit resolution action |
| Stale snapshot | Show date and offer a current snapshot action |
| Permission denied | Explain that the item is unavailable without exposing its content |
| Deleted/archived | Preserve recovery path where policy allows |

Do not use colour alone for statuses. Pair labels and icons with accessible text.

## 10. Accessibility and interaction requirements

- Web navigation and forms must be keyboard accessible with visible focus.
- Native controls must use platform accessibility semantics and labels.
- Respect text scaling, reduced motion and system contrast preferences.
- Touch targets must be comfortable on common phone sizes.
- Validation errors must identify the field and explain how to correct it.
- Destructive actions such as account deletion require explicit confirmation.
- Archive and restore should be reversible; archive must never be presented as delete.
- Preserve typed content if a modal closes unexpectedly or a request fails.
- All visible sync states must correspond to actual persistence/sync state.

## 11. V1 design exclusions

Do not design or build in V1:

- Kanban boards, task assignments or sprint planning.
- Social feeds, public project profiles or follower systems.
- Team chat or real-time collaborative editing.
- AI chat interfaces or agent command panels.
- Analytics dashboards that reward quantity of records.
- Decorative code-editor panels that do not support a core workflow.

## 12. UX decisions to validate in Phase 0

1. Whether the primary Vault should default to cards, a compact list or a user-selectable view.
2. Whether Capture is a modal/sheet or a dedicated route on each platform.
3. Whether mobile project sections work better as a list or secondary tab navigation.
4. How much project context can be displayed in an overview before it becomes cluttered.
5. Which experiment fields should be optional versus required.
6. Whether the quick-capture flow can be completed comfortably in under one minute.

The text wireframes are a starting point for workflow review, not final visual design or a pixel-perfect specification.
