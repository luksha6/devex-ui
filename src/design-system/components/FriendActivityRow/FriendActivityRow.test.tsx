import { render, screen } from '@testing-library/react';
import { FriendActivityRow } from './FriendActivityRow';

describe('FriendActivityRow', () => {
  it('renders initials, name, and playing copy', () => {
    render(<FriendActivityRow name="Maya Chen" gameTitle="Hades II" online />);
    expect(screen.getByText('MC')).toBeInTheDocument();
    expect(screen.getByText('Maya Chen')).toBeInTheDocument();
    expect(screen.getByText(/is playing/)).toBeInTheDocument();
    expect(screen.getByText('Hades II')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Online' })).toBeInTheDocument();
  });

  it('marks offline friends', () => {
    render(
      <FriendActivityRow
        name="Sam Okonkwo"
        gameTitle="Celeste"
        online={false}
        action="completed"
      />,
    );
    expect(screen.getByRole('img', { name: 'Offline' })).toBeInTheDocument();
    expect(screen.getByText(/completed/)).toBeInTheDocument();
  });
});
