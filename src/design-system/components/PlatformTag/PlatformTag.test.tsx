import { render, screen } from '@testing-library/react';
import { PlatformTag } from './PlatformTag';

describe('PlatformTag', () => {
  it('renders the platform label from its own map', () => {
    render(<PlatformTag platform="playstation" />);
    expect(screen.getByText('PlayStation')).toBeInTheDocument();
  });

  it('exposes a platform data attribute for color', () => {
    const { container } = render(<PlatformTag platform="switch" />);
    expect(container.firstChild).toHaveAttribute('data-platform', 'switch');
    expect(screen.getByText('Switch')).toBeInTheDocument();
  });
});
