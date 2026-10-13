import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './PrExamples.module.css';

const examples = [
  {
    id: 'verification',
    number: 372,
    title: 'See what was checked.',
    source: 'https://github.com/shakacode/shaka/pull/372#issue-5657087959',
    height: 705,
    alt: 'Shaka PR #372 description with a verification table, commit links, and expandable usage and settings.',
    annotations: [
      {top: '45%', title: 'Evidence tied to a commit', text: 'The check table names the tests, assertions, and commit that passed.'},
      {top: '70%', title: 'More than automated tests', text: 'Desktop and mobile captures, review results, and a product checkpoint appear alongside the checks.'},
      {top: '91%', title: 'Details when you need them', text: 'Expand usage and cost, execution provenance, or repository settings without losing the summary.'},
    ],
  },
  {
    id: 'review-rounds',
    number: 350,
    title: 'Local adversarial review',
    source: 'https://github.com/shakacode/shaka/pull/350#issuecomment-5905445905',
    height: 855,
    alt: 'Shaka PR #350 local adversarial review showing four rounds, reviewer models, findings, fixes, and an outcome.',
    annotations: [
      {top: '16%', title: 'Know who reviewed what', text: 'Each round names the commit, reviewer, model, effort, and review criteria.'},
      {top: '39%', title: 'Track findings through repair', text: 'The first two rounds each record a fix. Later findings are documented, with the full reports available below.'},
      {top: '64%', title: 'Read the outcome first', text: 'The summary says why the loop ended and what remains. Reported cost is labeled as an estimate.'},
    ],
  },
  {
    id: 'walkthrough',
    number: 325,
    title: 'Understand the change and its limits.',
    source: 'https://github.com/shakacode/shaka/pull/325#pullrequestreview-5348779668',
    height: 745,
    alt: 'Shaka PR #325 code walkthrough explaining before and after behavior, linked code and tests, rollback, and known test failures.',
    annotations: [
      {top: '49%', title: 'An explanation linked to code', text: 'The walkthrough connects the before-and-after behavior to the implementation and its regression test.'},
      {top: '66%', title: 'Risks and rollback stay visible', text: 'The reviewer can see which installations change behavior and what reverting would restore.'},
      {top: '87%', title: 'Verification gaps are explicit', text: 'The full-suite row reports three failures that also occurred on main locally. A passing focused test does not hide them.'},
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
          <img src={imageUrl} alt={example.alt} width={816} height={example.height}
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
        Cropped GitHub screenshots captured October 1, 2026. Callouts explain the recorded results;
        they are historical examples, not a claim about any PR’s current readiness.
      </p>
    </div>
  );
}
