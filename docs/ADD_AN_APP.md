# Add an App

This runbook creates a complete support surface, not only a page link.

## 1. Gather verified inputs

Before editing, obtain:

- final public app name in every supported locale;
- stable lowercase slug;
- owned 1024x1024 icon with no transparency when sourced from an iOS marketing icon;
- supported platforms and release status;
- concise support-oriented summary in every locale;
- actual controls, setup, and troubleshooting facts from the current build;
- complete data-flow and SDK inventory for the current release build;
- App Store privacy answers;
- intended public support channel;
- effective date for the privacy policy.

Do not infer privacy behavior from an older version, marketing description, or owner memory when source inspection is possible.

## 2. Run the scaffold

```bash
npm run new:app -- --slug example-app --name "Example App" --zh-name "示例 App" --platform iOS
```

The script creates:

- `src/data/apps/example-app.json`
- English support and privacy Markdown
- Simplified Chinese support and privacy Markdown
- `public/apps/example-app/`

It intentionally leaves `TODO` text and no icon. CI must fail until onboarding is complete.

If an app does not support Simplified Chinese, remove those scaffolded files and the locale from the manifest together. Do not publish machine-generated policy text without human factual review.

## 3. Add the icon

Place the owned icon at:

`public/apps/<slug>/icon.png`

Use a square PNG, ideally 1024x1024. Avoid hotlinks, App Store CDN URLs, third-party badges, or artwork copied from an app listing. Check it at both 112px and 64px rendered sizes.

## 4. Complete the manifest

Replace every placeholder. Choose one app accent with adequate contrast, but keep the shared neutral system intact. Confirm `defaultLocale`, locale ordering, status, platform, and links.

The `collectsData` value must agree with the released app and every localized privacy page.

## 5. Write support pages

At minimum, each locale includes:

- product/platform summary;
- public-Issue and sensitive-data warning;
- setup requirements;
- controls or core workflow;
- likely troubleshooting topics;
- what diagnostic details to include;
- support request link;
- privacy policy link.

Describe destructive remedies, such as reinstalling, with the data-loss consequence before asking the user to act.

## 6. Write privacy pages

Complete the review in `PRIVACY_CHANGE_CHECKLIST.md`. A minimal no-data app policy still distinguishes:

- no collection or transmission by the app;
- local-only values and how to remove them;
- network behavior;
- analytics, advertising, tracking, accounts, and third-party SDKs;
- children's privacy;
- future policy changes;
- public support limitations;
- GitHub Pages/Issues as separate third-party services.

## 7. Extend support intake

Update each applicable app dropdown under `.github/ISSUE_TEMPLATE/`. Add `app:<slug>` to `.github/labels.json`. Decide how maintainers will apply the app label; a future automation may derive it from form fields, but do not promise that routing until implemented.

## 8. Add maintainer context

Create `docs/apps/<slug>.md` with:

- public URLs;
- source app repository name, without local absolute paths;
- release status and platform;
- verified support facts;
- privacy evidence locations in the app repository;
- destructive troubleshooting behavior;
- known documentation limitations;
- last verification date.

Do not put App Review-only contact data or credentials in this public file.

## 9. Test

```bash
npm run format
npm run check
npx playwright install chromium
npm run test:e2e
```

Extend `tests/e2e/site.spec.ts` so the new app appears on the hub and its support, privacy, and language routes are navigable. Inspect desktop and mobile screenshots.

## 10. Release

Open a focused pull request. After merge, verify the Pages workflow, all public URLs, the Issue chooser, and the privacy policy in an unauthenticated browser. Only then enter the stable URLs in App Store Connect.

## Definition of done

The app is onboarded only when every declared locale has both page kinds, public URLs load anonymously, no placeholders or private email addresses exist, Issue Forms include the app, tests pass, visual QA passes, and the App Store metadata source records the final URLs.
