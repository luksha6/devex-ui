import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  args: {
    items: [
      { label: 'Platform', href: '#platform' },
      { label: 'Knowledge', href: '#knowledge' },
      { label: 'Backoff' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Trail. Last item is the page. Separators are silent. Masthead crumb is a line of type.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};
