import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

const EXAMPLE_TASK = '$shaka Fix search when the query contains an apostrophe.';

const benefits = [
  {
    title: 'Spend less time directing the process',
    body: 'Describe the outcome. Shaka supplies the steps through testing, review, and PR delivery.',
  },
  {
    title: 'Catch problems before hitting CI',
    body: 'Test and review locally, including adversarial reviews and before-and-after screenshots for UI changes. Fix problems before pushing.',
  },
  {
    title: 'Make review easier',
    body: 'Get a PR that’s easy to review with a clear description. Screenshots show visible changes; a code walkthrough explains implementation choices.',
  },
  {
    title: 'See what a PR cost',
    body: 'See available token usage and estimated cost, including implementation and local review data. Missing usage is marked unknown.',
  },
  {
    title: 'Control merging',
    body: 'Choose Ask to merge yourself or Auto to let the agent merge after required checks and approvals. Consequential changes need human review.',
  },
  {
    title: 'Resume unfinished work easily',
    body: 'WIP Details on the PR identify the owning agent chat, where it stopped, and what comes next. Supported chat links take you back to the owning conversation.',
  },
];

const steps = [
  {
    title: 'A shared workflow',
    body: 'One skill guides each task through planning, implementation, verification, review, and delivery. Your repository settings supply the commands and merge preference.',
  },
  {
    title: 'Verification',
    body: 'Tests, independent review, and visual comparisons show whether the work is ready. Shaka gives your agent explicit checkpoints for testing, review, and delivery.',
    link: {to: '/docs/pr-verification', label: 'PR verification'},
  },
  {
    title: 'Enforcement',
    body: 'Ruby and GitHub check configuration, comment trust, and merge conditions. The enforcement reference identifies which steps rely on the agent.',
    link: {to: '/docs/workflow', label: 'What is enforced'},
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Give your coding agent a task. Get a tested, reviewed PR."
      description="Shaka guides your coding agent through implementation, local testing, independent review, and delivery on GitHub.">
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroGrid)}>
          <div>
            <p className={styles.eyebrow}>Open source · Codex, Claude Code, Cursor and more</p>
            <h1 className={styles.heroTitle}>
              Give your coding agent a task.{' '}
              <span className={styles.accent}>Get a tested, reviewed PR</span> that's easy to understand.
            </h1>
            <p className={styles.heroLead}>
              Shaka guides your agent through implementation, local testing, independent review,
              and delivery on GitHub. You describe the outcome; Shaka supplies the workflow.
            </p>
            <p className={styles.heroLead}>
              Shaka brings back a PR ready to merge, asks for a decision when needed, or merges
              automatically when authorized and required checks and approvals pass.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Get started
              </Link>
              <Link className="button button--secondary button--lg" href="https://github.com/shakacode/shaka">
                View on GitHub
              </Link>
            </div>
          </div>
          <div className={styles.taskPanel}>
            <p className={styles.eyebrow}>Start with a task</p>
            <CodeBlock language="text">{EXAMPLE_TASK}</CodeBlock>
            <p>
              Shaka checks for existing work, considers whether the change is worth doing,
              and recommends a model and effort level.
            </p>
            <p className={styles.exampleLabel}>Already know your model and effort?</p>
            <CodeBlock language="text">{`${EXAMPLE_TASK}\nUse Sol, medium effort. Go.`}</CodeBlock>
            <p className={styles.caption}>
              Choose a model available in your coding agent. You can also say <code>Go</code>{' '}
              without restating model or effort: Shaka starts when its recommendation matches
              the model and effort your agent reports as active. If they differ or the agent
              cannot confirm them, Shaka asks you to choose or confirm. It still brings you
              decisions that need your input.
            </p>
            <Link to="/docs/working-with-shaka">Working with Shaka →</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={clsx(styles.section, styles.alt)} id="why">
          <div className="container">
            <p className={styles.eyebrow}>Why use it</p>
            <h2>The hard part isn&apos;t the code. It&apos;s knowing what was checked.</h2>
            <p className={styles.sectionLead}>
              An agent hands you something plausible, and you are left reconstructing what it read,
              what it ran, and what that proves. Shaka makes those answers part of the pull request.
            </p>
            <div className={styles.benefits}>
              {benefits.map((benefit) => (
                <div key={benefit.title} className={styles.benefit}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="start">
          <div className="container">
            <p className={styles.eyebrow}>Get started</p>
            <h2>Install. Configure. Give it a task.</h2>
            <p className={styles.sectionLead}>
              Shaka needs Ruby 3.4 or later, Git, an authenticated GitHub CLI, and a coding agent
              that can load skills and run commands. The getting-started guide gives you prompts for
              installing Shaka and configuring your repository.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Read the getting-started guide
              </Link>
              <Link className="button button--secondary button--lg" to="/case-studies">
                Read a case study
              </Link>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="how">
          <div className="container">
            <p className={styles.eyebrow}>How it works</p>
            <h2>One workflow, your repository's commands.</h2>
            <div className={styles.grid}>
              {steps.map((step) => (
                <div key={step.title} className={styles.card}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {step.link && <Link to={step.link.to}>{step.link.label} →</Link>}
                </div>
              ))}
            </div>
            <p className={styles.verificationLink}>
              <strong>Public review safety.</strong> Shaka reads feedback from trusted reviewers
              and leaves other comments for maintainer triage.
            </p>
            <p id="consequences" className={styles.verificationLink}>
              New to building with AI?{' '}
              <Link to="/consequences">Choose checks that fit the consequences →</Link>
            </p>
            <div className={styles.docLinks}>
              <Link to="/docs/configure-repository">Repository setup →</Link>
              <Link to="/docs/settings">Settings →</Link>
              <Link to="/docs/">All documentation →</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
