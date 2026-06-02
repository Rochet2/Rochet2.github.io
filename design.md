# Design — RochetCode

A locked design system for this site. Every page reads this file before emitting
code. Do not regenerate per page — extend or amend this file when the system
needs to grow. Tokens live in [`tokens.css`](tokens.css); the page CSS
(`css/style.css`) references them by name and never inlines raw values.

## Genre

atmospheric (dark canvas) with a **playful** tone overlay — a WoW-modding code
catalogue that keeps the dark gaming heritage of the original site.

## Macrostructure family

- **Marketing pages** (`/`): Marquee Hero — compact left-biased hero that feeds a
  featured-catalogue teaser. Varies only the hero copy.
- **Hub pages** (`/downloads`): Catalogue / Ecosystem Index — a responsive card
  grid (icon · title · tags · blurb). The primary browse surface.
- **Content pages** (project posts, `/contact`, `404`): Long Document — project
  header (icon + title + tags), optional gallery, prose at a ~72ch measure,
  download chips.

## Theme — Nightforge

| Token | Value |
| --- | --- |
| `--color-paper`   | `oklch(15% 0.014 264)` |
| `--color-paper-2` | `oklch(19% 0.016 264)` |
| `--color-paper-3` | `oklch(24% 0.018 264)` |
| `--color-ink`     | `oklch(96% 0.005 264)` |
| `--color-ink-2`   | `oklch(75% 0.012 264)` |
| `--color-ink-3`   | `oklch(60% 0.012 264)` |
| `--color-rule`    | `oklch(31% 0.014 264)` |
| `--color-accent`  | `oklch(80% 0.13 80)` (WoW gold) |
| `--color-violet`  | `oklch(73% 0.12 300)` (secondary, tags only) |
| `--color-focus`   | `oklch(85% 0.14 85)` |

Diversification axes: **paper-band** dark · **display-style** geometric-sans ·
**accent-hue** warm (gold).

## Typography

- Display: `Space Grotesk`, weight 600–700, tracking `-0.02em`/`-0.03em`.
- Body: `Inter`, weight 400–500.
- Mono: `JetBrains Mono` — version tags, project tags, inline `code`, eyebrows.
- Hero display: `clamp(2.6rem, 5.5vw + 1rem, 5rem)`.
- Prose measure: `~72ch`.

Fonts are loaded once in `_layouts/default.html` via Google Fonts.

## Spacing

4-point named scale in `tokens.css`. Pages use named tokens
(`var(--space-md)`), never raw values.

## Motion

- Easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- Reveal: fade-in only on load (atmospheric — no slide, no bounce).
- Card hover: 4px lift + soft warm glow shadow.
- Reduced-motion: all transitions/animations disabled; gallery autoplay off.

## Microinteractions stance

- Silent state changes; no celebratory toasts.
- Focus rings show instantly (never animated), `2px` at `--color-focus`.
- Gallery: autoplay (4s) that pauses on hover/focus; prev/next + dot controls.

## CTA voice

- Primary: gold pill fill (`--color-accent`) with dark ink text, lifts on hover.
- Secondary: ghost pill — `1px` rule border, fills to accent outline on hover.
- Download links: mono "↓" chips on `--color-paper-2`, border brightens on hover.

## What pages MUST share

- The `RochetCode` wordmark + logo in the floating-pill nav (N5).
- The gold accent and its restrained placement (small surfaces, never on display text as gradient).
- `Space Grotesk` + `Inter` + `JetBrains Mono`.
- The CTA voice (pill shape, radii, padding rhythm).
- The project-header rhythm (icon + title + mono tags).
- The Ft5 statement footer with muted meta row.

## What pages MAY differ on

- Hero copy on the marketing page.
- Presence of a gallery / videos / downloads on content pages.
- Number of cards in the catalogue grid.

## Exports

See [`tokens.css`](tokens.css) for the canonical token source.

### tokens.css

```css
:root {
  --color-paper:      oklch(15% 0.014 264);
  --color-paper-2:    oklch(19% 0.016 264);
  --color-paper-3:    oklch(24% 0.018 264);
  --color-ink:        oklch(96% 0.005 264);
  --color-ink-2:      oklch(75% 0.012 264);
  --color-ink-3:      oklch(60% 0.012 264);
  --color-rule:       oklch(31% 0.014 264);
  --color-accent:     oklch(80% 0.13 80);
  --color-accent-ink: oklch(22% 0.05 80);
  --color-violet:     oklch(73% 0.12 300);
  --color-focus:      oklch(85% 0.14 85);

  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur: 240ms;
}
```
