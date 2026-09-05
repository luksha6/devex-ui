# Changelog

## 0.1.4

- Flat Menu: actions on a control, not a compound tree. Portaled, flipped, and shifted so it stays in the viewport. Typeahead jumps to a matching item. Hover moves focus. Tab leaves the trigger.
- Overlay lock can skip trap and scroll lock so menus stay non-modal. Tooltip Escape does not close a dialog.
- Layout kit: `Stack`, `Cluster`, `Page`, `EmptyState`, `Pagination`. Collapsing `Nav` opens a Drawer. `Page` has a skip link and a wide measure.
- Dual reader can hold a list, table, image, run, and inline links. `Run` composes status, tools, and stream. Unsafe hrefs are dropped on both faces.
- Light and dark tokens on `Theme`. `useTheme` reads the value. Reset is scoped to `[data-devex]`. Onest is self-hosted.
- Token map exported as `tokens`. Status labels can be passed in.
- Product fields that were missing from the kit: `Combobox`, `DateField`, `FileUpload`, `Card`, `Skeleton`, `Popover`, `Divider`.
- Product chrome that was still missing: `Breadcrumb`, `Accordion`, `CommandPalette`, `AppShell`. `Composer` starts a run.
- Icon accepts a custom glyph. `DataTable` takes a `footer` for pagination.
- `TextLink` accepts `as` for a router link. `Button` accepts `href`. `Nav` accepts `linkAs`.
- CI runs test, lint, build, and a consumer that installs the packed tarball.

## 0.1.3

- Registry snapshot of the 0.1 product kit.

## 0.1.2

- Public copy matches the product: product kit, dual reader, run UI for people watching a job.

## 0.1.1

- Public copy: product kit, dual reader, and run UI for people watching a job.

## 0.1.0

- Product kit for developers: actions, forms, overlays, data, and type.
- Pages, dual reader, and agent runs: masthead, code, parameters, callouts, results, freshness, section anchors, `Stream`, `ToolCall`, `RunStatus`.
- Foundations for color, type, space, and motion. Guides for install, dual reader, layout, and agent surfaces.
- Hex banned outside `src/tokens/`. Consumers load `@luksha6/devex-ui/styles.css` once.
- Primary is brand green. Danger is red. Success is green.
