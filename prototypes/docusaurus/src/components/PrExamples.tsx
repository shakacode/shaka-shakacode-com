import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './PrExamples.module.css';

const examples = [
  {
    id: 'verification',
    number: 614,
    title: 'Start with the recommendation.',
    source: 'https://github.com/shakacode/shaka/pull/614#issue-5896740734',
    height: 1000,
    alt: 'Shaka PR #614 description with the recommendation and evidence links on one line, Intent, Verification, and expandable details.',
    annotations: [
      {top: '6%', title: 'A recommendation with its evidence', text: 'The opening line links directly to the code walkthrough, independent review, and checkpoint.'},
      {top: '40%', title: 'Know the scope and safety assumption', text: 'Intent explains why the change matters, what it covers, and how carefully to review it.'},
      {top: '68%', title: 'See what was proved and what was not', text: 'Verification names the checks and results. Not verified keeps the remaining gap visible.'},
    ],
  },
  {
    id: 'review-rounds',
    number: 614,
    title: 'Local adversarial review',
    source: 'https://github.com/shakacode/shaka/pull/614#issuecomment-6232020497',
    height: 590,
    alt: 'Shaka PR #614 local adversarial review with the reviewed revision, coverage limits, two reviewed commits, and one fixed finding.',
    annotations: [
      {top: '34%', title: 'Read the coverage limits', text: 'The review names the revision and explains what each reviewer could inspect. Tests were outside their review coverage.'},
      {top: '64%', title: 'Track a finding through repair', text: 'The first commit records one fixed finding. Both reviewers reported zero findings on the second commit.'},
      {top: '83%', title: 'Keep the full reports available', text: 'Expand findings, assessments, execution metadata, or the reports for each reviewed commit.'},
    ],
  },
  {
    id: 'walkthrough',
    number: 614,
    title: 'Understand the change and its limits.',
    source: 'https://github.com/shakacode/shaka/pull/614#pullrequestreview-5557127184',
    height: 750,
    alt: 'Shaka PR #614 code walkthrough with linked implementation, request cost, failure behavior, regression evidence, and rollback consequences.',
    annotations: [
      {top: '40%', title: 'An explanation linked to code', text: 'The walkthrough connects the missing-check bug to the implementation that now blocks it.'},
      {top: '64%', title: 'Costs and failure behavior stay visible', text: 'The change adds two GitHub requests. An unreadable rule set blocks the gate.'},
      {top: '86%', title: 'Evidence and rollback are concrete', text: 'Linked tests reproduce the old failure. The walkthrough explains that reverting restores the unsafe behavior.'},
    ],
  },
];

function PrExample({example}: {example: (typeof examples)[number]}): ReactNode {
  const imageUrl = useBaseUrl(`/img/pr-examples/${example.id}.jpg`);

  return (
    <figure className={styles.example}>
      <div className={styles.capture}>
        <Link href={imageUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Enlarge the screenshot from Shaka PR #${example.number}`}>
          <img src={imageUrl} alt={example.alt} width={799} height={example.height}
            loading="lazy" decoding="async" />
        </Link>
        {example.annotations.map((annotation, index) => (
          <span key={annotation.title} className={styles.marker}
            style={{top: annotation.top}} aria-hidden="true">{index + 1}</span>
        ))}
      </div>
      <figcaption className={styles.notes}>
        <p className={styles.source}>shakacode/shaka · PR #{example.number}</p>
        <h3>{example.title}</h3>
        <ol className={styles.annotations}>
          {example.annotations.map((annotation, index) => (
            <li key={annotation.title}>
              <span className={styles.number} aria-hidden="true">{index + 1}</span>
              <div><strong>{annotation.title}</strong><p>{annotation.text}</p></div>
            </li>
          ))}
        </ol>
        <div className={styles.links}>
          <Link href={example.source}>Read this section in PR #{example.number} →</Link>
          <Link href={imageUrl} target="_blank" rel="noopener noreferrer">Enlarge screenshot ↗</Link>
        </div>
      </figcaption>
    </figure>
  );
}

export default function PrExamples(): ReactNode {
  return (
    <div className={styles.examples}>
      {examples.map((example) => <PrExample key={example.id} example={example} />)}
      <p className={styles.archiveNote}>
        Cropped GitHub screenshots from PR #614 captured October 16, 2026 (Hawaii time), for revision cf9014b. Callouts explain the recorded results;
        they are historical examples, not a claim about any PR’s current readiness.
      </p>
    </div>
  );
}
