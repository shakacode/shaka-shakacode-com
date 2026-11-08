import fs from 'node:fs/promises';
import path from 'node:path';

function sidebarDocIds(items) {
  return items.flatMap(item => {
    if (typeof item === 'string') return [item];
    if (item.type === 'doc') return [item.id];
    if (item.type === 'category') {
      const linkedDoc = item.link?.type === 'doc' ? [item.link.id] : [];
      return [...linkedDoc, ...sidebarDocIds(item.items)];
    }
    if (item.type === 'link') return [];
    throw new Error(`Unsupported llms.txt sidebar item: ${JSON.stringify(item)}`);
  });
}

function linkLabel(title) {
  return title.replace(/\s+/g, ' ').replace(/[\\[\]]/g, '\\$&');
}

export default function llmsTxtPlugin({siteDir, siteConfig}) {
  return {
    name: 'shaka-llms-txt',
    async postBuild({outDir, plugins}) {
      const destination = path.join(outDir, 'llms.txt');
      await fs.rm(destination, {force: true});
      const sidebar = JSON.parse(await fs.readFile(path.join(siteDir, 'sidebars.json'), 'utf8'));
      const docsPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-docs');
      const version = docsPlugin?.content?.loadedVersions.find(item => item.versionName === 'current');
      if (!version || !Array.isArray(sidebar.docsSidebar)) {
        throw new Error('llms.txt requires the current docs and synced docsSidebar');
      }
      const docsById = new Map(version.docs.map(doc => [doc.id, doc]));
      const links = [...new Set(sidebarDocIds(sidebar.docsSidebar))].map(id => {
        const doc = docsById.get(id);
        if (!doc?.title || !doc.permalink) {
          throw new Error(`Missing llms.txt sidebar doc: ${id}`);
        }
        return `- [${linkLabel(doc.title)}](${new URL(doc.permalink, siteConfig.url).href})`;
      });
      await fs.writeFile(destination, [
        '# Shaka',
        '',
        '> Shaka is a skill for AI coding agents that delivers tested, reviewed pull requests.',
        '',
        'Start with the getting-started guide. Ask your coding agent for help with the reference docs.',
        '',
        '## Documentation',
        '',
        ...links,
        '',
      ].join('\n'));
    },
  };
}
