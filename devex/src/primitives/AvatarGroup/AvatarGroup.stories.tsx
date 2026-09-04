import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Primitives/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component: 'Stack of Avatars. label is the accessible name. max shows an overflow count.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  render: () => (
    <AvatarGroup max={3} label="Authors">
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" />
      <Avatar name="Barbara Liskov" />
    </AvatarGroup>
  ),
};
