import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders a determinate progressbar', () => {
    render(<ProgressBar value={61} label="Completion" />);
    const bar = screen.getByRole('progressbar', { name: 'Completion' });
    expect(bar).toHaveValue(61);
    expect(screen.getByText('61%')).toBeInTheDocument();
  });

  it('clamps values above 100', () => {
    render(<ProgressBar value={140} aria-label="Unlock" />);
    expect(screen.getByRole('progressbar', { name: 'Unlock' })).toHaveValue(100);
  });
});
