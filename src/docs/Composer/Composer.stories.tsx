import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Run } from '../Run/Run';
import { Stack } from '../../primitives/Stack/Stack';
import { Composer } from './Composer';

function Example() {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState('');
  return (
    <Stack gap={4}>
      <Composer label="Prompt" value={value} onChange={setValue} onSubmit={setSent} />
      {sent ? <Run phase="running" label={sent} elapsedMs={1200} /> : null}
    </Stack>
  );
}

const meta: Meta<typeof Composer> = {
  title: 'Docs/Composer',
  component: Composer,
  parameters: {
    docs: {
      description: {
        component:
          'Start a run. Send stays on the control. A toast cannot carry the job. Watch the result with Run.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Composer>;

export const Default: Story = { render: () => <Example /> };
