import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('exposes the name and initials', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('uses the first two letters of a single name', () => {
    render(<Avatar name="Ada" />);
    expect(screen.getByRole('img', { name: 'Ada' })).toHaveTextContent('AD');
  });
});
