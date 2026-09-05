import type { Meta, StoryObj } from '@storybook/react';
import { Cluster } from '../Cluster/Cluster';
import { Text } from '../Text/Text';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Primitives/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: 'Hairline. Horizontal is an hr. Vertical names its orientation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <>
      <Text variant="body">Above</Text>
      <Divider />
      <Text variant="body">Below</Text>
    </>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Cluster gap={0}>
      <Text variant="body">Start</Text>
      <Divider orientation="vertical" />
      <Text variant="body">End</Text>
    </Cluster>
  ),
};
