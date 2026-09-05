#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const fixture = resolve(root, 'fixtures/consumer');

execFileSync('npm', ['pack'], { cwd: root, stdio: 'inherit' });
const tarball = readdirSync(root).find(
  (name) => name.startsWith('luksha6-devex-ui-') && name.endsWith('.tgz'),
);
if (!tarball) {
  throw new Error('npm pack did not write a tarball');
}

execFileSync('npm', ['install', '--no-package-lock'], { cwd: fixture, stdio: 'inherit' });
execFileSync('npm', ['install', '--no-package-lock', resolve(root, tarball)], {
  cwd: fixture,
  stdio: 'inherit',
});
execFileSync('npm', ['run', 'build'], { cwd: fixture, stdio: 'inherit' });
