import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';

import {COMMITS_API, PULLS_API, parseCommits, parsePulls, timeAgo} from '../lib/shakaActivity.mjs';
import styles from './LiveShakaActivity.module.css';

type Pull = ReturnType<typeof parsePulls>[number];
type Commit = ReturnType<typeof parseCommits>[number];
type Activity = {pulls: Pull[]; commits: Commit[]};
type View = 'pulls' | 'commits';

const GITHUB = 'https://github.com/shakacode/shaka';
const CACHE_KEY = 'shaka-live-activity';
// GitHub allows 60 unauthenticated API requests an hour per address, so reuse a recent result.
const CACHE_MS = 10 * 60 * 1000;

const readingSteps = [
  {label: 'Description', text: 'The recommendation, intent, and what was verified.'},
  {label: 'Code Walkthrough', text: 'The change explained, with links to the lines.'},
  {label: 'Code Review', text: 'Independent review rounds and what they fixed.'},
  {label: 'Checkpoint', text: 'Whether this was the right thing to build.'},
];

const fallbackLinks = [
  {label: 'All merged PRs', href: `${GITHUB}/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc`},
  {label: 'PRs in progress', href: `${GITHUB}/pulls`},
  {label: 'Commits on main', href: `${GITHUB}/commits/main/`},
];

function readCache(): Activity | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    return cached && Date.now() - cached.savedAt < CACHE_MS ? cached.activity : null;
  } catch {
    return null;
  }
}

function writeCache(activity: Activity): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({savedAt: Date.now(), activity}));
  } catch {
    // Storage can be unavailable; the feed still works without the cache.
  }
}

async function fetchJson(url: string): Promise<unknown[]> {
  const response = await fetch(url, {headers: {Accept: 'application/vnd.github+json'}});
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  return response.json();
}

function PullList({pulls}: {pulls: Pull[]}): ReactNode {
  return (
    <ol className={styles.list}>
      {pulls.map((pull) => (
        <li key={pull.number}>
          <Link className={styles.title} href={pull.url}>{pull.title}</Link>
          <p className={styles.meta}>
            #{pull.number} · merged {timeAgo(pull.mergedAt)}
            {pull.recommendation && <> · Recommendation: {pull.recommendation}</>}
          </p>
          <div className={styles.chips}>
            <Link href={pull.url}>Description</Link>
            {pull.links.map((link) => <Link key={link.label} href={link.url}>{link.label}</Link>)}
          </div>
        </li>
      ))}
    </ol>
  );
}

function CommitList({commits}: {commits: Commit[]}): ReactNode {
  return (
    <ol className={styles.list}>
      {commits.map((commit) => (
        <li key={commit.sha}>
          <span className={styles.title}>{commit.title}</span>
          <p className={styles.meta}>
            <Link href={commit.url}><code>{commit.sha}</code></Link> · {timeAgo(commit.date)}
            {commit.pr && <> · <Link href={`${GITHUB}/pull/${commit.pr}`}>PR #{commit.pr} →</Link></>}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function LiveShakaActivity(): ReactNode {
  const [view, setView] = useState<View>('pulls');
  const [activity, setActivity] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setActivity(cached);
      return;
    }
    let active = true;
    Promise.all([fetchJson(PULLS_API), fetchJson(COMMITS_API)])
      .then(([pulls, commits]) => {
        const loaded = {pulls: parsePulls(pulls), commits: parseCommits(commits)};
        writeCache(loaded);
        if (active) setActivity(loaded);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.activity}>
      <ol className={styles.steps} aria-label="How to read a Shaka PR">
        {readingSteps.map((step, index) => (
          <li key={step.label}>
            <span className={styles.step} aria-hidden="true">{index + 1}</span>
            <div><strong>{step.label}</strong><p>{step.text}</p></div>
          </li>
        ))}
      </ol>

      <div className={styles.feed}>
        <div className={styles.tabs} role="group" aria-label="Choose live activity">
          <button type="button" aria-pressed={view === 'pulls'} onClick={() => setView('pulls')}>
            Recently merged PRs
          </button>
          <button type="button" aria-pressed={view === 'commits'} onClick={() => setView('commits')}>
            Latest commits on main
          </button>
        </div>

        <div aria-live="polite">
          {activity && view === 'pulls' && <PullList pulls={activity.pulls} />}
          {activity && view === 'commits' && <CommitList commits={activity.commits} />}
          {!activity && !failed && <p className={styles.status}>Loading the latest activity from GitHub…</p>}
          {failed && (
            <p className={styles.status}>
              GitHub did not answer, possibly because of its hourly limit. Use the links below instead.
            </p>
          )}
        </div>

        <div className={styles.fallback}>
          {fallbackLinks.map((link) => <Link key={link.href} href={link.href}>{link.label} →</Link>)}
        </div>
      </div>
    </div>
  );
}
