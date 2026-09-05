import { render, screen } from '@testing-library/react';
import { renderHuman } from './renderHuman';
import type { DocBlock } from './document';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy' },
  {
    type: 'paragraph',
    text: ['See ', { text: 'the runbook', href: '/runbook' }, ' before you retry.'],
  },
  { type: 'image', src: 'javascript:alert(1)', alt: 'Unsafe figure' },
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
  { type: 'list', items: ['Do not retry 409'] },
  {
    type: 'table',
    headers: ['Code', 'Meaning'],
    rows: [['409', 'Already landed']],
  },
  { type: 'image', src: '/backoff.svg', alt: 'Backoff curve' },
  {
    type: 'run',
    phase: 'fail',
    label: 'Reindex knowledge-prod',
    detail: 'Replica lag is over 30s.',
  },
];

describe('renderHuman', () => {
  it('maps the same blocks the agent face serializes', () => {
    render(<div>{renderHuman(blocks)}</div>);
    expect(screen.getByRole('heading', { name: 'Backoff policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'the runbook' })).toHaveAttribute('href', '/runbook');
    expect(screen.getByText('Unsafe figure')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Unsafe figure' })).not.toBeInTheDocument();
    expect(screen.getByText('Caution')).toBeInTheDocument();
    expect(screen.getAllByText(/Do not retry 409/).length).toBeGreaterThan(0);
    expect(screen.getByRole('list')).toHaveTextContent('Do not retry 409');
    expect(screen.getByRole('columnheader', { name: 'Code' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Backoff curve' })).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});
