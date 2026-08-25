# Privacy Change Checklist

Use this checklist for every new app, major app update, SDK change, backend change, or privacy-policy edit.

## 1. Inspect actual behavior

Review the release branch and uploaded-build configuration for:

- network clients and endpoints;
- analytics, crash reporting, attribution, advertising, and tracking SDKs;
- account creation, login, authentication, and identifiers;
- purchases, subscriptions, receipts, and payment metadata;
- cloud saves, sync, backups, or remote configuration;
- push notifications and device tokens;
- location, contacts, photos, microphone, camera, health, motion, Bluetooth, and other permissions;
- user-generated content, messaging, or support forms inside the app;
- local persistence, file storage, keychain, and `UserDefaults`;
- third-party libraries that transmit data even when the app does not call them directly;
- platform differences across iOS, iPadOS, macOS, watchOS, and tvOS.

Record the evidence location in the app repository. Do not put secrets or personal data in this public support repository.

## 2. Classify each data flow

For every value, determine:

- whether it leaves the device;
- who receives it;
- whether it can identify or be linked to a person or device;
- why it is processed;
- whether it is used for tracking;
- how long it is retained;
- how a user can delete or control it;
- whether a third party processes it under its own terms.

Local-only settings still belong in the public policy when they affect user expectations or deletion/reset instructions, even if Apple does not classify them as collected data.

## 3. Reconcile public surfaces

Update together:

- every localized privacy page;
- support troubleshooting affected by storage or permissions;
- the app manifest's `collectsData` flag;
- the app repository's App Store metadata source;
- App Store Connect App Privacy responses;
- optional privacy choices URL, if real choices now exist;
- in-app permission explanations and privacy links, if applicable.

## 4. Dates and versioning

- Change `lastUpdated` when meaning changes or a substantive factual review occurs.
- Change the policy effective date when a revised policy takes effect.
- Keep simple typo fixes from implying a new data practice, but still preserve accurate repository history.
- Do not publish a future effective date without a release plan explaining which app version it covers.

## 5. High-risk triggers

Stop release and request a deeper legal/privacy review when adding:

- advertising or cross-app/site tracking;
- data associated with children;
- health, financial, precise location, contacts, photos, audio, or other sensitive data;
- account deletion obligations;
- user-to-user content or moderation;
- sale or sharing of personal data;
- international transfers or a new backend processor;
- a private support channel that stores user messages or attachments.

## 6. Verify

Run `rocket site check` and browser tests. Read the rendered policy in every locale. Compare it line by line with App Store Connect answers and the actual release build.

The final reviewer should be able to answer: "What evidence supports every sentence that describes collection, transmission, storage, or deletion?"
