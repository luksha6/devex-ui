import type { Meta, StoryObj } from '@storybook/react';
import { Mono, Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Primitives/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          'Static cells in a panel. Headers are sentence case. Use Mono for ids. Use DataTable when columns sort.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    headers: ['Scope', 'Requests / min', 'Burst'],
    rows: [
      [<Mono key="r">read:knowledge</Mono>, '600', '120 in 5s'],
      [<Mono key="w">write:knowledge</Mono>, '60', 'none'],
    ],
  },
};
