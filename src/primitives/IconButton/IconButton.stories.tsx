import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Primitives/IconButton',
  component: IconButton,
  args: { label: 'Search', children: <Icon name="search" /> },
  parameters: {
    docs: {
      description: {
        component:
          'Icon-only action. label is the accessible name. Default intent is secondary. A Button with leading/trailing is for a labeled action.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
export const Outline: Story = { args: { intent: 'secondary', fill: 'outline' } };
export const Filled: Story = { args: { intent: 'primary', fill: 'filled' } };
export const Ghost: Story = { args: { intent: 'ghost' } };
export const Danger: Story = {
  args: { intent: 'danger', label: 'Remove', children: <Icon name="close" /> },
};
export const Small: Story = { args: { size: 'sm' } };
export const Loading: Story = { args: { loading: true } };
