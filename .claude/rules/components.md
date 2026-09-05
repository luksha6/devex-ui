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

**`Button`** — `intent?: 'primary' | 'secondary' | 'ghost' | 'danger'` (default `primary`). `fill?: 'filled' | 'outline'` (primary defaults filled; secondary/danger default outline; ghost has no fill). `size?: 'sm' | 'md' | 'lg'`. `loading?: boolean`. `leading?` / `trailing?: ReactNode` (usually `<Icon />`). `href?` paints a link with button styles. Label is sentence case. Extends `ButtonHTMLAttributes`. There is no `intent="link"`; inline navigation is `TextLink`. Icon-only is `IconButton`.

**`IconButton`** — icon-only. `label: string` (aria-label). Default `intent` is `secondary`. `children` is the glyph, usually `<Icon name="close" />`.

**`Icon`** — `name?: IconName` (`check` | `close` | `search` | `chevron-down` | `chevron-up` | `chevron-right` | `caution` | `info` | `plus` | `minus` | `copy` | `external` | `menu` | `calendar` | `upload`). Or pass `children` as a custom glyph. `size?: 12 | 16 | 20`. `label?` — omit for decorative.

**`TextLink`** — styled `<a>`. `as?` for a router `Link`. Drops `javascript:` and other unsafe hrefs. `target="_blank"` gets `rel="noopener noreferrer"` unless you pass `rel`.

### Forms

**`Field`** — labeled text field. `label: string`. `hint?`, `error?: string`, `size?: ControlSize`. Spreads remaining props to `Input`. Prefer this over bare `Input`.

**`Input`** — `size?: 'sm' | 'md' | 'lg'`. `size` is the control token, not HTML `size`.

**`Textarea`** — `label: string`, `hint?`, `error?`, `size?: ControlSize`. Native textarea attrs otherwise.

**`Select`** — `label: string`, `options: readonly { value: string; label: string; disabled?; group?; detail? }[]`, `placeholder?`. Native `<select>` under the hood; consumers still use this component. `group` / `detail` are for `Combobox`.

**`Combobox`** — one searchable value. Same options as Select. Controlled `value: string`, `onChange(value: string)`. Empty string is none. `clearLabel?`. Portaled list. Groups and `detail` render in the list.

**`DateField`** — labeled native `type="date"`. `label`, `hint?`, `error?`, `size?`. `min` / `max` are HTML attributes. Not a custom calendar.

**`FileUpload`** — drop or browse. Empty is a dashed tile. Files become a grid; images preview. Remove sits on the tile. Controlled `files: File[]`, `onChange(files)`. `accept?`, `multiple?`, `maxSize?`, `maxFiles?`. `addLabel?`. Too-large and too-many are named alerts. Not a base64 converter.

**`MultiSelect`** — same options as Select. Controlled `value: string[]`, `onChange(value: string[])`. Search filters. Selected values are chips under the field. `max?` blocks further adds. Not a native `<select multiple>`.

**`SearchField`** — `label: string`, `onClear?`. Clear is part of the control: it appears when the value is non-empty.

**`Checkbox`** — `label: ReactNode` plus input attrs (`checked`, `onChange`, …).

**`RadioGroup` + `Radio`** — compound. Group: `label`, `value`, `onChange`, `name?`. Visible legend. Each `Radio`: `value` + `label` (or `children`). Must nest `Radio` inside `RadioGroup`. Do not pass `onChange` to `Radio`. Brand ring always; selected is a brand fill with a 4px light pin.

**`Switch`** — `label`, `checked: boolean`, `onChange: (checked: boolean) => void`. Optional `offLabel` / `onLabel` (default Off / On). The label is a sibling of the switch, not a wrapping `<label>`. Pill with a filled selected side.

**`SegmentedControl`** — `label`, `options: { value, label }[]`, `value`, `onChange`. Generic over the option value. Home/End move selection. Use for Human/Agent and similar exclusive modes.

**`PropertyField`** — definition-list row: `label`, `hint?`, `children` (the control). `role="group"` with `aria-labelledby`.

### Overlays

**`Theme`** — `value: 'light' | 'dark'`. `root?: 'local' | 'document'`. Sets `data-devex` and `data-theme` on a root you own. Required so the reset applies. `useTheme()` reads the value.

**`Stack`** — vertical. `gap?: 1 | 2 | 3 | 4 | 6 | 8`. `as?`.

**`Cluster`** — horizontal wrap. Same `gap`. `as?`.

