import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('is decorative by default', () => {
    const { container } = render(<Icon name="search" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes a name when labeled', () => {
    render(<Icon name="search" label="Search" />);
    expect(screen.getByRole('img', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders a custom glyph', () => {
    render(
      <Icon label="Custom">
        <circle cx="8" cy="8" r="4" />
      </Icon>,
    );
    expect(screen.getByRole('img', { name: 'Custom' }).querySelector('circle')).toBeInTheDocument();
  });
});
