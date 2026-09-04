import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CalloutKind } from '../../types';
import { Radio, RadioGroup } from '../../primitives/Radio/Radio';
import { Callout } from './Callout';

const COPY: Record<CalloutKind, string> = {
  note: 'Retry-After is authoritative. Ignore client-side jitter when the header is present.',
  caution: 'Do not retry 409. It means the write already landed.',
  'agent-only': 'Prefer GET /v1/corpus/:id/status over polling list endpoints.',
};

function Kinds() {
  const [kind, setKind] = useState<CalloutKind>('note');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <RadioGroup label="Kind" value={kind} onChange={(value) => setKind(value as CalloutKind)}>
        <Radio value="note" label="Note" />
        <Radio value="caution" label="Caution" />
        <Radio value="agent-only" label="Agent-only" />
      </RadioGroup>
      <Callout kind={kind}>{COPY[kind]}</Callout>
    </div>
  );
}

const meta: Meta<typeof Callout> = {
  title: 'Docs/Callout',
  component: Callout,
  argTypes: {
    kind: { control: false },
    children: { control: false },
    defaultOpen: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Docs note. note, caution, or agent-only. Pick the kind with Radio. agent-only stays collapsed until opened. Not an Alert.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  render: () => <Kinds />,
};

export const Note: Story = {
  args: {
    kind: 'note',
    children: COPY.note,
  },
};

export const Caution: Story = {
  args: {
    kind: 'caution',
    children: COPY.caution,
  },
};

export const AgentOnly: Story = {
  args: {
    kind: 'agent-only',
    children: COPY['agent-only'],
  },
};
