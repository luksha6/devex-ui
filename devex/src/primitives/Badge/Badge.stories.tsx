import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  args: { children: 'Beta' },
  parameters: {
    docs: {
      description: {
        component: 'Count or live. Lifecycle is Tag, not Badge.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Count: Story = { args: { tone: 'count', children: '12' } };
export const Live: Story = { args: { tone: 'live', children: 'Live' } };
