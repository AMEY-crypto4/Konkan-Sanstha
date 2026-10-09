import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Campaign, Program } from '../content/types';
import { Icon } from './icons';
import { formatNumber } from '../lib/format';

export function ProgramCard({ program, feature = false, headingLevel = 3 }: { program: Program; feature?: boolean; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const top = program.stats.slice(0, 3);
  return (
    <Link to={`/programs/${program.slug}`} className={`pcard tone-${program.tone}${feature ? ' feature' : ''}`}>
      <span className="icon-tile">
        <Icon name={program.icon} />
      </span>
      <span className="tag">{program.group}</span>
      <H>{program.title}</H>
      <p>{feature ? program.summary : program.tagline}</p>
      {feature && top.length ? (
        <div className="mini-stats">
          {top.map((s) => (
            <div key={s.label}>
              <b>
                {s.prefix}
                {formatNumber(s.value)}
                {s.suffix}
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <span className="more">
        Explore <ArrowRight aria-hidden="true" />
      </span>
    </Link>
  );
}

export function CampaignCard({ campaign, headingLevel = 3 }: { campaign: Campaign; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const s = campaign.stats[0];
  return (
    <Link to={`/campaigns/${campaign.slug}`} className={`pcard tone-${campaign.tone}`}>
      <span className="icon-tile">
        <Icon name={campaign.icon} />
      </span>
      <span className="tag">Campaign</span>
      <H>{campaign.title}</H>
      <p>{campaign.tagline}</p>
      {s ? (
        <p style={{ color: 'var(--ink)', fontWeight: 600 }}>
          <span className="num" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
            {formatNumber(s.value)}
          </span>{' '}
          <span style={{ color: 'var(--muted)', fontWeight: 450, fontSize: '0.92rem' }}>{s.label}</span>
        </p>
      ) : null}
      <span className="more">
        See how to give <ArrowRight aria-hidden="true" />
      </span>
    </Link>
  );
}
