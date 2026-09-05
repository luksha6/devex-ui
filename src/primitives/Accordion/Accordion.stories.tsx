import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const items = [
  { id: 'retry', title: 'Retries', panel: 'Do not retry 409. It means the write already landed.' },
  { id: 'lag', title: 'Lag', panel: 'Cutover waits until replica lag is under 30s.' },
  { id: 'tokens', title: 'Tokens', panel: 'Count lives on the row, not in a toast.' },
];

function Exclusive() {
  const [value, setValue] = useState<string[]>(['retry']);
  return <Accordion label="Policy" items={items} value={value} onChange={setValue} />;
}

function Many() {
  const [value, setValue] = useState<string[]>(['retry', 'tokens']);
  return <Accordion label="Policy" items={items} value={value} onChange={setValue} multiple />;
}

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'Stacked disclosures. One array of items, like Tabs. Not Accordion.Item. Chevron plus aria-expanded.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = { render: () => <Exclusive /> };
export const Multiple: Story = { render: () => <Many /> };
