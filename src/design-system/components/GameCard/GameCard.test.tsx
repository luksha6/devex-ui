import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameCard } from './GameCard';

describe('GameCard', () => {
  it('renders title, platform, hours, and completion', () => {
    render(<GameCard title="Hades II" platform="pc" hoursPlayed={42} completion={61} />);
    expect(screen.getByText('Hades II')).toBeInTheDocument();
    expect(screen.getByText('PC')).toBeInTheDocument();
    expect(screen.getByText('42h')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Completion' })).toHaveValue(61);
  });

  it('opens on click and Enter when interactive', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <GameCard
        title="Celeste"
        platform="switch"
        hoursPlayed={12}
        completion={100}
        rating={5}
        onClick={onClick}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Open Celeste' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    screen.getByRole('button', { name: 'Open Celeste' }).focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
