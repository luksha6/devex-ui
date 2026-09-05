import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from './FileUpload';

function Example({ maxSize }: { maxSize?: number }) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      label="Corpus dump"
      files={files}
      onChange={setFiles}
      accept=".txt"
      maxSize={maxSize}
    />
  );
}

describe('FileUpload', () => {
  it('adds a named file and can remove it', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByLabelText('Corpus dump');
    expect(input).toHaveAttribute('type', 'file');
    const file = new File(['dump'], 'notes.txt', { type: 'text/plain' });
    await user.upload(input, file);
    expect(screen.getByRole('list', { name: 'Corpus dump selected' })).toBeInTheDocument();
    expect(screen.getByText('notes.txt')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove notes.txt' }));
    expect(screen.queryByText('notes.txt')).not.toBeInTheDocument();
  });

  it('names a file that is too large', async () => {
    const user = userEvent.setup();
    render(<Example maxSize={4} />);
    const file = new File(['too-big'], 'heavy.txt', { type: 'text/plain' });
    await user.upload(screen.getByLabelText('Corpus dump'), file);
    expect(screen.getByRole('alert')).toHaveTextContent('heavy.txt');
    expect(screen.getByRole('alert')).toHaveTextContent('too large');
    expect(screen.queryByText('heavy.txt')).not.toBeInTheDocument();
  });
});
