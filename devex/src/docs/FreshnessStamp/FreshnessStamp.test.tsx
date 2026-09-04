import { render, screen } from '@testing-library/react';
import { FreshnessStamp } from './FreshnessStamp';

describe('FreshnessStamp', () => {
  it('shows idx weight when stale', () => {
    render(
      <FreshnessStamp
        status="stale"
        verifier="@platform-core"
        commit="8c0e11f"
        daysUnverified={31}
        commitsBehind={14}
        indexWeight={0.7}
        onClaim={() => undefined}
      />,
    );
    expect(screen.getByText('Unverified')).toBeInTheDocument();
    expect(screen.getByText(/idx weight 0.7 · demoted stale/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Claim & verify' })).toBeInTheDocument();
  });
});
