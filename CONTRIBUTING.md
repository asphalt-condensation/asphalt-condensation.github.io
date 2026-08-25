# Contributing

## Before editing

Read `AGENTS.md`, then read the specific documentation for your change. For app-specific content, review the app manifest and both support and privacy pages for every declared locale.

## Branch and pull request flow

1. Create a focused branch from the latest `main`.
2. Make the smallest coherent change.
3. Run `npm run format`.
4. Run `npm run check`.
5. Install Chromium once with `npx playwright install chromium`, then run `npm run test:e2e`.
6. Explain the factual source for privacy or app-behavior changes in the pull request.
7. Include desktop and mobile screenshots for visible layout changes.

Do not mix content-policy changes with unrelated dependency upgrades or visual redesigns.

## Public content

Everything committed to this repository should be treated as public. Do not add private contact details, credentials, unreleased account information, user reports, crash logs containing identifiers, or App Store review-only notes.

## Privacy changes

Follow `docs/PRIVACY_CHANGE_CHECKLIST.md`. A translation update may clarify wording but must not silently change the policy's meaning. Any change in app collection, network, analytics, advertising, tracking, account, purchase, cloud-sync, or SDK behavior requires a full policy and App Store disclosure review.

## New apps and locales

Use `docs/ADD_AN_APP.md` and `docs/LOCALIZATION.md`. A new app is incomplete until it has an owned icon, support and privacy pages for every declared locale, Issue Form coverage, label coverage, tests, and an app-specific context file under `docs/apps/`.

## Commit quality

Use a concise imperative commit subject. Commit generated `package-lock.json`, but never commit `dist/`, Playwright reports, test results, or local logs.
