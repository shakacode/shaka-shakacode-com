import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import ConsequencesLadder from '../components/ConsequencesLadder';
import styles from '../components/ConsequencesLadder.module.css';

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
            <ConsequencesLadder headingLevel="h2" />
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
