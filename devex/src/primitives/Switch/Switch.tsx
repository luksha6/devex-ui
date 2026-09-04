import { forwardRef, useId, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'id'
> {
  /** Visible label. Associated with the switch via aria-labelledby, not a wrapping label. */
  label: ReactNode;
  /** Word on the unchecked side. Default Off. */
  offLabel?: string;
  /** Word on the checked side. Default On. */
  onLabel?: string;
  /** Controlled. There is no uncontrolled mode. */
  checked: boolean;
  /** Called with the next boolean. Not a change event. */
  onChange: (checked: boolean) => void;
  id?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, offLabel = 'Off', onLabel = 'On', checked, onChange, id, className, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const switchId = id ?? generatedId;

  return (
    <div className={cx(styles.row, className)}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <button
        {...rest}
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        className={styles.track}
        aria-checked={checked}
        aria-labelledby={labelId}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.face} data-side="off" aria-hidden="true">
          {offLabel}
        </span>
        <span className={styles.face} data-side="on" aria-hidden="true">
          {onLabel}
        </span>
      </button>
    </div>
  );
});
