import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

function Example() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={3} onPageChange={setPage} />;
}

describe('Pagination', () => {
  it('renders the current page and hides when there is a single page', () => {
    const { rerender } = render(<Pagination page={1} pageCount={1} onPageChange={vi.fn()} />);
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
    rerender(<Pagination page={1} pageCount={3} onPageChange={vi.fn()} />);
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('moves to the next and previous page', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });
});
