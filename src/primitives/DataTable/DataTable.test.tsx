import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';

describe('DataTable', () => {
  it('sorts from the column header', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <DataTable
        caption="Published limits"
        rowKey="route"
        columns={[
          { key: 'route', header: 'Route', mono: true, sortable: true },
          { key: 'limit', header: 'Limit', numeric: true },
        ]}
        rows={[{ route: '/v1/status', limit: '60/min' }]}
        sortKey="route"
        sortDir="asc"
        onSort={onSort}
      />,
    );
    expect(screen.getByRole('columnheader', { name: /Route/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    expect(screen.queryByRole('button', { name: /Limit/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Route/ }));
    expect(onSort).toHaveBeenCalledWith('route');
  });

  it('sorts from the keyboard', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <DataTable
        columns={[{ key: 'route', header: 'Route', sortable: true }]}
        rows={[{ route: '/v1/status' }]}
        onSort={onSort}
      />,
    );
    screen.getByRole('button', { name: /Route/ }).focus();
    await user.keyboard('{Enter}');
    expect(onSort).toHaveBeenCalledWith('route');
  });

  it('exposes busy while loading', () => {
    render(
      <DataTable
        columns={[{ key: 'route', header: 'Route' }]}
        rows={[]}
        loading
        caption="Limits"
      />,
    );
    expect(screen.getByRole('table').closest('[aria-busy]')).toHaveAttribute('aria-busy', 'true');
  });
});
