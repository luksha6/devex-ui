import { render, screen } from '@testing-library/react';
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
});
