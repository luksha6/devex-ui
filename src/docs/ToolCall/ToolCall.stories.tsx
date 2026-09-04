import type { Meta, StoryObj } from '@storybook/react';
import { ToolCall } from './ToolCall';

const meta: Meta<typeof ToolCall> = {
  title: 'Docs/ToolCall',
  component: ToolCall,
  parameters: {
    docs: {
      description: {
        component: 'One tool, one row. Status is type. Latency is tabular. Fail is red and named.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolCall>;

export const States: Story = {
  render: () => (
    <div>
      <ToolCall
        name="corpus.status"
        status="ok"
        args="id=knowledge-prod"
        result="blocked"
        latencyMs={41}
      />
      <ToolCall name="corpus.write" status="running" args="chunks=12" />
      <ToolCall name="corpus.cutover" status="queued" />
      <ToolCall name="corpus.cutover" status="fail" result="replica lag 32s" latencyMs={880} />
    </div>
  ),
};
