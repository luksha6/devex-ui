import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

function Example() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={3} onChange={setPage} />;
}

describe('Pagination', () => {
  it('names the page and moves from the controls', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('does not promise more pages when the count is unknown', () => {
    render(<Pagination page={2} onChange={() => undefined} />);
    expect(screen.getByText('Page 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });
});
