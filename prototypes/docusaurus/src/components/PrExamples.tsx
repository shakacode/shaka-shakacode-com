import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './PrExamples.module.css';

export const SAMPLE_PR_URL = 'https://github.com/shakacode/shaka/pull/1149#issue-6336962841';

const examples = [
  {
    id: 'verification',
    number: 1149,
    title: 'Start with the recommendation.',
    source: SAMPLE_PR_URL,
    height: 894,
    alt: 'Shaka PR #1149 updates the guide for annotated before-and-after images. Its description shows a merge recommendation, medium risk, intent, scope, verification at 480bc69, and what was not verified.',
    annotations: [
      {top: '7%', title: 'Start with the recommendation and risk', text: 'See the suggested next step, how closely to review, and links to the walkthrough, review, and checkpoint.'},
      {top: '31%', title: 'Know why the change exists', text: 'Intent explains the problem, what the change covers, and why it is safe.'},
      {top: '95%', title: 'See what was not proved', text: 'Verification links the evidence for revision 480bc69. Not verified names the claim still untested.'},
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
        PR #1149 was captured November 13, 2026 (Hawaii time), at 480bc69. The review and
        walkthrough from PR #667 were captured October 17, 2026, at da20327.
        The recommendations shown apply to those historical revisions.
      </p>
    </div>
  );
}
