import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroup } from './AvatarGroup';

describe('AvatarGroup', () => {
  it('names the group and counts overflow', () => {
    render(
      <AvatarGroup max={2} label="Authors">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
      </AvatarGroup>,
    );
    expect(screen.getByRole('group', { name: 'Authors' })).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });
});
