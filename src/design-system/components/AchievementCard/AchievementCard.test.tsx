import { render, screen } from '@testing-library/react';
import { AchievementCard } from './AchievementCard';

describe('AchievementCard', () => {
  it('renders title, description, and rarity', () => {
    render(
      <AchievementCard
        title="Speedrunner"
        description="Finish the first region in under 12 minutes."
        rarity="legendary"
        unlocked
      />,
    );
    expect(screen.getByText('Speedrunner')).toBeInTheDocument();
    expect(screen.getByText('Legendary')).toBeInTheDocument();
    expect(screen.getByText('Unlocked')).toBeInTheDocument();
  });

  it('marks locked achievements without a glow state', () => {
    const { container } = render(
      <AchievementCard
        title="Untouched"
        description="Not yet earned."
        rarity="epic"
        unlocked={false}
        progress={40}
      />,
    );
    expect(container.firstChild).toHaveAttribute('data-unlocked', 'false');
    expect(screen.getByText('Locked')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Untouched progress' })).toHaveValue(40);
  });
});
