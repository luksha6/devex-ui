import { createContext, useContext } from 'react';
import type { ToastTone } from './Toast';

export interface ToastInput {
  title: string;
  description?: string;
  tone?: ToastTone;
}

export interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
