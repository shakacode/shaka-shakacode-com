import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PrExamples, {SAMPLE_PR_URL} from '../components/PrExamples';

import styles from './index.module.css';

const prAnswers = [
  {
    question: 'Is this the right change?',
    answer: 'Intent explains why the change is needed, what it covers, and why it is safe. The walkthrough points you to the relevant code.',
  },
  {
    question: 'What was proved, and what wasn’t?',
    answer: 'Verification links to check results or names the commands that ran. It shows what remains unverified. UI changes include annotated before-and-after screenshots.',
  },
  {
    question: 'What needs my decision?',
    answer: 'Open review findings and decisions are visible in the PR. By default, you decide whether to merge.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Give your coding agent a task. Get a PR that makes the intent and evidence easy to review."
      description="Shaka guides coding agents through your repository’s checks, independent review, and a clear GitHub handoff. Open source, for developers and growing projects.">
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroGrid)}>
          <div>
            <p className={styles.eyebrow}>Open source · Codex, Claude Code, Cursor and more</p>
            <h1 className={styles.heroTitle}>
              Give your coding agent a task.{' '}
              <span className={styles.accent}>Get a PR that makes the intent and evidence easy to review.</span>
            </h1>
            <p className={styles.heroLead}>
              Shaka is a skill for your coding agent. The PR shows what changed, which checks
              ran, and what still needs your attention.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Get started
              </Link>
              <Link className="button button--secondary button--lg" to="#pr-examples">
                See real PR examples
              </Link>
            </div>
            <p>
              <Link href="https://www.youtube.com/watch?v=T6Fstx2fGJI">
                Watch the 52-second demo →
              </Link>
            </p>
          </div>
          <ol className={styles.flow} aria-label="How a task becomes a pull request">
            <li className={styles.flowStep}>
              <span className={styles.flowWho}>You</span>
              <span className={styles.flowTitle}>Give a task</span>
              <ul className={styles.flowPrompts} aria-label="Example prompts">
                <li>
                  <span className={styles.flowPromptLabel}>An issue number or URL</span>
                  <code>$shaka 482</code>
                </li>
                <li>
                  <span className={styles.flowPromptLabel}>Or a sentence</span>
                  <code>$shaka Add CSV export to the orders page.</code>
                </li>
              </ul>
            </li>
            <li className={styles.flowStep}>
              <span className={styles.flowWho}>Agent</span>
              <span className={styles.flowTitle}>Build, verify, review</span>
            </li>
            <li className={clsx(styles.flowStep, styles.flowPr)}>
              <span className={styles.flowWho}>You</span>
              <span className={styles.flowTitle}>Review one clear PR</span>
              <Link href={SAMPLE_PR_URL}>Read a real PR description →</Link>
              <span className={styles.flowNote}>Merge, or send it back</span>
            </li>
          </ol>
        </div>
      </header>

      <main>
        <section className={styles.section} id="pr-answers">
          <div className="container">
            {/* Keep legacy Agent Workflows verification links useful after the domain redirect. */}
            <span id="verification" className={styles.verificationAnchor} />
            <h2>What’s in a Shaka PR?</h2>
            <div className={styles.grid}>
              {prAnswers.map((item) => (
                <div key={item.question} className={styles.card}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} aria-labelledby="pr-examples">
          <div className="container">
            <Heading as="h2" id="pr-examples">Real pull requests</Heading>
            <PrExamples />
            <p className={styles.sectionNote}>
              <Link to="/examples#live">Browse live Shaka PRs →</Link>
            </p>
            <p>
              <Link to="/examples#navigation-lab">See a before-and-after UI change →</Link>
            </p>
          </div>
        </section>

        <section className={styles.section} id="evidence">
          <div className="container">
            <p className={styles.eyebrow}>Evidence from real use</p>
            <h2>Finding a bug is only the first step.</h2>
            <article className={styles.evidenceCard}>
              <p className={styles.evidenceTag}>Case study</p>
              <h3>An AI reviewer found two bugs. A developer merged anyway.</h3>
              <p>
                Two useful review comments went unanswered among 83 conversation items. See how
                clearer summaries and follow-up can help a developer act on what matters.
              </p>
              <div className={styles.evidenceLinks}>
                <Link to="/case-studies/30-ai-assisted-commits">Read the case study →</Link>
                <Link to="/case-studies">All case studies →</Link>
                <Link to="/docs/pr-verification#improve-the-process-over-time">Use PRs to improve future work →</Link>
              </div>
            </article>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="start">
          <div className="container">
            <h2>Try Shaka on a small task</h2>
            <p className={styles.sectionLead}>
              You need Ruby 3.4 or later, Git, an authenticated GitHub CLI, and a coding agent that
              can load skills and run commands.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Get started
              </Link>
              <Link className="button button--secondary button--lg" href="https://github.com/shakacode/shaka">
                View on GitHub
              </Link>
            </div>
            <p className={styles.sectionNote}>
              Rolling this out to a team?{' '}
              <Link href="https://www.shakacode.com/contact/">Talk with ShakaCode →</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
