import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Theme } from './Theme';

const meta: Meta<typeof Theme> = {
  title: 'Primitives/Theme',
  component: Theme,
  parameters: {
    docs: {
      description: {
        component: 'Light or dark on a root you own. Tokens switch. Do not invent a second brand.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Theme>;

export const Light: Story = {
  render: () => (
    <Theme value="light">
      <Stack gap={3}>
        <Text variant="title">Light</Text>
        <Button>Verify</Button>
      </Stack>
    </Theme>
  ),
};

export const Dark: Story = {
  render: () => (
    <Theme value="dark">
      <Stack gap={3}>
        <Text variant="title">Dark</Text>
        <Button>Verify</Button>
      </Stack>
    </Theme>
  ),
};
