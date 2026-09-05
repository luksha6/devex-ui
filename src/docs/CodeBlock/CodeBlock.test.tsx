import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from './CodeBlock';

const languages = [
  { id: 'ts', label: 'TypeScript', source: 'await client.retry();\n' },
  { id: 'curl', label: 'cURL', source: 'curl -X POST https://api.example/retry\n' },
];

describe('CodeBlock', () => {
  it('keeps every language sample in the document and copies raw source', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

    render(<CodeBlock languages={languages} testedAgainst="knowledge@4a91c02" testedAt="6d ago" />);
    expect(screen.getByText(/await client.retry/)).toBeInTheDocument();
    expect(screen.getByText(/curl -X POST/)).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: 'Copy' })[0]!);
    expect(writeText).toHaveBeenCalledWith('await client.retry();\n');
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('stays untested until both stamps are set', () => {
    render(<CodeBlock languages={languages} testedAgainst="knowledge@4a91c02" />);
    expect(screen.getByText('untested')).toBeInTheDocument();
  });

  it('names a failed copy on the control', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'));
    render(<CodeBlock languages={languages} />);
    await user.click(screen.getAllByRole('button', { name: 'Copy' })[0]!);
    expect(screen.getByRole('button', { name: 'Copy failed' })).toBeInTheDocument();
  });
});
