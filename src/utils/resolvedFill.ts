import type { ButtonFill, ButtonIntent } from '../types';

export function resolvedFill(intent: ButtonIntent, fill?: ButtonFill): ButtonFill | undefined {
  if (intent === 'ghost') {
    return undefined;
  }
  return fill ?? (intent === 'primary' ? 'filled' : 'outline');
}
