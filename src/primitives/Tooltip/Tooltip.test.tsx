import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('describes the child only while open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Corpus id">
        <Button intent="secondary" aria-describedby="extra">
          Hover
        </Button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Hover' });
    expect(button).toHaveAttribute('aria-describedby', 'extra');
    await user.tab();
    const describedBy = button.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/extra/);
    const tipId = describedBy?.split(' ').find((part) => part !== 'extra');
    expect(document.getElementById(tipId!)).toHaveTextContent('Corpus id');
  });

  it('opens on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Corpus id">
        <Button intent="secondary">Hover</Button>
      </Tooltip>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Corpus id');
  });

  it('opens on a coarse pointer', async () => {
    const user = userEvent.setup();
    const matchMedia = window.matchMedia;
    window.matchMedia = (query: string) =>
      ({
        matches: query === '(hover: none)',
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      }) as MediaQueryList;
    render(
      <Tooltip content="Corpus id">
        <Button intent="secondary">Hover</Button>
      </Tooltip>,
    );
    try {
      await user.click(screen.getByRole('button', { name: 'Hover' }));
      expect(screen.getByRole('tooltip')).toHaveTextContent('Corpus id');
    } finally {
      window.matchMedia = matchMedia;
    }
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Corpus id">
        <Button intent="secondary">Hover</Button>
      </Tooltip>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
