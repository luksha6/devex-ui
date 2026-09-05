#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const AA = 4.5;
const source = await readFile(
  fileURLToPath(new URL('../src/tokens/tokens.ts', import.meta.url)),
  'utf8',
);

function palette(name) {
  const block = source.match(new RegExp(`${name}: \\{([^}]+)\\}`, 'm'));
  if (!block) {
    throw new Error(`missing ${name} palette`);
  }
  const values = {};
  for (const line of block[1].split('\n')) {
    const pair = line.match(/(\w+):\s*'(#[0-9a-fA-F]{6})'/);
    if (pair) {
      values[pair[1]] = pair[2];
    }
  }
  return values;
}

function channel(value) {
  const next = value / 255;
  return next <= 0.04045 ? next / 12.92 : ((next + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const n = Number.parseInt(hex.replace('#', ''), 16);
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const pairs = [
  ['text', 'bg'],
  ['textMuted', 'bg'],
  ['text', 'surface'],
  ['textMuted', 'surface'],
  ['interactive', 'bg'],
  ['danger', 'bg'],
  ['success', 'bg'],
  ['warning', 'bg'],
  ['deprecated', 'bg'],
  ['internal', 'bg'],
  ['bg', 'interactive'],
  ['bg', 'text'],
  ['bg', 'danger'],
];

let failed = false;
for (const theme of ['light', 'dark']) {
  const colors = palette(theme);
  for (const [fg, bg] of pairs) {
    const score = ratio(colors[fg], colors[bg]);
    if (score < AA) {
      failed = true;
      console.error(`${theme} ${fg} on ${bg}: ${score.toFixed(2)} (need ${AA})`);
    }
  }
}

if (failed) {
  process.exit(1);
}
