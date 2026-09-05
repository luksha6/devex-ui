import { render, screen } from '@testing-library/react';
import { Theme } from '../Theme/Theme';
import { Portal } from './Portal';

describe('Portal', () => {
  it('renders children on document.body', () => {
    render(
      <div data-testid="host">
        <Portal>
          <p>Portaled</p>
        </Portal>
      </div>,
    );
    expect(screen.getByText('Portaled')).toBeInTheDocument();
    expect(screen.getByTestId('host')).not.toHaveTextContent('Portaled');
  });

  it('keeps the theme on the portaled root', () => {
    render(
      <Theme value="dark">
        <Portal>
          <p>Portaled</p>
        </Portal>
      </Theme>,
    );
    expect(screen.getByText('Portaled').parentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByText('Portaled').parentElement).toHaveAttribute('data-devex');
  });
});
