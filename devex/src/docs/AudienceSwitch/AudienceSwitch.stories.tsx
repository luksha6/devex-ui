import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { Audience } from '../../types';
import type { DocBlock } from '../document';
import { AudienceSwitch } from './AudienceSwitch';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy' },
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
];

function Dual() {
  const [value, setValue] = useState<Audience>('human');
  return <AudienceSwitch value={value} onChange={setValue} blocks={blocks} />;
}

const meta: Meta<typeof AudienceSwitch> = {
  title: 'Docs/AudienceSwitch',
  component: AudienceSwitch,
  render: () => <Dual />,
  parameters: {
    docs: {
      description: {
        component:
          'Human and Agent from one DocBlock[]. Do not pass children or a second markdown string.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AudienceSwitch>;

export const Default: Story = {};
