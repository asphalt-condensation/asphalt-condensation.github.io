# Support Operations

## Current channel

General support is handled through public GitHub Issues in this repository. This is a deliberate low-cost first-release choice.

Benefits:

- stable public URL for App Store support;
- structured forms and searchable answers;
- no separate mailbox to expose or monitor;
- app and issue-type labels support multiple products.

Limitations:

- users need a GitHub account to post;
- all general reports are public;
- it is unsuitable for personal data, account recovery, legal notices, or private diagnostics;
- Apple may decide that a more conventional contact method is necessary.

If App Review rejects this approach, add a dedicated public support address or private support form. Do not publish the App Review contact address by default.

## Intake forms

- **App support request:** setup, controls, audio, display, local preferences, and general help.
- **App bug report:** reproducible product behavior with environment and steps.
- **General privacy question:** non-sensitive questions about published policy language.
- **Private security advisory:** website repository vulnerabilities only.

Blank issues are disabled to keep required privacy warnings and diagnostic fields in front of the user.

## Initial triage

For each new Issue:

1. Remove or redact accidentally posted sensitive information when repository permissions allow. Do not quote it in replies.
2. Identify the app, version, platform, and issue type.
3. Apply `app:<slug>` plus the appropriate type/status label.
4. Search for duplicates and link or consolidate reports.
5. Confirm whether the report describes support, a reproducible app defect, site content, or a security concern.
6. Ask only for the minimum additional public-safe information.
7. Close with a factual resolution, documentation link, duplicate link, or clear reason the report cannot be acted upon.

Do not promise a response time. Do not ask for device identifiers, Apple IDs, full names, email addresses, crash logs with personal fields, or private screenshots in a public Issue.

## Labels

`.github/labels.json` is the managed label source. `sync-labels.yml` creates or updates those labels after changes reach `main`. The workflow does not delete labels, because deletion could erase historical categorization.

Recommended pattern:

- type: `support`, `bug`, `privacy`, `site`;
- routing: `app:<slug>`;
- state: `needs-triage`, then GitHub defaults or future documented status labels.

## Escalation

- App crash or data-loss bug: reproduce in the app repository and link the private/public engineering work item without exposing user data.
- Incorrect privacy statement: treat as release-blocking until app behavior and App Store disclosure are reconciled.
- Website vulnerability: move to a private security advisory and remove exploit details from public discussion.
- App Review rejection of support contact: preserve Issues, add the required private channel, update pages and App Store metadata together.
- Abuse or spam: use GitHub moderation controls; do not engage through personal accounts outside the repository workflow.

## Closing and retention

Keep resolved Issues public when they contain reusable, non-sensitive troubleshooting context. Lock abusive threads when necessary. Never upload a private conversation into an Issue for historical completeness.
