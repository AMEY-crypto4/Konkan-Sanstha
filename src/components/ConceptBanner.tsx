import { CONCEPT } from '../content/org';
import { ExternalLink } from './Button';

export function ConceptBanner() {
  if (!CONCEPT.banner) return null;
  return (
    <aside className="concept-bar" aria-label="About this site">
      <div className="container">
        <strong>Concept</strong>
        <span>
          An unofficial redesign idea, not the organisation&rsquo;s website. Nothing here collects money or personal data.{' '}
          <ExternalLink href={CONCEPT.officialSite}>Visit the official site</ExternalLink>
        </span>
      </div>
    </aside>
  );
}
