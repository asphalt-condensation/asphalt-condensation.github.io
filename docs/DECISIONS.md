# Decision Log

## ADR-001: One shared account Pages repository

- Status: Accepted
- Date: 2026-08-25

Use `asphalt-condensation/asphalt-condensation.github.io` for all app support and privacy pages.

Reasons:

- one stable domain for every future app;
- one deployment and dependency surface;
- consistent Issue intake and policies;
- no proliferation of single-app support repositories;
- account Pages avoids a repository-name base path.

Consequence: repository ownership and name are architectural. A rename needs URL migration and App Store updates.

## ADR-002: GitHub Issues as provisional public contact

- Status: Accepted with known risk
- Date: 2026-08-25

Use structured public GitHub Issue Forms initially and do not publish the owner's private App Review email.

Reasons:

- no dedicated public support mailbox is currently available;
- structured public reports are searchable and easy to triage;
- the owner prefers to add another channel only if release review requires it.

Risk: Apple's current App Store Connect reference says a Support URL must lead to actual contact information, listing legal address, email address, and telephone number as examples when required by local law. GitHub Issues alone may be rejected or may provide insufficient access for users without GitHub accounts.

Exit condition: if App Review objects, create a dedicated public support address or private support form, then update every support/privacy page, App Store metadata, and operations documentation together.

## ADR-003: Static Astro content architecture

- Status: Accepted
- Date: 2026-08-25

Use Astro static output with typed content collections, Markdown prose, and no default client JavaScript.

Reasons:

- typed build-time validation;
- reusable layout across apps and locales;
- small and accessible production output;
- compatible with GitHub Pages and owner-free hosting;
- simple local workflow for Codex and human maintainers.

Consequence: dynamic private support, accounts, or server-side forms require a separate service and a privacy/architecture review.

## ADR-004: Repository-native Codex context

- Status: Accepted
- Date: 2026-08-25

Use root `AGENTS.md` plus `.agents/skills/app-support-hub/` with progressive references and deterministic scripts.

Reasons:

- Codex can resume from a fresh task without chat history;
- instructions remain versioned with the system they govern;
- the structure follows current Codex repository and Agent Skills conventions;
- detailed knowledge stays discoverable without overloading initial context.
