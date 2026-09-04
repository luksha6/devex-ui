import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

function FireToast() {
  const toast = useToast();
  return (
    <Button onClick={() => toast({ title: 'Achievement unlocked: Speedrunner', tone: 'success' })}>
      Unlock
    </Button>
  );
}

describe('Toast', () => {
  it('renders a status message from the provider', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <FireToast />
      </ToastProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Unlock' }));
    expect(screen.getByRole('status')).toHaveTextContent('Achievement unlocked: Speedrunner');
  });

  it('throws when useToast is called outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<FireToast />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
