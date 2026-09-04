import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

const rows = [
  { route: '/v1/search', limit: '120/min', burst: '20' },
  { route: '/v1/index', limit: '12/min', burst: '2' },
  { route: '/v1/status', limit: '60/min', burst: '8' },
  { route: '/v1/corpus/:id', limit: '30/min', burst: '4' },
  { route: '/v1/retry', limit: '10/min', burst: '1' },
];

function Sortable() {
  const [key, setKey] = useState('route');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const left = String(a[key as keyof typeof a]);
      const right = String(b[key as keyof typeof b]);
      return dir === 'asc' ? left.localeCompare(right) : right.localeCompare(left);
    });
  }, [key, dir]);

  return (
    <DataTable
      caption="Published limits"
      rowKey="route"
      columns={[
        { key: 'route', header: 'Route', mono: true, sortable: true },
        { key: 'limit', header: 'Limit', numeric: true, sortable: true },
        { key: 'burst', header: 'Burst', numeric: true },
      ]}
      rows={sorted}
      sortKey={key}
      sortDir={dir}
      onSort={(next) => {
        if (next === key) {
          setDir((value) => (value === 'asc' ? 'desc' : 'asc'));
          return;
        }
        setKey(next);
        setDir('asc');
      }}
    />
  );
}

const meta: Meta<typeof DataTable> = {
  title: 'Primitives/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          'Sortable figures. Set sortable on columns that should sort. Mono on ids. Numeric columns right-align. Use Table when you only need static cells. The table is already a panel — do not wrap it in another card.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = { render: () => <Sortable /> };
export const Empty: Story = {
  args: {
    columns: [{ key: 'route', header: 'Route' }],
    rows: [],
  },
};
export const Loading: Story = {
  args: {
    loading: true,
    columns: [{ key: 'route', header: 'Route' }],
    rows: rows,
  },
};
