import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Text.module.css';

export type TextVariant = 'label' | 'body' | 'title' | 'section' | 'display' | 'mono' | 'kicker';

const DEFAULT_AS: Record<TextVariant, ElementType> = {
  label: 'span',
  body: 'p',
  title: 'h2',
  section: 'h2',
  display: 'h1',
  mono: 'span',
  kicker: 'p',
};

export type TextProps<C extends ElementType = 'p'> = {
  as?: C;
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children' | 'className'>;

export function Text<C extends ElementType = 'p'>({
  as,
  variant = 'body',
  className,
  children,
  ...rest
}: TextProps<C>) {
  const Tag = (as ?? DEFAULT_AS[variant]) as ElementType;
  return (
    <Tag className={cx(styles[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
