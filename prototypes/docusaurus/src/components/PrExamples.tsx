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
    number: 1149,
    title: 'Local adversarial review',
    source: 'https://github.com/shakacode/shaka/pull/1149#issuecomment-6819508032',
    height: 649,
    alt: 'Shaka PR #1149 local adversarial review with reviewed revision 480bc69, coverage limits for two reviewers, three reviewed commits with fixed and documented findings, and expandable reports.',
    annotations: [
      {top: '27%', title: 'Read the coverage limits', text: 'The review names revision 480bc69 and what each reviewer could inspect. Neither reviewer could run the tests.'},
      {top: '57%', title: 'Track findings across commits', text: 'The table records fixed and documented findings for three commits. No open findings remain.'},
      {top: '82%', title: 'Keep the full reports available', text: 'Expand the findings, execution metadata, or the reports for each reviewed commit.'},
    ],
  },
  {
    id: 'walkthrough',
    number: 1149,
    title: 'Understand the change and its limits.',
    source: 'https://github.com/shakacode/shaka/pull/1149#pullrequestreview-5871856234',
    height: 528,
    alt: 'Shaka PR #1149 code walkthrough with links to the changed guides, the size change in agent instructions, what Ruby does not enforce, validation, and what reverting does.',
    annotations: [
      {top: '48%', title: 'An explanation linked to code', text: 'Links lead to the guide lines that set the default, publish the comparison, and show readers what to expect.'},
      {top: '73%', title: 'See what the code does not do', text: 'The agent applies the guidance. Ruby does not compose the images or enforce the layout.'},
      {top: '86%', title: 'Validation and rollback are stated', text: 'Local validation passed after a rebase. Reverting the guide edit restores the previous default.'},
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
        All three samples come from PR #1149 at 480bc69. The description was captured
        November 13, 2026, and the review and walkthrough November 20, 2026 (Hawaii time).
        The recommendations shown apply to that historical revision.
      </p>
    </div>
  );
}
