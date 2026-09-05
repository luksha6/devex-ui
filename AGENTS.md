# Agents

This package is `@luksha6/devex-ui`. Product kit for apps. Write a page once: people get layout, agents get markdown. UI for watching a run. The catalog is Storybook. Consumers import `dist`, not `src/`.

Do not mention external employers or job applications in this repository.

## Layout

- `src/tokens/` — the only hex. CSS variables for color, type, space, motion.
- `src/primitives/` — product kit, exported from `@luksha6/devex-ui`.
- `src/docs/` — pages, dual reader, and run UI, exported from `@luksha6/devex-ui/docs`.
- `src/foundations/` — Storybook MDX. Rule, specimen, one sentence of why.
- `src/styles/package.css` — tokens + reset. Apps load `@luksha6/devex-ui/styles.css`.

## Add a primitive

1. `src/primitives/Name/Name.tsx` + `Name.module.css`.
2. `Name.stories.tsx` and `Name.test.tsx` in the same folder. Stories show states. Tests fail if you strip `aria-*`.
3. Export from `src/index.ts`.
4. Do not import `@luksha6/devex-ui/docs` or `src/docs/`.
5. No hex. Controls use `--radius-control`. Panels use `--radius-panel`. No comments in polished source.
6. Primary is brand green. Danger is red. Success is green. Color is never the only channel.
7. Honor `prefers-reduced-motion`. Duration tokens already collapse under that media query.
8. Run `npm test && npm run lint && npm run build`.

## Add a page or agent surface

Same as a primitive, under `src/docs/Name/`, export from `src/docs/index.ts`. These modules may import primitives. If the surface is a run (stream, tool, status), put a specimen on `Guides/Agent surfaces` and say what you refused: toast-as-progress, spinner that never ends. Fail is red and named in type.

## Tokens

Hex, `rgb()`, and raw color literals belong in `src/tokens/` only. Components use `var(--color-*)`, `--space-*`, `--font-*`, `--duration-*`. `npm run lint` runs `scripts/ban-hex.mjs` and `scripts/ban-contrast.mjs`.

## Dual reader

Human and Agent are two faces of one AST (`DocBlock` in `src/docs/document.ts`). `renderHuman` and `toAgentMarkdown` take the same array. `AudienceSwitch` takes `blocks`. If you add a block type, update both faces and `document.test.ts`. Meaning that only exists in CSS is a bug. A long job is `Run`, not three widgets and not a toast.
