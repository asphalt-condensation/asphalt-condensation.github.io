# Deployment and Rollback

## Production model

Production is GitHub Pages for the repository `asphalt-condensation/asphalt-condensation.github.io`. The expected origin is `https://asphalt-condensation.github.io` with no repository-name base path.

`astro.config.ts` contains the canonical `site` value. The repository name and account owner are therefore part of the architecture; renaming either requires a URL migration.

## First deployment

1. Create the repository with the exact name `asphalt-condensation.github.io` under `asphalt-condensation`.
2. Make it public.
3. Push the reviewed `main` branch.
4. In **Settings > Pages**, choose **GitHub Actions** as the build and deployment source if it is not selected automatically.
5. In **Settings > General**, enable Issues and disable unused features according to `REPOSITORY_SETTINGS.md`.
6. In **Settings > Code security**, enable private vulnerability reporting.
7. Run the label-sync workflow if its initial path-triggered run did not occur.
8. Wait for `Deploy GitHub Pages` to complete.

The deployment workflow bootstraps dependencies with `npm ci`, then routes
public-safety checks, formatting, content relationships, types, the static
build, built links, browser setup, accessibility, and responsive overflow
through the pinned project-local Rocket commands before uploading `dist/`.

## Production smoke test

Open these in a signed-out browser:

- `/`
- `/dungeon/`
- `/dungeon/privacy/`
- `/dungeon/zh-hans/`
- `/dungeon/zh-hans/privacy/`
- `/404-test-path/`
- the Issue chooser
- the private-security-advisory link while signed in as the owner

Confirm HTTPS, canonical URLs, app icon rendering, language navigation, support/privacy tabs, mobile layout, and the absence of placeholder text.

## Routine deployment

Every push to `main` starts `.github/workflows/pages.yml`. A deployment is complete only when the `github-pages` environment reports success and the production smoke test passes.

Do not upload `dist/` to the repository. Do not switch Pages to deploy from a branch folder; that bypasses the required quality gate.

## Failure diagnosis

| Symptom                       | Check                                                                     |
| ----------------------------- | ------------------------------------------------------------------------- |
| `npm ci` fails                | `package-lock.json` is committed and matches `package.json`               |
| Rocket command fails          | `rocket.toml` command mapping and pinned CLI version                      |
| Public-safety check fails     | Email, private path, credential pattern, sensitive file, or commit email  |
| Content validation fails      | Missing locale pair, icon, route invariant, placeholder, or public email  |
| Astro check/build fails       | Schema mismatch, invalid frontmatter, or component type error             |
| Dist validation fails         | Broken internal URL, missing metadata, missing `h1`, or image alt issue   |
| Browser tests fail            | Navigation regression, axe violation, overflow, or local server startup   |
| Deploy job cannot publish     | Pages source, workflow permissions, environment, or repository visibility |
| Site shows 404 after success  | Exact repository name and `astro.config.ts` origin                        |
| Issue Form labels are missing | Run `Sync issue labels` and inspect its token permissions                 |

## Rollback

1. Identify the last known-good commit and the production-impacting change.
2. Revert the bad commit with a new commit; do not rewrite public history.
3. Push `main` and wait for the Pages workflow.
4. Re-run the production smoke test.
5. Open a follow-up Issue or pull request for the root cause.

If a privacy page is factually wrong, prioritize a corrected forward change. Preserve the old URL, update the last-updated date, and reconcile App Store disclosures immediately.

## Domain migration

Do not add a custom domain casually. A domain migration needs DNS ownership, HTTPS verification, redirect coverage, App Store URL updates, incident ownership, and a long-term renewal plan. GitHub's account Pages domain is intentionally the low-maintenance default.
