import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  args: { name: 'Ada Lovelace' },
  parameters: {
    docs: {
      description: {
        component:
          'Disc with initials. name is required. size is sm, md, or lg. Tint is hashed from the name.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Tints: Story = {
  render: () => (
    <span style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" />
      <Avatar name="Barbara Liskov" />
      <Avatar name="Edsger Dijkstra" />
    </span>
  ),
};

export const Sizes: Story = {
  render: () => (
    <span style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end' }}>
      <Avatar size="sm" name="Ada Lovelace" />
      <Avatar size="md" name="Ada Lovelace" />
      <Avatar size="lg" name="Ada Lovelace" />
    </span>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3} label="Authors">
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" />
      <Avatar name="Barbara Liskov" />
    </AvatarGroup>
  ),
};
