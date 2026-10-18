import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './PrExamples.module.css';

const examples = [
  {
    id: 'verification',
    number: 667,
    title: 'Start with the recommendation.',
    source: 'https://github.com/shakacode/shaka/pull/667#issue-5907900056',
    height: 1331,
    alt: 'Shaka PR #667 description with a configured-model attribution note, recommendation and evidence links, Intent, Verification, and expandable details.',
    annotations: [
      {top: '8%', title: 'A recommendation with its evidence', text: 'The recommendation links to the walkthrough, review, and checkpoint. The attribution note distinguishes configured and served models.'},
      {top: '30%', title: 'Know the scope and safety assumption', text: 'Intent explains why the change matters, what it covers, and how carefully to review it.'},
      {top: '51%', title: 'See what was proved and what was not', text: 'Verification names the checks and results. Not verified keeps the remaining gap visible.'},
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
        <img src={imageUrl} alt={example.alt} width={799} height={example.height}
          loading="lazy" decoding="async" />
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
        Cropped GitHub screenshots from PR #667 captured October 17, 2026 (Hawaii time), for revision da20327. Callouts explain the recorded results;
        they are historical examples, not a claim about any PR’s current readiness.
      </p>
    </div>
  );
}
