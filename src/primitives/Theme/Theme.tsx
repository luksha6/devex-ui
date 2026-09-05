'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Theme.module.css';

export type ThemeValue = 'light' | 'dark';

export const ThemeContext = createContext<ThemeValue>('light');

export function useTheme(): ThemeValue {
  return useContext(ThemeContext);
}

export interface ThemeProps {
  value: ThemeValue;
  root?: 'local' | 'document';
  children?: ReactNode;
  className?: string;
}

export function Theme({ value, root = 'local', children, className }: ThemeProps) {
  useEffect(() => {
    if (root !== 'document' || typeof document === 'undefined') {
      return;
    }
    document.documentElement.dataset.theme = value;
    document.documentElement.dataset.devex = '';
    return () => {
      delete document.documentElement.dataset.theme;
      delete document.documentElement.dataset.devex;
    };
  }, [root, value]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={cx(styles.root, className)} data-devex="" data-theme={value}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
