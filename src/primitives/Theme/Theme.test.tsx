import { render, screen } from '@testing-library/react';
import { Theme, useTheme } from './Theme';

function Probe() {
  return <p>{useTheme()}</p>;
}

describe('Theme', () => {
  it('sets the appearance on the root it owns', () => {
    render(
      <Theme value="dark">
        <p>Corpus</p>
      </Theme>,
    );
    expect(screen.getByText('Corpus').parentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByText('Corpus').parentElement).toHaveAttribute('data-devex');
  });

  it('exposes the value to descendants', () => {
    render(
      <Theme value="dark">
        <Probe />
      </Theme>,
    );
    expect(screen.getByText('dark')).toBeInTheDocument();
  });
});
