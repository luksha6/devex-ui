import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text/Text';
import { Page } from './Page';

const meta: Meta<typeof Page> = {
  title: 'Primitives/Page',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'Nav, 68ch article, optional rail. Pages are not the retrieval unit.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => (
    <Page rail={<Text variant="mono">tok 2,100</Text>}>
      <Text variant="section">Backoff policy</Text>
      <Text>Do not retry 409.</Text>
    </Page>
  ),
};
