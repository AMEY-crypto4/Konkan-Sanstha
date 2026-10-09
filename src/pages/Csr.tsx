import { Mail } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { StatGrid } from '../components/CountUp';
import { ContentGap } from '../components/Notices';
import { ProgramCard } from '../components/ProgramCard';
import { Reveal } from '../components/Reveal';
import { ButtonA } from '../components/Button';
import { CONTACT } from '../content/org';
import { IMPACT_BLOCKS } from '../content/impact';
import { programBySlug } from '../content/programs';
import { ACCREDITATIONS, REGISTRATIONS } from '../content/transparency';
import { usePageMeta } from '../lib/usePageMeta';

const CSR = IMPACT_BLOCKS.find((b) => b.slug === 'csr-partnership')!;
const OPEN = ['education', 'school-kit', 'wash', 'feed-one-feed-all', 'village-development', 'medical-support']
  .map((s) => programBySlug(s))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));
const CSR_RELEVANT = ['CSR approval', '12AB certificate', '80G certificate', 'FCRA registration', 'NGO Darpan'];

export default function Csr() {
  usePageMeta('Corporate partnerships', 'CSR partnerships with the organisation.');
  return (
    <>
      <PageHero
        title="Corporate partnerships"
        eyebrow="CSR"
        crumbs={[{ label: 'Get involved', to: '/get-involved' }, { label: 'Corporate partnerships' }]}
        lead="The organisation reports working with national and multinational brands on programmes that reach villages and communities."
      >
        <div>
          <ButtonA href={`mailto:${CONTACT.emails.general}?subject=${encodeURIComponent('CSR partnership enquiry')}`}>
            <Mail aria-hidden="true" /> Email the team
          </ButtonA>
        </div>
      </PageHero>

      <section className="section tight" aria-labelledby="csr-numbers">
        <div className="container">
          <h2 id="csr-numbers" style={{ marginBottom: 24, fontSize: '1.9rem' }}>
            Partnership results reported so far
          </h2>
          <StatGrid stats={CSR.stats} cols={3} />
        </div>
      </section>

      <section className="section soft tight" aria-labelledby="csr-programmes">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="csr-programmes">Programmes you could support</h2>
            <p>Examples of the work with published figures. The team can say which are open to partnership.</p>
          </Reveal>
          <div className="cards-3">
            {OPEN.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section tight" aria-labelledby="csr-trust">
        <div className="container split-2">
          <div className="prose">
            <h2 id="csr-trust">Compliance and platforms</h2>
            <p>Registrations a CSR team will ask about, as listed by the organisation:</p>
            <ul className="chips">
              {REGISTRATIONS.filter((r) => CSR_RELEVANT.includes(r.name)).map((r) => (
                <li className="chip" key={r.name}>
                  {r.name}
                </li>
              ))}
            </ul>
            <p>Platforms and networks it is listed on:</p>
            <ul className="chips">
              {ACCREDITATIONS.slice(0, 8).map((a) => (
                <li className="chip" key={a}>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <ContentGap>
            The original site does not describe partnership models, minimum commitments, reporting or case studies. A CSR page is where these belong:
            what a partner receives, how impact is reported, and one or two named examples.
          </ContentGap>
        </div>
      </section>
    </>
  );
}
