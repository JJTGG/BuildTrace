
# Contributing to BuildTrace

Thank you for taking an interest in BuildTrace.

## Current project stage

BuildTrace is in pre-implementation Phase 0. The product direction and initial specifications exist, but the proposed stack and several implementation details still require validation.

At this stage, please open or join an issue to discuss a substantial proposal before sending implementation code. This helps avoid building against assumptions that have not yet been tested.

## Before proposing a change

Please:

1. Explain the problem the change solves.
2. Describe the intended behaviour and affected platform(s).
3. Check whether the proposal changes an agreed product boundary or V1 exclusion.
4. Identify new dependencies, external services, data collection or operating costs.
5. Include relevant alternatives and trade-offs for architectural proposals.

BuildTrace is intended to remain free and open source. Do not introduce subscriptions, paid feature tiers, advertisements, data-sale mechanisms or mandatory paid AI services into the product.

## Pull requests

When implementation contributions are open, pull requests should:

- Stay focused on one coherent change.
- Explain the reason for the change and its observable effect.
- Include tests or validation evidence appropriate to the change.
- Document migration, security, privacy or operational implications.
- Avoid unrelated formatting or refactoring.
- Avoid including credentials, personal data or production user data.

Do not add a dependency without explaining why it is needed and considering its license, maintenance, security and runtime cost.

## Development conventions

The exact package manager, runtime versions, lint rules, test commands and commit conventions will be documented after Phase 0 validates the toolchain. Do not assume that a provisional technology choice is already a pinned project standard.

## Licensing and contribution terms

The intended project license is GNU AGPL-3.0-or-later, subject to final review. A license file and any additional contribution terms will be published before the project begins accepting substantive code contributions. Until then, do not assume that submitting a patch automatically grants broad reuse rights or that the intended license has already taken effect.
