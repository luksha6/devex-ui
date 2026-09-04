# @luksha6/devex-ui components

React design system. Product kit for apps. Write a page once: people get layout, agents get markdown. UI for watching a run.

Consumers import from package barrels. Do not invent compound APIs that are not listed here.

```ts
import '@luksha6/devex-ui/styles.css';
import { Button, Dialog, Field, Radio, RadioGroup, ToastProvider } from '@luksha6/devex-ui';
import {
  AudienceSwitch,
  renderHuman,
  toAgentMarkdown,
  type DocBlock,
} from '@luksha6/devex-ui/docs';
```

Primitives (`@luksha6/devex-ui`) must not import `@luksha6/devex-ui/docs`. Pages, dual reader, and run UI may import primitives.

## Product kit (`@luksha6/devex-ui`)

### Actions

**`Button`** — `intent?: 'primary' | 'secondary' | 'ghost' | 'danger'` (default `primary`). `fill?: 'filled' | 'outline'` (primary defaults filled; secondary/danger default outline; ghost has no fill). `size?: 'sm' | 'md' | 'lg'`. `loading?: boolean`. `leading?` / `trailing?: ReactNode` (usually `<Icon />`). Label is sentence case. Extends `ButtonHTMLAttributes`. There is no `intent="link"`; navigation is `TextLink`. Icon-only is `IconButton`.

**`IconButton`** — icon-only. `label: string` (aria-label). Default `intent` is `secondary`. `children` is the glyph, usually `<Icon name="close" />`.

**`Icon`** — `name: IconName` (`check` | `close` | `search` | `chevron-down` | `chevron-up` | `chevron-right` | `caution` | `info` | `plus` | `minus` | `copy` | `external`). `size?: 12 | 16 | 20`. `label?` — omit for decorative.

**`TextLink`** — styled `<a>`. Use for inline navigation, not for the page’s one next step (`Button`).

### Forms

**`Field`** — labeled text field. `label: string`. `hint?`, `error?: string`, `size?: ControlSize`. Spreads remaining props to `Input`. Prefer this over bare `Input`.

**`Input`** — `size?: 'sm' | 'md' | 'lg'`. `size` is the control token, not HTML `size`.

**`Textarea`** — `label: string`, `hint?`, `error?`, `size?: ControlSize`. Native textarea attrs otherwise.

**`Select`** — `label: string`, `options: readonly { value: string; label: string; disabled?: boolean }[]`, `placeholder?`. Native `<select>` under the hood; consumers still use this component.

**`MultiSelect`** — same options as Select. Controlled `value: string[]`, `onChange(value: string[])`. Search filters. Selected values are chips under the field. `max?` blocks further adds. Not a native `<select multiple>`.

**`SearchField`** — `label: string`, `onClear?`. Clear is part of the control: it appears when the value is non-empty.

**`Checkbox`** — `label: ReactNode` plus input attrs (`checked`, `onChange`, …).

**`RadioGroup` + `Radio`** — compound. Group: `label`, `value`, `onChange`, `name?`. Visible legend. Each `Radio`: `value` + `label` (or `children`). Must nest `Radio` inside `RadioGroup`. Do not pass `onChange` to `Radio`. Brand ring always; selected is a brand fill with a 4px light pin.

**`Switch`** — `label`, `checked: boolean`, `onChange: (checked: boolean) => void`. Optional `offLabel` / `onLabel` (default Off / On). The label is a sibling of the switch, not a wrapping `<label>`. Pill with a filled selected side.

**`SegmentedControl`** — `label`, `options: { value, label }[]`, `value`, `onChange`. Generic over the option value. Home/End move selection. Use for Human/Agent and similar exclusive modes.

**`PropertyField`** — definition-list row: `label`, `hint?`, `children` (the control). `role="group"` with `aria-labelledby`.

### Overlays

**`Dialog`** — single component, not Radix/shadcn compound.

```ts
<Dialog
  open={open}
  onClose={onClose}
  title="Search sections"
  width="md" // 'sm' | 'md' — dialog width, not control size
  actions={<Button onClick={onClose}>Done</Button>}
>
  {children}
</Dialog>
```

Do not export or invent `Dialog.Root`, `Dialog.Header`, `DialogFooter`, `DialogContent`.

**`Drawer`** — sheet. Same card as Dialog: `open`, `onClose`, `title`, `children`, `actions?`. `side?: 'bottom' | 'end'` (default `bottom`). End becomes a bottom sheet under 640px. Use for filters and mobile chrome, not confirmations.

**`Tooltip`** — `content: ReactNode`, `children: ReactElement` (one focusable child). Opens on hover/focus, and on touch pointer. Escape closes. `aria-describedby` is set only while open.

**`ToastProvider` / `useToast`** — Wrap the click target and call `useToast()`. `Toaster` is the same export.

```ts
function Queue() {
  const { show } = useToast();
  return <Button onClick={() => show({ title: 'Reindex queued' })}>Queue</Button>;
}
<ToastProvider>
  <Queue />
</ToastProvider>
```

`useToast()` throws if no provider is mounted. Use after a job leaves the page. Do not toast Copied, Cite, Approve, or in-progress runs.

### Feedback and type

**`Alert`** — `kind?: 'note' | 'ok' | 'caution' | 'critical'`. `title?`, `children?`, `onDismiss?`. Critical uses `role="alert"`; others `status`. The kind word stays visible; title is extra.

**`Spinner`** — `size?: 12 | 16 | 20`. `label` defaults to `"Loading"`; pass `""` when the parent already names the busy state.

