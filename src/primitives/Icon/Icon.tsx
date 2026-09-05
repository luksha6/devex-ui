import type { ReactNode, SVGAttributes } from 'react';
import type { IconName } from '../../types';
import { cx } from '../../utils/cx';
import styles from './Icon.module.css';

const GLYPHS: Record<IconName, ReactNode> = {
  check: <path d="M3.5 8.2 6.6 11.4 12.5 4.6" />,
  close: <path d="M4 4 12 12 M12 4 4 12" />,
  search: (
    <>
      <circle cx="7" cy="7" r="4.25" />
      <path d="M10.3 10.3 13.5 13.5" />
    </>
  ),
  'chevron-down': <path d="M4.2 6 8 10 11.8 6" />,
  'chevron-up': <path d="M4.2 10 8 6 11.8 10" />,
  'chevron-right': <path d="M6 4.2 10 8 6 11.8" />,
  caution: (
    <>
      <path d="M8 2.4 14.3 13.6 H1.7 Z" />
      <path d="M8 6.4 v3.2 M8 11.4 v0.6" />
    </>
  ),
  info: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 7.4 v4 M8 5.2 v0.6" />
    </>
  ),
  plus: <path d="M8 3.2 v9.6 M3.2 8 h9.6" />,
  minus: <path d="M3.2 8 h9.6" />,
  copy: (
    <>
      <rect x="5.5" y="5.5" width="7.5" height="7.5" />
      <path d="M5 10.5 H3.5 V3.5 h7 v1.5" />
    </>
  ),
  external: (
    <>
      <path d="M9 3.5 h3.5 V7" />
      <path d="M12.5 3.5 8 9" />
      <path d="M6.5 4.5 H3.5 v8 h8 V9.5" />
    </>
  ),
  menu: <path d="M2.5 4.5 h11 M2.5 8 h11 M2.5 11.5 h11" />,
  calendar: (
    <>
      <rect x="2.5" y="3.5" width="11" height="10.5" rx="1" />
      <path d="M2.5 6.5 h11 M5.5 2.5 v2.5 M10.5 2.5 v2.5" />
    </>
  ),
  upload: (
    <>
      <path d="M8 11.5 V4.5 M5.5 6.5 8 4 10.5 6.5" />
      <path d="M3.5 12.5 h9" />
    </>
  ),
};

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  name?: IconName;
  size?: 12 | 16 | 20;
  label?: string;
  children?: ReactNode;
}

export function Icon({ name, size = 16, label, className, children, ...rest }: IconProps) {
  const decorative = !label;
  return (
    <svg
      {...rest}
      className={cx(styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden={decorative || undefined}
      aria-label={label}
      role={decorative ? undefined : 'img'}
      focusable="false"
    >
      {children ?? (name ? GLYPHS[name] : null)}
    </svg>
  );
}
