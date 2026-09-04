#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const root = fileURLToPath(new URL('../src', import.meta.url));
let failed = false;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'tokens' && dir === root) {
        continue;
      }
      await walk(path);
      continue;
    }
    if (!/\.(css|ts|tsx)$/.test(entry.name)) {
      continue;
    }
    if (/\.test\.(ts|tsx)$/.test(entry.name) || /\.stories\.tsx$/.test(entry.name)) {
      continue;
    }
    const text = await readFile(path, 'utf8');
    if (HEX.test(text)) {
      failed = true;
      console.error(`hex outside tokens: ${relative(root, path)}`);
    }
  }
}

await walk(root);
if (failed) {
  process.exit(1);
}
