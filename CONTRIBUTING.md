# Contributing to @luksha6/devex-ui

React design system. Product kit for apps. Write a page once: people get layout, agents get markdown. UI for watching a run.

Work on a branch. Do not commit unless asked. Do not skip hooks.

## Review checklist

Reviewers should reject a change that ships a story without a test, or a test without a story.

- [ ] Primitive or page/agent surface: `tsx` + CSS module + story + Vitest test, exported from the correct barrel.
- [ ] No hex outside `src/tokens/`. `npm run lint` includes the hex ban and contrast check.
- [ ] Controls use `--radius-control`. Panels use `--radius-panel`. Space snaps to the 4px scale.
- [ ] Primary is brand green. Danger is red. Success is green. Status is labeled in type.
- [ ] Color is not the only channel. Status, lifecycle, and uncertainty have words.
- [ ] Keyboard, name, and busy/disabled behavior are tested, not only screenshotted.
- [ ] `prefers-reduced-motion` does not leave a loop running. Long jobs still show a result.
- [ ] Primitives do not import docs.
- [ ] New `DocBlock` types update `toAgentMarkdown`, `renderHuman`, and their tests.
- [ ] No comments in polished source. No comments that restate the code.

## Commands

```bash
npm test
npm run lint
npm run build
npm pack --dry-run
```

## What a review is for

Stories are for states a human can click. Tests are the contract. Foundations MDX is for the law: the rule, a live specimen, and what we refused. If the change is an agent surface, the run must show latency, stream, tools, and failure as red plus a reason.
