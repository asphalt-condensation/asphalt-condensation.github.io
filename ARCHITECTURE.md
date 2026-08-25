# Architecture

## System boundary

This repository owns a public static support website and GitHub-based support intake. It does not own app binaries, app telemetry, App Store Connect records, customer accounts, or a private support backend.

The site intentionally has no server runtime. Astro validates content and renders HTML during the build. GitHub Pages serves the resulting `dist/` directory.

## Rendering flow

1. `src/content.config.ts` defines schemas for app manifests and Markdown pages.
2. `src/data/apps/*.json` provides app identity, locales, platform, status, icon, and support links.
3. `src/content/pages/**/*.md` provides localized support and privacy prose.
4. `src/pages/[...path].astro` maps each content entry's stable `route` to one static page.
5. Shared Astro components render the header, app identity, language selector, support/privacy tabs, and footer.
6. `astro build` writes static assets and HTML to `dist/`.
7. GitHub Actions uploads `dist/` as the Pages artifact and deploys it.

## Why a typed content layer

The support hub will outlive any one app. Typed collections make missing fields and malformed values fail at build time. The custom content validator adds cross-entry rules that a single-file schema cannot express, including required locale pairs, stable route patterns, icon existence, private-email rejection, and support URL consistency.

## Why one catch-all route

All app content uses a single rendering layout, while route strings live alongside the content. This avoids copying an Astro page component for every app and locale. It also makes route changes visible in content review and allows the validator to enforce the public URL contract.

## Public support boundary

GitHub Issue Forms provide the public intake surface. They are suitable for non-sensitive support and transparent issue tracking, but they are not a private communication channel. The site and forms repeatedly warn users not to post sensitive information.

The repository can add a dedicated support email or private form later if App Review requires one. That would be a policy and operations change, not a simple copy edit; update `docs/SUPPORT_OPERATIONS.md`, every contact section, Issue Forms, and relevant privacy disclosures together.

## Privacy boundary

The app privacy policy describes app behavior. A separate paragraph explains that viewing GitHub Pages or using GitHub Issues is governed by GitHub's systems. This prevents the app's "no collection" statement from being incorrectly extended to the hosting platform.

## Availability and rollback

GitHub Pages is the sole production host. A successful historical commit is the rollback unit. Reverting the offending commit and pushing `main` triggers a fresh deployment. Do not delete stable routes during an incident; restore them first, then investigate.

## Dependency policy

- Runtime dependency: Astro only.
- Development dependencies: type checking, formatting, structured frontmatter/HTML parsing, Playwright, and axe-core.
- No client JavaScript framework is shipped to visitors.
- Dependabot checks npm and GitHub Actions monthly.
- Major dependency upgrades require local `npm run check` and browser tests before merge.
