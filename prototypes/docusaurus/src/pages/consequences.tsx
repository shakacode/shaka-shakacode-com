import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './consequences.module.css';

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

export default function Consequences(): ReactNode {
  return (
    <Layout title="What happens if this breaks?" description="Choose verification that fits the consequences, from a disposable personal experiment to a critical service.">
      <main>
        <section className={styles.section} id="consequences">
          <div className="container">
            <p className={styles.eyebrow}>Start with the consequences</p>
            <h1>What happens if this breaks?</h1>
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
                  <h2>{stage.title}</h2>
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
            <p>
              When a change deserves a tested, reviewed pull request,{' '}
              <Link to="/docs/getting-started">get started with Shaka</Link>. See{' '}
              <Link to="/docs/pr-verification">PR verification</Link> for the evidence to collect.
            </p>
          </div>
        </section>

      </main>
    </Layout>
  );
}
