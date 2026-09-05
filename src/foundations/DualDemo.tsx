import { useState } from 'react';
import { AudienceSwitch } from '../docs/AudienceSwitch/AudienceSwitch';
import type { DocBlock } from '../docs/document';
import type { Audience } from '../types';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy', since: 'v2.09' },
  {
    type: 'paragraph',
    text: ['See ', { text: 'the runbook', href: '/runbook', strong: true }, ' before you retry.'],
  },
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
  {
    type: 'list',
    items: ['Do not retry 409', 'Wait for replica lag under 30s'],
  },
  {
    type: 'table',
    headers: ['Code', 'Meaning'],
    rows: [
      ['409', 'Already landed'],
      ['429', 'Shed load'],
    ],
  },
  {
    type: 'run',
    phase: 'fail',
    label: 'Reindex knowledge-prod',
    detail: 'Replica lag is over 30s. Cutover did not run.',
    elapsedMs: 880,
    tools: [{ name: 'corpus.cutover', status: 'fail', result: 'replica lag 32s', latencyMs: 880 }],
    text: 'replica lag 32s',
    uncertainty: 'high',
  },
];

export function DualDemo() {
  const [value, setValue] = useState<Audience>('human');
  return <AudienceSwitch value={value} onChange={setValue} blocks={blocks} />;
}
