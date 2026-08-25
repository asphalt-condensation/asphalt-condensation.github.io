# Security Policy

## Supported surface

Security reports are accepted for the current version of this support website, its deployment workflow, and repository automation on the `main` branch.

App security issues should be reported through the support path for the affected app unless a dedicated private app-security channel is published later.

## Reporting a website vulnerability

Use the repository's private GitHub security advisory form:

`https://github.com/asphalt-condensation/asphalt-condensation.github.io/security/advisories/new`

Do not open a public Issue for an unpatched vulnerability. Include the affected URL or file, impact, reproduction steps, and a minimal proof of concept. Do not include unrelated personal data.

## Scope guidance

In scope:

- A way to alter deployed content without repository authorization
- Workflow or dependency behavior that exposes a secret
- Cross-site scripting or unsafe HTML execution on the support site
- A repository configuration flaw that leaks private security reports

Not a security vulnerability:

- General app support questions
- Public information already intentionally displayed on the site
- Availability issues caused by GitHub Pages itself
- Requests to add a private support channel

No response-time or bounty commitment is made by this policy.
