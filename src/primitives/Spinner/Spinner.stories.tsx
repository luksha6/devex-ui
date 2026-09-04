import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Wait. label defaults to Loading. Pass an empty string when the parent already names the busy state.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
export const Large: Story = { args: { size: 20 } };
