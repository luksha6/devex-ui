import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders the aggregate label and value', () => {
    render(<StatCard label="Total hours" value={169} hint="Across owned games" />);
    expect(screen.getByText('Total hours')).toBeInTheDocument();
    expect(screen.getByText('169')).toBeInTheDocument();
    expect(screen.getByText('Across owned games')).toBeInTheDocument();
  });
});
