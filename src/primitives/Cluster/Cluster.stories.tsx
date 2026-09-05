import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Cluster } from './Cluster';

const meta: Meta<typeof Cluster> = {
  title: 'Primitives/Cluster',
  component: Cluster,
  parameters: {
    docs: {
      description: {
        component: 'Horizontal wrap. Gap is a space token.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cluster>;

export const Default: Story = {
  render: () => (
    <Cluster gap={2}>
      <Button>Verify</Button>
      <Button intent="secondary">Cancel</Button>
    </Cluster>
  ),
};
