import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { Toaster, useToast } from './Toast';

function Queue() {
  const { show } = useToast();
  return <Button onClick={() => show({ title: 'Reindex queued', ttl: 0 })}>Queue</Button>;
}

function Boom() {
  useToast();
  return null;
}

describe('Toast', () => {
  it('throws without a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<Boom />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });

  it('renders a live region when a toast is pushed', async () => {
    const user = userEvent.setup();
    render(
      <Toaster>
        <Queue />
      </Toaster>,
    );
    await user.click(screen.getByRole('button', { name: 'Queue' }));
    expect(screen.getByRole('status')).toHaveTextContent('Reindex queued');
  });
});
