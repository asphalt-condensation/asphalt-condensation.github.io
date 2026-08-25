---
name: app-support-hub
description: Maintain and release the Asphalt Condensation multi-app support hub. Use when adding an app or locale, editing support or privacy content, changing GitHub Issue intake, preparing App Store support URLs, validating the static site, or diagnosing GitHub Pages deployment in this repository.
---

# App Support Hub

Use this skill only inside the Asphalt Condensation support-site repository.

## Establish context

1. Read the repository root `AGENTS.md` and inspect the worktree.
2. Classify the request as app onboarding, support content, privacy content, localization, UI, support operations, or release/deployment.
3. Read the smallest matching repository document from `docs/`.
4. For app-specific work, read `docs/apps/<slug>.md`, `src/data/apps/<slug>.json`, and every page for that app.

Read [`references/workflow-map.md`](references/workflow-map.md) when selecting files and checks. Read [`references/content-contract.md`](references/content-contract.md) before changing manifests, routes, apps, or locales. Read [`references/apple-release.md`](references/apple-release.md) for App Store or production-release work.

## Preserve factual boundaries

- Verify app behavior in the current app release source before changing collection, network, SDK, permission, local-storage, or deletion claims.
- If the app source is unavailable, mark the claim unverified and ask for the repository or evidence. Do not infer it.
- Keep private owner and App Review contact information out of this public repository.
- Keep GitHub's hosting/Issue behavior distinct from the app's privacy behavior.
- Treat existing public routes as stable external contracts.

## Perform the matching workflow

### Add an app

Run the deterministic scaffold with all required arguments:

```bash
npx rocket site new-app --slug <slug> --name "<English name>" --zh-name "<Chinese name>" --platform iOS
```

Then replace every placeholder with verified content, add the owned icon, update Issue Forms and labels, create `docs/apps/<slug>.md`, extend browser tests, and follow `docs/ADD_AN_APP.md`.

### Edit support content

Update the requested locale and review sibling locales for factual drift. Preserve the public-Issue warning, diagnostic guidance, destructive-action warnings, and privacy link.

### Edit privacy content

Follow `docs/PRIVACY_CHANGE_CHECKLIST.md`. Update all locales together when meaning changes. Reconcile the app manifest and App Store disclosure source. Update dates deliberately.

### Change UI or architecture

Follow `docs/DESIGN_SYSTEM.md` and `ARCHITECTURE.md`. Prefer semantic static HTML and shared components. Add schema or abstractions only when they reduce real multi-app duplication.

### Prepare or diagnose a release

Follow `docs/DEPLOYMENT.md`, `docs/REPOSITORY_SETTINGS.md`, and `docs/APP_STORE_CONNECT.md`. Verify live state because GitHub and Apple settings can drift. Do not claim the Issue-only contact strategy is guaranteed to pass App Review.

## Validate

After edits:

```bash
npx rocket site format
npx rocket site check
npx rocket site browsers
npx rocket site test
```

For visible changes, inspect desktop and mobile screenshots. Confirm app names wrap correctly, controls do not overlap, the icon is sharp, and all first-viewport actions remain visible.

## Report completion

State:

- files and public behavior changed;
- commands and browser checks run;
- production URLs affected;
- privacy facts that were verified or remain unverified;
- external steps still required;
- known App Review contact risk when relevant.

Do not commit, push, create a public repository, deploy, or change GitHub/App Store settings unless the owner explicitly requests that external action.
