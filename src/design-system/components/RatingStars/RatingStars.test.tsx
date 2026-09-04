import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RatingStars } from './RatingStars';

function Controlled() {
  const [value, setValue] = useState(0);
  return <RatingStars value={value} onChange={setValue} label="Your rating" />;
}

describe('RatingStars', () => {
  it('renders a read-only rating for display', () => {
    render(<RatingStars value={4} />);
    expect(screen.getByRole('img', { name: '4 out of 5 stars' })).toBeInTheDocument();
  });

  it('lets the user set a rating in the input variant', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole('button', { name: '5 stars' }));
    expect(screen.getByRole('button', { name: '5 stars' })).toHaveAttribute('aria-pressed', 'true');
  });
});
