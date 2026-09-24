import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

const EXAMPLE_TASK = '$shaka Fix search when the query contains an apostrophe.';

// The consequences ladder carried over from the Agent Workflows site: how much
// checking a change needs depends on who is hurt when it breaks.
const stages = [
  {
    title: 'Just for me',
    consequence: 'I can recreate it.',
    example: 'A disposable personal experiment',
    practice: 'Chat, try it, iterate. You do not need pull requests or a test suite yet.',
  },
  {
    title: 'Friends or coworkers',
    consequence: 'Others lose time.',
    example: 'A shared tool with saved work',
    practice: 'Check important user journeys, protect saved data, and have a recovery path.',
  },
  {
    title: 'Customers depend on it',
    consequence: 'Failures damage trust.',
    example: 'An application people rely on',
    practice: 'Automate critical checks. Add targeted review, monitoring, and rollback.',
  },
  {
    title: 'Critical service',
    consequence: 'Minutes cause major losses.',
    example: 'An outage can cost thousands a minute',
    practice: 'Set reliability targets. Stage releases, test failures, and practice recovery.',
  },
];

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
    body: 'Token usage and estimated dollar cost, including local review, appear in the PR. Missing usage is marked unknown.',
  },
  {
    title: 'Control merging',
    body: 'Choose Ask to merge on GitHub yourself, or Auto to let the agent merge after checks and required approvals.',
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
        <div className="container">
          <p className={styles.eyebrow}>Open source · Codex, Claude Code, Cursor and more</p>
          <h1 className={styles.heroTitle}>
            Give your coding agent a task.
            <br />
            <span className={styles.accent}>Get a tested, reviewed PR</span> that's easy to understand.
          </h1>
          <p className={styles.heroLead}>
            Shaka guides the work from the first question through implementation, local tests,
            independent review, and delivery on GitHub. You spend less time directing the process
            and checking whether the agent finished the job.
          </p>
          <div className={styles.heroCode}>
            <CodeBlock language="text">{EXAMPLE_TASK}</CodeBlock>
          </div>
          <div className={styles.heroActions}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              Get started
            </Link>
            <Link className="button button--secondary button--lg" href="https://github.com/shakacode/shaka">
              View on GitHub
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section} id="consequences">
          <div className="container">
            <p className={styles.eyebrow}>Start with the consequences</p>
            <h2>What happens if this breaks?</h2>
            <p className={styles.sectionLead}>
              For a disposable personal app, describe what you want, try it, and keep chatting.
              As people depend on the result, add checks that protect their time, data, and trust.
              Shaka is for the point where a change deserves a tested, reviewed pull request.
            </p>
            <div className={styles.direction} aria-hidden="true">
              <span>Easy to recover</span>
              <span className={styles.directionLine} />
              <span>Costly to fail</span>
            </div>
            <ol className={styles.stages}>
              {stages.map((stage, index) => (
                <li key={stage.title} className={styles.stage}>
                  <div className={styles.meter} aria-hidden="true">
                    {[0, 1, 2, 3].map((segment) => (
                      <span key={segment} className={clsx(segment <= index && styles.filled)} />
                    ))}
                  </div>
                  <h3>{stage.title}</h3>
                  <p className={styles.consequence}>{stage.consequence}</p>
                  <p className={styles.example}>{stage.example}</p>
                  <p className={styles.practice}>{stage.practice}</p>
                </li>
              ))}
            </ol>
            <p className={styles.caption}>
              Illustrative situations, not mandatory levels. A five-person payroll tool can need
              stronger safeguards than a popular disposable toy. Data sensitivity, recovery
              difficulty, and the change itself matter as much as audience size.
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="why">
          <div className="container">
            <p className={styles.eyebrow}>Why use it</p>
            <h2>The hard part isn't the code. It's knowing what was checked.</h2>
            <p className={styles.sectionLead}>
              An agent hands you something plausible, and you are left reconstructing what it read,
              what it ran, and what that proves. Shaka makes those answers part of the pull request.
            </p>
            <div className={styles.grid}>
              {benefits.map((benefit) => (
                <div key={benefit.title} className={styles.card}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="how">
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
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="start">
          <div className="container">
            <h2>Start with one task.</h2>
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
      </main>
    </Layout>
  );
}
