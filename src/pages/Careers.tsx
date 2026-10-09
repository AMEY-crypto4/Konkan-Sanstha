import { PageHero } from '../components/PageHero';
import { RoleBrowser } from '../components/RoleBrowser';
import { ContentGap } from '../components/Notices';
import { Reveal } from '../components/Reveal';
import { ALL_ROLES, DEPARTMENTS } from '../content/careers';
import { usePageMeta } from '../lib/usePageMeta';

export default function Careers() {
  usePageMeta('Careers', 'The types of role the organisation hires for, by department.');
  return (
    <>
      <PageHero
        title="Careers"
        eyebrow="Work with us"
        crumbs={[{ label: 'Get involved', to: '/get-involved' }, { label: 'Careers' }]}
        lead={`${ALL_ROLES.length} role types across ${DEPARTMENTS.length} departments, from field projects to digital and fundraising.`}
      />
      <section className="section tight" aria-labelledby="dept-h">
        <div className="container">
          <h2 id="dept-h" className="sr-only">
            Departments
          </h2>
          <div className="cards-3">
            {DEPARTMENTS.map((d, i) => (
              <Reveal key={d.id} delay={i % 3}>
                <div className="way">
                  <h3 style={{ fontSize: '1.3rem' }}>{d.name}</h3>
                  <p>{d.blurb}</p>
                  <p className="fine">{d.roles.length} role types</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft tight" aria-labelledby="roles-h">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="roles-h">Browse role types</h2>
          </Reveal>
          <div style={{ marginBottom: 24 }}>
            <ContentGap>
              The original Career page lists role titles by department but does not say which are open, where they are based, or how to apply. The
              “Ask” links here email the general address and should be replaced with a real application route.
            </ContentGap>
          </div>
          <RoleBrowser />
        </div>
      </section>
    </>
  );
}
