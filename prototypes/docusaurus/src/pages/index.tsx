import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import ConsequencesLadder from '../components/ConsequencesLadder';

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
    body: 'Start with Ask: the agent prepares the PR and you decide whether to merge. Choose Auto for work you want the agent to merge after the configured checks and approvals, within your limits.',
  },
  {
    title: 'Resume unfinished work easily',
    body: 'WIP Details on the PR identify the owning agent chat, where it stopped, and what comes next. Supported chat links take you back to the owning conversation.',
  },
];

const prAnswers = [
  {
    question: 'What changed, and why does it matter?',
    answer: 'The description leads with the outcome a reader notices, in plain English.',
  },
  {
    question: 'What needs my decision?',
    answer: 'Blockers, delivery decisions, and any missing required review stay visible at the top.',
  },
  {
    question: 'How was it checked?',
    answer: 'A table of checks, with evidence labeled by the tested commit. Visible changes get before-and-after screenshots.',
  },
  {
    question: 'Who reviewed it?',
    answer: 'The review status names the reviewer and the commit it reviewed. A green check alone does not count as a review.',
  },
  {
    question: 'Why does the code look this way?',
    answer: 'A code walkthrough explains the implementation choices, with links to the exact lines.',
  },
  {
    question: 'What did it cost?',
    answer: 'Expand the Usage and cost section in the PR description for available token counts and estimated cost. Missing data is marked unknown.',
  },
  {
    question: 'How can I resume unfinished work?',
    answer: 'Expand WIP Details in the PR description to find the owning chat, where work stopped, and what comes next, so you or another agent can pick it up.',
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
    title: 'Settings you can improve',
    body: 'Choose reviewers, adapt their instructions, and use your project’s existing checks. Ask your agent to help change settings when the process wastes time.',
    link: {to: '/docs/configure-repository', label: 'Configure your workflow'},
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
              The Shaka skill guides your agent through implementation, local testing, independent review,
              and delivery on GitHub. You describe the outcome; Shaka supplies the workflow.
            </p>
            <p className={styles.heroLead}>
              The agent brings you a PR and the decisions it needs from you. If you choose Auto,
              it can merge within your configured limits after required checks, reviews, and approvals.
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
        <section className={styles.section} id="consequences">
          <div className="container">
            {/* Preserve old Agent Workflows links to /#verification after the domain redirect. */}
            <span id="verification" className={styles.verificationAnchor} />
            <p className={styles.eyebrow}>Start with the consequences</p>
            <h2>What happens if this breaks?</h2>
            <p className={styles.sectionLead}>
              For a disposable personal app, describe what you want, try it, and keep chatting.
              As people depend on the result, add checks that protect their time, data, and trust.
            </p>
            <ConsequencesLadder />
            <h2 className={styles.costHeading}>Make the next check earn its cost.</h2>
            <p className={styles.sectionLead}>
              Count development time, verification effort, expected failure cost, and delayed delivery.
              Add a check when it reduces a meaningful risk; stop when the required evidence is there.
            </p>
            <Link to="/docs/pr-verification">See what to verify →</Link>
          </div>
        </section>

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
            <p className={styles.sectionNote}>
              <strong>Public review safety.</strong> On public repositories, Shaka reads feedback
              from trusted contributors and reviewers. A maintainer checks comments from other people.
            </p>
            <div className={styles.docLinks}>
              <Link to="/docs/configure-repository">Repository setup →</Link>
              <Link to="/docs/settings">Settings →</Link>
              <Link to="/docs/">All documentation →</Link>
            </div>
          </div>
        </section>
        <section className={styles.section} id="pr-answers">
          <div className="container">
            <p className={styles.eyebrow}>What you get</p>
            <h2>What a Shaka PR answers</h2>
            <p className={styles.sectionLead}>
              You should not have to reconstruct what an agent did. Use the description and
              code walkthrough to answer these questions.
            </p>
            <div className={styles.grid}>
              {prAnswers.map((item) => (
                <div key={item.question} className={styles.card}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
            <p className={styles.caption}>
              See <Link to="/docs/pr-verification">PR verification</Link> for the evidence each kind
              of change needs.
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="evidence">
          <div className="container">
            <p className={styles.eyebrow}>Evidence from real use</p>
            <h2>What went wrong, and what changed because of it.</h2>
            <article className={styles.evidenceCard}>
              <p className={styles.evidenceTag}>Case study</p>
              <h3>An AI reviewer found two bugs. A developer merged anyway.</h3>
              <p>
                Two useful review comments went unanswered among 83 conversation items. See how
                clearer summaries and follow-up can help a developer act on what matters.
              </p>
              <div className={styles.evidenceLinks}>
                <Link to="/case-studies/30-ai-assisted-commits">Read the full case study →</Link>
                <Link to="/case-studies">All case studies →</Link>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} id="methodology">
          <div className="container">
            <p className={styles.eyebrow}>Methodology</p>
            <blockquote className={styles.motto}>
              Let the agent do the work. Spend your attention on the decisions that matter.
            </blockquote>
            <p className={styles.sectionLead}>
              Try the result, check more carefully where mistakes would cost more, and fix problems
              locally before pushing. Spend review time on changes that matter.
            </p>
            <Link className="button button--secondary button--lg" to="/methodology">
              Read the methodology
            </Link>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="help">
          <div className="container">
            <p className={styles.eyebrow}>For engineering teams</p>
            <h2>ShakaCode can help your team</h2>
            <p className={styles.sectionLead}>
              Shaka is open source. ShakaCode helps engineering teams turn AI coding into a
              repeatable practice: choose the right tools, set review and verification rules that
              match the risk, and keep quality under control as agents take on more work.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" href="https://www.shakacode.com/contact/">
                Talk with ShakaCode
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
