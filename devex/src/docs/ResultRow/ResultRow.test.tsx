import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultRow } from './ResultRow';

describe('ResultRow', () => {
  it('treats the section as the retrieval unit and exposes token cost', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ResultRow
        score={0.91}
        title="Rate limits & retries"
        section="Backoff policy"
        snippet={
          <>
            Do not retry <mark>409</mark>.
          </>
        }
        tokens={180}
        path="#backoff-policy"
        onSelect={onSelect}
      />,
    );
    expect(screen.getByText(/Backoff policy/)).toBeInTheDocument();
    expect(screen.getByText(/180 tok/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Backoff policy/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('declares withheld sections in text', () => {
    render(<ResultRow kind="withheld" count={3} reason="internal · out of scope" />);
    expect(screen.getByText(/3 sections withheld/)).toBeInTheDocument();
  });
});
