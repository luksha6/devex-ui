import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../primitives/Button/Button';
import { DataTable } from '../primitives/DataTable/DataTable';
import { Dialog } from '../primitives/Dialog/Dialog';
import { Drawer } from '../primitives/Drawer/Drawer';
import { Field } from '../primitives/Field/Field';
import { Menu } from '../primitives/Menu/Menu';
import { Radio, RadioGroup } from '../primitives/Radio/Radio';
import { Theme } from '../primitives/Theme/Theme';
import { runAxe } from './axe';

describe('axe', () => {
  it('keeps Dialog, Field, RadioGroup, and DataTable clean', async () => {
    function Harness() {
      const [open, setOpen] = useState(true);
      return (
        <Theme value="light">
          <Field label="Corpus" error="Query cannot be empty." />
          <RadioGroup label="Audience" value="human" onChange={() => undefined}>
            <Radio value="human" label="Human" />
            <Radio value="agent" label="Agent" />
          </RadioGroup>
          <DataTable
            caption="Corpora"
            columns={[{ key: 'id', header: 'Id', mono: true }]}
            rows={[{ id: 'knowledge-prod' }]}
          />
          <Dialog open={open} onClose={() => setOpen(false)} title="Search sections">
            <p>Section results.</p>
          </Dialog>
        </Theme>
      );
    }
    const { container } = render(<Harness />);
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });

  it('keeps Menu and Drawer named', async () => {
    const user = userEvent.setup();
    function Harness() {
      const [menu, setMenu] = useState(true);
      const [drawer, setDrawer] = useState(true);
      return (
        <Theme value="light">
          <Menu
            label="Row actions"
            open={menu}
            onOpenChange={setMenu}
            items={[{ id: 'copy', label: 'Copy id', onSelect: () => undefined }]}
          >
            <Button intent="secondary">Actions</Button>
          </Menu>
          <Drawer open={drawer} onClose={() => setDrawer(false)} title="Filters">
            <p>Owner</p>
          </Drawer>
        </Theme>
      );
    }
    const { container } = render(<Harness />);
    expect(screen.getByRole('menu', { name: 'Row actions' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
