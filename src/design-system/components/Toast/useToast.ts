import { useToastContext } from './toast-context';
import type { ToastInput } from './toast-context';

export function useToast(): (input: ToastInput) => void {
  return useToastContext().toast;
}
