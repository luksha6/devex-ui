import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('uses status for note and alert for critical', () => {
    const { rerender } = render(<Alert kind="note">Keep the corpus id.</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(
      <Alert kind="critical" title="Cutover blocked">
        Replica lag is over 30s.
      </Alert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('Cutover blocked')).toBeInTheDocument();
  });

  it('dismisses from the control', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Keep the corpus id.</Alert>);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
