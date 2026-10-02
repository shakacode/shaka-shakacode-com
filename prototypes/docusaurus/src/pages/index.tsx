import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import PrExamples from '../components/PrExamples';

import styles from './index.module.css';

const EXAMPLE_TASK = '$shaka Fix search when the query contains an apostrophe.';

const prAnswers = [
  {
    question: 'What changed, and why?',
    answer: 'A clear description of the result, with a code walkthrough that explains the implementation choices.',
  },
  {
    question: 'How was it checked?',
    answer: 'Tests, independent review, and evidence tied to the tested commit. UI changes include desktop and mobile before-and-after screenshots.',
  },
  {
    question: 'What needs my decision?',
    answer: 'Review findings, missing checks, and delivery decisions stay visible. Longer results, available usage and cost, and notes for resuming work are expandable.',
  },
];

const projects = [
  {
    title: 'Open-source projects',
    body: 'Give maintainers contributions they can assess: a focused change, its verification evidence, and answers to important review findings.',
  },
  {
    title: 'Company repositories',
    body: 'Use your existing checks and review rules. Start with the agent preparing a PR for your decision; configure automatic merging within your limits when appropriate.',
  },
  {
    title: 'Independent projects',
    body: 'Spend less time directing the process. Try one task, use the checks your project needs, and improve the workflow as you go.',
  },
];

const steps = [
  {
    title: 'Describe the outcome',
    body: 'Give Shaka a task or issue. The skill guides your coding agent through planning, implementation, verification, review, and delivery.',
  },
  {
    title: 'Use your repository’s checks',
    body: 'Repository settings supply the commands and reviewers. The agent tests and reviews locally, fixes problems, and then pushes the PR.',
    link: {to: '/docs/configure-repository', label: 'Configure your repository'},
  },
  {
    title: 'Review the result',
    body: 'The PR brings back the evidence and decisions. With Ask, you decide when to merge. With Auto, the agent merges after required checks and approvals, within your configured limits.',
    link: {to: '/docs/working-with-shaka', label: 'Working with Shaka'},
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Give your coding agent a task. Get a PR you can evaluate."
      description="Shaka guides coding agents through your repository’s checks, independent review, and a clear GitHub handoff. Open source, for developers and growing projects.">
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroGrid)}>
          <div>
            <p className={styles.eyebrow}>Open source · Codex, Claude Code, Cursor and more</p>
            <h1 className={styles.heroTitle}>
              Give your coding agent a task.{' '}
              <span className={styles.accent}>Get a PR you can evaluate.</span>
            </h1>
            <p className={styles.heroLead}>
              Shaka guides the work through your repository’s checks, independent review, and a clear
              handoff on GitHub. See the evidence, understand the decisions, and choose when to merge.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Get started
              </Link>
              <Link className="button button--secondary button--lg" to="#pr-examples">
                See real PR examples
              </Link>
            </div>
          </div>
          <div className={styles.taskPanel}>
            <p className={styles.eyebrow}>Start with a task</p>
            <CodeBlock language="text">{EXAMPLE_TASK}</CodeBlock>
            <h2 className={styles.panelHeading}>Bring back the result and its evidence.</h2>
            <ul className={styles.taskResults}>
              <li>The change and why it matters</li>
              <li>Checks run and review findings addressed</li>
              <li>What needs your decision before merging</li>
            </ul>
            <p className={styles.caption}>
              Shaka supplies the workflow. Your coding agent does the work with your existing tools.
            </p>
            <Link to="/docs/pr-verification">See what a PR should show →</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section} id="pr-answers">
          <div className="container">
            {/* Keep legacy Agent Workflows verification links useful after the domain redirect. */}
            <span id="verification" className={styles.verificationAnchor} />
            <p className={styles.eyebrow}>What you get</p>
            <h2>Know what was checked before you merge.</h2>
            <p className={styles.sectionLead}>
              You should be able to assess the work without reconstructing an agent’s conversation.
              A Shaka PR puts the result, verification, and decisions in front of you.
            </p>
            <div className={styles.grid}>
              {prAnswers.map((item) => (
                <div key={item.question} className={styles.card}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
            <p className={styles.sectionNote}>
              <Link to="#pr-examples">Explore real Shaka PRs →</Link> See their tests, review findings,
              code walkthrough, and reported verification gaps.
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} aria-labelledby="pr-examples">
          <div className="container">
            <p className={styles.eyebrow}>Inside a Shaka PR</p>
            <Heading as="h2" id="pr-examples">See the workflow in real pull requests.</Heading>
            <p className={styles.sectionLead}>
              Follow the numbered callouts to see verification, independent review, and code
              walkthroughs in recent Shaka PRs. Open each source to read the full context.
            </p>
            <PrExamples />
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="why">
          <div className="container">
            <p className={styles.eyebrow}>For developers</p>
            <h2>One workflow, adapted to your project.</h2>
            <div className={styles.grid}>
              {projects.map((project) => (
                <div key={project.title} className={styles.card}>
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="how">
          <div className="container">
            <p className={styles.eyebrow}>How it works</p>
            <h2>Describe the task. Shaka supplies the steps.</h2>
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

        <section className={clsx(styles.section, styles.alt)} id="consequences">
          <div className="container">
            <p className={styles.eyebrow}>Your project is growing</p>
            <h2>Built something with AI? Take the next step.</h2>
            <p className={styles.sectionLead}>
              A personal experiment can become a tool other people rely on. As users and saved data
              become part of the picture, add checks that protect their time, data, and trust.
            </p>
            <p className={styles.sectionLead}>
              Start with one change in a GitHub repository. Use Shaka to prepare a PR, try the result,
              and understand the checks and review before you merge.
            </p>
            <div className={styles.docLinks}>
              <Link to="/docs/getting-started">Make your first Shaka PR →</Link>
              <Link href="https://www.shakacode.com/blog/audit-30-ai-assisted-commits/">
                How ShakaCode approaches verification →
              </Link>
            </div>
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
              </div>
            </article>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="start">
          <div className="container">
            <p className={styles.eyebrow}>Get started</p>
            <h2>Install. Configure. Give it a task.</h2>
            <p className={styles.sectionLead}>
              Shaka needs Ruby 3.4 or later, Git, an authenticated GitHub CLI, and a coding agent
              that can load skills and run commands. The guide gives you prompts for installing
              Shaka and configuring your repository.
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
        </section>

        <section className={styles.section} id="help">
          <div className="container">
            <p className={styles.eyebrow}>For engineering teams</p>
            <h2>ShakaCode can help your team</h2>
            <p className={styles.sectionLead}>
              Shaka is open source. ShakaCode helps engineering teams choose AI coding tools,
              set review and verification rules that match their projects, and improve how
              developers work with agents.
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
