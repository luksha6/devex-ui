import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import styles from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  onChange: (page: number) => void;
  pageCount?: number;
  hasMore?: boolean;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  status?: string;
  className?: string;
}

export function Pagination({
  page,
  onChange,
  pageCount,
  hasMore,
  label = 'Pagination',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  status,
  className,
}: PaginationProps) {
  const last = pageCount !== undefined ? page >= pageCount : hasMore === true ? false : true;
  const named =
    status ??
    (pageCount !== undefined
      ? `Page ${page} of ${pageCount}`
      : hasMore === true
        ? `Page ${page}, more`
        : hasMore === false
          ? `Page ${page}, last`
          : `Page ${page}`);

  return (
    <nav className={cx(styles.bar, className)} aria-label={label}>
      <Button intent="secondary" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        {previousLabel}
      </Button>
      <Text variant="mono" className={styles.status}>
        {named}
      </Text>
      <Button intent="secondary" size="sm" disabled={last} onClick={() => onChange(page + 1)}>
        {nextLabel}
      </Button>
    </nav>
  );
}
