import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

const items = [
  { id: 'retry', title: 'Retries', panel: 'Do not retry 409.' },
  { id: 'lag', title: 'Lag', panel: 'Cutover waits for 30s.', disabled: true },
  { id: 'tokens', title: 'Tokens', panel: 'Count lives on the row.' },
];

function Exclusive() {
  const [value, setValue] = useState<string[]>(['retry']);
  return <Accordion label="Policy" items={items} value={value} onChange={setValue} />;
}

function Many() {
  const [value, setValue] = useState<string[]>([]);
  return <Accordion label="Policy" items={items} value={value} onChange={setValue} multiple />;
}

describe('Accordion', () => {
  it('expands one section and names the wait', async () => {
    const user = userEvent.setup();
    render(<Exclusive />);
    const retries = screen.getByRole('button', { name: 'Retries' });
    expect(retries).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'Retries' })).toHaveTextContent('Do not retry 409.');
    await user.click(retries);
    expect(retries).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region', { name: 'Retries' })).not.toBeInTheDocument();
  });

  it('keeps a disabled section named and can open many', async () => {
    const user = userEvent.setup();
    render(<Many />);
    expect(screen.getByRole('button', { name: 'Lag' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Retries' }));
    await user.click(screen.getByRole('button', { name: 'Tokens' }));
    expect(screen.getByRole('region', { name: 'Retries' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Tokens' })).toBeInTheDocument();
  });
});
