import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('uses a heading for display', () => {
    render(<Text variant="display">Rate limits</Text>);
    expect(screen.getByRole('heading', { name: 'Rate limits' })).toBeInTheDocument();
  });

  it('renders as the requested element', () => {
    render(
      <Text as="span" variant="body">
        Retry-After
      </Text>,
    );
    expect(screen.getByText('Retry-After').tagName).toBe('SPAN');
  });
});
