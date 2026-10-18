// Turns GitHub REST responses for shakacode/shaka into the small records the live
// activity feed renders. PR bodies are untrusted text, so only links back into the
// same repository's pull requests are kept.

export const REPO = 'shakacode/shaka';
export const PULLS_API = `https://api.github.com/repos/${REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=10`;
export const COMMITS_API = `https://api.github.com/repos/${REPO}/commits?sha=main&per_page=8`;

const PARTS = ['Code Walkthrough', 'Code Review', 'Checkpoint'];
const LINK = /\[(Code Walkthrough|Code Review|Checkpoint)\]\((https:\/\/github\.com\/shakacode\/shaka\/pull\/\d+#[\w-]+)\)/g;
const RECOMMENDATION = /\*\*Recommendation: ([A-Za-z ]{1,40})\*\*/;
const PR_SUFFIX = /\(#(\d+)\)\s*$/;

export function parsePulls(pulls, limit = 6) {
  return pulls
    .filter((pull) => pull.merged_at)
    .sort((a, b) => b.merged_at.localeCompare(a.merged_at))
    .slice(0, limit)
    .map((pull) => {
      const body = pull.body || '';
      const found = new Map();
      for (const [, label, url] of body.matchAll(LINK)) {
        if (!found.has(label)) found.set(label, url);
      }
      return {
        number: pull.number,
        title: pull.title,
        url: pull.html_url,
        mergedAt: pull.merged_at,
        recommendation: body.match(RECOMMENDATION)?.[1].trim() ?? null,
        links: PARTS.filter((label) => found.has(label)).map((label) => ({label, url: found.get(label)})),
      };
    });
}

export function parseCommits(commits) {
  return commits.map((commit) => {
    const title = commit.commit.message.split('\n')[0];
    const pr = title.match(PR_SUFFIX)?.[1];
    return {
      sha: commit.sha.slice(0, 7),
      url: commit.html_url,
      title: title.replace(PR_SUFFIX, '').trim(),
      date: commit.commit.committer.date,
      pr: pr ? Number(pr) : null,
    };
  });
}

export function timeAgo(iso, now = Date.now()) {
  const minutes = Math.round((now - Date.parse(iso)) / 60000);
  const format = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
  if (minutes < 60) return format.format(-Math.max(minutes, 0), 'minute');
  const hours = Math.round(minutes / 60);
  if (hours < 48) return format.format(-hours, 'hour');
  return format.format(-Math.round(hours / 24), 'day');
}
