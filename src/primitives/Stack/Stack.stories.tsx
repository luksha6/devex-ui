import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text/Text';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Primitives/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: 'Vertical gap from the space scale. No raw pixels.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: () => (
    <Stack gap={3}>
      <Text variant="title">Backoff</Text>
      <Text>Do not retry 409.</Text>
    </Stack>
  ),
};
