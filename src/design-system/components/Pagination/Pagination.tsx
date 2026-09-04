import { Button } from '../Button/Button';
import { cx } from '../../utils/cx';
import styles from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav className={cx(styles.nav, className)} aria-label="Pagination">
      <Button
        intent="secondary"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <p className={styles.status} aria-live="polite">
        Page {page} of {pageCount}
      </p>
      <Button
        intent="secondary"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
      >
        Next
      </Button>
    </nav>
  );
}
