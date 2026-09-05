import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Nav } from './Nav';

const links = [
  { href: '/docs', label: 'Docs', current: true },
  { href: '/system', label: 'System' },
];

describe('Nav', () => {
  it('marks the current page', () => {
    render(<Nav brand="Devex" links={links} />);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
  });

  it('uses linkAs on the brand and the items', () => {
    render(<Nav brand="Devex" brandHref="/" linkAs="span" links={links} />);
    expect(screen.getByText('Devex').tagName).toBe('SPAN');
    expect(screen.getByText('Devex')).toHaveAttribute('href', '/');
    expect(screen.getAllByText('Docs')[0]).toHaveAttribute('href', '/docs');
  });

  it('opens a labelled sheet from the menu control', async () => {
    const user = userEvent.setup();
    render(<Nav brand="Devex" links={links} />);
    await user.click(screen.getByRole('button', { name: 'Open menu', hidden: true }));
    expect(screen.getByRole('dialog', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'System' }).length).toBeGreaterThan(1);
  });
});
