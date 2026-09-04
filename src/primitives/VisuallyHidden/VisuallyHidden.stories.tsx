import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Primitives/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    docs: {
      description: {
        component:
          'Clip-hide text. The canvas looks empty because the node is not painted. Inspect the accessibility tree.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Text variant="body">
        The extra name is clipped. The button still reads “Open corpus settings”.
      </Text>
      <Button>
        Open
        <VisuallyHidden> corpus settings</VisuallyHidden>
      </Button>
    </div>
  ),
};
