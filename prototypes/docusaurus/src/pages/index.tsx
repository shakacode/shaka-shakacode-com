import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
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

// Rewritten from the old site's five-question trust list around what a Shaka PR
// actually contains. "What could it touch" was dropped: Shaka has no declared
// file-ownership list for a PR.
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
    question: 'What did it cost, and what is left?',
    answer: 'Usage shows tokens and estimated cost, or marks them unknown. WIP Details say where unfinished work stopped.',
  },
];

// Copied verbatim from the old Agent Workflows site; not re-verified.
const teamFacts = [
  {value: 'Since 2011', label: 'Remote-first software consulting and delivery'},
  {value: '23M+', label: 'Open-source package downloads'},
  {value: 'Practical adoption', label: 'Assessment, rollout, guardrails, and team enablement'},
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
  // Section ids are not headings, so register the ones other pages link to.
  useBrokenLinks().collectAnchor('consequences');

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

        <section className={styles.section} id="pr-answers">
          <div className="container">
            <p className={styles.eyebrow}>What you get</p>
            <h2>What a Shaka PR answers</h2>
            <p className={styles.sectionLead}>
              You should not have to reconstruct what an agent did. Each Shaka PR answers these
              questions in the description and the code walkthrough.
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
          </div>
        </section>

        <section className={styles.section} id="evidence">
          <div className="container">
            <p className={styles.eyebrow}>Evidence from real use</p>
            <h2>What went wrong, and what changed because of it.</h2>
            <article className={styles.evidenceCard}>
              <p className={styles.evidenceTag}>Case study · August 5, 2026</p>
              <h3>The AI reviewer found it. We merged anyway.</h3>
              <dl className={styles.evidenceFields}>
                <div className={styles.evidenceField}>
                  <dt>What happened</dt>
                  <dd>
                    An AI reviewer flagged two real risks hours before merge. A transient{' '}
                    <code>429</code> or <code>5xx</code> error could delete a healthy provider row,
                    and a final retry could wait up to 60 seconds for nothing. Both findings sat in a
                    timeline of 83 conversation items. The PR merged with neither one answered.
                  </dd>
                </div>
                <div className={styles.evidenceField}>
                  <dt>The lesson</dt>
                  <dd>
                    Finding a defect is not the same as handling it. Before merge, each current
                    finding needs a decision: fixed and verified, declined with a reason, or turned
                    into an owned follow-up.
                  </dd>
                </div>
                <div className={styles.evidenceField}>
                  <dt>What Shaka does now</dt>
                  <dd>
                    Meaningful changes get an adversarial review before the push. The agent fixes
                    demonstrated defects and declines other findings with a reason on the original
                    thread. The merge helper refuses a moved head and missing, failing, or pending
                    required checks.
                  </dd>
                </div>
                <div className={styles.evidenceField}>
                  <dt>Still up to the agent</dt>
                  <dd>
                    The merge helper does not read review findings. Handling each one before merge
                    is the agent's job, not a check in code.{' '}
                    <Link to="/docs/workflow#what-is-enforced">See what is enforced</Link>.
                  </dd>
                </div>
              </dl>
              <div className={styles.evidenceLinks}>
                <Link to="/case-studies/30-ai-assisted-commits">Read the full case study →</Link>
                <Link to="/case-studies">All case studies →</Link>
              </div>
            </article>
          </div>
        </section>

        <section className={clsx(styles.section, styles.alt)} id="methodology">
          <div className="container">
            <p className={styles.eyebrow}>Methodology</p>
            <blockquote className={styles.motto}>
              Use AI aggressively, verify the risky parts, document what was learned, and keep
              shipping.
            </blockquote>
            <p className={styles.sectionLead}>
              Review adversarially before merge, treat CI logs as evidence, test by hand where
              behavior can change, and judge review findings by their real impact.
            </p>
            <Link className="button button--secondary button--lg" to="/methodology">
              Read the methodology
            </Link>
          </div>
        </section>

        <section className={styles.section} id="start">
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

        <section className={clsx(styles.section, styles.alt)} id="help">
          <div className="container">
            <p className={styles.eyebrow}>For engineering teams</p>
            <h2>ShakaCode can help your team</h2>
            <p className={styles.sectionLead}>
              Shaka is open source. ShakaCode helps engineering teams turn ad hoc AI coding into a
              repeatable practice: choose the right tools, set review and verification rules that
              match the risk, and keep quality under control as agents take on more work.
            </p>
            <div className={styles.facts}>
              {teamFacts.map((fact) => (
                <div key={fact.value} className={styles.fact}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
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
