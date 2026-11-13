import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './PrExamples.module.css';

export const SAMPLE_PR_URL = 'https://github.com/shakacode/shaka/pull/1151#issue-6345019520';

const examples = [
  {
    id: 'verification',
    number: 1151,
    title: 'Start with the recommendation.',
    source: SAMPLE_PR_URL,
    height: 701,
    alt: 'Shaka PR #1151 fixes two links in the installed gem. Its description shows a merge recommendation, medium risk, scope, and verification at acf0df6.',
    annotations: [
      {top: '9%', title: 'Start with the recommendation and risk', text: 'See the suggested next step, how closely to review, and links to the walkthrough, review, and checkpoint.'},
      {top: '29%', title: 'See why the links broke', text: 'Intent explains why the two links fail in the installed gem and why the replacement is safe.'},
      {top: '90%', title: 'Check which revision was verified', text: 'Verification reports the checks and links to the review for revision acf0df6.'},
    ],
  },
  {
    id: 'review-rounds',
    number: 667,
    title: 'Local adversarial review',
    source: 'https://github.com/shakacode/shaka/pull/667#issuecomment-6247987027',
    height: 700,
    alt: 'Shaka PR #667 local adversarial review with the reviewed revision, coverage limits, three reviewed commits, fixed and dismissed findings, and expandable reports.',
    annotations: [
      {top: '25%', title: 'Read the coverage limits', text: 'The review names the revision and explains what each reviewer could inspect. Tests were outside their review coverage.'},
      {top: '62%', title: 'Track findings and their dispositions', text: 'The table records fixes, dismissed findings, and optional notes across three commits. No open findings remain.'},
      {top: '81%', title: 'Keep the full reports available', text: 'Expand findings, assessments, execution metadata, or the reports for each reviewed commit.'},
    ],
  },
  {
    id: 'walkthrough',
    number: 667,
    title: 'Understand the change and its limits.',
    source: 'https://github.com/shakacode/shaka/pull/667#pullrequestreview-5562252902',
    height: 1173,
    alt: 'Shaka PR #667 code walkthrough with linked implementation, a container-evidence flow diagram, comparison limits, tests, and rollback consequences.',
    annotations: [
      {top: '25%', title: 'An explanation linked to code', text: 'Links connect the explanation to the code that captures, binds, and compares the container environment.'},
      {top: '45%', title: 'See how the pieces connect', text: 'A small flow diagram connects Docker inspection, the saved fingerprint, and the comparison decision.'},
      {top: '76%', title: 'Evidence and rollback are concrete', text: 'The report names focused tests and qualification limits. Reverting removes the reader and guard while preserving private evidence.'},
    ],
  },
];

function PrExample({example}: {example: (typeof examples)[number]}): ReactNode {
  const imageUrl = useBaseUrl(`/img/pr-examples/${example.id}.jpg`);

  return (
    <figure className={styles.example}>
      <div className={styles.capture}>
        <a href={imageUrl}>
          <img src={imageUrl} alt={example.alt} width={799} height={example.height}
            loading="lazy" decoding="async" />
        </a>
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
        PR #1151 was captured November 12, 2026 (Hawaii time), at acf0df6. The review and
        walkthrough from PR #667 were captured October 17, 2026, at da20327.
        The recommendations shown apply to those historical revisions.
      </p>
    </div>
  );
}
