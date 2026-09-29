import clsx from 'clsx';

import styles from './ConsequencesLadder.module.css';

// Carried over from the Agent Workflows site: checks should fit the cost of failure.
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

export default function ConsequencesLadder({headingLevel = 'h3'}: {headingLevel?: 'h2' | 'h3'}) {
  const Heading = headingLevel;

  return (
    <>
      <div className={styles.direction} aria-hidden="true">
        <span>Easy to recover</span>
        <span className={styles.directionLine}>→</span>
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
            <Heading className={styles.stageHeading}>{stage.title}</Heading>
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
    </>
  );
}
