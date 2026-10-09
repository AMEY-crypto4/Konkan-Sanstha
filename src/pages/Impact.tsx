import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { StatGrid } from '../components/CountUp';
import { Reveal } from '../components/Reveal';
import { ImpactCalculator } from '../components/ImpactCalculator';
import { HEADLINE, IMPACT_BLOCKS } from '../content/impact';
import { usePageMeta } from '../lib/usePageMeta';

const linkFor = (slug: string) => (slug === 'padyatra' ? '/campaigns/padyatra' : slug === 'csr-partnership' ? '/csr' : `/programs/${slug}`);

export default function Impact() {
  usePageMeta('Impact', 'Results by programme, as reported by the organisation.');
  return (
    <>
      <PageHero
        title="Impact"
        eyebrow="Results"
        crumbs={[{ label: 'Impact' }]}
        lead="Figures as reported by the organisation, grouped by programme. Most are cumulative counts since each programme began."
      />
      <section className="section tight" aria-labelledby="hl-h">
        <div className="container">
          <h2 id="hl-h" className="sr-only">
            Headline figures
          </h2>
          <StatGrid stats={HEADLINE} cols={4} />
        </div>
      </section>

      {IMPACT_BLOCKS.map((b, i) => (
        <section key={b.slug} className={`section tight${i % 2 ? '' : ' soft'}`} aria-labelledby={`${b.slug}-h`}>
          <div className="container">
            <Reveal className="section-head split">
              <h2 id={`${b.slug}-h`} style={{ fontSize: 'clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem)' }}>
                {b.programme}
              </h2>
              <p>
                <Link to={linkFor(b.slug)} className="link-arrow">
                  Read about this work <ArrowRight aria-hidden="true" />
                </Link>
              </p>
            </Reveal>
            <StatGrid stats={b.stats} cols={b.stats.length === 3 ? 3 : 4} />
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="gift-h">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="gift-h">What would your gift do?</h2>
          </Reveal>
          <ImpactCalculator />
        </div>
      </section>

      <section className="section soft tight" aria-labelledby="notes-h">
        <div className="container prose">
          <h2 id="notes-h">Notes on these figures</h2>
          <ul>
            <li>All figures come from the public website in October 2026 and have not been audited by this concept.</li>
            <li>
              The original site shows 14,70,152 beneficiaries in two places and 11,67,606 in the homepage text. This concept uses the first, and the
              team should confirm it.
            </li>
            <li>Some counts are for one project (for example, Feed One Feed All counts the Pune project only) and others cover the whole organisation.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
