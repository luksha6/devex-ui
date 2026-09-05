import { useState } from 'react';
import { Button } from '../primitives/Button/Button';
import { Dialog } from '../primitives/Dialog/Dialog';
import { Field } from '../primitives/Field/Field';
import { specimen } from './Foundation';

export function MotionDemo() {
  const [open, setOpen] = useState(false);
  const [corpus, setCorpus] = useState('knowledge-prod');
  return (
    <>
      <div className={specimen.band}>
        <p className={specimen.kicker}>Focus</p>
        <p className={specimen.body}>
          Tab onto the field, then the button. Fields take the ring on the border. Filled buttons
          keep a tight ring. Outline and ghost offset by 2px.
        </p>
        <div className={specimen.related}>
          <Field
            label="Corpus"
            value={corpus}
            onChange={(event) => setCorpus(event.target.value)}
          />
          <div>
            <Button>Verify</Button>
          </div>
        </div>
      </div>
      <div className={specimen.band}>
        <p className={specimen.kicker}>State</p>
        <p className={specimen.body}>
          Open is 180ms opacity. The result stays if motion is reduced.
        </p>
        <div>
          <Button onClick={() => setOpen(true)}>Open dialog</Button>
        </div>
        <Dialog open={open} onClose={() => setOpen(false)} title="Confirm cutover">
          <p>Opacity only. 180ms.</p>
        </Dialog>
      </div>
      <div className={specimen.band}>
        <p className={specimen.kicker}>Reduced</p>
        <p className={specimen.body}>Duration tokens collapse. Loops stop. The result stays.</p>
      </div>
    </>
  );
}
