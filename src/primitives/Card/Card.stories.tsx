import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Cluster } from '../Cluster/Cluster';
import { Card } from './Card';

function SelectableCards() {
  const [picked, setPicked] = useState('us-east');
  return (
    <Cluster gap={3}>
      {['us-east', 'eu-west'].map((id) => (
        <Card
          key={id}
          title={id}
          selected={picked === id}
          onSelect={() => setPicked(id)}
          actions={<Button intent="secondary">Open</Button>}
        >
          Replica in this region.
        </Card>
      ))}
    </Cluster>
  );
}

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Panel. Optional select. Selected is a word, not only a border. Not a nested page.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Backoff',
    children: 'Pages are not the retrieval unit.',
    actions: <Button intent="secondary">Open</Button>,
  },
};

export const Selectable: Story = { render: () => <SelectableCards /> };