**`Page`** — `nav?`, `children` (68ch article), `rail?`. Skip link first. `skipLabel?`, `contentId?`. `measure?: 'prose' | 'wide'`.

**`AppShell`** — product chrome. `nav?`, `sidebar?`, `rail?`, article children. Skip link first. Default measure is `wide`. `sidebarLabel?` names the sidebar. `Page` is the docs measure without a sidebar.

**`Breadcrumb`** — `items: { label, href? }[]`. Last item is the page (`aria-current`). Separators are silent. `linkAs?`. Masthead `crumb` is a line of type, not this.

**`Accordion`** — stacked disclosures. `label`, `items: { id, title, panel, disabled? }[]`, `value: string[]`, `onChange`. `multiple?` (default exclusive). Not `Accordion.Item`. Chevron plus `aria-expanded`.

**`EmptyState`** — `title`, `body?`, `action?`. Named empty. Not a spinner.

**`Pagination`** — `page`, `onChange`, `pageCount?` or `hasMore?`. Previous / Next. Status in type. `previousLabel?` / `nextLabel?` / `status?`.

**`Dialog`** — single component, not Radix/shadcn compound.

```ts
<Dialog
  open={open}
  onClose={onClose}
  title="Search sections"
  width="md" // 'sm' | 'md' — dialog width, not control size
  closeLabel="Close"
  actions={<Button onClick={onClose}>Done</Button>}
>
  {children}
</Dialog>
```

Do not export or invent `Dialog.Root`, `Dialog.Header`, `DialogFooter`, `DialogContent`.

**`Drawer`** — sheet. Same card as Dialog: `open`, `onClose`, `title`, `children`, `actions?`, `closeLabel?`. `side?: 'bottom' | 'end'` (default `bottom`). End becomes a bottom sheet under 640px. Use for filters and mobile chrome, not confirmations.

**`Menu`** — actions on a control. **Not compound.** `label`, `items: { id, label, onSelect, disabled?, danger? }[]`, `open`, `onOpenChange`, single element child as the trigger. `align?: 'start' | 'end'`. `disabled?` disables the trigger. `dangerLabel?` names danger items. Arrows, Home, End, and typeahead move. Escape and click outside close. Tab closes. Portaled. Flips when it would clip. Does not lock page scroll. No `Menu.Item`.

**`Popover`** — interactive panel on a control. `label`, `open`, `onOpenChange`, `content`, one trigger child. `align?: 'start' | 'end'`. Portaled. Flips. Traps focus. Does not lock page scroll. Escape does not close a parent Dialog. Tooltip is description only. Menu is a list of actions.

**`CommandPalette`** — search and run. `open`, `onClose`, `commands: { id, label, onSelect, group?, detail?, shortcut?, disabled? }[]`. The kit paints the dialog. The app binds ⌘K. Not a page and not a Menu.

**`Card`** — panel. `title?`, `children?`, `actions?`. Optional `selected` + `onSelect`. Selected is a word (`Selected`) plus `aria-pressed`. Not a nested page.

**`Skeleton`** — placeholder. `variant?: 'text' | 'block' | 'disc'`. `lines?` for text. `label` names the wait (default `Loading`). Motion collapses under reduced motion.

**`Divider`** — hairline. `orientation?: 'horizontal' | 'vertical'`. Horizontal is an `hr`.

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

**`Nav`** — `brand`, `brandHref?`, `links?: { href, label, current? }[]`, `trailing?`. Under 640px the links move into a Drawer. `menuLabel?`, `closeLabel?`. `linkAs?` for a router `Link` on brand and items.

**`NavItem`** — `href`, `current?`, `children`.

**`Tabs`** — controlled. `label`, `items: { id, label, panel, disabled? }[]`, `value`, `onChange`. Arrows and Home/End. Not `Tabs.List` / `Tabs.Panel`.

**`Table`** — `headers: ReactNode[]`, `rows: ReactNode[][]`. Sits in a `--radius-panel` shell. Headers are sentence-case labels on the brand fog wash, with a primary rule under the row. **`Mono`** — wrapper for ids/code in cells.

**`DataTable`** — `columns: { key, header, numeric?, mono?, sortable? }[]`, `rows: Record<string, ReactNode>[]`. `rowKey?`, `caption?`, `empty?`, `loading?` (`aria-busy`), `loadingLabel?`, `footer?` (put `Pagination` here). Sorting: `sortKey`, `sortDir: 'asc' | 'desc'`, `onSort?(key)`. Only columns with `sortable: true` become sort buttons. Do not fake-sort React nodes inside the table; sort the row data you pass in. Already a panel — do not wrap it in another card.

