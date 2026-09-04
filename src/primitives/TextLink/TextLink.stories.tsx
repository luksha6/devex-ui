import type { Meta, StoryObj } from '@storybook/react';
import { TextLink } from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'Primitives/TextLink',
  component: TextLink,
  args: { href: '/v1/status', children: 'Open machine view' },
  parameters: {
    docs: {
      description: {
        component:
          'Inline navigation. The page’s one next step is a Button, not a link-styled button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Default: Story = {};
