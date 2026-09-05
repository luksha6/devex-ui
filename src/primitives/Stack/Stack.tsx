import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Stack.module.css';

export type SpaceScale = 1 | 2 | 3 | 4 | 6 | 8;

export type StackProps<C extends ElementType = 'div'> = {
  gap?: SpaceScale;
  children: ReactNode;
  as?: C;
  className?: string;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children' | 'className'>;

export function Stack<C extends ElementType = 'div'>({
  gap = 4,
  children,
  as,
  className,
  ...rest
}: StackProps<C>) {
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag className={cx(styles.stack, styles[`gap${gap}`], className)} {...rest}>
      {children}
    </Tag>
  );
}
