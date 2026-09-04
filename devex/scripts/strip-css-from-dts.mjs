import { readFile, writeFile } from 'node:fs/promises';

for (const file of ['dist/index.d.ts', 'dist/docs/index.d.ts']) {
  const text = await readFile(file, 'utf8');
  await writeFile(file, text.replace(/^import '[^']+\.css';\n/gm, ''));
}
