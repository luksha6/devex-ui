import { useState } from 'react';
import { Callout } from '../docs/Callout/Callout';
import { CodeBlock } from '../docs/CodeBlock/CodeBlock';
import { SectionAnchor } from '../docs/SectionAnchor/SectionAnchor';
import { Button } from '../primitives/Button/Button';
import { Dialog } from '../primitives/Dialog/Dialog';
import { SegmentedControl } from '../primitives/SegmentedControl/SegmentedControl';
import { specimen } from './Foundation';

export function MotionDemo() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('human');
  return (
    <>
      <p className={specimen.lede}>Tab onto the controls. Copy stays on the control.</p>
      <Button>Verify</Button> <Button intent="secondary">Open the diff</Button>
      <SectionAnchor
        id="backoff-policy"
        title="Backoff policy"
        since="v2.09"
        commit="4a91c02"
        path="platform/knowledge/rate-limits"
      />
      <CodeBlock
        languages={[{ id: 'ts', label: 'TypeScript', source: 'await client.retry();\n' }]}
      />
      <p className={specimen.lede}>
        <span className={specimen.mono}>--duration-fast</span> 120ms ·{' '}
        <span className={specimen.mono}>--duration-base</span> 180ms
      </p>
      <SegmentedControl
        label="Audience"
        value={view}
        onChange={setView}
        options={[
          { value: 'human', label: 'Human' },
          { value: 'agent', label: 'Agent' },
        ]}
      />
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirm cutover">
        <p>Opacity only. 180ms.</p>
      </Dialog>
      <Callout kind="agent-only">Expand this. Same duration tokens.</Callout>
    </>
  );
}
