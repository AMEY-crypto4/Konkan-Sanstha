import { Check } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { StatGrid } from '../components/CountUp';
import { GivingOptions } from '../components/GivingOptions';
import { DataTableView } from '../components/DataTableView';
import { Accordion } from '../components/Accordion';
import { DonationWidget } from '../components/DonationWidget';
import { ProgramCard } from '../components/ProgramCard';
import { Reveal } from '../components/Reveal';
import { ContentGap } from '../components/Notices';
import { programBySlug } from '../content/programs';
import { usePageMeta } from '../lib/usePageMeta';

export default function ProgramDetail() {
  const { slug = '' } = useParams();
  const program = programBySlug(slug);
  usePageMeta(program?.title ?? 'Programme', program?.tagline);
  if (!program) return <Navigate to="/not-found" replace />;

  const related = (program.related ?? []).map(programBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        title={program.title}
        lead={program.tagline}
        icon={program.icon}
        tone={program.tone}
        eyebrow={program.group}
        crumbs={[{ label: 'Our work', to: '/programs' }, { label: program.title }]}
      />

      <section className="section tight">
        <div className="container split-2 wide-left sticky">
          <div style={{ display: 'grid', gap: 'clamp(36px, 5vw, 64px)' }}>
            {program.needsContent ? <ContentGap>{program.needsContent}</ContentGap> : null}

            <Reveal className="prose">
              <p className="lead">{program.summary}</p>
            </Reveal>

            {program.stats.length ? (
              <section aria-labelledby="stats-h">
                <h2 id="stats-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  Results so far
                </h2>
                <StatGrid stats={program.stats} cols={3} />
              </section>
            ) : null}

            {program.activities.length ? (
              <section aria-labelledby="act-h">
                <h2 id="act-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  What the work involves
                </h2>
                <div className="cards-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}>
                  {program.activities.map((a, i) => (
                    <Reveal key={a.title} delay={i % 3}>
                      <div className="way">
                        <h3 style={{ fontSize: '1.2rem' }}>{a.title}</h3>
                        <p>{a.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}

            {program.howItWorks ? (
              <section aria-labelledby="how-h">
                <h2 id="how-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  {program.howItWorks.title}
                </h2>
                <ol className="steps">
                  {program.howItWorks.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </section>
            ) : null}

            {program.eligibility ? (
              <section aria-labelledby="elig-h">
                <h2 id="elig-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  {program.eligibility.title}
                </h2>
                <ul className="checks">
                  {program.eligibility.items.map((s) => (
                    <li key={s}>
                      <Check aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {program.chips ? (
              <section aria-labelledby="chips-h">
                <h2 id="chips-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  {program.chips.title}
                </h2>
                <ul className="chips">
                  {program.chips.items.map((c) => (
                    <li key={c} className={`chip tone tone-${program.tone}`}>
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {program.tables?.map((t) => <DataTableView key={t.title} table={t} />)}

            {program.giving ? (
              <section aria-labelledby="give-h">
                <h2 id="give-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  Ways to give
                </h2>
                <GivingOptions groups={program.giving} source={program.title} />
              </section>
            ) : null}

            {program.faqs?.length ? (
              <section aria-labelledby="faq-h">
                <h2 id="faq-h" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  Questions
                </h2>
                <Accordion items={program.faqs.map((f) => ({ title: f.q, body: <p>{f.a}</p> }))} headingLevel={3} defaultOpen={null} />
              </section>
            ) : null}
          </div>

          <aside aria-label="Give to this programme">
            <DonationWidget variant="card" forLabel={program.title} headingLevel={2} />
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section soft tight" aria-labelledby="rel-h">
          <div className="container">
            <Reveal className="section-head">
              <h2 id="rel-h">Related programmes</h2>
            </Reveal>
            <div className="cards-3">
              {related.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
