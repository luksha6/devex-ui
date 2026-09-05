import { useState } from 'react';
import { Alert } from '../primitives/Alert/Alert';
import { Button } from '../primitives/Button/Button';
import { DataTable } from '../primitives/DataTable/DataTable';
import { Dialog } from '../primitives/Dialog/Dialog';
import { EmptyState } from '../primitives/EmptyState/EmptyState';
import { Field } from '../primitives/Field/Field';
import { AppShell } from '../primitives/AppShell/AppShell';
import { Breadcrumb } from '../primitives/Breadcrumb/Breadcrumb';
import { Menu } from '../primitives/Menu/Menu';
import { Nav } from '../primitives/Nav/Nav';
import { NavItem } from '../primitives/Nav/NavItem';
import { Pagination } from '../primitives/Pagination/Pagination';
import { Stack } from '../primitives/Stack/Stack';
import { Text } from '../primitives/Text/Text';

const rows = [
  { id: 'knowledge-prod', lag: '12s' },
  { id: 'knowledge-stage', lag: '4s' },
];

export function AppShellDemo() {
  const [query, setQuery] = useState('knowledge');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const filtered = query ? rows.filter((row) => row.id.includes(query)) : rows;

  return (
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
          <NavItem href="#corpora" current>
            Corpora
          </NavItem>
          <NavItem href="#runs">Runs</NavItem>
        </Stack>
      }
      rail={<Text variant="mono">tok 2,100</Text>}
    >
      <Stack gap={4}>
        <Breadcrumb
          items={[
            { label: 'Platform', href: '#platform' },
            { label: 'Knowledge', href: '#knowledge' },
            { label: 'Corpora' },
          ]}
        />
        <Text variant="section">Corpora</Text>
        <Field label="Query" value={query} onChange={(event) => setQuery(event.target.value)} />
        {filtered.length === 0 ? (
          <EmptyState title="No corpora" body="Nothing matches that query." />
        ) : (
          <DataTable
            caption="Corpora"
            columns={[
              { key: 'id', header: 'Id', mono: true },
              { key: 'lag', header: 'Lag' },
              { key: 'actions', header: 'Actions' },
            ]}
            rows={filtered.map((row) => ({
              ...row,
              actions: (
                <Menu
                  label="Row actions"
                  open={menu === row.id}
                  onOpenChange={(next) => setMenu(next ? row.id : null)}
                  items={[{ id: 'cutover', label: 'Cutover', onSelect: () => setOpen(true) }]}
                >
                  <Button intent="secondary" size="sm">
                    Actions
                  </Button>
                </Menu>
              ),
            }))}
            footer={<Pagination page={page} pageCount={1} onChange={setPage} />}
          />
        )}
        <Alert kind="critical" title="Cutover blocked">
          Replica lag is over 30s.
        </Alert>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm cutover"
          actions={<Button onClick={() => setOpen(false)}>Done</Button>}
        >
          Replica lag must be under 30s.
        </Dialog>
      </Stack>
    </AppShell>
  );
}
