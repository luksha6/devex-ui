import { render, screen } from '@testing-library/react';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  it('marks the current page', () => {
    render(
      <NavItem href="/docs" current>
        Docs
      </NavItem>,
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
  });
});
