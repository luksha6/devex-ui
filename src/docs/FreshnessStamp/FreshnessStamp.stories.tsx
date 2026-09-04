import type { Meta, StoryObj } from '@storybook/react';
import { FreshnessStamp } from './FreshnessStamp';

const meta: Meta<typeof FreshnessStamp> = {
  title: 'Docs/FreshnessStamp',
  component: FreshnessStamp,
  parameters: {
    docs: {
      description: {
        component: 'Verified or stale. Claim and open-diff stay on the control. Not a toast.',
      },
    },
  },
  args: {
    verifier: '@platform-core',
    commit: '4a91c02',
    onClaim: () => undefined,
    onOpenDiff: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof FreshnessStamp>;

export const Verified: Story = {
  args: { status: 'verified', verifiedAt: '6d ago', indexWeight: 1 },
};

export const Stale: Story = {
  args: {
    status: 'stale',
    commit: '8c0e11f',
    daysUnverified: 31,
    commitsBehind: 14,
    indexWeight: 0.7,
  },
};
