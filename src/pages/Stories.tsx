import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ExternalLink } from '../components/Button';
import { STORIES } from '../content/about';
import { CONCEPT } from '../content/org';
import { usePageMeta } from '../lib/usePageMeta';

export default function Stories() {
  usePageMeta('Stories', 'Articles on the issues behind the programmes.');
  return (
    <>
      <PageHero
        title="Stories"
        eyebrow="Why this work matters"
        crumbs={[{ label: 'Stories' }]}
        lead="Articles on gender, education, health, hunger and inclusion. This concept lists the titles; the full text stays on the official site."
      />
      <section className="section tight">
        <div className="container">
          <div className="cards-3">
            {STORIES.map((s, i) => (
              <Reveal key={s.title} delay={i % 3}>
                <article className="story">
                  <span className="topic">{s.topic}</span>
                  <h2 style={{ fontSize: '1.3rem' }}>{s.title}</h2>
                </article>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <ExternalLink href={CONCEPT.officialSite} className="link-arrow">
              Read the articles on the official site
            </ExternalLink>
          </p>
        </div>
      </section>
    </>
  );
}
