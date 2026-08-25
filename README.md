# Asphalt Condensation Support Hub

Official support and privacy pages for apps published by Asphalt Condensation.

This repository is designed to be opened as a standalone Codex project. Durable repository instructions live in [`AGENTS.md`](AGENTS.md), and the reusable maintenance workflow lives in [`.agents/skills/app-support-hub/`](.agents/skills/app-support-hub/).

## Live URLs

The repository is intended to be published as the GitHub organization or user Pages repository `asphalt-condensation/asphalt-condensation.github.io`.

- Support hub: `https://asphalt-condensation.github.io/`
- Dungeon support: `https://asphalt-condensation.github.io/dungeon/`
- Dungeon privacy: `https://asphalt-condensation.github.io/dungeon/privacy/`
- Dungeon Chinese support: `https://asphalt-condensation.github.io/dungeon/zh-hans/`
- Dungeon Chinese privacy: `https://asphalt-condensation.github.io/dungeon/zh-hans/privacy/`
- Public support intake: `https://github.com/asphalt-condensation/asphalt-condensation.github.io/issues/new/choose`

The URLs become live only after the public repository exists, GitHub Pages is configured to use GitHub Actions, and the deployment workflow completes.

## Principles

- One repository and one stable domain support multiple apps.
- Every app has a typed manifest and support/privacy pages for every declared locale.
- Public support uses structured GitHub Issue Forms.
- Public pages contain no private contact email or sensitive maintainer information.
- The site has no analytics, advertising, trackers, cookies, third-party fonts, or client-side application framework.
- Privacy statements must describe the released app build, not intentions or guesses.
- CI blocks unresolved placeholders, missing translations, broken internal links, malformed metadata, serious accessibility violations, and responsive overflow.

## Quick start

Requirements: Node.js 24 and npm. Rocket is installed project-locally by the
bootstrap step, so CI and contributors use the same pinned CLI version.

```bash
npm ci
npx rocket site launch
```

The local site is available at `http://localhost:4321/`.

Run the complete local quality gate:

```bash
npx rocket site check
npx rocket site browsers
npx rocket site test
```

Format all supported files:

```bash
npx rocket site format
```

When Rocket is installed globally, omit `npx` and use the shorter
`rocket site <command>` form. `npm ci` remains the portable bootstrap because
the project-local Rocket binary does not exist until dependencies are
installed. Run `rocket inspect site` to view the complete command catalog.

## Adding an app

Start with the deterministic scaffold:

```bash
npx rocket site new-app --slug example-app --name "Example App" --zh-name "示例 App" --platform iOS
```

The scaffold intentionally creates `TODO` markers and no icon. The quality gate remains red until the content is truthful, the icon is supplied, Issue Forms are updated, and every required page is complete. Follow [`docs/ADD_AN_APP.md`](docs/ADD_AN_APP.md).

## Repository map

| Path                      | Purpose                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `src/data/apps/`          | Typed per-app manifests and locale declarations                |
| `src/content/pages/`      | Markdown support and privacy content                           |
| `src/pages/`              | Shared static routes, home page, 404 page, and sitemap         |
| `src/components/`         | Shared navigation and app presentation                         |
| `src/styles/`             | Site-wide design system                                        |
| `public/apps/`            | App icons and owned public assets                              |
| `.github/ISSUE_TEMPLATE/` | Public support intake forms                                    |
| `.github/workflows/`      | Quality, label sync, and Pages deployment                      |
| `.agents/skills/`         | Repository-local Codex skills                                  |
| `rocket.toml`             | Human-friendly local and CI command routing                    |
| `scripts/`                | Deterministic content and built-site validation                |
| `tests/e2e/`              | Desktop/mobile browser and accessibility tests                 |
| `docs/`                   | Architecture, operations, App Store, and handoff documentation |

## Documentation index

- [`ARCHITECTURE.md`](ARCHITECTURE.md): system boundaries and rendering flow
- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md): app and page schemas
- [`docs/ADD_AN_APP.md`](docs/ADD_AN_APP.md): complete onboarding procedure
- [`docs/LOCALIZATION.md`](docs/LOCALIZATION.md): locale and URL rules
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md): UI and accessibility constraints
- [`docs/SUPPORT_OPERATIONS.md`](docs/SUPPORT_OPERATIONS.md): Issue triage and public-contact policy
- [`docs/PRIVACY_CHANGE_CHECKLIST.md`](docs/PRIVACY_CHANGE_CHECKLIST.md): mandatory privacy review triggers
- [`docs/APP_STORE_CONNECT.md`](docs/APP_STORE_CONNECT.md): mapping site URLs to store fields
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): Pages deployment and rollback runbook
- [`docs/REPOSITORY_SETTINGS.md`](docs/REPOSITORY_SETTINGS.md): one-time GitHub settings
- [`docs/CODEX_HANDOFF.md`](docs/CODEX_HANDOFF.md): how a new Codex task should resume work
- [`docs/apps/dungeon.md`](docs/apps/dungeon.md): current Dungeon support facts

## License and ownership

See [`NOTICE.md`](NOTICE.md). Publishing this repository publicly does not by itself grant permission to reuse app names, icons, policies, or other brand assets.
