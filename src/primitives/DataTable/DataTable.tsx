import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import styles from './DataTable.module.css';

export interface DataColumn {
  key: string;
  header: string;
  numeric?: boolean;
  mono?: boolean;
  /** When true and `onSort` is set, the header is a sort button. */
  sortable?: boolean;
}

export interface DataTableProps {
  columns: readonly DataColumn[];
  rows: Array<Record<string, ReactNode>>;
  caption?: string;
  empty?: ReactNode;
  loading?: boolean;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  rowKey?: string;
  className?: string;
}

function SortIcon({ sorted, dir }: { sorted: boolean; dir?: 'asc' | 'desc' }) {
  if (!sorted) {
    return <Icon name="chevron-down" size={12} className={styles.idle} />;
  }
  return (
    <Icon
      name={dir === 'desc' ? 'chevron-down' : 'chevron-up'}
      size={12}
      className={styles.active}
    />
  );
}

export function DataTable({
  columns,
  rows,
  caption,
  empty = 'No rows',
  loading = false,
  sortKey,
  sortDir,
  onSort,
  rowKey,
  className,
}: DataTableProps) {
  const showEmpty = !loading && rows.length === 0;
  const fillKey = columns.find((column) => !column.numeric)?.key;

  return (
    <div className={cx(styles.wrap, className)} aria-busy={loading || undefined}>
      {loading ? (
        <div className={styles.loading}>
          <Spinner label="Loading table" />
        </div>
      ) : null}
      {caption ? (
        <p className={styles.caption} aria-hidden="true">
          {caption}
        </p>
      ) : null}
      <div className={styles.scroller}>
        <table className={styles.table} aria-label={caption}>
          <thead>
            <tr>
              {columns.map((column) => {
                const canSort = Boolean(onSort && column.sortable);
                const sorted = canSort && sortKey === column.key;
                const ariaSort = sorted
                  ? sortDir === 'desc'
                    ? 'descending'
                    : 'ascending'
                  : 'none';
                const cellClass = cx(column.numeric && styles.numeric);
                const sortName = sorted
                  ? `${column.header}, ${sortDir === 'desc' ? 'descending' : 'ascending'}`
                  : column.header;
                const content = canSort ? (
                  <button
                    type="button"
                    className={cx(styles.sort, sorted && styles.sorted)}
                    aria-label={sorted ? sortName : undefined}
                    onClick={() => onSort?.(column.key)}
                  >
                    {column.header}
                    <SortIcon sorted={Boolean(sorted)} dir={sortDir} />
                  </button>
                ) : (
                  <span className={styles.head}>{column.header}</span>
                );
                return (
                  <th
                    key={column.key}
                    className={cellClass}
                    scope="col"
                    aria-sort={canSort ? ariaSort : undefined}
                  >
                    {content}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {showEmpty ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const keyValue = rowKey ? row[rowKey] : undefined;
                const key =
                  typeof keyValue === 'string' || typeof keyValue === 'number'
                    ? String(keyValue)
                    : index;
                return (
                  <tr key={key}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cx(
                          column.numeric && styles.numeric,
                          column.mono && styles.mono,
                          column.key === fillKey && styles.fill,
                        )}
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
