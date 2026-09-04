import { render, screen } from '@testing-library/react';
import { RarityBadge } from './RarityBadge';

describe('RarityBadge', () => {
  it('derives its label from rarity, not a consumer color', () => {
    render(<RarityBadge rarity="legendary" />);
    expect(screen.getByText('Legendary')).toBeInTheDocument();
  });

  it('sets a rarity data attribute for the token scale', () => {
    const { container } = render(<RarityBadge rarity="epic" />);
    expect(container.firstChild).toHaveAttribute('data-rarity', 'epic');
    expect(screen.getByText('Epic')).toBeInTheDocument();
  });
});
