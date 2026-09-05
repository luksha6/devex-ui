import { render, screen } from '@testing-library/react';
import { Run } from './Run';

describe('Run', () => {
  it('names failure and keeps the tools', () => {
    render(
      <Run
        phase="fail"
        label="Reindex knowledge-prod"
        detail="Replica lag is over 30s. Cutover did not run."
        elapsedMs={880}
        tools={[
          { name: 'corpus.cutover', status: 'fail', result: 'replica lag 32s', latencyMs: 880 },
        ]}
        text={'replica lag 32s\n'}
        uncertainty="high"
      />,
    );
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Replica lag is over 30s. Cutover did not run.')).toBeInTheDocument();
    expect(screen.getByText('corpus.cutover')).toBeInTheDocument();
    expect(screen.getByText('Uncertain')).toBeInTheDocument();
  });
});
