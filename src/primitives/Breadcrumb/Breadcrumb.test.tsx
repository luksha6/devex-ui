import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('names the trail and marks the page', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Platform', href: '/platform' },
          { label: 'Knowledge', href: '/knowledge' },
          { label: 'Backoff' },
        ]}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Platform' })).toHaveAttribute('href', '/platform');
    expect(screen.getByText('Backoff')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'Backoff' })).not.toBeInTheDocument();
  });
});
