import { render, screen } from '@testing-library/react';
import { Nav } from './Nav';

describe('Nav', () => {
  it('marks the current page', () => {
    render(
      <Nav
        brand="Devex"
        links={[
          { href: '/docs', label: 'Docs', current: true },
          { href: '/system', label: 'System' },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
  });
});
