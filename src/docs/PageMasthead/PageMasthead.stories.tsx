import type { Meta, StoryObj } from '@storybook/react';
import { PageMasthead } from './PageMasthead';

const meta: Meta<typeof PageMasthead> = {
  title: 'Docs/PageMasthead',
  component: PageMasthead,
  argTypes: {
    lifecycle: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Page title strip. lifecycle is a Tag: stable, beta, deprecated, or internal. Color is never the only channel.',
      },
    },
  },
  args: {
    crumb: 'Platform / Knowledge service',
    title: 'Rate limits & retries',
    purpose:
      'How the knowledge service sheds load, what it returns when it does, and the retry policy every client is expected to implement.',
    owner: '@platform-core',
    verifiedAt: '6d ago',
    commit: '4a91c02',
    words: 1240,
    tokens: 2100,
    lifecycle: 'stable',
  },
};

export default meta;
type Story = StoryObj<typeof PageMasthead>;

export const Default: Story = {};
export const Stable: Story = {};
export const Beta: Story = {
  args: { lifecycle: 'beta', expectedGa: '2026-Q4', verifiedAt: '31d ago', commit: '8c0e11f' },
};
export const Deprecated: Story = {
  args: { lifecycle: 'deprecated', replaces: 'strategy', verifiedAt: '90d ago' },
};
export const Internal: Story = {
  args: { lifecycle: 'internal', purpose: 'Owner-only runbook. Not in the public index.' },
};
