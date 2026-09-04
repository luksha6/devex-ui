import type { Lifecycle } from '../../types';
import { Mono, Table } from '../../primitives/Table/Table';
import { RequiredTag, Tag } from '../../primitives/Tag/Tag';
import styles from './ParameterTable.module.css';

export interface ParameterRow {
  name: string;
  type: string;
  defaultValue: string;
  notes: string;
  required?: boolean;
  lifecycle?: Lifecycle;
  replaces?: string;
  expectedGa?: string;
}

export interface ParameterTableProps {
  rows: readonly ParameterRow[];
  className?: string;
}

function lifecycleLabel(row: ParameterRow): string | undefined {
  if (!row.lifecycle) {
    return undefined;
  }
  if (row.lifecycle === 'beta' && row.expectedGa) {
    return `beta · GA ${row.expectedGa}`;
  }
  if (row.lifecycle === 'deprecated' && row.replaces) {
    return `deprecated · use ${row.replaces}`;
  }
  return row.lifecycle;
}

export function ParameterTable({ rows, className }: ParameterTableProps) {
  return (
    <Table
      className={className}
      headers={['Parameter', 'Type', 'Default', 'Notes']}
      rows={rows.map((row) => [
        <span key={`${row.name}-name`} className={styles.name}>
          <Mono>{row.name}</Mono>
          {row.required ? <RequiredTag /> : null}
          {row.lifecycle ? <Tag kind={row.lifecycle}>{lifecycleLabel(row)}</Tag> : null}
        </span>,
        <span key={`${row.name}-type`} className={styles.type}>
          {row.type}
        </span>,
        <span key={`${row.name}-default`} className={styles.default}>
          {row.defaultValue}
        </span>,
        <span key={`${row.name}-notes`} className={styles.notes}>
          {row.notes}
        </span>,
      ])}
    />
  );
}
