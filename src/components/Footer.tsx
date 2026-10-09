import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Brand } from './Brand';
import { ExternalLink } from './Button';
import { ArcsArt } from './SunriseArt';
import { FOOTER_COLS } from './nav';
import { CONCEPT, CONTACT, OFFICES, ORG, SOCIAL } from '../content/org';
import { POLICIES } from '../content/transparency';

const SOCIAL_ICON = { Instagram, YouTube: Youtube, Facebook } as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <ArcsArt className="footer-arcs" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              {ORG.tagline}. A charitable organisation working across {ORG.states} states on education, child care, health, food, water and
              livelihoods.
            </p>
            <p style={{ marginTop: 14 }}>
              <a href={CONTACT.phone.href}>{CONTACT.phone.display}</a>
              <br />
              <a href={`mailto:${CONTACT.emails.general}`}>{CONTACT.emails.general}</a>
            </p>
          </div>
          <div className="footer-cols">
            {FOOTER_COLS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2>{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-offices">
          {OFFICES.map((o) => (
            <address key={o.city}>
              <b>
                {o.city}
                <span style={{ fontWeight: 450, color: 'var(--on-dark-muted)' }}> · {o.area}</span>
              </b>
              {o.address}
            </address>
          ))}
        </div>
        <div className="footer-legal">
          {CONCEPT.banner ? (
            <p className="concept-note">
              <strong>This is an unofficial redesign concept.</strong> It is not operated by, endorsed by or affiliated with {ORG.legalName}. All
              figures, names and contact details come from the public website and may be out of date. For real donations and information use{' '}
              <ExternalLink href={CONCEPT.officialSite}>the official site</ExternalLink>.
            </p>
          ) : null}
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <ul style={{ display: 'flex', gap: '8px 22px', flexWrap: 'wrap', listStyle: 'none' }}>
              {POLICIES.slice(0, 4).map((p) => (
                <li key={p}>
                  <Link to="/transparency#policies">{p}</Link>
                </li>
              ))}
            </ul>
            <div className="footer-social">
              {SOCIAL.map((s) => {
                const I = SOCIAL_ICON[s.label as keyof typeof SOCIAL_ICON];
                return (
                  <ExternalLink key={s.label} href={s.href}>
                    <I aria-hidden="true" />
                    <span className="sr-only">{s.label}</span>
                  </ExternalLink>
                );
              })}
            </div>
          </div>
          <p>
            Concept build, October 2026. Text and layout are original; the organisation&rsquo;s name and facts belong to the organisation.
          </p>
        </div>
      </div>
    </footer>
  );
}
