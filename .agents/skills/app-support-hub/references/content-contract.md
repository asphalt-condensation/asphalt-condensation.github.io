# Content Contract

## Required pair

Every locale declared by an app must have one `support` page and one `privacy` page. Missing content fails validation; there is no runtime fallback.

## Stable routes

- Default support: `<slug>`
- Default privacy: `<slug>/privacy`
- Additional support: `<slug>/<locale>`
- Additional privacy: `<slug>/<locale>/privacy`

Frontmatter routes omit leading and trailing slashes. Public URLs include a trailing slash.

## Public data

Reject:

- maintainer or App Review-only contact details;
- credentials, account IDs, private logs, and user reports;
- unresolved placeholders;
- claims copied from an app version that was not inspected;
- third-party assets without documented rights.

## Privacy synchronization

When policy meaning changes, align every locale, `collectsData`, the app repository's store metadata, and App Store Connect answers. A no-data statement must cover third-party SDK behavior as well as first-party code.

## Validation source

The executable cross-file contract is `scripts/validate-content.mjs`. The full field schema is in `src/content.config.ts` and documented in `docs/CONTENT_MODEL.md`.
