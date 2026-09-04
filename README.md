# @luksha6/devex-ui

React design system. Product kit for apps. Write a page once: people get layout, agents get markdown. UI for watching a run.

MIT. Use it for anything.

- Catalog: [https://luksha6.github.io/devex-ui/](https://luksha6.github.io/devex-ui/)
- Source: [https://github.com/luksha6/devex-ui](https://github.com/luksha6/devex-ui)
- npm: [@luksha6/devex-ui](https://www.npmjs.com/package/@luksha6/devex-ui)

The GitHub repo and the npm package are both `luksha6/devex-ui`.

## Install

```bash
npm i @luksha6/devex-ui
```

React 18 or 19 is a peer. Install that yourself.

```ts
import '@luksha6/devex-ui/styles.css';
import { Button } from '@luksha6/devex-ui';
import { AudienceSwitch, Stream, type DocBlock } from '@luksha6/devex-ui/docs';
```

Load `styles.css` once. The JS entry does not apply CSS. Overlay primitives (`Dialog`, `Toast`, `Tooltip`) are client components. Do not import files from `src/`.

| Export                         | What you get                                                           |
| ------------------------------ | ---------------------------------------------------------------------- |
| `@luksha6/devex-ui/styles.css` | Tokens, reset, compiled modules, Onest. Required once per app.         |
| `@luksha6/devex-ui`            | Product kit: actions, forms, overlays, data, type                      |
| `@luksha6/devex-ui/docs`       | Pages, dual reader, and run UI, plus `renderHuman` / `toAgentMarkdown` |
| `@luksha6/devex-ui/tokens.css` | Token file only, if you need variables without the compiled modules    |

`.` is the product kit. `./docs` is pages, the dual reader, and UI for watching a run. People get layout. Agents get markdown from the same `DocBlock[]`. `Stream`, `ToolCall`, and `RunStatus` are for people watching a job. Primitives must not import the docs barrel.

## Work on this repo

```bash
npm i && npm run storybook
```

Local catalog: [http://localhost:6006](http://localhost:6006). Static build: `npm run build-storybook`.

## Laws

- One family: Onest. `--font-heading`, `--font-body`, and `--font-mono` alias `--font-sans`. Measure 68ch.
- Integer 4px space. Controls use `--radius-control`. Panels use `--radius-panel`. Icon buttons and chips use `--radius-full`.
- Primary is brand green `#22463d`. Danger is red `#cc1100`. Success is green `#306b00`. Warning is amber `#995200`. Control borders use `--color-border`; hairlines stay `--color-divider`.
- Color is never the only channel. Lifecycle and failure are labeled in type.
- Hex lives in `src/tokens/`. `scripts/ban-hex.mjs` fails the lint if a component invents one.
- Stories are not tests. Vitest holds the contract. Storybook shows states.
- Motion is state change. `prefers-reduced-motion` zeros duration tokens and skips loops.
- A toast cannot carry a long-running job. Latency, stream, tools, and failure live on the run.

Foundations: Color, Typography, Space, Motion. Guides: Installation, Dual reader, Layout, Agent surfaces.

## Scripts

| Command              | What it does                             |
| -------------------- | ---------------------------------------- |
| `npm run storybook`  | Catalog on port 6006                     |
| `npm test`           | Vitest                                   |
| `npm run lint`       | ESLint, Stylelint, Prettier, hex ban     |
| `npm run build`      | `dist` (JS, types, `styles.css`, tokens) |
| `npm pack --dry-run` | What a consumer would receive            |

See [AGENTS.md](./AGENTS.md) to add a primitive. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the review bar.
