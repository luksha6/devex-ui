import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders the count in tabular numerals', () => {
    render(<Badge tone="count">12</Badge>);
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
