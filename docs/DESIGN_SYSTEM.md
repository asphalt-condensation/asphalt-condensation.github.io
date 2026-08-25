# Design System

## Product character

This is an operational support experience. It should feel focused, modern, trustworthy, and fast. The directory resembles an app launcher; each app page guides the visitor from a topic choice to one answer at a time.

## Layout

- Directory width: 1120px. App content width: 920px. Footer width: 1120px.
- Mobile gutters: 14px per side minimum.
- App page first viewport: app icon, localized app name, platform/status, summary, support/privacy navigation, and language controls.
- Answer width: 780px maximum for readable policy and troubleshooting text.
- There is no persistent top bar. App pages use a compact back link, while the footer owns site-level identity.
- Page sections are unframed. Cards are reserved for repeated app tiles in the directory.

## Shape and spacing

- General radius: 8px maximum.
- App icon radius: 8px maximum.
- Avoid nested cards, floating section containers, and pills used as buttons.
- Stable icon dimensions prevent layout shift: 104px directory desktop, 84px directory mobile, 96px app-page desktop, and 74px app-page mobile.

## Color

The base palette combines near-black neutral surfaces, off-white text, burgundy identity details, teal links, and amber warnings. It is deliberately not a one-color theme. A manifest's app accent appears in status and hover details only.

When adding an accent:

- ensure text or borders using it meet contrast requirements;
- do not recolor the whole site around the app;
- do not add gradients, glow effects, or remote theme assets;
- test status text and app-tile borders against the dark surfaces.

The directory may use the local canvas particle field as a restrained interactive background. It must remain behind the content, avoid pointer capture, use no remote input, and become static when reduced motion is requested.

## Typography

Use the system font stack. Do not load remote fonts. Do not scale font size directly with viewport width. Letter spacing remains `0` for headings and controls. Long names must wrap naturally without overlapping adjacent controls.

## Interaction

- The full app tile is the directory navigation target.
- Tabs use `aria-current="page"` and remain ordinary links so every URL works without JavaScript.
- Markdown topic sections become native `details` disclosures when JavaScript runs. Only one answer is expanded at a time; without JavaScript, the complete document remains visible.
- Filled text buttons are reserved for clear commands, such as opening a support request.
- Focus outlines must remain visible.
- Reduced-motion preference disables smooth scrolling, motion transitions, and particle animation.

## Accessibility acceptance

- Exactly one `h1` per HTML page.
- Logical heading order.
- `lang` set to the page locale.
- Descriptive page titles and meta descriptions.
- Meaningful image alt text.
- Keyboard access to every link.
- No serious or critical axe-core violations.
- No horizontal overflow at tested desktop or mobile widths.

Automated checks do not replace visual review. Inspect screenshots for line breaks, controls that crowd each other, app-icon quality, first-viewport hierarchy, and accidental one-note color treatment.
