# Repository Instructions

## Mission

Maintain the official multi-app support and privacy website for Asphalt Condensation. The repository must remain independently understandable, safe to publish publicly, easy to extend, and suitable for App Store support and privacy URLs.

Speak Chinese with the repository owner unless they ask for another language. User-facing site content must follow the locale of the file being edited.

## Start every task here

1. Read `README.md` and this file.
2. Read only the documentation relevant to the requested change.
3. For app-specific work, read `docs/apps/<slug>.md`, the app manifest, and all locale pages for that app.
4. Use the repository-local `$app-support-hub` skill for onboarding apps, changing privacy/support content, preparing a release, or troubleshooting deployment.
5. Inspect the current worktree before editing. Preserve unrelated user changes.

## Non-negotiable public-safety rules

- Never publish a private maintainer email, phone number, legal address, App Store review contact, account identifier, credential, or secret.
- Never ask users to post personal or sensitive data in GitHub Issues. Issue copy must state that reports are public.
- Do not add analytics, advertising, cookies, tracking pixels, third-party fonts, remote scripts, chat widgets, or embedded forms without explicit owner approval and a privacy-policy review.
- Do not claim that an app collects no data until the current release build and its dependencies have been verified. Treat app privacy declarations as release facts, not reusable marketing copy.
- Do not silently change a privacy policy's meaning. Update its last-updated date and the corresponding App Store disclosure when data practices change.
- Do not repurpose GitHub private security advisories as a general private support inbox. They are only for repository security vulnerabilities.
- Do not change stable public routes after release. If a route must move, preserve the old URL with an explicit redirect and document the migration.

## Source of truth

- App identity, supported locales, support intake URL, release status, platform list, and icon path: `src/data/apps/<slug>.json`
- Public support and privacy prose: `src/content/pages/<slug>/<locale>/*.md`
- Cross-file structural invariants: `scripts/validate-content.mjs`
- Rendered HTML and internal link invariants: `scripts/validate-dist.mjs`
- Browser behavior and accessibility: `tests/e2e/site.spec.ts`
- Public issue intake: `.github/ISSUE_TEMPLATE/`
- App-specific operational facts: `docs/apps/<slug>.md`

Do not duplicate mutable facts in a new file unless the documentation explicitly requires a snapshot. Link to the source of truth instead.

## URL contract

The domain is `https://asphalt-condensation.github.io`.

- Default-locale support: `/<app>/`
- Default-locale privacy: `/<app>/privacy/`
- Additional-locale support: `/<app>/<locale>/`
- Additional-locale privacy: `/<app>/<locale>/privacy/`

The default locale does not appear in the path. Locale codes are lowercase and use hyphens, for example `zh-hans`.

## Editing workflow

1. Establish the factual source for every requested content change.
2. Update the app manifest before adding routes that depend on a new locale or app.
3. Keep support and privacy pages complete in every declared locale.
4. Update the applicable Issue Form dropdown and `.github/labels.json` when adding an app.
5. Use owned app artwork under `public/apps/<slug>/`; do not hotlink assets.
6. Run `rocket site format` after manual edits.
7. Run `rocket site check` and `rocket site test` before considering the change complete.
8. For visible UI changes, inspect Playwright screenshots at desktop and mobile widths.
9. Update relevant docs when behavior, structure, commands, or release procedures change.

## Design rules

- Keep the site quiet, direct, operational, and easy to scan. It is a support tool, not a marketing landing page.
- Use the shared neutral palette with a restrained per-app accent. Do not create a one-color theme or decorative gradient background.
- Keep the local canvas particle field limited to the app directory, non-blocking, free of remote input, and static under reduced motion.
- Keep cards at an 8px radius or less. Do not nest cards or turn page sections into floating cards.
- Keep the app identity visible in the first viewport on app pages.
- Prefer semantic HTML and static rendering. Add client JavaScript only when the requirement cannot be met with HTML and CSS.
- Preserve keyboard navigation, visible focus, reduced-motion behavior, readable contrast, and mobile layout without horizontal overflow.
- Do not use remote fonts or icon services.

## Content rules

- Use plain, specific support language. Avoid promotional claims in troubleshooting and policy pages.
- Explain destructive steps, such as deleting the app, before presenting them as fixes.
- Keep public contact instructions honest: GitHub Issues are public and require a GitHub account.
- Do not imply a response-time guarantee unless the owner has explicitly adopted one.
- Privacy policy dates use an explicit English month name or unambiguous Chinese date format.
- External privacy statements must distinguish app behavior from GitHub Pages and GitHub Issues behavior.
- Every privacy page covers collection, local storage, network access, third parties, children's privacy, changes, and contact options as applicable.

## Commands

```bash
npm ci
npx rocket site launch
npx rocket site format
npx rocket site check
npx rocket site browsers
npx rocket site test
```

Use `rocket` without `npx` when the global CLI is available. The pinned
project-local version remains the CI source of truth. Direct npm commands are
implementation details declared by `rocket.toml`, except for the initial
`npm ci` bootstrap.

Create a new app scaffold:

```bash
npx rocket site new-app --slug example-app --name "Example App" --zh-name "示例 App" --platform iOS
```

The scaffold is incomplete by design. Never remove `TODO` text just to make CI green; replace it with verified content.

## Deployment and external actions

- Pull requests run the quality workflow.
- A push to `main` runs the same static checks and browser tests, uploads `dist/`, and deploys through GitHub Pages.
- GitHub Pages must use **GitHub Actions** as its source.
- Creating a public repository, pushing commits, publishing Pages, changing repository settings, or posting Issues are external side effects. Confirm with the owner immediately before the final action unless they explicitly requested that exact action in the current task.
- Do not commit or push unless the owner asks. Stage only intended files.

## Completion criteria

A content or code change is complete only when:

- all declared locale pages are coherent;
- no placeholders or private email addresses are present in public files;
- `rocket site check` passes;
- `rocket site test` passes;
- visible changes were inspected at desktop and mobile sizes;
- related documentation is current;
- the final response names any remaining external setup or unverified app fact.

## Code review rules

- Flag any privacy claim that is not traceable to the current app behavior or dependency inventory.
- Flag additions of remote scripts, analytics, trackers, public private-contact data, or unstable support URLs.
- Flag a new app or locale that lacks both support and privacy pages, Issue Form coverage, an owned icon, or browser-test coverage.
- Flag route changes that break a previously published App Store URL without a redirect plan.
