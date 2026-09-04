import { render, screen } from '@testing-library/react';
import { PageMasthead } from './PageMasthead';

const base = {
  crumb: 'Platform / Knowledge service',
  title: 'Rate limits & retries',
  purpose: 'How the knowledge service sheds load.',
  owner: '@platform-core',
  verifiedAt: '6d ago',
  commit: '4a91c02',
  words: 1240,
  tokens: 2100,
};

describe('PageMasthead', () => {
  it('badges every lifecycle in text', () => {
    const { rerender } = render(<PageMasthead {...base} lifecycle="stable" />);
    expect(screen.getByText('stable')).toBeInTheDocument();
    rerender(<PageMasthead {...base} lifecycle="beta" expectedGa="2026-Q4" />);
    expect(screen.getByText('beta · GA 2026-Q4')).toBeInTheDocument();
    rerender(<PageMasthead {...base} lifecycle="deprecated" replaces="strategy" />);
    expect(screen.getByText('deprecated · strategy')).toBeInTheDocument();
    rerender(<PageMasthead {...base} lifecycle="internal" />);
    expect(screen.getByText('internal')).toBeInTheDocument();
  });
});
