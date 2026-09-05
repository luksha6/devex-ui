import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { SpaceScale } from '../Stack/Stack';
import styles from './Cluster.module.css';

export type ClusterProps<C extends ElementType = 'div'> = {
  gap?: SpaceScale;
  children: ReactNode;
  as?: C;
  className?: string;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children' | 'className'>;

export function Cluster<C extends ElementType = 'div'>({
  gap = 2,
  children,
  as,
  className,
  ...rest
}: ClusterProps<C>) {
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag className={cx(styles.cluster, styles[`gap${gap}`], className)} {...rest}>
      {children}
    </Tag>
  );
}
