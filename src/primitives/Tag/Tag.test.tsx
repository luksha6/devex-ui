import { render, screen } from '@testing-library/react';
import { RequiredTag, Tag } from './Tag';

describe('Tag', () => {
  it('labels required and every lifecycle in text', () => {
    const { rerender } = render(<RequiredTag />);
    expect(screen.getByText('req')).toBeInTheDocument();
    rerender(<Tag kind="stable">stable</Tag>);
    expect(screen.getByText('stable')).toBeInTheDocument();
    rerender(<Tag kind="beta">beta · GA 2026-Q4</Tag>);
    expect(screen.getByText(/beta/)).toBeInTheDocument();
    rerender(<Tag kind="deprecated">deprecated · use strategy</Tag>);
    expect(screen.getByText(/deprecated/)).toBeInTheDocument();
    rerender(<Tag kind="internal">internal</Tag>);
    expect(screen.getByText('internal')).toBeInTheDocument();
  });
});
