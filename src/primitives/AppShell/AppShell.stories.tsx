import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Nav } from '../Nav/Nav';
import { NavItem } from '../Nav/NavItem';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { AppShell } from './AppShell';

const meta: Meta<typeof AppShell> = {
  title: 'Primitives/AppShell',
  component: AppShell,
  parameters: {
    docs: {
      description: {
        component:
          'Product chrome. Nav, named sidebar, article, rail. Skip link first. Page is the docs measure without a sidebar.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: () => (
    <AppShell
      nav={
        <Nav
          brand="Platform"
          links={[
            { href: '#corpora', label: 'Corpora', current: true },
            { href: '#runs', label: 'Runs' },
          ]}
        />
      }
      sidebar={
        <Stack gap={2}>
          <NavItem href="#backoff" current>
            Backoff
          </NavItem>
          <NavItem href="#retries">Retries</NavItem>
        </Stack>
      }
      rail={<Text variant="mono">tok 2,100</Text>}
    >
      <Stack gap={3}>
        <Breadcrumb
          items={[
            { label: 'Platform', href: '#platform' },
            { label: 'Knowledge', href: '#knowledge' },
            { label: 'Backoff' },
          ]}
        />
        <Text variant="section">Backoff</Text>
        <Text variant="body">Pages are not the retrieval unit.</Text>
      </Stack>
    </AppShell>
  ),
};
