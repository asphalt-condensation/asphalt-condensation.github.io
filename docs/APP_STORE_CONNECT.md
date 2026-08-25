# App Store Connect Mapping

Last verified against Apple documentation: August 25, 2026.

## Field mapping

For each app version and localization:

| App Store Connect field               | Site value                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| Support URL, default locale           | `https://asphalt-condensation.github.io/<app>/`                              |
| Support URL, additional locale        | `https://asphalt-condensation.github.io/<app>/<locale>/`                     |
| Privacy Policy URL, default locale    | `https://asphalt-condensation.github.io/<app>/privacy/`                      |
| Privacy Policy URL, additional locale | `https://asphalt-condensation.github.io/<app>/<locale>/privacy/`             |
| Marketing URL                         | Optional; do not reuse the support URL merely to fill the field              |
| User Privacy Choices URL              | Optional; omit for a no-account, no-collection app unless real choices exist |

Use the complete `https://` URL and verify it in a signed-out browser before submission.

## Apple requirements relevant to this repository

Apple's current App Store Connect reference says:

- a Support URL is required and can be localized;
- the Support URL is displayed to users who downloaded the app;
- it must lead to actual contact information, with legal address, email address, or telephone number listed as examples when required by local law;
- a privacy policy URL is required for all apps;
- App Privacy answers must include the behavior of third-party partners and must remain accurate when practices change.

Official references:

- [Platform version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)
- [Manage app privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/)
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

## Known Issue-only support risk

The initial repository design uses GitHub Issues as the only public support channel and intentionally does not publish the private App Review contact email. This is an owner-approved launch experiment, but it may not satisfy Apple's current wording about actual contact information.

Before submission:

1. Confirm the support page loads and the Issue chooser accepts reports.
2. Make the public nature and GitHub-account requirement obvious.
3. Keep the private App Review contact complete in App Store Connect.
4. Be prepared to add a dedicated public support email or private web form if App Review rejects the Support URL.

Do not claim that an Issues-only page is guaranteed to pass review.

## Privacy answers

The website policy and App Store App Privacy answers are separate obligations and must agree. For a verified no-data app, App Store Connect currently offers `No, we do not collect data from this app.` Select it only after checking first-party code and every embedded third-party SDK in the uploaded build.

The public policy must remain reachable even if the app is retired. Update URLs only while the App Store record is editable, and preserve old routes when possible.

## Release verification

Before entering URLs:

- production Pages deployment succeeded;
- all localized URLs return a real HTML page, not a repository README or redirect loop;
- support instructions identify the app and provide a working contact path;
- privacy policy identifies the app, effective date, data practices, and contact path;
- no private App Review-only information is visible;
- mobile layout and text wrapping are readable;
- the app manifest status and policy match the uploaded build.

Record final URLs in the app repository's App Store metadata source so the website and submission do not drift.
