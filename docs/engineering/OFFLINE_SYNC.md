
# Offline Synchronization and Conflict Resolution Specification

> **Status:** Proposed V1 technical specification for Phase 0 validation.
> **Priority:** Data integrity takes precedence over silent last-write-wins behaviour.
> **Clients:** Next.js web, native Android and native iOS.

## 1. Purpose and guarantees

BuildTrace must allow supported project records to be captured while offline and safely synchronized later. A local save must survive a browser reload or native application restart. A retry must not create duplicates. Concurrent updates must not silently erase one another.

V1 guarantees:

- Offline creation of supported text records.
- Access to recently cached project context while offline.
- Durable local pending-operation queues.
- Idempotent push and retry.
- Server-to-client incremental pull.
- Conflict detection for concurrently edited mutable entities.
- Visible sync state and manual resolution when automatic reconciliation is unsafe.

V1 does not promise:

- Every screen or every historical project is available offline.
- Binary file uploads while offline.
- Continuous background synchronization.
- Conflict-free editing of the same mutable object on multiple devices.

## 2. Sources of truth and data categories

The server is authoritative for synchronized canonical data. Each client maintains a local database for cached data, optimistic views and a durable outbox.

### Immutable historical records

Timeline events and completed snapshots are historical evidence. They should be append-only after acceptance.

Examples:

- Decision recorded.
- Milestone reached.
- Lesson learned.
- Blocker identified.
- Project archived or restored.
- Snapshot created.
- Experiment completed.

If an event is wrong, create a correction/superseding record that references the original. Do not silently rewrite history. A user-requested removal may create a tombstone, subject to retention and deletion policy.

### Versioned mutable entities

Some data must be editable:

- Project metadata and current status.
- Experiment drafts and in-progress results.
- Repository associations.
- User preferences.

Each mutable entity has a monotonically increasing server version. An update declares the version on which it was based.

Snapshots are immutable once created. A new snapshot records a new state instead of editing an old one.

## 3. Client persistence model

Each client keeps the following logical stores:

| Store | Purpose |
| --- | --- |
| Canonical cache | Last server-confirmed version of each entity |
| Local projection | What the UI currently displays, including pending local edits |
| Outbox | Durable operations waiting to be pushed |
| Sync metadata | Device ID, last cursor, last successful sync and schema version |
| Conflict store | Local proposals that cannot safely be merged |

Use IndexedDB on web, preferably through Dexie, and `expo-sqlite` on native. Local entity changes and their outbox operation must be written in the same local database transaction.

Never treat an in-memory queue as durable. If a process is killed, queued operations must remain recoverable.

## 4. Operation envelope

Every mutation is an explicit operation with a stable client-generated ID.

Illustrative shape:

```json
{
  "operationId": "stable-unique-id",
  "deviceId": "stable-device-id",
  "entityType": "project_record",
  "entityId": "stable-entity-id",
  "operation": "create",
  "baseVersion": null,
  "schemaVersion": 1,
  "clientCreatedAt": "2026-11-18T10:30:00Z",
  "payload": {
    "projectId": "project-id",
    "recordType": "decision",
    "title": "Selected local capture flow",
    "body": "Reason and context..."
  }
}
```

Requirements:

- IDs are generated once and retained across retries.
- `operationId` is unique per account and is the idempotency key.
- Client timestamps are useful metadata, not trusted ordering authority.
- Server timestamps and server sequence determine canonical ordering.
- Payload schemas are versioned.
- A client must not choose an owner/user ID for another account.

## 5. Synchronization protocol

Proposed logical endpoints:

| Endpoint | Purpose |
| --- | --- |
| `POST /v1/sync/push` | Submit a batch of queued operations |
| `GET /v1/sync/pull?cursor=...` | Retrieve server changes since an opaque cursor |
| `GET /v1/sync/status` | Read sync capability and server cursor metadata if needed |

Exact endpoint shape may change during API implementation, but idempotency, version checks and cursor semantics must remain.

### Push request

A push request contains the authenticated device identity and a bounded batch of operations. Server authorization is based on the authenticated session, not the payload.

### Push response

Return per-operation outcomes:

- `accepted`: server applied the operation or recognized a prior idempotent submission.
- `conflict`: the base version is stale; include the current server version and enough state to resolve.
- `rejected`: validation, authorization or policy failure; include a stable error code.
- `retryable`: temporary server failure; client retains the operation.

The server stores idempotency results for long enough that clients can safely retry after extended offline periods. Reusing the same operation ID with a different payload must be rejected.

### Pull response

A pull response contains:

- Ordered server changes.
- Change type and entity ID.
- New server version or tombstone.
- Server sequence.
- An opaque next cursor.

The cursor is scoped to the authenticated account. The client stores the returned cursor only in the same local transaction that applies all changes in that response.

## 6. Client synchronization flow

1. Open local database and restore the last confirmed cache, pending outbox and cursor.
2. Render cached project data immediately where available.
3. When online and authenticated, push queued operations in dependency order and in bounded batches. A child operation must not be sent before the server has accepted the parent entity it references.
4. Persist each per-operation acknowledgement and remove only acknowledged operations from the outbox.
5. Pull server changes from the last committed cursor.
6. Apply pulled changes to the canonical cache.
7. Rebuild the local projection by overlaying still-pending local operations.
8. Commit the new cursor with the applied changes.
9. Recompute visible sync state and last successful sync time.

Push before pull is the default proposal so that locally captured changes can receive server acknowledgement early. The sequence must remain safe if interrupted at any point.

A response may be received more than once. Reapplying it must not duplicate records or regress versions.

