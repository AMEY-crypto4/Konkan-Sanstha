import { Check } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { StatGrid } from '../components/CountUp';
import { GivingOptions } from '../components/GivingOptions';
import { DonationWidget } from '../components/DonationWidget';
import { CampaignCard } from '../components/ProgramCard';
import { Reveal } from '../components/Reveal';
import { CAMPAIGNS, campaignBySlug } from '../content/campaigns';
import { usePageMeta } from '../lib/usePageMeta';

export default function CampaignDetail() {
  const { slug = '' } = useParams();
  const c = campaignBySlug(slug);
  usePageMeta(c?.title ?? 'Campaign', c?.tagline);
  if (!c) return <Navigate to="/not-found" replace />;
  const others = CAMPAIGNS.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <PageHero title={c.title} lead={c.tagline} icon={c.icon} tone={c.tone} eyebrow="Campaign" crumbs={[{ label: 'Campaigns', to: '/campaigns' }, { label: c.title }]} />
      <section className="section tight">
        <div className="container split-2 wide-left sticky">
          <div style={{ display: 'grid', gap: 'clamp(32px, 4vw, 56px)' }}>
            <Reveal className="prose">
              <p className="lead">{c.summary}</p>
              {c.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            {c.stats.length ? (
              <section aria-labelledby="c-stats">
                <h2 id="c-stats" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  So far
                </h2>
                <StatGrid stats={c.stats} cols={3} />
              </section>
            ) : null}

            {c.list ? (
              <section aria-labelledby="c-list">
                <h2 id="c-list" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  {c.listTitle}
                </h2>
                <ul className="checks">
                  {c.list.map((l) => (
                    <li key={l}>
                      <Check aria-hidden="true" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {c.facts?.length ? (
              <dl className="kv">
                {c.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {c.giving ? (
              <section aria-labelledby="c-give">
                <h2 id="c-give" style={{ fontSize: '1.7rem', marginBottom: 18 }}>
                  Ways to give
                </h2>
                <GivingOptions groups={c.giving} source={c.title} />
              </section>
            ) : null}
          </div>
          <aside aria-label="Give to this campaign">
            <DonationWidget variant="card" forLabel={c.title} headingLevel={2} />
          </aside>
        </div>
      </section>

      <section className="section soft tight" aria-labelledby="c-more">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="c-more">More campaigns</h2>
          </Reveal>
          <div className="cards-3">
            {others.map((o) => (
              <CampaignCard key={o.slug} campaign={o} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
