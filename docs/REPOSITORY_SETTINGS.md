# Repository Settings

These are one-time and periodic settings outside the Git tree. Review them after repository creation and after ownership or GitHub policy changes.

## Identity

- Owner: `asphalt-condensation`
- Repository: `asphalt-condensation.github.io`
- Visibility: Public
- Default branch: `main`
- Description: `Official support and privacy pages for Asphalt Condensation apps.`
- Website: `https://asphalt-condensation.github.io/`
- Suggested topics: `app-support`, `privacy-policy`, `github-pages`, `astro`

## Features

- Issues: Enabled
- Issue Forms: supplied by the repository
- Blank issues: Disabled by configuration
- Discussions: Disabled until there is an active community need
- Wiki: Disabled; durable documentation belongs in `docs/`
- Projects: Optional; leave disabled initially
- Sponsorships: Disabled unless separately intended

## Pages

- Build and deployment source: GitHub Actions
- Custom domain: None initially
- Enforce HTTPS: Enabled when available

Do not choose `main / (root)` or a `docs/` branch source. The deployment artifact comes from `.github/workflows/pages.yml`.

## Actions

- Allow GitHub Actions required by this repository.
- Keep default `GITHUB_TOKEN` permissions read-only; workflows request narrowly scoped write permissions explicitly.
- Allow Actions to create and approve pull requests only if a future automation genuinely needs it.
- Keep scheduled Dependabot version-update pull requests disabled through `.github/dependabot.yml`.
- Review dependency versions manually each quarter and before major app releases.

## Security

- Private vulnerability reporting: Enabled
- Dependabot alerts: Enabled
- Dependabot security updates: Enabled
- Secret scanning: Enabled for public repositories
- Push protection: Enabled when available

The public `SECURITY.md` must match the enabled private reporting path.
Dependabot security pull requests must pass the Rocket checks and browser tests before merge.

## Branch protection or ruleset

After the initial publish, create a `main` ruleset where practical:

- block force pushes and branch deletion;
- require the Quality workflow for pull requests;
- require branches to be up to date before merge;
- allow the owner to perform an emergency revert, with follow-up review;
- do not require signed commits unless the owner's tooling is configured for them.

For a solo first release, direct pushes may remain temporarily allowed. The Pages workflow still blocks deployment when validation fails.

## Issues and labels

Run `Sync issue labels` once after first push. Verify `support`, `privacy`, `needs-triage`, `app:dungeon`, and `site`. GitHub's default `bug` label is used by the bug form.

## Periodic audit

Quarterly, or before a major app release:

- confirm Pages and Issue URLs load signed out;
- review collaborators and deploy keys;
- review Actions and dependency versions manually;
- confirm private vulnerability reporting works;
- check stale app statuses and policies;
- confirm Issue Forms list every active app;
- verify App Store Connect still points to stable routes.
