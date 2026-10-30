import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PrExamples from '../components/PrExamples';

import styles from './index.module.css';

const PR_DESCRIPTION_URL = 'https://github.com/shakacode/shaka/pull/667#issue-5907900056';

const prAnswers = [
  {
    question: 'Is this the right change?',
    answer: 'Intent says why the change exists, what it covers and leaves out, and why it is safe. Review effort, from 1 to 5, says how carefully to read the code. When a few lines need a closer look, walkthrough notes can point them out.',
  },
  {
    question: 'What was proved, and what wasn’t?',
    answer: 'Verification lists the checks run against this change and any claim left unproven. Each check links to its result or names the command that ran. A UI change adds annotated before-and-after screenshots, plus a video when timing matters.',
  },
  {
    question: 'What needs my decision?',
    answer: 'Review findings, missing checks, and delivery decisions stay visible. Longer results, available usage and cost, and notes for resuming work are expandable.',
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
              Your agent builds, verifies, and reviews until your checks pass. You read one
              description and decide.
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
              <span className={styles.flowNote}>↻ Repeats tests, screenshots, and review</span>
            </li>
            <li className={clsx(styles.flowStep, styles.flowPr)}>
              <span className={styles.flowWho}>You</span>
              <span className={styles.flowTitle}>Review one clear PR</span>
              <Link href={PR_DESCRIPTION_URL}>Read a real PR description →</Link>
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
            <p className={styles.eyebrow}>What you get</p>
            <h2>Know what was checked before you merge.</h2>
            <p className={styles.sectionLead}>
              Assess the work without reconstructing an agent’s conversation.
            </p>
            <div className={styles.grid}>
              {prAnswers.map((item) => (
                <div key={item.question} className={styles.card}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
            <div className={clsx(styles.sectionNote, styles.nextLinks)}>
              <Link to="/examples#live">
                <strong>Browse live Shaka PRs →</strong>
                <span>Open a PR merged today and read its walkthrough, review, and checkpoint.</span>
              </Link>
              <Link to="/examples">
                <strong>See a before-and-after UI change →</strong>
                <span>Desktop and mobile screenshots from a real Shaka PR.</span>
              </Link>
            </div>
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
              Shaka runs your repository’s own checks and reviewers. You merge, or let the agent
              merge within limits you set.
            </p>
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
