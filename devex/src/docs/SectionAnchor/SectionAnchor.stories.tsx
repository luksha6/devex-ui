import type { Meta, StoryObj } from '@storybook/react';
import { SectionAnchor } from './SectionAnchor';

const meta: Meta<typeof SectionAnchor> = {
  title: 'Docs/SectionAnchor',
  component: SectionAnchor,
  parameters: {
    docs: {
      description: {
        component:
          'Heading plus cite. citationUri builds the codex:// link. Copy stays on the control.',
      },
    },
  },
  args: {
    id: 'backoff-policy',
    title: 'Backoff policy',
    since: 'v2.09',
    commit: '4a91c02',
    path: 'platform/knowledge/rate-limits',
  },
};

export default meta;
type Story = StoryObj<typeof SectionAnchor>;

export const Default: Story = {};
export const Subsection: Story = {
  args: { as: 'h3', id: 'retry-after', title: 'Retry-After' },
};
