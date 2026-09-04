import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Table.module.css';

export interface TableProps {
  headers: ReactNode[];
  rows: ReactNode[][];
  rowKeys?: Array<string | number>;
  className?: string;
}

export function Table({ headers, rows, rowKeys, className }: TableProps) {
  return (
    <div className={cx(styles.shell, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowKeys?.[rowIndex] ?? rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return <span className={styles.mono}>{children}</span>;
}
