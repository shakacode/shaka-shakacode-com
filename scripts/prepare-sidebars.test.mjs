import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { prepareSidebars } from './prepare-docs.mjs';

test('new upstream pages enter site navigation and replace stale navigation', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'shaka-sidebar-'));
  try {
    const source = path.join(root, 'source');
    const site = path.join(root, 'site');
    await fs.mkdir(source);
    await fs.mkdir(path.join(site, 'docs'), { recursive: true });
    await fs.writeFile(path.join(site, 'sidebars.json'), JSON.stringify({ docsSidebar: ['old'] }));
    await fs.writeFile(path.join(source, 'sidebars.json'), JSON.stringify({ docsSidebar: ['expected-experience'] }));
    await fs.writeFile(path.join(site, 'docs/changelog.md'), '# Changelog');
    await prepareSidebars(source, site);
    assert.deepEqual(JSON.parse(await fs.readFile(path.join(site, 'sidebars.json'), 'utf8')),
      { docsSidebar: ['expected-experience', 'changelog'] });
    await fs.rm(path.join(source, 'sidebars.json'));
    await assert.rejects(prepareSidebars(source, site), /sidebars.json/);
    await assert.rejects(fs.access(path.join(site, 'sidebars.json')), {code: 'ENOENT'});
    await fs.writeFile(path.join(source, 'sidebars.json'), 'null');
    await assert.rejects(prepareSidebars(source, site), /Expected docsSidebar array/);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
