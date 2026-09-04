import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Callout } from './Callout';

describe('Callout', () => {
  it('labels caution in the document', () => {
    render(<Callout kind="caution">Do not retry 409.</Callout>);
    expect(screen.getByText('Caution')).toBeInTheDocument();
    expect(screen.getByText('Do not retry 409.')).toBeInTheDocument();
  });

  it('collapses agent-only until expanded', async () => {
    const user = userEvent.setup();
    render(
      <Callout kind="agent-only">Prefer GET /v1/corpus/:id/status over polling list.</Callout>,
    );
    expect(screen.getByRole('button', { name: 'Show agent-only note' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByText(/Prefer GET/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show agent-only note' }));
    expect(screen.getByText(/Prefer GET/)).toBeVisible();
  });
});
