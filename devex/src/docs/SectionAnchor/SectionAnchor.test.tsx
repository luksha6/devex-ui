import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { citationUri, SectionAnchor } from './SectionAnchor';

describe('SectionAnchor', () => {
  it('keeps Cite outside the heading and copies a versioned URI', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

    render(
      <SectionAnchor
        id="backoff-policy"
        title="Backoff policy"
        since="v2.09"
        commit="4a91c02"
        path="platform/knowledge/rate-limits"
      />,
    );

    const heading = screen.getByRole('heading', { name: 'Backoff policy' });
    expect(heading.tagName).toBe('H2');
    expect(heading).not.toContainElement(screen.getByRole('button', { name: 'Cite' }));

    await user.click(screen.getByRole('button', { name: 'Cite' }));
    expect(writeText).toHaveBeenCalledWith(
      citationUri('platform/knowledge/rate-limits', 'backoff-policy', '4a91c02'),
    );
    expect(screen.getByRole('button', { name: 'Reference copied' })).toBeInTheDocument();
  });
});