**`Text`** — `variant?: 'label' | 'body' | 'title' | 'section' | 'display' | 'mono' | 'kicker'`. Polymorphic `as?`. Kickers are uppercase mono. Form labels stay sentence case (`variant="label"`). Tabular figures belong on numbers, not every `mono` span.

**`Badge`** — `tone?: 'neutral' | 'count' | 'live'`.

**`Tag`** — `kind: Lifecycle` (`stable` | `beta` | `deprecated` | `internal`). All four kinds stay visible. Required fields use **`RequiredTag`**, not `Tag kind="req"`.

**`Avatar`** — `name: string`, `src?`, `size?: ControlSize` (`sm` / `md` / `lg`, 32 / 40 / 48). Disc. Initials use a hashed brand tint so names do not all look the same.

**`AvatarGroup`** — `label: string` (accessible name), wraps `Avatar` children, `max?`.

### Navigation and data

**`Nav`** — `brand`, `brandHref?`, `links?: { href, label, current? }[]`, `trailing?`.

**`NavItem`** — `href`, `current?`, `children`.

**`Tabs`** — controlled. `label`, `items: { id, label, panel, disabled? }[]`, `value`, `onChange`. Arrows and Home/End. Not `Tabs.List` / `Tabs.Panel`.

**`Table`** — `headers: ReactNode[]`, `rows: ReactNode[][]`. Sits in a `--radius-panel` shell. Headers are sentence-case labels on the brand fog wash, with a primary rule under the row. **`Mono`** — wrapper for ids/code in cells.

**`DataTable`** — `columns: { key, header, numeric?, mono?, sortable? }[]`, `rows: Record<string, ReactNode>[]`. `rowKey?`, `caption?`, `empty?`, `loading?` (`aria-busy`). Sorting: `sortKey`, `sortDir: 'asc' | 'desc'`, `onSort?(key)`. Only columns with `sortable: true` become sort buttons. Do not fake-sort React nodes inside the table; sort the row data you pass in. Already a panel — do not wrap it in another card.

## Pages and agent surfaces (`@luksha6/devex-ui/docs`)

**`toAgentMarkdown(blocks: readonly DocBlock[]): string`** — agent face.

**`renderHuman(blocks, { path?, commit? })`** — human face. Same array.

**`DocBlock`**

- `{ type: 'heading'; level: 2 | 3; id; text; since? }`
- `{ type: 'paragraph'; text }`
- `{ type: 'callout'; kind: CalloutKind; text }` (`note` | `caution` | `agent-only`)
- `{ type: 'code'; languages: { id, label, source }[]; testedAgainst?; testedAt? }`
- `{ type: 'parameters'; rows: { name, type, defaultValue, notes, required?, lifecycle?, replaces?, expectedGa? }[] }`

**`AudienceSwitch`** — `value: 'human' | 'agent'`, `onChange`, `blocks: readonly DocBlock[]`, optional `path` / `commit` for heading anchors. Human view is `renderHuman(blocks)`. Agent view is `toAgentMarkdown(blocks)`. Do not pass `children` or `agentSource`.

**`PageMasthead`** — `crumb`, `title`, `purpose`, `owner`, `verifiedAt`, `commit`, `words`, `tokens`, `lifecycle?` (defaults to `stable`), `expectedGa?`, `replaces?`. The Tag stays visible for stable, beta, deprecated, and internal.

**`CodeBlock`** — `languages: { id, label, source }[]`, `testedAgainst?`, `testedAt?`. Copy stays on the control.

**`ParameterTable`** — `rows: ParameterRow[]`. Render `Tag` only when `lifecycle` is set. `stable` is a visible chip, not a hidden default.

**`Callout`** — `kind: CalloutKind`, `children`. `agent-only` is collapsed until expanded (`defaultOpen?`). Toggle is a `Button`.

**`ResultRow`** — hit: `score`, `title`, `section`, `snippet`, `tokens`, `path`, `selected?`, `deprecated?`, `onSelect?`. Or `{ kind: 'withheld'; count; reason }`.

**`FreshnessStamp`** — `status: 'verified' | 'stale'`, `verifier`, `commit`, `indexWeight`, plus optional lag fields and `onClaim` / `onOpenDiff`.

**`SectionAnchor`** — `id`, `title`, `commit`, `path`, `as?: 'h2' | 'h3'`, `since?`. `citationUri(path, id, commit)` → `codex://…`.

### Agent run surfaces

**`RunStatus`** — `phase: 'pending' | 'running' | 'ok' | 'fail'`, `label`, `elapsedMs?`, `detail?`. Latency lives here, not in a toast.

**`Stream`** — `text`, `complete?`, `uncertainty?: 'none' | 'low' | 'high'`. Caret while incomplete. Reduced motion still shows the result.

**`ToolCall`** — `name`, `status: 'queued' | 'running' | 'ok' | 'fail'`, `args?`, `result?`, `latencyMs?`. Fail is red and named.

## Patterns

```tsx
<RadioGroup label="Audience" value={value} onChange={setValue}>
  <Radio value="human" label="Human" />
  <Radio value="agent" label="Agent" />
</RadioGroup>;

const blocks: DocBlock[] = [
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
];
<AudienceSwitch value={audience} onChange={setAudience} blocks={blocks} />;
```

When adding a primitive: `tsx` + CSS module + story + Vitest test, export from `src/index.ts`. Stories show states. Tests fail if you strip `aria-*`. No comments in polished source except brief interface JSDoc. Hex only in `src/tokens/`.
