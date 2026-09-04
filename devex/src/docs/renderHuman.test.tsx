import { render, screen } from '@testing-library/react';
import { renderHuman } from './renderHuman';
import type { DocBlock } from './document';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy' },
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
];

describe('renderHuman', () => {
  it('maps the same blocks the agent face serializes', () => {
    render(<div>{renderHuman(blocks)}</div>);
    expect(screen.getByRole('heading', { name: 'Backoff policy' })).toBeInTheDocument();
    expect(screen.getByText('Caution')).toBeInTheDocument();
    expect(screen.getByText(/Do not retry 409/)).toBeInTheDocument();
  });
});
