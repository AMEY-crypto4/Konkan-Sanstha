import { PageHero } from '../components/PageHero';
import { CampaignCard } from '../components/ProgramCard';
import { Reveal } from '../components/Reveal';
import { CAMPAIGNS } from '../content/campaigns';
import { usePageMeta } from '../lib/usePageMeta';

export default function Campaigns() {
  usePageMeta('Campaigns', 'Seasonal and cause-led campaigns with itemised giving options.');
  return (
    <>
      <PageHero
        title="Campaigns"
        eyebrow="Give to something specific"
        crumbs={[{ label: 'Campaigns' }]}
        lead="Each campaign lists what a gift buys and how many people it reaches, so you can give to exactly what you care about."
      />
      <section className="section tight">
        <div className="container cards-3">
          {CAMPAIGNS.map((c, i) => (
            <Reveal key={c.slug} delay={i % 3}>
              <CampaignCard campaign={c} headingLevel={2} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
