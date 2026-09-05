'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { FieldShell } from '../Field/FieldShell';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  label: string;
  files: readonly File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  hint?: ReactNode;
  error?: string;
  disabled?: boolean;
  dropLabel?: string;
  browseLabel?: string;
  addLabel?: string;
  removeLabel?: string;
  tooLargeLabel?: string;
  tooManyLabel?: string;
  id?: string;
  className?: string;
}

function sameFile(left: File, right: File) {
  return (
    left.name === right.name && left.size === right.size && left.lastModified === right.lastModified
  );
}

function formatSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(file: File) {
  return file.type.startsWith('image/');
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    label,
    files,
    onChange,
    accept,
    multiple = false,
    maxSize,
    maxFiles,
    hint,
    error,
    disabled = false,
    dropLabel = 'Drop files here',
    browseLabel = 'Browse',
    addLabel = 'Add file',
    removeLabel = 'Remove',
    tooLargeLabel = 'File is too large',
    tooManyLabel = 'Too many files',
    id,
    className,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inner = useRef<HTMLInputElement | null>(null);
  const drag = useRef(0);
  const [over, setOver] = useState(false);
  const [reject, setReject] = useState('');
  const [previews, setPreviews] = useState<string[]>([]);

  const canAdd =
    !disabled && (multiple ? maxFiles == null || files.length < maxFiles : files.length === 0);

  useEffect(() => {
    const urls = files.map((file) => (isImage(file) ? URL.createObjectURL(file) : ''));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [files]);

  function assignRef(node: HTMLInputElement | null) {
    inner.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  function announce(message: string) {
    setReject(message);
  }

  function merge(incoming: File[]) {
    const next = multiple ? [...files] : [];
    for (const file of incoming) {
      if (maxSize != null && file.size > maxSize) {
        announce(`${file.name}: ${tooLargeLabel} (${formatSize(maxSize)}).`);
        continue;
      }
      if (next.some((held) => sameFile(held, file))) {
        continue;
      }
      if (maxFiles != null && next.length >= maxFiles) {
        announce(tooManyLabel);
        break;
      }
      if (!multiple) {
        next.length = 0;
      }
      next.push(file);
      announce('');
    }
    onChange(next);
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    merge(Array.from(event.target.files ?? []));
    event.target.value = '';
  }

  function pick() {
    if (canAdd) {
      inner.current?.click();
    }
  }

  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disabled || !canAdd) {
      return;
    }
    drag.current += 1;
    setOver(true);
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    drag.current = Math.max(0, drag.current - 1);
    if (drag.current === 0) {
      setOver(false);
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    drag.current = 0;
    setOver(false);
    if (disabled || !canAdd) {
      return;
    }
    merge(Array.from(event.dataTransfer.files));
  }

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={inputId} className={className}>
      {(describedBy) => (
        <div
          className={cx(styles.wrap, over && styles.over)}
          onDragEnter={onDragEnter}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <VisuallyHidden>
            <input
              ref={assignRef}
              id={inputId}
              type="file"
              accept={accept}
              multiple={multiple}
              disabled={disabled || !canAdd}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              onChange={onInput}
            />
          </VisuallyHidden>
          {files.length === 0 ? (
            <button
              type="button"
              className={cx(styles.drop, disabled && styles.blocked)}
              disabled={disabled}
              onClick={pick}
            >
              <span className={styles.glyph} aria-hidden="true">
                <Icon name="upload" />
              </span>
              <Text variant="title" as="span">
                {dropLabel}
              </Text>
              <Text variant="body" className={styles.browse} as="span">
                or {browseLabel}
              </Text>
            </button>
          ) : (
            <ul className={styles.list} aria-label={`${label} selected`}>
              {files.map((file, index) => {
                const preview = previews[index];
                return (
                  <li
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className={cx(styles.tile, preview && styles.shot)}
                  >
                    {preview ? (
                      <img className={styles.preview} src={preview} alt={file.name} />
                    ) : (
                      <>
                        <span className={styles.doc} aria-hidden="true">
                          <Icon name="copy" />
                        </span>
                        <span className={styles.meta}>
                          <span className={styles.name}>{file.name}</span>
                          <span className={styles.size}>{formatSize(file.size)}</span>
                        </span>
                      </>
                    )}
                    {preview ? (
                      <span className={styles.caption} aria-hidden="true">
                        {file.name}
                      </span>
                    ) : null}
                    <IconButton
                      className={styles.remove}
                      label={`${removeLabel} ${file.name}`}
                      size="sm"
                      intent="ghost"
                      disabled={disabled}
                      onClick={() => onChange(files.filter((held) => !sameFile(held, file)))}
                    >
                      <Icon name="close" size={12} />
                    </IconButton>
                  </li>
                );
              })}
              {multiple && canAdd ? (
                <li>
                  <button type="button" className={styles.add} onClick={pick}>
                    <span className={styles.glyph} aria-hidden="true">
                      <Icon name="upload" />
                    </span>
                    <span className={styles.addLabel}>{addLabel}</span>
                  </button>
                </li>
              ) : null}
            </ul>
          )}
          {reject ? (
            <p className={styles.reject} role="alert">
              {reject}
            </p>
          ) : null}
        </div>
      )}
    </FieldShell>
  );
});
