// Turns GitHub REST responses for shakacode/shaka into the small records the live
// activity feed renders. PR bodies are untrusted text, so only links back into the
// same repository's pull requests are kept.

export const REPO = 'shakacode/shaka';
export const COMMITS_API = `https://api.github.com/repos/${REPO}/commits?sha=main&per_page=8`;

// GitHub cannot list PRs by merge time, but squash commits on main arrive in merge order.
// The search covers every PR merged into main since the oldest listed commit, so each
// commit's PR, with its body, is in the result.
export function searchApi(commits) {
  const dates = commits.filter((commit) => commit.pr).map((commit) => commit.date);
  if (dates.length === 0) return null;
  const since = dates.reduce((oldest, date) => (date < oldest ? date : oldest));
  const query = `repo:${REPO} is:pr is:merged base:main merged:>=${since}`;
  return `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=30`;
}

const PARTS = ['Code Walkthrough', 'Code Review', 'Checkpoint'];
const LINK = /\[(Code Walkthrough|Code Review|Checkpoint)\]\((https:\/\/github\.com\/shakacode\/shaka\/pull\/\d+#[\w-]+)\)/g;
const RECOMMENDATION = /\*\*Recommendation: ([A-Za-z ]{1,40})\*\*/;
const PR_SUFFIX = /\(#(\d+)\)\s*$/;

export function mergedPulls(commits, searchItems, limit = 6) {
  const items = new Map(searchItems.map((item) => [item.number, item]));
  return commits
    .filter((commit) => commit.pr)
    .slice(0, limit)
    .map((commit) => {
      const item = items.get(commit.pr);
      const body = item?.body || '';
      const found = new Map();
      for (const [, label, url] of body.matchAll(LINK)) {
        if (!found.has(label)) found.set(label, url);
      }
      return {
        number: commit.pr,
        title: item?.title ?? commit.title,
        url: `https://github.com/${REPO}/pull/${commit.pr}`,
        mergedAt: item?.pull_request?.merged_at ?? commit.date,
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
