import { placeOverlay } from './placeOverlay';

describe('placeOverlay', () => {
  const trigger = { top: 40, left: 20, width: 80, height: 32 };
  const panel = { width: 160, height: 120 };

  it('opens below when there is room', () => {
    const next = placeOverlay(trigger, panel, { width: 800, height: 600 });
    expect(next.side).toBe('bottom');
    expect(next.top).toBe(76);
    expect(next.left).toBe(20);
  });

  it('flips above when the viewport is short', () => {
    const next = placeOverlay({ ...trigger, top: 500 }, panel, { width: 800, height: 540 });
    expect(next.side).toBe('top');
    expect(next.top).toBe(376);
  });

  it('shifts left so the panel stays in the viewport', () => {
    const next = placeOverlay(
      { top: 40, left: 700, width: 80, height: 32 },
      panel,
      { width: 800, height: 600 },
      { align: 'start' },
    );
    expect(next.left).toBe(632);
  });
});
