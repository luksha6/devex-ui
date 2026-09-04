# @devex/ui

React 18/19 design system for dual-reader engineering docs (human layout + agent markdown from one AST). Catalog is Storybook. Package name: `@devex/ui`. Work lives in `devex/`.

Do not mention external employers or job applications in repository files.

## Commands (cwd: `devex/`)

| Task | Command |
| --- | --- |
| Catalog | `npm run storybook` (port 6006) |
| Test | `npm test` |
| Lint | `npm run lint` (ESLint, Stylelint, Prettier, hex ban) |
| Typecheck + dist | `npm run build` |
| Pack sanity | `npm pack --dry-run` |

After generating UI or changing the library, run `npm test && npm run lint && npm run build`. Do not skip hooks.

## Laws

- Import `@devex/ui` and `@devex/ui/docs`. Never deep-import `src/` or `dist/` files. Load `@devex/ui/styles.css` once. Onest ships with that file.
- Consumers: no raw `<button>`, `<input>`, `<select>`, `<textarea>` for chrome. No hex, raw `px` spacing, Tailwind, or `p-[13px]`. Tokens only (`var(--color-*)`, `--space-*`). Controls `--radius-control`. Panels `--radius-panel`. 4px space. 68ch.
- Native HTML is allowed only inside `devex/src/primitives` and `devex/src/docs` while implementing those modules.
- Primary = brand green. Danger = red. Success = green. Warning = amber. Deprecated = gray. Color is never the only channel.
- Dialog is a single component (`open`, `onClose`, `title`, `children`, `actions`). There is no `Dialog.Header`. Drawer is the sheet (`side`: bottom \| end). MultiSelect is search + chips, not `<select multiple>`.
- Toasts are out-of-band. Mount `ToastProvider` (`Toaster`). Call `useToast()` from inside it. Long jobs use `RunStatus`, `Stream`, `ToolCall`. Fail is red and named.
- One `DocBlock[]` → `renderHuman` + `toAgentMarkdown`. `AudienceSwitch` takes `blocks`, not `children` + `agentSource`. Stories are not tests.

## Pointers

- Components and props: `.claude/rules/components.md`
- Tokens: `.claude/rules/tokens.md`
- Cursor: `.cursor/rules/design-system.mdc`
- Package agent notes: `devex/AGENTS.md`
- Visual laws: `.cursor/rules/devex-laws.mdc`
- Hex ban: `.cursor/rules/devex-hex.mdc`
- Dual reader / agent runs: `.cursor/rules/devex-dual-reader.mdc`
