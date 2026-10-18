import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import LiveShakaActivity from '../components/LiveShakaActivity';

import dashboardBefore from '@site/static/img/examples/navigation-lab/dashboard-before.png';
import dashboardAfter from '@site/static/img/examples/navigation-lab/dashboard-after.png';
import listDesktop from '@site/static/img/examples/navigation-lab/list-desktop.png';
import listMobile from '@site/static/img/examples/navigation-lab/list-mobile.png';

import styles from './examples.module.css';

const PR = 'https://github.com/shakacode/react-on-rails-starter-tanstack/pull/235';
const SCREENSHOTS = `${PR}#issuecomment-5824630888`;

const GITHUB = 'https://github.com/shakacode';
// Shaka PR descriptions link a Code Walkthrough, so this search finds them in repos
// where not every PR used Shaka.
const SHAKA_PRS = '?q=is%3Apr+is%3Amerged+%22Code+Walkthrough%22+in%3Abody+sort%3Aupdated-desc';

const stackRepos = [
  {
    name: 'React on Rails',
    repo: 'react_on_rails',
    text: 'Rails and React integration with server rendering. Features, fixes, and release work.',
  },
  {
    name: 'React on Rails + TanStack starter',
    repo: 'react-on-rails-starter-tanstack',
    text: 'The ShakaStack starter app. UI changes come with desktop and mobile screenshots.',
  },
  {
    name: 'Control Plane Flow',
    repo: 'control-plane-flow',
    text: 'Heroku-style review apps, staging, and promotion on Control Plane.',
  },
  {
    name: 'React Webpack Rails Tutorial',
    repo: 'react-webpack-rails-tutorial',
    text: 'The long-running React on Rails tutorial app and live demo.',
  },
  {
    name: 'ShakaPerf',
    repo: 'shakaperf',
    text: 'Branch-versus-main performance and visual testing. Source-available, not open source.',
  },
];

export default function Examples(): ReactNode {
  return (
    <Layout
      title="Examples"
      description="Browse live Shaka pull requests in Shaka and ShakaStack projects, then read an annotated before-and-after example.">
      <main className="container">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Examples</p>
          <h1>See what the agent delivered.</h1>
          <p>
            A Shaka-guided PR brings the result and the evidence together. Start with the live
            record: Shaka's own pull requests and other ShakaStack projects. Then read one
            annotated before-and-after example.
          </p>
        </header>

        <section className={styles.live} aria-labelledby="live">
          <p className={styles.eyebrow}>Live examples</p>
          <Heading as="h2" id="live">Watch Shaka build Shaka.</Heading>
          <p>
            Shaka is developed with Shaka, in public. The newest merged PRs and commits below load
            live from GitHub. Each PR links straight to the four parts worth reading, in order.
          </p>
          <LiveShakaActivity />

          <h3>Across ShakaStack</h3>
          <p>
            Other ShakaStack projects use Shaka for everyday maintenance. Each link lists that
            repository's merged Shaka PRs, newest activity first.
          </p>
          <ul className={styles.repos}>
            {stackRepos.map((project) => (
              <li key={project.repo}>
                <strong>{project.name}</strong>
                <p>{project.text}</p>
                <div className={styles.links}>
                  <Link href={`${GITHUB}/${project.repo}/pulls${SHAKA_PRS}`}>Shaka PRs →</Link>
                  <Link href={`${GITHUB}/${project.repo}`}>Repository</Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="navigation-lab">
          <p className={styles.eyebrow}>Real pull request</p>
          <h2 id="navigation-lab">Instant Navigation Lab</h2>
          <p className={styles.lead}>
            The task added a signed-in navigation lab with a project list, a persistent focus timer,
            and prefetching on hover or focus. It comes from the React on Rails + TanStack starter
            app, and the images are published in the{' '}
            <Link href={SCREENSHOTS}>PR screenshots comment</Link>. The PR shows the starting dashboard, the new link,
            and the new experience at desktop and mobile widths.
          </p>

          <h3>Before and after</h3>
          <p>On the starting branch, the dashboard had no Navigation lab link.</p>
          <div className={styles.comparison}>
            <figure>
              <img
                src={dashboardBefore}
                alt="Dashboard header before the change, without a Navigation lab link"
                width="1280"
                height="170"
              />
              <figcaption>Before · dashboard header</figcaption>
            </figure>
            <figure>
              <img
                src={dashboardAfter}
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
                src={listDesktop}
                alt="Desktop Navigation Lab with running timer, project list, and prefetch request log"
                width="1280"
                height="900"
                loading="lazy"
              />
              <figcaption>Desktop · 1280 px</figcaption>
            </figure>
            <figure className={styles.mobile}>
              <img
                src={listMobile}
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
              The historical screenshot comment records the manual UI checks alongside these captures.
              Read the source comment and pull request for the tested revision, reported results,
              code walkthrough, and automated checks.
            </p>
            <div className={styles.links}>
              <Link href={SCREENSHOTS}>View screenshots and UI checks →</Link>
              <Link href={PR}>Read the pull request →</Link>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
