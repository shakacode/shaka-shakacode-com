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
    title: 'Avoid unnecessary CI runs',
    body: 'Tests and adversarial reviews run locally, with before-and-after screenshots for UI changes, so problems are fixed before the push.',
  },
  {
    title: 'Make review easier',
    body: 'The PR leads with the result and evidence. A code walkthrough explains the implementation choices.',
  },
  {
    title: 'See what a PR cost',
    body: 'Available token usage and estimated dollar cost, including local review, appear in the PR. Missing usage is marked unknown.',
  },
  {
    title: 'Control merging',
    body: 'Choose Ask to merge on GitHub yourself, or Auto to let the agent merge after checks and required approvals. Consequential changes still need explicit human review.',
  },
  {
    title: 'Resume unfinished work',
    body: 'WIP Details on the PR name the owning agent chat, where it stopped, and what comes next.',
  },
];

const steps = [
  {
    title: 'A shared workflow',
    body: 'One skill guides each task through planning, implementation, verification, review, and delivery. Your repository settings supply the commands and merge preference.',
  },
  {
    title: 'Evidence before delivery',
    body: 'Tests, independent review, and visual comparisons help you judge the result before you merge.',
    link: {to: '/docs/pr-verification', label: 'PR verification'},
  },
  {
    title: 'Explicit enforcement',
    body: 'Ruby helpers check configuration, filter public comments, and enforce merge conditions alongside GitHub. The workflow reference shows which steps rely on the agent.',
    link: {to: '/docs/workflow', label: 'What is enforced'},
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Give your coding agent a task. Get a tested, reviewed PR."
      description="Shaka guides your coding agent from the first question through local tests, independent review, and an explained pull request on GitHub.">
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroGrid)}>
          <div>
            <p className={styles.eyebrow}>Open source · Codex, Claude Code, Cursor and more</p>
            <h1 className={styles.heroTitle}>
              Give your coding agent a task.{' '}
              <span className={styles.accent}>Get a tested, reviewed PR</span> that's easy to understand.
            </h1>
            <p className={styles.heroLead}>
              Shaka guides the work from the first question through implementation, local tests,
              independent review, and delivery on GitHub. You spend less time directing the process
              and checking whether the agent finished the job.
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
              Choose a model available in your coding agent. When those settings are active,
              Shaka starts without another model-selection question. It still brings you
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
            <h2>Less directing. Easier reviewing.</h2>
            <p className={styles.sectionLead}>
              Use your existing coding agent and repository scripts. Shaka supplies the workflow
              from your first request to a pull request on GitHub.
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