## Pages and agent surfaces (`@luksha6/devex-ui/docs`)

**`toAgentMarkdown(blocks: readonly DocBlock[]): string`** — agent face.

**`renderHuman(blocks, { path?, commit? })`** — human face. Same array.

**`DocBlock`**

- `{ type: 'heading'; level: 2 | 3; id; text; since? }`
- `{ type: 'paragraph'; text: string | DocInline[] }` (`DocInline` is a string or `{ text, href?, strong?, code? }`)
- `{ type: 'callout'; kind: CalloutKind; text: string | DocInline[] }` (`note` | `caution` | `agent-only`)
- `{ type: 'code'; languages: { id, label, source }[]; testedAgainst?; testedAt? }`
- `{ type: 'parameters'; rows: { name, type, defaultValue, notes, required?, lifecycle?, replaces?, expectedGa? }[] }`
- `{ type: 'list'; ordered?; items: (string | DocInline[])[] }`
- `{ type: 'table'; headers: string[]; rows: string[][] }`
- `{ type: 'image'; src; alt; caption? }`
- `{ type: 'run'; phase; label; elapsedMs?; detail?; tools?; text?; uncertainty? }`

**`AudienceSwitch`** — `value: 'human' | 'agent'`, `onChange`, `blocks: readonly DocBlock[]`, optional `path` / `commit` for heading anchors. `audienceLabel?`, `humanLabel?`, `agentLabel?`, `hint?`. Human view is `renderHuman(blocks)`. Agent view is `toAgentMarkdown(blocks)`. Do not pass `children` or `agentSource`.

**`PageMasthead`** — `crumb`, `title`, `purpose`, `owner`, `verifiedAt`, `commit`, `words`, `tokens`, `lifecycle?` (defaults to `stable`), `expectedGa?`, `replaces?`. The Tag stays visible for stable, beta, deprecated, and internal.

**`CodeBlock`** — `languages: { id, label, source }[]`, `testedAgainst?`, `testedAt?`. Copy stays on the control. `copyLabel?`, `copiedLabel?`, `copyFailedLabel?`, `untestedLabel?`. Fail is red and named.

**`ParameterTable`** — `rows: ParameterRow[]`. Render `Tag` only when `lifecycle` is set. `stable` is a visible chip, not a hidden default.

**`Callout`** — `kind: CalloutKind`, `children`. `agent-only` is collapsed until expanded (`defaultOpen?`). Toggle is a `Button`.

**`ResultRow`** — hit: `score`, `title`, `section`, `snippet`, `tokens`, `path`, `selected?`, `deprecated?`, `onSelect?`. Or `{ kind: 'withheld'; count; reason }`.

**`FreshnessStamp`** — `status: 'verified' | 'stale'`, `verifier`, `commit`, `indexWeight`, plus optional lag fields and `onClaim` / `onOpenDiff`.

**`SectionAnchor`** — `id`, `title`, `commit`, `path`, `as?: 'h2' | 'h3'`, `since?`. `citationUri(path, id, commit)` → `codex://…`.

### Agent run surfaces

**`Composer`** — start a run. `label`, `value`, `onChange`, `onSubmit(value)`. `submitLabel?` (Send). Control or Command plus Enter sends. Empty cannot send. Fail is a named `error`. A toast cannot carry the job. Watch the result with `Run`.

**`Run`** — one surface for a job. `phase`, `label`, `elapsedMs?`, `detail?`, `tools?`, `text?`, `uncertainty?`, `actions?`, `phaseLabels?`. Renders `RunStatus` + `ToolCall[]` + `Stream`. Fail is red and named.

**`RunStatus`** — `phase: 'pending' | 'running' | 'ok' | 'fail'`, `label`, `elapsedMs?`, `detail?`, `phaseLabels?`. Latency lives here, not in a toast. Prefer `Run` when the job has tools or a stream.

**`Stream`** — `text`, `complete?`, `uncertainty?: 'none' | 'low' | 'high'`. Caret while incomplete. Reduced motion still shows the result.

**`ToolCall`** — `name`, `status: 'queued' | 'running' | 'ok' | 'fail'`, `args?`, `result?`, `latencyMs?`, `statusLabels?`. Fail is red and named.

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
