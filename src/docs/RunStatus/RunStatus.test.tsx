import { render, screen } from '@testing-library/react';
import { RunStatus } from './RunStatus';

describe('RunStatus', () => {
  it('names the phase', () => {
    render(<RunStatus phase="fail" label="Cutover" detail="Replica lag is over 30s." />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Replica lag is over 30s.')).toBeInTheDocument();
    expect(screen.getByText('Failed').closest('[data-phase]')).not.toHaveAttribute('aria-busy');
  });

  it('marks a running job busy', () => {
    render(<RunStatus phase="running" label="Reindex knowledge-prod" elapsedMs={12000} />);
    expect(screen.getByText('Running').closest('[data-phase]')).toHaveAttribute(
      'aria-busy',
      'true',
    );
    expect(screen.getByText('12s')).toBeInTheDocument();
  });
});
