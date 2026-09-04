import { render, screen } from '@testing-library/react';
import { Stream } from './Stream';

describe('Stream', () => {
  it('is live while tokens arrive and not after', () => {
    const { rerender } = render(<Stream text="checking corpus" />);
    expect(screen.getByText(/checking corpus/).closest('pre')).toHaveAttribute(
      'aria-live',
      'polite',
    );
    rerender(<Stream text="checking corpus" complete />);
    expect(screen.getByText(/checking corpus/).closest('pre')).not.toHaveAttribute('aria-live');
  });

  it('names uncertainty in type, not color alone', () => {
    render(<Stream text="maybe" uncertainty="high" />);
    expect(screen.getByText('Uncertain')).toBeInTheDocument();
  });
});
