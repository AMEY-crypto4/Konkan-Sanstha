import { Check } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Timeline } from '../components/Timeline';
import { StatGrid } from '../components/CountUp';
import { Reveal } from '../components/Reveal';
import { ContentGap } from '../components/Notices';
import { ButtonLink } from '../components/Button';
import { ORG, STATES } from '../content/org';
import { HEADLINE } from '../content/impact';
import { OBJECTIVES, TIMELINE } from '../content/about';
import { usePageMeta } from '../lib/usePageMeta';

export default function About() {
  usePageMeta('About', 'The story, mission and journey of the organisation.');
  return (
    <>
      <PageHero
        title="Our story"
        eyebrow="About"
        crumbs={[{ label: 'About' }]}
        lead={`${ORG.legalName} works with children, women and families across ${ORG.states} states, on education, child care, health, food, water and livelihoods.`}
      />

      <section className="section tight" aria-labelledby="mission-h">
        <div className="container split-2">
          <Reveal className="prose">
            <span className="eyebrow">Mission</span>
            <h2 id="mission-h">What the organisation sets out to do</h2>
            <p className="lead">
              By 2030 it aims to empower 3 million people from marginalised communities, through programmes aligned with the global Sustainable
              Development Goals.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              The original site also gives a different 2030 figure (2,10,420) on its journey page. The team should confirm which one to publish.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <ul className="checks">
              {OBJECTIVES.map((o) => (
                <li key={o}>
                  <Check aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section soft" aria-labelledby="journey-h">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Journey</span>
            <h2 id="journey-h">How the work has grown</h2>
          </Reveal>
          <Timeline entries={TIMELINE} wide />
        </div>
      </section>

      <section className="section" aria-labelledby="reach-h">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Reach</span>
            <h2 id="reach-h">Where the organisation works</h2>
          </Reveal>
          <StatGrid stats={HEADLINE} cols={4} />
          <ul className="chips" style={{ marginTop: 28 }} aria-label="States">
            {STATES.map((s) => (
              <li className="chip" key={s}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tight">
        <div className="container" style={{ display: 'grid', gap: 22 }}>
          <ContentGap>
            Add leadership, board and team profiles here. They are one of the first things donors, CSR teams and auditors look for.
          </ContentGap>
          <div className="row">
            <ButtonLink to="/transparency">Registrations and reports</ButtonLink>
            <ButtonLink to="/contact" variant="ghost">
              Contact the team
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
