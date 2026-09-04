import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toAgentMarkdown, type DocBlock } from '../document';
import { AudienceSwitch } from './AudienceSwitch';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy' },
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
];

function Example() {
  const [audience, setAudience] = useState<'human' | 'agent'>('human');
  return <AudienceSwitch value={audience} onChange={setAudience} blocks={blocks} />;
}

describe('AudienceSwitch', () => {
  it('shows caution as a directive in agent view', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByText('Caution')).toBeInTheDocument();
    expect(screen.getByText(/Do not retry 409/)).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: 'Agent' }));
    const source = screen.getByText(/:::caution/);
    expect(source).toHaveTextContent(':::caution');
    expect(source).toHaveTextContent('Do not retry 409');
    expect(source.textContent).toBe(toAgentMarkdown(blocks));
  });
});
