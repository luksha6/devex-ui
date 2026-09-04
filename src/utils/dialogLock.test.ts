import { acquireDialogLock, releaseDialogLock } from './dialogLock';

describe('dialogLock', () => {
  beforeEach(() => {
    releaseDialogLock();
    releaseDialogLock();
    document.documentElement.removeAttribute('data-devex-dialog-open');
  });

  it('keeps the page locked until the last dialog releases', () => {
    acquireDialogLock();
    acquireDialogLock();
    expect(document.documentElement).toHaveAttribute('data-devex-dialog-open', 'true');
    releaseDialogLock();
    expect(document.documentElement).toHaveAttribute('data-devex-dialog-open', 'true');
    releaseDialogLock();
    expect(document.documentElement).not.toHaveAttribute('data-devex-dialog-open');
  });
});
