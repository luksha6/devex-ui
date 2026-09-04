import { render, screen } from '@testing-library/react';
import { Mono, Table } from './Table';

describe('Table', () => {
  it('renders headers and row data', () => {
    render(
      <Table
        headers={['Scope', 'Requests / min']}
        rows={[[<Mono key="a">read:knowledge</Mono>, '600']]}
      />,
    );
    expect(screen.getByRole('columnheader', { name: 'Scope' })).toBeInTheDocument();
    expect(screen.getByText('read:knowledge')).toBeInTheDocument();
    expect(screen.getByText('600')).toBeInTheDocument();
  });
});
