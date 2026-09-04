# @devex/ui

React primitives and documentation components for dual-reader engineering docs. Storybook is the catalog. `dist` is what other apps install.

```bash
cd devex && npm i && npm run storybook
```

Catalog: [http://localhost:6006](http://localhost:6006). No password. Static: `npm run build-storybook`.

```ts
import '@devex/ui/styles.css';
import { Button } from '@devex/ui';
import { PageMasthead, Stream } from '@devex/ui/docs';
```

Load `styles.css` once. The JS entry does not apply CSS. Overlay primitives (`Dialog`, `Toast`, `Tooltip`) are client components. Do not deep-import `src/`.

| Export                 | Contents                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `@devex/ui/styles.css` | Tokens, reset, compiled modules. Required once per app.                                        |
| `@devex/ui`            | Product primitives: actions, forms, overlays, data, type                                       |
| `@devex/ui/docs`       | Documentation composites, including agent run surfaces, plus `renderHuman` / `toAgentMarkdown` |
| `@devex/ui/tokens.css` | Token file only, if you need variables without the compiled modules                            |

## Laws

- One family: Onest. `--font-heading`, `--font-body`, and `--font-mono` alias `--font-sans`. Measure 68ch.
- Integer 4px space. Controls use `--radius-control`. Panels use `--radius-panel`. Icon buttons and chips use `--radius-full`.
- Primary is brand green `#22463d`. Danger is red `#cc1100`. Success is green `#306b00`. Warning is amber `#995200`. Control borders use `--color-border`; hairlines stay `--color-divider`.
- Color is never the only channel. Lifecycle and failure are labeled in type.
- Hex lives in `src/tokens/`. `scripts/ban-hex.mjs` fails the lint if a component invents one.
- `.` is the product kit. `./docs` is documentation composites. Primitives must not import docs.
- One AST, two faces: Human layout and Agent markdown from the same blocks.
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
