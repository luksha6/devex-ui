import { space } from '../tokens/tokens';

export type OverlayAlign = 'start' | 'end' | 'center';
export type OverlaySide = 'top' | 'bottom';

export interface OverlayBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface OverlayViewport {
  width: number;
  height: number;
}

export function placeOverlay(
  trigger: OverlayBox,
  panel: { width: number; height: number },
  viewport: OverlayViewport,
  options: { align?: OverlayAlign; gap?: number; pad?: number; prefer?: OverlaySide } = {},
): { top: number; left: number; side: OverlaySide } {
  const gap = options.gap ?? space[1];
  const pad = options.pad ?? space[2];
  const prefer = options.prefer ?? 'bottom';
  const spaceBelow = viewport.height - trigger.top - trigger.height;
  const spaceAbove = trigger.top;
  const overflowPreferred =
    prefer === 'bottom'
      ? spaceBelow < panel.height + gap && spaceAbove > spaceBelow
      : spaceAbove < panel.height + gap && spaceBelow > spaceAbove;
  const side: OverlaySide = overflowPreferred ? (prefer === 'bottom' ? 'top' : 'bottom') : prefer;
  const top =
    side === 'bottom' ? trigger.top + trigger.height + gap : trigger.top - panel.height - gap;
  let left = trigger.left;
  if (options.align === 'end') {
    left = trigger.left + trigger.width - panel.width;
  } else if (options.align === 'center') {
    left = trigger.left + trigger.width / 2 - panel.width / 2;
  }
  const maxLeft = Math.max(pad, viewport.width - panel.width - pad);
  left = Math.min(Math.max(left, pad), maxLeft);
  const maxTop = Math.max(pad, viewport.height - panel.height - pad);
  return { top: Math.min(Math.max(top, pad), maxTop), left, side };
}
