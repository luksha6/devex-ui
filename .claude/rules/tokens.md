# @devex/ui tokens

There is no Tailwind and no framework utility classes. Consumers and components use CSS custom properties. Hex, `rgb()`, and raw color literals belong in `src/tokens/` only. `npm run lint` runs `scripts/ban-hex.mjs`.

Load `@devex/ui/styles.css` once (tokens + reset + compiled modules). `@devex/ui/tokens.css` is the token file alone if you need variables without compiled modules.

Onest is the only family. `styles.css` / `tokens.css` load 300/400/500. Prefer `--font-sans` in CSS. `--font-heading`, `--font-body`, and `--font-mono` alias it.

## Color — semantic (use these)

| Token                                                                              | Role                                                                                                                                         |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-bg`                                                                       | Page                                                                                                                                         |
| `--color-surface`                                                                  | Bands                                                                                                                                        |
| `--color-interactive-fog` / `--color-interactive-ink`                              | Table header wash and header type                                                                                                            |
| `--color-text`                                                                     | Ink                                                                                                                                          |
| `--color-text-muted`                                                               | Secondary copy, labels                                                                                                                       |
| `--color-interactive`                                                              | Brand green, next step (`#22463d`)                                                                                                           |
| `--color-interactive-deep`                                                         | Primary hover                                                                                                                                |
| `--color-interactive-ink` / `--color-interactive-mist` / `--color-interactive-fog` | Avatar tints                                                                                                                                 |
| `--color-chip`                                                                     | Neutral chip fill                                                                                                                            |
| `--color-danger`                                                                   | Destroy / fail (`#cc1100`)                                                                                                                   |
| `--color-danger-deep`                                                              | Danger hover                                                                                                                                 |
| `--color-success`                                                                  | Ok / complete (`#306b00`)                                                                                                                    |
| `--color-success-deep`                                                             | Success emphasis                                                                                                                             |
| `--color-warning`                                                                  | Caution / beta (`#995200`)                                                                                                                   |
| `--color-border`                                                                   | Control rings (inputs, outline secondary). ≥3:1                                                                                              |
| `--color-divider`                                                                  | Hairlines only. Do not use for input borders                                                                                                 |
| `--color-mark-bg`                                                                  | Selection, hover wash                                                                                                                        |
| `--color-focus`                                                                    | Focus-visible ring. Alias of `--color-interactive`. Chrome uses a 2px outline offset 2px. Fields paint the existing border — no second ring. |
| `--color-overlay`                                                                  | Dialog backdrop                                                                                                                              |

Status hues must pass 4.5:1 on `--color-bg` at 11px. Hex is inlined into these semantic tokens. Do not invent `--raw-*` in components.

## Color — lifecycle (`Tag`, masthead)

| Token                              | Kind                             |
| ---------------------------------- | -------------------------------- |
| `--st-stable` / `--st-stable-deep` | stable                           |
| `--st-beta`                        | beta (warning amber)             |
| `--st-dep` / `--st-dep-deep`       | deprecated (stone gray, not red) |
| `--st-int`                         | internal                         |

## Space

Integer 4px. Related = 8px. Sections = 24px. The scale skips 5 and 7.

| Token              | Value                                               |
| ------------------ | --------------------------------------------------- |
| `--space-1`        | 4px                                                 |
| `--space-2`        | 8px                                                 |
| `--space-3`        | 12px                                                |
| `--space-4`        | 16px                                                |
| `--space-6`        | 24px                                                |
| `--space-8`        | 32px                                                |
| `--border-width`   | 1px                                                 |
| `--callout-rule`   | 1px (same width as `--border-width`)                |
| `--radius-tight`   | 4px (checkboxes, list marks)                        |
| `--radius-control` | 12px (buttons, fields, search)                      |
| `--radius-panel`   | 16px (tables, dialogs, drawers)                     |
| `--radius-full`    | 9999px (icon buttons, chips, discs, radios, switch) |
| `--shadow-panel`   | Soft card lift                                      |
| `--z-overlay`      | 1000 (Dialog, Drawer)                               |
| `--z-toast`        | 1100                                                |
| `--z-tooltip`      | 1200                                                |

No `--space-5`, `--space-7`, `6px`, `13px`, or `padding: 10px`. Optical hairlines are not spacing.

Control heights: sm 28px, md 36px, lg 44px (`Button`, `IconButton`, `Input` sizes).

## Typography

| Token                                            | Value                  | Use                                      |
| ------------------------------------------------ | ---------------------- | ---------------------------------------- |
| `--font-sans`                                    | Onest                  | UI, prose, code. Prefer this             |
| `--font-heading` / `--font-body` / `--font-mono` | alias of `--font-sans` | One face. Kickers and figures stay Onest |
| `--text-label`                                   | 11px                   | Kickers, form labels, table headers      |
| `--text-mono`                                    | 13px                   | Code, numeric cells                      |
| `--text-body`                                    | 15px                   | Prose, buttons                           |
| `--text-title`                                   | 20px                   | Dialog title, h3                         |
| `--text-section`                                 | 28px                   | Section                                  |
| `--text-display`                                 | 36px                   | Page title                               |
| `--leading-label`                                | 1.2                    |                                          |
| `--leading-body`                                 | 1.73                   |                                          |
| `--leading-title`                                | 1.2                    |                                          |
| `--leading-display`                              | 1.04                   |                                          |
| `--measure-prose`                                | 68ch                   | Article column                           |
| `--tracking-kicker`                              | 0.12em                 | Uppercase kickers                        |

Table headers are sentence-case labels (sans, weight 500) on `--color-interactive-fog` with `--color-interactive-ink` and a primary rule under the row. Form labels are sentence case, 11px, weight 400.

## Motion

| Token             | Value                        |
| ----------------- | ---------------------------- |
| `--duration-fast` | 120ms                        |
| `--duration-base` | 180ms                        |
| `--duration-loop` | 800ms                        |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |

Under `prefers-reduced-motion`, all three durations collapse to `0.01ms`. Skip loops (caret, spinner animation) but still show the result. Opacity only for state change. No bounce, no hero motion.

## CSS modules (library and consumers)

```css
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.input {
  min-height: 36px;
  padding: var(--space-2) var(--space-3);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-control);
  color: var(--color-text);
}
```

No `@apply`, no `p-3`, no `p-[13px]`, no `bg-[#22463d]`. Do not invent `--violet-600`, `--rarity-*`, or `--color-border-strong`.
