# Design System

## Product character

This is an operational support site. It should feel quiet, trustworthy, fast, and easy to scan. The design gives each app enough identity to be recognizable without turning support pages into marketing campaigns.

## Layout

- Shared content width: 1040px for app pages, 1120px for global header/footer.
- Mobile gutters: 14px per side minimum.
- App page first viewport: app icon, localized app name, platform/status, summary, support/privacy navigation, and language controls.
- Prose width: 760px maximum for readable policy and troubleshooting text.
- Page sections are unframed. Cards are reserved for repeated app rows.

## Shape and spacing

- General radius: 6px.
- App icon radius: 8px maximum.
- Avoid nested cards, floating section containers, pills used as buttons, and decorative shapes.
- Stable icon dimensions prevent layout shift: 112px desktop, 80px app-page mobile, 88px hub desktop, 64px hub mobile.

## Color

The base palette combines neutral paper/surface colors, dark ink, a burgundy primary action, teal links, and amber warnings. The dark brand header and footer frame lighter operational content. A manifest's app accent appears in small identity details only.

When adding an accent:

- ensure text or borders using it meet contrast requirements;
- do not recolor the whole site around the app;
- do not add gradients, glow effects, or remote theme assets;
- test status text and the hub border against both paper and white surfaces.

## Typography

Use the system font stack. Do not load remote fonts. Do not scale font size directly with viewport width. Letter spacing remains `0` for headings and controls. Long names must wrap naturally without overlapping adjacent controls.

## Interaction

- Text links represent navigation.
- Filled text buttons represent clear commands, such as opening a support request.
- Tabs use `aria-current="page"` and remain ordinary links so every URL works without JavaScript.
- Focus outlines must remain visible.
- Reduced-motion preference disables smooth scrolling.

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
