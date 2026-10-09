import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArcsArt } from './SunriseArt';
import { Icon } from './icons';
import type { IconName, Tone } from '../content/types';

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label}>
            {c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Props = {
  title: string;
  lead?: ReactNode;
  crumbs?: Crumb[];
  icon?: IconName;
  tone?: Tone;
  eyebrow?: string;
  children?: ReactNode;
};

export function PageHero({ title, lead, crumbs = [], icon, tone = 'indigo', eyebrow, children }: Props) {
  return (
    <section className="page-hero">
      <ArcsArt />
      <div className="container page-hero-inner">
        {crumbs.length ? <Breadcrumbs items={crumbs} /> : null}
        {icon ? (
          <span className={`icon-tile lg tile tone-${tone}`}>
            <Icon name={icon} />
          </span>
        ) : null}
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
