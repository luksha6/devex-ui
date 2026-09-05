import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('names the wait', () => {
    const { container } = render(<Skeleton label="Loading rows" lines={4} />);
    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading rows')).toBeInTheDocument();
  });
});
