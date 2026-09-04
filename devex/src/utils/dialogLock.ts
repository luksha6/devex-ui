let count = 0;

export function acquireDialogLock() {
  if (typeof document === 'undefined') {
    return;
  }
  count += 1;
  document.documentElement.setAttribute('data-devex-dialog-open', 'true');
}

export function releaseDialogLock() {
  if (typeof document === 'undefined') {
    return;
  }
  count = Math.max(0, count - 1);
  if (count === 0) {
    document.documentElement.removeAttribute('data-devex-dialog-open');
  }
}
