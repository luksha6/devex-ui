import { useState } from 'react';
import { AudienceSwitch } from '../docs/AudienceSwitch/AudienceSwitch';
import type { DocBlock } from '../docs/document';
import type { Audience } from '../types';

const blocks: DocBlock[] = [
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
];

export function DualDemo() {
  const [value, setValue] = useState<Audience>('human');
  return <AudienceSwitch value={value} onChange={setValue} blocks={blocks} />;
}
