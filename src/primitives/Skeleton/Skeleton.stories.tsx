import type { Meta, StoryObj } from '@storybook/react';
import { Cluster } from '../Cluster/Cluster';
import { Stack } from '../Stack/Stack';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder while a named surface loads. Motion collapses under reduced motion.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { lines: 3 } };
export const Block: Story = { args: { variant: 'block', label: 'Loading chart' } };
export const Disc: Story = {
  render: () => (
    <Cluster gap={3}>
      <Skeleton variant="disc" label="Loading avatar" />
      <Stack gap={2}>
        <Skeleton lines={2} label="" />
      </Stack>
    </Cluster>
  ),
};
