import '@luksha6/devex-ui/styles.css';
import { Button, Dialog, Page, Theme } from '@luksha6/devex-ui';
import { AudienceSwitch, Run, type DocBlock } from '@luksha6/devex-ui/docs';
import { useState } from 'react';

const blocks: DocBlock[] = [
  {
    type: 'paragraph',
    text: ['Do not retry 409. See ', { text: 'the runbook', href: '/runbook' }, '.'],
  },
  { type: 'list', items: ['Wait for replica lag under 30s'] },
];

export function App() {
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<'human' | 'agent'>('human');
  return (
    <Theme value="light">
      <Page>
        <Button onClick={() => setOpen(true)}>Search</Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Search sections">
          Section results.
        </Dialog>
        <AudienceSwitch value={audience} onChange={setAudience} blocks={blocks} />
        <Run phase="fail" label="Reindex knowledge-prod" detail="Replica lag is over 30s." />
      </Page>
    </Theme>
  );
}
