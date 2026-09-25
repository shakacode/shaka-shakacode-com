import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './examples.module.css';

const PR = 'https://github.com/shakacode/react-on-rails-starter-tanstack/pull/235';
const SCREENSHOTS = `${PR}#issuecomment-5824630888`;

export default function Examples(): ReactNode {
  return (
    <Layout
      title="Examples"
      description="See a real Shaka-guided pull request through before and after screenshots, verification evidence, and source links.">
      <main className="container">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Examples</p>
          <h1>See what the agent delivered.</h1>
          <p>
            A Shaka-guided PR brings the result and the evidence together. This example comes from
            the React on Rails + TanStack starter app. The images and test details are published in
            the <Link href={SCREENSHOTS}>PR screenshots comment</Link>.
          </p>
        </header>

        <section className={styles.section} aria-labelledby="navigation-lab">
          <p className={styles.eyebrow}>Real pull request</p>
          <h2 id="navigation-lab">Instant Navigation Lab</h2>
          <p className={styles.lead}>
            The task added a signed-in navigation lab with a project list, a persistent focus timer,
            and prefetching on hover or focus. The PR shows the starting dashboard, the new link,
            and the new experience at desktop and mobile widths.
          </p>

          <h3>Before and after</h3>
          <p>On the starting branch, the dashboard had no Navigation lab link.</p>
          <div className={styles.comparison}>
            <figure>
              <img
                src="/img/examples/navigation-lab/dashboard-before.png"
                alt="Dashboard header before the change, without a Navigation lab link"
                width="1280"
                height="170"
              />
              <figcaption>Before · dashboard header</figcaption>
            </figure>
            <figure>
              <img
                src="/img/examples/navigation-lab/dashboard-after.png"
                alt="Dashboard header after the change, with a Navigation lab link"
                width="1280"
                height="170"
              />
              <figcaption>After · Navigation lab link added</figcaption>
            </figure>
          </div>

          <h3>The new experience</h3>
          <p>
            These captures show the lab after hovering a project. The timer is running, and the
            request log records a prefetch and the list load.
          </p>
          <div className={styles.screens}>
            <figure>
              <img
                src="/img/examples/navigation-lab/list-desktop.png"
                alt="Desktop Navigation Lab with running timer, project list, and prefetch request log"
                width="1280"
                height="900"
                loading="lazy"
              />
              <figcaption>Desktop · 1280 px</figcaption>
            </figure>
            <figure className={styles.mobile}>
              <img
                src="/img/examples/navigation-lab/list-mobile.png"
                alt="Mobile Navigation Lab with running timer, project list, and prefetch request log"
                width="390"
                height="1616"
                loading="lazy"
              />
              <figcaption>Mobile · 390 px</figcaption>
            </figure>
          </div>

          <div className={styles.evidence}>
            <h3>Evidence alongside the images</h3>
            <p>
              The screenshot comment reports 11 of 11 manual UI checks at commit <code>cc7f666</code>.
              Its checks include server rendering, prefetch reuse with no new request on click,
              navigation without a document reload, and no horizontal overflow on mobile. The PR
              also links its code walkthrough and automated checks.
            </p>
            <div className={styles.links}>
              <Link href={SCREENSHOTS}>View screenshots and UI checks →</Link>
              <Link href={PR}>Read the pull request →</Link>
            </div>
          </div>
        </section>

        <section className={styles.more} aria-labelledby="more-examples">
          <h2 id="more-examples">See Shaka evolve in public</h2>
          <p>
            For more examples of the workflow itself, check the{' '}
            <Link href="https://github.com/shakacode/shaka/commits/main/">recent commits in the Shaka repository</Link>.
            Each commit links to the change and its pull request, where you can inspect the review
            and verification record.
          </p>
        </section>
      </main>
    </Layout>
  );
}
