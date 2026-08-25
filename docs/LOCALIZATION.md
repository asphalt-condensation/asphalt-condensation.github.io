# Localization

## Locale strategy

The support hub uses explicit, stable locale paths. The default locale omits its code; additional locales include a lowercase hyphenated code.

Current Dungeon locales:

- `en`: default English
- `zh-hans`: Simplified Chinese

The site does not automatically redirect based on browser language. Automatic redirects make App Store links less predictable, complicate review, and can hide the canonical policy selected by a user. Language links are visible on every app page.

## Adding a locale

1. Add the locale code and label to the app manifest.
2. Add localized app name and summary under `localized`.
3. Create `support.md` and `privacy.md` under `src/content/pages/<app>/<locale>/`.
4. Follow the URL contract from `CONTENT_MODEL.md`.
5. Translate meaning, not sentence structure.
6. Confirm legal and privacy terminology with a fluent reviewer when practical.
7. Run all checks and inspect wrapping on mobile.

## Translation consistency

Keep these facts aligned across languages:

- what data is collected or not collected;
- what remains on the device;
- whether a network connection is used;
- deletion/reset consequences;
- support-channel visibility and account requirements;
- effective and last-updated dates;
- supported platforms and app status.

If one locale changes a material privacy fact, update every locale in the same pull request. Do not leave a translated policy describing an older release.

## Dates and names

- English dates use an unambiguous month name, such as `August 25, 2026`.
- Chinese dates use `2026 年 8 月 25 日`.
- Keep app names consistent with the corresponding App Store localization.
- `lang` attributes use the locale code from the manifest.

## Writing quality

Use natural support language. Avoid literal translations of idioms, marketing slogans, or legal boilerplate that is not relevant to the app. Preserve heading hierarchy and links, but allow paragraphs and examples to differ when that improves clarity.

## Fallback behavior

There is no hidden runtime fallback for missing content. The validator requires complete support and privacy pairs for every declared locale. This deliberate failure mode prevents a user from landing on a mixed-language or incomplete policy.
