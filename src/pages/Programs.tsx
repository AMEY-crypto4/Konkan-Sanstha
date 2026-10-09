import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { ProgramCard } from '../components/ProgramCard';
import { Reveal } from '../components/Reveal';
import { PROGRAMS, PROGRAM_GROUPS, programsByGroup } from '../content/programs';
import { usePageMeta } from '../lib/usePageMeta';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-');

export default function Programs() {
  usePageMeta('Our work', 'All programmes, grouped by theme, with the figures the organisation publishes.');
  return (
    <>
      <PageHero
        title="Our work"
        eyebrow="Programmes"
        crumbs={[{ label: 'Our work' }]}
        lead={`${PROGRAMS.length} programmes in ${PROGRAM_GROUPS.length} themes. Each one shows what the work involves, what has been achieved and how to help.`}
      >
        <nav aria-label="Programme themes">
          <ul className="chips">
            {PROGRAM_GROUPS.map((g) => (
              <li key={g}>
                <a className="chip" href={`#${slugify(g)}`} style={{ textDecoration: 'none' }}>
                  {g}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {PROGRAM_GROUPS.map((g, gi) => (
        <section key={g} id={slugify(g)} className={`section tight${gi % 2 ? ' soft' : ''}`} aria-labelledby={`${slugify(g)}-h`}>
          <div className="container">
            <Reveal className="section-head">
              <h2 id={`${slugify(g)}-h`}>{g}</h2>
            </Reveal>
            <div className="cards-3">
              {programsByGroup(g).map((p, i) => (
                <Reveal key={p.slug} delay={i % 3}>
                  <ProgramCard program={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section tight">
        <div className="container">
          <p className="lead">
            Looking for something specific to give to? See the <Link to="/campaigns">campaigns</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
