import axe from 'axe-core';
import type { AxeResults } from 'axe-core';

export async function runAxe(container: HTMLElement): Promise<AxeResults> {
  return axe.run(document.body.contains(container) ? document.body : container, {
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  });
}