## 7. Conflict detection and resolution

### Version checks

For mutable entities, every update supplies `baseVersion`.

The server applies the update only when the current version matches the expected base version, unless a narrowly defined merge rule can prove that changed fields do not overlap and no business invariant is affected.

### V1 conflict policy

| Situation | Behaviour |
| --- | --- |
| Two clients create different timeline events | Accept both; unique IDs prevent collision |
| Two clients create separate experiments | Accept both |
| Two clients edit different project fields | Field-level merge may be allowed only when the patch and invariants are proven independent |
| Two clients change the same field | Return conflict; preserve both proposals |
| Two clients edit the same experiment version | Return conflict; preserve local draft and current server state |
| A record is corrected while another client references it | Preserve original and correction relationship |
| A local update targets a deleted/tombstoned entity | Return conflict or explicit deleted-state response; do not silently recreate |

Do not use blind last-write-wins for project descriptions, experiment results, snapshots or historical records.

### User resolution

A conflict view should show:

- The server-confirmed version.
- The local proposed version.
- Which fields differ.
- The time and device associated with each proposal, labelled as client-reported time.
- Available actions: keep server, apply local proposal as a new update, or manually merge.

Choosing the local proposal creates a new operation based on the latest server version. Never replay the stale operation unchanged. Until resolution, preserve both versions.

### Event correction

Historical timeline events are not edited in place. Corrections create a new record with a relation such as `correctsRecordId` or `supersedesRecordId`. The UI should show the correction relationship and avoid presenting superseded content as the current interpretation.

## 8. Delete and tombstone behaviour

Synchronized deletion uses tombstones so other devices learn that an item was removed.

- A tombstone is a server-side change-feed event.
- Clients must not resurrect a tombstoned object by replaying an old create.
- Tombstones remain long enough to cover supported offline periods and resynchronization.
- A full account deletion follows a separate purge/backup-retention process.
- Archive is not deletion. Archive/restore is a project lifecycle transition that preserves all records.

The exact tombstone retention period must be decided with the backup and deletion policy before public beta.

## 9. Retry, authentication and cursor expiry

### Retryable errors

Network interruptions, timeouts, 5xx responses and rate limits retain the operation. Use exponential backoff with jitter and a bounded retry cadence. A user-initiated retry must remain available.

### Authentication expiry

If the session expires:

- Pause authenticated sync.
- Preserve the outbox.
- Ask the user to sign in again.
- Resume only after the authenticated account is confirmed to own the queued data.

Never upload an old device queue into a different signed-in account.

### Permanent rejection

Validation or authorization failures are not retried indefinitely. Keep the local content, mark the operation as requiring attention and explain the reason.

### Cursor expiry

If the server no longer accepts a cursor:

- Preserve all local pending operations.
- Request a full authorized resync.
- Reconcile canonical server state with pending local proposals.
- Do not discard the outbox or overwrite local drafts during the reset.

## 10. Offline UX contract

Every client must distinguish:

| State | Meaning |
| --- | --- |
| Saved locally | Local database transaction completed |
| Pending sync | Operation awaits server processing |
| Syncing | Request is currently in progress |
| Synchronized | Server acknowledged the operation |
| Conflict | Server has a different version requiring resolution |
| Needs attention | Operation was rejected and needs user action |
| Offline | Server cannot currently be reached |

The UI must not display a green cloud/synchronized state immediately after a local write. A successful local write and a successful cloud sync are different events.

## 11. Data integrity and security

- Every API operation is authenticated and authorized.
- Server validates ownership for every referenced project, record and repository association.
- Use TLS for client/server traffic.
- Sensitive session material belongs in platform-secure storage, not ordinary project tables.
- Avoid logging record bodies, tokens or private repository information.
- Local caches must be scoped to the signed-in account and cleared or safely isolated at sign-out.
- Schema migrations must preserve pending operations and support recovery.
- Backup/restore tests must include project records, relationships, versions and sync metadata.
- Export must not depend on the sync cursor or remote model provider.

The exact local at-rest encryption approach is a Phase 0 security decision; do not claim SQLite or IndexedDB is encrypted by default.

## 12. V1 non-goals

- Full offline binary attachment upload.
- Continuous background synchronization guarantees.
- Collaborative real-time editing.
- CRDT/OT infrastructure.
- Multi-user shared projects.
- Automatic conflict resolution for arbitrary rich text.
- Silent last-write-wins for important project data.

## 13. Acceptance tests

1. Create a text record offline on Android, force-close the app, reopen it and verify the record remains queued.
2. Reconnect and verify exactly one server record is created.
3. Retry the same operation ID and verify the server returns the previous result without duplication.
4. Create records on web and native while offline, reconnect both and confirm all distinct events exist.
5. Update the same project field from two devices based on the same version and confirm a conflict is reported.
6. Resolve a conflict by keeping the local proposal and verify it is submitted against the newest server version.
7. Expire a session while operations are queued and verify no data is lost or uploaded under another account.
8. Expire a sync cursor and confirm full resync preserves pending local edits.
9. Archive a project and verify that it remains available on every client with its timeline intact.
10. Restore from backup and verify entity relationships, event order and versions.

## 14. Decisions required during Phase 0

- Exact local schema and outbox serialization.
- Sync batch limits and cursor implementation.
- Which independent field changes can be safely merged.
- Tombstone and backup retention periods.
- Whether completed experiments become immutable or remain versioned with correction history.
- Whether offline reads include only recently opened projects or a user-selected cache set.

These are implementation decisions to validate before the sync engine becomes foundational code.
