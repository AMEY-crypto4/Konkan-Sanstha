import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ContentGap } from '../components/Notices';
import { DataTableView } from '../components/DataTableView';
import { ACCREDITATIONS, ANNUAL_REPORTS, AWARDS, FINANCIALS, POLICIES, REGISTRATIONS } from '../content/transparency';
import { usePageMeta } from '../lib/usePageMeta';

const groups = Array.from(new Set(REGISTRATIONS.map((r) => r.group)));

export default function Transparency() {
  usePageMeta('Transparency', 'Registrations, recognition, reports and policies.');
  return (
    <>
      <PageHero
        title="Transparency"
        eyebrow="Trust"
        crumbs={[{ label: 'Transparency' }]}
        lead="Registrations, awards, annual reports, financial statements and policies, gathered in one place."
      />

      <section className="section tight" aria-labelledby="reg-h">
        <div className="container">
          <ContentGap>
            Registration numbers, certificate scans and report files are not reproduced in this concept. Each item below should link to its PDF, with the
            certificate number and validity dates beside it.
          </ContentGap>
          <h2 id="reg-h" style={{ margin: '36px 0 20px', fontSize: '1.9rem' }}>
            Registrations
          </h2>
          <div className="cards-3">
            {groups.map((g) => (
              <Reveal key={g}>
                <div className="way">
                  <h3 style={{ fontSize: '1.15rem' }}>{g}</h3>
                  <ul className="checks" style={{ marginTop: 6 }}>
                    {REGISTRATIONS.filter((r) => r.group === g).map((r) => (
                      <li key={r.name}>
                        <span aria-hidden="true">•</span>
                        <span>{r.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft tight" aria-labelledby="rep-h">
        <div className="container ledger">
          <div>
            <h2 id="rep-h" style={{ fontSize: '1.7rem', marginBottom: 16 }}>
              Annual reports
            </h2>
            <ul className="doc-list">
              {ANNUAL_REPORTS.map((r) => (
                <li key={r}>
                  <span>{r}</span>
                  <span className="badge">Link to add</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ fontSize: '1.7rem', marginBottom: 16 }}>Financial statements</h2>
            <ul className="doc-list">
              {FINANCIALS.map((r) => (
                <li key={r}>
                  <span>{r}</span>
                  <span className="badge">Link to add</span>
                </li>
              ))}
            </ul>
            <h2 id="policies" style={{ fontSize: '1.7rem', margin: '32px 0 16px' }}>
              Policies
            </h2>
            <ul className="doc-list">
              {POLICIES.map((r) => (
                <li key={r}>
                  <span>{r}</span>
                  <span className="badge">Link to add</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section tight" aria-labelledby="aw-h">
        <div className="container">
          <h2 id="aw-h" style={{ marginBottom: 20, fontSize: '1.9rem' }}>
            Awards and recognition
          </h2>
          <DataTableView
            table={{
              title: 'Awards listed by the organisation',
              note: 'Where the original site does not name the awarding body, it is shown as not stated.',
              columns: ['Award', 'Awarded by', 'Year', 'Recipient'],
              rows: AWARDS.map((a) => [a.title, a.body, a.year, a.to ?? 'Organisation']),
            }}
          />
          <h2 style={{ margin: '40px 0 16px', fontSize: '1.7rem' }}>Platforms and networks</h2>
          <ul className="chips">
            {ACCREDITATIONS.map((a) => (
              <li className="chip" key={a}>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
