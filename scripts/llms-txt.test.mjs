import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import llmsTxtPlugin from './llms-txt.mjs';

test('build publishes sidebar docs once using their resolved titles and routes', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'shaka-llms-'));
  try {
    const outDir = path.join(root, 'build');
    await fs.mkdir(outDir);
    await fs.writeFile(path.join(root, 'sidebars.json'), JSON.stringify({docsSidebar: [
      'README',
      {type: 'category', label: 'Reference', items: [
        {type: 'doc', id: 'reference/nested', label: 'Short sidebar label'},
        'README',
      ]},
      {type: 'link', label: 'GitHub', href: 'https://github.com/shakacode/shaka'},
      'changelog',
    ]}));
    const docs = [
      {id: 'README', title: 'Documentation', permalink: '/docs'},
      {id: 'reference/nested', title: 'A [nested] guide', permalink: '/docs/custom-slug'},
      {id: 'changelog', title: 'Changelog', permalink: '/docs/changelog'},
      {id: 'unlisted', title: 'Not in the sidebar', permalink: '/docs/unlisted'},
    ];
    const plugins = [{name: 'docusaurus-plugin-content-docs', content: {
      loadedVersions: [{versionName: 'current', docs}],
    }}];
    const plugin = llmsTxtPlugin({siteDir: root, siteConfig: {url: 'https://shaka.shakacode.com'}});
    await plugin.postBuild({outDir, plugins});
    const output = await fs.readFile(path.join(outDir, 'llms.txt'), 'utf8');
    assert.match(output, /^# Shaka\n\n> /);
    assert.deepEqual(output.split('\n').filter(line => line.startsWith('- ')), [
      '- [Documentation](https://shaka.shakacode.com/docs)',
      '- [A \\[nested\\] guide](https://shaka.shakacode.com/docs/custom-slug)',
      '- [Changelog](https://shaka.shakacode.com/docs/changelog)',
    ]);
    await fs.writeFile(path.join(root, 'sidebars.json'), JSON.stringify({docsSidebar: ['reference/nested']}));
    await plugin.postBuild({outDir, plugins});
    const refreshed = await fs.readFile(path.join(outDir, 'llms.txt'), 'utf8');
    assert.doesNotMatch(refreshed, /- \[Documentation\]|- \[Changelog\]/);
    await fs.writeFile(path.join(root, 'sidebars.json'), JSON.stringify({docsSidebar: ['missing']}));
    await assert.rejects(plugin.postBuild({outDir, plugins}), /missing/);
    await assert.rejects(fs.access(path.join(outDir, 'llms.txt')), {code: 'ENOENT'});
  } finally {
    await fs.rm(root, {recursive: true, force: true});
  }
});
