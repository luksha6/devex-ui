import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Controlled page. The number lives in type, not color.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return <Pagination page={page} pageCount={4} onChange={setPage} />;
  },
};
