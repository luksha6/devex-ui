import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';

const meta: Meta<typeof Nav> = {
  title: 'Primitives/Nav',
  component: Nav,
  args: {
    brand: 'Devex',
    links: [
      { href: '/docs', label: 'Docs', current: true },
      { href: '/system', label: 'System' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Brand plus links. current is named in type, not color alone. trailing is for an action on the right.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Nav>;

export const Default: Story = {};
